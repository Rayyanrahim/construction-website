const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1116-1220-0_26.1116.1220.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const page=await browser.newPage();
 await page.route('https://brand.test/**',async r=>{
  let p=new URL(r.request().url()).pathname;
  if (!path.extname(p)) p='/index.html';
  const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.ttf':'font/ttf','.jpg':'image/jpeg'};
  await r.fulfill({path:path.join(process.cwd(),'dist',p),contentType:mime[path.extname(p)]||'application/octet-stream'});
 });
 await page.goto('https://brand.test/');
 for(const width of [320,390,901,1024,1440]){
  await page.setViewportSize({width,height:950});
  await page.evaluate(()=>document.fonts.ready);
  const status=await page.evaluate(()=>{
   const logo=document.querySelector('.site-header .brand');
   const nav=document.querySelector('#main-navigation');
   return {name:logo.innerText.replace(/\s+/g,' '),overflow:document.documentElement.scrollWidth>innerWidth,overlap:innerWidth>900&&logo.getBoundingClientRect().right>nav.getBoundingClientRect().left,loaded:logo.querySelector('img').naturalWidth>0};
  });
  console.log(width,status);
  if(status.overflow||status.overlap||!status.loaded||status.name!=='FL CONSTRUCTION VENTURE') throw Error('Logo layout failed');
  if(width===390||width===1440) await page.screenshot({path:`tmp/brand-${width}.png`});
 }
 for(const route of ['/about','/contact','/services','/404.html']){
  await page.goto('https://brand.test'+route);
  if(!await page.title().then(t=>t.includes('FL CONSTRUCTION VENTURE'))) throw Error('Wrong title '+route);
  const stale=await page.locator('body').innerText().then(t=>/Florida Construction Venture|FL Venture Corporation|Coporation/.test(t));
  if(stale)throw Error('Old name '+route);
 }
 console.log('Page names and titles passed');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
