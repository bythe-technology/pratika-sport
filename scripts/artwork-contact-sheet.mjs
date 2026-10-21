import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
const files = (await readdir('artwork/source')).filter(file => file.endsWith('.png')).sort();
await mkdir('work/illustration-qa', { recursive: true });
const tiles = await Promise.all(files.map(async(file, index) => ({ input: await sharp(`artwork/source/${file}`).resize(360,240).png().toBuffer(), left: (index % 3) * 360, top: Math.floor(index / 3) * 266 })));
const labels = files.map((file,index) => ({ input: Buffer.from(`<svg width="360" height="26"><rect width="360" height="26" fill="white"/><text x="8" y="19" font-size="14" fill="black">${file}</text></svg>`), left: (index % 3)*360, top: Math.floor(index / 3)*266+240 }));
await sharp({ create: { width: 1080, height: Math.ceil(files.length/3)*266, channels: 3, background: '#fff' } }).composite([...tiles,...labels]).jpeg({quality:85}).toFile('work/illustration-qa/contact-sheet.jpg');
