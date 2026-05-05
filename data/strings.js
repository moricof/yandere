/**
 * strings.js — Localization & Voice Index  |  The Cage of Obsession
 * ==================================================================
 * Externalizes display text so strings can be translated and linked
 * to voice files without touching scenario.js or script.js.
 *
 * ── HOW IT WORKS ────────────────────────────────────────────────
 *  Each entry key is:  'sceneId:stepIndex'
 *  Value fields:
 *    en        — English text (required, used as fallback)
 *    ja        — Japanese text (optional)
 *    voice     — Path to the voice clip for this line (optional)
 *    speaker   — Character ID who speaks this line (for TTS routing)
 *
 * ── ENGINE INTEGRATION ──────────────────────────────────────────
 *  In script.js, showDialogueStep() resolves text like this:
 *    1. If the step has a stringId field, look it up here
 *    2. Apply {name} substitution to the resolved text
 *    3. Play the voice file if present (when audio is wired up)
 *    4. Fall back to the inline step.text if no entry found
 *
 * ── MIGRATION STRATEGY ──────────────────────────────────────────
 *  Do NOT migrate all lines at once — only add entries here as you:
 *    (a) add voice files for a line, OR
 *    (b) need a translated variant of a line
 *  All other lines remain inline in scenario.js and work fine.
 *
 * ── ADDING A VOICE LINE ─────────────────────────────────────────
 *  1. Record / generate the voice file
 *  2. Place it at:  assets/voice/<characterId>/<sceneId>_<stepIndex>.mp3
 *  3. Add an entry below with the matching key
 *  4. Add  stringId: 'sceneId:stepIndex'  to the step in scenario.js
 *     (the inline text field can remain as a readable fallback)
 */

'use strict';

const STRINGS = {

  /* ── Example entries — replace with real content when voice is ready ──── */

  // 'prologue:5': {
  //   en      : 'Graduation is three days away.\n\nYou\'ve been counting.',
  //   ja      : '卒業まで、あと三日。\n\n数えていた。',
  //   voice   : 'assets/voice/narrator/prologue_05.mp3',
  //   speaker : 'narrator',
  // },

  // 'himari_ch1_start:6': {
  //   en      : 'Sit down, {name}.',
  //   ja      : '座って、{name}。',
  //   voice   : 'assets/voice/himari/ch1_start_06.mp3',
  //   speaker : 'himari',
  // },

};


/**
 * getString — Resolves a string key with language fallback.
 *
 * @param {string} key       - 'sceneId:stepIndex'
 * @param {string} fallback  - Inline text from scenario.js step
 * @param {string} [lang]    - Language code, e.g. 'en' or 'ja'. Defaults to 'en'.
 * @returns {string} Resolved text, or fallback if key not found.
 */
function getString(key, fallback, lang) {
  const entry = STRINGS[key];
  if (!entry) return fallback;
  return entry[lang || 'en'] || entry['en'] || fallback;
}


/**
 * getVoicePath — Returns the voice file path for a step, or null.
 *
 * @param {string} key - 'sceneId:stepIndex'
 * @returns {string|null}
 */
function getVoicePath(key) {
  const entry = STRINGS[key];
  return (entry && entry.voice) ? entry.voice : null;
}
