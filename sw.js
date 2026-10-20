// Service worker minimal : passe les requêtes au réseau (pas de cache, donc les données restent à jour).
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method === 'GET' && u.origin === location.origin) {
    e.respondWith(fetch(e.request).catch(function () {
      return new Response('Pas de connexion internet. Reconnectez-vous puis rechargez la page.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }));
  }
});
