(function () {
  'use strict';
  async function request(path, data) {
    const response = await fetch('/api/lex/' + path, {method:data ? 'POST' : 'GET', headers:data ? {'content-type':'application/json'} : {}, body:data ? JSON.stringify(data) : undefined, credentials:'same-origin', cache:'no-store'});
    const result = await response.json().catch(() => ({error:'服务暂时不可用'}));
    if (!response.ok) throw new Error(result.error || '请求失败');
    return result;
  }
  async function submit(path, username, password, message) {
    const el=document.getElementById(message);
    try { el.textContent='正在处理…'; const r=await request(path,{username,password}); currentUser=r.user.username; el.textContent=''; goHomeAfterLogin(); }
    catch(e){el.textContent=e.message}
  }
  window.doLogin = function(){submit('login', document.getElementById('loginUsername').value.trim(),document.getElementById('loginPassword').value,'loginMsg')};
  window.doRegister = function(){
    const p=document.getElementById('regPassword').value;
    if(p!==document.getElementById('regPassword2').value){document.getElementById('regMsg').textContent='两次密码不一致';return}
    submit('register',document.getElementById('regUsername').value.trim(),p,'regMsg');
  };
  window.skipLogin = function(){document.getElementById('loginMsg').textContent='使用前请登录或注册';};
  window.logoutAccount = async function(){try{await request('logout',{})}finally{currentUser=null;location.reload()}};
  document.removeEventListener('DOMContentLoaded', initApp);
  async function start(){
    clockStartLoop(); showLoginScreen();
    try{const r=await request('me'); currentUser=r.user.username; goHomeAfterLogin()}catch(e){if(e.message!=='请先登录')document.getElementById('loginMsg').textContent=e.message}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
