/* Service worker: offline shell + reminders that fire when the app is closed. */
importScripts('./store.js?v=6');

var CACHE = 'sixth-year-v6';
var SHELL = [
  './', './index.html', './app.css?v=6', './app.js?v=6', './store.js?v=6',
  './manifest.webmanifest', './icon.svg', './icon-maskable.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () {
    return self.skipWaiting();
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () { return caches.match('./index.html'); });
    })
  );
});

function showReminders() {
  return ReminderQueue.due(Date.now()).then(function (items) {
    if (!items.length) return ReminderQueue.prune(Date.now());
    return Promise.all(items.map(function (r) {
      return self.registration.showNotification(r.title, {
        body: r.body,
        tag: r.tag,
        icon: './icon.svg',
        badge: './icon-maskable.svg',
        renotify: true,
        requireInteraction: false,
        data: { view: r.view, key: r.key },
        actions: [{ action: 'open', title: 'Open' }]
      });
    })).then(function () {
      return ReminderQueue.markFired(items.map(function (r) { return r.key; }));
    }).then(function () { return ReminderQueue.prune(Date.now()); });
  });
}

/* Chrome installs get a background check roughly every few hours. */
self.addEventListener('periodicsync', function (e) {
  if (e.tag === 'reminders') e.waitUntil(showReminders());
});

self.addEventListener('sync', function (e) {
  if (e.tag === 'reminders') e.waitUntil(showReminders());
});

self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'check-reminders') e.waitUntil(showReminders());
});

/* Real server-sent push, if a push server is ever wired up. */
self.addEventListener('push', function (e) {
  var payload = { title: 'Sixth Year', body: 'You have something due.', view: 'today' };
  try { if (e.data) payload = Object.assign(payload, e.data.json()); } catch (err) {
    if (e.data) payload.body = e.data.text();
  }
  e.waitUntil(self.registration.showNotification(payload.title, {
    body: payload.body, icon: './icon.svg', badge: './icon-maskable.svg',
    tag: payload.tag || 'push', data: { view: payload.view || 'today' }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var view = (e.notification.data && e.notification.data.view) || 'today';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf(self.registration.scope) === 0) {
        list[i].postMessage({ type: 'go', view: view });
        return list[i].focus();
      }
    }
    return self.clients.openWindow('./index.html#' + view);
  }));
});
