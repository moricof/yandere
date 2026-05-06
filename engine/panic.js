'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   engine/panic.js — Panic Countdown System
   Shows a 7-second countdown during critical choices. Glitches escalate as
   time runs out. On timeout, the darkest option is force-selected.
   ═══════════════════════════════════════════════════════════════════════════ */

const PanicSystem = (() => {
  let _active      = false;
  let _rafId       = null;
  let _startTime   = 0;
  let _duration    = 7;
  let _onTimeout   = null;
  let _lastSecond  = -1;

  /* ── DOM refs (grabbed lazily) ──────────────────────────────────── */
  const _el = {
    get overlay()  { return document.getElementById('panic-overlay'); },
    get num()      { return document.getElementById('panic-num'); },
    get barFill()  { return document.getElementById('panic-bar-fill'); },
    get screen()   { return document.getElementById('screen-dialogue'); },
  };

  /* ── Public API ─────────────────────────────────────────────────── */

  function start(duration, onTimeout) {
    if (_active) cancel();
    _active    = true;
    _duration  = duration || 7;
    _onTimeout = onTimeout;
    _startTime = performance.now();
    _lastSecond = Math.ceil(_duration);

    // Show overlay
    const overlay = _el.overlay;
    overlay.classList.remove('hidden', 'panic-exit');
    overlay.classList.add('panic-enter');
    overlay.addEventListener('animationend', () => {
      overlay.classList.remove('panic-enter');
    }, { once: true });

    // Reset bar
    _el.barFill.style.width       = '100%';
    _el.barFill.style.background  = '#cc2240';
    _el.num.textContent           = Math.ceil(_duration);
    _el.num.className             = 'panic-num';

    _rafId = requestAnimationFrame(_tick);
  }

  function cancel() {
    if (!_active) return;
    _active = false;
    if (_rafId) cancelAnimationFrame(_rafId);
    _rafId = null;
    _clearGlitch();
    const overlay = _el.overlay;
    overlay.classList.add('panic-exit');
    overlay.addEventListener('animationend', () => {
      overlay.classList.add('hidden');
      overlay.classList.remove('panic-exit');
    }, { once: true });
    setTimeout(() => overlay.classList.add('hidden'), 400); // fallback
  }

  /* ── Internal tick ──────────────────────────────────────────────── */

  function _tick(now) {
    if (!_active) return;
    const elapsed  = (now - _startTime) / 1000;
    const remaining = Math.max(0, _duration - elapsed);
    const pct       = remaining / _duration; // 1 → 0

    // Update bar
    _el.barFill.style.width = `${pct * 100}%`;

    // Bar color: red→dark-red as pct drops
    const r = Math.round(180 + 75 * pct);
    const g = Math.round(10 + 30 * pct);
    _el.barFill.style.background = `rgb(${r},${g},20)`;

    // Update number (whole seconds)
    const sec = Math.ceil(remaining);
    if (sec !== _lastSecond) {
      _lastSecond = sec;
      _el.num.textContent = sec;
      // Pulse the number on each second change
      _el.num.classList.remove('panic-num-pulse');
      void _el.num.offsetWidth;
      _el.num.classList.add('panic-num-pulse');
      // Add urgency class in final 3 seconds
      if (sec <= 3) _el.num.classList.add('panic-num-urgent');
    }

    // Escalating glitch: kicks in at 50% time remaining
    const intensity = 1 - pct; // 0→1 as time runs out
    const screen    = _el.screen;
    screen.classList.toggle('panic-glitch-mild',    intensity > 0.30);
    screen.classList.toggle('panic-glitch-intense', intensity > 0.58);
    screen.classList.toggle('panic-glitch-extreme', intensity > 0.82);

    if (remaining <= 0) {
      _timeout();
      return;
    }

    _rafId = requestAnimationFrame(_tick);
  }

  function _timeout() {
    _active = false;
    _clearGlitch();

    // Big screen flash
    const screen = _el.screen;
    screen.classList.add('panic-timeout-flash');
    setTimeout(() => screen.classList.remove('panic-timeout-flash'), 500);

    // Hide overlay
    _el.overlay.classList.add('hidden');

    if (typeof _onTimeout === 'function') {
      setTimeout(_onTimeout, 300); // slight delay for flash to register
    }
  }

  function _clearGlitch() {
    const screen = _el.screen;
    if (screen) {
      screen.classList.remove(
        'panic-glitch-mild',
        'panic-glitch-intense',
        'panic-glitch-extreme',
        'panic-timeout-flash'
      );
    }
  }

  return {
    start,
    cancel,
    get active() { return _active; },
  };
})();
