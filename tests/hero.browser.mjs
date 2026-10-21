import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { startStaticServer } from './helpers/static-server.mjs';

const server = await startStaticServer();
const browser = await chromium.launch({channel:'chrome',headless:true});
const output = 'work/hero-editorial-qa';
await mkdir(output,{recursive:true});
const results = [];
try {
  for(const width of [360,375,390,768,834,1024,1440]) {
    const context = await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    const page = await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*',route=>new URL(route.request().url()).origin===server.url?route.continue():route.abort());
    for(const path of ['/','/pages/estados/sao-paulo']) {
      await page.goto(server.url+path,{waitUntil:'networkidle'});
      assert.equal(await page.locator('.story-controls [aria-selected="true"]').getAttribute('id'),'stage-3');
      await page.locator('.construction-story').scrollIntoViewIfNeeded();
      await page.locator('.story-frame.is-active img').evaluate(image=>image.decode());
      const surface = await page.locator('.construction-story').evaluate(element=>({border:getComputedStyle(element).borderTopWidth,shadow:getComputedStyle(element).boxShadow,background:getComputedStyle(element).backgroundColor}));
      assert.equal(surface.border,'0px');
      assert.equal(surface.shadow,'none');
      assert.equal(surface.background,'rgba(0, 0, 0, 0)');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} ${path}`);
      await page.evaluate(()=>scrollTo(0,0));
      if(path==='/')await page.screenshot({path:`${output}/home-${width}-first-visit.png`});
      const banner=page.getByRole('button',{name:'Recusar medição',exact:true});
      if(await banner.isVisible())await banner.click();
      await page.screenshot({path:`${output}/${path==='/'?'home':'sao-paulo'}-${width}.png`});
      await page.locator('.hero').screenshot({path:`${output}/${path==='/'?'home':'sao-paulo'}-complete-${width}.png`});
      results.push({width,path,frame:false,overflow:false});
    }
    assert.deepEqual(errors,[]);
    await context.close();
  }
  await writeFile(`${output}/results.json`,JSON.stringify(results,null,2));
  console.log(`${results.length} frameless hero checks passed.`);
} finally {await browser.close();await server.close();}
