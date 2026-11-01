const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Users/ccy/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
 try {
  for (const width of [320,390,1280]) {
   const page = await browser.newPage({viewport:{width,height:900},isMobile:width<500,hasTouch:true,serviceWorkers:'block'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('**/api/lex/**',r=>r.fulfill({status:401,json:{error:'请先登录'}}));
   await page.goto((process.env.LEX_BASE_URL || 'http://127.0.0.1:8778')+'/law.html');
   await page.waitForSelector('#loginScreen.show');
   await page.evaluate(()=>{document.getElementById('loginScreen').classList.remove('show');document.getElementById('loginScreen').style.display='none';window.loadProfile=()=>({skinsOwned:[],skinFragments:0,soulCrystals:0});openSkinGallery()});
   assert.deepEqual(await page.evaluate(()=>SKINS.map(s=>s.rarity)),['普通','普通','勇者','勇者','勇者','史诗','史诗','传说','传说','传说','典藏','典藏']);
   const art=await page.evaluate(async()=>Promise.all(SKINS.map(s=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve({key:s.key,width:img.naturalWidth,height:img.naturalHeight,src:img.src});img.onerror=()=>reject(Error('Missing '+s.key));img.src=s.art}))));
   assert.equal(new Set(art.map(s=>s.src)).size,12);assert.ok(art.every(s=>s.width>=1024&&s.height>=1536));
   for(const key of ['sea','jade_oath','gold','crown','lord','amber_scale','starlord','sapphire_oath']) {
    await page.evaluate(key=>selectSkin(key),key);
    await page.locator('.skin-art').evaluate(img=>img.decode());
    const layers=await page.locator('.skin-aura i').count();
    assert.equal(layers,['starlord','sapphire_oath'].includes(key)?8:['crown','lord','amber_scale'].includes(key)?3:0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   }
   await page.screenshot({path:'/tmp/lex-hd-'+width+'.png'});
   await page.getByRole('button',{name:'查看高清立绘'}).click();
   const dialog=page.getByRole('dialog');await dialog.locator('img').evaluate(img=>img.decode());
   assert.equal(await dialog.locator('img').evaluate(img=>img.naturalWidth>=1024),true);
   await page.keyboard.press('Escape');assert.equal(await dialog.count(),0);
   await page.emulateMedia({reducedMotion:'reduce'});
   assert.equal(await page.locator('.skin-aura i').evaluateAll(items=>items.every(el=>getComputedStyle(el).animationName==='none')),true);
   assert.deepEqual(errors,[]);console.log(width+'px: 12 HD images, ordered tiers, 3/8 effect layers, dialog and reduced motion passed');await page.close();
  }
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
