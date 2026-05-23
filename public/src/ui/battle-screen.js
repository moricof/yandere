// Battle screen — the main tap/click combat interface
import { state } from '../state.js';
import { BattleEngine } from '../engine/battle.js';
import { StageEngine } from '../engine/stage.js';
import { monsterHp } from '../data/stages.js';
import { getMonsterForStage } from '../data/monsters.js';
import { templateEngine } from '../data/template-engine.js';

export const BattleScreen = {
  init() {
    const zone = document.getElementById('battle-zone');
    if (!zone) return;

    // Tap / click handler
    zone.addEventListener('pointerdown', e => {
      e.preventDefault();
      BattleEngine.handleTap(e.clientX, e.clientY);
      this._punchAnimation(e.clientX, e.clientY);
    });

    // Initial monster spawn
    this._spawnInitial();

    // Listen for asset overrides (admin changes while app is open)
    templateEngine.onChange((type, key) => {
      if (type === 'monster_art' && key === state.battle.monsterId) {
        this._applyMonsterArt(state.battle.monsterId, state.battle.monsterEmoji);
      }
      if (type === 'background_art' && key === 'battle') {
        this._applyBackground();
      }
    });

    this._applyBackground();
  },

  _spawnInitial() {
    const monster = getMonsterForStage(state.stage.current);
    const hp = monsterHp(state.stage.current);

    // Only reset HP if it hasn't been loaded from save
    if (!state.battle.monsterMaxHp || state.battle.monsterMaxHp !== hp) {
      state.battle.monsterCurrentHp = hp;
      state.battle.monsterMaxHp = hp;
      state.battle.monsterId = monster.id;
      state.battle.monsterName = monster.name;
      state.battle.monsterEmoji = monster.emoji;
    }

    const nameEl = document.getElementById('monster-name');
    if (nameEl) nameEl.textContent = state.battle.monsterName;

    this._applyMonsterArt(state.battle.monsterId, state.battle.monsterEmoji);
  },

  _applyMonsterArt(monsterId, emoji) {
    const img = document.getElementById('monster-img');
    const fallback = document.getElementById('monster-fallback');
    if (!img || !fallback) return;

    fallback.textContent = emoji;
    templateEngine.applyImage(img, fallback, 'monster_art', monsterId);
  },

  _applyBackground() {
    const el = document.getElementById('battle-screen');
    if (!el) return;

    const video = document.getElementById('battle-bg-video');
    if (video) {
      const applied = templateEngine.applyVideo(video, 'background_art', 'battle');
      if (applied) {
        el.style.backgroundImage = 'none';
        return;
      }
    }

    const bgUrl = templateEngine.getUrl('background_art', 'battle');
    if (bgUrl) {
      el.style.backgroundImage = `url('${bgUrl}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
  },

  _punchAnimation(clientX, clientY) {
    // Monster recoil + hit-white flash (via filter in CSS keyframe)
    const sprite = document.getElementById('monster-sprite');
    if (sprite) {
      sprite.classList.remove('punch');
      void sprite.offsetWidth;
      sprite.classList.add('punch');
    }

    // Radial screen flash
    const flash = document.getElementById('battle-flash');
    if (flash) {
      flash.classList.remove('active');
      void flash.offsetWidth;
      flash.classList.add('active');
    }

    // Expanding ring at exact tap coordinates (relative to battle-zone)
    const ring = document.getElementById('tap-ring');
    const zone = document.getElementById('battle-zone');
    if (ring && zone && clientX !== undefined) {
      const rect = zone.getBoundingClientRect();
      ring.style.left = (clientX - rect.left) + 'px';
      ring.style.top  = (clientY - rect.top)  + 'px';
      ring.classList.remove('active');
      void ring.offsetWidth;
      ring.classList.add('active');
    }

    // Battle zone micro-shake
    if (zone) {
      zone.classList.remove('impact');
      void zone.offsetWidth;
      zone.classList.add('impact');
    }
  },
};
