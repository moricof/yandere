// Monster definitions by stage range
// Each entry: { id, name, emoji, stageRange: [min, max], isBoss }

export const MONSTER_POOLS = [
  // ─── Stages 1–10: Verdant Wilds ─────────────────────────────────────────────
  { id: 'corrupted_sprite', name: 'Corrupted Sprite', emoji: '👾', stageMin: 1, stageMax: 10, weight: 3 },
  { id: 'shadow_imp',       name: 'Shadow Imp',        emoji: '😈', stageMin: 1, stageMax: 10, weight: 2 },
  { id: 'dark_goblin',      name: 'Dark Goblin',       emoji: '👹', stageMin: 1, stageMax: 10, weight: 2 },

  // ─── Stages 11–25: Iron Wastes ───────────────────────────────────────────────
  { id: 'iron_golem',       name: 'Iron Golem',        emoji: '🤖', stageMin: 11, stageMax: 25, weight: 2 },
  { id: 'void_serpent',     name: 'Void Serpent',      emoji: '🐍', stageMin: 11, stageMax: 25, weight: 3 },
  { id: 'storm_wraith',     name: 'Storm Wraith',      emoji: '👻', stageMin: 11, stageMax: 25, weight: 2 },

  // ─── Stages 26–50: Abyssal Rift ──────────────────────────────────────────────
  { id: 'abyssal_horror',   name: 'Abyssal Horror',   emoji: '🦑', stageMin: 26, stageMax: 50, weight: 2 },
  { id: 'chaos_demon',      name: 'Chaos Demon',      emoji: '👿', stageMin: 26, stageMax: 50, weight: 3 },
  { id: 'rift_lurker',      name: 'Rift Lurker',       emoji: '🕷️', stageMin: 26, stageMax: 50, weight: 2 },

  // ─── Stages 51–100: Shadow Dominion ─────────────────────────────────────────
  { id: 'elder_wraith',     name: 'Elder Wraith',      emoji: '💀', stageMin: 51, stageMax: 100, weight: 2 },
  { id: 'dark_titan',       name: 'Dark Titan',        emoji: '🗿', stageMin: 51, stageMax: 100, weight: 2 },
  { id: 'void_colossus',    name: 'Void Colossus',     emoji: '🌑', stageMin: 51, stageMax: 100, weight: 3 },

  // ─── Stages 101+: Eternal Void ──────────────────────────────────────────────
  { id: 'void_ancient',     name: 'Void Ancient',      emoji: '🌀', stageMin: 101, stageMax: Infinity, weight: 2 },
  { id: 'chaos_sovereign',  name: 'Chaos Sovereign',   emoji: '☠️', stageMin: 101, stageMax: Infinity, weight: 3 },
  { id: 'oblivion_god',     name: 'Oblivion God',      emoji: '⚫', stageMin: 101, stageMax: Infinity, weight: 1 },
];

// Boss monsters (triggered every 10 stages)
export const BOSS_TABLE = {
  10:  { id: 'shade_king',       name: 'Shade King',          emoji: '👑', suffix: 'of the Wilds' },
  20:  { id: 'iron_colossus',    name: 'Iron Colossus',       emoji: '⚙️', suffix: 'Destroyer of Men' },
  30:  { id: 'abyss_lord',       name: 'Abyss Lord',          emoji: '🔱', suffix: 'Gatekeeper of the Rift' },
  40:  { id: 'void_emperor',     name: 'Void Emperor',        emoji: '🌌', suffix: 'Corruptor of Realms' },
  50:  { id: 'chaos_herald',     name: 'Chaos Herald',        emoji: '🔥', suffix: 'Herald of the End' },
  60:  { id: 'shadow_sovereign', name: 'Shadow Sovereign',    emoji: '🌑', suffix: 'Eternal Darkness' },
  70:  { id: 'void_titan',       name: 'Void Titan',          emoji: '⚡', suffix: 'Shattering Reality' },
  80:  { id: 'elder_god',        name: 'Elder God',           emoji: '👁️', suffix: 'Dreaming Nightmare' },
  90:  { id: 'oblivion_spawn',   name: 'Oblivion Spawn',      emoji: '🌀', suffix: 'Entropy Incarnate' },
  100: { id: 'nullity_prime',    name: 'Nullity Prime',       emoji: '✨', suffix: 'The Absolute End' },
};

// Returns a random monster for the given stage
export function getMonsterForStage(stage) {
  const eligible = MONSTER_POOLS.filter(m => stage >= m.stageMin && stage <= m.stageMax);
  if (!eligible.length) return MONSTER_POOLS[MONSTER_POOLS.length - 1];

  const totalWeight = eligible.reduce((s, m) => s + m.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const m of eligible) {
    roll -= m.weight;
    if (roll <= 0) return m;
  }
  return eligible[eligible.length - 1];
}

// Returns boss data for a given stage (checks every 10 stages, repeats after 100)
export function getBossForStage(stage) {
  const tier = Math.min(stage - (stage % 10 === 0 ? 0 : stage % 10), 100);
  const key = Object.keys(BOSS_TABLE).map(Number).sort((a, b) => b - a).find(k => k <= tier);
  const boss = BOSS_TABLE[key] ?? BOSS_TABLE[10];
  const repeat = Math.floor((stage - 1) / 100);
  const suffix = repeat > 0 ? ` Mk.${repeat + 1}` : '';
  return { ...boss, name: boss.name + suffix };
}
