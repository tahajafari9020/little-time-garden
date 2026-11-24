// Little Time Garden — offline-first service worker
// Keep this cache prefix unique to this app so other site caches are untouched.
const CACHE_PREFIX = 'little-time-garden-';
const CACHE_NAME = `${CACHE_PREFIX}v10`;

const APP_SHELL = [
  new URL('./', self.registration.scope).href,
  new URL('./index.html', self.registration.scope).href,
  new URL('./manifest.webmanifest', self.registration.scope).href,
  new URL('./icon.svg', self.registration.scope).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Do not intercept third-party requests or browser extensions.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // Prefer the latest page when online; use the cached app shell offline.
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        return (await caches.match(request)) ||
          (await caches.match(new URL('./index.html', self.registration.scope).href));
      }
    })());
    return;
  }

  // App shell and same-origin resources: use cached copies when available.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      // Do not return index.html for a missing image, script, or other asset.
      return new Response('You are offline and this resource is not cached.', {
        status: 503,
        statusText: 'Offline',
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  })());
});
