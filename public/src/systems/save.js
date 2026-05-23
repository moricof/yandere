// Save system — local (localStorage) and cloud (Cloudflare Workers D1)
import { state, mergeState, serializeState } from '../state.js';
import { Storage } from '../utils/storage.js';
import { API } from '../utils/api.js';

let isSavingCloud = false;

export const SaveSystem = {
  /**
   * Load sequence on startup:
   * 1. Try localStorage (instant, offline-safe)
   * 2. Try cloud save (if online and newer)
   * 3. Apply offline earnings
   */
  async load() {
    const local = Storage.get('game_state');
    if (local) {
      mergeState(local);
    }

    if (navigator.onLine && state.session.token) {
      try {
        const { state: cloudState, updatedAt } = await API.loadState();
        const localTime = local?.offline?.lastSaveTime ?? 0;

        // Use cloud save if it's newer than local
        if (updatedAt * 1000 > localTime) {
          mergeState(cloudState);
          Storage.set('game_state', serializeState());
        }
      } catch {
        // Cloud unavailable — local save is good enough
      }
    }

    // Load gacha history for display
    if (navigator.onLine && state.session.token) {
      try {
        const { history } = await API.loadHistory();
        state.gacha.recentPulls = history ?? [];
      } catch {}
    }
  },

  /** Persist to localStorage immediately. */
  saveLocal() {
    Storage.set('game_state', serializeState());
  },

  /** Persist to Cloudflare D1 (throttled — don't call every frame). */
  async saveCloud() {
    if (isSavingCloud || !navigator.onLine || !state.session.token) return;
    isSavingCloud = true;
    try {
      await API.saveState(serializeState());
    } catch {
      // Silently fail — local save is the backup
    } finally {
      isSavingCloud = false;
    }
  },

  /** Force immediate cloud save (e.g. on page unload). */
  async forceSave() {
    this.saveLocal();
    await this.saveCloud();
  },

  /** Wipe all data (reset button). */
  reset() {
    Storage.clear();
    location.reload();
  },
};
