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
