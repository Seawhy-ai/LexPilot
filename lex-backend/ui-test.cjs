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
  console.log('PASS mobile registration and authenticated AI request');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
