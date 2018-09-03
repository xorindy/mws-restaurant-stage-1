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
    console.log('Service Worker Installed');

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('Service Worker Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('Service Worker Activated');
})

self.addEventListener('fetch', function(e) {
    console.log('Service Worker Fetching', e.request.url);
})