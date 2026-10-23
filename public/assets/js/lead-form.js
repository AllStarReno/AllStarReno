/* All-Star lead form + Google Calendar booking step (progressive enhancement for LeadForm.astro). */
(function () {
  var CITIES = ['Conway', 'Greenbrier', 'Vilonia', 'Maumelle', 'Little Rock', 'North Little Rock', 'Sherwood', 'Cabot', 'Searcy', 'Benton', 'Bryant', 'Morrilton'];
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function prefill(form) { // AI Studio EstimateCalculator -> contact form prefill
    var p = null; try { p = localStorage.getItem('calculator_estimate_prefill'); } catch (e) {}
    if (!p) return;
    var msg = $('[name=message]', form); if (msg && !msg.value) msg.value = p;
    var map = [['Bath', 'Bathroom Remodeling'], ['Shower', 'Bathroom Remodeling'], ['Shower', 'Walk-In Showers'], ['Tub-to-Shower', 'Tub-to-Shower Conversions'], ['Walk-In Safety Tub', 'Walk-In Tubs'], ['Full Bathroom Remodel', 'Full Bathroom Remodel']];
    var sel = $('[name=service]', form); map.forEach(function (m) { if (p.indexOf(m[0]) > -1 && $$('option', sel).some(function (o) { return o.value === m[1]; })) sel.value = m[1]; });
    CITIES.some(function (c) { if (p.indexOf(c) > -1) { $('[name=city]', form).value = c; return true; } });
  }

  var RULES = {
    firstName: function (v) { return v ? '' : 'Please enter your first name.'; },
    lastName: function (v) { return v ? '' : 'Please enter your last name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address, like john@example.com.'; },
    phone: function (v) { return v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '').length === 10 ? '' : 'Please enter a 10-digit phone number, like (501) 555-1234.'; },
    service: function (v) { return v ? '' : 'Please choose a service.'; },
    city: function (v) { return v ? '' : 'Please enter your city.'; },
  };
  function setErr(form, name, msg) {
    var el = form.elements[name]; if (!el || !el.id) return;
    var e = document.getElementById(el.id + '-e'); if (e) e.textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  }

  // Ad attribution: UTM + click IDs from the landing URL, kept for the session so later pages keep them.
  var ATTR = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','msclkid','fbclid'];
  function attrib(form) {
    var q = new URLSearchParams(location.search), st = {};
    try { st = JSON.parse(sessionStorage.getItem('asr-attr') || '{}'); } catch (e) {}
    var fresh = ATTR.some(function (k) { return q.get(k); });
    if (fresh) { st = {}; ATTR.forEach(function (k) { if (q.get(k)) st[k] = q.get(k).slice(0, 200); }); st.landing = location.pathname; }
    try { sessionStorage.setItem('asr-attr', JSON.stringify(st)); } catch (e) {}
    ATTR.concat(['landing']).forEach(function (k) { var el = form.elements['a_' + k]; if (el && st[k]) el.value = st[k]; });
  }

  function init(form) {
    var card = form.closest('[data-lead-card]'), done = $('[data-done]', card), summary = $('[data-summary]', form);
    $('[data-t]', form).value = String(Date.now());
    $('[data-page]', form).value = location.pathname;
    prefill(form);
    attrib(form);
    window.addEventListener('estimate_updated', function () { prefill(form); });
    Object.keys(RULES).forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener('blur', function () { if (el.value || el.getAttribute('aria-invalid')) setErr(form, n, RULES[n](el.value.trim())); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) setErr(form, n, RULES[n](el.value.trim())); });
    });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = typeof v === 'string' ? v.trim() : v; });
      var bad = [];
      Object.keys(RULES).forEach(function (n) { var m = RULES[n](data[n] || ''); setErr(form, n, m); if (m) bad.push([n, m]); });
      if (bad.length) {
        summary.hidden = false; summary.innerHTML = '<strong>Please fix ' + bad.length + (bad.length > 1 ? ' fields' : ' field') + ':</strong> ' + bad.map(function (b) { return esc(b[1]); }).join(' ');
        form.elements[bad[0][0]].focus();
        return;
      }
      summary.hidden = true;
      var btn = $('.lf-submit', form); btn.disabled = true; var old = btn.innerHTML; btn.textContent = 'Sending…';
      fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }).then(function (j) { j.status = r.status; return j; }); })
        .catch(function () { return { ok: false, status: 0 }; })
        .then(function (j) {
          btn.disabled = false; btn.innerHTML = old;
          if (j.status === 422 && j.errors) { Object.keys(j.errors).forEach(function (n) { setErr(form, n, j.errors[n]); }); summary.hidden = false; summary.textContent = 'Please check the highlighted fields.'; summary.focus(); return; }
          showDone(j, data);
        });
    });
    function showDone(j, data) {
      var rows = [['To', 'info@allstarreno.com'], ['Name', data.firstName + ' ' + data.lastName], ['Phone', data.phone], ['Email', data.email], ['City / Region', data.city + ', AR'], ['Service', (data.category && data.category !== data.service ? data.category + ': ' : '') + data.service], ['Notes', data.message || 'No additional notes provided.']];
      $('[data-sum]', done).innerHTML = rows.map(function (r) { return '<dt>' + esc(r[0]) + ':</dt><dd>' + esc(r[1]) + '</dd>'; }).join('');
      var text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
      var fbBox = $('[data-fb]', done);
      var mail = j.mailto || 'mailto:info@allstarreno.com?subject=' + encodeURIComponent('Consultation request: ' + data.firstName + ' ' + data.lastName + ', ' + data.service + ', ' + data.city) + '&body=' + encodeURIComponent(text);
      var sms = j.sms || 'sms:+15015043398?&body=' + encodeURIComponent('Hi All-Star Renovations, this is ' + data.firstName + ' ' + data.lastName + '. I requested a free consultation for ' + data.service + ' in ' + data.city + '. My number is ' + data.phone + '.');
      $('[data-fb-mail]', fbBox).href = mail; $('[data-fb-sms]', fbBox).href = sms;
      var needs = !j.ok || j.fallback;
      fbBox.hidden = !needs;
      $('[data-fb-msg]', fbBox).textContent = needs ? 'Our system could not confirm delivery. To make sure we get your request, please tap to email or text it to us (it is already filled in), or call us.' : '';
      try { localStorage.removeItem('calculator_estimate_prefill'); localStorage.setItem('asr-last-lead', text); } catch (e) {}
      if (j.ok) { try { document.dispatchEvent(new CustomEvent('asr:lead', { detail: { service: data.service, source: data.source } })); } catch (e) {} }
      form.hidden = true; done.hidden = false; done.focus();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'generate_lead', lead_source: data.source, service: data.service, city: data.city, form_location: location.pathname });
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { lead_source: data.source, service: data.service, city: data.city });
    }
    $('[data-again]', done).addEventListener('click', function () {
      ['firstName', 'lastName', 'email', 'phone', 'message'].forEach(function (n) { if (form.elements[n]) form.elements[n].value = ''; });
      $('[data-t]', form).value = String(Date.now());
      done.hidden = true; form.hidden = false; form.elements.firstName.focus();
    });
  }

  // "Request a visit with this estimate" on the home calculator (AI Studio prefill behavior).
  function calcBridge() {
    var sms = document.getElementById('plan-sms'); if (!sms || !document.getElementById('request-visit')) return;
    var a = document.createElement('a'); a.href = '#request-visit'; a.className = sms.className; a.textContent = 'Request a visit with this estimate';
    a.style.gridColumn = '1 / -1'; a.style.background = '#c2410c'; a.style.border = '0';
    sms.parentNode.appendChild(a);
    a.addEventListener('click', function () {
      var line = (document.getElementById('plan-service-line') || {}).textContent || '';
      var lo = (document.getElementById('est-min') || {}).textContent || '', hi = (document.getElementById('est-max') || {}).textContent || '';
      try { localStorage.setItem('calculator_estimate_prefill', 'I used the Instant Estimate Calculator: ' + line + '. Rough estimate ' + lo + ' - ' + hi + '. I would like a free in-home consultation for a firm quote.'); } catch (e) {}
      window.dispatchEvent(new Event('estimate_updated'));
    });
  }
  // Tabs: "Request a Quote" | "Book a Time" (WAI-ARIA tabs, manual activation via click/Enter, arrows move).
  function tabs(card) {
    var list = $('[data-lf-tabs]', card); if (!list) return;
    var btns = $$('[role=tab]', list);
    function select(name, focus) {
      btns.forEach(function (b) {
        var on = b.getAttribute('data-tab') === name;
        b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1;
        $('[data-lf-panel=' + b.getAttribute('data-tab') + ']', card).hidden = !on;
        if (on && focus) b.focus();
      });
      if (name === 'book') {
        var fr = $('[data-book-frame]', card), url = card.getAttribute('data-booking');
        if (url && !fr.firstChild) {
          var f = document.createElement('iframe');
          f.src = url; f.title = 'Pick your in-home consultation time (Google Calendar booking)'; f.loading = 'lazy';
          fr.appendChild(f);
        }
        window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'booking_tab_open', form_location: location.pathname });
      }
    }
    card._select = select;
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(b.getAttribute('data-tab')); });
      b.addEventListener('keydown', function (e) {
        var k = e.key, j = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : k === 'Home' ? 0 : k === 'End' ? btns.length - 1 : null;
        if (j === null) return; e.preventDefault(); j = (j + btns.length) % btns.length; select(btns[j].getAttribute('data-tab'), true);
      });
    });
    $$('[data-open-book]', card).forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); select('book', true); }); });
    if (card.getAttribute('data-default-tab') === 'book' || location.hash === '#book') select('book');
  }
  function openBookFromLinks() { // any a[href="#book"] or [data-book-time] outside the card opens the Book tab
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href="#book"],[data-book-time]'); if (!a || a.closest('[data-lead-card]')) return;
      var card = $('[data-lead-card]'); if (!card || !card._select) return;
      e.preventDefault(); card._select('book'); var sec = document.getElementById('request-visit'); if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      $('#lf-tab-book').focus({ preventScroll: true });
    });
    window.addEventListener('hashchange', function () { var card = $('[data-lead-card]'); if (location.hash === '#book' && card && card._select) { card._select('book'); document.getElementById('request-visit').scrollIntoView(); } });
  }
  function boot() { $$('[data-lead-card]').forEach(tabs); $$('[data-lead-form]').forEach(init); calcBridge(); openBookFromLinks(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
