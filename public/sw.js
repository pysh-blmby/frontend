// Service Worker for PWA functionality
const CACHE_NAME = 'novacommerce-v1.0.0'
const STATIC_CACHE = 'novacommerce-static-v1.0.0'
const DYNAMIC_CACHE = 'novacommerce-dynamic-v1.0.0'

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Add your main CSS and JS files here when built
  // '/assets/index-*.css',
  // '/assets/index-*.js'
]

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/api\/categories/,
  /\/api\/products/,
  // Add other API patterns as needed
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests
  if (url.pathname.startsWith('/api/') || API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful GET requests
            if (request.method === 'GET' && response.status === 200) {
              cache.put(request, response.clone())
            }
            return response
          })
          .catch(() => {
            // Return cached version if available
            return cache.match(request)
          })
      })
    )
    return
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Cache the response
            const responseToCache = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache)
              })

            return response
          })
          .catch(() => {
            // Return offline fallback for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html')
            }
          })
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag)

  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartData())
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received')

  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
      data: data.data || {},
      actions: data.actions || []
    }

    event.waitUntil(
      self.registration.showNotification(data.title || 'NovaCommerce', options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked')

  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper function to sync cart data when back online
async function syncCartData() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const keys = await cache.keys()

    // Find cart-related requests that failed
    const cartRequests = keys.filter(request =>
      request.url.includes('/cart') ||
      request.url.includes('/orders')
    )

    // Retry failed requests
    for (const request of cartRequests) {
      try {
        await fetch(request)
        // Remove from cache after successful sync
        await cache.delete(request)
      } catch (error) {
        console.log('[SW] Failed to sync request:', request.url)
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}

// Periodic cleanup of old cache entries
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCacheEntries()
  }
})

async function cleanOldCacheEntries() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const keys = await cache.keys()

    // Remove entries older than 1 hour
    const oneHourAgo = Date.now() - (60 * 60 * 1000)

    for (const request of keys) {
      const response = await cache.match(request)
      if (response) {
        const date = response.headers.get('date')
        if (date && new Date(date).getTime() < oneHourAgo) {
          await cache.delete(request)
        }
      }
    }

    console.log('[SW] Cache cleanup completed')
  } catch (error) {
    console.error('[SW] Cache cleanup failed:', error)
  }
}