/* All-Star Renovations: Microsoft Ads bathroom quote funnel for /lp/microsoft/bathroom-remodel.
   Submits to /api/lead with the same field names as lead-form.js, including the TrustedForm cert.
   Custom events go to dataLayer and to window.uetq when it exists. generate_lead is pushed once on success. */
(function () {
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---------- tracking ----------
  window.dataLayer = window.dataLayer || [];
  window.uetq = window.uetq || [];
  function track(action, label, extra) {
    var p = { event_category: 'funnel', event_label: label || '' };
    if (extra) for (var k in extra) p[k] = extra[k];
    try { window.dataLayer.push(Object.assign({ event: action }, p)); } catch (e) {}
    try { window.uetq.push('event', action, p); } catch (e) {}
  }
  $$('[data-call]').forEach(function (a) { a.addEventListener('click', function () { track('phone_click', a.closest('section, header, footer, .dock') ? (a.closest('section, header, footer, .dock').className.split(' ')[0]) : ''); }); });

  // Attribution (UTM + click IDs, incl. msclkid), same session key as the main site.
  var ATTR = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','msclkid','fbclid'];
  var q = new URLSearchParams(location.search), st = {};
  try { st = JSON.parse(sessionStorage.getItem('asr-attr') || '{}'); } catch (e) {}
  var fresh = ATTR.some(function (k) { return q.get(k); });
  if (fresh) { st = {}; ATTR.forEach(function (k) { if (q.get(k)) st[k] = q.get(k).slice(0, 200); }); st.landing = location.pathname; }
  try { sessionStorage.setItem('asr-attr', JSON.stringify(st)); } catch (e) {}
  if (!st.landing) st.landing = location.pathname;

  // ---------- service area ----------
  // Service area: 50 mi for the business; the Microsoft Ads target is ~25 mi (ZIP tiers in the campaign plan).
  var ZIPS = {'72032':'Conway','72034':'Conway','72033':'Conway','72058':'Greenbrier','72106':'Mayflower','72173':'Vilonia','72113':'Maumelle','72120':'Sherwood','72023':'Cabot','72126':'Perryville','72114':'North Little Rock','72116':'North Little Rock','72117':'North Little Rock','72118':'North Little Rock','72201':'Little Rock','72202':'Little Rock','72204':'Little Rock','72205':'Little Rock','72207':'Little Rock','72211':'Little Rock','72212':'Little Rock','72223':'Little Rock','72227':'Little Rock','72110':'Morrilton','72012':'Beebe','72022':'Bryant','72015':'Benton','72019':'Benton','72143':'Searcy','72543':'Heber Springs','72076':'Jacksonville','72086':'Lonoke','72176':'Ward','72007':'Austin','72181':'Wooster','72061':'Guy','72031':'Clinton','72127':'Plumerville','72065':'Hensley','72002':'Alexander','72103':'Mabelvale','72206':'Little Rock','72209':'Little Rock','72210':'Little Rock','72135':'Roland','72016':'Bigelow','72047':'Enola','72039':'Damascus','72111':'Mount Vernon','72156':'Solgohachia','72136':'Romance','72107':'Menifee','72157':'Springfield','72131':'Quitman','72045':'El Paso','72070':'Houston','72027':'Center Ridge','72125':'Perry'};
  var AD_TIER = {'72032':'core','72034':'core','72173':'core','72058':'core','72106':'core','72113':'core','72120':'growth','72023':'growth','72212':'growth','72223':'growth','72116':'growth','72135':'growth','72007':'growth','72016':'growth','72047':'growth','72039':'growth','72181':'growth','72111':'growth','72156':'growth','72136':'growth','72061':'growth','72107':'growth','72207':'base','72227':'base','72211':'base','72205':'base','72076':'base','72110':'base','72127':'base','72157':'base','72131':'base','72045':'base','72012':'base','72118':'reduced','72117':'reduced','72204':'reduced','72070':'reduced','72027':'reduced','72125':'reduced'};
  function area(zip) {
    var t = AD_TIER[zip] || '';
    if (ZIPS[zip]) return { ok: true, city: ZIPS[zip], tier: t };
    if (/^72[01]\d\d$/.test(zip) || zip === '72543') return { ok: true, city: '', tier: t };
    return { ok: false, city: '', tier: '' };
  }

  // ---------- quiz ----------
  var card = $('[data-quiz]'), form = $('[data-quiz-form]', card);
  var steps = $$('[data-step]', form), bar = $('[data-bar]', card), label = $('[data-steplabel]', card);
  var back = $('[data-back]', card), nav = $('[data-nav]', card);
  var cur = 1, started = false, TOTAL = 5, t0 = Date.now();

  function show(n, focus) {
    cur = n;
    steps.forEach(function (s) { s.classList.toggle('is-active', +s.getAttribute('data-step') === n); });
    bar.style.width = (Math.min(n, TOTAL) / TOTAL * 100) + '%';
    label.textContent = n <= TOTAL ? 'Step ' + n + ' of ' + TOTAL : 'All set';
    back.hidden = n === 1 || n > TOTAL;
    nav.hidden = n > TOTAL;
    if (n === 5) recap();
    if (focus) { var f = $('[data-step="' + n + '"] input:not([type=hidden]), [data-step="' + n + '"]', form); if (f && window.innerWidth > 640) f.focus({ preventScroll: true }); }
    var head = $('.quiz-head', card);
    if (head) head.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function val(name) { var el = form.elements[name]; if (!el) return ''; if (el.length !== undefined && !el.tagName) { var c = Array.prototype.filter.call(el, function (i) { return i.checked; })[0]; return c ? c.value : ''; } if (el.type === 'checkbox') return el.checked ? el.value : ''; return (el.value || '').trim(); }

  // auto-advance on single-choice steps 1-3
  [1, 2, 3].forEach(function (n) {
    $$('[data-step="' + n + '"] input[type=radio]', form).forEach(function (r) {
      r.addEventListener('change', function () {
        if (!started) { started = true; track('quiz_start', val('category')); }
        setTimeout(function () { show(n + 1, true); }, 230);
      });
    });
  });
  back.addEventListener('click', function () { if (cur > 1) show(cur - 1, true); });

  function setErr(name, msg) {
    var e = $('[data-err="' + name + '"]', form); if (e) e.textContent = msg || '';
    var el = form.elements[name]; if (el && el.tagName === 'INPUT') { if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); }
  }

  var zipEl = form.elements.zip, zipNote = $('[data-zipnote]', form);
  zipEl.addEventListener('input', function () {
    zipEl.value = zipEl.value.replace(/\D/g, '').slice(0, 5); setErr('zip', '');
    if (zipEl.value.length === 5) {
      var a = area(zipEl.value);
      zipNote.className = 'zip-note' + (a.ok ? '' : ' warn');
      zipNote.textContent = a.ok ? 'Great news, ' + (a.city ? a.city + ' is' : 'you\u2019re') + ' in our service area.' : 'You may be outside our 50-mile radius. Continue and we\u2019ll confirm.';
    } else { zipNote.textContent = ''; }
  });
  $('[data-next]', form).addEventListener('click', function () {
    var ok = true;
    if (!/^\d{5}$/.test(zipEl.value)) { setErr('zip', 'Please enter a 5-digit ZIP code.'); ok = false; }
    if (!val('owner')) { setErr('owner', 'Please choose one.'); ok = false; } else setErr('owner', '');
    if (ok) show(5, true);
  });
  $$('[name=owner]', form).forEach(function (r) { r.addEventListener('change', function () { setErr('owner', ''); }); });

  function recap() {
    var a = area(zipEl.value);
    $('[data-recap]', form).textContent = shortCat(val('category')) + (a.city ? ' in ' + a.city : '') + '. Last step: we\u2019ll text your confirmation and appointment options.';
  }
  function shortCat(c) { return ({ 'Walk-In Showers': 'Shower replacement', 'Tub-to-Shower Conversions': 'Tub-to-shower conversion', 'Walk-In Tubs': 'Walk-in tub', 'Aging-in-Place & ADA': 'Safety / ADA upgrade', 'Full Bathroom Remodel': 'Full bathroom remodel' })[c] || 'Bathroom project'; }

  var RULES = {
    firstName: function (v) { return v ? '' : 'Please enter your first name.'; },
    lastName: function (v) { return v ? '' : 'Please enter your last name.'; },
    phone: function (v) { return v.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '').length === 10 ? '' : 'Please enter a 10-digit phone number.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address.'; }
  };
  Object.keys(RULES).forEach(function (n) { form.elements[n].addEventListener('blur', function () { if (form.elements[n].value) setErr(n, RULES[n](val(n))); }); });

  // lead score helps the office prioritize call-backs
  function score() {
    var s = 0, tl = val('timeline'), rs = val('reason');
    if (within30()) s += 3; else if (tl === '1 to 3 Months') s += 1;
    if (/^Yes/.test(val('owner'))) s += 2;
    if (/Safety|Leaks/.test(rs)) s += 1;
    var a = area(zipEl.value);
    if (a.tier) s += (a.tier === 'core' ? 2 : 1); else if (a.ok) s += 0;
    return s >= 6 ? 'HOT' : s >= 4 ? 'WARM' : 'NURTURE';
  }
  function within30() { var tl = val('timeline'); return tl === 'Immediate (1-2 Weeks)' || tl === 'Within 1 Month'; }
  // The lead Microsoft Ads should optimize toward: homeowner, starting within 30 days, inside the ~25-mile ad area.
  function qualified() { return within30() && /^Yes/.test(val('owner')) && !!area(zipEl.value).tier; }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var bad = [];
    Object.keys(RULES).forEach(function (n) { var m = RULES[n](val(n)); setErr(n, m); if (m) bad.push(n); });
    if (bad.length) { form.elements[bad[0]].focus(); return; }
    var a = area(zipEl.value), lvl = score();
    // service is the specific project (a services.mjs sub-name) so /api/lead categorizes it correctly.
    // TrustedForm injects xxTrustedFormCertUrl; include it so the cert reaches the same lead email.
    var data = {
      firstName: val('firstName'), lastName: val('lastName'), email: val('email'), phone: val('phone'),
      service: val('category') || 'Bathroom Remodeling', category: 'Bathroom Remodeling',
      city: a.city || ('ZIP ' + zipEl.value), timeline: val('timeline'),
      message: '[Microsoft Ads funnel | Lead score: ' + lvl + '] Project: ' + val('category') + ' | Reason: ' + val('reason') + ' | Timeline: ' + val('timeline') + ' | ZIP: ' + zipEl.value + (a.ok ? '' : ' (verify radius)') + ' | Ad area: ' + (a.tier || 'outside 25 mi') + ' | Homeowner: ' + val('owner') + ' | 30-day qualified: ' + (qualified() ? 'YES' : 'no'),
      company: val('company'), t: String(t0), source: 'lp_microsoft_bathroom-remodel', page: location.pathname, smsConsent: val('smsConsent'),
      xxTrustedFormCertUrl: val('xxTrustedFormCertUrl')
    };
    ATTR.concat(['landing']).forEach(function (k) { data['a_' + k] = st[k] || ''; });

    var btn = $('[data-submit]', form); btn.disabled = true; var old = btn.innerHTML; btn.textContent = 'Sending\u2026';
    fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }).then(function (j) { j.status = r.status; return j; }); })
      .catch(function () { return { ok: false, status: 0 }; })
      .then(function (j) {
        btn.disabled = false; btn.innerHTML = old;
        $('[data-fname]', form).textContent = data.firstName;
        var fb = $('[data-fb]', form);
        var delivered = !!j.ok;
        if (delivered) {
          track('lead_submit', data.service, { lead_score: lvl });
          if (qualified()) track('qualified_lead', data.service, { lead_score: lvl });
          // One generate_lead only, same payload shape as lead-form.js. Do not also call gtag('event','generate_lead').
          try { document.dispatchEvent(new CustomEvent('asr:lead', { detail: { service: data.service, source: data.source } })); } catch (e) {}
          window.dataLayer.push({ event: 'generate_lead', lead_source: data.source, service: data.service, city: data.city, form_location: location.pathname });
        }
        if (!delivered) {
          fb.hidden = false;
          $('[data-fb-msg]', fb).textContent = 'We couldn\u2019t confirm delivery. Tap below to text your request (it\u2019s pre-filled), or call us.';
          $('[data-fb-sms]', fb).href = 'sms:+15015043398?&body=' + encodeURIComponent('Hi All-Star, this is ' + data.firstName + ' ' + data.lastName + '. I\u2019d like a free quote for ' + shortCat(val('category')).toLowerCase() + ' in ' + data.city + '. My number is ' + data.phone + '.');
        } else {
          fb.hidden = true;
        }
        show(6);
        $('[data-step="6"]', form).focus({ preventScroll: true });
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  });
  $('[data-book]', form).addEventListener('click', function () { track('booking_open', val('category')); });

  // open quiz from anywhere (optionally preselect project)
  function openQuiz(cat) {
    if (cat && cur <= TOTAL) {
      var r = $$('[name=category]', form).filter(function (i) { return i.value === cat; })[0];
      if (r) { r.checked = true; if (!started) { started = true; track('quiz_start', cat); } show(2); }
    }
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  $$('[data-open-quiz]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); openQuiz(); }); });
  $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function () { openQuiz(b.getAttribute('data-pick')); }); });

  show(1);

  // ---------- before / after ----------
  var ba = $('[data-ba]');
  if (ba) {
    var range = $('[data-ba-range]', ba), before = $('[data-ba-before]', ba), handle = $('[data-ba-handle]', ba);
    var set = function (v) { before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)'; handle.style.left = v + '%'; };
    range.addEventListener('input', function () { set(range.value); });
    // gentle auto-demo the first time it enters view
    var demoed = false;
    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (e.isIntersecting && !demoed) {
          demoed = true; o.disconnect();
          var seq = [50, 22, 78, 50];
          (function step(i) { if (i >= seq.length - 1) return; var a0 = seq[i], a1 = seq[i + 1], s = performance.now();
            (function f(now) { var p = Math.min(1, (now - s) / 700), e2 = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2, v = a0 + (a1 - a0) * e2; set(v); range.value = v; if (p < 1) requestAnimationFrame(f); else step(i + 1); })(s);
          })(0);
        }
      });
    }, { threshold: .6 }).observe(ba);
  }

  // ---------- reveals ----------
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  // ---------- mobile dock (hidden while quiz card is on screen) ----------
  var dock = $('[data-dock]');
  new IntersectionObserver(function (es) { es.forEach(function (e) { dock.classList.toggle('show', !e.isIntersecting); }); }, { threshold: 0 }).observe(card);
})();
