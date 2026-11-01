(function () {
  'use strict';
  const tiers = { '普通': 'common', '勇者': 'brave', '史诗': 'epic', '传说': 'legendary', '典藏': 'collector' };
  const order = { '普通': 0, '勇者': 1, '史诗': 2, '传说': 3, '典藏': 4 };
  const effects = { crown: 'starlight', lord: 'sanctuary', amber_scale: 'ember', starlord: 'cosmos', sapphire_oath: 'prism' };
  const colors = { common: '#98a6bc', brave: '#56ba8b', epic: '#b892ee', legendary: '#ffc266', collector: '#80deff' };
  const keys = ['sea','ink','star','tide','jade_oath','gold','aurora','crown','lord','amber_scale','starlord','sapphire_oath'];
  SKINS.forEach(s => { if (keys.includes(s.key)) s.art = 'images/skins/portraits-v3/' + s.key + '.png'; });
  SKINS.sort((a,b) => (order[a.rarity] ?? 99) - (order[b.rarity] ?? 99) || keys.indexOf(a.key) - keys.indexOf(b.key));
  function aura(s) {
    if (!effects[s.key]) return '';
    const collector = s.rarity === '典藏';
    return '<div class="skin-aura fx-' + effects[s.key] + '" aria-hidden="true">' +
      '<i class="fx-orbit"></i><i class="fx-particles"></i><i class="fx-rays"></i>' +
      (collector ? '<i class="fx-orbit fx-orbit-outer"></i><i class="fx-aurora"></i><i class="fx-meteors"></i><i class="fx-diamonds"></i><i class="fx-floor"></i>' : '') + '</div>';
  }
  window.renderSkinView = function () {
    const p = loadProfile(), owned = p.skinsOwned || [], active = p.activeSkin || '';
    if (!SKINS.some(s => s.key === _skinSelected)) _skinSelected = active || SKINS[0].key;
    const s = SKINS.find(s => s.key === _skinSelected) || SKINS[0], tier = tiers[s.rarity];
    const has = owned.includes(s.key), can = s.crystal ? (p.soulCrystals || 0) >= 1 : (p.skinFragments || 0) >= s.cost;
    let html = '<section class="skin-stage ' + (has ? 'owned' : 'unowned') + '" data-tier="' + tier + '" style="--sc:' + colors[tier] + '">' +
      '<div class="skin-visual"><img class="skin-art" src="' + s.art + '" alt="' + escHtml(s.name) + '完整立绘" decoding="async" fetchpriority="high">' + aura(s) + '</div>' +
      '<div class="skin-stage-copy"><span class="skin-rarity-pill rarity-' + tier + '">' + s.rarity + '</span><h2>' + escHtml(s.name) + '</h2><p>' + escHtml(s.desc) + '</p>' +
      '<div class="skin-status">' + (has ? (active === s.key ? '当前穿戴' : '已拥有') : '尚未拥有') + '</div><button class="skin-inspect" type="button" onclick="viewSkinArt(\'' + s.key + '\')">查看高清立绘 ↗</button></div></section>';
    html += '<div class="skin-tabs"><span class="on">成套皮肤</span><small>按品质排序</small></div><div class="skin-rail">';
    SKINS.forEach(item => {
      const own = owned.includes(item.key), cls = tiers[item.rarity];
      html += '<button type="button" class="sp-card ' + (own ? 'owned' : 'unowned') + (item.key === s.key ? ' selected' : '') + '" data-tier="' + cls + '" style="--sc:' + colors[cls] + '" onclick="selectSkin(\'' + item.key + '\')" aria-pressed="' + (item.key === s.key) + '"><img class="skin-thumb" src="' + item.art + '" loading="lazy" decoding="async" alt=""><span class="sp-rarity rarity-' + cls + '">' + item.rarity + '</span><span class="sp-name">' + escHtml(item.name) + '</span><small class="sp-status">' + (own ? '已拥有' : (item.crystal ? '1 水晶' : item.cost + ' 碎片')) + '</small></button>';
    });
    html += '</div><div class="skin-bottom"><div class="skin-currency">皮肤碎片 <b>' + (p.skinFragments || 0) + '</b>　法魂水晶 <b>' + (p.soulCrystals || 0) + '</b></div><button type="button" class="skin-main-btn' + (has || can ? '' : ' off') + '" onclick="applySelectedSkin()">' + (has ? (active === s.key ? '佩戴中' : '穿戴') : (s.crystal ? '1 水晶兑换' : s.cost + ' 碎片合成')) + '</button></div>';
    document.getElementById('skinPage').innerHTML = html;
  };
  window.viewSkinArt = function (key) {
    const s = SKINS.find(s => s.key === key); if (!s) return;
    document.getElementById('skinArtOverlay')?.remove();
    const overlay = document.createElement('div'); overlay.id = 'skinArtOverlay'; overlay.className = 'skin-detail';
    overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true'); overlay.setAttribute('aria-label', s.name + '高清立绘');
    overlay.innerHTML = '<button class="skin-detail-close" aria-label="关闭立绘">×</button><div class="skin-detail-scroll"><img src="' + s.art + '" alt="' + escHtml(s.name) + '高清立绘"></div><footer>' + escHtml(s.name) + ' · ' + s.rarity + '</footer>';
    const previous = document.activeElement;
    const close = () => { overlay.remove(); document.removeEventListener('keydown', onKey); previous?.focus(); };
    const onKey = event => { if (event.key === 'Escape') close(); if (event.key === 'Tab') { event.preventDefault(); overlay.querySelector('button').focus(); } };
    overlay.querySelector('button').onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey); document.body.appendChild(overlay); overlay.querySelector('button').focus();
  };
})();
