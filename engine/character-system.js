'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   engine/character-system.js — 2D Layered Character System
   Renders characters as stacked PNG layers to simulate Live2D-style motion.
   Three modes — auto-detected per character:
     layered     base/eyes/overlay PNGs exist  → full layer stack + blink + float
     flat        flat expression PNGs exist    → single sprite + float
     placeholder no art at all                → styled kanji card
   ═══════════════════════════════════════════════════════════════════════════ */


/* ── Image Cache ─────────────────────────────────────────────────────────── */

const ImageCache = (() => {
  const _map = new Map();

  function load(src) {
    if (_map.has(src)) return _map.get(src);
    const p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error(`404: ${src}`));
      img.src = src;
    });
    _map.set(src, p);
    return p;
  }

  function preload(srcs) {
    return Promise.allSettled(srcs.map(load));
  }

  return { load, preload };
})();


/* ── Character config loader ─────────────────────────────────────────────── */

let _charConfig = null;

async function loadCharacterConfig() {
  if (_charConfig) return _charConfig;
  try {
    const r = await fetch('data/characters.json');
    if (!r.ok) throw new Error('not found');
    _charConfig = await r.json();
  } catch {
    _charConfig = {};
  }
  return _charConfig;
}


/* ── CharacterInstance ───────────────────────────────────────────────────── */

class CharacterInstance {
  constructor(characterId, heroineData, charData) {
    this.id           = characterId;
    this.heroineData  = heroineData;
    this.charData     = charData;
    this.config       = null;
    this.mode         = 'pending';
    this.container    = null;  // .char-container  — position only
    this._animWrap    = null;  // .char-anim-wrap   — all transform animations
    this.layers       = {};    // { body, eyes, overlays[], overlaysWrap, flat }
    this.currentExpr  = 'default';
    this.position     = 'center';
    this._blinkTimer  = null;
    this._mounted     = false;
  }

  /* ── Mount ──────────────────────────────────────────────────────────── */

  async mount(parent, expression, position) {
    this.position    = position || 'center';
    this.currentExpr = expression || 'default';

    // Outer container — handles position, dim filter
    const el = document.createElement('div');
    el.className    = `char-container pos-${this.position}`;
    el.dataset.char = this.id;
    this.container  = el;
    parent.appendChild(el);

    // Inner anim-wrap — handles all CSS transform animations (float, react, enter/exit)
    const aw = document.createElement('div');
    aw.className  = 'char-anim-wrap';
    this._animWrap = aw;
    el.appendChild(aw);

    // Detect mode: try layered → flat → placeholder
    const config = await loadCharacterConfig();
    this.config   = config[this.id] || null;

    const baseLayerPath = `assets/characters/${this.id}/base/body_default.png`;
    const flatPath = this.charData
      ? (this.charData.expressions[this.currentExpr] || this.charData.expressions['default'])
      : null;

    let mountedOk = false;
    try {
      await ImageCache.load(baseLayerPath);
      this.mode = 'layered';
      this._mountLayered();
      mountedOk = true;
    } catch { /* fall through */ }

    if (!mountedOk && flatPath) {
      try {
        await ImageCache.load(flatPath);
        this.mode = 'flat';
        this._mountFlat(flatPath);
        mountedOk = true;
      } catch { /* fall through */ }
    }

    if (!mountedOk) {
      this.mode = 'placeholder';
      this._mountPlaceholder();
    }

    this._mounted = true;
    this._playEnter();
  }

  _playEnter() {
    const aw = this._animWrap;
    let done = false;
    const startIdle = () => {
      if (done) return;
      done = true;
      aw.classList.remove('char-enter');
      this._startIdleFloat();
      if (this.mode === 'layered') this._startAutoBlink();
    };
    aw.classList.add('char-enter');
    aw.addEventListener('animationend', startIdle, { once: true });
    setTimeout(startIdle, 600); // fallback if animationend never fires
  }

  /* ── Layered mount ──────────────────────────────────────────────────── */

  _mountLayered() {
    const aw = this._animWrap;
    aw.classList.add('char-layered');

    const wrap = document.createElement('div');
    wrap.className = 'char-layers';
    aw.appendChild(wrap);

    const bodyImg = document.createElement('img');
    bodyImg.className = 'char-layer char-layer-body';
    bodyImg.alt = '';
    wrap.appendChild(bodyImg);

    const eyesImg = document.createElement('img');
    eyesImg.className = 'char-layer char-layer-eyes';
    eyesImg.alt = '';
    wrap.appendChild(eyesImg);

    this.layers.body         = bodyImg;
    this.layers.eyes         = eyesImg;
    this.layers.overlaysWrap = wrap;
    this.layers.overlays     = [];

    this._applyLayerExpression(this.currentExpr);
  }

  /* ── Flat mount ─────────────────────────────────────────────────────── */

  _mountFlat(src) {
    const aw = this._animWrap;
    aw.classList.add('char-flat');

    const img = document.createElement('img');
    img.className = 'char-sprite-flat';
    img.alt       = this.charData?.name || this.id;
    img.src       = src;
    aw.appendChild(img);
    this.layers.flat = img;
  }

  /* ── Placeholder mount ──────────────────────────────────────────────── */

  _mountPlaceholder() {
    const aw = this._animWrap;
    aw.classList.add('char-placeholder-wrap');

    const h = this.heroineData;
    if (h) {
      aw.style.background = h.colorGrad;
      aw.innerHTML += `
        <span class="placeholder-kanji">${h.kanji}</span>
        <span class="placeholder-name">${this.charData?.name || this.id}</span>
      `;
    } else {
      aw.innerHTML += `<span class="placeholder-name">${this.charData?.name || this.id}</span>`;
    }
  }

  /* ── Expression ─────────────────────────────────────────────────────── */

  setExpression(expression) {
    this.currentExpr = expression;
    if (!this._mounted) return;
    if (this.mode === 'layered') this._applyLayerExpression(expression);
    else if (this.mode === 'flat') this._applyFlatExpression(expression);
  }

  _applyLayerExpression(expression) {
    const exprCfg = this.config?.expressions?.[expression]
                 || this.config?.expressions?.['default']
                 || {};
    const bodyFile = exprCfg.body || 'body_default';
    const eyesFile = exprCfg.eyes || 'eyes_default';
    this._swapLayer(this.layers.body, `assets/characters/${this.id}/base/${bodyFile}.png`);
    this._swapLayer(this.layers.eyes, `assets/characters/${this.id}/eyes/${eyesFile}.png`);
  }

  _applyFlatExpression(expression) {
    if (!this.charData || !this.layers.flat) return;
    const src = this.charData.expressions[expression] || this.charData.expressions['default'];
    if (src) this._swapLayer(this.layers.flat, src);
  }

  _swapLayer(imgEl, src) {
    if (!imgEl) return;
    // Normalize: strip leading ./ and query strings for comparison
    const current = imgEl.src.split('/').slice(-2).join('/');
    const next    = src.split('/').slice(-2).join('/');
    if (current === next && imgEl.src !== '') return;
    imgEl.style.opacity = '0';
    ImageCache.load(src).then(() => {
      imgEl.src           = src;
      imgEl.style.opacity = '1';
    }).catch(() => {
      // missing layer — stay transparent
    });
  }

  /* ── Body variant ───────────────────────────────────────────────────── */

  setBody(bodyFile) {
    if (this.mode !== 'layered' || !this.layers.body) return;
    this._swapLayer(this.layers.body, `assets/characters/${this.id}/base/${bodyFile}.png`);
  }

  /* ── Overlays ───────────────────────────────────────────────────────── */

  addOverlay(overlayFile) {
    if (this.mode !== 'layered') return;
    if (this.layers.overlays.find(o => o.dataset.file === overlayFile)) return;
    const img = document.createElement('img');
    img.className    = 'char-layer char-layer-overlay';
    img.alt          = '';
    img.dataset.file = overlayFile;
    img.src          = `assets/characters/${this.id}/overlays/${overlayFile}.png`;
    this.layers.overlaysWrap.appendChild(img);
    this.layers.overlays.push(img);
  }

  removeOverlay(overlayFile) {
    if (this.mode !== 'layered') return;
    const idx = this.layers.overlays.findIndex(o => o.dataset.file === overlayFile);
    if (idx === -1) return;
    const img = this.layers.overlays.splice(idx, 1)[0];
    img.style.opacity = '0';
    setTimeout(() => img.remove(), 200);
  }

  /* ── Micro-reactions ────────────────────────────────────────────────── */

  react(type) {
    const target = this._animWrap;
    if (!target) return;
    const cls = { shake: 'react-shake', bounce: 'react-bounce', zoom: 'react-zoom' }[type];
    if (!cls) return;
    target.classList.remove('react-shake', 'react-bounce', 'react-zoom');
    void target.offsetWidth; // force reflow to restart animation
    target.classList.add(cls);
    target.addEventListener('animationend', () => target.classList.remove(cls), { once: true });
  }

  /* ── Dim ────────────────────────────────────────────────────────────── */

  setDim(isDim) {
    this.container?.classList.toggle('char-dim', isDim);
  }

  /* ── Idle float ─────────────────────────────────────────────────────── */

  _startIdleFloat() {
    this._animWrap?.classList.add('char-floating');
  }

  /* ── Auto-blink ─────────────────────────────────────────────────────── */

  _startAutoBlink() {
    if (!this.layers.eyes) return;
    const self = this;
    const schedule = () => {
      const delay = 3000 + Math.random() * 4000;
      self._blinkTimer = setTimeout(() => {
        if (!self._mounted || !self.layers.eyes) return;
        const eyes    = self.layers.eyes;
        const prevSrc = eyes.src;
        const closed  = `assets/characters/${self.id}/eyes/eyes_closed.png`;
        ImageCache.load(closed).then(() => {
          eyes.src = closed;
          const dur = 150 + Math.random() * 80;
          setTimeout(() => {
            if (!self._mounted) return;
            eyes.src = prevSrc;
            schedule();
          }, dur);
        }).catch(() => schedule()); // no closed sprite — skip
      }, delay);
    };
    schedule();
  }

  /* ── Destroy ────────────────────────────────────────────────────────── */

  destroy() {
    this._mounted = false;
    if (this._blinkTimer) clearTimeout(this._blinkTimer);
    const aw = this._animWrap;
    const el = this.container;
    if (!el) return;
    if (aw) {
      aw.classList.remove('char-floating', 'char-enter');
      aw.classList.add('char-exit');
    }
    const remove = () => { if (el.parentNode) el.remove(); };
    if (aw) {
      aw.addEventListener('animationend', remove, { once: true });
    }
    setTimeout(remove, 500); // fallback
  }
}


/* ── CharacterSystem — public API ────────────────────────────────────────── */

const CharacterSystem = (() => {
  const _instances = {};
  let _container   = null;

  function init() {
    _container = document.getElementById('character-layer');
  }

  async function show(characterId, expression, position) {
    if (!_container) init();

    const charData    = (typeof CHARACTERS   !== 'undefined') ? CHARACTERS[characterId]   : null;
    const heroineData = (typeof HEROINE_DATA !== 'undefined') ? HEROINE_DATA[characterId] : null;

    if (!charData && !heroineData) {
      console.warn(`[CharacterSystem] Unknown character: "${characterId}"`);
      return;
    }

    const pos = position || charData?.defaultPosition || 'center';

    if (_instances[characterId]) {
      _instances[characterId].setExpression(expression || 'default');
    } else {
      const inst = new CharacterInstance(characterId, heroineData, charData);
      _instances[characterId] = inst;
      await inst.mount(_container, expression || 'default', pos);
    }

    _dimAll(characterId);
  }

  function clearAll() {
    Object.values(_instances).forEach(inst => inst.destroy());
    for (const k in _instances) delete _instances[k];
    // Safety: clear any leftover DOM from old flat-sprite system
    if (_container) {
      Array.from(_container.querySelectorAll('.char-sprite, .char-placeholder'))
        .forEach(el => el.remove());
    }
  }

  function setExpression(characterId, expression) {
    _instances[characterId]?.setExpression(expression);
  }

  function setBody(characterId, bodyFile) {
    _instances[characterId]?.setBody(bodyFile);
  }

  function addOverlay(characterId, overlayFile) {
    _instances[characterId]?.addOverlay(overlayFile);
  }

  function removeOverlay(characterId, overlayFile) {
    _instances[characterId]?.removeOverlay(overlayFile);
  }

  function react(characterId, type) {
    _instances[characterId]?.react(type);
  }

  function preload(characterId) {
    const charData = (typeof CHARACTERS !== 'undefined') ? CHARACTERS[characterId] : null;
    if (!charData) return;
    ImageCache.preload(Object.values(charData.expressions || {}));
  }

  function _dimAll(activeId) {
    for (const [id, inst] of Object.entries(_instances)) {
      inst.setDim(id !== activeId);
    }
  }

  /* Proxy so EngineState.activeSprites[id] still returns the container element,
     preserving backward compat with any code that checks for sprite existence. */
  const activeSprites = new Proxy({}, {
    get(_, id)    { return _instances[id]?.container ?? null; },
    set()         { return true; }, // ignore external writes
    deleteProperty() { return true; },
    ownKeys()     { return Object.keys(_instances); },
    has(_, id)    { return id in _instances; },
    getOwnPropertyDescriptor(_, id) {
      if (!(id in _instances)) return undefined;
      return { value: _instances[id].container, enumerable: true, configurable: true, writable: false };
    },
  });

  return { init, show, clearAll, setExpression, setBody, addOverlay, removeOverlay, react, preload, activeSprites };
})();
