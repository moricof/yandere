// Goddess Rebirth: Idle Oaths — Cloudflare Worker entry point
// Routes all /api/* requests with CORS support

import { handleAuth } from './routes/auth.js';
import { handleGacha } from './routes/gacha.js';
import { handleGameState } from './routes/game-state.js';
import { handleAdmin, handlePublicAssets } from './routes/admin.js';
import { handlePush } from './routes/push.js';
import { corsOptions, json, addCors } from './lib/utils.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return corsOptions();

    // Public asset endpoint — no auth, for game client startup
    if (url.pathname === '/api/assets/public') {
      return addCors(await handlePublicAssets(request, env));
    }

    let response;
    try {
      if (url.pathname.startsWith('/api/auth')) {
        response = await handleAuth(request, env);
      } else if (url.pathname.startsWith('/api/gacha')) {
        response = await handleGacha(request, env);
      } else if (url.pathname.startsWith('/api/state')) {
        response = await handleGameState(request, env);
      } else if (url.pathname.startsWith('/api/admin')) {
        response = await handleAdmin(request, env);
      } else if (url.pathname.startsWith('/api/push')) {
        response = await handlePush(request, env);
      } else {
        response = json({ error: 'Not found', path: url.pathname }, 404);
      }
    } catch (err) {
      console.error('[Worker Error]', err);
      response = json({ error: 'Internal server error' }, 500);
    }

    return addCors(response);
  },

  // Scheduled trigger — runs on cron to send push notifications for full storage
  async scheduled(event, env, ctx) {
    if (event.cron === '0 * * * *') {
      // Every hour: find users with full offline storage and notify
      const { broadcastPushToAll } = await import('./routes/push.js');
      await broadcastPushToAll(env, {
        title: 'Gold Storage Full!',
        body: 'Your offline gold storage is 100% full. Log in to collect!',
        icon: '/icons/icon-192.png',
        url: '/',
        tag: 'gold-full',
      });
    }
  },
};
