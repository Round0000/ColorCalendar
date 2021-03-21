self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
});

const cacheName = "ColorCal";

const assets = [
  "/fonts/fira-sans-v10-latin-300.woff2",
  "/fonts/fira-sans-v10-latin-300.woff",
  "/fonts/fira-sans-v10-latin-regular.woff2",
  "/fonts/fira-sans-v10-latin-regular.woff",
  "/img/arrow-left.svg",
  "/img/arrow-right.svg",
  "/style.css",
  "/index.html",
  "/app.js",
  "/",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(assets);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
