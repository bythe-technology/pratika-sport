import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'vercel-dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot'), output, { recursive: true });
await cp(resolve(root, 'static-site'), output, { recursive: true });
await cp(resolve(root, 'public', 'images'), resolve(output, 'images'), { recursive: true });
