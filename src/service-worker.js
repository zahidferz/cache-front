/* global workbox */
workbox.setConfig({
  debug: false,
})

// Trigger update on user confirmation
self.addEventListener('message', (e) => {
  if (!e.data) {
    return
  }

  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      // NOOP
      break
  }
})

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   }),
// );

// workbox.routing.registerRoute(
//   new RegExp('https://newsapi.org/v2/top-headlines(.*)'),
//   workbox.strategies.networkFirst({
//     cacheName: 'news-api',
//   }),
// );

// workbox.routing.registerRoute(
//   new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//   workbox.strategies.cacheFirst({
//     cacheName: 'googleapis',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 30,
//       }),
//     ],
//   }),
// );

// // Have new sw take control when getting confirmation from the client
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.action === 'skipWaiting') {
//     self.skipWaiting()
//   }
// })

// // Service worker KILL SWITCH
// // Should something go terribly wrong with a service worker, comment out the code above
// // and enable the following
// self.addEventListener('install', () => {
//   // Skip over the "waiting" lifecycle state, to ensure that our
//   // new service worker is activated immediately, even if there's
//   // another tab open controlled by our older service worker code.
//   self.skipWaiting()
// })
