import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
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

const listHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = resolve(directory, entry.name);
    return entry.isDirectory() ? listHtmlFiles(fullPath) : [fullPath];
  }));
  return files.flat().filter((file) => file.endsWith('.html'));
};

const xmlEscape = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const htmlFiles = await listHtmlFiles(output);
const canonicalBase = 'https://www.pratikasport.com.br';
const updatedAt = new Date().toISOString().slice(0, 10);
const urls = htmlFiles
  .map((file) => file.slice(output.length).replaceAll('\\', '/'))
  .map((path) => path === '/index.html' ? '/' : path)
  .filter((path) => !path.includes('/404'))
  .sort((a, b) => a.localeCompare(b));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url>
    <loc>${xmlEscape(`${canonicalBase}${path}`)}</loc>
    <lastmod>${updatedAt}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(output, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${canonicalBase}/sitemap.xml\n`, 'utf8');
