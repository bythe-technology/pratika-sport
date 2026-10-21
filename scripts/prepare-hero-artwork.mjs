import { mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import catalog from '../data/illustrations.json' with { type: 'json' };

const output = resolve('public/images/illustrations/hero-v2');
await mkdir(output, { recursive: true });
let variants = 0;
let bytes = 0;
for (const [id] of Object.entries(catalog).filter(([,item]) => item.hero)) {
  const source = resolve('artwork/source', `hero-v2-${id}.png`);
  const metadata = await sharp(source).metadata();
  if (!metadata.hasAlpha) throw new Error(`Missing alpha: ${source}`);
  for (const width of [360,720,1080]) for (const format of ['avif','webp']) {
    const file = resolve(output, `${id}-${width}.${format}`);
    const pipeline = sharp(source).resize(width, Math.round(width*2/3), {fit:'contain',background:{r:0,g:0,b:0,alpha:0}});
    await (format === 'webp' ? pipeline.webp({quality:80,effort:5}) : pipeline.avif({quality:50,effort:4})).toFile(file);
    variants++;
    bytes += (await stat(file)).size;
  }
}
await writeFile(resolve(output,'manifest.json'),JSON.stringify({images:4,variants,bytes,alpha:true},null,2));
console.log(`${variants} transparent variants; ${(bytes/1024/1024).toFixed(2)} MiB.`);
