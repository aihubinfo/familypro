#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const blogRoot = path.join(repoRoot, 'src', 'content', 'blog');
const requestedKeys = process.argv.slice(2);
const groups = new Map();

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(target);
    return /\.(?:md|mdx)$/.test(entry.name) ? [target] : [];
  });
}

function readFrontmatter(file) {
  const source = fs.readFileSync(file, 'utf8');
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return {};

  const value = (key) => {
    const match = block[1].match(new RegExp(`^${key}:\\s*[\"']?([^\"'\\r\\n#]+)[\"']?\\s*$`, 'm'));
    return match?.[1].trim();
  };

  return {
    locale: value('locale'),
    translationKey: value('translationKey'),
    coverImage: value('coverImage'),
  };
}

for (const file of collectFiles(blogRoot)) {
  const data = readFrontmatter(file);
  if (!data.translationKey) continue;
  const entries = groups.get(data.translationKey) ?? [];
  entries.push({ file, ...data });
  groups.set(data.translationKey, entries);
}

const keys = requestedKeys.length
  ? requestedKeys
  : [...groups.entries()].filter(([, entries]) => entries.some((entry) => entry.coverImage)).map(([key]) => key);

const errors = [];

for (const key of keys) {
  const entries = groups.get(key);
  if (!entries?.length) {
    errors.push(`${key}: no blog files found`);
    continue;
  }

  const missing = entries.filter((entry) => !entry.coverImage);
  if (missing.length) {
    errors.push(`${key}: missing coverImage in ${missing.map((entry) => path.relative(repoRoot, entry.file)).join(', ')}`);
    continue;
  }

  const covers = new Set(entries.map((entry) => entry.coverImage));
  if (covers.size !== 1) {
    errors.push(`${key}: locale variants do not share one coverImage (${[...covers].join(', ')})`);
    continue;
  }

  const [cover] = covers;
  if (!/^\/blog-covers\/[^/]+\.webp$/.test(cover)) {
    errors.push(`${key}: coverImage must match /blog-covers/<name>.webp, got ${cover}`);
    continue;
  }

  const asset = path.join(repoRoot, 'public', cover.replace(/^\/+/, ''));
  if (!fs.existsSync(asset)) {
    errors.push(`${key}: asset not found at ${path.relative(repoRoot, asset)}`);
    continue;
  }

  const bytes = fs.statSync(asset).size;
  if (bytes > 500 * 1024) {
    errors.push(`${key}: asset is ${(bytes / 1024).toFixed(1)} KB; keep it at or below 500 KB`);
    continue;
  }

  const locales = entries.map((entry) => entry.locale).filter(Boolean).sort().join(', ');
  console.log(`OK ${key}: ${entries.length} locale(s) [${locales}] -> ${cover} (${(bytes / 1024).toFixed(1)} KB)`);
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exit(1);
}

if (!keys.length) {
  console.log('No coverImage entries found to validate.');
}
