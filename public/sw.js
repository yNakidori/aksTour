// Service Worker: runtime cache for images and basic offline fallback
const IMAGE_CACHE = "aks-images-v1";
const RUNTIME_CACHE = "aks-runtime-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== "GET") return;

  // Runtime cache for images (including Firebase Storage URLs)
  if (
    req.destination === "image" ||
    /\.(png|jpg|jpeg|webp|avif|gif)(\?.*)?$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const response = await fetch(req);
          if (response && response.status === 200)
            cache.put(req, response.clone());
          return response;
        } catch (err) {
          // If network fails, return cached (if any) or a simple fallback Response
          return (
            cached ||
            new Response(null, { status: 504, statusText: "Gateway Timeout" })
          );
        }
      }),
    );
    return;
  }

  // Simple network-first for same-origin navigation and assets, fallback to cache
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // optionally cache some responses
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req)),
    );
  }
});

// Optional: message handler to skipWaiting from the page
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
