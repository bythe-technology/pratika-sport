import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist', 'client');
const canonicalBase = 'https://www.pratikasport.com.br';
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

const removePublishedPrices = (html) => html
  .replace(
    /<li\b([^>]*)>((?:(?!<li\b|<\/li>)[\s\S])*R\$(?:(?!<li\b|<\/li>)[\s\S])*)<\/li>/gi,
    (_match, attributes, content) => `<li${attributes}>${content.includes('</strong>') ? content.slice(0, content.indexOf('</strong>') + 9) : ''} Sob orçamento personalizado.</li>`,
  )
  .replace(
    /<td\b([^>]*)>\s*(?:A partir de\s*)?R\$[^<]*<\/td>/gi,
    '<td$1>Sob orçamento personalizado</td>',
  )
  .replace(
    /"text"\s*:\s*"[^"\n]*R\$[^"\n]*"/gi,
    '"text": "O escopo é definido conforme a avaliação técnica, as condições do local e o orçamento personalizado."',
  );

await Promise.all(htmlFiles.map(async (file) => {
  const html = await readFile(file, 'utf8');
  const sanitizedHtml = removePublishedPrices(html);

  if (/R\$/i.test(sanitizedHtml)) {
    throw new Error(`Referência monetária não removida do conteúdo publicado: ${file}`);
  }

  if (sanitizedHtml !== html) {
    await writeFile(file, sanitizedHtml, 'utf8');
  }
}));

const legacyPagesDirectory = resolve(output, 'pages');
const legacyPages = (await listHtmlFiles(legacyPagesDirectory))
  .filter((file) => file !== saoPauloOutput)
  .filter((file) => !file.endsWith('.html.html'));
await Promise.all(legacyPages.map(async (file) => {
  const html = await readFile(file, 'utf8');
  const path = file.slice(output.length).replaceAll('\\', '/');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const isIndexable = !/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const breadcrumb = isIndexable && title
    ? `  <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${canonicalBase}/` },
        { '@type': 'ListItem', position: 2, name: title, item: `${canonicalBase}${path}` },
      ],
    }).replaceAll('</', '<\\/')}</script>\n`
    : '';

  const enhancements = [
    html.includes('/css/legacy-modern.css') ? '' : '  <link rel="stylesheet" href="/css/legacy-modern.css">\n',
    html.includes('"@type":"BreadcrumbList"') ? '' : breadcrumb,
  ].join('');
  let enhancedHtml = enhancements ? html.replace('</head>', `${enhancements}</head>`) : html;
  enhancedHtml = enhancedHtml
    .replace(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/gi, '')
    .replace('</head>', '<link rel="icon" href="/pratika-sport-favicon-192.png" type="image/png" sizes="192x192">\n</head>')
    .replace(/href="(?:\.\.\/)+index\.html"/g, 'href="/"');

  if (path.startsWith('/pages/servicos/') && !enhancedHtml.includes('id="planejar-orcamento"')) {
    const relatedServices = [
      ['quadras-poliesportivas', 'Construção de quadras poliesportivas'],
      ['quadra-de-tenis', 'Quadras de tênis'],
      ['quadra-de-beach-tennis', 'Quadras de beach tennis'],
      ['campo-de-futebol', 'Campos de futebol'],
      ['reforma-de-quadras', 'Reforma e recuperação de quadras'],
      ['manutencao-de-quadras', 'Manutenção de quadras'],
    ].filter(([slug]) => !path.endsWith(`${slug}.html`));
    const planningSection = `<section class="section" id="planejar-orcamento"><div class="container">
      <h2>Como solicitar um orçamento para seu projeto esportivo</h2>
      <p>Informe a cidade e o estado, a modalidade, as medidas aproximadas e se o espaço precisa de construção, reforma ou manutenção. Fotos atuais ajudam a identificar as condições da base, da drenagem e dos acessórios.</p>
      <p>Para condomínios, clubes, escolas e arenas, descreva também a intensidade de uso e as condições de acesso à obra. A proposta deve definir os serviços previstos, materiais, conservação e cronograma conforme a avaliação do local. A Pratika Sport trabalha com orçamento personalizado, sem tabela de preços.</p>
      <h2>Atendimento no Brasil, com prioridade no estado de São Paulo</h2>
      <p>A Pratika Sport atende projetos em todo o Brasil. No estado de São Paulo, capital, Grande São Paulo, interior e litoral entram no planejamento conforme o endereço, o escopo e a viabilidade logística. Informe sua localização para confirmar o atendimento.</p>
      <p><a href="/pages/estados/sao-paulo">Conheça o atendimento de quadras esportivas em São Paulo</a></p>
      <h2>Soluções relacionadas para seu espaço</h2>
      <ul>${relatedServices.map(([slug, label]) => `<li><a href="/pages/servicos/${slug}.html">${label}</a></li>`).join('')}</ul>
      <p><a class="btn btn-primary" href="https://wa.me/5515997157642?text=${encodeURIComponent('Olá! Gostaria de um orçamento personalizado. Minha cidade e estado são: ')}" target="_blank" rel="noopener noreferrer">Solicitar orçamento personalizado no WhatsApp</a></p>
      </div></section>`;
    enhancedHtml = enhancedHtml.replace('</main>', `${planningSection}</main>`);
  }
  await writeFile(file, enhancedHtml, 'utf8');
}));

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

const urlEntries = (await Promise.all(htmlFiles.map(async (file) => {
  const originalPath = file.slice(output.length).replaceAll('\\', '/');
  const path = normalizeRoute(originalPath);
  const html = await readFile(file, 'utf8');
  const isIndexable = !/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const imageSource = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const imageUrl = imageSource && !imageSource.startsWith('data:')
    ? new URL(imageSource, `${canonicalBase}${originalPath}`).href
    : null;

  return { path, isIndexable, imageUrl };
})))
  .filter(({ path, isIndexable }) => isIndexable)
  .filter(({ path }) => !path.includes('/404'))
  .filter(({ path }) => !path.endsWith('.html.html'))
  .filter(({ path }) => !path.startsWith('/pages/estados/') || path === '/pages/estados/sao-paulo')
  .sort((a, b) => a.path.localeCompare(b.path));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.map(({ path, imageUrl }) => `  <url>
    <loc>${xmlEscape(`${canonicalBase}${path}`)}</loc>
    ${imageUrl ? `
    <image:image>
      <image:loc>${xmlEscape(imageUrl)}</image:loc>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(output, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${canonicalBase}/sitemap.xml\n`, 'utf8');
