import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import photos from '../data/project-photos.json' with { type: 'json' };

await mkdir('public/images/projects', { recursive: true });
for (const [id, photo] of Object.entries(photos)) {
  for (const width of [360, 720, 1080]) {
    // Resize and encode only: do not generate, retouch or reconstruct the original works.
    const image = sharp(`public${photo.source}`).rotate().resize({ width, height: Math.round(width * 2 / 3), fit: 'cover', position: 'centre' });
    await Promise.all([
      image.clone().webp({ quality: 83 }).toFile(`public/images/projects/${id}-${width}.webp`),
      image.clone().avif({ quality: 55, effort: 5 }).toFile(`public/images/projects/${id}-${width}.avif`),
    ]);
  }
}
console.log('Prepared 36 responsive variants from 6 original photographs.');
