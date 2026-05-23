import { CONFIG } from '../config.js';

// All purchasable upgrades (bought with Gold in the Shop screen)
// Each upgrade has a max level; cost scales per level

export const UPGRADES = {
  tap_power: {
    id: 'tap_power',
    name: 'Divine Strike',
    description: 'Increases your tap damage.',
    icon: '⚔️',
    maxLevel: 50,
    effect: { type: 'tapDamageMultiplier', valuePerLevel: 0.15 }, // +15% tap per level
    baseCost: CONFIG.UPGRADE_BASE_COST_GOLD,
    costScale: CONFIG.UPGRADE_SCALE,
    currency: 'gold',
  },
  gold_bonus: {
    id: 'gold_bonus',
    name: 'Gilded Blessing',
    description: 'All enemies drop more gold.',
    icon: '✦',
    maxLevel: 30,
    effect: { type: 'goldMultiplier', valuePerLevel: 0.10 },
    baseCost: CONFIG.UPGRADE_BASE_COST_GOLD * 2,
    costScale: CONFIG.UPGRADE_SCALE,
    currency: 'gold',
  },
  offline_storage: {
    id: 'offline_storage',
    name: 'Astral Vault',
    description: 'Increases offline gold storage capacity.',
    icon: '⏰',
    maxLevel: 10,
    effect: { type: 'offlineHours', valuePerLevel: 1 }, // +1 hour max offline
    baseCost: CONFIG.UPGRADE_BASE_COST_GOLD * 5,
    costScale: CONFIG.UPGRADE_SCALE * 1.5,
    currency: 'gold',
  },
  mana_well: {
    id: 'mana_well',
    name: 'Mana Well',
    description: 'Enemies yield more Mana per defeat.',
    icon: '◈',
    maxLevel: 20,
    effect: { type: 'manaMultiplier', valuePerLevel: 0.12 },
    baseCost: CONFIG.UPGRADE_BASE_COST_GOLD * 1.5,
    costScale: CONFIG.UPGRADE_SCALE,
    currency: 'gold',
  },
  ascension_forge: {
    id: 'ascension_forge',
    name: 'Ascension Forge',
    description: 'Each Ascension Shard provides more DPS bonus.',
    icon: '🔮',
    maxLevel: 5,
    effect: { type: 'shardBonusMultiplier', valuePerLevel: 0.50 }, // +50% effectiveness of shards per level
    baseCost: CONFIG.UPGRADE_BASE_COST_GOLD * 10,
    costScale: CONFIG.UPGRADE_SCALE * 2,
    currency: 'gold',
  },
  auto_dps_amp: {
    id: 'auto_dps_amp',
    name: 'Holy Amplifier',
    description: 'Amplifies all Holy Maiden auto-attack damage.',
    icon: '✨',
    maxLevel: 40,
    effect: { type: 'autoDpsMultiplier', valuePerLevel: 0.08 },
    baseCost: CONFIG.UPGRADE_BASE_COST_GOLD * 3,
    costScale: CONFIG.UPGRADE_SCALE,
    currency: 'gold',
  },
};

export const UPGRADE_LIST = Object.values(UPGRADES);

/**
 * Returns the gold cost to buy the next level of an upgrade.
 * Cost = baseCost * costScale^currentLevel
 */
export function upgradeCost(upgradeId, currentLevel) {
  const up = UPGRADES[upgradeId];
  if (!up) return Infinity;
  return up.baseCost * Math.pow(up.costScale, currentLevel);
}

/**
 * Returns the total multiplier value given an upgrade at a specific level.
 * E.g. tap_power level 3 → 1 + (3 * 0.15) = 1.45 multiplier
 */
export function upgradeMultiplier(upgradeId, level) {
  const up = UPGRADES[upgradeId];
  if (!up || level === 0) return 1;
  return 1 + level * up.effect.valuePerLevel;
}

/**
 * Returns total added hours for offline_storage upgrade.
 */
export function offlineHoursFromUpgrade(level) {
  return CONFIG.OFFLINE_MAX_HOURS + level * UPGRADES.offline_storage.effect.valuePerLevel;
}
