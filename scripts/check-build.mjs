import { existsSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'frontend', 'dist');
const required = [
  resolve(dist, 'index.html'),
  resolve(dist, 'assets', 'penselverket-logo.png'),
  resolve(dist, 'assets', 'hero-project.webp')
];

for (const file of required) {
  if (!existsSync(file)) {
    console.error(`Saknad byggfil: ${file}`);
    process.exit(1);
  }
}

const walk = (directory) => readdirSync(directory).flatMap((entry) => {
  const full = resolve(directory, entry);
  return statSync(full).isDirectory() ? walk(full) : [full];
});

const files = walk(dist);
const totalBytes = files.reduce((sum, file) => sum + statSync(file).size, 0);
console.log(`Build OK: ${files.length} filer, ${(totalBytes / 1024 / 1024).toFixed(2)} MB.`);
