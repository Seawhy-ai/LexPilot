(function(){
'use strict';
const keys=['sea','ink','star','tide','gold','aurora','crown','lord','starlord','jade_oath','amber_scale','sapphire_oath'];
const rows=[[0,341],[342,347],[690,396]],width=1448,height=1086;
const atlas='images/skins/collection-atlas-v2.png';
SKINS.forEach(s=>{if(keys.includes(s.key))s.art=atlas+'#'+s.key});
function decorate(){document.querySelectorAll('img[src*="collection-atlas-v2.png#"]').forEach(img=>{const key=img.getAttribute('src').split('#')[1],index=keys.indexOf(key);if(index<0)return;const row=rows[Math.floor(index/4)],x=index%4*362,w=362,h=row[1];const art=document.createElement('span');art.className=img.className+' skin-portrait';art.setAttribute('role','img');art.setAttribute('aria-label',img.alt||SKINS.find(s=>s.key===key).name);art.style.cssText=img.style.cssText;art.style.setProperty('--portrait-ratio',w+'/'+h);art.style.backgroundImage='url("'+atlas+'")';art.style.backgroundSize=(width/w*100)+'% '+(height/h*100)+'%';art.style.backgroundPosition=(x/(width-w)*100)+'% '+(row[0]/(height-h)*100)+'%';img.replaceWith(art)});
const selected=SKINS.find(s=>s.key===_skinSelected),stage=document.querySelector('#skinPage .skin-stage');if(stage&&selected){stage.dataset.tier=({"普通":"common","勇者":"brave","史诗":"epic","传说":"legendary","典藏":"collector"})[selected.rarity];stage.querySelectorAll('.skin-sparkle').forEach(e=>e.remove());if(['传说','典藏'].includes(selected.rarity)&&!stage.querySelector('.skin-aura')){const effect=document.createElement('div');effect.className='skin-aura';effect.setAttribute('aria-hidden','true');effect.innerHTML='<i></i><i></i><i></i>';stage.appendChild(effect)}}}
['renderSkinView','viewSkinArt'].forEach(name=>{const previous=window[name];window[name]=function(){const result=previous.apply(this,arguments);decorate();return result}});
new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});decorate();
})();
