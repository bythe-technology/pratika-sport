import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import projects from '../data/completed-projects.json' with { type: 'json' };

const widths = [360, 720, 1080];

for (const [projectId, project] of Object.entries(projects)) {
  for (const photo of project.photos) {
    const outputDirectory = `public/images/project-cases/${projectId}`;
    await mkdir(outputDirectory, { recursive: true });

    for (const width of widths) {
      const height = Math.round(width * 3 / 4);
      const image = sharp(photo.enhanced)
        .rotate()
        .resize({ width, height, fit: 'cover', position: 'centre' });

      await Promise.all([
        image.clone().webp({ quality: 83 }).toFile(`${outputDirectory}/${photo.id}-${width}.webp`),
        image.clone().avif({ quality: 55, effort: 5 }).toFile(`${outputDirectory}/${photo.id}-${width}.avif`),
      ]);
    }
  }
}

console.log(`Prepared responsive image variants for ${Object.keys(projects).length} completed project(s).`);
