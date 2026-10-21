import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import catalog from '../data/illustrations.json' with { type: 'json' };

// Mechanical resize/encoding only. All original artwork comes from image generation.
const source = resolve('artwork/source');
const output = resolve('public/images/illustrations');
await mkdir(output, { recursive: true });
for (const id of Object.keys(catalog)) {
  const original = resolve(source, `${id}.png`);
  for (const width of [360, 720, 1080]) {
    await sharp(original).resize(width, Math.round(width * 2 / 3), { fit: 'contain', background: '#eef7fc' }).webp({ quality: 79, effort: 5 }).toFile(resolve(output, `${id}-${width}.webp`));
    await sharp(original).resize(width, Math.round(width * 2 / 3), { fit: 'contain', background: '#eef7fc' }).avif({ quality: 49, effort: 4 }).toFile(resolve(output, `${id}-${width}.avif`));
  }
}
const files = await readdir(output);
const bytes = (await Promise.all(files.map(async file => (await stat(resolve(output,file))).size))).reduce((a,b) => a+b,0);
await writeFile(resolve(output, 'manifest.json'), JSON.stringify({ illustrations: Object.keys(catalog).length, variants: files.length, bytes }, null, 2));
console.log(`${Object.keys(catalog).length} illustrations, ${files.length} variants, ${(bytes / 1024 / 1024).toFixed(2)} MiB`);
