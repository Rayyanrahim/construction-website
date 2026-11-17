const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1116-1220-0_26.1116.1220.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ hasTouch: true });
    await page.route('https://slider.test/**', async route => {
      const path = require('node:path');
      const url = new URL(route.request().url());
      const file = path.join(process.cwd(), 'dist', url.pathname === '/' ? 'index.html' : url.pathname);
      const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.ttf': 'font/ttf', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
      await route.fulfill({ path: file, contentType: mime[path.extname(file)] || 'application/octet-stream' });
    });
    await page.goto('https://slider.test/');
    for (const width of [320, 390, 700, 800, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.locator('#home-service-slider').scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      const state = await page.evaluate(async () => {
        const track = document.querySelector('#home-service-slider');
        track.scrollTo({ left: 0, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 100));
        const card = track.firstElementChild;
        const result = {
          arrows: getComputedStyle(document.querySelector('.service-slider-controls')).display !== 'none',
          peek: track.clientWidth - card.clientWidth,
          overflow: document.documentElement.scrollWidth > innerWidth,
          initial: document.querySelector('progress').value,
          textFits: [...track.children].every(c => {
            const text = c.querySelector('.photo-card-text').getBoundingClientRect();
            const arrow = c.querySelector('.photo-card-arrow').getBoundingClientRect();
            return text.top > arrow.bottom && text.bottom <= c.getBoundingClientRect().bottom;
          }),
        };
        track.scrollTo({ left: track.scrollWidth, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 150));
        result.end = document.querySelector('progress').value;
        result.lastVisible = Math.abs(track.lastElementChild.getBoundingClientRect().right - track.getBoundingClientRect().right) < 3;
        track.scrollTo({ left: 0, behavior: 'instant' });
        return result;
      });
      console.log(width, JSON.stringify(state));
      if (state.overflow || state.initial !== 1 || state.end !== 9 || !state.lastVisible || state.arrows !== (width > 700) || (width <= 700 && (!state.textFits || state.peek < 20))) throw new Error('Slider layout failed at ' + width);
      if (width === 390) await page.locator('.home-services').screenshot({ path: 'tmp/slider-mobile.png' });
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
