import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = dir + '/' + file;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist' && file !== '.git') {
      getHtmlFiles(filePath, files);
    } else if (file.endsWith('.html') && !file.includes('-modified') && file !== 'test.html') {
      files.push(filePath);
    }
  }
  return files;
}

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
