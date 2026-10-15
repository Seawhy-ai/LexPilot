const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const EXPECTED_RARITIES = ['普通', '普通', '勇者', '勇者', '史诗', '史诗', '传说', '传说', '典藏'];
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
    const rarity = await page.evaluate(() => ({
      labels: [...document.querySelectorAll('.sp-rarity')].map(el => el.textContent),
      animated: [...document.querySelectorAll('.sp-rarity.legendary,.sp-rarity.collector')].every(el => getComputedStyle(el).animationName !== 'none')
    }));
    assert.deepEqual(rarity.labels, EXPECTED_RARITIES);
    assert.equal(rarity.animated, true);
    await page.evaluate(() => openLottery());
    const lottery = await page.evaluate(() => {
      const nav = document.querySelector('#lotteryView .wx-nav');
      const back = nav.querySelector('.back').getBoundingClientRect();
      const rules = nav.querySelector('.lottery-rules').getBoundingClientRect();
      const stats = [...document.querySelectorAll('#lotteryView .lottery-stat')].map(el => el.getBoundingClientRect().height);
      const ctas = [...document.querySelectorAll('#lotteryView .l-cta')];
      const row = document.querySelector('#lotteryView .lottery-cta-row');
      return { navOverlap: !(back.right <= rules.left || rules.right <= back.left), stats, ctaCount: ctas.length,
        ctaRows: new Set(ctas.map(el => Math.round(el.getBoundingClientRect().top))).size,
        ctaOverflow: row.scrollWidth > row.clientWidth + 1,
        legacyCards: document.querySelectorAll('#lotteryView .limited-collection').length };
    });
    assert.equal(lottery.navOverlap, false);
    assert.equal(lottery.ctaCount, 4);
    assert.equal(lottery.ctaRows, 1);
    assert.equal(lottery.ctaOverflow, false);
    assert.equal(lottery.legacyCards, 0);
    assert.ok(lottery.stats.every(h => h <= 56));
    await page.screenshot({ path: `/tmp/lottery-${width}.png`, fullPage: true });
    await page.evaluate(() => showLawFirm());
    const firm = await page.evaluate(() => {
      const body = document.getElementById('firmBody');
      const view = document.getElementById('lawFirmView');
      return { shown: view.classList.contains('show'), scrollable: body.scrollHeight > body.clientHeight,
        overflowY: getComputedStyle(body).overflowY, backCount: view.querySelectorAll('.wx-nav .back').length };
    });
    assert.equal(firm.shown, true);
    assert.equal(firm.scrollable, true);
    assert.equal(firm.overflowY, 'auto');
    assert.equal(firm.backCount, 1);
    await page.screenshot({ path: `/tmp/law-firm-${width}.png`, fullPage: true });
    await page.locator('#lawFirmView .wx-nav .back').click();
    assert.equal(await page.evaluate(() => document.getElementById('learnCenterView').classList.contains('show')), true);
    console.log(JSON.stringify({ width, badges, skin, rarity, lottery, firm }));
    await page.close();
  }
  await browser.close();
  server.close();
})().catch(e => { console.error(e); process.exit(1); });
