import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories excluded from the multi-page HTML discovery scan.
// - node_modules / dist / .git : standard build artifacts
// - temp_repo        : original template copy — not part of the production site
// - reference-videos : large video files used during development only
// - _dev-scripts     : one-off patch/inspect/fix scripts from development
const EXCLUDED_DIRS = new Set([
  'node_modules', 'dist', '.git',
  'temp_repo', 'reference-videos', '_dev-scripts'
]);

/**
 * Recursively discovers all production HTML entry points.
 * Skips directories in EXCLUDED_DIRS, draft "-modified" variants,
 * and the throwaway test.html file.
 */
function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = dir + '/' + file;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !EXCLUDED_DIRS.has(file)) {
      getHtmlFiles(filePath, files);
    } else if (file.endsWith('.html') && !file.includes('-modified') && file !== 'test.html') {
      files.push(filePath);
    }
  }
  return files;
}

// Build the Rollup input map: each HTML page becomes a named entry point.
const htmlFiles = getHtmlFiles('.');
const input = {};
htmlFiles.forEach(file => {
  const name = file.replace('./', '').replace('.html', '').split('/').join('_');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
});
