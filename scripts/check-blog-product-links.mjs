import fs from 'node:fs';
import path from 'node:path';

const blogRoot = path.resolve('src/content/blog');
const paths = process.argv.slice(2);
const inviteCode = 'YK868462';

if (paths.length === 0) {
  console.error('Usage: npm run check:blog-product-links -- <blog-file.md> [...]');
  process.exit(1);
}

let failed = false;

for (const input of paths) {
  const file = path.resolve(input);
  const relative = path.relative(blogRoot, file);
  if (relative.startsWith('..') || path.isAbsolute(relative) || !/\.mdx?$/.test(file) || !fs.existsSync(file)) {
    console.error(`${input}: expected an existing blog Markdown file`);
    failed = true;
    continue;
  }

  const content = fs.readFileSync(file, 'utf8');
  const headings = [...content.matchAll(/^##\s+(.+?)\s*$/gm)];
  const reference = headings.at(-1);
  const expected = relative.startsWith(`zh${path.sep}`) ? '官方参考' : 'References';
  if (!reference || reference[1] !== expected) {
    console.error(`${input}: final h2 must be "## ${expected}"`);
    failed = true;
    continue;
  }

  const section = content.slice(reference.index + reference[0].length);
  const firstItem = section.split('\n').find((line) => line.trim()) ?? '';
  const markdownUrl = firstItem.match(/^-\s+\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/)?.[1];
  const htmlUrl = firstItem.match(/^-\s+(?:[^<]*?)<a\b[^>]*\bhref=["'](https?:\/\/[^"']+)["'][^>]*>/i)?.[1];
  const hasProduct = [markdownUrl, htmlUrl].filter(Boolean).some((value) => {
    try {
      const url = new URL(value);
      return url.hostname === 'familypro.io'
        && /^\/(?:[a-z-]+)\/products\/[^/]+\/?$/.test(url.pathname)
        && url.searchParams.get('invite') === inviteCode;
    } catch {
      return false;
    }
  });

  if (!hasProduct) {
    console.error(`${input}: first reference must be a FamilyPro product URL with invite=${inviteCode}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`FamilyPro product link check passed (${paths.length} files).`);
