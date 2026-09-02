import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist', 'client');
await mkdir(output, { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot', 'pages'), resolve(output, 'pages'), { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot', 'css'), resolve(output, 'css'), { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot', 'js'), resolve(output, 'js'), { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot', 'politica-privacidade.html'), resolve(output, 'politica-privacidade.html'));
await cp(resolve(root, 'legacy-site', 'snapshot', 'termos-servico.html'), resolve(output, 'termos-servico.html'));
await cp(resolve(root, 'static-site', 'site.webmanifest'), resolve(output, 'site.webmanifest'));
