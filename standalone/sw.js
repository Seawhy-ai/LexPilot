var CACHE = "lexpilot-v140";
var APP_SHELL = ["./", "./law.html", "./law.css?v=140", "./law-app.js?v=140", "./law-manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", function(event) {
  event.waitUntil(caches.open(CACHE).then(function(cache) {
    return cache.addAll(APP_SHELL);
  }).then(function() { return self.skipWaiting(); }));
});

self.addEventListener("activate", function(event) {
  event.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(key) { return key !== CACHE; }).map(function(key) { return caches.delete(key); }));
  }).then(function() { return self.clients.claim(); }));
});

self.addEventListener("fetch", function(event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.indexOf("/api/") !== -1) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(function(response) {
      if (response && response.ok) {
        var copy = response.clone();
        caches.open(CACHE).then(function(cache) { cache.put("./law.html", copy); });
      }
      return response;
    }).catch(function() {
      return caches.match(request).then(function(cached) { return cached || caches.match("./law.html"); });
    }));
    return;
  }

  event.respondWith(caches.match(request).then(function(cached) {
    var network = fetch(request).then(function(response) {
      if (response && response.ok && response.type === "basic") {
        var copy = response.clone();
        caches.open(CACHE).then(function(cache) { cache.put(request, copy); });
      }
      return response;
    }).catch(function() { return cached; });
    return cached || network;
  }));
});

