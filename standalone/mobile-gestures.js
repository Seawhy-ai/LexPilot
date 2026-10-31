// iOS Safari may ignore the viewport zoom limit; block pinch gestures without
// intercepting single-finger scrolling or text entry.
document.addEventListener('gesturestart', function (event) {
  if (event.cancelable) event.preventDefault();
}, { passive: false });
document.addEventListener('gesturechange', function (event) {
  if (event.cancelable) event.preventDefault();
}, { passive: false });
document.addEventListener('touchmove', function (event) {
  if (event.touches.length > 1 && event.cancelable) event.preventDefault();
}, { passive: false });
let lastTap = null;
document.addEventListener('touchend', function (event) {
  if (event.touches.length || event.changedTouches.length !== 1) { lastTap = null; return; }
  const target = event.target;
  if (target && target.closest && target.closest('input, textarea, select, [contenteditable="true"]')) { lastTap = null; return; }
  const touch = event.changedTouches[0], now = Date.now();
  if (lastTap && now - lastTap.time < 300 && Math.hypot(touch.clientX - lastTap.x, touch.clientY - lastTap.y) < 25) {
    if (event.cancelable) event.preventDefault();
    lastTap = null;
  } else lastTap = { time: now, x: touch.clientX, y: touch.clientY };
}, { passive: false });
