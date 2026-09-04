import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist', 'client');
await mkdir(output, { recursive: true });
const saoPauloOutput = resolve(output, 'pages', 'estados', 'sao-paulo.html');
const saoPauloModernPage = await readFile(saoPauloOutput, 'utf8');
await cp(resolve(root, 'legacy-site', 'snapshot', 'pages'), resolve(output, 'pages'), { recursive: true });
await writeFile(saoPauloOutput, saoPauloModernPage, 'utf8');
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

const legacyPagesDirectory = resolve(output, 'pages');
const legacyPages = (await listHtmlFiles(legacyPagesDirectory))
  .filter((file) => file !== saoPauloOutput)
  .filter((file) => !file.endsWith('.html.html'));
await Promise.all(legacyPages.map(async (file) => {
  const html = await readFile(file, 'utf8');
  if (html.includes('/css/legacy-modern.css')) {
    return;
  }

  const enhancedHtml = html.replace(
    '</head>',
    '  <link rel="stylesheet" href="/css/legacy-modern.css">\n</head>',
  );
  await writeFile(file, enhancedHtml, 'utf8');
}));

const canonicalBase = 'https://www.pratikasport.com.br';
const updatedAt = new Date().toISOString().slice(0, 10);
const normalizeRoute = (path) => {
  if (path === '/index.html') {
    return '/';
  }

  if (path.endsWith('/index.html')) {
    return path.slice(0, -'/index.html'.length);
  }

  if (path === '/pages/estados/sao-paulo.html') {
    return '/pages/estados/sao-paulo';
  }

  return path;
};

const urls = htmlFiles
  .map((file) => file.slice(output.length).replaceAll('\\', '/'))
  .map(normalizeRoute)
  .filter((path) => !path.includes('/404'))
  .filter((path) => !path.endsWith('.html.html'))
  .filter((path) => !path.startsWith('/pages/estados/') || path === '/pages/estados/sao-paulo')
  .sort((a, b) => a.localeCompare(b));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((path) => `  <url>
    <loc>${xmlEscape(`${canonicalBase}${path}`)}</loc>
    <lastmod>${updatedAt}</lastmod>
  </url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(output, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${canonicalBase}/sitemap.xml\n`, 'utf8');
