const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1116-1220-0_26.1116.1220.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.route('https://hero.test/**', async route => {
      const url = new URL(route.request().url());
      const file = path.join(process.cwd(), 'dist', url.pathname === '/' ? 'index.html' : url.pathname);
      const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.ttf': 'font/ttf', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
      await route.fulfill({ path: file, contentType: mime[path.extname(file)] || 'application/octet-stream' });
    });
    await page.goto('https://hero.test/');
    await page.waitForFunction(() => { const v=document.querySelector('video'); return v && !v.paused && v.currentTime > 0.5; });
    console.log('video', await page.locator('video').evaluate(v => ({ muted: v.muted, loop: v.loop, inline: v.playsInline, duration: v.duration, width: v.videoWidth, playing: !v.paused })));
    await page.getByRole('button', {name:'Pause background video'}).click();
    if (!await page.locator('video').evaluate(v=>v.paused)) throw Error('Pause failed');
    await page.screenshot({path:'tmp/hero-desktop.png'});
    await page.getByRole('button', {name:'Play background video'}).click();
    await page.waitForFunction(()=>!document.querySelector('video').paused);
    await page.setViewportSize({width:390,height:844});
    await page.waitForTimeout(500);
    await page.screenshot({path:'tmp/hero-mobile.png'});
    if (await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error('Mobile overflow');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.reload();
    if (await page.locator('video').count()) throw Error('Reduced motion failed');
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.route('**/videos/*.mp4', r=>r.abort());
    await page.reload();
    await page.waitForFunction(()=>!document.querySelector('video'));
    console.log('Pause/resume, mobile overflow, reduced-motion and failed-video fallback passed');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
