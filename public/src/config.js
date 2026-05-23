// Global configuration — edit API_URL after deploying your Cloudflare Worker
// All other values are game-design constants

export const CONFIG = Object.freeze({
  // ---- DEPLOYMENT ----
  // Replace with your deployed Worker URL after `wrangler deploy`
  API_URL: 'https://goddess-rebirth-api.YOUR_ACCOUNT.workers.dev',

  // Generate with: npx web-push generate-vapid-keys
  // Paste the PUBLIC key here (private key goes in Cloudflare dashboard secrets)
  VAPID_PUBLIC_KEY: 'YOUR_VAPID_PUBLIC_KEY_BASE64URL',

  // ---- BRAND ----
  BRAND: 'CAELUM NOIR',
  TITLE: 'Idle Goddess: Impact of Fate',
  GAME_VERSION: '1.0.0',
  ADMIN_ROUTE: '/caelum-admin',

  // ---- GAME CONSTANTS ----
  AUTO_SAVE_LOCAL_MS: 30_000,      // local save every 30s
  AUTO_SAVE_CLOUD_MS: 300_000,     // cloud save every 5min
  BOSS_TIMER_SECONDS: 30,
  KILLS_PER_STAGE: 10,             // normal kills before boss triggers
  OFFLINE_MAX_HOURS: 8,
  OFFLINE_DPS_EFFICIENCY: 0.5,     // offline earns 50% of online DPS in gold

  // Monster HP scaling per stage
  BASE_MONSTER_HP: 100,
  HP_SCALE_FACTOR: 1.8,            // HP = BASE * SCALE^(stage-1)
  BOSS_HP_MULTIPLIER: 10,

  // Gold/Mana rewards
  BASE_GOLD_PER_KILL: 10,
  GOLD_SCALE_FACTOR: 1.5,
  BASE_MANA_PER_KILL: 2,
  MANA_SCALE_FACTOR: 1.25,

  // Gacha costs
  PULL_COST_1: 100,
  PULL_COST_10: 900,
  PITY_THRESHOLD: 90,
  SOFT_PITY_START: 75,

  // Ascension
  SHARD_BONUS_PER_SHARD: 0.01,     // 1% DPS bonus per shard

  // Tap damage: max(10, totalAutoDps * TAP_DPS_RATIO)
  TAP_DPS_RATIO: 0.1,

  // Upgrade costs
  UPGRADE_BASE_COST_GOLD: 500,
  UPGRADE_SCALE: 3.5,

  // Character level-up
  CHAR_LEVEL_BASE_COST: 50,
  CHAR_LEVEL_SCALE: 1.15,
  CHAR_DPS_PER_LEVEL: 0.1,        // +10% base DPS per level
  CHAR_MAX_LEVEL: 100,
});
