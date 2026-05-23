// Holy Maidens screen — shows owned characters with level-up UI
import { CharacterSystem } from '../systems/characters.js';
import { CHARACTERS, RARITY_COLORS } from '../data/characters.js';
import { CONFIG } from '../config.js';
import { templateEngine } from '../data/template-engine.js';
import { fmt } from '../engine/numbers.js';
import { state } from '../state.js';

export const MaidensScreen = {
  init() {},

  render() {
    const list = document.getElementById('maidens-list');
    const hint = document.getElementById('locked-hint');
    if (!list) return;

    const unlocked = CharacterSystem.getUnlocked();
    list.innerHTML = '';

    if (unlocked.length === 0) {
      hint?.classList.remove('hidden');
      return;
    }
    hint?.classList.add('hidden');

    for (const char of unlocked) {
      list.appendChild(this._buildCard(char));
    }
  },

  _buildCard(char) {
    const cs = state.characters[char.id] ?? {};
    const colors = RARITY_COLORS[char.rarity];
    const dps = CharacterSystem.effectiveDps(char.id);
    const level = cs.level ?? 1;
    const shards = cs.ascensionShards ?? 0;
    const cost = CharacterSystem.levelUpCost(char.id);
    const canUp = CharacterSystem.canLevelUp(char.id);
    const isMax = level >= CONFIG.CHAR_MAX_LEVEL;

    const card = document.createElement('div');
    card.className = 'maiden-card';
    card.style.borderColor = colors.border;
    card.style.boxShadow = `0 0 12px ${colors.glow}`;

    card.innerHTML = `
      <div class="maiden-art">
        <img class="maiden-img" src="" alt="" style="display:none">
        <div class="maiden-emoji">${char.emoji}</div>
      </div>
      <div class="maiden-info">
        <div class="maiden-header">
          <span class="maiden-rarity" style="color:${colors.label}">${char.rarity}</span>
          <span class="maiden-name">${char.name}</span>
          <span class="maiden-title">${char.title}</span>
        </div>
        <div class="maiden-stats">
          <div class="stat-row">
            <span class="stat-label">Lv</span>
            <span class="stat-val">${level}${isMax ? ' (MAX)' : ''}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">DPS</span>
            <span class="stat-val">${fmt(dps)}/s</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Shards</span>
            <span class="stat-val">${shards}</span>
          </div>
          ${char.passiveBonus ? `
          <div class="stat-row passive">
            <span class="stat-label">Passive</span>
            <span class="stat-val">${this._passiveLabel(char.passiveBonus)}</span>
          </div>` : ''}
        </div>
        ${!isMax ? `
        <button class="maiden-levelup-btn ${canUp ? '' : 'disabled'}" data-id="${char.id}">
          Level Up — ${fmt(cost)} Gold
        </button>` : `
        <div class="maiden-maxlevel">✦ MAX LEVEL ✦</div>`}
      </div>
    `;

    // Apply art from admin override
    const img = card.querySelector('.maiden-img');
    const emojiEl = card.querySelector('.maiden-emoji');
    templateEngine.applyImage(img, emojiEl, 'character_art', char.id);

    // Level-up button
    const btn = card.querySelector('.maiden-levelup-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (CharacterSystem.levelUp(char.id)) {
          this.render(); // re-render to update costs
        }
      });
    }

    return card;
  },

  _passiveLabel(bonus) {
    const pct = Math.round(bonus.value * 100);
    switch (bonus.type) {
      case 'tapDamage':         return `+${pct}% Tap Dmg`;
      case 'goldMultiplier':    return `+${pct}% Gold`;
      case 'manaMultiplier':    return `+${pct}% Mana`;
      case 'autoDpsMultiplier': return `+${pct}% All DPS`;
      default: return bonus.type;
    }
  },
};
