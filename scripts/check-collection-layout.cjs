const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
(async () => {
  const fs = require('node:fs'), path = require('node:path');
  const root = path.resolve(__dirname, '../standalone');
  const server = require('node:http').createServer((req,res) => {
    const file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root + '/')) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, data) => { if(err) res.writeHead(404).end(); else res.end(data); });
  });
  await new Promise(resolve => server.listen(8766, '127.0.0.1', resolve));
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
  for (const width of [320, 390, 430]) {
    const page = await browser.newPage({ viewport: { width, height: 844 }, deviceScaleFactor: 2 });
    await page.goto('http://127.0.0.1:8766/law.html');
    await page.evaluate(() => { openBadgeGallery(); });
    await page.locator('.badge-stage-art').evaluate(img => img.decode());
    const badges = await page.evaluate(() => {
      const grid = document.querySelector('.badge-grid-new');
      const footer = document.querySelector('.badge-footer');
      return { overflow: grid.scrollWidth > grid.clientWidth + 1,
        gridBottom: grid.getBoundingClientRect().bottom,
        footerTop: footer.getBoundingClientRect().top,
        widths: [...grid.children].map(el => el.getBoundingClientRect().width) };
    });
    assert.equal(badges.overflow, false);
    assert.ok(badges.footerTop >= badges.gridBottom);
    assert.ok(Math.max(...badges.widths) - Math.min(...badges.widths) < 1);
    await page.screenshot({ path: `/tmp/badges-${width}.png`, fullPage: true });
    await page.evaluate(() => openSkinGallery());
    await page.locator('.skin-stage img').evaluate(img => img.decode());
    const skin = await page.locator('.skin-stage img').evaluate(img => ({ fit: getComputedStyle(img).objectFit, w: img.naturalWidth, h: img.naturalHeight }));
    assert.equal(skin.fit, 'contain');
    assert.ok(skin.w >= 1024 && skin.h >= 1536, 'Skin must use a standalone high resolution portrait');
    const allArt = await page.evaluate(async () => Promise.all(SKINS.map(s => new Promise((resolve, reject) => {
      const img = new Image(); img.onload = () => resolve({ key: s.key, width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject; img.src = s.art;
    }))));
    assert.ok(allArt.every(a => a.width >= 1024 && a.height >= 1536));
    await page.screenshot({ path: `/tmp/skins-${width}.png`, fullPage: true });
    console.log(JSON.stringify({ width, badges, skin }));
    await page.close();
  }
  await browser.close();
  server.close();
})().catch(e => { console.error(e); process.exit(1); });
