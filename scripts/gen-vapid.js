#!/usr/bin/env node
// Generates VAPID key pair for Web Push Notifications
// Run: node scripts/gen-vapid.js
// Then paste the output into Cloudflare Dashboard > Workers > Environment Variables

async function generateVAPIDKeys() {
  const keyPair = await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify'],
  );

  const privateJwk = await crypto.subtle.exportKey('jwk', keyPair.privateKey);
  const publicRaw  = await crypto.subtle.exportKey('raw',  keyPair.publicKey);

  // Public key as base64url (for frontend config.js + manifest.json)
  const publicB64url = Buffer.from(publicRaw)
    .toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  console.log('\n════════════════════════════════════════════════════════');
  console.log('  VAPID Keys Generated — Goddess Rebirth: Idle Oaths');
  console.log('════════════════════════════════════════════════════════\n');

  console.log('1. In public/src/config.js, set VAPID_PUBLIC_KEY to:');
  console.log(`   "${publicB64url}"\n`);

  console.log('2. In Cloudflare Dashboard > Workers > goddess-rebirth-api > Settings > Variables:');
  console.log('   Add secret VAPID_PUBLIC_KEY:');
  console.log(`   ${publicB64url}\n`);

  console.log('   Add secret VAPID_PRIVATE_KEY_JWK (the full JSON string below):');
  console.log(`   ${JSON.stringify(privateJwk)}\n`);

  console.log('3. Also add your JWT_SECRET — any long random string, e.g.:');
  console.log(`   ${generateRandomHex(32)}\n`);

  console.log('════════════════════════════════════════════════════════\n');
}

function generateRandomHex(bytes) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

generateVAPIDKeys().catch(console.error);

module.exports = { generateVAPIDKeys };
