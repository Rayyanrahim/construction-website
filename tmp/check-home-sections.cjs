const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1116-1220-0_26.1116.1220.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://sections.test/**', async route => {
      let pathname = new URL(route.request().url()).pathname;
      if (!path.extname(pathname)) pathname = '/index.html';
      const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.jpg': 'image/jpeg' };
      await route.fulfill({ path: path.join(process.cwd(), 'dist', pathname), contentType: mime[path.extname(pathname)] || 'application/octet-stream' });
    });
    await page.goto('https://sections.test/');
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const selector of ['.work-section', '.comfort-section', '.home-faq']) {
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        await section.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
        const outside = await section.locator('h2,h3,p,a,button,img').evaluateAll(elements => elements.filter(el => { const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }).map(el => el.textContent || el.getAttribute('alt')));
        assert.deepEqual(outside, [], `${width} ${selector}: content escapes viewport`);
        if (width === 390 || width === 1440) await section.screenshot({ path: `tmp/${selector.slice(1)}-${width}.png`, style: ".site-header, .skip-link { visibility: hidden !important; }" });
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}: page overflow`);
      console.log(`${width}px: sections fit, all images loaded`);
    }
    const buttons = page.locator('.home-faq .faq-summary');
    assert.equal(await buttons.nth(0).getAttribute('aria-expanded'), 'true');
    await buttons.nth(1).click();
    assert.equal(await buttons.nth(0).getAttribute('aria-expanded'), 'false');
    assert.equal(await buttons.nth(1).getAttribute('aria-expanded'), 'true');
    const panelId = await buttons.nth(1).getAttribute('aria-controls');
    assert.equal(await page.locator(`[id="${panelId}"]`).getAttribute('aria-hidden'), 'false');
    await buttons.nth(1).press('Enter');
    assert.equal(await buttons.nth(1).getAttribute('aria-expanded'), 'false');
    await buttons.nth(2).focus();
    await page.keyboard.press('Space');
    assert.equal(await buttons.nth(2).getAttribute('aria-expanded'), 'true');
    console.log('FAQ: default answer, single-open behavior, Enter/Space and ARIA passed');
    for (const [selector, destination] of [['.work-details .text-link', '/about'], ['.comfort-card:first-child', '/services'], ['.comfort-card:nth-child(2)', '/services/commercial-hvac'], ['.comfort-footer a', '/service-areas'], ['.faq-intro .text-link', '/contact']]) {
      await page.locator(selector).click();
      await page.waitForURL('https://sections.test' + destination);
      assert.equal(await page.locator('h1').count(), 1);
      await page.goto('https://sections.test/');
    }
    await page.goto('https://sections.test/services/ac-repair');
    const detailButtons = page.locator('.faq-summary');
    assert.equal(await detailButtons.first().getAttribute('aria-expanded'), 'false');
    await detailButtons.first().click();
    assert.equal(await detailButtons.first().getAttribute('aria-expanded'), 'true');
    assert.deepEqual(errors, []);
    console.log('Section links, service-page FAQ and JavaScript error checks passed');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
