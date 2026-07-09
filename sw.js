const CACHE_NAME = 'ampletechai-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/about-us.html',
  '/contact.html',
  '/case-studies.html',
  '/blog.html',
  '/src/styles/index.css',
  '/src/js/main.js',
  '/assets/Ample.ai.svg',
  '/assets/ampletechai-black.svg',
  '/assets/case-study-dental.png',
  '/assets/case-study-realestate.png',
  '/assets/case-study-ecommerce.png',
  '/assets/team-ethan.png',
  '/assets/team-ava.png',
  '/assets/team-noah.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Allow graceful failure for assets that might not exist yet
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err)))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Use Network-First strategy for code files (HTML, JS, CSS) to prevent stale caching
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback to cache if offline
        return caches.match(event.request);
      })
    );
  } else {
    // Use Cache-First strategy for static assets (images, logos)
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Silent fallback on connection loss
        });
      })
    );
  }
});
