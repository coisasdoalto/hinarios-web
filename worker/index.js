'use strict'

self.__WB_DISABLE_DEV_LOGS = true

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('message', async event => {
  if (event.data?.type === "DOWNLOAD_HYMNS") {
    console.log("Starting donwloading hymns...")

    const response = await fetch('/api/paths').then(res => res.json())

    console.log("FOUND %d ROUTES TO CACHE", response.length)

    const cache = await caches.open('others')

    await cache.addAll(response)

    event.ports[0].postMessage('DONE');
  }
})