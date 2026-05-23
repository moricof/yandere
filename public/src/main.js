// Goddess Rebirth: Idle Oaths — Application entry point
// Orchestrates boot sequence and all subsystem initialization

import { state, mergeState } from './state.js';
import { CONFIG } from './config.js';
import { Storage } from './utils/storage.js';
import { API } from './utils/api.js';
import { templateEngine } from './data/template-engine.js';
import { GameLoop } from './engine/game-loop.js';
import { SaveSystem } from './systems/save.js';
import { OfflineSystem } from './systems/offline.js';
import { HUD } from './ui/hud.js';
import { BattleScreen } from './ui/battle-screen.js';
import { GachaScreen } from './ui/gacha-screen.js';
import { MaidensScreen } from './ui/maidens-screen.js';
import { Modals } from './ui/modals.js';

async function boot() {
  setLoadingText('Initializing the realm...');
  setLoadingProgress(10);

  // ── Steps 1 & 3 in parallel: auth + asset sync (both hit the network) ─────
  setLoadingText('Awakening the Goddesses...');
  await Promise.all([
    ensureAuth(),
    templateEngine.syncFromServer(),
  ]);
  setLoadingProgress(40);

  // ── Step 2: Load save (needs auth token from step 1) ──────────────────────
  setLoadingText('Restoring your progress...');
  await SaveSystem.load();
  setLoadingProgress(70);

  // ── Step 4: Calculate offline earnings ────────────────────────────────────
  OfflineSystem.calculate();
  setLoadingProgress(85);

  // ── Step 5: Init UI ───────────────────────────────────────────────────────
  setLoadingText('Preparing the battlefield...');
  HUD.init();
  BattleScreen.init();
  GachaScreen.init();
  MaidensScreen.init();
  setLoadingProgress(95);

  // ── Step 6: Show game ──────────────────────────────────────────────────────
  state.ui.isLoading = false;
  document.getElementById('loading-screen')?.classList.add('hidden');
  document.getElementById('game-screen')?.classList.remove('hidden');

  setLoadingProgress(100);

  // ── Step 7: Start game loop ────────────────────────────────────────────────
  GameLoop.start();

  // ── Step 8: Show offline modal if applicable ──────────────────────────────
  if (OfflineSystem.hasPendingGold) {
    setTimeout(() => Modals.showOfflineEarnings(), 600);
  }

  // ── Unload: force save ─────────────────────────────────────────────────────
  window.addEventListener('pagehide', () => SaveSystem.forceSave());
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') SaveSystem.saveLocal();
  });

  // ── Online/Offline status ──────────────────────────────────────────────────
  window.addEventListener('online', () => {
    state.session.isOnline = true;
    SaveSystem.saveCloud();
  });
  window.addEventListener('offline', () => {
    state.session.isOnline = false;
    Modals.showToast('You are offline. Progress is saved locally.', 'warning');
  });

  // ── Register Service Worker ────────────────────────────────────────────────
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

async function ensureAuth() {
  let token = Storage.get('auth_token');
  let userId = Storage.get('user_id');

  if (token && userId) {
    state.session.token = token;
    state.session.userId = userId;

    // Refresh token if online
    if (navigator.onLine) {
      try {
        const { token: newToken } = await API.refreshToken();
        Storage.set('auth_token', newToken);
        state.session.token = newToken;
      } catch {
        // Token still valid locally, continue
      }
    }
    return;
  }

  // New user — register anonymous account
  if (navigator.onLine) {
    try {
      const { userId: id, token: tok } = await API.register();
      Storage.set('auth_token', tok);
      Storage.set('user_id', id);
      state.session.token = tok;
      state.session.userId = id;
    } catch {
      // Backend unavailable — generate local-only UUID, sync later
      const localId = crypto.randomUUID();
      Storage.set('user_id', localId);
      state.session.userId = localId;
    }
  } else {
    // Fully offline new user — use local UUID
    const localId = Storage.get('user_id') ?? crypto.randomUUID();
    Storage.set('user_id', localId);
    state.session.userId = localId;
  }
}

function setLoadingText(msg) {
  const el = document.getElementById('loading-text');
  if (el) el.textContent = msg;
}

function setLoadingProgress(pct) {
  const el = document.getElementById('loading-bar');
  if (el) el.style.width = pct + '%';
}

// Start
boot().catch(err => {
  console.error('[Boot failed]', err);
  // Best-effort offline recovery
  state.ui.isLoading = false;
  document.getElementById('loading-screen')?.classList.add('hidden');
  document.getElementById('game-screen')?.classList.remove('hidden');
  GameLoop.start();
});
