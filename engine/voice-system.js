'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   engine/voice-system.js — Tag-Based Voice Reaction System
   ─────────────────────────────────────────────────────────────────────────
   HOW IT WORKS
   ─────────────────────────────────────────────────────────────────────────
   Voice files live in:  assets/audio/{character}/{emotion}_{index}.mp3
   e.g.  assets/audio/himari/happy_01.mp3
         assets/audio/himari/happy_02.mp3
         assets/audio/reina/cold_01.mp3

   On first use of any character/emotion pair the system sends parallel HEAD
   requests to probe which numbered files exist (01 → PROBE_LIMIT).  Results
   are cached for the session so subsequent plays are instant.  Adding a new
   file — e.g.  annoyed_06.mp3 — requires zero code changes; it is picked up
   automatically on the next page load.

   DIALOGUE INTEGRATION
   ─────────────────────────────────────────────────────────────────────────
   Add an optional `emotion` key to any dialogue step in scenario.js:

     { type: 'dialogue', character: 'himari', expression: 'smile',
       text: 'You belong to me.', emotion: 'possessive' }

   The engine calls  TagVoiceSystem.play('himari', 'possessive')  when that
   line appears.  If no matching file exists the call silently does nothing.

   SUPPORTED EMOTION TAGS (examples — add any you like)
   ─────────────────────────────────────────────────────────────────────────
   happy · sad · angry · annoyed · cold · teasing · whisper · obsessive ·
   playful · broken · possessive · sigh · laugh · shock · tender · scorn ·
   nervous · excited · hollow · desperate
   ═══════════════════════════════════════════════════════════════════════════ */

const TagVoiceSystem = (() => {

  /* ── Config ──────────────────────────────────────────────────────────── */
  const PROBE_LIMIT = 20;   // max files probed per emotion (e.g. happy_01…happy_20)
  const VOLUME      = 0.82; // global playback volume (0–1)

  /* ── Internal state ──────────────────────────────────────────────────── */
  const _cache      = new Map(); // '{char}/{emotion}' → string[]  (bare names, no ext)
  const _lastPlayed = new Map(); // '{char}/{emotion}' → last chosen name
  let   _current    = null;      // currently playing HTMLAudioElement
  const _probeQueue = new Map(); // prevents duplicate parallel discoveries

  /* ── File discovery ──────────────────────────────────────────────────── */

  async function _probeFile(url) {
    try {
      const r = await fetch(url, { method: 'HEAD' });
      return r.ok;
    } catch {
      return false;
    }
  }

  async function _discover(character, emotion) {
    const key = `${character}/${emotion}`;

    // Already cached
    if (_cache.has(key)) return _cache.get(key);

    // Discovery in progress — wait for it instead of launching a duplicate
    if (_probeQueue.has(key)) return _probeQueue.get(key);

    const promise = (async () => {
      // Build all candidate paths: emotion_01 … emotion_XX
      const names = [];
      for (let i = 1; i <= PROBE_LIMIT; i++) {
        names.push(`${emotion}_${String(i).padStart(2, '0')}`);
      }

      const urls    = names.map(n => `assets/audio/${character}/${n}.mp3`);
      const results = await Promise.allSettled(urls.map(_probeFile));

      const found = names.filter((_, i) =>
        results[i].status === 'fulfilled' && results[i].value === true
      );

      _cache.set(key, found);
      _probeQueue.delete(key);
      return found;
    })();

    _probeQueue.set(key, promise);
    return promise;
  }

  /* ── Playback ────────────────────────────────────────────────────────── */

  /** play(character, emotion)
   *  Selects a random file for the emotion, avoids repeating the last pick.
   *  Silently does nothing if no files exist for this emotion. */
  async function play(character, emotion) {
    if (!character || !emotion) return;

    // Stop any currently playing voice line
    stop();

    let files;
    try {
      files = await _discover(character, emotion);
    } catch {
      return; // network failure — silent
    }
    if (!files.length) return; // emotion not yet voiced — silent

    // Anti-repeat: exclude last played when pool has more than one file
    const key  = `${character}/${emotion}`;
    const last = _lastPlayed.get(key);
    const pool = (files.length > 1 && last)
      ? files.filter(f => f !== last)
      : files;

    // Random selection (pool is guaranteed non-empty because files.length ≥ 1)
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    _lastPlayed.set(key, chosen);

    const src = `assets/audio/${character}/${chosen}.mp3`;

    try {
      const audio   = new Audio(src);
      audio.volume  = VOLUME;
      audio.preload = 'auto';

      // Silently swallow autoplay-policy errors
      const playPromise = audio.play();
      if (playPromise instanceof Promise) {
        await playPromise.catch(() => {});
      }

      _current = audio;

      // Clear reference when playback ends naturally
      audio.addEventListener('ended', () => {
        if (_current === audio) _current = null;
      }, { once: true });

    } catch {
      // Audio API unavailable or file fetch error — silent fail
    }
  }

  /** stop() — immediately silence the current voice line. */
  function stop() {
    if (_current) {
      try {
        _current.pause();
        _current.currentTime = 0;
      } catch { /* ignore */ }
      _current = null;
    }
  }

  /** preload(character, emotion)
   *  Fire-and-forget probe so the first play() call has zero discovery delay.
   *  Call this during scene load to warm up emotions that will soon be needed. */
  function preload(character, emotion) {
    _discover(character, emotion).catch(() => {});
  }

  /** preloadScene(sceneId)
   *  Pre-warms all emotion tags found in a scene's steps.
   *  Pass any scene ID from SCENES and it will preload all referenced voices. */
  function preloadScene(sceneId) {
    if (typeof SCENES === 'undefined' || !SCENES[sceneId]) return;
    const steps = SCENES[sceneId].steps || [];
    steps.forEach(step => {
      if (step.emotion && step.character) {
        preload(step.character, step.emotion);
      }
    });
  }

  /** clearCache(character, emotion)
   *  Dev helper: invalidate cached discovery so new files are picked up
   *  without a page reload.  Omit both args to clear everything. */
  function clearCache(character, emotion) {
    if (character && emotion) {
      _cache.delete(`${character}/${emotion}`);
    } else {
      _cache.clear();
    }
  }

  /* ── Volume control ──────────────────────────────────────────────────── */

  let _volume = VOLUME;

  function setVolume(v) {
    _volume = Math.max(0, Math.min(1, v));
    if (_current) _current.volume = _volume;
  }

  function getVolume() { return _volume; }

  /* ── Debug helper ────────────────────────────────────────────────────── */

  function listCache() {
    const out = {};
    _cache.forEach((files, key) => { out[key] = files; });
    return out;
  }

  /* ── Public API ──────────────────────────────────────────────────────── */
  return {
    play,
    stop,
    preload,
    preloadScene,
    clearCache,
    setVolume,
    getVolume,
    listCache,
  };

})();
