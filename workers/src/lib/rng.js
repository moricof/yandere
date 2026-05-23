// Cryptographically secure RNG using Web Crypto API
// Used exclusively for all gacha pulls — never use Math.random() for gacha

/**
 * Returns a uniformly distributed float in [0, 1) using 32 random bits.
 */
export function secureRandom() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  // Divide by 2^32 to get [0,1) — shift by 0.5 ULP to avoid exact 0 or 1
  return (buf[0] + 0.5) / 0x100000000;
}

/**
 * Returns a cryptographically random integer in [min, max] inclusive.
 */
export function secureRandInt(min, max) {
  const range = max - min + 1;
  const bits = Math.ceil(Math.log2(range));
  const mask = (1 << bits) - 1;

  // Rejection sampling to ensure uniform distribution
  let val;
  do {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    val = buf[0] & mask;
  } while (val >= range);

  return min + val;
}

/**
 * Picks a random item from an array using secure RNG.
 */
export function secureChoice(arr) {
  if (!arr.length) throw new Error('empty array');
  return arr[secureRandInt(0, arr.length - 1)];
}

/**
 * Performs a weighted selection.
 * @param {Array<{id: string, weight: number}>} items
 */
export function weightedChoice(items) {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let threshold = secureRandom() * total;
  for (const item of items) {
    threshold -= item.weight;
    if (threshold <= 0) return item;
  }
  return items[items.length - 1];
}
