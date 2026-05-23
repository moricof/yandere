// Character management — level-up, ascension, DPS display
import { state } from '../state.js';
import { CHARACTERS } from '../data/characters.js';
import { CONFIG } from '../config.js';
import { Modals } from '../ui/modals.js';
import { fmt } from '../engine/numbers.js';

export const CharacterSystem = {
  /** Cost in gold to level up a character from its current level. */
  levelUpCost(charId) {
    const level = state.characters[charId]?.level ?? 1;
    return Math.floor(CONFIG.CHAR_LEVEL_BASE_COST * Math.pow(CONFIG.CHAR_LEVEL_SCALE, level - 1));
  },

  /** Whether the player can afford to level up this character. */
  canLevelUp(charId) {
    const charState = state.characters[charId];
    if (!charState?.unlocked) return false;
    const def = CHARACTERS[charId];
    if (!def) return false;
    const level = charState.level ?? 1;
    if (level >= CONFIG.CHAR_MAX_LEVEL) return false;
    return state.resources.gold >= this.levelUpCost(charId);
  },

  /** Level up a character, deducting the gold cost. */
  levelUp(charId) {
    if (!this.canLevelUp(charId)) {
      Modals.showToast('Not enough gold or max level reached', 'warning');
      return false;
    }

    const cost = this.levelUpCost(charId);
    state.resources.gold -= cost;
    state.characters[charId].level = (state.characters[charId].level ?? 1) + 1;
    return true;
  },

  /** Returns effective DPS for a character (used in maiden card display). */
  effectiveDps(charId) {
    const charState = state.characters[charId];
    const def = CHARACTERS[charId];
    if (!def || !charState?.unlocked) return 0;

    const level = charState.level ?? 1;
    const shards = charState.ascensionShards ?? 0;
    const levelBonus = 1 + (level - 1) * CONFIG.CHAR_DPS_PER_LEVEL;
    const shardBonus = 1 + shards * CONFIG.SHARD_BONUS_PER_SHARD;
    return def.baseDps * levelBonus * shardBonus;
  },

  /** Returns all unlocked characters sorted by rarity then DPS. */
  getUnlocked() {
    const order = { SSR: 0, SR: 1, R: 2 };
    return Object.entries(state.characters)
      .filter(([, cs]) => cs.unlocked)
      .map(([id]) => ({ ...CHARACTERS[id], state: state.characters[id] }))
      .filter(c => c.id)
      .sort((a, b) => (order[a.rarity] - order[b.rarity]) || (this.effectiveDps(b.id) - this.effectiveDps(a.id)));
  },
};
