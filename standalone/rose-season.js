(function(){
'use strict';
const root='images/rose-s2/';
const skins=[
 {key:'night_clerk',name:'夜庭书记',rarity:'普通',cost:88,color:'#a1a9bb',desc:'一支笔，一册卷宗，记下每一份清晰的陈述。'},
 {key:'rose_warden',name:'巡夜执事',rarity:'勇者',cost:288,color:'#9c82c9',desc:'穿过长廊与夜色，守护每一场如期而至的审理。'},
 {key:'rose_advocate',name:'蔷薇辩士',rarity:'史诗',cost:588,color:'#cb80b1',desc:'以理为锋，以据为盾，让每一句辩词落在事实之上。'},
 {key:'silver_testimony',name:'银链证言',rarity:'史诗',cost:588,color:'#c0b9eb',desc:'把散落的线索连成证据，让被遮蔽的事实重新显现。'},
 {key:'moon_verdict',name:'月下裁决',rarity:'传说',cost:988,color:'#e9c2dd',desc:'月光穿过彩窗，天平在静夜中归于平衡。'},
 {key:'eternal_judge',name:'永夜审判官',rarity:'典藏',crystal:true,cost:1,color:'#d9b7f5',desc:'蔷薇绽放于长夜，以不偏不倚的裁决迎接黎明。'}
];
skins.forEach(s=>{if(!SKINS.some(x=>x.key===s.key))SKINS.push({...s,art:root+s.key+'.webp',accent:s.color,season:2})});
const rows=[
 ['rose_mark','绯蔷初印',2.2,'基础','蔷薇初绽，记录求知的第一步。'],
 ['night_quill','夜庭羽笔',1.7,'基础','让每一份陈述都有迹可循。'],
 ['moon_key','月门秘钥',1.5,'稀有','推开疑问之门，寻找事实的入口。'],
 ['chain_oath','银链誓言',1.3,'稀有','用证据连接线索，用承诺守住原则。'],
 ['rose_scale','蔷薇天平',1.1,'稀有','把理性与同理心放在天平两侧。'],
 ['window_verdict','彩窗裁光',1.0,'史诗','穿透成见的光，照见完整的事实。'],
 ['thorn_seal','荆棘法印',0.7,'史诗','越过思辨的荆棘，为判断留下依据。'],
 ['midnight_crown','永夜之冠',0.5,'传说','长夜终有尽，公正自有回响。']
];
const current=rows.map(([key,name,weight,rarity,desc])=>({key,name,weight,rarity,desc,color:'#c799dc',icon:'',season:2}));
current.forEach(b=>{BADGE_ART[b.key]=root+b.key+'.webp';b.icon='<img src="'+BADGE_ART[b.key]+'" alt="" width="32" height="32">';if(!BADGES.some(x=>x.key===b.key))BADGES.push(b)});
const archive=BADGES.filter(b=>!current.some(c=>c.key===b.key));
window.ROSE_SEASON={skins:skins.map(s=>s.key),badges:current.map(b=>b.key),badgeWeights:current.map(b=>b.weight)};
let lastBadge=null;
window.pickBadge=function(){const total=current.reduce((n,b)=>n+b.weight,0),r=Math.random()*total;let acc=0;lastBadge=current[current.length-1];for(const b of current){acc+=b.weight;if(r<acc){lastBadge=b;break}}return lastBadge};
const apply=window.applyLotteryReward;
window.applyLotteryReward=function(prize){const result=apply(prize);if(prize.key==='badge'&&lastBadge){result.pct=prize.weight*lastBadge.weight/current.reduce((n,b)=>n+b.weight,0);result.badgeKey=lastBadge.key;result.icon=lastBadge.icon;}return result};
window.openRoseSkin=function(key){_skinSelected=key;openSkinGallery()};
let badgeSeries=2;
window.showBadgeSeries=function(series){badgeSeries=series;_badgeSelected='';renderBadgeView()};
window.renderBadgeView=function(){const p=loadProfile(),owned=p.badgesOwned||[],items=badgeSeries===2?current:archive;const selected=items.find(b=>b.key===_badgeSelected)||items[0];_badgeSelected=selected.key;const count=items.filter(b=>owned.includes(b.key)).length;
 const page=document.getElementById('badgePage');page.innerHTML='<div class="s2-series"><button data-series="2" class="'+(badgeSeries===2?'on':'')+'">第二期 · 午夜审判</button><button data-series="1" class="'+(badgeSeries===1?'on':'')+'">第一期 · 星海典藏</button></div><section class="s2-badge-stage"><img src="'+BADGE_ART[selected.key]+'" alt="'+escHtml(selected.name)+'"><div><small>'+selected.rarity+' · '+(owned.includes(selected.key)?'已获得':'未获得')+'</small><h2>'+escHtml(selected.name)+'</h2><p>'+escHtml(selected.desc)+'</p></div></section><div class="badge-progress">本期已收集 <b>'+count+' / '+items.length+'</b></div><div class="badge-grid-new">'+items.map(b=>'<button class="badge-card-new'+(b.key===selected.key?' selected':'')+'" onclick="selectBadge(\''+b.key+'\')" aria-label="'+escHtml(b.name)+'"><img src="'+BADGE_ART[b.key]+'" alt="'+escHtml(b.name)+'"><small class="s2-owned">'+(owned.includes(b.key)?'已获得':'未获得')+'</small></button>').join('')+'</div><div class="badge-footer">'+(badgeSeries===2?'<button class="primary" onclick="openLottery()">前往本期夺宝 →</button>':'<span class="s2-archive">第一期收藏展示</span>')+'</div>';page.querySelectorAll('[data-series]').forEach(b=>b.onclick=()=>showBadgeSeries(Number(b.dataset.series)))};
const openBadges=window.openBadgeGallery;window.openBadgeGallery=function(){badgeSeries=2;_badgeSelected='';openBadges();document.querySelector('#badgeView .wx-nav .title').textContent='勋章收藏'};
const wish=window.lotteryWish;window.lotteryWish=function(results,callback){wish(results,callback);const title=document.querySelector('#lotteryWishOverlay .wish-title');if(title)title.innerHTML='蔷薇绽放 · 祈愿中<small>月光照见事实，静候午夜回响</small>'};
window.showRoseRules=function(){document.getElementById('roseRules')?.remove();const box=document.createElement('div');box.id='roseRules';box.className='s2-rules-overlay';box.setAttribute('role','dialog');box.setAttribute('aria-label','第二期夺宝规则');box.innerHTML='<section><button class="s2-close" aria-label="关闭规则">×</button><h2>蔷薇 · 午夜审判</h2><p>单次 30 积分，十连 280 积分。累计 365 次必得法魂水晶，获得水晶后保底归零。</p><p>本期勋章奖励占奖池 10%。以下为每款勋章在全部祈愿中的概率：</p><ul>'+current.map(b=>'<li>'+b.name+'<b>'+b.weight+'%</b></li>').join('')+'</ul><p>重复勋章转化为 20 积分；皮肤使用碎片或水晶兑换。原有水晶、碎片和保底进度继续累计。</p><button class="s2-rules-confirm">知道了</button></section>';box.querySelector('.s2-close').onclick=()=>box.remove();box.querySelector('.s2-rules-confirm').onclick=()=>box.remove();box.onclick=e=>{if(e.target===box)box.remove()};document.body.appendChild(box)};
const render=window.renderLottery;
window.renderLottery=function(){render();document.querySelector('#lotteryView .lottery-rules').onclick=showRoseRules;document.querySelector('#lotteryView .lottery-section-more').onclick=showRoseRules;const hero=document.querySelector('.lottery-event-hero');hero.setAttribute('aria-label','第二期 蔷薇午夜审判');hero.innerHTML='<div class="le-kicker">第二期主题 · ROSE / MIDNIGHT</div><h1 class="le-title">蔷薇 · 午夜审判</h1><div class="le-desc">月光照见事实，蔷薇见证公正。</div><div class="le-countdown">6 款主题皮肤 · 8 枚主题勋章</div>';let rewards=document.getElementById('roseRewards');if(!rewards){rewards=document.createElement('section');rewards.id='roseRewards';rewards.className='s2-rewards';hero.after(rewards)}rewards.innerHTML='<div class="s2-reward-head"><h2>午夜衣橱</h2><button onclick="openBadgeGallery()">本期勋章 ↗</button></div><div class="s2-skin-rail">'+skins.map(s=>'<button onclick="openRoseSkin(\''+s.key+'\')"><img src="'+root+s.key+'-thumb.webp" loading="lazy" alt="'+s.name+'"><span>'+s.name+'</span><small>'+s.rarity+' · '+(s.crystal?'1 水晶':s.cost+' 碎片')+'</small></button>').join('')+'</div><p class="s2-reward-note">祈愿获得碎片与水晶，在衣橱兑换主题皮肤；勋章奖励为本期 8 款。</p>';document.querySelector('#lotCell7 .lc-tx').textContent='午夜勋章';document.querySelector('#lotteryView .wx-nav .title').textContent='蔷薇 · 午夜审判';const body=document.querySelector('#lotteryView .lottery-body');if(!body.querySelector('.s2-draw-panel')){const panel=document.createElement('div');panel.className='s2-draw-panel';Array.from(body.children).filter(node=>node!==hero&&node!==rewards&&node.tagName.toLowerCase()!=='svg').forEach(node=>panel.appendChild(node));body.appendChild(panel)}const badgeCount=document.getElementById('lotBadgeCount');badgeCount.textContent=current.filter(b=>(loadProfile().badgesOwned||[]).includes(b.key)).length+'/8';};
})();
