(function () {
  'use strict';
  async function request(path, data) {
    const response = await fetch('/api/lex/' + path, {method:data ? 'POST' : 'GET', headers:data ? {'content-type':'application/json'} : {}, body:data ? JSON.stringify(data) : undefined, credentials:'same-origin', cache:'no-store'});
    const result = await response.json().catch(() => ({error:'服务暂时不可用'}));
    if (!response.ok) throw new Error(result.error || '请求失败');
    return result;
  }
  let profile={},version=0,owner='',timer=null,saving=false,dirty=false,conflict=false;
  const legacyGet=window.loadProfile;
  const notice=document.createElement('div');
  notice.setAttribute('role','status');
  notice.style.cssText='position:fixed;top:4px;right:8px;z-index:9999;font-size:11px;color:#345678;background:#fff;padding:3px 7px;border-radius:5px';
  document.body.appendChild(notice);
  function status(s){notice.textContent=s}
  function persistPending(){try{localStorage.setItem('lex-profile-pending-'+owner,JSON.stringify({profile,version}))}catch(e){status('本地暂存失败，请勿关闭页面')}}
  async function flush(){
    if(!dirty||saving||conflict||!owner)return;
    saving=true;const sent=JSON.parse(JSON.stringify(profile));dirty=false;status('个人档案同步中…');
    try{
      const r=await request('profile',{profile:sent,version});version=r.version;
      if(dirty){persistPending();status('个人档案同步中…')}else{localStorage.removeItem('lex-profile-pending-'+owner);status('个人档案已同步')}
    }catch(e){dirty=true;persistPending();if(e.message.includes('其他设备'))conflict=true;status('个人档案未同步：'+e.message)}
    finally{saving=false;if(dirty&&!conflict){clearTimeout(timer);timer=setTimeout(flush,5000)}else if(dirty)status('个人档案冲突，本机修改已暂存；请联系管理员')}
  }
  window.loadProfile=function(){return JSON.parse(JSON.stringify(profile))};
  window.saveProfile=function(value){if(!owner){status('未登录，个人档案没有保存');return}profile=JSON.parse(JSON.stringify(value));dirty=true;persistPending();clearTimeout(timer);timer=setTimeout(flush,400)};
  window.lexVipGet=function(){return profile.lexPermanentVip?'1':null};
  window.lexVipSet=function(value){const p=window.loadProfile();p.lexPermanentVip=value==='1';window.saveProfile(p)};
  async function loadCloud(u){
    const r=await request('profile');owner=u.id;version=r.version;profile=r.profile||{};dirty=false;conflict=false;
    let pending=null;try{pending=JSON.parse(localStorage.getItem('lex-profile-pending-'+owner)||'null')}catch(e){}
    if(pending&&pending.profile){
      if(pending.version===version){profile=pending.profile;dirty=true;status('恢复未同步的个人档案…');timer=setTimeout(flush,400)}
      else{conflict=true;status('其他设备已有更新，本机未同步档案已保留；请联系管理员')}
    }else if(!r.profile){
      const old=legacyGet();
      if(old&&Object.keys(old).length&&confirm('本设备发现旧个人档案。确认是你的资料并导入当前账号吗？')){profile=old;profile.lexPermanentVip=localStorage.getItem('seawhy-lex-vip')==='1';dirty=true;persistPending();timer=setTimeout(flush,400)}
      else status('新账号：个人档案为空');
    }else status('个人档案已同步');
  }
  async function submit(path, username, password, message) {
    const el=document.getElementById(message);
    try { el.textContent='正在处理…'; const r=await request(path,{username,password}); await loadCloud(r.user); currentUser=r.user.username; el.textContent=''; goHomeAfterLogin(); }
    catch(e){el.textContent=e.message}
  }
  window.doLogin = function(){submit('login', document.getElementById('loginUsername').value.trim(),document.getElementById('loginPassword').value,'loginMsg')};
  window.doRegister = function(){
    const p=document.getElementById('regPassword').value;
    if(p!==document.getElementById('regPassword2').value){document.getElementById('regMsg').textContent='两次密码不一致';return}
    submit('register',document.getElementById('regUsername').value.trim(),p,'regMsg');
  };
  window.skipLogin = function(){document.getElementById('loginMsg').textContent='使用前请登录或注册';};
  window.logoutAccount = async function(){if(dirty){status('有未同步的个人档案，请先保持页面打开');await flush();if(dirty)return}try{await request('logout',{})}finally{owner='';profile={};currentUser=null;location.reload()}};
  document.removeEventListener('DOMContentLoaded', initApp);
  async function start(){
    clockStartLoop(); showLoginScreen();
    try{const r=await request('me'); await loadCloud(r.user); currentUser=r.user.username; goHomeAfterLogin()}catch(e){if(e.message!=='请先登录')document.getElementById('loginMsg').textContent=e.message}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
