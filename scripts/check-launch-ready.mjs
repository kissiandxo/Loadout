#!/usr/bin/env node
// check-launch-ready.mjs
// Exits 1 if any launch-blocking placeholder remains on a shipped surface.
// Run:  npm run check:launch
//
// Scans only the live, shipped surfaces. src/content/bundles/trades.json is
// intentionally skipped — it is status: "coming-soon" and not part of the
// live store, so its placeholders must not block launch of the two live kits.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const BLOCKERS = [
  { re: /REPLACE\.lemonsqueezy\.com/i, why: 'Lemon Squeezy checkout URL still a placeholder' },
  { re: /TODO_PASTE/, why: 'Leftover TODO_PASTE token' },
  { re: /yourloadout\.com/i, why: 'Placeholder domain not replaced' },
];

const TARGETS = [
  'astro.config.mjs',
  'public/robots.txt',
  'public/sitemap.xml',
  'src/content/bundles/sales.json',
  'src/content/bundles/customer-engagement.json',
];

function walk(dir, acc) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (entry.endsWith('.astro')) acc.push(relative(root, full));
  }
  return acc;
}

const files = [...TARGETS, ...walk(join(root, 'src'), [])];

const findings = [];
for (const rel of files) {
  let text;
  try {
    text = readFileSync(join(root, rel), 'utf8');
  } catch {
    continue; // optional target not present
  }
  text.split(/\r?\n/).forEach((line, i) => {
    for (const b of BLOCKERS) {
      if (b.re.test(line)) {
        findings.push({ file: rel, line: i + 1, why: b.why, text: line.trim().slice(0, 120) });
      }
    }
  });
}

if (findings.length === 0) {
  console.log('[OK] Launch-ready: no placeholders found in shipped surfaces.');
  process.exit(0);
}

console.error(`[BLOCKED] Not launch-ready - ${findings.length} placeholder(s) remaining:\n`);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  (${f.why})`);
  console.error(`      ${f.text}`);
}
console.error('\nResolve every item above (real Lemon Squeezy URLs + real domain), then re-run: npm run check:launch');
process.exit(1);
