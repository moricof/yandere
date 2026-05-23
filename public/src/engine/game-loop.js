// Main game loop — drives all real-time systems via requestAnimationFrame
import { state } from '../state.js';
import { BattleEngine } from './battle.js';
import { FloatingText } from '../ui/floating-text.js';
import { HUD } from '../ui/hud.js';

const MAX_DELTA = 0.5; // cap at 500ms to prevent spiral of death on tab regain

let rafId = null;
let lastTimestamp = null;
let localSaveTimer = 0;
let cloudSaveTimer = 0;

export const GameLoop = {
  start() {
    if (rafId !== null) return;
    lastTimestamp = performance.now();
    rafId = requestAnimationFrame(tick);
  },

  stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  },

  get isRunning() { return rafId !== null; },
};

function tick(timestamp) {
  const delta = Math.min((timestamp - lastTimestamp) / 1000, MAX_DELTA);
  lastTimestamp = timestamp;

  if (!state.ui.isLoading) {
    BattleEngine.tick(delta);
    FloatingText.update(delta);
    HUD.render();
    scheduleSaves(delta);
  }

  rafId = requestAnimationFrame(tick);
}

function scheduleSaves(delta) {
  const ms = delta * 1000;

  localSaveTimer += ms;
  cloudSaveTimer += ms;

  if (localSaveTimer >= 30_000) {
    localSaveTimer = 0;
    import('../systems/save.js').then(({ SaveSystem }) => SaveSystem.saveLocal());
  }

  if (cloudSaveTimer >= 300_000) {
    cloudSaveTimer = 0;
    import('../systems/save.js').then(({ SaveSystem }) => SaveSystem.saveCloud());
  }
}
