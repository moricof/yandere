// Web Push implementation for Cloudflare Workers
// Uses VAPID (RFC 8292) + AES-128-GCM content encryption (RFC 8291)
import { json, createVAPIDJWT, b64url, b64urlDecode } from '../lib/utils.js';
import { authenticateRequest } from './auth.js';

export async function handlePush(request, env) {
  const url = new URL(request.url);
  const userId = await authenticateRequest(request, env);
  if (!userId) return json({ error: 'Unauthorized' }, 401);

  // POST /api/push/subscribe — save PushSubscription from browser
  if (url.pathname === '/api/push/subscribe' && request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Bad request' }, 400); }

    const { subscription } = body;
    if (!subscription?.endpoint) return json({ error: 'Invalid subscription' }, 400);

    const now = Math.floor(Date.now() / 1000);
    await env.DB.prepare(
      `INSERT INTO push_subscriptions (user_id, subscription_json, created_at)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET subscription_json = excluded.subscription_json`,
    ).bind(userId, JSON.stringify(subscription), now).run();

    return json({ subscribed: true });
  }

  // DELETE /api/push/subscribe — unsubscribe
  if (url.pathname === '/api/push/subscribe' && request.method === 'DELETE') {
    await env.DB.prepare('DELETE FROM push_subscriptions WHERE user_id = ?').bind(userId).run();
    return json({ unsubscribed: true });
  }

  // POST /api/push/test — send a test notification to the current user
  if (url.pathname === '/api/push/test' && request.method === 'POST') {
    const row = await env.DB.prepare(
      'SELECT subscription_json FROM push_subscriptions WHERE user_id = ?',
    ).bind(userId).first();

    if (!row) return json({ error: 'No subscription found for this user' }, 404);

    const sub = JSON.parse(row.subscription_json);
    const result = await sendPushNotification(sub, {
      title: 'Goddess Rebirth: Idle Oaths',
      body: 'Your gold storage is full! Come collect your rewards.',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      url: '/',
    }, env);

    return json({ sent: result.ok, status: result.status });
  }

  return json({ error: 'Not found' }, 404);
}

// Call this from a scheduled Cron Worker or from game-state.js when gold storage fills
export async function broadcastPushToAll(env, payload) {
  const rows = await env.DB.prepare('SELECT user_id, subscription_json FROM push_subscriptions').all();
  const results = await Promise.allSettled(
    rows.results.map(row => sendPushNotification(JSON.parse(row.subscription_json), payload, env)),
  );

  const failed = results.filter(r => r.status === 'rejected' || !r.value?.ok);
  return { total: rows.results.length, failed: failed.length };
}

async function sendPushNotification(subscription, payload, env) {
  const endpoint = subscription.endpoint;
  const p256dh = subscription.keys?.p256dh;
  const auth = subscription.keys?.auth;

  if (!endpoint || !p256dh || !auth) {
    return { ok: false, status: 0, error: 'incomplete subscription' };
  }

  const endpointUrl = new URL(endpoint);
  const audience = `${endpointUrl.protocol}//${endpointUrl.host}`;

  // VAPID JWT
  let vapidJWT;
  try {
    vapidJWT = await createVAPIDJWT(audience, env.VAPID_SUBJECT, env.VAPID_PRIVATE_KEY_JWK);
  } catch (e) {
    return { ok: false, status: 0, error: `VAPID signing failed: ${e.message}` };
  }

  // Encrypt payload
  const encrypted = await encryptPayload(
    new TextEncoder().encode(JSON.stringify(payload)),
    p256dh,
    auth,
  );

  const vapidPublicKeyB64 = env.VAPID_PUBLIC_KEY ?? '';

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'aes128gcm',
      'Authorization': `vapid t=${vapidJWT}, k=${vapidPublicKeyB64}`,
      'TTL': '86400',
    },
    body: encrypted,
  });

  if (resp.status === 410 || resp.status === 404) {
    // Subscription expired — clean up (fire-and-forget)
    // We don't have user_id here, so we'd need to pass it; skip for now
  }

  return { ok: resp.ok, status: resp.status };
}

// RFC 8291 — "Message Encryption for Web Push"
// AES-128-GCM with ECDH key agreement and HKDF key derivation
async function encryptPayload(plaintext, receiverPublicKeyB64, authB64) {
  const receiverPublicKey = b64urlDecode(receiverPublicKeyB64);
  const authSecret = b64urlDecode(authB64);

  // Generate ephemeral sender key pair
  const senderKeyPair = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'],
  );

  // Import receiver public key
  const receiverKey = await crypto.subtle.importKey(
    'raw', receiverPublicKey, { name: 'ECDH', namedCurve: 'P-256' }, false, [],
  );

  // ECDH shared secret
  const sharedSecret = await crypto.subtle.deriveBits(
    { name: 'ECDH', public: receiverKey }, senderKeyPair.privateKey, 256,
  );

  // Export sender public key (uncompressed)
  const senderPublicKeyRaw = await crypto.subtle.exportKey('raw', senderKeyPair.publicKey);

  // Random salt (16 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // HKDF — RFC 8291 §3.3
  const prk = await hkdfExtract(authSecret, new Uint8Array(sharedSecret));

  const keyInfoBuf = buildHkdfInfo(
    'Content-Encoding: auth\x00',
    new Uint8Array(0), new Uint8Array(0), 0,
  );
  const ikm = await hkdfExpand(prk, keyInfoBuf, 32);

  const prk2 = await hkdfExtract(salt, ikm);

  const cekInfo = buildHkdfInfo(
    'Content-Encoding: aes128gcm\x00',
    receiverPublicKey, new Uint8Array(senderPublicKeyRaw), 16,
  );
  const nonceInfo = buildHkdfInfo(
    'Content-Encoding: nonce\x00',
    receiverPublicKey, new Uint8Array(senderPublicKeyRaw), 12,
  );

  const cekBits = await hkdfExpand(prk2, cekInfo, 16);
  const nonceBits = await hkdfExpand(prk2, nonceInfo, 12);

  const cek = await crypto.subtle.importKey('raw', cekBits, 'AES-GCM', false, ['encrypt']);

  // Pad plaintext (RFC 8291 §4): append \x02 delimiter
  const padded = new Uint8Array(plaintext.length + 1);
  padded.set(plaintext);
  padded[plaintext.length] = 0x02;

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonceBits }, cek, padded,
  );

  // Build final payload: salt (16) + rs (4) + idlen (1) + sender_pub (65) + ciphertext
  const rs = 4096; // record size
  const senderPubBytes = new Uint8Array(senderPublicKeyRaw);
  const header = new Uint8Array(16 + 4 + 1 + senderPubBytes.length);
  header.set(salt, 0);
  new DataView(header.buffer).setUint32(16, rs, false);
  header[20] = senderPubBytes.length;
  header.set(senderPubBytes, 21);

  const result = new Uint8Array(header.length + ciphertext.byteLength);
  result.set(header);
  result.set(new Uint8Array(ciphertext), header.length);
  return result;
}

async function hkdfExtract(salt, ikm) {
  const saltKey = await crypto.subtle.importKey('raw', salt, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const prk = await crypto.subtle.sign('HMAC', saltKey, ikm);
  return new Uint8Array(prk);
}

async function hkdfExpand(prk, info, length) {
  const prkKey = await crypto.subtle.importKey('raw', prk, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const block = new Uint8Array([...info, 0x01]);
  const t = await crypto.subtle.sign('HMAC', prkKey, block);
  return new Uint8Array(t).slice(0, length);
}

function buildHkdfInfo(label, receiverKey, senderKey, keyLen) {
  const labelBytes = new TextEncoder().encode(label);
  const buf = new Uint8Array(labelBytes.length + 5 + receiverKey.length + senderKey.length);
  let offset = 0;
  buf.set(labelBytes, offset); offset += labelBytes.length;
  new DataView(buf.buffer).setUint16(offset, receiverKey.length, false); offset += 2;
  buf.set(receiverKey, offset); offset += receiverKey.length;
  new DataView(buf.buffer).setUint16(offset, senderKey.length, false); offset += 2;
  buf.set(senderKey, offset); offset += senderKey.length;
  buf[offset] = keyLen;
  return buf;
}
