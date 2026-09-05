// Celestial Radio — Service Worker
// Place this file at: /public/sw.js

const CACHE = "celestial-radio-v3";

// Assets to cache on install (app shell)
const SHELL = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/og-image.png",
];

// ── Install: cache the app shell ──────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(SHELL);
    })
  );
  self.skipWaiting();
});

// ── Activate: clean up old caches ────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: Network-first for audio streams, cache-first for assets ──
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never intercept audio streams — always go to network
  const isStream =
    event.request.destination === "audio" ||
    url.hostname.includes("zeno.fm") ||
    url.hostname.includes("streamguys") ||
    url.hostname.includes("streamtheworld") ||
    url.hostname.includes("rfi.fr") ||
    url.pathname.endsWith(".mp3") ||
    url.pathname.endsWith("/stream");

  if (isStream) {
    return; // fall through to network
  }

  // For navigation requests (pages), use network-first
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match("/").then((r) => r || new Response("Offline", { status: 503 }))
      )
    );
    return;
  }

  // Never cache Next.js / HMR chunks — stale JS caused missing module factories
  if (url.pathname.startsWith("/_next/") || url.pathname.includes(".hot-update.")) {
    return;
  }

  // For everything else: cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (
            response.ok &&
            event.request.method === "GET" &&
            url.origin === self.location.origin
          ) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/"));
    })
  );
});
