import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'dist', 'patriot-tree-care', 'browser');
const index = join(outDir, 'index.html');
const notFound = join(outDir, '404.html');

if (!existsSync(index)) {
  console.error(`[copy-404] Missing build output: ${index}`);
  process.exit(1);
}

copyFileSync(index, notFound);
console.log('[copy-404] Wrote 404.html for GitHub Pages SPA routing');
