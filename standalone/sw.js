var CACHE = "lexpilot-v124";
self.addEventListener("install", function(e) { self.skipWaiting(); });
self.addEventListener("activate", function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function(e) {
  if (e.request.destination === "document" || e.request.url.match(/\.html$/) || e.request.url.match(/\/LexPilot\/?$/)) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(resp) {
        if (resp.ok) { var clone = resp.clone(); caches.open(CACHE).then(function(c) { c.put(e.request, clone); }); }
        return resp;
      });
    })
  );
});