// Data-driven template engine
// Allows swapping ALL assets (character art, monster images, banners, backgrounds)
// without touching game code. Admin dashboard writes to DB; this reads on startup.

import { CONFIG } from '../config.js';

class TemplateEngine {
  #overrides = {};   // { 'character_art:seraphine': 'https://...' }
  #listeners = [];

  constructor() {
    this.#loadFromLocal();
  }

  // ─── Registration ──────────────────────────────────────────────────────────

  /**
   * Returns the configured URL for an asset, or null if not overridden.
   * @param {'character_art'|'character_video'|'monster_art'|'banner_art'|'background_art'} type
   * @param {string} key - e.g. 'seraphine', 'shadow_imp', 'banner_main'
   */
  getUrl(type, key) {
    return this.#overrides[`${type}:${key}`]?.url ?? null;
  }

  getMetadata(type, key) {
    return this.#overrides[`${type}:${key}`]?.metadata ?? {};
  }

  /**
   * Applies a URL override (from admin API response).
   * Persists to localStorage for offline-first access.
   */
  setOverride(type, key, url, metadata = {}) {
    this.#overrides[`${type}:${key}`] = { url, metadata };
    this.#saveToLocal();
    this.#notify(type, key, url);
  }

  // ─── Rendering helpers ─────────────────────────────────────────────────────

  /**
   * Applies asset to an <img> element. Uses emoji fallback if no URL configured.
   * @param {HTMLImageElement} img
   * @param {HTMLElement} fallbackEl - shown when no image URL available
   * @param {string} type
   * @param {string} key
   */
  applyImage(img, fallbackEl, type, key) {
    const url = this.getUrl(type, key);
    if (url) {
      img.src = url;
      img.onerror = () => { img.style.display = 'none'; if (fallbackEl) fallbackEl.style.display = 'flex'; };
      img.onload  = () => { img.style.display = 'block'; if (fallbackEl) fallbackEl.style.display = 'none'; };
      img.style.display = 'block';
      if (fallbackEl) fallbackEl.style.display = 'none';
    } else {
      img.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'flex';
    }
  }

  /**
   * Applies a looping video background.
   * @param {HTMLVideoElement} video
   * @param {string} type
   * @param {string} key
   * @returns {boolean} true if video was applied
   */
  applyVideo(video, type, key) {
    const url = this.getUrl(type, key);
    if (!url) return false;
    video.src = url;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.play().catch(() => {});
    return true;
  }

  // ─── Sync from server ─────────────────────────────────────────────────────

  async syncFromServer() {
    if (CONFIG.API_URL.includes('YOUR_ACCOUNT')) return; // no backend configured yet
    try {
      const resp = await fetch(`${CONFIG.API_URL}/api/assets/public`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!resp.ok) return;
      const { assets } = await resp.json();
      for (const a of assets) {
        let meta = {};
        try { meta = JSON.parse(a.metadata_json ?? '{}'); } catch {}
        this.#overrides[`${a.asset_type}:${a.asset_key}`] = { url: a.url, metadata: meta };
      }
      this.#saveToLocal();
    } catch {
      // Offline or server down — use cached overrides from localStorage
    }
  }

  // ─── Subscribe to changes ──────────────────────────────────────────────────

  onChange(cb) {
    this.#listeners.push(cb);
    return () => { this.#listeners = this.#listeners.filter(l => l !== cb); };
  }

  #notify(type, key, url) {
    this.#listeners.forEach(cb => { try { cb(type, key, url); } catch {} });
  }

  // ─── Persistence ──────────────────────────────────────────────────────────

  #saveToLocal() {
    try {
      localStorage.setItem('cn_asset_overrides', JSON.stringify(this.#overrides));
    } catch {}
  }

  #loadFromLocal() {
    try {
      const raw = localStorage.getItem('cn_asset_overrides');
      if (raw) this.#overrides = JSON.parse(raw);
    } catch {
      this.#overrides = {};
    }
  }
}

// Singleton — import this everywhere
export const templateEngine = new TemplateEngine();
