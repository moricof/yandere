// Modal system — boss warnings, gacha results, stage clear, offline earnings, settings, toasts
import { state } from '../state.js';
import { CHARACTERS, RARITY_COLORS } from '../data/characters.js';
import { OfflineSystem } from '../systems/offline.js';
import { NotificationSystem } from '../systems/notifications.js';
import { SaveSystem } from '../systems/save.js';
import { templateEngine } from '../data/template-engine.js';
import { shareGachaPull } from '../utils/share.js';
import { fmt } from '../engine/numbers.js';
import { AudioEngine } from '../engine/audio.js';

let toastTimer = null;

export const Modals = {
  open(id) {
    state.ui.modalOpen = id;
    document.getElementById('modal-overlay')?.classList.remove('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.getElementById(`${id}-modal`)?.classList.remove('hidden');
  },

  close(id) {
    document.getElementById(`${id}-modal`)?.classList.add('hidden');
    state.ui.modalOpen = null;
    document.getElementById('modal-overlay')?.classList.add('hidden');
  },

  closeAll() {
    state.ui.modalOpen = null;
    document.getElementById('modal-overlay')?.classList.add('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  },

  // ─── Gacha Result ──────────────────────────────────────────────────────────

  showPulling(count) {
    const display = document.getElementById('gacha-results-display');
    if (display) {
      display.innerHTML = `
        <div class="pulling-animation">
          <div class="pull-orb">${count === 10 ? '10' : '1'}×</div>
          <p class="pulling-text">Summoning from the sacred realm...</p>
        </div>`;
    }
    this.open('gacha-result');
  },

  showGachaResult(results) {
    const display = document.getElementById('gacha-results-display');
    if (!display) return;

    display.innerHTML = results.map(r => this._buildResultCard(r)).join('');
    this.open('gacha-result');

    // Apply art from template engine
    results.forEach(r => {
      const img = display.querySelector(`img[data-char="${r.characterId}"]`);
      const emoji = display.querySelector(`div[data-char-emoji="${r.characterId}"]`);
      if (img && emoji) templateEngine.applyImage(img, emoji, 'character_art', r.characterId);
    });

    // Share button
    const shareBtn = document.getElementById('share-pull-btn');
    if (shareBtn) {
      shareBtn.onclick = () => shareGachaPull(results);
    }

    // Close button
    document.getElementById('close-gacha-result')?.addEventListener('click', () => {
      this.closeAll();
      // Refresh gacha screen
      import('./gacha-screen.js').then(({ GachaScreen }) => GachaScreen.render());
    }, { once: true });
  },

  _buildResultCard(r) {
    const char = CHARACTERS[r.characterId];
    const colors = RARITY_COLORS[r.rarity];
    return `
      <div class="result-card rarity-${r.rarity}" style="border-color:${colors.border};box-shadow:0 0 16px ${colors.glow}">
        <div class="result-rarity" style="color:${colors.label}">${r.rarity}</div>
        <img class="result-art" data-char="${r.characterId}" src="" alt="" style="display:none">
        <div class="result-emoji" data-char-emoji="${r.characterId}">${char?.emoji ?? '❓'}</div>
        <div class="result-name">${char?.name ?? r.characterId}</div>
        <div class="result-title">${char?.title ?? ''}</div>
        ${r.isDuplicate
          ? `<div class="result-dupe">+${r.shardsGained} Ascension Shards</div>`
          : `<div class="result-new">✨ NEW MAIDEN AWAKENED!</div>`}
      </div>`;
  },

  // ─── Boss Warning ──────────────────────────────────────────────────────────

  showBossWarning(boss) {
    document.getElementById('boss-name-display').textContent = `${boss.emoji} ${boss.name}`;
    this.open('boss');

    document.getElementById('boss-ready-btn')?.addEventListener('click', () => {
      this.close('boss');
    }, { once: true });

    // Auto-dismiss after 3 seconds so the boss timer still counts
    setTimeout(() => this.close('boss'), 3000);
  },

  showBossEscaped() {
    this.showToast('⚠ The boss escaped! Restarting the stage...', 'warning');
  },

  // ─── Stage Clear ──────────────────────────────────────────────────────────

  showStageClear(prevStage, newStage) {
    document.getElementById('new-stage-num').textContent = newStage;
    this.open('stage-clear');

    document.getElementById('stage-continue-btn')?.addEventListener('click', () => {
      this.close('stage-clear');
      SaveSystem.saveLocal();
    }, { once: true });

    setTimeout(() => this.close('stage-clear'), 4000);
  },

  // ─── Offline Earnings ─────────────────────────────────────────────────────

  showOfflineEarnings() {
    const { timeAway, goldEarned } = OfflineSystem.summaryText;
    document.getElementById('offline-time-away').textContent = `You were away for ${timeAway}`;
    document.getElementById('offline-gold-earned').textContent = `✦ ${goldEarned} Gold`;
    this.open('offline');

    document.getElementById('offline-claim-btn')?.addEventListener('click', () => {
      OfflineSystem.claim();
      this.close('offline');
    }, { once: true });
  },

  // ─── Settings ─────────────────────────────────────────────────────────────

  showSettings() {
    const soundToggle  = document.getElementById('sound-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeLabel  = document.getElementById('volume-label');

    if (soundToggle) soundToggle.checked = state.settings.soundEnabled;

    // Volume slider — initialize from state
    if (volumeSlider) {
      const pct = Math.round((state.settings.volume ?? 0.8) * 100);
      volumeSlider.value    = pct;
      volumeSlider.disabled = !state.settings.soundEnabled;
      if (volumeLabel) volumeLabel.textContent = pct + '%';
      volumeSlider.style.background =
        `linear-gradient(to right, var(--gold) ${pct}%, var(--border-mid) ${pct}%)`;

      volumeSlider.addEventListener('input', () => {
        const v = volumeSlider.value / 100;
        if (volumeLabel) volumeLabel.textContent = volumeSlider.value + '%';
        volumeSlider.style.background =
          `linear-gradient(to right, var(--gold) ${volumeSlider.value}%, var(--border-mid) ${volumeSlider.value}%)`;
        AudioEngine.setVolume(v);
      });
    }

    const notifBtn = document.getElementById('notif-btn');
    if (notifBtn) {
      const enabled = state.settings.notificationsEnabled;
      notifBtn.textContent = enabled ? 'Disable' : 'Enable';
      notifBtn.onclick = async () => {
        if (enabled) {
          await NotificationSystem.unsubscribe();
          notifBtn.textContent = 'Enable';
        } else {
          const result = await NotificationSystem.requestAndSubscribe();
          if (result.success) notifBtn.textContent = 'Disable';
          else this.showToast('Could not enable notifications: ' + result.reason, 'warning');
        }
      };
    }

    soundToggle?.addEventListener('change', () => {
      state.settings.soundEnabled = soundToggle.checked;
      if (volumeSlider) volumeSlider.disabled = !soundToggle.checked;
    });

    document.getElementById('cloud-save-btn')?.addEventListener('click', async () => {
      await SaveSystem.saveCloud();
      this.showToast('Saved to cloud!', 'success');
    }, { once: true });

    document.getElementById('close-settings')?.addEventListener('click', () => {
      this.close('settings');
    }, { once: true });

    this.open('settings');
  },

  // ─── Toast ────────────────────────────────────────────────────────────────

  showToast(message, type = 'info') {
    let toast = document.getElementById('game-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'game-toast';
      document.getElementById('app')?.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `game-toast type-${type} show`;

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  },
};

// HUD wires up #settings-btn via hud.js — no duplicate listener needed here.
