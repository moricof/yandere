// Combo multiplier display — driven by BattleEngine on rapid taps
// Manages counter text, tier class, hit-pulse animation, and decay bar.

let _el, _countEl, _multEl, _barEl;
let _decayFrame = null;
let _decayStart = 0;
let _decayMs    = 0;

function _refs() {
  _el      = _el      ?? document.getElementById('combo-display');
  _countEl = _countEl ?? document.getElementById('combo-count');
  _multEl  = _multEl  ?? document.getElementById('combo-mult');
  _barEl   = _barEl   ?? document.getElementById('combo-decay-bar');
}

function _tickDecay(now = performance.now()) {
  const pct = Math.max(0, 1 - (now - _decayStart) / _decayMs);
  if (_barEl) _barEl.style.transform = `scaleX(${pct})`;
  if (pct > 0) _decayFrame = requestAnimationFrame(_tickDecay);
}

function _tierClass(mult) {
  if (mult >= 3.0) return 'tier-max';
  if (mult >= 2.5) return 'tier-4';
  if (mult >= 2.0) return 'tier-3';
  if (mult >= 1.5) return 'tier-2';
  return 'tier-1';
}

export const ComboDisplay = {
  update(count, mult, windowMs) {
    _refs();
    if (!_el) return;

    _countEl.textContent = count;
    _multEl.textContent  = mult > 1 ? `×${mult.toFixed(1)} DMG` : '';

    // Reset class list to new tier (removes hidden, combo-fade, old tier, combo-hit)
    _el.className = `combo-display ${_tierClass(mult)}`;

    // Trigger hit-pulse animation
    void _el.offsetWidth;
    _el.classList.add('combo-hit');

    // Restart decay bar
    cancelAnimationFrame(_decayFrame);
    _decayStart = performance.now();
    _decayMs    = windowMs;
    _tickDecay();
  },

  hide() {
    _refs();
    if (!_el || _el.classList.contains('hidden')) return;
    cancelAnimationFrame(_decayFrame);
    _el.classList.add('combo-fade');
    setTimeout(() => {
      if (_el) {
        _el.classList.add('hidden');
        _el.classList.remove('combo-fade');
      }
    }, 380);
  },
};
