import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import catalog from '../data/illustrations.json' with { type: 'json' };
import { enhanceIllustratedPage } from '../scripts/illustrated-pages.mjs';

test('all 18 illustrations have six published responsive variants', async () => {
  assert.equal(Object.keys(catalog).length, 18);
  for (const [id, item] of Object.entries(catalog)) {
    assert.ok(item.alt.length > 25, id);
    for (const width of [360,720,1080]) for (const format of ['avif','webp']) {
      const asset = await stat(resolve(`dist/client${item.base}-${width}.${format}`));
      assert.ok(asset.size > 1000 && asset.size < 220000, `${id}-${width}.${format}`);
    }
  }
});

test('legacy presentation preserves H1, canonical and content while replacing the shell', () => {
  const html = '<html><head><link rel="canonical" href="https://www.pratikasport.com.br/example"></head><body><header>Old navigation</header><section class="page-header"><div class="container"><h1>Original title</h1></div></section><main><p>Original useful content.</p></main><footer>Old footer</footer><script>new Image().src="https://crm.shalub.com.br/pixel"</script></body></html>';
  const result = enhanceIllustratedPage(html, '/pages/servicos/quadra-de-tenis.html');
  assert.match(result, /<h1>Original title<\/h1>/);
  assert.match(result, /Original useful content/);
  assert.match(result, /rel="canonical" href="https:\/\/www.pratikasport.com.br\/example"/);
  assert.match(result, /servico-tenis-1080.webp/);
  assert.match(result, /Ilustração conceitual/);
  assert.doesNotMatch(result, /crm\.shalub|Old navigation|Old footer/);
  assert.equal(enhanceIllustratedPage(result, '/pages/servicos/quadra-de-tenis.html'), result);
});

test('legal pages use shared navigation without decorative generated imagery', async () => {
  for (const path of ['politica-privacidade.html','termos-servico.html']) {
    const html = await readFile(resolve('dist/client',path),'utf8');
    assert.match(html, /data-legal-page="true"/);
    assert.match(html, /class="illustrated-header"/);
    assert.match(html, /class="illustrated-footer"/);
    assert.doesNotMatch(html, /images\/illustrations\//);
    assert.equal((html.match(/src="\/analytics.js"/g) ?? []).length, 1);
  }
});

test('every generated legacy route gets a consistent visual shell', async () => {
  const files = await readdir(resolve('dist/client/pages'), { recursive: true });
  for (const file of files.filter(file => file.endsWith('.html') && !file.includes('sao-paulo'))) {
    const html = await readFile(resolve('dist/client/pages',file), 'utf8');
    assert.match(html, /data-illustrated-page="true"/, file);
    assert.equal((html.match(/class="illustrated-header"/g) ?? []).length, 1, file);
    assert.equal((html.match(/class="illustrated-footer"/g) ?? []).length, 1, file);
    assert.doesNotMatch(html, /crm\.shalub\.com\.br/, file);
  }
});
