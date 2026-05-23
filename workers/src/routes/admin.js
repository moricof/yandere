import { json } from '../lib/utils.js';
import { authenticateAdmin } from './auth.js';

export async function handleAdmin(request, env) {
  const url = new URL(request.url);

  // POST /api/admin/login — validates secret, returns admin session token
  // The admin "token" is just the raw secret (the client stores it and sends as "Admin <secret>")
  // For production, upgrade to time-limited signed tokens
  if (url.pathname === '/api/admin/login' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }

    const enc = new TextEncoder();
    const provided = enc.encode(body.password ?? '');
    const expected = enc.encode(env.ADMIN_SECRET ?? '');

    let mismatch = provided.length !== expected.length ? 1 : 0;
    const maxLen = Math.max(provided.length, expected.length);
    for (let i = 0; i < maxLen; i++) mismatch |= (provided[i] ?? 0) ^ (expected[i] ?? 0);

    if (mismatch !== 0) return json({ error: 'Invalid password' }, 403);

    return json({ token: body.password }); // Client echoes this back as "Admin <token>"
  }

  // All routes below require admin auth
  const isAdmin = await authenticateAdmin(request, env);
  if (!isAdmin) return json({ error: 'Forbidden' }, 403);

  // GET /api/admin/assets — list all configured assets
  if (url.pathname === '/api/admin/assets' && request.method === 'GET') {
    const rows = await env.DB.prepare(
      'SELECT id, asset_type, asset_key, url, metadata_json, updated_at FROM admin_assets ORDER BY asset_type, asset_key',
    ).all();
    return json({ assets: rows.results });
  }

  // POST /api/admin/assets — upsert an asset URL
  if (url.pathname === '/api/admin/assets' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }

    const { asset_type, asset_key, url: assetUrl, metadata } = body;
    if (!asset_type || !asset_key || !assetUrl) {
      return json({ error: 'asset_type, asset_key, and url are required' }, 400);
    }

    // Validate asset_type whitelist
    const VALID_TYPES = ['character_art', 'character_video', 'monster_art', 'banner_art', 'background_art'];
    if (!VALID_TYPES.includes(asset_type)) {
      return json({ error: `asset_type must be one of: ${VALID_TYPES.join(', ')}` }, 400);
    }

    // Basic URL validation
    try { new URL(assetUrl); } catch { return json({ error: 'Invalid URL' }, 400); }

    const now = Math.floor(Date.now() / 1000);
    await env.DB.prepare(
      `INSERT INTO admin_assets (asset_type, asset_key, url, metadata_json, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(asset_type, asset_key) DO UPDATE SET
         url = excluded.url,
         metadata_json = excluded.metadata_json,
         updated_at = excluded.updated_at`,
    ).bind(asset_type, asset_key, assetUrl, JSON.stringify(metadata ?? {}), now).run();

    return json({ saved: true, asset_type, asset_key, url: assetUrl });
  }

  // DELETE /api/admin/assets/:id — remove an asset
  const deleteMatch = url.pathname.match(/^\/api\/admin\/assets\/(\d+)$/);
  if (deleteMatch && request.method === 'DELETE') {
    const id = parseInt(deleteMatch[1], 10);
    await env.DB.prepare('DELETE FROM admin_assets WHERE id = ?').bind(id).run();
    return json({ deleted: true, id });
  }

  // GET /api/admin/assets/public — public endpoint (no auth) for frontend to fetch asset overrides
  // Note: this is exposed deliberately so the game client can load admin-configured URLs
  if (url.pathname === '/api/admin/assets/public') {
    const rows = await env.DB.prepare(
      'SELECT asset_type, asset_key, url, metadata_json FROM admin_assets',
    ).all();
    return json({ assets: rows.results });
  }

  // GET /api/admin/stats — overview stats
  if (url.pathname === '/api/admin/stats' && request.method === 'GET') {
    const [users, pulls, assets] = await env.DB.batch([
      env.DB.prepare('SELECT COUNT(*) as cnt FROM users'),
      env.DB.prepare('SELECT COUNT(*) as cnt FROM gacha_history'),
      env.DB.prepare('SELECT COUNT(*) as cnt FROM admin_assets'),
    ]);

    return json({
      totalUsers: users.results[0]?.cnt ?? 0,
      totalPulls: pulls.results[0]?.cnt ?? 0,
      configuredAssets: assets.results[0]?.cnt ?? 0,
    });
  }

  return json({ error: 'Not found' }, 404);
}

// Public asset handler — no auth required, called by game client on startup
export async function handlePublicAssets(request, env) {
  const rows = await env.DB.prepare(
    'SELECT asset_type, asset_key, url, metadata_json FROM admin_assets',
  ).all();
  return json({ assets: rows.results }, 200, {
    'Cache-Control': 'public, max-age=300', // 5-min cache OK for asset URLs
  });
}
