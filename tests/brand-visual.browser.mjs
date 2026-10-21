import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { startStaticServer } from './helpers/static-server.mjs';

const server=await startStaticServer();
const browser=await chromium.launch({channel:'chrome',headless:true});
const output='work/brand-visual-qa';
await mkdir(output,{recursive:true});
const results=[];
try {
  for(const width of [360,390,768,834,1440]) {
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('**/*',route=>new URL(route.request().url()).origin===server.url?route.continue():route.abort());
    for(const path of ['/','/pages/estados/sao-paulo']) {
      await page.goto(server.url+path,{waitUntil:'networkidle'});
      await page.screenshot({path:`${output}/${width}-${path==='/'?'home':'sp'}-first-visit.png`});
      const consent=page.getByRole('button',{name:'Recusar medição',exact:true});
      if(await consent.isVisible())await consent.click();
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(done=>setTimeout(done,15));}});
      await page.waitForLoadState('networkidle');
      // Audit every asset, not only the lazy images intersecting this viewport.
      await page.locator('img').evaluateAll(images=>Promise.all(images.map(async image=>{
        image.loading='eager';
        await image.decode().catch(()=>{});
      })));
      assert.deepEqual(await page.locator('img').evaluateAll(images=>images.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src)),[]);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} ${path}`);
      assert.equal(await page.locator('.project-gallery-item').count(),4);
      assert.equal(await page.locator('.service-card .project-photo').count(),6);
      const common='.story-controls button,.project-gallery-item figcaption,.project-gallery-heading h2,.project-gallery-heading > p,.service-card-title,.project-preview strong,.hero-title,.hero-title em,.hero-description';
      const selectors=common+','+(path==='/'?'.surfaces-section .section-title,.surfaces-section .section-subtitle,.surfaces-section .surface-title,.surfaces-section .surface-desc,.trust-number,.trust-label':'.dark-section h2,.dark-section h3,.dark-section .step-card p,.dark-section .section-eyebrow');
      const contrast=await page.locator(selectors).evaluateAll(elements=>{
        const rgb=value=>value.match(/[\d.]+/g).map(Number);
        const luminance=channels=>channels.slice(0,3).map(value=>{const c=value/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;}).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
        return elements.map(el=>{
          const style=getComputedStyle(el);
          let parent=el;let bg=[255,255,255];
          while(parent){const parsed=rgb(getComputedStyle(parent).backgroundColor);if(parsed.length===3||parsed[3]===1){bg=parsed;break;}parent=parent.parentElement;}
          const a=luminance(rgb(style.color));const b=luminance(bg);
          return {text:el.textContent.slice(0,60),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),visible:style.visibility!=='hidden'&&Number(style.opacity)>0};
        });
      });
      for(const item of contrast){assert.ok(item.visible,item.text);assert.ok(item.ratio>=4.5,`${path} ${item.text}: ${item.ratio}`);}
      for(const tab of await page.getByRole('tab').all()) {
        await tab.click();
        assert.equal(await tab.getAttribute('aria-selected'),'true');
      }
      await page.locator('.project-preview').click();
      await page.waitForURL(/#quadras-reais$/);
      assert.ok(await page.locator('#project-gallery-title').isVisible());
      for(const selector of ['.hero','.project-gallery-section',path==='/'?'.surfaces-section':'.dark-section']) {
        await page.locator(selector).screenshot({path:`${output}/${width}-${path==='/'?'home':'sp'}-${selector.slice(1)}.png`});
      }
      results.push({width,path,photographs:6,gallery:4,contrastChecks:contrast.length,minimumContrast:Math.min(...contrast.map(item=>item.ratio))});
    }
    assert.deepEqual(errors,[]);
    await context.close();
  }
  await writeFile(`${output}/results.json`,JSON.stringify(results,null,2));
  console.log('10 responsive page checks passed, with restored photographs, gallery navigation and text contrast >=4.5:1.');
} finally {await browser.close();await server.close();}
