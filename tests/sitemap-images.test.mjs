import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getSitemapImages } from '../scripts/sitemap-images.mjs';

const origin='https://www.pratikasport.com.br';
test('sitemap preserves primary image and deduplicates real photographs',()=>{
  const html='<meta property="og:image" content="/images/original.jpg"><img src="/images/projects/tenis-1080.webp"><img src="/images/projects/tenis-1080.webp"><img src="/images/projects/beach-1080.webp">';
  assert.deepEqual(getSitemapImages(html,origin+'/'),[origin+'/images/original.jpg',origin+'/images/projects/tenis-1080.webp',origin+'/images/projects/beach-1080.webp']);
});
test('sitemap rejects external/data/malformed images and handles empty pages',()=>{
  assert.deepEqual(getSitemapImages('',origin+'/'),[]);
  assert.deepEqual(getSitemapImages('<img src="data:image/png;base64,abc"><img src="https://elsewhere.example/images/projects/a.webp">',origin+'/'),[]);
  assert.deepEqual(getSitemapImages('<meta property="og:image" content="http://[invalid">',origin+'/'),[]);
  assert.deepEqual(getSitemapImages('<img src="../../images/photo.jpg">',origin+'/pages/servicos/a.html'),[origin+'/images/photo.jpg']);
});
test('published home and São Paulo sitemaps expose all six real photos without duplicate entries',async()=>{
  const xml=await readFile('dist/client/sitemap.xml','utf8');
  for(const path of ['/','/pages/estados/sao-paulo']) {
    const block=[...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match=>match[1]).find(body=>body.includes(`<loc>${origin}${path}</loc>`));
    assert.ok(block,path);
    const images=[...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(match=>match[1]);
    assert.equal(images.length,new Set(images).size);
    for(const id of ['poliesportiva','tenis','beach','society','modular','reforma'])assert.ok(images.includes(`${origin}/images/projects/${id}-1080.webp`),`${path}: ${id}`);
  }
});

test('all modern in-page navigation destinations exist, including the real-photo menu',async()=>{
  for(const path of ['index.html','pages/estados/sao-paulo.html.html']) {
    const html=await readFile(`dist/client/${path}`,'utf8');
    const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
    const targets=[...html.matchAll(/href="#([^"]+)"/g)].map(match=>match[1]);
    for(const id of targets)assert.ok(ids.has(id),`${path}: missing #${id}`);
    assert.match(html,/href="#quadras-reais"[^>]*><span>Quadras reais<\/span>/);
    assert.match(html,/Fotos das quadras reais/);
  }
});
