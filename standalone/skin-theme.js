(function () {
  'use strict';
  var palette={ '普通':'#f5f7fa', '勇者':'#4ade80', '史诗':'#c084fc', '传说':'#ff9c32', '典藏':'#72ddff' };
  var classes={ '普通':'common', '勇者':'brave', '史诗':'epic', '传说':'legendary', '典藏':'collector' };
  [
    {key:'jade_oath',name:'青简守律',cost:288,rarity:'勇者',color:'#4ade80',accent:'#047857',desc:'青简为证，执笔守律，在研习中积蓄勇气。',art:'images/skins/jade-oath.png'},
    {key:'amber_scale',name:'烛衡天律',cost:988,rarity:'传说',color:'#ff9c32',accent:'#b45309',desc:'烛光映照天平，以温暖和坚定守护每一份公正。',art:'images/skins/amber-scale.png'},
    {key:'sapphire_oath',name:'冰钻星誓',cost:1,crystal:true,rarity:'典藏',color:'#72ddff',accent:'#0284c7',desc:'冰钻凝作星河，光芒照见不渝的求法之心。',art:'images/skins/sapphire-oath.png'}
  ].forEach(function(s){if(!SKINS.some(function(x){return x.key===s.key}))SKINS.push(s)});
  function effect(r,owned){return r==='传说'||r==='典藏'?'<img class="skin-sparkle" src="images/skins/rarity-sparkle.gif" alt="" aria-hidden="true" />':''}
  window.renderSkinView=function(){
    var p=loadProfile(),owned=p.skinsOwned||[],active=p.activeSkin||'';
    if(!_skinSelected||!SKINS.some(function(s){return s.key===_skinSelected}))_skinSelected=active||SKINS[0].key;
    var selected=SKINS.filter(function(s){return s.key===_skinSelected})[0]||SKINS[0];
    var has=owned.indexOf(selected.key)>=0,isActive=active===selected.key,can=selected.crystal?(p.soulCrystals||0)>=1:(p.skinFragments||0)>=selected.cost;
    var color=palette[selected.rarity]||palette['普通'],cls=classes[selected.rarity]||'common',art=selected.art||('images/skins/'+selected.key+'.webp');
    var h='<section class="skin-stage '+(has?'owned':'unowned')+'" style="--sc:'+color+'"><img class="skin-art" src="'+art+'" alt="'+escHtml(selected.name)+'立绘" />'+effect(selected.rarity,has)+'<div class="skin-stage-copy"><span class="skin-rarity-pill rarity-'+cls+'">'+escHtml(selected.rarity)+'</span><h2>'+escHtml(selected.name)+'</h2><p>'+escHtml(selected.desc)+'</p>'+(has?'':'<p class="skin-not-owned">尚未拥有</p>')+'</div><div class="skin-actions"><button type="button" onclick="viewSkinArt(\''+selected.key+'\')">查看立绘</button></div></section>';
    h+='<div class="skin-tabs"><span class="on">成套皮肤</span></div><div class="skin-rail">';
    SKINS.forEach(function(s){var own=owned.indexOf(s.key)>=0,c=classes[s.rarity]||'common',sc=palette[s.rarity]||palette['普通'],thumb=s.art||('images/skins/'+s.key+'.webp');h+='<button type="button" class="sp-card '+(own?'owned':'unowned')+(s.key===selected.key?' selected':'')+'" style="--sc:'+sc+'" onclick="selectSkin(\''+s.key+'\')"><img class="skin-thumb" src="'+thumb+'" alt="" />'+effect(s.rarity,own)+'<span class="sp-rarity rarity-'+c+'">'+escHtml(s.rarity)+'</span><span class="sp-name">'+escHtml(s.name)+'</span>'+(own?'':'<span class="sp-lock">未拥有</span>')+'</button>'});
    h+='</div><div class="skin-bottom"><div class="skin-currency">皮肤碎片 <b>'+(p.skinFragments||0)+'</b>　法魂水晶 <b>'+(p.soulCrystals||0)+'</b></div><button type="button" class="skin-main-btn'+((has||can)?'':' off')+'" onclick="applySelectedSkin()">'+(has?(isActive?'佩戴中':'穿戴'):(selected.crystal?'1 水晶兑换':selected.cost+' 碎片合成'))+'</button></div>';
    document.getElementById('skinPage').innerHTML=h;
  };
  window.firmWardrobe=function(profile){
    var owned=profile.skinsOwned||[],active=profile.activeSkin||'';if(!owned.length)return '<div class="firm-empty-wardrobe"><p>还没有从积分夺宝获得的时装。</p><button type="button" onclick="openSkinGallery()">前往积分夺宝衣橱</button></div>';
    return '<div class="firm-skin-rail">'+owned.map(function(key){var s=SKINS.filter(function(x){return x.key===key})[0];if(!s)return '';var cls=classes[s.rarity]||'common';return '<button type="button" class="firm-skin-card '+(active===key?'selected':'')+'" onclick="wearFirmSkin(\''+s.key+'\')" aria-pressed="'+(active===key)+'"><img src="'+s.art+'" alt=""><span>'+escHtml(s.name)+'</span><small><span class="skin-tier rarity-'+cls+'">'+escHtml(s.rarity)+'</span>'+(active===key?' · 穿戴中':'')+'</small></button>'}).join('')+'</div>';
  };
  window.viewSkinArt=function(key){var s=SKINS.filter(function(x){return x.key===key})[0];if(!s||!s.art)return;var ov=document.createElement('div');ov.id='skinArtOverlay';ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:900;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:12px;cursor:zoom-out';var own=(loadProfile().skinsOwned||[]).indexOf(key)>=0;ov.innerHTML='<img src="'+s.art+'" alt="'+escHtml(s.name)+'立绘" style="max-width:100%;max-height:74vh;border-radius:16px;'+(own?'':'filter:grayscale(1);')+'" /><div style="color:#fff;font-size:15px;font-weight:800">'+escHtml(s.name)+' · <span class="skin-tier rarity-'+(classes[s.rarity]||'common')+'">'+escHtml(s.rarity)+'</span></div><div style="color:#d4dce6;font-size:12px;max-width:320px;text-align:center;line-height:1.6">'+escHtml(s.desc||'')+'</div><div style="color:#aeb6c3;font-size:10px">点击任意位置关闭</div>';ov.onclick=function(){ov.remove()};document.body.appendChild(ov)};
})();
