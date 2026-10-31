const { chromium }=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
  await page.addInitScript(()=>{localStorage.setItem('seawhy-lex-opts',JSON.stringify({kbdMode:'ime',imeEngine:'fcitx'}));});
  let signedIn=false,chatCalled=false,profile=null,version=0;
  await page.route('**/api/lex/**',async route=>{const path=new URL(route.request().url()).pathname;
   if(path.endsWith('/me'))return route.fulfill({status:signedIn?200:401,json:signedIn?{user:{id:'user1',publicId:'100001',username:'tester'}}:{error:'请先登录'}});
   if(path.endsWith('/register')){signedIn=true;return route.fulfill({json:{user:{id:'user1',publicId:'100001',username:'tester'}}})}
   if(path.endsWith('/pretty-ids'))return route.fulfill({json:{ids:['111123','122234','133345']}});
   if(path.endsWith('/pretty-id'))return route.fulfill({json:{publicId:route.request().postDataJSON().id}});
   if(path.endsWith('/leaderboard'))return route.fulfill({json:{entries:[{id:'100001',nickname:'测试用户',points:23,totalPoints:44}]}});
   if(path.endsWith('/firm-exchange')){const b=route.request().postDataJSON();profile.points-=b.points;profile.firmGame.funds+=b.points*10;version++;return route.fulfill({json:{version,points:profile.points,funds:profile.firmGame.funds}})}
   if(path.endsWith('/profile')){if(route.request().method()==='POST'){const body=route.request().postDataJSON();if(body.version!==version)return route.fulfill({status:409,json:{error:'档案已在其他设备更新'}});profile=body.profile;version++;return route.fulfill({json:{version}})}return route.fulfill({json:{profile,version}})}
   if(path.endsWith('/chat')){chatCalled=true;return route.fulfill({json:{choices:[{message:{content:'测试回复'}}]}})}
   if(path.endsWith('/logout')){signedIn=false;return route.fulfill({json:{ok:true}})}
  });
  await page.goto('http://127.0.0.1:8767/standalone/law.html');
  assert.equal(await page.evaluate(()=>{const e=new Event('gesturestart',{cancelable:true});document.dispatchEvent(e);return e.defaultPrevented}),true);
  assert.equal(await page.evaluate(()=>{function tap(){const e=new Event('touchend',{cancelable:true});Object.defineProperties(e,{touches:{value:[]},changedTouches:{value:[{clientX:50,clientY:50}]}});document.dispatchEvent(e);return e.defaultPrevented}tap();return tap()}),true);
  assert.equal(await page.evaluate(()=>getComputedStyle(document.querySelector('#homeScreen')).overscrollBehaviorY),'none');
  await page.waitForSelector('#loginScreen.show');
  await page.locator('#loginUsername').tap();assert.equal(await page.locator('#loginUsername').getAttribute('readonly'),null);
  await page.keyboard.type('abc');assert.equal(await page.locator('#loginUsername').inputValue(),'abc');
  await page.locator('[onclick="showRegister()"]').click();
  await page.locator('#regUsername').tap();assert.equal(await page.locator('#regUsername').getAttribute('readonly'),null);
  await page.fill('#regUsername','tester');await page.fill('#regPassword','testpass123');await page.fill('#regPassword2','testpass123');
  await page.locator('#registerForm button[onclick="doRegister()"]').click();await page.waitForSelector('#homeScreen.show');
  assert.equal(await page.locator('#profileAccount').textContent(),'账号：tester');
  assert.equal(await page.locator('#profileIdChip').textContent(),'ID 100001');
  await page.evaluate(()=>document.body.classList.add('dark'));
  await page.waitForTimeout(250);
  assert.equal(await page.locator('.dash-main').first().evaluate(el=>getComputedStyle(el).color),'rgb(242, 245, 250)');
  assert.equal(await page.locator('#bottomNav .nav-item').first().evaluate(el=>getComputedStyle(el).color),'rgb(238, 246, 255)');
  await page.evaluate(()=>{window.lexVipGet=()=>"1"});
  await page.evaluate(()=>rollPrettyId());
  assert.equal(await page.locator('#prettyOptions .ph-id-opt').count(),4);
  await page.evaluate(()=>applyPrettyId('111123'));
  assert.equal(await page.locator('#profileIdChip').textContent(),'ID 111123');
  await page.locator('#bottomNav').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('#bottomNav').evaluate(el=>el.getBoundingClientRect().bottom<=window.innerHeight),true);
  assert.equal(await page.locator('[onclick="deleteAccount()"]').count(),0);
  assert.equal(await page.locator('[onclick="cloudBackup()"]').count(),0);
  assert.equal(await page.locator('#ime').count(),0);
  const result=await page.evaluate(()=>new Promise(resolve=>aiComplete('测试','问题',(err,text)=>resolve({err,text}))));
  assert.equal(result.text,'测试回复');assert.equal(chatCalled,true);
  await page.waitForTimeout(1200);
  await Promise.all([page.waitForResponse(r=>r.url().endsWith('/api/lex/profile')&&r.request().method()==='POST'),page.evaluate(()=>saveProfile({nickname:'云端测试',points:23,totalPoints:44}))]);
  assert.equal(profile.points,23);await page.reload();await page.waitForSelector('#homeScreen.show');assert.equal(await page.evaluate(()=>loadProfile().nickname),'云端测试');
  await page.evaluate(()=>showLawFirm());
  assert.equal(await page.locator('#firmBody h2').first().textContent(),'律所办公室');
  assert.match(await page.locator('.fg-office').evaluate(el=>getComputedStyle(el).backgroundImage),/firm-levels\.png/);
  assert.equal(await page.locator('.fg-board-art').count(),1);assert.equal(await page.locator('.fg-staff-assistant').count(),1);
  await page.evaluate(()=>{firmDaily();firmDaily();firmHire('assistant');firmStart('consult');});
  let game=await page.evaluate(()=>loadProfile().firmGame);
  assert.equal(game.funds,180);assert.deepEqual(game.staff,['assistant']);assert.equal(game.current.id,'consult');
  await page.evaluate(()=>{const p=loadProfile();p.firmGame.current.finish=Date.now()-1000;saveProfile(p);firmCollect();firmCollect();});
  game=await page.evaluate(()=>loadProfile().firmGame);
  assert.equal(game.funds,250);assert.equal(game.reputation,2);assert.equal(game.casesDone,1);
  await page.waitForTimeout(1500);assert.equal(profile.firmGame.casesDone,1);
  await page.evaluate(()=>lexExchange(3));assert.equal(await page.evaluate(()=>loadProfile().points),20);assert.equal(await page.evaluate(()=>loadProfile().firmGame.funds),280);
  await page.evaluate(()=>lexShowRanking('points'));await page.waitForSelector('.lr-row',{state:'attached'});assert.match(await page.locator('.lr-row').first().textContent(),/测试用户/);
  await page.evaluate(()=>{const p=loadProfile();p.firmGame.level=9;p.firmGame.funds=20000;p.firmGame.reputation=100;saveProfile(p);firmUpgrade()});assert.equal(await page.evaluate(()=>loadProfile().firmGame.level),10);assert.equal(await page.locator('.fg-level-10').count(),1);
  await page.evaluate(()=>{const p=loadProfile();p.skinsOwned=['crown'];saveProfile(p);openSkinGallery();selectSkin('crown')});
  assert.equal(await page.locator('#skinView .skin-stage .skin-sparkle').count(),1);assert.equal(await page.locator('#skinView .skin-stage .rarity-legendary').textContent(),'传说');
  await page.evaluate(()=>selectSkin('sapphire_oath'));assert.equal(await page.locator('#skinView .skin-stage.unowned').count(),1);assert.equal(await page.locator('#skinView .skin-stage .rarity-collector').textContent(),'典藏');
  assert.equal(await page.locator('#skinView .sp-card').count(),12);
  assert.match(await page.locator('#skinView .skin-stage.unowned .skin-art').evaluate(el=>getComputedStyle(el).filter),/grayscale/);
  await page.evaluate(()=>{const p=loadProfile();p.skinFragments=288;saveProfile(p);selectSkin('jade_oath');applySelectedSkin()});
  assert.equal(await page.evaluate(()=>loadProfile().activeSkin),'jade_oath');assert.equal(await page.evaluate(()=>loadProfile().skinFragments),0);
  assert.equal(await page.locator('#skinView .skin-stage .rarity-brave').textContent(),'勇者');await page.waitForTimeout(1000);
  await page.reload();await page.waitForSelector('#homeScreen.show');assert.equal(await page.evaluate(()=>loadProfile().firmGame.casesDone),1);
  console.log('PASS mobile registration and authenticated AI request');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
