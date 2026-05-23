// Gacha system — handles pull requests, updates state, triggers UI
import { state } from '../state.js';
import { API } from '../utils/api.js';
import { CONFIG } from '../config.js';
import { Modals } from '../ui/modals.js';

export const GachaSystem = {
  get canPull1x() { return state.resources.mana >= CONFIG.PULL_COST_1 && navigator.onLine; },
  get canPull10x() { return state.resources.mana >= CONFIG.PULL_COST_10 && navigator.onLine; },

  /**
   * Executes a gacha pull via the server API (authoritative RNG).
   * @param {1|10} count
   */
  async pull(count) {
    if (!navigator.onLine) {
      Modals.showToast('No internet connection. Summoning requires a network.', 'warning');
      return;
    }

    const cost = count === 10 ? CONFIG.PULL_COST_10 : CONFIG.PULL_COST_1;
    if (state.resources.mana < cost) {
      Modals.showToast(`Need ${cost} Mana to summon (you have ${Math.floor(state.resources.mana)})`, 'warning');
      return;
    }

    // Optimistic deduct (server is authoritative — will correct on response)
    state.resources.mana -= cost;

    // Show pulling animation
    state.ui.modalOpen = 'pulling';
    Modals.showPulling(count);

    try {
      const { results, pityCounter, newMana } = await API.pull(count);

      // Authoritative resource update from server
      state.resources.mana = newMana;
      state.gacha.pityCounter = pityCounter;
      state.stats.totalPulls = (state.stats.totalPulls ?? 0) + count;

      // Sync character state from results
      for (const r of results) {
        if (!state.characters[r.characterId]) {
          state.characters[r.characterId] = { level: 1, ascensionShards: 0, unlocked: !r.isDuplicate };
        }
        if (r.isDuplicate) {
          state.characters[r.characterId].ascensionShards =
            (state.characters[r.characterId].ascensionShards ?? 0) + r.shardsGained;
        } else {
          state.characters[r.characterId].unlocked = true;
        }
      }

      // Add to recent history (keep last 20)
      state.gacha.recentPulls = [...results, ...state.gacha.recentPulls].slice(0, 20);

      // Show result modal
      state.gacha.pendingResults = results;
      Modals.showGachaResult(results);

    } catch (err) {
      // Refund the optimistic deduct
      state.resources.mana += cost;
      state.ui.modalOpen = null;
      Modals.closeAll();
      Modals.showToast(`Summon failed: ${err.message}`, 'error');
    }
  },
};
