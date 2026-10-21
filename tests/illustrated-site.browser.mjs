import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { startStaticServer } from './helpers/static-server.mjs';

const server = await startStaticServer();
const browser = await chromium.launch({ channel:'chrome', headless:true });
const output = 'work/illustration-qa';
await mkdir(output, { recursive:true });
const results = [];
const pages = ['/', '/pages/estados/sao-paulo', '/pages/servicos/quadras-poliesportivas.html', '/pages/servicos/manutencao-de-quadras.html', '/pages/blog.html', '/pages/blog/tipos-de-piso-quadra-de-tenis.html', '/pages/sobre.html', '/pages/contato.html', '/politica-privacidade.html', '/termos-servico.html'];
try {
  for (const width of [360,390,768,1440]) {
    const context = await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page = await context.newPage();
    await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of pages) {
      await page.goto(server.url + path, {waitUntil:'networkidle'});
      assert.equal(await page.locator('h1').count(),1,path);
      const overflow = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, elements: [...document.querySelectorAll('body *')].filter(element => { const rect=element.getBoundingClientRect(); return rect.width && rect.right>innerWidth+1; }).map(element => ({tag:element.tagName,class:element.className,right:element.getBoundingClientRect().right})).slice(0,18) }));
      if (overflow.scroll > width+1) await page.screenshot({path:`${output}/overflow-${width}.png`});
      assert.ok(overflow.scroll <= width+1,`Overflow ${width} ${path}: ${JSON.stringify(overflow)}`);
      if (path === '/') {
        await page.screenshot({path:`${output}/home-${width}-first-visit.png`});
        await page.getByRole('button',{name:'Recusar medição',exact:true}).click();
        assert.equal(await page.locator('.story-controls [aria-selected="true"]').innerText(),'04\nFinalizar');
        await page.getByRole('tab',{name:/01Preparar|01\s+Preparar/}).click();
        assert.match(await page.locator('.story-description').innerText(),/avaliação do terreno/);
        await page.getByRole('tab',{name:/02Estruturar|02\s+Estruturar/}).focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await page.locator('.story-controls [aria-selected="true"]').getAttribute('id'),'stage-2');
        if (width < 768) {
          await page.getByRole('button',{name:'Abrir menu de navegação'}).click();
          assert.equal(await page.getByRole('button',{name:'Fechar menu de navegação'}).getAttribute('aria-expanded'),'true');
          await page.keyboard.press('Escape');
        }
      }
      if (width === 390 && path.includes('/servicos/quadras')) {
        await page.locator('.illustrated-mobile-nav summary').click();
        assert.ok(await page.locator('.illustrated-mobile-nav nav').isVisible());
        await page.locator('.illustrated-mobile-nav summary').click();
      }
      await page.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=600) { window.scrollTo(0,y); await new Promise(done=>setTimeout(done,20)); } });
      await page.waitForLoadState('networkidle');
      const broken = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')));
      assert.deepEqual(broken, [], `Broken images ${width} ${path}`);
      const badContact = await page.locator('a[href*="wa.me"]').evaluateAll(anchors => anchors.filter(anchor => !anchor.href.includes('5515997157642')).map(anchor=>anchor.href));
      assert.deepEqual(badContact, [], `WhatsApp ${path}`);
      await page.evaluate(() => window.scrollTo(0,0));
      await page.evaluate(async () => { await Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))); await new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done))); });
      await page.screenshot({path:`${output}/${path==='/'?'home':path.replaceAll('/','_')}-${width}.png`});
      if (path === '/' && [390,1440].includes(width)) {
        for (const section of ['service-grid','surfaces-grid','steps-grid','quote-container','main-footer']) await page.locator(`.${section}`).screenshot({path:`${output}/${section}-${width}.png`});
      }
      results.push({width,path,brokenImages:broken.length});
    }
    assert.deepEqual(errors, [], `Browser runtime ${width}`);
    await context.close();
  }
  const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page = await noJs.newPage();
  await page.goto(server.url);
  assert.ok(await page.locator('.story-frame.is-active img').isVisible());
  assert.equal(await page.locator('.story-controls [aria-selected="true"]').getAttribute('id'),'stage-3');
  await noJs.close();
  const motion = await browser.newContext({viewport:{width:1440,height:900}});
  const animated = await motion.newPage();
  await animated.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await animated.addInitScript(() => { window.open = url => { window.__testQuoteUrl = String(url); return null; }; });
  await animated.goto(server.url);
  await animated.getByRole('button',{name:'Recusar medição',exact:true}).click();
  await animated.waitForFunction(() => document.querySelector('.story-controls [aria-selected="true"]')?.id === 'stage-1');
  await animated.getByRole('button',{name:'Pausar',exact:true}).click();
  await animated.getByRole('button',{name:'Repetir etapas',exact:true}).click();
  await animated.waitForFunction(() => document.querySelector('.story-controls [aria-selected="true"]')?.id === 'stage-3' && [...document.querySelectorAll('button')].some(button=>button.textContent==='Continuar'));
  await animated.getByLabel('Nome / Empresa / Condomínio *',{exact:true}).fill('Teste local');
  await animated.getByLabel('WhatsApp ou Telefone *',{exact:true}).fill('11900000000');
  await animated.getByLabel('Cidade e Estado (UF) *',{exact:true}).fill('São Paulo / SP');
  await animated.getByRole('button',{name:'Enviar Proposta pelo WhatsApp'}).click();
  await animated.waitForFunction(() => !!window.__testQuoteUrl);
  const quoteUrl = new URL(await animated.evaluate(()=>window.__testQuoteUrl));
  assert.equal(quoteUrl.hostname,'wa.me');
  assert.equal(quoteUrl.pathname,'/5515997157642');
  assert.match(quoteUrl.searchParams.get('text'),/Teste local/);
  await motion.close();
  await writeFile(`${output}/browser-results.json`,JSON.stringify(results,null,2));
  console.log(`${results.length} page/viewport checks passed; no-JS fallback, automatic playback, pause/replay and local quote flow passed.`);
} finally { await browser.close(); await server.close(); }
