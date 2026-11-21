const CACHE_NAME = 'mmcc-sovereign-13depts-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './master-icon.png',
  './banner-hero.png',
  './banner-pass.png',
  './look1.png',
  './look2.png',
  './look5.png',
  './look6.png',
  './look7.png',
  './look8.png',
  './spa1.png',
  './spa2.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(ASSETS.map(url => cache.add(url)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
