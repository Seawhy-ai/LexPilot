(function () {
  'use strict';
  var motion = 'images/skins/amber-scale-motion.gif';
  var still = 'images/skins/amber-scale.png';
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function refresh() {
    document.querySelectorAll('#skinPage .skin-art, #skinArtOverlay > img, .firm-skin-card.selected > img').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (src !== still && src !== motion) return;
      var target = preference.matches ? still : motion;
      if (src !== target) {
        img.onerror = function () { this.onerror = null; this.src = still; };
        img.src = target;
      }
      var stage = img.closest('.skin-stage');
      if (stage) {
        var sparkle = stage.querySelector('.skin-sparkle');
        if (sparkle) sparkle.remove();
        img.style.objectFit = 'contain';
      }
    });
  }
  ['renderSkinView', 'viewSkinArt'].forEach(function (name) {
    var previous = window[name];
    if (typeof previous !== 'function') return;
    window[name] = function () { var result = previous.apply(this, arguments); refresh(); return result; };
  });
  new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
  if (preference.addEventListener) preference.addEventListener('change', refresh);
  refresh();
})();
