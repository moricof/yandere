import { json } from '../lib/utils.js';
import { authenticateRequest } from './auth.js';
import {
  GACHA_POOL, SHARD_VALUES, PULL_COST_1, PULL_COST_10,
  getSSRRate, SR_BASE_RATE, R_BASE_RATE,
} from '../lib/rates.js';
import { secureRandom, weightedChoice } from '../lib/rng.js';

export async function handleGacha(request, env) {
  const url = new URL(request.url);

  if (url.pathname !== '/api/gacha/pull' || request.method !== 'POST') {
    return json({ error: 'Not found' }, 404);
  }

  const userId = await authenticateRequest(request, env);
  if (!userId) return json({ error: 'Unauthorized' }, 401);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }

  const count = body.count === 10 ? 10 : 1;
  const totalCost = count === 10 ? PULL_COST_10 : PULL_COST_1;

  // Load game state and user atomically via D1 batch
  const [stateRow, userRow] = await env.DB.batch([
    env.DB.prepare('SELECT state_json FROM game_states WHERE user_id = ?').bind(userId),
    env.DB.prepare('SELECT pity_counter FROM users WHERE id = ?').bind(userId),
  ]).then(results => [results[0].results[0], results[1].results[0]]);

  if (!stateRow) return json({ error: 'Game state not found. Please register first.' }, 404);

  const state = JSON.parse(stateRow.state_json);
  if ((state.resources?.mana ?? 0) < totalCost) {
    return json({ error: 'Insufficient mana', required: totalCost, current: state.resources.mana }, 400);
  }

  let pity = userRow?.pity_counter ?? 0;
  const pullResults = [];

  for (let i = 0; i < count; i++) {
    pity++;
    const result = performPull(pity);
    if (result.rarity === 'SSR') pity = 0;

    // Check duplicate
    const existing = await env.DB.prepare(
      'SELECT copies, ascension_shards FROM user_characters WHERE user_id = ? AND character_id = ?',
    ).bind(userId, result.characterId).first();

    if (existing) {
      result.isDuplicate = true;
      result.shardsGained = SHARD_VALUES[result.rarity];
      if (!state.characters[result.characterId]) {
        state.characters[result.characterId] = { level: 1, ascensionShards: 0, unlocked: true };
      }
      state.characters[result.characterId].ascensionShards =
        (state.characters[result.characterId].ascensionShards ?? 0) + result.shardsGained;

      await env.DB.prepare(
        'UPDATE user_characters SET ascension_shards = ascension_shards + ?, copies = copies + 1 WHERE user_id = ? AND character_id = ?',
      ).bind(result.shardsGained, userId, result.characterId).run();
    } else {
      result.isDuplicate = false;
      result.shardsGained = 0;
      state.characters[result.characterId] = { level: 1, ascensionShards: 0, unlocked: true };

      await env.DB.prepare(
        'INSERT INTO user_characters (user_id, character_id, copies, level, ascension_shards, unlocked_at) VALUES (?, ?, 1, 1, 0, ?)',
      ).bind(userId, result.characterId, Math.floor(Date.now() / 1000)).run();
    }

    pullResults.push(result);
  }

  // Deduct mana
  state.resources.mana -= totalCost;
  state.stats = state.stats ?? {};
  state.stats.totalPulls = (state.stats.totalPulls ?? 0) + count;

  const now = Math.floor(Date.now() / 1000);

  // Persist: game state + pity + history (all in one batch for atomicity)
  const historyInserts = pullResults.map(r =>
    env.DB.prepare(
      'INSERT INTO gacha_history (user_id, character_id, rarity, is_duplicate, shards_gained, pulled_at) VALUES (?,?,?,?,?,?)',
    ).bind(userId, r.characterId, r.rarity, r.isDuplicate ? 1 : 0, r.shardsGained, now),
  );

  await env.DB.batch([
    env.DB.prepare('UPDATE game_states SET state_json = ?, updated_at = ? WHERE user_id = ?')
      .bind(JSON.stringify(state), now, userId),
    env.DB.prepare('UPDATE users SET pity_counter = ?, total_pulls = total_pulls + ? WHERE id = ?')
      .bind(pity, count, userId),
    ...historyInserts,
  ]);

  return json({
    results: pullResults,
    pityCounter: pity,
    newMana: state.resources.mana,
  });
}

function performPull(pityCount) {
  const ssrRate = getSSRRate(pityCount);
  const roll = secureRandom();

  let rarity;
  if (roll < ssrRate) {
    rarity = 'SSR';
  } else if (roll < ssrRate + SR_BASE_RATE) {
    rarity = 'SR';
  } else {
    rarity = 'R';
  }

  const character = weightedChoice(GACHA_POOL[rarity]);
  return { rarity, characterId: character.id };
}
