const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1116-1220-0_26.1116.1220.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
 const { services } = await import('../src/data/services.js');
 const browser = await chromium.launch({channel:'msedge',headless:true});
 try {
  const page = await browser.newPage({reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://theme.test/**',async r=>{
   let p=new URL(r.request().url()).pathname;
   if(!path.extname(p))p='/index.html';
   const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.ttf':'font/ttf','.jpg':'image/jpeg'};
   await r.fulfill({path:path.join(process.cwd(),'dist',p),contentType:mime[path.extname(p)]||'application/octet-stream'});
  });
  const routes=['/services','/about','/service-areas','/contact',...services.map(s=>'/services/'+s.slug),'/not-a-page','/400.html','/401.html','/403.html','/404.html','/500.html','/502.html','/503.html','/504.html'];
  for(const width of (process.env.THEME_WIDTHS || "390,768,1440").split(",").map(Number)){
   await page.setViewportSize({width,height:1000});
   for(const route of routes){
    await page.goto('https://theme.test'+route);
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('h1').count(),1,route+' h1');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route} ${width}: overflow`);
    const outside=await page.locator('main h1,main h2,main h3,main input,main select,main textarea,main button').evaluateAll(els=>els.filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left< -1||r.right>innerWidth+1)}).map(el=>el.textContent));
    assert.deepEqual(outside,[],`${route} ${width}: content outside viewport`);
    if(!route.endsWith('.html')){
     const label=page.locator('main .eyebrow,main .kicker').first();
     assert.equal(await label.evaluate(el=>getComputedStyle(el,'::before').height),'2px',route+' label rule');
    }
    if(route==='/services'){
     assert.equal(await page.locator('.service-card img').count(),services.length);
     await page.locator('.service-card img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading="eager";return img.decode()})));
    }
    if(route.startsWith('/services/')){
     const q=page.locator('.faq-summary').first();
     await q.click();
     assert.equal(await q.getAttribute('aria-expanded'),'true');
     const answer=await q.getAttribute('aria-controls');
     assert.equal(await page.locator(`[id="${answer}"]`).getAttribute('aria-hidden'),'false');
    }
    if([390,1440].includes(width)&&['/services','/about','/service-areas','/contact','/services/ac-repair','/not-a-page'].includes(route)){
     const section=page.locator('main > section').nth(1);
     const target=await section.count()?section:page.locator('main');
     await target.scrollIntoViewIfNeeded();
     await target.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading="eager";return img.decode()})));
     await target.screenshot({path:`tmp/theme-${route.slice(1).replaceAll('/','-')}-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});
    }
   }
   console.log(`${width}px: ${routes.length} pages checked; layout, FAQ states, headings and service imagery passed`);
  }
  await page.goto('https://theme.test/service-areas');
  await page.locator('#area-zip').fill('32801');
  await page.getByRole('button',{name:'Ask about service'}).click();
  await page.waitForURL('**/contact?zip=32801');
  assert.equal(await page.getByLabel('Florida ZIP code').inputValue(),'32801');
  await page.getByLabel('Full name').fill('Preview Check');
  await page.getByLabel('Email address').fill('preview@example.com');
  await page.getByLabel('Phone number').fill('2025550100');
  await page.getByLabel('Tell us a little more').fill('Checking the local inquiry preview.');
  await page.getByRole('button',{name:'Prepare inquiry'}).click();
  await page.getByRole('status').waitFor();
  assert.match(await page.getByRole('status').innerText(),/Nothing has been sent/);
  assert.deepEqual(errors,[]);
  console.log('ZIP handoff and local inquiry preparation passed; no JavaScript errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
