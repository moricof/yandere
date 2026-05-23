// HUD renderer — called every frame, updates only changed values
import { state } from '../state.js';
import { BattleEngine } from '../engine/battle.js';
import { fmt, fmtRate } from '../engine/numbers.js';
import { CONFIG } from '../config.js';

// Cache DOM refs on first render
let els = null;
let prevVals = {};

function getEls() {
  if (els) return els;
  els = {
    gold:       document.getElementById('gold-display'),
    mana:       document.getElementById('mana-display'),
    gems:       document.getElementById('gems-display'),
    stage:      document.getElementById('stage-display'),
    hpFill:     document.getElementById('monster-hp-fill'),
    hpText:     document.getElementById('monster-hp-text'),
    autoDps:    document.getElementById('auto-dps-display'),
    tapDmg:     document.getElementById('tap-damage-display'),
    kills:      document.getElementById('kills-display'),
    bossTimer:  document.getElementById('boss-time'),
    bossTimerWrap: document.getElementById('boss-timer'),
  };
  return els;
}

export const HUD = {
  init() {
    // Nav tab switching
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        this.switchScreen(screen);
      });
    });

    // Settings button
    document.getElementById('settings-btn')?.addEventListener('click', () => {
      import('./modals.js').then(({ Modals }) => Modals.showSettings());
    });
  },

  switchScreen(name) {
    if (state.ui.activeScreen === name) return;
    state.ui.activeScreen = name;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const screenEl = document.getElementById(`${name}-screen`);
    if (screenEl) screenEl.classList.add('active');

    const navBtn = document.querySelector(`.nav-btn[data-screen="${name}"]`);
    if (navBtn) navBtn.classList.add('active');

    // Refresh screen content on switch
    if (name === 'maidens') import('./maidens-screen.js').then(({ MaidensScreen }) => MaidensScreen.render());
    if (name === 'gacha')   import('./gacha-screen.js').then(({ GachaScreen }) => GachaScreen.render());
    if (name === 'shop')    import('./shop-screen.js').then(({ ShopScreen }) => ShopScreen.render());
  },

  /** Called every rAF frame — only updates DOM nodes whose values changed. */
  render() {
    const e = getEls();
    if (!e.gold) return;

    const gold  = fmt(state.resources.gold);
    const mana  = fmt(state.resources.mana);
    const gems  = fmt(state.resources.gems);
    const stage = String(state.stage.current);
    const hp    = state.battle.monsterCurrentHp;
    const maxHp = state.battle.monsterMaxHp;
    const hpPct = (hp / maxHp) * 100;
    const dps   = fmtRate(BattleEngine.calculateAutoDps());
    const tap   = fmt(BattleEngine.calculateTapDamage());
    const kills = `${state.stage.killCount}/${state.stage.killsPerStage}`;

    if (gold  !== prevVals.gold)  { e.gold.textContent  = gold;  prevVals.gold  = gold; }
    if (mana  !== prevVals.mana)  { e.mana.textContent  = mana;  prevVals.mana  = mana; }
    if (gems  !== prevVals.gems)  { e.gems.textContent  = gems;  prevVals.gems  = gems; }
    if (stage !== prevVals.stage) { e.stage.textContent = stage; prevVals.stage = stage; }
    if (dps   !== prevVals.dps)   { e.autoDps.textContent = dps; prevVals.dps   = dps; }
    if (tap   !== prevVals.tap)   { e.tapDmg.textContent  = tap; prevVals.tap   = tap; }
    if (kills !== prevVals.kills) { e.kills.textContent   = kills; prevVals.kills = kills; }

    // HP bar
    const hpPctStr = hpPct.toFixed(2) + '%';
    if (hpPctStr !== prevVals.hpPct) {
      e.hpFill.style.width = hpPctStr;
      // Color: green → yellow → red
      const color = hpPct > 50 ? '#22c55e' : hpPct > 25 ? '#eab308' : '#ef4444';
      e.hpFill.style.background = color;
      prevVals.hpPct = hpPctStr;
    }

    const hpText = `${fmt(hp)} / ${fmt(maxHp)}`;
    if (hpText !== prevVals.hpText) { e.hpText.textContent = hpText; prevVals.hpText = hpText; }

    // Boss timer
    if (state.battle.isBossActive) {
      const secs = Math.ceil(state.battle.bossTimeLeft);
      const secsStr = `${secs}s`;
      e.bossTimerWrap.classList.remove('hidden');
      if (secsStr !== prevVals.bossTimer) { e.bossTimer.textContent = secsStr; prevVals.bossTimer = secsStr; }
      e.bossTimer.style.color = secs <= 10 ? '#ef4444' : '#f5c842';
    } else {
      e.bossTimerWrap.classList.add('hidden');
    }
  },
};
