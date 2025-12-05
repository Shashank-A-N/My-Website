const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest'
];

// 1. Install Event: Cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Fetch Event: Intercept network requests
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // STRATEGY: Ignore Firebase Storage & Firestore requests (let them go to network directly)
    // This prevents the "sw.js failed to fetch" error when CORS blocks an image.
    if (url.hostname.includes('googleapis.com') || url.hostname.includes('firebase')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached if found, otherwise fetch from network
            return cachedResponse || fetch(event.request).then((response) => {
                // Optional: Cache new requests dynamically (excluding API calls)
                // if (response && response.status === 200 && response.type === 'basic') {
                //     const responseClone = response.clone();
                //     caches.open(CACHE_NAME).then((cache) => {
                //         cache.put(event.request, responseClone);
                //     });
                // }
                return response;
            });
        })
    );
});