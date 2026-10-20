import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import { getServiceSlug, serviceMetadata } from '../scripts/service-intent.mjs';

const homePath = new URL('../dist/client/index.html', import.meta.url);
const manifestPath = new URL(
  '../dist/client/site.webmanifest',
  import.meta.url,
);
const sitemapPath = new URL('../dist/client/sitemap.xml', import.meta.url);
const multisportPath = new URL(
  '../dist/client/pages/servicos/quadras-poliesportivas.html',
  import.meta.url,
);

test('páginas modernas de São Paulo não duplicam a marca no título', async () => {
  for (const path of ['pages/estados/sao-paulo.html', 'pages/estados/sao-paulo.html.html']) {
    const html = await readFile(new URL(`../dist/client/${path}`, import.meta.url), 'utf8');
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.equal(title, 'Construção, Reforma e Manutenção de Quadras em SP | Pratika Sport', path);
    assert.equal((title.match(/Pratika Sport/g) ?? []).length, 1, path);
    assert.match(html, /rel="canonical" href="https:\/\/www\.pratikasport\.com\.br\/pages\/estados\/sao-paulo"/);
  }
});

test('a página inicial comunica atendimento nacional sem limitar a empresa a SP', async () => {
  const html = await readFile(homePath, 'utf8');

  assert.match(
    html,
    /<title>Construção e Reforma de Quadras no Brasil \| Pratika Sport<\/title>/,
  );
  assert.match(
    html,
    /<meta name="description" content="[^"]*todo o Brasil[^"]*prioridade operacional no estado de São Paulo[^"]*"/,
  );
  assert.doesNotMatch(html, /<title>[^<]*em SP[^<]*<\/title>/);
});

test('a página inicial destaca os números confirmados pela empresa', async () => {
  const html = await readFile(homePath, 'utf8');

  assert.match(html, />\+850<\/strong>\s*<p class="trust-label">projetos realizados<\/p>/);
  assert.match(html, />10\+ anos<\/strong>\s*<p class="trust-label">de operação<\/p>/);
});

test('páginas legadas alinham a apresentação institucional aos dados confirmados', async () => {
  const about = await readFile(new URL('../dist/client/pages/sobre.html', import.meta.url), 'utf8');

  assert.match(about, /mais de 10 anos de operação/i);
  assert.match(about, /mais de 850 projetos realizados/i);
  assert.match(about, /<div class="stat-label">Projetos Realizados<\/div>/);
  assert.match(about, /<div class="stat-number">Brasil<\/div>[\s\S]*?<div class="stat-label">Atendimento Nacional<\/div>/);
  assert.match(about, /<div class="stat-number">São Paulo<\/div>[\s\S]*?<div class="stat-label">Prioridade Operacional<\/div>/);
  assert.doesNotMatch(about, /20\+ anos|mais de 20 anos|Fundada em 2004|26 estados|98%|garantia estendida/i);

  const outputDirectory = new URL('../dist/client/', import.meta.url);
  const htmlFiles = (await readdir(outputDirectory, { recursive: true })).filter((path) => path.endsWith('.html'));
  for (const file of htmlFiles) {
    const html = await readFile(new URL(file.replaceAll('\\', '/'), outputDirectory), 'utf8');
    assert.doesNotMatch(html, /mais de 20 anos|20\+ anos (?:de experiência|no mercado|construindo)|26 estados|98% de satisfação|<strong>Durabilidade:<\/strong>\s*20\+ anos/i, file);
  }
});

test('páginas públicas não exibem depoimentos, nomes ou métricas sem comprovação', async () => {
  for (const path of [
    'index.html',
    'pages/estados/sao-paulo.html',
    'pages/estados/sao-paulo.html.html',
  ]) {
    const html = await readFile(new URL(`../dist/client/${path}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /Carlos Silva|Ana Paula Mendes|Roberto Costa|Fernando Oliveira|Mariana Santos|Paulo Ricardo/i, path);
    assert.doesNotMatch(html, /850\s*Obras|100%\s*Garantia|Avaliação 5 estrelas/i, path);
    assert.doesNotMatch(html, /href="#depoimentos"|id="depoimentos"/i, path);
  }

  const [sitemap, legacyReviews, vercelConfig] = await Promise.all([
    readFile(sitemapPath, 'utf8'),
    readFile(new URL('../dist/client/pages/depoimentos.html', import.meta.url), 'utf8'),
    readFile(new URL('../vercel.json', import.meta.url), 'utf8').then(JSON.parse),
  ]);
  assert.doesNotMatch(sitemap, /\/pages\/depoimentos\.html/);
  assert.match(legacyReviews, /<meta name="robots" content="noindex, follow">/);
  assert.ok(vercelConfig.redirects.some(
    (redirect) => redirect.source === '/pages/depoimentos.html' && redirect.destination === '/',
  ));
});

test('o favicon oficial tem uma única referência indexável e está no manifesto', async () => {
  const [html, manifestText] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(manifestPath, 'utf8'),
  ]);
  const iconLinks = html.match(/<link rel="icon"[^>]*>/g) ?? [];
  const manifest = JSON.parse(manifestText);

  assert.equal(iconLinks.length, 1);
  assert.match(iconLinks[0], /href="\/pratika-sport-favicon-192\.png"/);
  assert.equal(manifest.icons[0].src, '/pratika-sport-favicon-192.png');
});

test('a página inicial usa o domínio www como canonical', async () => {
  const html = await readFile(homePath, 'utf8');

  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.pratikasport\.com\.br"/,
  );
});

test('o sitemap lista somente URLs indexáveis e inclui imagens relevantes', async () => {
  const sitemap = await readFile(sitemapPath, 'utf8');

  assert.match(
    sitemap,
    /https:\/\/www\.pratikasport\.com\.br\/pages\/servicos\/quadras-poliesportivas\.html/,
  );
  assert.match(sitemap, /<image:image>/);
  assert.doesNotMatch(sitemap, /\/pages\/estados\/distrito-federal\.html/);
});

test('a página de quadra poliesportiva não exibe ano desatualizado e possui breadcrumb', async () => {
  const html = await readFile(multisportPath, 'utf8');

  assert.match(html, /<title>Construção e Reforma de Quadra Poliesportiva \| Pratika Sport<\/title>/);
  assert.doesNotMatch(html, /2025/);
  assert.match(html, /BreadcrumbList/);
});

test('nenhuma página pública exibe valores monetários', async () => {
  const outputDirectory = new URL('../dist/client/', import.meta.url);
  const allFiles = await readdir(outputDirectory, { recursive: true });
  for (const file of allFiles.filter((path) => path.endsWith('.html'))) {
    const html = await readFile(new URL(file.replaceAll('\\', '/'), outputDirectory), 'utf8');
    assert.doesNotMatch(html, /R\$|R&#(?:36|x24);/i, file);
    assert.equal((html.match(/src="\/analytics\.js"/g) ?? []).length, 1, file);
  }
  const publicHtmlFiles = [
    new URL('../dist/client/pages/servicos/campo-de-futebol.html', import.meta.url),
    new URL('../dist/client/pages/servicos/quadras-poliesportivas.html', import.meta.url),
    new URL('../dist/client/pages/servicos/quadra-de-tenis.html', import.meta.url),
    new URL('../dist/client/pages/servicos/quadra-de-beach-tennis.html', import.meta.url),
    new URL('../dist/client/pages/servicos/reforma-de-quadras.html', import.meta.url),
    new URL('../dist/client/pages/servicos/manutencao-de-quadras.html', import.meta.url),
    new URL('../dist/client/pages/blog/quanto-custa-construir-quadra-poliesportiva.html', import.meta.url),
  ];
  const pages = await Promise.all(publicHtmlFiles.map((path) => readFile(path, 'utf8')));

  for (const page of pages) {
    assert.doesNotMatch(page, /R\$/i);
  }
  for (const path of [
    'campo-de-futebol.html',
    'manutencao-de-quadras.html',
    'quadra-de-beach-tennis.html',
    'quadra-de-tenis.html',
    'quadras-poliesportivas.html',
    'reforma-de-quadras.html',
  ]) {
    const html = await readFile(new URL(`../dist/client/pages/servicos/${path}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /Quanto Custa|Valores aproximados|Investimento em Manutenção|<strong>Investimento:<\/strong>/i, path);
    assert.doesNotMatch(html, /<title>[^<]*(?:Pre[cç]o|2025)[^<]*<\/title>/i, path);
    assert.doesNotMatch(html, /centenas de quadras/i, path);
    assert.doesNotMatch(html, /20\+ anos|15\+ anos|garantia de 5 anos/i, path);
    const serviceSlug = getServiceSlug(`/pages/servicos/${path}`);
    assert.equal(html.match(/<title>([^<]+)<\/title>/)?.[1], serviceMetadata[serviceSlug].title, path);
  }
  const polysportPage = await readFile(new URL('../dist/client/pages/servicos/quadras-poliesportivas.html', import.meta.url), 'utf8');
  assert.match(polysportPage, /A Pratika Sport desenvolve projetos de quadras poliesportivas para condomínios, clubes, escolas e academias em todo o Brasil\./);
  const planningArticle = await readFile(new URL('../dist/client/pages/blog/quanto-custa-construir-quadra-poliesportiva.html', import.meta.url), 'utf8');
  assert.match(planningArticle, /<title>Construção de Quadra Poliesportiva: Planejamento \| Pratika Sport<\/title>/);
  assert.doesNotMatch(planningArticle, /Quanto custa construir uma quadra poliesportiva|Preços de R\$|Custo médio (?:mensal|anual)/i);
});

test('a identificação de páginas de serviço funciona em caminhos Windows e Linux', () => {
  assert.equal(getServiceSlug('C:\\repo\\pages\\servicos\\quadra-de-tenis.html'), 'quadra-de-tenis');
  assert.equal(getServiceSlug('/vercel/path0/pages/servicos/quadra-de-tenis.html'), 'quadra-de-tenis');
});

test('remoção de preços preserva navegação, modalidades e conteúdo técnico do campo', async () => {
  const html = await readFile(new URL('../dist/client/pages/servicos/campo-de-futebol.html', import.meta.url), 'utf8');
  assert.match(html, /nav-desktop/);
  assert.match(html, /Society 20x40m/);
  assert.match(html, /Campo oficial \(grama natural\)/);
  assert.match(html, /id="planejar-orcamento"/);
  assert.match(html, /id="avaliacao-do-espaco"/);
  assert.match(html, /\/pages\/estados\/sao-paulo"/);
  assert.equal((html.match(/rel="icon"/g) ?? []).length, 1);
});
