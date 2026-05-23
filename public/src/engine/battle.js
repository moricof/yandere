// Core battle engine — handles DPS calculation, damage application, tap input
import { state } from '../state.js';
import { CONFIG } from '../config.js';
import { CHARACTERS } from '../data/characters.js';
import { upgradeMultiplier } from '../data/upgrades.js';
import { FloatingText } from '../ui/floating-text.js';
import { ComboDisplay } from '../ui/combo-display.js';
import { AudioEngine } from './audio.js';
import { fmt } from './numbers.js';

// ─── Combo state (session-only, not persisted) ───────────────────────────────
let _combo      = 0;
let _comboTimer = null;
const COMBO_WINDOW_MS = 1500;

function _comboMultiplier(n) {
  if (n >= 30) return 3.0;
  if (n >= 20) return 2.5;
  if (n >= 10) return 2.0;
  if (n >=  5) return 1.5;
  if (n >=  2) return 1.2;
  return 1.0;
}

function _resetCombo() {
  _combo = 0;
  ComboDisplay.hide();
}

export const BattleEngine = {
  /**
   * Called every frame from GameLoop.
   * @param {number} delta - seconds since last frame (capped at 0.5s)
   */
  tick(delta) {
    if (state.battle.isPaused || state.ui.modalOpen) return;

    // Boss timer countdown
    if (state.battle.isBossActive) {
      state.battle.bossTimeLeft -= delta;
      if (state.battle.bossTimeLeft <= 0) {
        this.onBossEscaped();
        return;
      }
    }

    // Apply auto DPS
    const dps = this.calculateAutoDps();
    if (dps > 0) {
      this.applyDamage(dps * delta);
    }
  },

  /**
   * Handles a tap/click on the battle zone.
   * @param {number} clientX - page X for floating text position
   * @param {number} clientY - page Y for floating text position
   */
  handleTap(clientX, clientY) {
    if (state.ui.modalOpen || state.battle.isPaused) return;

    // Advance combo
    _combo++;
    clearTimeout(_comboTimer);
    _comboTimer = setTimeout(_resetCombo, COMBO_WINDOW_MS);

    const mult    = _comboMultiplier(_combo);
    const baseDmg = this.calculateTapDamage();
    const dmg     = Math.ceil(baseDmg * mult);

    this.applyDamage(dmg);
    state.stats.totalDamageDealt += dmg;

    // Sound — must be called from within the user-gesture callstack
    AudioEngine.playHit(_combo, mult);

    // Update combo UI (show from 2nd hit onward)
    if (_combo >= 2) ComboDisplay.update(_combo, mult, COMBO_WINDOW_MS);

    // Floating damage text — upgrade to 'boss' style at ×2.0+ for extra punch
    const zone = document.getElementById('battle-zone');
    if (zone) {
      const rect = zone.getBoundingClientRect();
      FloatingText.spawn(fmt(dmg), clientX - rect.left, clientY - rect.top - 20,
        mult >= 2.0 ? 'boss' : 'tap');
    }
  },

  /**
   * Returns current total auto DPS from all unlocked characters + upgrades.
   */
  calculateAutoDps() {
    let dps = 0;
    const ampMultiplier = upgradeMultiplier('auto_dps_amp', state.upgrades.auto_dps_amp ?? 0);
    const shardMult = 1 + (this._getShardBonusMultiplier());

    for (const [charId, charState] of Object.entries(state.characters)) {
      if (!charState.unlocked) continue;
      const charDef = CHARACTERS[charId];
      if (!charDef) continue;

      const level = charState.level ?? 1;
      const shards = charState.ascensionShards ?? 0;
      const levelBonus = 1 + (level - 1) * CONFIG.CHAR_DPS_PER_LEVEL;
      const shardBonus = 1 + shards * CONFIG.SHARD_BONUS_PER_SHARD * shardMult;
      const globalDpsBonus = charDef.passiveBonus?.type === 'autoDpsMultiplier'
        ? 1 + charDef.passiveBonus.value : 1;

      // Passive bonus from other SSRs stacks
      dps += charDef.baseDps * levelBonus * shardBonus * ampMultiplier * globalDpsBonus;
    }

    // Apply passive bonuses from maidens that boost global auto DPS
    dps *= this._getGlobalDpsMultiplier();

    return dps;
  },

  /**
   * Returns tap damage for one click.
   */
  calculateTapDamage() {
    const autoDps = this.calculateAutoDps();
    const base = Math.max(10, autoDps * CONFIG.TAP_DPS_RATIO);
    const tapMult = upgradeMultiplier('tap_power', state.upgrades.tap_power ?? 0);

    // Passive tap bonus from maidens
    let passiveTap = 1;
    for (const [charId, charState] of Object.entries(state.characters)) {
      if (!charState.unlocked) continue;
      const def = CHARACTERS[charId];
      if (def?.passiveBonus?.type === 'tapDamage') {
        passiveTap += def.passiveBonus.value;
      }
    }

    return Math.ceil(base * tapMult * passiveTap);
  },

  /**
   * Applies damage to the current monster.
   */
  applyDamage(amount) {
    state.battle.monsterCurrentHp = Math.max(0, state.battle.monsterCurrentHp - amount);
    state.stats.totalDamageDealt = (state.stats.totalDamageDealt ?? 0) + amount;

    if (state.battle.monsterCurrentHp <= 0) {
      this.onMonsterDefeated();
    }
  },

  // ─── Monster defeat ─────────────────────────────────────────────────────

  onMonsterDefeated() {
    clearTimeout(_comboTimer);
    _resetCombo();
    import('../engine/stage.js').then(({ StageEngine }) => StageEngine.onMonsterKilled());
  },

  onBossDefeated() {
    import('../engine/stage.js').then(({ StageEngine }) => StageEngine.onBossDefeated());
  },

  onBossEscaped() {
    import('../engine/stage.js').then(({ StageEngine }) => StageEngine.onBossEscaped());
  },

  // ─── Private helpers ────────────────────────────────────────────────────

  _getGlobalDpsMultiplier() {
    let mult = 1;
    for (const [charId, charState] of Object.entries(state.characters)) {
      if (!charState.unlocked) continue;
      const def = CHARACTERS[charId];
      if (def?.passiveBonus?.type === 'autoDpsMultiplier') {
        mult += def.passiveBonus.value;
      }
    }
    return mult;
  },

  _getShardBonusMultiplier() {
    const forgeLvl = state.upgrades.ascension_forge ?? 0;
    return upgradeMultiplier('ascension_forge', forgeLvl) - 1; // extra ratio
  },
};
