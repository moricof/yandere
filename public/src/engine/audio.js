// Synthesized sound effects via Web Audio API — zero audio files required.
// All sounds are generated procedurally from oscillators + noise buffers.
import { state } from '../state.js';

// Lazy AudioContext + compressor master bus
let _ac          = null;   // AudioContext
let _masterGain  = null;   // gain node for volume control
let _bus         = null;   // destination node (masterGain → compressor → ctx.destination)

function _init() {
  if (_ac) return;
  try {
    _ac  = new (window.AudioContext || window.webkitAudioContext)();
    const comp          = _ac.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value      = 8;
    comp.ratio.value     = 4;
    comp.attack.value    = 0.002;
    comp.release.value   = 0.08;
    comp.connect(_ac.destination);

    _masterGain = _ac.createGain();
    _masterGain.gain.value = state.settings.volume ?? 0.8;
    _masterGain.connect(comp);

    _bus = _masterGain; // all sound sources connect to _bus
  } catch {
    _bus = null;
  }
}

// Must be called from inside a user-gesture handler to satisfy autoplay policy.
function _resume() {
  if (_ac?.state === 'suspended') _ac.resume().catch(() => {});
}

// ─── Tier milestone combo counts ─────────────────────────────────────────────
const MILESTONE_COMBOS = new Set([5, 10, 20, 30]);

// ─── Public API ──────────────────────────────────────────────────────────────
export const AudioEngine = {
  /**
   * Sets master volume. Safe to call before AudioContext is initialized.
   * @param {number} v  0.0 – 1.0
   */
  setVolume(v) {
    state.settings.volume = v;
    if (_masterGain && _ac) {
      _masterGain.gain.setTargetAtTime(v, _ac.currentTime, 0.01);
    }
  },

  /**
   * Call once per tap from a user-gesture handler.
   * @param {number} comboCount   current combo hit count (1, 2, 3, …)
   * @param {number} comboMult    current multiplier (1.0 – 3.0)
   */
  playHit(comboCount, comboMult) {
    if (!state.settings.soundEnabled) return;
    _init();
    _resume();
    if (!_ac || !_bus) return;

    try {
      _hit(comboMult);
      if (MILESTONE_COMBOS.has(comboCount)) {
        // Tiny delay so the hit transient lands first
        setTimeout(() => {
          if (state.settings.soundEnabled) _milestone(comboMult);
        }, 35);
      }
    } catch {
      // Web Audio may be blocked in some environments — fail silently
    }
  },
};

// ─── Hit sound ────────────────────────────────────────────────────────────────
// A sharp impact: short noise click + pitched tone that sweeps down.
// Pitch and brightness both scale with the combo multiplier so the sound
// noticeably "levels up" at each tier boundary.
function _hit(mult) {
  const t = _ac.currentTime;

  // Base frequency scales from 200 Hz (1×) → 440 Hz (3×)
  const baseFreq = 200 + (mult - 1) * 120;
  // Tiny random detune so rapid taps don't sound robotic
  const detune   = 0.96 + Math.random() * 0.08;

  // ── Tonal punch (triangle → swept low-pass) ───────────────────────────────
  const osc  = _ac.createOscillator();
  osc.type   = 'triangle';
  osc.frequency.setValueAtTime(baseFreq * 2.2 * detune, t);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.55, t + 0.07);

  const filt = _ac.createBiquadFilter();
  filt.type  = 'lowpass';
  filt.frequency.setValueAtTime(3000 + mult * 600, t);
  filt.frequency.exponentialRampToValueAtTime(500, t + 0.08);
  filt.Q.value = 1.2;

  const gainT = _ac.createGain();
  gainT.gain.setValueAtTime(0.22, t);
  gainT.gain.exponentialRampToValueAtTime(0.001, t + 0.10);

  osc.connect(filt);
  filt.connect(gainT);
  gainT.connect(_bus);
  osc.start(t);
  osc.stop(t + 0.12);

  // ── Noise transient (impact click at the very start) ──────────────────────
  const samples = Math.floor(_ac.sampleRate * 0.022);
  const buf     = _ac.createBuffer(1, samples, _ac.sampleRate);
  const d       = buf.getChannelData(0);
  for (let i = 0; i < samples; i++) {
    d[i] = (Math.random() * 2 - 1) * (1 - i / samples); // decaying white noise
  }

  const nSrc    = _ac.createBufferSource();
  nSrc.buffer   = buf;

  const nFilt   = _ac.createBiquadFilter();
  nFilt.type    = 'bandpass';
  nFilt.frequency.value = 1200 + mult * 350;
  nFilt.Q.value = 1.8;

  const gainN   = _ac.createGain();
  gainN.gain.setValueAtTime(0.30, t);
  gainN.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

  nSrc.connect(nFilt);
  nFilt.connect(gainN);
  gainN.connect(_bus);
  nSrc.start(t);
  nSrc.stop(t + 0.025);
}

// ─── Milestone chime ─────────────────────────────────────────────────────────
// A quick ascending sine-wave arpeggio played when crossing a combo tier.
// More notes and higher range at higher tiers.
const _CHIMES = {
  1.5: [392, 523],           // ×1.5 — G4 C5       (a fourth)
  2.0: [440, 659, 880],      // ×2.0 — A4 E5 A5     (octave + fifth)
  2.5: [523, 784, 1047],     // ×2.5 — C5 G5 C6     (power chord up)
  3.0: [523, 659, 784, 1047],// ×3.0 — C5 E5 G5 C6  (major chord)
};

function _milestone(mult) {
  const notes = _CHIMES[mult] ?? _CHIMES[1.5];
  const t     = _ac.currentTime;

  notes.forEach((freq, i) => {
    const delay = i * 0.042;   // stagger each note by 42 ms

    const osc   = _ac.createOscillator();
    osc.type    = 'sine';
    osc.frequency.value = freq;

    const gain  = _ac.createGain();
    gain.gain.setValueAtTime(0, t + delay);
    gain.gain.linearRampToValueAtTime(0.14, t + delay + 0.010);
    gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.20);

    osc.connect(gain);
    gain.connect(_bus);
    osc.start(t + delay);
    osc.stop(t + delay + 0.22);
  });
}
