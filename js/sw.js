var cacheName = 'v1';

var cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/favicon.ico'
];

self.addEventListener('install', function(e) {
    // wait until promise is resolved
    e.waitUntil(
        // add files to the cache
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        // get all cache keys
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                // if cached item is saved under a previous cacheName...
                if(thisCacheName !== cacheName) {
                    // delete cached file
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
    // respond to fetch event
    e.respondWith(
        // check in cache for the request being made
        caches.match(e.request).then(function(response) {
            // if found, return cached version
            if (response) {
                console.log('Found ', e.request, ' in cache');
                return response;
            }
            else {
                // if not found, fetch!
                console.log('Could not find ', e.request, ' in cache, FETCHING~!');
                return fetch(e.request)
                .then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open('cacheName').then(function(cache) {
                        cache.put(e.request, response);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});