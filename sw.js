let cache_name = "ColorCal";

self.addEventListener("install", (event) => {
  console.log("installing...");
  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(assets);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener("fetch", (event) => {
  console.log("You fetched " + event.url);
});
