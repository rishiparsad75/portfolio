import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'sequence');
const destDir = join(__dirname, 'public', 'sequence');

if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

for (let i = 0; i < 75; i++) {
  const pad = String(i).padStart(2, '0');
  const src = join(srcDir, `frame_${pad}_delay-0.066s.webp`);
  const dest = join(destDir, `frame_${pad}.webp`);
  try {
    copyFileSync(src, dest);
    console.log(`Copied frame_${pad}.webp`);
  } catch (e) {
    console.error(`Failed: frame_${pad}.webp`, e.message);
  }
}
console.log('Done! All 75 frames copied.');
