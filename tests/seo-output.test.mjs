import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const homePath = new URL('../dist/client/index.html', import.meta.url);
const manifestPath = new URL(
  '../dist/client/site.webmanifest',
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
