const CACHE_NAME = 'ls-designs-cache-v6';

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
  './jersey4.webp'
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
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => event.request.mode === 'navigate'
        ? caches.match('./index.html')
        : Response.error())
  );
});