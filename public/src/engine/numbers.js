// Big number formatting for idle game values
// Handles everything from 0 to 10^66+ without BigInt

const TIERS = [
  '',    'K',   'M',   'B',   'T',
  'Qa',  'Qi',  'Sx',  'Sp',  'Oc',  'No',
  'Dc',  'UDc', 'DDc', 'TDc', 'QaDc','QiDc',
  'SxDc','SpDc','OcDc','NoDc',
  'Vg',  'UVg', 'DVg',
];

/**
 * Formats a number for display in the idle game HUD.
 * Examples: 999 → "999", 1500 → "1.50K", 1.5e9 → "1.50B"
 */
export function fmt(n) {
  if (!isFinite(n) || isNaN(n)) return '?';
  if (n < 0) return '-' + fmt(-n);
  if (n < 10000) return Math.floor(n).toLocaleString('en-US');

  const tier = Math.min(Math.floor(Math.log10(n) / 3), TIERS.length - 1);
  if (tier <= 0) return Math.floor(n).toLocaleString('en-US');

  const scaled = n / Math.pow(1000, tier);
  const suffix = TIERS[tier];

  if (scaled >= 100) return Math.floor(scaled) + suffix;
  if (scaled >= 10)  return scaled.toFixed(1) + suffix;
  return scaled.toFixed(2) + suffix;
}

/**
 * Compact format — always ≤ 6 chars. Used for floating damage text.
 */
export function fmtCompact(n) {
  if (n < 1000) return Math.floor(n).toString();
  return fmt(n);
}

/**
 * Format duration in milliseconds to human-readable string.
 * 3661000 → "1h 1m 1s"
 */
export function fmtTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`;
}

/**
 * Format DPS rate: "1.23K/s"
 */
export function fmtRate(n) {
  return fmt(n) + '/s';
}

/**
 * Format a percentage to one decimal: 0.155 → "15.5%"
 */
export function fmtPct(ratio) {
  return (ratio * 100).toFixed(1) + '%';
}

/**
 * Parse a formatted number back to a raw number (for display verification only).
 */
export function parse(str) {
  const trimmed = str.trim();
  const suffix = trimmed.slice(-2);
  const tier = TIERS.lastIndexOf(suffix);
  if (tier > 0) return parseFloat(trimmed) * Math.pow(1000, tier);
  const tier1 = TIERS.lastIndexOf(trimmed.slice(-1));
  if (tier1 > 0) return parseFloat(trimmed) * Math.pow(1000, tier1);
  return parseFloat(trimmed.replace(/,/g, ''));
}
