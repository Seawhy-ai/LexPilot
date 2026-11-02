(function(){
'use strict';
const first=['starlord','crown','tide','star','sea','ink'];
const second=ROSE_SEASON.skins;
const count=p=>ROSE_SEASON.badges.filter(k=>(p.badgesOwned||[]).includes(k)).length;
const tag=s=>first.includes(s.key)?'<span class="season-seal season-one"><i>✦</i> 第一期限定</span>':second.includes(s.key)?'<span class="season-seal season-two"><i>❧</i> 第二期限定</span>':'';
SKINS.forEach(s=>{if(first.includes(s.key))s.season=1});
const render=window.renderSkinView;
window.renderSkinView=function(){render();const p=loadProfile(),s=SKINS.find(x=>x.key===_skinSelected),has=(p.skinsOwned||[]).includes(s.key),btn=document.querySelector('.skin-main-btn');document.querySelector('.skin-stage-copy').insertAdjacentHTML('afterbegin',tag(s));document.querySelectorAll('.sp-card').forEach((e,i)=>{const item=SKINS[i];e.insertAdjacentHTML('beforeend',tag(item));if(!(p.skinsOwned||[]).includes(item.key)){const status=e.querySelector('.sp-status');if(first.includes(item.key))status.textContent='已结束 · 限定收藏';if(item.key==='rose_advocate')status.textContent='勋章 '+count(p)+'/8'}});if(!has&&first.includes(s.key)){btn.disabled=true;btn.textContent='第一期已结束';btn.classList.add('off')}if(!has&&s.key==='rose_advocate'){const n=count(p);btn.disabled=n!==8;btn.classList.toggle('off',n!==8);btn.textContent=n===8?'领取蔷薇辩士':'集齐本期勋章 '+n+'/8';document.querySelector('.skin-status').textContent='第二期 8 枚勋章集齐奖励'}};
const apply=window.applySelectedSkin;
window.applySelectedSkin=function(){const p=loadProfile(),key=_skinSelected;if((p.skinsOwned||[]).includes(key))return apply();if(first.includes(key)){showToast('第一期已结束');return}if(key==='rose_advocate'){if(count(p)!==8){showToast('集齐第二期 8 枚勋章后领取');return}p.skinsOwned=[...(p.skinsOwned||[]),key];p.activeSkin=key;saveProfile(p);renderSkinView();showToast('已领取蔷薇辩士');return}return apply()};
const lot=window.renderLottery;window.renderLottery=function(){lot();const cards=document.querySelectorAll('.s2-skin-rail button');cards.forEach((e,i)=>{e.insertAdjacentHTML('beforeend','<span class="season-seal season-two"><i>❧</i> 第二期限定</span>');if(second[i]==='rose_advocate')e.querySelector('small').textContent='集齐本期 8 枚勋章领取'})};
})();
