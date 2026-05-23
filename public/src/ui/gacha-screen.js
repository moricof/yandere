// Gacha / Sacred Summon screen
import { state } from '../state.js';
import { GachaSystem } from '../systems/gacha.js';
import { CONFIG } from '../config.js';
import { CHARACTERS, RARITY_COLORS } from '../data/characters.js';
import { templateEngine } from '../data/template-engine.js';
import { fmt } from '../engine/numbers.js';

export const GachaScreen = {
  init() {
    document.getElementById('pull-1x')?.addEventListener('click', () => GachaSystem.pull(1));
    document.getElementById('pull-10x')?.addEventListener('click', () => GachaSystem.pull(10));
  },

  render() {
    this._updateButtons();
    this._updatePity();
    this._applyBannerArt();
    this._renderHistory();
  },

  _updateButtons() {
    const btn1  = document.getElementById('pull-1x');
    const btn10 = document.getElementById('pull-10x');
    const offline = !navigator.onLine;

    if (btn1) {
      btn1.disabled = !GachaSystem.canPull1x;
      btn1.querySelector('.btn-cost').textContent =
        offline ? 'Offline' : `◈ ${CONFIG.PULL_COST_1} Mana`;
    }
    if (btn10) {
      btn10.disabled = !GachaSystem.canPull10x;
      btn10.querySelector('.btn-cost').innerHTML =
        offline ? 'Offline' : `◈ ${CONFIG.PULL_COST_10} Mana <span class="discount">-10%</span>`;
    }
  },

  _updatePity() {
    const el = document.getElementById('pity-count');
    if (el) el.textContent = state.gacha.pityCounter ?? 0;
  },

  _applyBannerArt() {
    const img = document.getElementById('banner-img');
    const fallback = document.getElementById('banner-fallback');
    if (img && fallback) templateEngine.applyImage(img, fallback, 'banner_art', 'banner_main');
  },

  _renderHistory() {
    const container = document.getElementById('recent-pulls-list');
    if (!container) return;

    const pulls = state.gacha.recentPulls ?? [];
    if (!pulls.length) { container.innerHTML = '<p class="no-history">No summons yet.</p>'; return; }

    container.innerHTML = pulls.slice(0, 10).map(p => {
      const char = CHARACTERS[p.character_id ?? p.characterId];
      const rarity = p.rarity;
      const colors = RARITY_COLORS[rarity] ?? RARITY_COLORS.R;
      return `
        <div class="history-item" style="border-left: 3px solid ${colors.border}">
          <span class="hist-emoji">${char?.emoji ?? '❓'}</span>
          <span class="hist-name" style="color:${colors.label}">[${rarity}] ${char?.name ?? p.character_id}</span>
          ${p.isDuplicate || p.is_duplicate ? `<span class="hist-shard">+${p.shardsGained ?? p.shards_gained} shards</span>` : '<span class="hist-new">NEW</span>'}
        </div>`;
    }).join('');
  },
};
