// Shared utilities for Cloudflare Workers

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS, ...extra },
  });
}

export function corsOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export function addCors(response) {
  const h = new Headers(response.headers);
  Object.entries(CORS).forEach(([k, v]) => h.set(k, v));
  return new Response(response.body, { status: response.status, headers: h });
}

// --- Minimal HS256 JWT (for user tokens) ---
function b64url(buf) {
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function b64urlDecode(str) {
  const pad = str.length % 4;
  const padded = str + (pad ? '='.repeat(4 - pad) : '');
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function createJWT(payload, secret) {
  const enc = new TextEncoder();
  const header = b64url(enc.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const data = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return `${data}.${b64url(sig)}`;
}

export async function verifyJWT(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('malformed token');

  const enc = new TextEncoder();
  const data = `${parts[0]}.${parts[1]}`;

  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'],
  );
  const sig = b64urlDecode(parts[2]);
  const ok = await crypto.subtle.verify('HMAC', key, sig, enc.encode(data));
  if (!ok) throw new Error('invalid signature');

  const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(parts[1])));

  // Token expires after 30 days
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error('token expired');

  return payload;
}

// --- ES256 JWT for VAPID (Web Push) ---
export async function createVAPIDJWT(audience, subject, privateKeyJwk) {
  const enc = new TextEncoder();
  const now = Math.floor(Date.now() / 1000);

  const header = b64url(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = b64url(enc.encode(JSON.stringify({
    aud: audience, exp: now + 43200, sub: subject,
  })));
  const unsigned = `${header}.${payload}`;

  let jwk = privateKeyJwk;
  if (typeof jwk === 'string') jwk = JSON.parse(jwk);

  const key = await crypto.subtle.importKey(
    'jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(unsigned),
  );
  return `${unsigned}.${b64url(sig)}`;
}

export { b64url, b64urlDecode };
