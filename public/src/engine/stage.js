// Stage progression engine — manages monster spawning, boss triggers, stage advancement
import { state } from '../state.js';
import { CONFIG } from '../config.js';
import { monsterHp, bossHp, goldReward, manaReward, bossReward, isBossTrigger, zoneName } from '../data/stages.js';
import { getMonsterForStage, getBossForStage } from '../data/monsters.js';
import { upgradeMultiplier } from '../data/upgrades.js';
import { CHARACTERS } from '../data/characters.js';
import { fmt } from './numbers.js';
import { templateEngine } from '../data/template-engine.js';

export const StageEngine = {
  /**
   * Called by BattleEngine when the current monster dies.
   */
  onMonsterKilled() {
    if (state.battle.isBossActive) {
      // Boss was defeated
      this.onBossDefeated();
      return;
    }

    // Award gold and mana
    this._awardNormalKillRewards();

    // Increment kill counter
    state.stage.killCount++;

    // Check if boss should spawn
    if (isBossTrigger(state.stage.killCount, state.stage.killsPerStage)) {
      this._triggerBoss();
    } else {
      this._spawnNormalMonster();
    }
  },

  /**
   * Player wins the boss fight.
   */
  onBossDefeated() {
    const { gold, mana } = bossReward(state.stage.current);
    const goldMult = this._goldMultiplier();
    const manaMult = this._manaMultiplier();

    state.resources.gold += gold * goldMult;
    state.resources.mana += mana * manaMult;
    state.stats.totalGoldEarned = (state.stats.totalGoldEarned ?? 0) + gold * goldMult;
    state.stats.totalBossesDefeated = (state.stats.totalBossesDefeated ?? 0) + 1;

    this._advanceStage();
  },

  /**
   * Boss timer ran out — boss escapes, stay on current stage.
   */
  onBossEscaped() {
    state.battle.isBossActive = false;
    state.stage.killCount = 0;

    import('../ui/modals.js').then(({ Modals }) => Modals.showBossEscaped());
    this._spawnNormalMonster();
  },

  // ─── Private helpers ─────────────────────────────────────────────────────

  _spawnNormalMonster() {
    const monster = getMonsterForStage(state.stage.current);
    const hp = monsterHp(state.stage.current);

    state.battle.monsterCurrentHp = hp;
    state.battle.monsterMaxHp = hp;
    state.battle.monsterId = monster.id;
    state.battle.monsterName = monster.name;
    state.battle.monsterEmoji = monster.emoji;
    state.battle.isBossActive = false;

    this._updateBattleUI(monster.id, monster.emoji, monster.name, false);
  },

  _triggerBoss() {
    const boss = getBossForStage(state.stage.current);
    const hp = bossHp(state.stage.current);

    state.battle.monsterCurrentHp = hp;
    state.battle.monsterMaxHp = hp;
    state.battle.monsterId = boss.id;
    state.battle.monsterName = boss.name;
    state.battle.monsterEmoji = boss.emoji;
    state.battle.isBossActive = true;
    state.battle.bossTimeLeft = CONFIG.BOSS_TIMER_SECONDS;

    this._updateBattleUI(boss.id, boss.emoji, boss.name, true);

    import('../ui/modals.js').then(({ Modals }) => Modals.showBossWarning(boss));
  },

  _advanceStage() {
    const prevStage = state.stage.current;
    state.stage.current++;
    state.stage.killCount = 0;
    state.stage.highestStage = Math.max(state.stage.highestStage, state.stage.current);
    state.stats.totalStagesCleared = (state.stats.totalStagesCleared ?? 0) + 1;

    import('../ui/modals.js').then(({ Modals }) =>
      Modals.showStageClear(prevStage, state.stage.current),
    );

    this._spawnNormalMonster();
    this._updateZone();
  },

  _awardNormalKillRewards() {
    const gold = goldReward(state.stage.current) * this._goldMultiplier();
    const mana = manaReward(state.stage.current) * this._manaMultiplier();
    state.resources.gold += gold;
    state.resources.mana += mana;
    state.stats.totalGoldEarned = (state.stats.totalGoldEarned ?? 0) + gold;
  },

  _goldMultiplier() {
    let m = upgradeMultiplier('gold_bonus', state.upgrades.gold_bonus ?? 0);
    for (const [charId, cs] of Object.entries(state.characters)) {
      if (!cs.unlocked) continue;
      const def = CHARACTERS[charId];
      if (def?.passiveBonus?.type === 'goldMultiplier') m += def.passiveBonus.value;
    }
    return m;
  },

  _manaMultiplier() {
    let m = upgradeMultiplier('mana_well', state.upgrades.mana_well ?? 0);
    for (const [charId, cs] of Object.entries(state.characters)) {
      if (!cs.unlocked) continue;
      const def = CHARACTERS[charId];
      if (def?.passiveBonus?.type === 'manaMultiplier') m += def.passiveBonus.value;
    }
    return m;
  },

  _updateBattleUI(monsterId, emoji, name, isBoss) {
    const nameEl = document.getElementById('monster-name');
    const emojiEl = document.getElementById('monster-fallback');
    const imgEl = document.getElementById('monster-img');
    const bossEl = document.getElementById('boss-timer');

    if (nameEl) nameEl.textContent = name;
    if (emojiEl) emojiEl.textContent = emoji;
    if (bossEl) bossEl.classList.toggle('hidden', !isBoss);

    if (imgEl && emojiEl) {
      templateEngine.applyImage(imgEl, emojiEl, 'monster_art', monsterId);
    }
  },

  _updateZone() {
    const el = document.getElementById('zone-name');
    if (el) el.textContent = zoneName(state.stage.current);
  },
};
