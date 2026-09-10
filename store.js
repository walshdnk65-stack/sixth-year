/* Shared reminder queue, used by both the page and the service worker.
   The page recomputes the queue whenever data changes; the worker reads it
   so reminders can still fire when the app is closed. */
(function (global) {
  'use strict';

  var DB_NAME = 'sixth-year';
  var DB_VERSION = 1;
  var STORE = 'reminders';

  function openDb() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'key' });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function tx(mode, fn) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode);
        var req = fn(t.objectStore(STORE));
        t.oncomplete = function () { db.close(); resolve(req && typeof req === 'object' && 'result' in req ? req.result : undefined); };
        t.onerror = function () { db.close(); reject(t.error); };
      });
    });
  }

  function all() {
    return tx('readonly', function (store) { return store.getAll(); });
  }

  /* Replace the queue with `items`, preserving the fired flag of reminders
     that are still wanted, and dropping ones that no longer apply. */
  function sync(items) {
    return all().then(function (existing) {
      var fired = {};
      existing.forEach(function (r) { if (r.fired) fired[r.key] = true; });
      var wanted = {};
      items.forEach(function (r) { wanted[r.key] = true; });
      return tx('readwrite', function (store) {
        existing.forEach(function (r) { if (!wanted[r.key]) store.delete(r.key); });
        items.forEach(function (r) {
          store.put({
            key: r.key, at: r.at, title: r.title, body: r.body,
            tag: r.tag || r.key, view: r.view || 'today',
            fired: fired[r.key] ? 1 : 0
          });
        });
      });
    });
  }

  /* Reminders that are ripe: due, not yet fired, and not stale by more than
     `graceMs` (so a phone that was off all week does not dump a week of alerts). */
  function due(now, graceMs) {
    now = now || Date.now();
    graceMs = graceMs === undefined ? 6 * 3600e3 : graceMs;
    return all().then(function (items) {
      return items.filter(function (r) {
        return !r.fired && r.at <= now && r.at > now - graceMs;
      }).sort(function (a, b) { return a.at - b.at; });
    });
  }

  function markFired(keys) {
    return tx('readwrite', function (store) {
      keys.forEach(function (key) {
        var req = store.get(key);
        req.onsuccess = function () {
          var r = req.result;
          if (r) { r.fired = 1; store.put(r); }
        };
      });
    });
  }

  /* Anything fired and long past can go. */
  function prune(now) {
    now = now || Date.now();
    return tx('readwrite', function (store) {
      var req = store.getAll();
      req.onsuccess = function () {
        req.result.forEach(function (r) {
          if (r.at < now - 7 * 24 * 3600e3) store.delete(r.key);
        });
      };
    });
  }

  global.ReminderQueue = { all: all, sync: sync, due: due, markFired: markFired, prune: prune };
})(typeof self !== 'undefined' ? self : window);
