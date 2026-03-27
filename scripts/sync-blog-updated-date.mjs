import { execSync } from 'child_process';
import fs from 'fs';

const BLOG_ROOT = 'src/content/blog/';

function run(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function listChangedBlogFiles() {
  const candidates = new Set();
  const outputs = [
    run(`git diff --name-only --diff-filter=ACMR -- ${BLOG_ROOT}`),
    run(`git diff --cached --name-only --diff-filter=ACMR -- ${BLOG_ROOT}`),
    run(`git ls-files --others --exclude-standard -- ${BLOG_ROOT}`),
  ];

  for (const output of outputs) {
    for (const line of output.split('\n')) {
      const file = line.trim();
      if (!file) continue;
      if (!file.startsWith(BLOG_ROOT)) continue;
      if (!/\.(md|mdx)$/i.test(file)) continue;
      if (!fs.existsSync(file)) continue;
      candidates.add(file);
    }
  }

  return Array.from(candidates).sort();
}

function todayIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function updateFile(file, today) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.startsWith('---\n')) {
    return false;
  }

  const fmEnd = source.indexOf('\n---\n', 4);
  if (fmEnd === -1) {
    return false;
  }

  const frontmatter = source.slice(4, fmEnd);
  const body = source.slice(fmEnd + 5);
  const lines = frontmatter.split('\n');
  const updatedLine = `updatedDate: ${today}`;
  const updatedIndex = lines.findIndex((line) => /^updatedDate:\s*/.test(line));

  if (updatedIndex >= 0) {
    if (lines[updatedIndex].trim() === updatedLine) {
      return false;
    }
    lines[updatedIndex] = updatedLine;
  } else {
    const pubDateIndex = lines.findIndex((line) => /^pubDate:\s*/.test(line));
    const insertAt = pubDateIndex >= 0 ? pubDateIndex + 1 : lines.length;
    lines.splice(insertAt, 0, updatedLine);
  }

  const next = `---\n${lines.join('\n')}\n---\n${body}`;
  if (next === source) {
    return false;
  }

  fs.writeFileSync(file, next, 'utf8');
  return true;
}

function main() {
  const changedFiles = listChangedBlogFiles();
  if (changedFiles.length === 0) {
    console.log('No changed blog files. updatedDate sync skipped.');
    return;
  }

  const today = todayIsoDate();
  const updated = [];

  for (const file of changedFiles) {
    if (updateFile(file, today)) {
      updated.push(file);
    }
  }

  if (updated.length === 0) {
    console.log(`No updatedDate changes required. (${changedFiles.length} changed blog files checked)`);
    return;
  }

  console.log(`updatedDate synced to ${today} for ${updated.length} file(s):`);
  for (const file of updated) {
    console.log(`- ${file}`);
  }
}

main();
