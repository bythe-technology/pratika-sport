import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import catalog from '../data/illustrations.json' with { type: 'json' };

test('hero scenes use real transparent responsive assets', async () => {
  const scenes = Object.entries(catalog).filter(([,item])=>item.hero);
  assert.equal(scenes.length,4);
  for(const [id,item] of scenes) for(const width of [360,720,1080]) for(const format of ['webp','avif']) {
    const file = `dist/client${item.hero.base}-${width}.${format}`;
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.hasAlpha,true,file);
    assert.equal(metadata.width,width,file);
    const corner = await sharp(file).extract({left:0,top:0,width:1,height:1}).raw().toBuffer();
    assert.ok(corner[3] < 10,`${id}: corner must blend with the page`);
  }
});

test('both modern entry pages include the transparent hero scene and original routes',async()=>{
  for(const path of ['index.html','pages/estados/sao-paulo.html.html']) {
    const html = await readFile(`dist/client/${path}`,'utf8');
    assert.match(html,/images\/illustrations\/hero-v2\/etapa-pronta-1080.webp/);
    assert.match(html,/role="tablist"/);
    assert.match(html,/Ilustração conceitual/);
    assert.match(html,/5515997157642/);
  }
});
