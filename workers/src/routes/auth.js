import { json, createJWT, verifyJWT } from '../lib/utils.js';

const TOKEN_TTL = 30 * 24 * 3600; // 30 days in seconds

export async function handleAuth(request, env) {
  const url = new URL(request.url);

  // POST /api/auth/register — create anonymous user, return JWT
  if (url.pathname === '/api/auth/register' && request.method === 'POST') {
    const userId = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);

    await env.DB.prepare(
      'INSERT INTO users (id, created_at, last_seen) VALUES (?, ?, ?)',
    ).bind(userId, now, now).run();

    // Seed initial game state
    const defaultState = buildDefaultState();
    await env.DB.prepare(
      'INSERT INTO game_states (user_id, state_json, updated_at) VALUES (?, ?, ?)',
    ).bind(userId, JSON.stringify(defaultState), now).run();

    const token = await createJWT(
      { sub: userId, iat: now, exp: now + TOKEN_TTL },
      env.JWT_SECRET,
    );
    return json({ userId, token });
  }

  // POST /api/auth/refresh — validate existing token, return fresh one
  if (url.pathname === '/api/auth/refresh' && request.method === 'POST') {
    const userId = await authenticateRequest(request, env);
    if (!userId) return json({ error: 'Unauthorized' }, 401);

    const now = Math.floor(Date.now() / 1000);
    await env.DB.prepare('UPDATE users SET last_seen = ? WHERE id = ?')
      .bind(now, userId).run();

    const token = await createJWT(
      { sub: userId, iat: now, exp: now + TOKEN_TTL },
      env.JWT_SECRET,
    );
    return json({ userId, token });
  }

  return json({ error: 'Not found' }, 404);
}

// Exported so other routes can authenticate incoming requests
export async function authenticateRequest(request, env) {
  const auth = request.headers.get('Authorization') ?? '';
  if (!auth.startsWith('Bearer ')) return null;
  try {
    const payload = await verifyJWT(auth.slice(7), env.JWT_SECRET);
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

// Admin auth — separate from user auth, stored in sessionStorage on client
export async function authenticateAdmin(request, env) {
  const auth = request.headers.get('Authorization') ?? '';
  if (!auth.startsWith('Admin ')) return false;
  const provided = auth.slice(6).trim();

  // Constant-time comparison
  const enc = new TextEncoder();
  const a = enc.encode(provided);
  const b = enc.encode(env.ADMIN_SECRET ?? '');

  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

function buildDefaultState() {
  return {
    version: 1,
    resources: { gold: 0, mana: 300, gems: 10 },
    stage: { current: 1, killCount: 0, killsPerStage: 10, highestStage: 1 },
    battle: { monsterCurrentHp: 100, monsterMaxHp: 100, isBossActive: false, bossTimeLeft: 30 },
    characters: {},
    upgrades: {},
    offline: { lastSaveTime: Date.now(), maxOfflineHours: 8 },
    stats: { totalGoldEarned: 0, totalPulls: 0, totalDamageDealt: 0 },
    settings: { soundEnabled: true, notificationsEnabled: false },
  };
}
