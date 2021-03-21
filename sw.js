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

const staticCacheName = "ColorCal";

self.addEventListener("install", (event) => {
  console.log("Attempting to install service worker and cache static assets");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {})
  );
});
