// Offline gold accumulation — calculated on load based on time away
import { state } from '../state.js';
import { CONFIG } from '../config.js';
import { BattleEngine } from '../engine/battle.js';
import { goldReward } from '../data/stages.js';
import { upgradeMultiplier } from '../data/upgrades.js';
import { fmt, fmtTime } from '../engine/numbers.js';
import { offlineHoursFromUpgrade } from '../data/upgrades.js';

export const OfflineSystem = {
  /**
   * Called after state is loaded. Calculates and stores pending offline gold.
   * The actual gold is credited when the player claims it (via modal).
   */
  calculate() {
    const now = Date.now();
    const lastSave = state.offline.lastSaveTime ?? now;
    const elapsedMs = now - lastSave;

    const maxHours = offlineHoursFromUpgrade(state.upgrades.offline_storage ?? 0);
    const maxMs = maxHours * 3_600_000;
    const cappedMs = Math.min(elapsedMs, maxMs);

    if (cappedMs < 10_000) {
      // Less than 10 seconds away — not worth showing the modal
      state.offline.pendingGold = 0;
      return;
    }

    const dps = BattleEngine.calculateAutoDps();
    const goldPerDps = goldReward(state.stage.current) / Math.max(1, cappedMs / 1000);

    // Offline gold = DPS * time * efficiency * gold rate factor
    const goldPerSecond = dps > 0
      ? (dps / Math.max(1, state.battle.monsterMaxHp)) * goldReward(state.stage.current)
      : 0;

    const rawGold = goldPerSecond * (cappedMs / 1000) * CONFIG.OFFLINE_DPS_EFFICIENCY;
    const goldMult = upgradeMultiplier('gold_bonus', state.upgrades.gold_bonus ?? 0);

    state.offline.pendingGold = Math.floor(rawGold * goldMult);
    state.offline.elapsedMs = cappedMs;
  },

  /** Credits the pending offline gold to the player's balance. */
  claim() {
    const pending = state.offline.pendingGold ?? 0;
    if (pending > 0) {
      state.resources.gold += pending;
      state.stats.totalGoldEarned = (state.stats.totalGoldEarned ?? 0) + pending;
    }
    state.offline.pendingGold = 0;
  },

  get hasPendingGold() {
    return (state.offline.pendingGold ?? 0) > 0;
  },

  get summaryText() {
    const elapsed = state.offline.elapsedMs ?? 0;
    return {
      timeAway: fmtTime(elapsed),
      goldEarned: fmt(state.offline.pendingGold ?? 0),
    };
  },

  /** Returns true if offline storage is near full (triggers push notification). */
  isStorageFull() {
    const maxHours = offlineHoursFromUpgrade(state.upgrades.offline_storage ?? 0);
    const maxMs = maxHours * 3_600_000;
    const elapsed = Date.now() - (state.offline.lastSaveTime ?? Date.now());
    return elapsed >= maxMs * 0.95; // 95% full = trigger
  },
};
