/* All-Star lead form + live scheduler (progressive enhancement for LeadForm.astro). */
(function () {
  var TZ = 'America/Chicago';
  var WINDOWS = [['morning', 'Morning (9:00 AM – 12:00 PM)'], ['early-afternoon', 'Early Afternoon (12:00 PM – 3:00 PM)'], ['late-afternoon', 'Late Afternoon (3:00 PM – 6:00 PM)'], ['evening', 'Evening (6:00 PM – 7:30 PM)'], ['flexible', 'Flexible / Any Time']];
  var CITIES = ['Conway', 'Greenbrier', 'Vilonia', 'Maumelle', 'Little Rock', 'North Little Rock', 'Sherwood', 'Cabot', 'Searcy', 'Benton', 'Bryant', 'Morrilton'];
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function localDays() { // fallback when /api/availability is unreachable
    var today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    var out = [];
    for (var i = 1; i <= 14; i++) {
      var d = new Date(Date.parse(today + 'T12:00:00Z') + i * 864e5);
      if (d.getUTCDay() === 0) continue;
      out.push({ date: d.toISOString().slice(0, 10), label: d.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' }), windows: WINDOWS.map(function (w) { return { id: w[0], label: w[1], busy: false }; }) });
    }
    return out;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function initScheduler(form) {
    var box = $('[data-scheduler]', form), status = $('[data-sched-status]', box), fb = $('[data-sched-fallback]', box);
    var days = [], selDate = '', selWin = '';
    var dayGroup = document.createElement('div'), winGroup = document.createElement('div'), err = document.createElement('p');
    dayGroup.className = 'lf-days'; dayGroup.setAttribute('role', 'radiogroup'); dayGroup.setAttribute('aria-label', 'Preferred date'); dayGroup.id = 'lf-days';
    winGroup.className = 'lf-wins'; winGroup.setAttribute('role', 'radiogroup'); winGroup.setAttribute('aria-label', 'Preferred time window'); winGroup.id = 'lf-wins';
    err.className = 'lf-e'; err.id = 'lf-sched-e'; err.setAttribute('data-err', '');
    var dayLbl = document.createElement('p'); dayLbl.className = 'lf-help'; dayLbl.innerHTML = '<strong style="color:#fff">1. Pick a day</strong>';
    var winLbl = document.createElement('p'); winLbl.className = 'lf-help'; winLbl.innerHTML = '<strong style="color:#fff">2. Pick a time window</strong>';
    fb.replaceWith(dayLbl); box.appendChild(dayGroup); box.appendChild(winLbl); box.appendChild(winGroup); box.appendChild(err);
    box.setAttribute('aria-describedby', 'lf-sched-help lf-sched-e');
    function renderDays() {
      dayGroup.innerHTML = days.map(function (d, i) {
        var p = d.label.split(' '), full = d.windows.every(function (w) { return w.busy; });
        return '<label><input type="radio" name="date" value="' + d.date + '"' + (d.date === selDate ? ' checked' : '') + (full ? ' aria-describedby="lf-booked"' : '') + '><span class="lf-day' + (full ? ' lf-full-day' : '') + '">' + esc(p[0].replace(',', '')) + '<b>' + esc(p[2] || '') + '</b>' + esc(p[1] || '') + (full ? '<small>Booked</small>' : '') + '</span></label>';
      }).join('') + '<span id="lf-booked" class="sr">Fully booked</span>';
      $$('input', dayGroup).forEach(function (r) { r.addEventListener('change', function () { selDate = r.value; selWin = ''; renderWins(); clearErr(); }); });
    }
    function renderWins() {
      var d = days.filter(function (x) { return x.date === selDate; })[0];
      if (!d) { winGroup.innerHTML = '<p class="lf-help">Choose a day first.</p>'; return; }
      winGroup.innerHTML = d.windows.map(function (w) {
        return '<label><input type="radio" name="window" value="' + w.id + '"' + (w.busy ? ' disabled' : '') + (w.id === selWin ? ' checked' : '') + '><span class="lf-win">' + esc(w.label) + (w.busy ? '<em>Booked</em>' : '<em>Open</em>') + '</span></label>';
      }).join('');
      $$('input', winGroup).forEach(function (r) { r.addEventListener('change', function () { selWin = r.value; clearErr(); }); });
    }
    function clearErr() { err.textContent = ''; box.removeAttribute('aria-invalid'); }
    function load() {
      status.textContent = 'Loading open times…';
      return fetch('/api/availability', { headers: { accept: 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (j) { days = j.days; status.textContent = j.live ? 'Live availability from our calendar. Booked windows are greyed out. Times are Central Time.' : 'Choose a day (Mon–Sat, next 2 weeks) and a time window. Times are Central Time; we will confirm by call or text.'; })
        .catch(function () { days = localDays(); status.textContent = 'Choose a day (Mon–Sat, next 2 weeks) and a time window. Times are Central Time; we will confirm by call or text.'; })
        .then(function () {
          if (!selDate || !days.some(function (d) { return d.date === selDate; })) { var first = days.filter(function (d) { return !d.windows.every(function (w) { return w.busy; }); })[0]; selDate = first ? first.date : ''; }
          renderDays(); renderWins();
        });
    }
    load();
    return {
      reload: load,
      value: function () { return { date: selDate, window: selWin }; },
      error: function (m) { err.textContent = m; box.setAttribute('aria-invalid', 'true'); },
      focus: function () { var el = $('input:checked', winGroup) || $('input:not(:disabled)', winGroup) || $('input', dayGroup); if (el) el.focus(); },
      reset: function () { selWin = ''; renderWins(); },
    };
  }

  function prefill(form) { // AI Studio EstimateCalculator -> contact form prefill
    var p = null; try { p = localStorage.getItem('calculator_estimate_prefill'); } catch (e) {}
    if (!p) return;
    var msg = $('[name=message]', form); if (msg && !msg.value) msg.value = p;
    var map = [['Shower Replacement', 'Shower Replacement'], ['Tub-to-Shower Conversion', 'Tub-to-Shower Conversion'], ['Walk-In Safety Tub', 'Walk-In Tub Installation'], ['Full Bathroom Remodel', 'Full Bathroom Remodel']];
    map.forEach(function (m) { if (p.indexOf(m[0]) > -1) $('[name=service]', form).value = m[1]; });
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

  function init(form) {
    var card = form.closest('[data-lead-card]'), done = $('[data-done]', card), summary = $('[data-summary]', form);
    $('[data-t]', form).value = String(Date.now());
    $('[data-page]', form).value = location.pathname;
    var sched = initScheduler(form);
    prefill(form);
    window.addEventListener('estimate_updated', function () { prefill(form); });
    Object.keys(RULES).forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener('blur', function () { if (el.value || el.getAttribute('aria-invalid')) setErr(form, n, RULES[n](el.value.trim())); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) setErr(form, n, RULES[n](el.value.trim())); });
    });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = typeof v === 'string' ? v.trim() : v; });
      var s = sched.value(); data.date = s.date; data.window = s.window;
      var bad = [];
      Object.keys(RULES).forEach(function (n) { var m = RULES[n](data[n] || ''); setErr(form, n, m); if (m) bad.push([n, m]); });
      if (!data.date || !data.window) { sched.error(!data.date ? 'Please choose a day.' : 'Please choose a time window.'); bad.push(['window', 'Please choose a consultation day and time window.']); }
      if (bad.length) {
        summary.hidden = false; summary.innerHTML = '<strong>Please fix ' + bad.length + (bad.length > 1 ? ' fields' : ' field') + ':</strong> ' + bad.map(function (b) { return esc(b[1]); }).join(' ');
        var first = bad[0][0]; if (first === 'window') sched.focus(); else form.elements[first].focus();
        return;
      }
      summary.hidden = true;
      var btn = $('.lf-submit', form); btn.disabled = true; var old = btn.innerHTML; btn.textContent = 'Sending…';
      fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }).then(function (j) { j.status = r.status; return j; }); })
        .catch(function () { return { ok: false, status: 0 }; })
        .then(function (j) {
          btn.disabled = false; btn.innerHTML = old;
          if (j.status === 409) { sched.error(j.errors.window); sched.reload(); return; }
          if (j.status === 422 && j.errors) { Object.keys(j.errors).forEach(function (n) { if (n === 'date' || n === 'window') sched.error(j.errors[n]); else setErr(form, n, j.errors[n]); }); summary.hidden = false; summary.textContent = 'Please check the highlighted fields.'; summary.focus(); return; }
          showDone(j, data);
        });
    });
    function showDone(j, data) {
      var win = (WINDOWS.filter(function (w) { return w[0] === data.window; })[0] || [0, data.window])[1];
      var rows = [['To', 'info@allstarreno.com'], ['Name', data.firstName + ' ' + data.lastName], ['Phone', data.phone], ['Email', data.email], ['City / Region', data.city + ', AR'], ['Project Type', data.service], ['Requested Consultation', data.date + ' (' + win + ')'], ['Notes', data.message || 'No additional notes provided.']];
      $('[data-sum]', done).innerHTML = rows.map(function (r) { return '<dt>' + esc(r[0]) + ':</dt><dd>' + esc(r[1]) + '</dd>'; }).join('');
      var text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
      var fbBox = $('[data-fb]', done);
      var mail = j.mailto || 'mailto:info@allstarreno.com?subject=' + encodeURIComponent('Consultation request: ' + data.firstName + ' ' + data.lastName + ', ' + data.service + ', ' + data.city) + '&body=' + encodeURIComponent(text);
      var sms = j.sms || 'sms:+15015043398?&body=' + encodeURIComponent('Hi All-Star Renovations, this is ' + data.firstName + ' ' + data.lastName + '. I requested a free consultation for ' + data.service + ' in ' + data.city + ' on ' + data.date + ' (' + win + '). My number is ' + data.phone + '.');
      $('[data-fb-mail]', fbBox).href = mail; $('[data-fb-sms]', fbBox).href = sms;
      var needs = !j.ok || j.fallback;
      fbBox.hidden = !needs;
      $('[data-fb-msg]', fbBox).textContent = needs ? 'Our system could not confirm delivery. To make sure we get your request, please tap to email or text it to us (it is already filled in), or call us.' : '';
      try { localStorage.removeItem('calculator_estimate_prefill'); localStorage.setItem('asr-last-lead', text); } catch (e) {}
      form.hidden = true; done.hidden = false; done.focus();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'generate_lead', lead_source: data.source, service: data.service, city: data.city, form_location: location.pathname });
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { lead_source: data.source, service: data.service, city: data.city });
    }
    $('[data-again]', done).addEventListener('click', function () {
      ['firstName', 'lastName', 'email', 'phone', 'message'].forEach(function (n) { if (form.elements[n]) form.elements[n].value = ''; });
      $('[data-t]', form).value = String(Date.now()); sched.reset(); sched.reload();
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
  function boot() { $$('[data-lead-form]').forEach(init); calcBridge(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
