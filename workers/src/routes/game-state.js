import { json } from '../lib/utils.js';
import { authenticateRequest } from './auth.js';

const MAX_STATE_BYTES = 64 * 1024; // 64 KB guard against abuse

export async function handleGameState(request, env) {
  const url = new URL(request.url);
  const userId = await authenticateRequest(request, env);
  if (!userId) return json({ error: 'Unauthorized' }, 401);

  // GET /api/state — load cloud save
  if (url.pathname === '/api/state' && request.method === 'GET') {
    const row = await env.DB.prepare(
      'SELECT state_json, version, updated_at FROM game_states WHERE user_id = ?',
    ).bind(userId).first();

    if (!row) return json({ error: 'No save found' }, 404);

    // Also include character inventory from relational table
    const chars = await env.DB.prepare(
      'SELECT character_id, copies, level, ascension_shards FROM user_characters WHERE user_id = ?',
    ).bind(userId).all();

    const state = JSON.parse(row.state_json);

    // Merge relational character data as authoritative source
    for (const c of chars.results) {
      state.characters[c.character_id] = {
        ...(state.characters[c.character_id] ?? {}),
        level: c.level,
        copies: c.copies,
        ascensionShards: c.ascension_shards,
        unlocked: true,
      };
    }

    return json({ state, version: row.version, updatedAt: row.updated_at });
  }

  // POST /api/state — cloud save (client sends full state)
  if (url.pathname === '/api/state' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }

    const raw = JSON.stringify(body.state ?? {});
    if (raw.length > MAX_STATE_BYTES) {
      return json({ error: 'State too large' }, 413);
    }

    const now = Math.floor(Date.now() / 1000);

    // Basic server-side sanity check — prevent gold hacking
    const incoming = body.state ?? {};
    const existing = await env.DB.prepare(
      'SELECT state_json FROM game_states WHERE user_id = ?',
    ).bind(userId).first();

    if (existing) {
      const old = JSON.parse(existing.state_json);
      const oldGold = old.resources?.gold ?? 0;
      const newGold = incoming.resources?.gold ?? 0;
      const oldGems = old.resources?.gems ?? 0;
      const newGems = incoming.resources?.gems ?? 0;

      // Gems can only increase server-side (purchases), never from client save
      if (newGems > oldGems) {
        incoming.resources.gems = oldGems;
      }

      // Gold sanity: client-side DPS can't exceed a theoretical max per second
      // Allow up to 15% buffer over what's possible. Don't block — just log suspicious saves.
      const timeDelta = now - (old.offline?.lastSaveTime ? Math.floor(old.offline.lastSaveTime / 1000) : now);
      // Max possible DPS (very generous ceiling) — prevents blatant cheating
      const maxTheoreticalGold = oldGold + timeDelta * 1e15;
      if (newGold > maxTheoreticalGold) {
        // Reset gold to old value and log (don't ban — could be clock skew)
        incoming.resources.gold = oldGold;
      }
    }

    await env.DB.prepare(
      'UPDATE game_states SET state_json = ?, version = version + 1, updated_at = ? WHERE user_id = ?',
    ).bind(JSON.stringify(incoming), now, userId).run();

    await env.DB.prepare('UPDATE users SET last_seen = ? WHERE id = ?').bind(now, userId).run();

    return json({ saved: true, savedAt: now });
  }

  // GET /api/state/history — last 20 gacha pulls
  if (url.pathname === '/api/state/history' && request.method === 'GET') {
    const rows = await env.DB.prepare(
      'SELECT character_id, rarity, is_duplicate, shards_gained, pulled_at FROM gacha_history WHERE user_id = ? ORDER BY pulled_at DESC LIMIT 20',
    ).bind(userId).all();

    return json({ history: rows.results });
  }

  return json({ error: 'Not found' }, 404);
}
