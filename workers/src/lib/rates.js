// Gacha rates, character pool, and pity system constants
// Authoritative server-side definition — frontend copies are display-only

export const SSR_BASE_RATE = 0.05;   // 5%
export const SR_BASE_RATE  = 0.15;   // 15%
export const R_BASE_RATE   = 0.80;   // 80%

export const PITY_THRESHOLD  = 90;   // Guaranteed SSR at 90 pulls
export const SOFT_PITY_START = 75;   // Soft pity starts here (rate increases)

// Soft pity: each pull past 75 adds 6% extra SSR rate (capped at 100% at 90)
export function getSSRRate(pityCount) {
  if (pityCount >= PITY_THRESHOLD) return 1.0;
  if (pityCount >= SOFT_PITY_START) {
    const extra = (pityCount - SOFT_PITY_START) * 0.06;
    return Math.min(1.0, SSR_BASE_RATE + extra);
  }
  return SSR_BASE_RATE;
}

// Shard values per rarity on duplicate pull
export const SHARD_VALUES = { SSR: 50, SR: 20, R: 5 };

// Pull costs in Mana
export const PULL_COST_1  = 100;
export const PULL_COST_10 = 900;  // 10% bulk discount

// Full gacha character pool — must mirror frontend data/characters.js
// Weight within rarity determines relative pull probability
export const GACHA_POOL = {
  SSR: [
    { id: 'seraphine',  weight: 1 },
    { id: 'lyraneth',   weight: 1 },
    { id: 'veilara',    weight: 1 },
  ],
  SR: [
    { id: 'mirael',    weight: 1 },
    { id: 'zephyrine', weight: 1 },
    { id: 'solaris',   weight: 1 },
    { id: 'noctis',    weight: 1 },
  ],
  R: [
    { id: 'elara',  weight: 2 },
    { id: 'fauna',  weight: 2 },
    { id: 'pyris',  weight: 2 },
    { id: 'aqua',   weight: 1 },
    { id: 'terryn', weight: 1 },
    { id: 'lumi',   weight: 1 },
  ],
};
