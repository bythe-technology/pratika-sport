import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

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

  assert.match(html, /<title>Construção de Quadra Poliesportiva \| Projeto e Reforma \| Pratika Sport<\/title>/);
  assert.doesNotMatch(html, /2025/);
  assert.match(html, /BreadcrumbList/);
});

test('nenhuma página pública exibe valores monetários', async () => {
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
});
