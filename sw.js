/* Service worker: apka działa offline. Pliki apki: sieć najpierw (aktualizacje docierają od razu), cache w razie braku sieci. Obrazki i fonty: cache najpierw. */
const VERSION = 'pnp-v3';
const CORE = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'data/questions.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const cacheable = url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com');
  if (!cacheable) return;
  const store = (r) => { if (r && r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); } return r; };
  const isAsset = url.pathname.includes('/data/img/') || url.pathname.includes('/icons/') || url.origin !== location.origin;
  if (isAsset) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(store)));
  } else {
    e.respondWith(fetch(e.request, {cache: 'no-cache'}).then(store).catch(() => caches.match(e.request, {ignoreSearch: true}).then(hit => hit || caches.match('index.html'))));
  }
});
