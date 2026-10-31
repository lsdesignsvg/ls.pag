const CACHE_NAME = 'ls-designs-cache-v9';

const APP_SHELL = [
  './',
  './index.html',
  './disenos.html',
  './manifest.json',
  './logo-ls-designs.png',
  './LOGO-LS-DESGINS.svg',
  './portada1.jpg',
  './jersey1.webp',
  './jersey2.webp',
  './jersey3.webp',
  './jersey4.webp',
  './previews/chaqueta corta vientos2.webp',
  './previews/chaqueta corta vientos3.webp',
  './previews/chaqueta corta vientos4.webp',
  './previews/jersey manga larga2.webp',
  './previews/jersey manga larga3.webp',
  './previews/jersey manga larga4.webp',
  './previews/jersey manga larga5.webp',
  './previews/jersey manga larga6.webp',
  './previews/jersey4.webp',
  './previews/jersey5.webp',
  './previews/jersey6.webp',
  './previews/jersey7.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(APP_SHELL).then(() => self.skipWaiting());
  }));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
    cacheNames
      .filter((cacheName) => cacheName !== CACHE_NAME)
      .map((cacheName) => caches.delete(cacheName))
  ))).then(() => self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse.ok) return networkResponse;
          const cachedResponse = networkResponse.clone();
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, cachedResponse))
            .then(() => networkResponse);
        });
      })
      .catch(() => event.request.mode === 'navigate'
        ? caches.match('./index.html')
        : Response.error())
  );
});