import { CONFIG } from '../config.js';

/**
 * Returns monster max HP for a given stage.
 * Formula: BASE_HP * SCALE^(stage-1)
 */
export function monsterHp(stage) {
  return CONFIG.BASE_MONSTER_HP * Math.pow(CONFIG.HP_SCALE_FACTOR, stage - 1);
}

/**
 * Boss HP = monsterHp * BOSS_HP_MULTIPLIER
 */
export function bossHp(stage) {
  return monsterHp(stage) * CONFIG.BOSS_HP_MULTIPLIER;
}

/**
 * Gold rewarded per normal kill.
 */
export function goldReward(stage) {
  return CONFIG.BASE_GOLD_PER_KILL * Math.pow(CONFIG.GOLD_SCALE_FACTOR, stage - 1);
}

/**
 * Mana rewarded per normal kill.
 */
export function manaReward(stage) {
  return CONFIG.BASE_MANA_PER_KILL * Math.pow(CONFIG.MANA_SCALE_FACTOR, stage - 1);
}

/**
 * Boss kill rewards 10x gold + 5x mana.
 */
export function bossReward(stage) {
  return { gold: goldReward(stage) * 10, mana: manaReward(stage) * 5 };
}

/**
 * Whether the current kill count triggers a boss fight.
 * Boss spawns after killsPerStage normal kills.
 */
export function isBossTrigger(killCount, killsPerStage) {
  return killCount >= killsPerStage;
}

/**
 * Stage zone name (displayed in HUD area label).
 */
export function zoneName(stage) {
  if (stage <= 10)  return 'Verdant Wilds';
  if (stage <= 25)  return 'Iron Wastes';
  if (stage <= 50)  return 'Abyssal Rift';
  if (stage <= 100) return 'Shadow Dominion';
  if (stage <= 200) return 'Eternal Void';
  return 'Primordial Chaos';
}

/**
 * Returns the "difficulty tier" icon string for the HUD.
 */
export function difficultyBadge(stage) {
  if (stage <= 10)  return '⭐';
  if (stage <= 25)  return '⭐⭐';
  if (stage <= 50)  return '⭐⭐⭐';
  if (stage <= 100) return '💀';
  return '⚡💀⚡';
}
