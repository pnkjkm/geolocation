importScripts('node_modules/workbox-sw/build/workbox-sw.js');


const staticAssets = [
  './',
  './script.js',
  './style.css'
];


workbox.precaching.precacheAndRoute(staticAssets);
workbox.routing.registerRoute('https://www.google.com/maps/(.*)', workbox.strategies.networkFirst());

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
      ],
    }),
);
