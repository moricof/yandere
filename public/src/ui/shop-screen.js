// Upgrade Shop screen — purchase gold-based upgrades
import { state } from '../state.js';
import { UPGRADES, UPGRADE_LIST, upgradeCost, upgradeMultiplier } from '../data/upgrades.js';
import { fmt } from '../engine/numbers.js';
import { Modals } from './modals.js';

export const ShopScreen = {
  init() {},

  render() {
    const list = document.getElementById('upgrades-list');
    if (!list) return;

    list.innerHTML = '';
    for (const upgrade of UPGRADE_LIST) {
      list.appendChild(this._buildRow(upgrade));
    }
  },

  _buildRow(upgrade) {
    const level = state.upgrades[upgrade.id] ?? 0;
    const isMax = level >= upgrade.maxLevel;
    const cost = upgradeCost(upgrade.id, level);
    const canBuy = !isMax && state.resources.gold >= cost;
    const currentMult = (upgradeMultiplier(upgrade.id, level) - 1) * 100;
    const nextMult = isMax ? currentMult : (upgradeMultiplier(upgrade.id, level + 1) - 1) * 100;

    const row = document.createElement('div');
    row.className = 'upgrade-row';

    row.innerHTML = `
      <div class="upgrade-icon">${upgrade.icon}</div>
      <div class="upgrade-info">
        <div class="upgrade-name">${upgrade.name}
          <span class="upgrade-level">${isMax ? 'MAX' : `Lv ${level}`}</span>
        </div>
        <div class="upgrade-desc">${upgrade.description}</div>
        <div class="upgrade-effect">
          Current: <span class="eff-val">+${currentMult.toFixed(0)}%</span>
          ${!isMax ? `→ <span class="eff-next">+${nextMult.toFixed(0)}%</span>` : ''}
        </div>
      </div>
      <div class="upgrade-buy">
        ${isMax
          ? '<div class="upgrade-maxed">✦ MAX</div>'
          : `<button class="upgrade-btn ${canBuy ? '' : 'disabled'}" data-id="${upgrade.id}">
               <span class="buy-label">Upgrade</span>
               <span class="buy-cost">✦ ${fmt(cost)}</span>
             </button>`}
      </div>
    `;

    const btn = row.querySelector('.upgrade-btn');
    if (btn) {
      btn.addEventListener('click', () => this._purchase(upgrade.id));
    }

    return row;
  },

  _purchase(upgradeId) {
    const upgrade = UPGRADES[upgradeId];
    if (!upgrade) return;

    const level = state.upgrades[upgradeId] ?? 0;
    if (level >= upgrade.maxLevel) { Modals.showToast('Already at max level!', 'info'); return; }

    const cost = upgradeCost(upgradeId, level);
    if (state.resources.gold < cost) {
      Modals.showToast(`Need ${fmt(cost)} Gold`, 'warning');
      return;
    }

    state.resources.gold -= cost;
    state.upgrades[upgradeId] = level + 1;
    this.render(); // Refresh list with new costs
    Modals.showToast(`${upgrade.name} upgraded to Lv ${level + 1}!`, 'success');
  },
};
