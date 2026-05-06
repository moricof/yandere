'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   engine/effects.js — Background, Visual Effects, and Voice Systems
   ═══════════════════════════════════════════════════════════════════════════ */


/* ── BackgroundManager ───────────────────────────────────────────────────── */

const BackgroundManager = (() => {
  let _bgLayer     = null;
  let _currentPath = null;

  // Scene key → file path shorthand map (extend as you add art)
  const SCENE_MAP = {
    classroom       : 'assets/bg/school/classroom.jpg',
    hallway         : 'assets/bg/school/hallway.jpg',
    rooftop         : 'assets/bg/school/rooftop.jpg',
    library         : 'assets/bg/school/library.jpg',
    home_room       : 'assets/bg/home/room.jpg',
    home_night      : 'assets/bg/home/night.jpg',
    home_kitchen    : 'assets/bg/home/kitchen.jpg',
    salon           : 'assets/bg/salon/interior.jpg',
    void            : 'assets/bg/special/void.jpg',
    white           : 'assets/bg/special/white.jpg',
    black           : '',
  };

  function init() {
    _bgLayer = document.getElementById('bg-layer');
  }

  /* set(path, opts) — display a background by file path.
     opts.fade   — crossfade transition (default true)
     opts.darken — add a dark rgba overlay (0–1, default 0)
     opts.tint   — apply a CSS color as overlay tint */
  function set(path, opts = {}) {
    if (!_bgLayer) init();
    const { fade = true, darken = 0, tint = null } = opts;

    if (path === _currentPath) {
      _applyOverlay(darken, tint);
      return;
    }
    _currentPath = path;

    if (!fade) {
      _bgLayer.style.backgroundImage = path ? `url("${path}")` : '';
      _applyOverlay(darken, tint);
      return;
    }

    // Crossfade: snapshot current bg into a temporary overlay div, swap, fade it out
    const prev = document.createElement('div');
    prev.className = 'bg-crossfade';
    prev.style.cssText = `
      background-image: ${_bgLayer.style.backgroundImage || 'none'};
      background-size: cover;
      background-position: center;
    `;
    _bgLayer.parentElement.insertBefore(prev, _bgLayer);
    _bgLayer.style.backgroundImage = path ? `url("${path}")` : '';

    requestAnimationFrame(() => {
      prev.style.opacity = '0';
      prev.addEventListener('transitionend', () => prev.remove(), { once: true });
      setTimeout(() => prev.remove(), 900); // fallback
    });

    _applyOverlay(darken, tint);
  }

  /* setScene(key, opts) — look up a scene key and call set(). */
  function setScene(key, opts = {}) {
    const path = SCENE_MAP[key];
    if (path === undefined) {
      console.warn(`[BG] Unknown scene key: "${key}"`);
      return;
    }
    set(path, opts);
  }

  function clear(fade = false) {
    set('', { fade });
  }

  function _applyOverlay(darken, tint) {
    const overlay = document.getElementById('bg-overlay');
    if (!overlay) return;
    if (darken > 0) {
      overlay.style.background = `rgba(0,0,0,${darken})`;
      overlay.style.opacity    = '1';
    } else if (tint) {
      overlay.style.background = tint;
      overlay.style.opacity    = '1';
    } else {
      overlay.style.opacity = '';
    }
  }

  return { init, set, setScene, clear };
})();


/* ── EffectManager ───────────────────────────────────────────────────────── */

const EffectManager = (() => {
  let _screen  = null;
  let _overlay = null;

  function init() {
    _screen  = document.getElementById('screen-dialogue');
    _overlay = document.getElementById('horror-overlay');
  }

  /* horror(type, onDone) — visual shock effects from 'horror' step type.
     Supports: red_flash | static_brief | flicker_slow | zoom_in | glitch | shake */
  function horror(type, onDone) {
    if (!_overlay) init();
    const cb = () => { if (typeof onDone === 'function') onDone(); };

    switch (type) {
      case 'red_flash':
        _overlay.classList.remove('hidden', 'static-noise', 'horror-flicker');
        _overlay.classList.add('red-flash');
        setTimeout(() => {
          _overlay.classList.remove('red-flash');
          _overlay.classList.add('hidden');
          cb();
        }, 420);
        break;

      case 'static_brief':
        _overlay.classList.remove('hidden', 'red-flash', 'horror-flicker');
        _overlay.classList.add('static-noise');
        setTimeout(() => {
          _overlay.classList.remove('static-noise');
          _overlay.classList.add('hidden');
          cb();
        }, 600);
        break;

      case 'flicker_slow':
        _overlay.classList.remove('hidden', 'red-flash', 'static-noise');
        _overlay.classList.add('horror-flicker');
        setTimeout(() => {
          _overlay.classList.remove('horror-flicker');
          _overlay.classList.add('hidden');
          cb();
        }, 1800);
        break;

      case 'zoom_in':
        if (!_screen) init();
        _screen.classList.add('fx-zoom-in');
        setTimeout(() => { _screen.classList.remove('fx-zoom-in'); cb(); }, 800);
        break;

      case 'glitch':
        if (!_screen) init();
        _screen.classList.add('fx-glitch');
        setTimeout(() => { _screen.classList.remove('fx-glitch'); cb(); }, 650);
        break;

      case 'shake':
        if (!_screen) init();
        _screen.classList.add('fx-shake');
        setTimeout(() => { _screen.classList.remove('fx-shake'); cb(); }, 500);
        break;

      default:
        cb();
    }
  }

  /* cute.hearts(el) — float hearts upward from a character area */
  const cute = {
    hearts(targetEl) {
      if (!_screen) init();
      const wrap = document.createElement('div');
      wrap.className = 'hearts-container';
      (targetEl || _screen).appendChild(wrap);
      for (let i = 0; i < 6; i++) {
        const h = document.createElement('span');
        h.className = 'floating-heart';
        h.textContent = '♥';
        h.style.left              = `${15 + Math.random() * 65}%`;
        h.style.animationDelay    = `${(Math.random() * 0.6).toFixed(2)}s`;
        h.style.animationDuration = `${(1.1 + Math.random() * 0.6).toFixed(2)}s`;
        wrap.appendChild(h);
      }
      setTimeout(() => wrap.remove(), 2200);
    },

    glow(targetEl) {
      if (!targetEl) return;
      targetEl.classList.add('cute-glow');
      targetEl.addEventListener('animationend', () => {
        targetEl.classList.remove('cute-glow');
      }, { once: true });
      setTimeout(() => targetEl.classList.remove('cute-glow'), 1400); // fallback
    },

    sparkles(targetEl) {
      if (!_screen) init();
      const wrap = document.createElement('div');
      wrap.className = 'sparkle-container';
      (targetEl || _screen).appendChild(wrap);
      for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        s.className = 'sparkle';
        s.textContent = '✦';
        s.style.top              = `${8 + Math.random() * 75}%`;
        s.style.left             = `${4 + Math.random() * 90}%`;
        s.style.animationDelay   = `${(Math.random() * 0.5).toFixed(2)}s`;
        s.style.fontSize         = `${(0.6 + Math.random() * 0.7).toFixed(2)}rem`;
        wrap.appendChild(s);
      }
      setTimeout(() => wrap.remove(), 1600);
    },
  };

  /* criticalChoiceDim(active) — dim+pulse the scene during high-stakes choices */
  function criticalChoiceDim(active) {
    if (!_screen) init();
    _screen.classList.toggle('critical-choice-active', active);
  }

  return { init, horror, cute, criticalChoiceDim };
})();


/* ── VoiceSystem ─────────────────────────────────────────────────────────── */

const VoiceSystem = (() => {
  let _current = null;

  /* play(character, sceneId, lineId)
     Looks for assets/audio/{character}/{sceneId}_{lineId}.mp3
     Silently fails if the file doesn't exist. */
  function play(character, sceneId, lineId) {
    stop();
    const src = `assets/audio/${character}/${sceneId}_${lineId}.mp3`;
    try {
      const audio = new Audio(src);
      audio.volume = 0.85;
      audio.play().catch(() => { /* file missing — silent fail */ });
      _current = audio;
    } catch {
      // Audio API unavailable
    }
  }

  function stop() {
    if (_current) {
      try { _current.pause(); _current.currentTime = 0; }
      catch { /* ignore */ }
      _current = null;
    }
  }

  return { play, stop };
})();
