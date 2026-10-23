// Interaction-only loader for the Newo AI web chat. Injects the vendor script on first
// hover / focus / click of the launcher; on click it opens the chat once Newo renders.
(function () {
  var b = document.querySelector('[data-newo-launch]'); if (!b) return;
  var state = 'idle', wantOpen = false;
  function findToggle() { // Newo renders its launcher button inside a same-origin iframe
    var f = document.querySelector('iframe[name="newo-chat-toggler-frame"]');
    var d = f && f.contentDocument; return d && d.querySelector('button');
  }
  function tryOpen(n) {
    var t = findToggle();
    if (t) { b.dataset.state = 'ready'; if (wantOpen) openWhenReady(t, 6); return; }
    if (n > 0) setTimeout(function () { tryOpen(n - 1); }, 200);
    else { b.dataset.state = ''; }
  }
  function isOpen() { var f = document.querySelector('iframe[name="newo-chat-frame"]'); return !!f && f.getBoundingClientRect().height > 0; }
  function openWhenReady(t, n) { // Newo attaches its click handler shortly after rendering: retry until the panel shows
    setTimeout(function () {
      if (isOpen()) { wantOpen = false; return; }
      t.click(); if (n > 0) setTimeout(function () { if (!isOpen()) openWhenReady(t, n - 1); else wantOpen = false; }, 400);
    }, 300);
  }
  function load() {
    if (state !== 'idle') return; state = 'loading';
    var s = document.createElement('script');
    s.src = 'https://static.newo.ai/newo-chat/web-chat.js'; s.defer = true;
    s.setAttribute('name', 'web-chat'); s.setAttribute('data-client-secret', b.getAttribute('data-newo-id'));
    s.onload = function () { state = 'loaded'; tryOpen(50); };
    s.onerror = function () { state = 'idle'; b.dataset.state = ''; };
    document.body.appendChild(s);
  }
  b.addEventListener('pointerenter', load, { once: true });
  b.addEventListener('focus', load, { once: true });
  b.addEventListener('click', function () {
    wantOpen = true; b.dataset.state = 'loading'; load();
    if (state === 'loaded') tryOpen(50);
    (window.dataLayer = window.dataLayer || []).push({ event: 'chat_open', chat_provider: 'newo' });
  });
})();
