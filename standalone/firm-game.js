(function () {
  'use strict';
  const CASES = [
    {id:'consult', name:'社区法律咨询', icon:'咨询', text:'倾听委托人，梳理基本事实。', seconds:30, fee:60, rep:2, level:1},
    {id:'contract', name:'合同纠纷调解', icon:'合同', text:'审查条款，寻找双方可以接受的方案。', seconds:90, fee:150, rep:5, level:2},
    {id:'trial', name:'庭审代理', icon:'庭审', text:'整理证据并准备庭审陈述。', seconds:180, fee:320, rep:10, level:3}
  ];
  const STAFF = [
    {id:'assistant',name:'实习助理',icon:'',desc:'细心整理案卷，提升每单收益。',cost:120,bonus:10},
    {id:'lawyer',name:'青年律师',icon:'',desc:'参与案件研讨，提升每单收益。',cost:300,bonus:25},
    {id:'partner',name:'资深合伙人',icon:'',desc:'丰富的办案经验带来更多收益。',cost:650,bonus:50}
  ];
  const UPGRADE_COST = [0,180,480,1000,1800,3000,4800,7200,10500,15000];
  let ticker;
  function fresh() { return {version:1, name:'知行法律事务所', funds:200, reputation:0, level:1, casesDone:0, staff:[], current:null, lastDaily:'', decor:'walnut', log:[]}; }
  function read(){const p=loadProfile();return Object.assign(fresh(),p.firmGame||{});}
  function write(g){const p=loadProfile();p.firmGame=g;saveProfile(p);}
  function log(g,msg){g.log=[msg].concat(g.log||[]).slice(0,5);}
  function today(){return getTodayStr();}
  function bonus(g){return STAFF.filter(s=>(g.staff||[]).includes(s.id)).reduce((a,s)=>a+s.bonus,0);}
  function notify(msg){showToast(msg);}
  function esc(s){return escHtml(String(s));}
  function legacy(){try{const x=JSON.parse(localStorage.getItem(LAW_FIRM_KEY)||'null');return x&&typeof x==='object'?x:null}catch{return null}}
  function room(){return document.getElementById('firmBody');}
  function draw(){
    const el=room();if(!el)return;const g=read(), current=g.current, c=current&&CASES.find(x=>x.id===current.id), remaining=current?Math.max(0,Math.ceil((current.finish-Date.now())/1000)):0;
    const old=legacy(), showImport=!g.legacyImported&&old&&(Number(old.reputation)>0||old.decor);
    const status=c ? '<div class="fg-active"><span class="fg-active-icon">'+c.icon+'</span><div><strong>'+c.name+'</strong><small>'+(remaining?'正在处理 · <span id="fgCountdown">'+remaining+' 秒</span>':'案件已完成，可以结算')+'</small></div><button type="button" onclick="firmCollect()" '+(remaining?'disabled':'')+'>'+(remaining?'办案中':'结算')+'</button></div>' : '<div class="fg-empty">你的办公桌还没有案件，选择下方委托开始经营。</div>';
    el.innerHTML='<div class="fg-wrap"><section class="fg-hero"><div class="fg-top"><span>SEAWHY LEX</span><span>律所经营中</span></div><h1>'+esc(g.name)+'</h1><p>从一家小小的事务所，走向你的法律事业。</p><div class="fg-stats"><div><small>律所等级</small><b>Lv.'+g.level+'</b></div><div><small>经营资金</small><b>'+g.funds+'</b></div><div><small>律所声望</small><b>'+g.reputation+'</b></div></div></section>'+
      (showImport?'<div class="fg-import">发现本设备的旧律所记录。确认属于当前账号后可导入声望和装修。<button type="button" onclick="firmImportLegacy()">导入旧进度</button></div>':'')+
      '<section class="fg-section"><div class="fg-heading"><div><span>01 / OFFICE</span><h2>律所办公室</h2></div><span class="fg-badge">累计结案 '+g.casesDone+'</span></div><div class="fg-office fg-level-'+Math.max(1,Math.min(10,Number(g.level)||1))+' fg-decor-'+(['walnut','mint','night'].includes(g.decor)?g.decor:'walnut')+'"><div class="fg-office-text"><b>今天也为公平而努力 · Lv.'+g.level+'</b><span>团队 '+(1+(g.staff||[]).length)+' 人 · 每单额外收入 '+bonus(g)+'</span></div></div><div class="fg-decor">装修：<button type="button" onclick="firmDecor(\'walnut\')">胡桃木</button><button type="button" onclick="firmDecor(\'mint\')">薄荷绿</button><button type="button" onclick="firmDecor(\'night\')">深夜蓝</button></div>'+status+'<button class="fg-daily" type="button" onclick="firmDaily()" '+(g.lastDaily===today()?'disabled':'')+'>'+(g.lastDaily===today()?'今日运营补贴已领取':'领取今日运营补贴 +100 资金')+'</button></section>'+
      '<section class="fg-section"><div class="fg-heading"><div><span>02 / CASES</span><h2>委托公告板</h2></div><small>同时处理 1 件</small></div><div class="fg-board-art" aria-label="委托公告板插画"></div><div class="fg-cards">'+CASES.map(x=>'<article class="fg-case"><div class="fg-case-top"><span>'+x.icon+'</span><b>'+x.name+'</b><em>Lv.'+x.level+'</em></div><p>'+x.text+'</p><div class="fg-case-meta"><span>时长 '+Math.ceil(x.seconds/60)+' 分钟内</span><span>资金 '+(x.fee+bonus(g))+'</span><span>声望 '+x.rep+'</span></div><button type="button" onclick="firmStart(\''+x.id+'\')" '+(current||g.level<x.level?'disabled':'')+'>'+(g.level<x.level?'Lv.'+x.level+' 解锁':current?'已有进行中委托':'接受委托')+'</button></article>').join('')+'</div></section>'+
      '<section class="fg-section"><div class="fg-heading"><div><span>03 / TEAM</span><h2>组建团队</h2></div><small>招聘后永久生效</small></div>'+STAFF.map(s=>'<div class="fg-staff"><span class="fg-staff-icon fg-staff-'+s.id+'">'+s.icon+'</span><div><b>'+s.name+'</b><small>'+s.desc+' 每单 +'+s.bonus+' 资金</small></div><button type="button" onclick="firmHire(\''+s.id+'\')" '+((g.staff||[]).includes(s.id)?'disabled':'')+'>'+((g.staff||[]).includes(s.id)?'已入职':'资金 '+s.cost)+'</button></div>').join('')+'</section>'+
      '<section class="fg-section"><div class="fg-heading"><div><span>04 / GROWTH</span><h2>律所发展</h2></div><small>解锁更高等级的委托</small></div><div class="fg-upgrade"><div><b>升级办公室 · Lv.'+g.level+'</b><small>'+(g.level>=10?'已达到当前最高等级':'升级需要 '+UPGRADE_COST[g.level]+' 资金和 '+(g.level*8)+' 声望')+'</small></div><button type="button" onclick="firmUpgrade()" '+(g.level>=10?'disabled':'')+'>'+(g.level>=10?'已满级':'升级')+'</button></div><div class="fg-exchange"><b>积分兑换资金</b><p>1 积分 = 10 资金，兑换扣除可用积分，不影响累计积分和等级。</p><input id="firmExchangePoints" type="number" min="1" max="100000" inputmode="numeric" placeholder="输入积分"><button type="button" id="firmExchangeButton" onclick="firmExchange()">确认兑换</button></div><div class="fg-learning"><b>学习也能帮助律所成长</b><p>完成案件推理 +2 声望，模拟法庭 +3 声望。不扣除学习积分。</p><button type="button" onclick="showDailyCase()">去案件推理 →</button><button type="button" onclick="showMootCourt()">去模拟法庭 →</button></div></section>'+
      '<section class="fg-section"><div class="fg-heading"><div><span>05 / WARDROBE</span><h2>我的衣橱</h2></div><button type="button" class="fg-text-btn" onclick="openSkinGallery()">打开衣橱 →</button></div>'+firmWardrobe(loadProfile())+'</section>'+
      '<section class="fg-section"><div class="fg-heading"><div><span>06 / JOURNAL</span><h2>经营日志</h2></div></div><div class="fg-log">'+((g.log||[]).length?(g.log||[]).map(x=>'<p>· '+esc(x)+'</p>').join(''):'<p>律所刚刚开张，你的故事从这里开始。</p>')+'</div></section><p class="fg-note">虚拟经营玩法，资金不是学习积分，也不可提现。进度随当前账号的个人档案同步。</p></div>';
    clearInterval(ticker);if(current&&remaining)ticker=setInterval(function(){const n=document.getElementById('fgCountdown');if(!n){clearInterval(ticker);return}const left=Math.max(0,Math.ceil((current.finish-Date.now())/1000));if(left)n.textContent=left+' 秒';else{clearInterval(ticker);draw()}},1000);
  }
  window.firmDaily=function(){const g=read();if(g.lastDaily===today())return;g.lastDaily=today();g.funds+=100;log(g,'领取今日运营补贴 +100');write(g);draw();notify('运营补贴已到账');};
  window.firmExchange=async function(){const input=document.getElementById('firmExchangePoints'),button=document.getElementById('firmExchangeButton'),n=Number(input.value);if(!Number.isSafeInteger(n)||n<1||n>100000){notify('请输入 1 至 100000 的整数积分');return}if(n>(loadProfile().points||0)){notify('可用积分不足');return}if(!confirm('确认使用 '+n+' 积分兑换 '+n*10+' 律所资金？'))return;button.disabled=true;try{if(!loadProfile().firmGame)write(read());await window.lexExchange(n);updateProfileUI();draw();notify('兑换成功');}catch(e){notify(e.message||'兑换失败，请刷新后核对余额');button.disabled=false}};
  window.firmDecor=function(value){if(!['walnut','mint','night'].includes(value))return;const g=read();g.decor=value;write(g);draw();};
  window.firmStart=function(id){const g=read(),c=CASES.find(x=>x.id===id);if(!c||g.current||g.level<c.level)return;g.current={id:c.id,finish:Date.now()+c.seconds*1000,bonus:bonus(g)};log(g,'接受委托：'+c.name);write(g);draw();notify('已接受委托，稍后回来结算');};
  window.firmCollect=function(){const g=read(),c=g.current&&CASES.find(x=>x.id===g.current.id);if(!c||Date.now()<g.current.finish)return;const amount=c.fee+(g.current.bonus||0);g.current=null;g.funds+=amount;g.reputation+=c.rep;g.casesDone++;log(g,'完成'+c.name+'：资金 +'+amount+'，声望 +'+c.rep);write(g);draw();notify('案件结算成功');};
  window.firmHire=function(id){const g=read(),s=STAFF.find(x=>x.id===id);if(!s||(g.staff||[]).includes(id))return;if(g.funds<s.cost){notify('资金不足，先完成委托吧');return}g.funds-=s.cost;g.staff.push(id);log(g,s.name+'加入了律所');write(g);draw();notify('招聘成功');};
  window.firmUpgrade=function(){const g=read(),cost=UPGRADE_COST[g.level];if(!cost)return;if(g.funds<cost||g.reputation<g.level*8){notify('资金或声望不足，继续经营吧');return}g.funds-=cost;g.level++;log(g,'办公室升级至 Lv.'+g.level);write(g);draw();notify('律所升级成功');};
  window.firmImportLegacy=function(){const old=legacy(),g=read();if(!old||g.legacyImported||!confirm('请确认本设备的旧律所进度属于当前账号，是否导入？'))return;g.reputation+=Math.max(0,Math.floor(Number(old.reputation)||0));g.decor=old.decor||g.decor;g.legacyImported=true;log(g,'已导入本设备旧律所声望');write(g);draw();notify('旧声望已导入当前账号');};
  window.addFirmReputation=function(amount,reason){const g=read();g.reputation+=amount;log(g,reason+'：声望 +'+amount);write(g);};
  window.renderLawFirmEntry=function(){const el=document.getElementById('firmEntryMeta');if(el){const g=read();el.textContent='Lv.'+g.level+' · 声望 '+g.reputation+' · 已结案 '+g.casesDone+' 件';}};
  window.renderLawFirm=draw;
})();
