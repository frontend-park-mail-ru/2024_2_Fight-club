const CACHE_NAME = 'pootnick-v1abc';

const ALWAYS_CACHE = [
    '/index.html',
    '/favicon.png',
    '/journey.jpg',
    '/default_user_icon.png',
    '/style.css',
];

const CACHE_BLACKLIST = [];

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', (event) => {
    console.log('Install event called...');
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(ALWAYS_CACHE);
        })()
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            console.log(event.request);
            if (event.request.url in ALWAYS_CACHE) {
                console.log('URL is in ALWAYS_CACHE');
                return await cache.match(event.request);
            }

            try {
                console.log('Fetching URL from network');

                // If the resource was not in the cache, try the network.
                const fetchResponse = await fetch(event.request);

                // Save the resource in the cache and return it.
                // if (event.request.url in ALWAYS_CACHE) {
                console.log('Saving the URL response to the cache storage');
                cache.put(event.request, fetchResponse.clone());
                // }
                return fetchResponse;
            } catch {
                console.log("Oops! Network error. Let's get it from cache");
                if (event.request.url in CACHE_BLACKLIST) {
                    // 404
                }
                // Get the resource from the cache.
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    console.log('what should I do??');
                }
            }
        })()
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// self.addEventListener("activate", (e) => {
//     e.waitUntil(
//       caches.keys().then((keyList) => {
//         return Promise.all(
//           keyList.map((key) => {
//             if (key === cacheName) {
//               return;
//             }
//             return caches.delete(key);
//           }),
//         );
//       }),
//     );
//   });
