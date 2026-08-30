/* ═══════════════════════════════════════════════════════
   J's Elite Mobile Detailing — concept site behaviour
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var body = document.body;
  var toggle = document.getElementById('langToggle');

  /* ── language toggle ── */
  function applyLang(lang) {
    var attr = lang === 'es' ? 'data-es' : 'data-en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute(attr);
      if (val === null) return;
      if (el.children.length === 0) {
        el.textContent = val;
      } else {
        for (var i = 0; i < el.childNodes.length; i++) {
          var n = el.childNodes[i];
          if (n.nodeType === 3 && n.textContent.trim()) { n.textContent = val; return; }
        }
      }
    });
    body.classList.toggle('es', lang === 'es');
    document.documentElement.lang = lang;
    if (toggle) {
      toggle.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
    }
    try { localStorage.setItem('jelite-lang', lang); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(body.classList.contains('es') ? 'en' : 'es');
    });
  }
  var saved = null;
  try { saved = localStorage.getItem('jelite-lang'); } catch (e) {}
  if (saved === 'es') applyLang('es');

  /* ── before / after slider ──
     Pointer drag handled on .ba directly. Range input stays for keyboard. */
  var ba = document.getElementById('ba');
  var baRange = document.getElementById('baRange');
  var baBefore = document.querySelector('.ba-before');
  var baDivider = document.getElementById('baDivider');

  function renderBA() {
    if (!baRange || !baBefore || !baDivider) return;
    var v = Number(baRange.value);
    baBefore.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
    baDivider.style.left = v + '%';
  }

  function baSetFromX(clientX) {
    var rect = ba.getBoundingClientRect();
    var v = ((clientX - rect.left) / rect.width) * 100;
    baRange.value = Math.max(0, Math.min(100, v));
    renderBA();
  }

  if (ba && baRange) {
    renderBA();
    baRange.addEventListener('input', renderBA); // arrow keys

    var baDragging = false;
    ba.addEventListener('pointerdown', function (e) {
      baDragging = true;
      try { ba.setPointerCapture(e.pointerId); } catch (_) {}
      baSetFromX(e.clientX);
      e.preventDefault();
    });
    ba.addEventListener('pointermove', function (e) {
      if (baDragging) baSetFromX(e.clientX);
    });
    function baEnd(e) {
      baDragging = false;
      try { ba.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    ba.addEventListener('pointerup', baEnd);
    ba.addEventListener('pointercancel', baEnd);
  }

  /* ── booking form ── */
  var form = document.getElementById('bookForm');
  var success = document.getElementById('bookSuccess');

  function setInvalid(input, bad) {
    var field = input.closest('.field');
    if (field) field.classList.toggle('invalid', bad);
  }
  function validPhone(v) { return v.replace(/\D/g, '').length >= 10; }

  if (form) {
    form.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('input', function () { setInvalid(el, false); });
      el.addEventListener('change', function () { setInvalid(el, false); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('qName');
      var phone = document.getElementById('qPhone');
      var service = document.getElementById('qService');
      var vehicle = document.getElementById('qVehicle');
      var ok = true;

      if (!name.value.trim()) { setInvalid(name, true); ok = false; }
      if (!validPhone(phone.value)) { setInvalid(phone, true); ok = false; }
      if (!service.value) { setInvalid(service, true); ok = false; }
      if (!vehicle.value) { setInvalid(vehicle, true); ok = false; }

      if (!ok) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }

      // DEMO ONLY — no backend. Wire to text / email / CRM before launch.
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  /* ── work carousel ── */
  var carousel = document.getElementById('workCarousel');
  if (carousel) {
    var viewport = document.getElementById('carouselViewport');
    var track = document.getElementById('carouselTrack');
    var dotsWrap = document.getElementById('carouselDots');
    var slides = Array.prototype.slice.call(track.children);
    var count = slides.length;
    var index = 0;
    var timer = null;
    var INTERVAL = 4800;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Photo ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dotsWrap.appendChild(b);
      return b;
    });

    function render() {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }
    function go(i, userAction) {
      index = (i + count) % count;
      render();
      if (userAction) restart();
    }
    function next() { go(index + 1); }

    function start() {
      if (reduce || timer) return;
      timer = setInterval(next, INTERVAL);
    }
    function stop() { clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }

    carousel.querySelector('.carousel-next').addEventListener('click', function () { go(index + 1, true); });
    carousel.querySelector('.carousel-prev').addEventListener('click', function () { go(index - 1, true); });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(index + 1, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { go(index - 1, true); e.preventDefault(); }
    });

    var dragX0 = 0, dragging = false;
    viewport.addEventListener('pointerdown', function (e) {
      dragging = true;
      dragX0 = e.clientX;
      stop();
      track.classList.add('no-anim');
      viewport.classList.add('is-grabbing');
      try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = (e.clientX - dragX0) / viewport.offsetWidth * 100;
      track.style.transform = 'translateX(' + (-index * 100 + dx) + '%)';
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('no-anim');
      viewport.classList.remove('is-grabbing');
      try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
      var dx = e.clientX - dragX0;
      if (dx <= -45) go(index + 1, true);
      else if (dx >= 45) go(index - 1, true);
      else { render(); start(); }
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    render();
    start();
  }

  /* ── footer year ── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
