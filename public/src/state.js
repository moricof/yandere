// Global game state — single mutable object imported by all systems
// All reads/writes go through this object directly.
// The SaveSystem is responsible for persistence.

export const state = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  session: {
    userId: null,
    token: null,
    isOnline: navigator.onLine,
  },

  // ─── Resources ───────────────────────────────────────────────────────────
  resources: {
    gold: 0,
    mana: 300,
    gems: 10,
  },

  // ─── Stage & Kill Tracking ────────────────────────────────────────────────
  stage: {
    current: 1,
    killCount: 0,
    killsPerStage: 10,
    highestStage: 1,
  },

  // ─── Active Battle ────────────────────────────────────────────────────────
  battle: {
    monsterCurrentHp: 100,
    monsterMaxHp: 100,
    monsterId: 'corrupted_sprite',
    monsterName: 'Corrupted Sprite',
    monsterEmoji: '👾',
    isBossActive: false,
    bossTimeLeft: 30,
    isPaused: false,
  },

  // ─── Characters { [charId]: { level, ascensionShards, unlocked } } ────────
  characters: {},

  // ─── Upgrades { [upgradeId]: level } ─────────────────────────────────────
  upgrades: {},

  // ─── Offline Gold ─────────────────────────────────────────────────────────
  offline: {
    lastSaveTime: Date.now(),
    maxOfflineHours: 8,
    pendingGold: 0,   // Set by OfflineSystem on load, cleared after claim
  },

  // ─── Gacha UI State ───────────────────────────────────────────────────────
  gacha: {
    pityCounter: 0,
    recentPulls: [],  // Last 20 pull results for history display
    pendingResults: null, // Set when waiting to show result modal
  },

  // ─── Cumulative Stats (for display / milestones) ──────────────────────────
  stats: {
    totalGoldEarned: 0,
    totalPulls: 0,
    totalDamageDealt: 0,
    totalBossesDefeated: 0,
    totalStagesCleared: 0,
  },

  // ─── UI ───────────────────────────────────────────────────────────────────
  ui: {
    activeScreen: 'battle',    // 'battle' | 'maidens' | 'gacha' | 'shop'
    modalOpen: null,           // null | 'gacha-result' | 'boss' | 'stage-clear' | 'offline' | 'settings'
    isLoading: true,
  },

  // ─── Settings ─────────────────────────────────────────────────────────────
  settings: {
    soundEnabled: true,
    notificationsEnabled: false,
    volume: 0.8,
  },

  // ─── Version (for migration) ──────────────────────────────────────────────
  version: 1,
};

/**
 * Merges a plain object (e.g. from cloud save) into state.
 * Preserves session fields which are runtime-only.
 */
export function mergeState(saved) {
  const session = { ...state.session };
  const ui = { ...state.ui };

  const SKIP = new Set(['session', 'ui', 'offline']); // offline.pendingGold set separately
  for (const [key, value] of Object.entries(saved)) {
    if (SKIP.has(key)) continue;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      state[key] = { ...(state[key] ?? {}), ...value };
    } else {
      state[key] = value;
    }
  }

  state.session = session;
  state.ui = ui;
  if (saved.offline) {
    state.offline.lastSaveTime = saved.offline.lastSaveTime ?? Date.now();
    state.offline.maxOfflineHours = saved.offline.maxOfflineHours ?? 8;
    // pendingGold is set by OfflineSystem after calculation, not loaded from save
  }
}

/**
 * Returns a serializable snapshot of state (excludes runtime-only fields).
 */
export function serializeState() {
  const { session, ui, ...rest } = state; // eslint-disable-line no-unused-vars
  return {
    ...rest,
    offline: {
      lastSaveTime: Date.now(), // Always update to now when saving
      maxOfflineHours: state.offline.maxOfflineHours,
    },
  };
}
