// Goddess Rebirth: Idle Oaths — Service Worker
// Offline-first caching + Web Push notification handler

const CACHE_NAME = 'gr-idle-oaths-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/src/styles/main.css',
  '/src/main.js',
  '/src/config.js',
  '/src/state.js',
  '/src/engine/numbers.js',
  '/src/engine/battle.js',
  '/src/engine/stage.js',
  '/src/engine/game-loop.js',
  '/src/data/template-engine.js',
  '/src/data/characters.js',
  '/src/data/monsters.js',
  '/src/data/stages.js',
  '/src/data/upgrades.js',
  '/src/systems/gacha.js',
  '/src/systems/characters.js',
  '/src/systems/offline.js',
  '/src/systems/notifications.js',
  '/src/systems/save.js',
  '/src/ui/hud.js',
  '/src/ui/battle-screen.js',
  '/src/ui/maidens-screen.js',
  '/src/ui/gacha-screen.js',
  '/src/ui/shop-screen.js',
  '/src/ui/floating-text.js',
  '/src/ui/modals.js',
  '/src/utils/api.js',
  '/src/utils/storage.js',
  '/src/utils/share.js',
];

// ── Install: cache all static assets ────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// ── Activate: purge old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

// ── Fetch: cache-first for static, network-first for API ────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls: network only (no caching), return offline error if down
  if (url.pathname.startsWith('/api/') || url.hostname.includes('workers.dev')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    return;
  }

  // Admin dashboard: network first
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/caelum-admin')) {
    event.respondWith(fetch(request).catch(() => caches.match('/offline.html')));
    return;
  }

  // Static assets: cache first, network fallback
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok && request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match('/offline.html'));
    }),
  );
});

// ── Push: handle incoming push notifications ─────────────────────────────────
self.addEventListener('push', event => {
  let data = { title: 'Goddess Rebirth: Idle Oaths', body: 'Something happened in your realm!' };
  try { data = { ...data, ...event.data.json() }; } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon ?? '/icons/icon-192.png',
      badge: data.badge ?? '/icons/badge-72.png',
      tag: data.tag ?? 'default',
      data: { url: data.url ?? '/' },
      actions: [
        { action: 'open', title: 'Open Game' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
      requireInteraction: false,
    }),
  );
});

// ── Notification click: open/focus the game ───────────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url ?? '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // If a game tab is already open, focus it
      for (const client of clientList) {
        if (new URL(client.url).pathname === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new tab
      return clients.openWindow(targetUrl);
    }),
  );
});

// ── Background sync: retry failed cloud saves ─────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-save') {
    event.waitUntil(
      // Notify all open clients to trigger a cloud save
      clients.matchAll({ type: 'window' }).then(clientList =>
        Promise.all(clientList.map(c => c.postMessage({ type: 'SYNC_SAVE' }))),
      ),
    );
  }
});
