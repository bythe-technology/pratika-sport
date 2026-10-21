import test from 'node:test';
import assert from 'node:assert/strict';
import { stat, readFile } from 'node:fs/promises';
import sharp from 'sharp';
import photos from '../data/project-photos.json' with { type: 'json' };

test('six photographs retain their original source and responsive dimensions', async () => {
  assert.equal(Object.keys(photos).length,6);
  for(const [id,photo] of Object.entries(photos)) {
    assert.ok((await stat(`public${photo.source}`)).size>1000);
    assert.match(photo.alt,/Foto do acervo/);
    for(const width of [360,720,1080]) for(const format of ['avif','webp']) {
      const path=`dist/client/images/projects/${id}-${width}.${format}`;
      const metadata=await sharp(path).metadata();
      assert.equal(metadata.width,width);
      assert.equal(metadata.height,Math.round(width*2/3));
      assert.ok((await stat(path)).size<250000,path);
    }
  }
});

test('home and São Paulo retain original photos alongside labeled illustrations', async () => {
  for(const path of ['index.html','pages/estados/sao-paulo.html.html']) {
    const html=await readFile(`dist/client/${path}`,'utf8');
    for(const id of Object.keys(photos)) assert.match(html,new RegExp(`images/projects/${id}-1080.webp`));
    assert.match(html,/id="quadras-reais"/);
    assert.match(html,/Do desenho à realidade/);
    assert.match(html,/Ilustração conceitual/);
    assert.doesNotMatch(html,/R\$\s*\d/);
  }
});
