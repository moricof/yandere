/**
 * script.js — The Cage of Obsession  |  FREAKS TOKYO INC.
 * =========================================================
 * Contains two systems in one file:
 *
 *  1. UI NAVIGATION  — manages which screen is visible,
 *     renders the album card grid, updates progress charts, etc.
 *
 *  2. DIALOGUE ENGINE — runs the visual novel gameplay:
 *     typewriter text, character sprites, scene branching.
 *
 * HOW TO ADD YOUR OWN STORY:
 *   Edit  data/scenario.js  — no changes needed in this file
 *   for writing dialogue or branching paths.
 */

'use strict';


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — HEROINE REGISTRY
   Central data about each playable heroine. This is the UI layer's version;
   the full character data (dialogue expressions, etc.) lives in scenario.js.
   ═══════════════════════════════════════════════════════════════════════════ */

const HEROINE_DATA = {
  himari: {
    id          : 'himari',
    nameJP      : '英華 陽葵',
    nameEN      : 'Himari Eika',
    title       : 'The Possessive Queen',
    kanji       : '英',
    colorVar    : '--himari',          // CSS custom property name
    colorValue  : '#d42848',           // Actual hex (for SVG/canvas use)
    colorLight  : '#f05070',
    colorGrad   : 'radial-gradient(ellipse at 40% 15%, #c03050 0%, #6a0f20 45%, #120408 100%)',
    bgGrad      : 'radial-gradient(ellipse at 50% 20%, rgba(180,30,60,0.40) 0%, transparent 65%)',
    startScene  : 'himari_ch1_start',   // Scene ID in scenario.js to load for this heroine
    chapters    : [
      { id: 1, name: 'The Invitation',        free: true,  endingCount: 10 },
      { id: 2, name: 'The Gilded Cage',        free: false, endingCount: 5  },
      { id: 3, name: 'Behind Closed Doors',   free: false, endingCount: 5  },
      { id: 4, name: 'Unbreakable Chains',    free: false, endingCount: 5  },
      { id: 5, name: 'Complete Ownership',    free: false, endingCount: 10 },
    ],
  },
  shizuku: {
    id          : 'shizuku',
    nameJP      : '清滝 雫',
    nameEN      : 'Shizuku Kiyotaki',
    title       : 'The Dependent Tragedy',
    kanji       : '清',
    colorVar    : '--shizuku',
    colorValue  : '#5aaad0',
    colorLight  : '#88ccee',
    colorGrad   : 'radial-gradient(ellipse at 45% 20%, #3a90c8 0%, #143858 45%, #060c18 100%)',
    bgGrad      : 'radial-gradient(ellipse at 50% 20%, rgba(60,140,200,0.35) 0%, transparent 65%)',
    startScene  : 'shizuku_ch1_start',
    chapters    : [
      { id: 1, name: 'Fragile Threads',       free: true,  endingCount: 10 },
      { id: 2, name: 'Drowning Together',     free: false, endingCount: 5  },
      { id: 3, name: 'The Abyss Beckons',     free: false, endingCount: 5  },
      { id: 4, name: 'Mutual Ruin',           free: false, endingCount: 5  },
      { id: 5, name: 'Sweet Collapse',        free: false, endingCount: 10 },
    ],
  },
  reina: {
    id          : 'reina',
    nameJP      : '葛葉 怜奈',
    nameEN      : 'Reina Kuzuba',
    title       : 'The Controlling Strategist',
    kanji       : '葛',
    colorVar    : '--reina',
    colorValue  : '#8840cc',
    colorLight  : '#aa66ee',
    colorGrad   : 'radial-gradient(ellipse at 45% 15%, #7030b8 0%, #320868 45%, #08040e 100%)',
    bgGrad      : 'radial-gradient(ellipse at 50% 20%, rgba(100,50,180,0.40) 0%, transparent 65%)',
    startScene  : 'reina_ch1_start',
    chapters    : [
      { id: 1, name: 'Under Observation',     free: true,  endingCount: 10 },
      { id: 2, name: 'The Perfect Record',    free: false, endingCount: 5  },
      { id: 3, name: 'Permitted Hours',       free: false, endingCount: 5  },
      { id: 4, name: 'The Underground Suite', free: false, endingCount: 5  },
      { id: 5, name: 'Absolute Control',      free: false, endingCount: 10 },
    ],
  },
  mei: {
    id          : 'mei',
    nameJP      : '桃園 芽衣',
    nameEN      : 'Mei Momozono',
    title       : 'The Innocent Destroyer',
    kanji       : '桃',
    colorVar    : '--mei',
    colorValue  : '#f04898',
    colorLight  : '#ff80c0',
    colorGrad   : 'radial-gradient(ellipse at 40% 15%, #d83888 0%, #6a1050 45%, #100210 100%)',
    bgGrad      : 'radial-gradient(ellipse at 50% 20%, rgba(200,50,130,0.40) 0%, transparent 65%)',
    startScene  : 'mei_ch1_start',
    chapters    : [
      { id: 1, name: 'My Favorite Toy',       free: true,  endingCount: 10 },
      { id: 2, name: 'Wind-Up Heart',          free: false, endingCount: 5  },
      { id: 3, name: 'Broken Pieces',         free: false, endingCount: 5  },
      { id: 4, name: 'The Collector\'s Room', free: false, endingCount: 5  },
      { id: 5, name: 'Forever and Ever',      free: false, endingCount: 10 },
    ],
  },
};


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — UI STATE
   The single source of truth for what's currently displayed.
   Never read the DOM to understand game state — read this object.
   ═══════════════════════════════════════════════════════════════════════════ */

const UIState = {
  screen        : 'screen-loading',   // Currently visible screen ID
  history       : [],                  // Navigation history stack for back button
  heroine       : null,                // Currently selected heroine ID (e.g. 'himari')
  chapter       : 1,                   // Currently selected chapter number
  progress      : {},                  // { heroineId: { chNum: [true,false,...] } }
  playerName    : 'Player',            // Set during name-input step
  prologueDone  : false,               // True after prologue completes once
  forcedIntro   : false,               // True during the forced Himari Ch1 first-run
};


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — UI NAVIGATION
   All screen transitions go through UI.goTo().
   ═══════════════════════════════════════════════════════════════════════════ */

const UI = {

  /**
   * goTo — Transition from any screen to the target screen.
   *
   * @param {string} targetId  - The HTML element ID of the target screen.
   * @param {Object} [opts]    - Optional: { heroine, chapter, pushHistory }
   */
  goTo(targetId, opts = {}) {
    const currentEl = document.getElementById(UIState.screen);
    const targetEl  = document.getElementById(targetId);
    if (!targetEl) {
      console.warn(`[UI] Screen not found: "${targetId}"`);
      return;
    }

    // Push current screen to history unless told not to
    if (opts.pushHistory !== false && UIState.screen !== 'screen-loading') {
      UIState.history.push(UIState.screen);
    }

    // Fade out current screen
    if (currentEl) {
      currentEl.classList.remove('active');
    }

    // Short delay so the fade has time to run
    setTimeout(() => {
      UIState.screen = targetId;

      // Run any setup logic for the target screen
      if (opts.heroine)  UIState.heroine = opts.heroine;
      if (opts.chapter)  UIState.chapter = opts.chapter;

      if (targetId === 'screen-album')  renderAlbum(UIState.heroine);
      if (targetId === 'screen-result') renderResult(opts.endingData || null);

      targetEl.classList.add('active');
    }, 320);  // Half of --t-slow (600ms) so screens don't both show at once
  },

  /** back — Navigate to the previous screen in the history stack. */
  back() {
    const prev = UIState.history.pop();
    if (prev) {
      this.goTo(prev, { pushHistory: false });
    } else {
      this.goTo('screen-home', { pushHistory: false });
    }
  },

  /**
   * openAlbum — Open the album/collection screen for a specific heroine.
   * Called from heroine card buttons and character select "Enter" buttons.
   *
   * @param {string} heroineId - e.g. 'himari'
   */
  openAlbum(heroineId) {
    if (!HEROINE_DATA[heroineId]) {
      console.warn(`[UI] Unknown heroine: "${heroineId}"`);
      return;
    }
    this.goTo('screen-album', { heroine: heroineId, chapter: 1 });
  },

  /** startDialogue — Enter the gameplay screen for the selected heroine + chapter. */
  startDialogue() {
    const h = UIState.heroine;
    if (!h) { console.warn('[UI] No heroine selected.'); return; }
    const heroineData = HEROINE_DATA[h];

    // Start the dialogue engine (game engine section below)
    loadStats();
    Engine.start(heroineData.startScene, h);

    this.goTo('screen-dialogue', { pushHistory: true });
  },

  /**
   * showResult — Show the ending reveal card after completing a route.
   *
   * @param {Object} endingData - { endingName, rarity: 'normal'|'rare'|'true', endingIndex }
   */
  showResult(endingData) {
    this.goTo('screen-result', { endingData, pushHistory: false });
  },
};


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — ALBUM SCREEN RENDERING
   Everything needed to display the album screen for a given heroine.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * renderAlbum — Fully populates the album screen with data for heroineId.
 * Called every time screen-album becomes active.
 *
 * @param {string} heroineId - The heroine whose album to show.
 */
function renderAlbum(heroineId) {
  const h = HEROINE_DATA[heroineId];
  if (!h) return;

  // ── Update heroine identity ──────────────────────────────────────────────
  document.getElementById('album-name-jp').textContent = h.nameJP;
  document.getElementById('album-name-en').textContent = h.nameEN;

  // ── Tint the background for this heroine ──────────────────────────────────
  const albumBg = document.getElementById('album-bg');
  albumBg.style.background = h.bgGrad;

  // ── Tint the progress chart ring ─────────────────────────────────────────
  const chartRing = document.getElementById('chart-progress-ring');
  chartRing.style.stroke = h.colorLight;

  // ── Tint the play button ──────────────────────────────────────────────────
  const playBtn = document.getElementById('play-btn');
  const chap = h.chapters.find(c => c.id === UIState.chapter) || h.chapters[0];
  playBtn.style.background = `linear-gradient(135deg, ${h.colorValue}, ${h.colorGrad.match(/#[a-f0-9]{6}/gi)?.[1] || '#1a0010'})`;
  playBtn.style.boxShadow  = `0 0 24px ${h.colorValue}55, 0 4px 16px rgba(0,0,0,0.5)`;

  // Update play button text
  document.getElementById('play-btn-main').textContent = `PLAY CHAPTER ${UIState.chapter}`;
  document.getElementById('play-btn-sub').textContent  = chap.free ? 'Free to Play' : 'Premium Chapter';

  // ── Update chapter tabs ───────────────────────────────────────────────────
  const progress    = UIState.progress[heroineId] || {};
  const tabs        = document.getElementById('chapter-tabs');
  tabs.querySelectorAll('.ch-tab').forEach((tab) => {
    const ch = parseInt(tab.dataset.ch, 10);
    tab.classList.remove('active', 'locked');

    // Chapter N+1 is available only after any ending in chapter N is completed
    const prevChProgress = progress[ch - 1] || [];
    const prevChComplete = ch === 1 || prevChProgress.some(Boolean);

    if (ch === UIState.chapter) {
      tab.classList.add('active');
    } else if (!prevChComplete && ch > 1) {
      tab.classList.add('locked');
    }

    // Tab click — switch to that chapter
    tab.onclick = () => {
      if (tab.classList.contains('locked')) return;
      UIState.chapter = ch;
      renderAlbum(heroineId);    // Re-render for new chapter
    };
  });

  // ── Render ending card grid ───────────────────────────────────────────────
  buildCardGrid(heroineId, UIState.chapter);

  // ── Update progress chart ─────────────────────────────────────────────────
  const chapProgress     = progress[UIState.chapter] || new Array(chap.endingCount).fill(false);
  const unlockedCount    = chapProgress.filter(Boolean).length;
  const totalCount       = chap.endingCount;
  const pct              = Math.round((unlockedCount / totalCount) * 100);

  updateProgressChart(pct, unlockedCount, totalCount);
}

/**
 * buildCardGrid — Generates 10 ending card slot elements.
 * Locked slots show a lock icon; unlocked slots show ending info.
 *
 * @param {string} heroineId - Heroine ID
 * @param {number} chapter   - Chapter number (1–5)
 */
function buildCardGrid(heroineId, chapter) {
  const grid      = document.getElementById('ending-grid');
  const h         = HEROINE_DATA[heroineId];
  const chap      = h.chapters.find(c => c.id === chapter) || h.chapters[0];
  const progress  = (UIState.progress[heroineId] || {})[chapter] || [];

  grid.innerHTML = '';   // Clear previous cards

  // Example ending names — in production these come from scenario.js
  const endingNames = [
    'Devoted Servant',      'The Perfect Cage',     'Sweet Submission',
    'Shattered Resistance', 'Gilded Prison',         'Midnight Vow',
    'The Last Defiance',    'Broken Wings',          'Eternal Leash',
    'Complete Ownership',   // Slot 10 — often True Ending
  ];

  for (let i = 0; i < chap.endingCount; i++) {
    const slot      = document.createElement('div');
    const isUnlocked = progress[i] === true;

    if (isUnlocked) {
      // Determine rarity: last card is True Ending, every 3rd is Rare
      const rarity = (i === chap.endingCount - 1) ? 'true'
                   : (i % 3 === 2)                ? 'rare'
                   : 'normal';

      slot.className = `ending-card unlocked unlocked-${rarity}`;
      slot.innerHTML = `
        <div class="ending-card-bg" style="background:${h.colorGrad}"></div>
        ${rarity !== 'normal' ? '<div class="holo-sheen"></div>' : ''}
        <div class="ending-card-label">${endingNames[i] || `Ending ${i + 1}`}</div>
      `;
    } else {
      slot.className = 'ending-card locked';
      slot.innerHTML = `
        <div class="ending-card-lock">
          <span class="ending-card-lock-icon">🔒</span>
          <span class="ending-card-lock-num">${i + 1}</span>
        </div>
      `;
    }

    grid.appendChild(slot);
  }
}

/**
 * updateProgressChart — Animates the SVG ring and number display.
 *
 * @param {number} pct         - 0–100
 * @param {number} unlocked    - Count of unlocked endings
 * @param {number} total       - Total endings in this chapter
 */
function updateProgressChart(pct, unlocked, total) {
  // SVG circumference for r=50: 2 * π * 50 = 314.16
  const circumference = 314.16;
  const offset        = circumference * (1 - pct / 100);

  document.getElementById('chart-progress-ring').style.strokeDashoffset = offset;
  document.getElementById('chart-pct-num').textContent                  = pct;
  document.getElementById('album-endings-count').textContent            = `${unlocked} / ${total} Endings Collected`;

  // At 100%, turn the ring gold
  const ring = document.getElementById('chart-progress-ring');
  if (pct === 100) {
    ring.style.stroke = '#e8c870';
    document.getElementById('chart-pct-num').style.color = '#e8c870';
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — RESULT SCREEN RENDERING
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * renderResult — Populates the ending reveal screen.
 *
 * @param {Object|null} endingData - { endingName, rarity, index }
 */
function renderResult(endingData) {
  const h = UIState.heroine ? HEROINE_DATA[UIState.heroine] : HEROINE_DATA.himari;

  const ending = endingData || {
    endingName : 'Complete Ownership',
    rarity     : 'rare',
    index      : 0,
  };

  // Update the card portrait
  document.getElementById('result-portrait-bg').style.background = h.colorGrad;
  document.getElementById('result-portrait-kanji').textContent   = h.kanji;

  // Update text fields
  document.getElementById('result-card-heroine').textContent  = h.nameEN;
  document.getElementById('result-card-ending').textContent   = ending.endingName;
  document.getElementById('result-heroine-label').textContent = h.nameEN;
  document.getElementById('result-ending-label').textContent  = ending.endingName;

  // Rarity label
  const rarityMap = { normal: '◆ Normal Ending', rare: '★ Rare Ending', true: '✦ True Ending' };
  document.getElementById('result-rarity').textContent = rarityMap[ending.rarity] || '';

  // Serial number (placeholder — will use Supabase counter in production)
  const serial = String(Math.floor(Math.random() * 9999) + 1).padStart(6, '0');
  document.getElementById('result-serial').textContent = `#${serial}`;

  // Apply heroine color to card border
  const rarity = ending.rarity || 'normal';
  const card = document.getElementById('result-card');
  if (rarity === 'true') {
    card.style.borderColor = 'rgba(196,160,80,0.70)';
    card.style.boxShadow   = `0 12px 40px rgba(0,0,0,0.60), 0 0 32px rgba(196,160,80,0.35)`;
  } else if (rarity === 'rare') {
    card.style.borderColor = 'rgba(180,100,255,0.60)';
    card.style.boxShadow   = `0 12px 40px rgba(0,0,0,0.60), 0 0 20px rgba(180,100,255,0.30)`;
  } else {
    card.style.borderColor = `${h.colorValue}55`;
    card.style.boxShadow   = `0 12px 40px rgba(0,0,0,0.60), 0 0 16px ${h.colorValue}22`;
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — PROGRESS PERSISTENCE
   Player progress is stored in localStorage so it survives page reloads.
   ═══════════════════════════════════════════════════════════════════════════ */

/** loadProgress — Reads saved progress from localStorage. */
function loadProgress() {
  try {
    const saved = localStorage.getItem('cage_progress');
    if (saved) UIState.progress = JSON.parse(saved);
  } catch (e) {
    UIState.progress = {};
  }
}

/** saveProgress — Writes current progress to localStorage. */
function saveProgress() {
  try {
    localStorage.setItem('cage_progress', JSON.stringify(UIState.progress));
  } catch (e) {
    console.warn('[UI] Could not save progress.');
  }
}

/**
 * unlockEnding — Marks a specific ending as collected.
 *
 * @param {string} heroineId   - Heroine ID
 * @param {number} chapter     - Chapter number
 * @param {number} endingIndex - Index of the ending (0-based)
 */
function unlockEnding(heroineId, chapter, endingIndex) {
  if (!UIState.progress[heroineId]) UIState.progress[heroineId] = {};
  const chap = UIState.progress[heroineId][chapter];
  if (!chap) UIState.progress[heroineId][chapter] = [];
  UIState.progress[heroineId][chapter][endingIndex] = true;
  saveProgress();
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — HOME SCREEN CARD PROGRESS RINGS
   Updates the small completion rings on the home screen cards.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * updateHomeRings — Updates all four heroine card progress rings.
 * Called after loading progress and whenever progress changes.
 */
function updateHomeRings() {
  Object.keys(HEROINE_DATA).forEach((heroineId) => {
    const card   = document.querySelector(`.heroine-card[data-id="${heroineId}"]`);
    if (!card) return;

    const ring   = card.querySelector('.ring-prog');
    const pctEl  = card.querySelector('.hc-pct');
    const infoEl = card.querySelector('.hc-chapter-info');
    if (!ring) return;

    // Count total endings across chapter 1 (the free chapter — shown on home card)
    const chap1Data = (UIState.progress[heroineId] || {})[1] || [];
    const total   = HEROINE_DATA[heroineId].chapters[0].endingCount;
    const unlocked = chap1Data.filter(Boolean).length;
    const pct     = Math.round((unlocked / total) * 100);

    // SVG: circumference of r=16 = 2*π*16 = 100.53
    const circumference = 100.53;
    const offset        = circumference * (1 - pct / 100);
    ring.style.strokeDashoffset = offset;

    if (pctEl)  pctEl.textContent  = `${pct}%`;
    if (infoEl) infoEl.textContent = `Ch.1 · ${unlocked} / ${total}`;
  });

  // Also check whether secret heroines should be revealed
  checkSecretUnlocks();
}

/**
 * checkSecretUnlocks — Reveals the two secret heroine slots and the Final
 * Chapter teaser once all four main heroines' True Endings are cleared.
 * True Ending for each heroine is endingIndex 43 in Chapter 5.
 */
function checkSecretUnlocks() {
  const heroines = ['himari', 'shizuku', 'reina', 'mei'];
  const allTrue  = heroines.every(h => {
    const ch5 = (UIState.progress[h] || {})[5] || [];
    return ch5[43] === true;
  });

  const slot1 = document.getElementById('secret-slot-1');
  const slot2 = document.getElementById('secret-slot-2');
  const fct   = document.getElementById('final-chapter-teaser');

  if (!slot1 || !slot2) return;

  if (allTrue) {
    slot1.classList.remove('hs-locked');
    slot1.classList.add('hs-unlocked');
    slot2.classList.remove('hs-locked');
    slot2.classList.add('hs-unlocked');
    if (fct) fct.classList.add('fct-unlocked');

    // Update hint text for the unlocked slots
    const c1 = document.getElementById('secret-condition-1');
    const c2 = document.getElementById('secret-condition-2');
    if (c1) c1.textContent = 'A new obsession has awakened…';
    if (c2) c2.textContent = 'She was watching the whole time…';
  }
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — HOME SCREEN NAVIGATION
   Wire up the heroine card tap handlers on the home screen.
   ═══════════════════════════════════════════════════════════════════════════ */

function initHomeCards() {
  document.querySelectorAll('.heroine-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (id) UI.openAlbum(id);
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9 — LOADING SCREEN ANIMATION
   Animates the progress bar and then auto-transitions to the home screen.
   ═══════════════════════════════════════════════════════════════════════════ */

const LOADING_HINTS = [
  'Entering the Academy…',
  'The invitation has arrived…',
  'She is waiting for you…',
  'Checking the lock on the gate…',
  'Do not keep her waiting…',
];

function animateLoadingBar(onComplete) {
  const bar   = document.getElementById('loading-bar-fill');
  const hint  = document.getElementById('loading-hint');
  const total = 2600;  // Total loading animation time in ms
  const start = Date.now();

  // Cycle through hint messages
  let hintIndex = 0;
  const hintInterval = setInterval(() => {
    hintIndex = (hintIndex + 1) % LOADING_HINTS.length;
    hint.textContent = LOADING_HINTS[hintIndex];
  }, 600);

  // Animate the bar width from 0% to 100%
  function step() {
    const elapsed = Date.now() - start;
    const pct     = Math.min((elapsed / total) * 100, 100);
    bar.style.width = `${pct}%`;

    if (pct < 100) {
      requestAnimationFrame(step);
    } else {
      clearInterval(hintInterval);
      hint.textContent = 'Welcome.';
      // Short pause at 100% before transitioning
      setTimeout(onComplete, 450);
    }
  }

  requestAnimationFrame(step);
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 10 — DIALOGUE ENGINE
   The visual novel engine — types text, shows characters, handles choices.
   (Preserved from original script.js, adapted for the new screen structure.)
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Engine State ─────────────────────────────────────────────────────────────
const EngineState = {
  currentScene    : null,
  stepIndex       : 0,
  isTyping        : false,
  waitingForInput : false,
  activeSprites   : {},     // { characterId: HTMLElement }
  stats           : {},     // Player stat values (affection, fear, etc.)
  currentEnding   : null,   // Set when an 'end' step with ending data is processed
};

// ── DOM References for Dialogue Screen ───────────────────────────────────────
// (Grabbed lazily on first use so they're safe to call before the screen loads)
const D = {
  get bgLayer()         { return document.getElementById('bg-layer'); },
  get charLayer()       { return document.getElementById('character-layer'); },
  get dialogueBox()     { return document.getElementById('dialogue-box'); },
  get charName()        { return document.getElementById('character-name'); },
  get namePlate()       { return document.getElementById('name-plate'); },
  get dialogueText()    { return document.getElementById('dialogue-text'); },
  get nextIndicator()   { return document.getElementById('next-indicator'); },
  get choiceContainer() { return document.getElementById('choice-container'); },
  get endCard()         { return document.getElementById('end-card'); },
  get chapterTitle()    { return document.getElementById('chapter-title'); },
};

// ── Engine API ────────────────────────────────────────────────────────────────
const Engine = {
  /**
   * start — Begins playing a scene. Called by UI.startDialogue().
   *
   * @param {string} sceneId   - Key from SCENES in scenario.js
   * @param {string} heroineId - Active heroine (for styling)
   */
  start(sceneId, heroineId) {
    clearAllCharacters();
    D.endCard.classList.add('hidden');
    D.choiceContainer.classList.add('hidden');
    D.dialogueBox.classList.add('hidden');
    D.bgLayer.style.backgroundImage = '';

    // Apply heroine color to name plate border
    if (heroineId && HEROINE_DATA[heroineId]) {
      D.namePlate.style.borderLeftColor = HEROINE_DATA[heroineId].colorLight;
    }

    loadScene(sceneId);
  },
};

// ── Typewriter Effect ─────────────────────────────────────────────────────────

/**
 * typeText — Types text into a DOM element, letter by letter.
 * Tap while typing → show all text immediately (via skipTyping).
 */
function typeText(element, text, onDone) {
  EngineState.isTyping = true;
  let i = 0;
  element.textContent = '';

  const speed = 35;  // ms per character (lower = faster)

  const intervalId = setInterval(() => {
    if (i < text.length) {
      element.textContent += text[i++];
    } else {
      clearInterval(intervalId);
      EngineState.isTyping     = false;
      EngineState.waitingForInput = true;
      D.nextIndicator.classList.remove('hidden');
      if (typeof onDone === 'function') onDone();
    }
  }, speed);

  typeText._cancelFn = () => {
    clearInterval(intervalId);
    element.textContent = text;
    EngineState.isTyping     = false;
    EngineState.waitingForInput = true;
    D.nextIndicator.classList.remove('hidden');
    if (typeof onDone === 'function') onDone();
    typeText._cancelFn = null;
  };
}

function skipTyping() {
  if (typeof typeText._cancelFn === 'function') typeText._cancelFn();
}

// ── Character Sprite Management ───────────────────────────────────────────────
// Delegates to CharacterSystem (engine/character-system.js).
// Functions keep their original signatures for full backward compatibility.

function showCharacter(characterId, expression, position) {
  CharacterSystem.show(characterId, expression || 'default', position);
}

function clearAllCharacters() {
  CharacterSystem.clearAll();
}

// Dim is handled internally by CharacterSystem.show() — kept as no-op for compat.
function dimInactiveCharacters(activeId) {
  // intentionally empty — CharacterSystem.show() dims all others automatically
}

// No longer needed directly — CharacterSystem handles missing assets.
function handleMissingSprite() {}

// ── Step Processing ───────────────────────────────────────────────────────────

function processStep(index) {
  const scene = SCENES[EngineState.currentScene];
  if (!scene) { console.error(`[Engine] Scene not found: "${EngineState.currentScene}"`); return; }

  if (index >= scene.steps.length) { showEndCard(); return; }

  EngineState.stepIndex       = index;
  EngineState.waitingForInput = false;
  const step = scene.steps[index];

  switch (step.type) {
    case 'bg':
      if (step.bg) BackgroundManager.set(step.bg, { fade: true });
      else BackgroundManager.clear();
      processStep(index + 1);
      break;

    case 'expression':
      showCharacter(step.character, step.expression, step.position);
      processStep(index + 1);
      break;

    case 'dialogue':
      if (step.character && step.expression) showCharacter(step.character, step.expression);
      else if (step.character) dimInactiveCharacters(step.character);
      if (step.emotion && step.character) TagVoiceSystem.play(step.character, step.emotion);
      showDialogueStep(step.character, step.text);
      break;

    case 'choice':
      D.dialogueBox.classList.add('hidden');
      D.nextIndicator.classList.add('hidden');
      showChoices(step.choices);
      break;

    case 'narration':
      showDialogueStep(null, step.text);
      break;

    case 'clear-characters':
      clearAllCharacters();
      processStep(index + 1);
      break;

    case 'name-input':
      showNameInput(step, () => processStep(index + 1));
      break;

    case 'horror':
      triggerHorrorEffect(step.effect, () => processStep(index + 1));
      break;

    case 'goto-scene':
      loadScene(step.scene);
      break;

    case 'goto-screen':
      // Mark prologue done the first time we leave the dialogue into a real screen
      if (!UIState.prologueDone) {
        UIState.prologueDone = true;
        localStorage.setItem('cage_prologue_done', 'true');
      }
      UI.goTo(step.screen, { pushHistory: false });
      break;

    case 'end':
      showEndCard(step.endingName, step.endingIndex, step.rarity);
      break;

    default:
      console.warn(`[Engine] Unknown step type: "${step.type}"`);
      processStep(index + 1);
  }
}

function showDialogueStep(characterId, text) {
  D.dialogueBox.classList.remove('hidden');
  D.choiceContainer.classList.add('hidden');
  D.nextIndicator.classList.add('hidden');

  if (characterId && CHARACTERS[characterId]) {
    const cd = CHARACTERS[characterId];
    D.namePlate.classList.remove('hidden');
    D.charName.textContent            = cd.name;
    D.charName.style.color            = cd.nameColor || '#f0c8dc';
    D.namePlate.style.borderLeftColor = cd.nameColor || '#f0c8dc';
  } else {
    D.namePlate.classList.add('hidden');
  }

  const resolved = (text || '').replace(/\{name\}/g, UIState.playerName || 'you');
  typeText(D.dialogueText, resolved);

  // Ambient horror — fires stochastically based on accumulated Fear/Dependency
  checkAmbientHorror();
}

function showChoices(choices) {
  D.choiceContainer.innerHTML = '';
  D.choiceContainer.classList.remove('hidden');

  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className   = 'choice-btn';
    btn.textContent = choice.label;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (choice.statEffect) applyStatEffect(choice.statEffect);
      D.choiceContainer.classList.add('hidden');
      loadScene(choice.nextScene);
    });

    D.choiceContainer.appendChild(btn);
  });
}

function showEndCard(endingName, endingIndex, rarity) {
  D.dialogueBox.classList.add('hidden');
  D.choiceContainer.classList.add('hidden');

  if (endingIndex !== undefined && UIState.heroine) {
    EngineState.currentEnding = {
      endingName : endingName || `Ending ${endingIndex + 1}`,
      rarity     : rarity || 'normal',
      index      : endingIndex,
    };
    unlockEnding(UIState.heroine, UIState.chapter, endingIndex);
    updateHomeRings();
  } else {
    EngineState.currentEnding = null;
  }

  // First-run forced intro: after Himari Ch1 ends, show the unlock transition screen
  if (UIState.forcedIntro) {
    UIState.forcedIntro  = false;
    UIState.prologueDone = true;
    localStorage.setItem('cage_prologue_done', 'true');
    setTimeout(() => UI.goTo('screen-unlock', { pushHistory: false }), 900);
    return;
  }

  D.endCard.classList.remove('hidden');
}

/** unlockMainMenu — Called by screen-unlock's button to enter the main game. */
function unlockMainMenu() {
  UI.goTo('screen-home', { pushHistory: false });
  setTimeout(updateHomeRings, 400);
}

// ── Name Input Modal ──────────────────────────────────────────────────────────

function showNameInput(step, onConfirm) {
  // Pause normal tap-to-advance while modal is open
  EngineState.waitingForInput = false;
  D.dialogueBox.classList.add('hidden');

  const overlay = document.createElement('div');
  overlay.id = 'name-input-overlay';
  overlay.className = 'name-input-overlay';
  overlay.innerHTML = `
    <div class="ni-box">
      <div class="ni-ornament">✦</div>
      <p class="ni-prompt">${(step.prompt || 'What is your name?').replace(/\n/g, '<br>')}</p>
      ${step.sub ? `<p class="ni-sub">${step.sub}</p>` : ''}
      <input class="ni-field" type="text" maxlength="20" placeholder="Your name…" autocomplete="off" spellcheck="false">
      <button class="ni-confirm">Confirm</button>
    </div>
  `;

  document.getElementById('screen-dialogue').appendChild(overlay);

  const input = overlay.querySelector('.ni-field');
  const btn   = overlay.querySelector('.ni-confirm');

  // Focus input after short delay (avoids iOS keyboard jank)
  setTimeout(() => input.focus(), 80);

  function confirm() {
    const val = input.value.trim();
    UIState.playerName = val || 'you';
    overlay.classList.add('ni-exit');
    setTimeout(() => {
      overlay.remove();
      if (typeof onConfirm === 'function') onConfirm();
    }, 350);
  }

  btn.addEventListener('click', confirm);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirm();
  });
}

// ── Ambient Horror System ─────────────────────────────────────────────────────
//
// Three real-time effects that fire DURING dialogue based on Fear/Dependency
// stat levels — not from explicit 'horror' steps. Effects are stochastic and
// cooldown-gated so they feel unpredictable, not scripted.
//
//  NAME SPAM   — {name} appears scattered, fading, across the screen
//                Trigger: Fear > 55  OR  Dependency > 65
//
//  UI GLITCH   — dialogue box jerks, skews, color-shifts for 0.5 s
//                Trigger: Fear > 65
//
//  HEAVY HEART — dark crimson vignette pulses in from edges for 2–3 s
//                Trigger: Dependency > 55

const AmbientHorror = {
  lastNameSpam : 0,
  lastGlitch   : 0,
  lastHeart    : 0,
  CD_NAME      : 9000,   // min ms between name-spam events
  CD_GLITCH    : 14000,  // min ms between glitch events
  CD_HEART     : 7000,   // min ms between heavy-heart events
};

function checkAmbientHorror() {
  // Only fire when the dialogue screen is visible and not in a name-input modal
  if (!document.getElementById('screen-dialogue').classList.contains('active')) return;
  if (document.getElementById('name-input-overlay')) return;

  const fear = EngineState.stats.fear       || 0;
  const dep  = EngineState.stats.dependency || 0;
  const now  = Date.now();

  // ── Name Spam ──────────────────────────────────────────────────────────────
  const nameLevel = Math.max(fear - 55, 0) + Math.max(dep - 65, 0);
  if (nameLevel > 0 && (now - AmbientHorror.lastNameSpam) > AmbientHorror.CD_NAME) {
    const chance = Math.min(nameLevel / 50, 1) * 0.42;
    if (Math.random() < chance) {
      AmbientHorror.lastNameSpam = now;
      triggerNameSpam();
    }
  }

  // ── UI Glitch ──────────────────────────────────────────────────────────────
  if (fear > 65 && (now - AmbientHorror.lastGlitch) > AmbientHorror.CD_GLITCH) {
    const chance = Math.min((fear - 65) / 35, 1) * 0.30;
    if (Math.random() < chance) {
      AmbientHorror.lastGlitch = now;
      triggerUIGlitch();
    }
  }

  // ── Heavy Heart ────────────────────────────────────────────────────────────
  if (dep > 55 && (now - AmbientHorror.lastHeart) > AmbientHorror.CD_HEART) {
    const chance = Math.min((dep - 55) / 45, 1) * 0.35;
    if (Math.random() < chance) {
      AmbientHorror.lastHeart = now;
      triggerHeavyHeart();
    }
  }
}

function triggerNameSpam() {
  const name    = UIState.playerName || 'you';
  const screen  = document.getElementById('screen-dialogue');
  const overlay = document.createElement('div');
  overlay.className = 'ambient-name-spam';

  const count = 5 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    const span      = document.createElement('span');
    span.className  = 'ns-word';
    span.textContent = name;
    span.style.top         = `${8  + Math.random() * 80}%`;
    span.style.left        = `${4  + Math.random() * 86}%`;
    span.style.fontSize    = `${0.65 + Math.random() * 1.1}rem`;
    span.style.opacity     = `${0.12 + Math.random() * 0.42}`;
    span.style.animationDelay = `${Math.random() * 0.7}s`;
    span.style.transform   = `rotate(${-18 + Math.random() * 36}deg)`;
    overlay.appendChild(span);
  }

  screen.appendChild(overlay);
  setTimeout(() => overlay.remove(), 2400);
}

function triggerUIGlitch() {
  const box = document.getElementById('dialogue-box');
  box.classList.add('dl-glitch');
  setTimeout(() => box.classList.remove('dl-glitch'), 520);

  const scan = document.createElement('div');
  scan.className = 'ambient-scanlines';
  document.getElementById('screen-dialogue').appendChild(scan);
  setTimeout(() => scan.remove(), 520);
}

function triggerHeavyHeart() {
  const el = document.createElement('div');
  el.className = 'ambient-heavy-heart';
  document.getElementById('screen-dialogue').appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ── Explicit Horror Effects (from 'horror' step type) ─────────────────────────
// Delegates to EffectManager (engine/effects.js).
// Supports: red_flash | static_brief | flicker_slow | zoom_in | glitch | shake

function triggerHorrorEffect(effect, onDone) {
  EffectManager.horror(effect, onDone);
}

function loadScene(sceneId) {
  if (!SCENES[sceneId]) { console.error(`[Engine] Scene not found: "${sceneId}"`); return; }
  TagVoiceSystem.stop();
  EngineState.currentScene = sceneId;
  EngineState.stepIndex    = 0;
  clearAllCharacters();
  D.endCard.classList.add('hidden');
  D.choiceContainer.classList.add('hidden');
  // Pre-warm voice cache for this scene so first-play has no discovery delay
  TagVoiceSystem.preloadScene(sceneId);
  processStep(0);
}

// ── Input Handler ─────────────────────────────────────────────────────────────

function handleDialogueTap() {
  if (document.getElementById('name-input-overlay')) return;
  if (!document.getElementById('status-panel').classList.contains('hidden')) return;

  if (EngineState.isTyping) {
    skipTyping();
  } else if (EngineState.waitingForInput) {
    EngineState.waitingForInput = false;
    D.nextIndicator.classList.add('hidden');
    processStep(EngineState.stepIndex + 1);
  }
}

document.getElementById('screen-dialogue').addEventListener('click', handleDialogueTap);

document.getElementById('dl-status-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  openStatusPanel();
});

document.getElementById('sp-close-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  closeStatusPanel();
});

document.getElementById('status-panel').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('screen-dialogue').classList.contains('active')) return;
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
    e.preventDefault();
    handleDialogueTap();
  }
});

// ── Stat System ───────────────────────────────────────────────────────────────

function applyStatEffect(effects) {
  if (!effects) return;
  for (const [stat, delta] of Object.entries(effects)) {
    if (EngineState.stats[stat] !== undefined) {
      EngineState.stats[stat] = Math.max(0, Math.min(100, EngineState.stats[stat] + delta));
    }
  }
  saveStats();
}

function saveStats() {
  try { localStorage.setItem('cage_stats', JSON.stringify(EngineState.stats)); }
  catch (e) { /* storage unavailable */ }
}

function loadStats() {
  try {
    const saved = localStorage.getItem('cage_stats');
    EngineState.stats = saved
      ? Object.assign({}, INITIAL_STATS, JSON.parse(saved))
      : Object.assign({}, INITIAL_STATS);
  } catch (e) {
    EngineState.stats = Object.assign({}, INITIAL_STATS);
  }
}

// ── Status Panel ──────────────────────────────────────────────────────────────

const STAT_CONFIG = [
  { key: 'affection',  label: 'Affection',  labelJP: '愛情', color: '#f05070' },
  { key: 'dependency', label: 'Dependency', labelJP: '依存', color: '#88ccee' },
  { key: 'fear',       label: 'Fear',       labelJP: '恐怖', color: '#aa66ee' },
  { key: 'obedience',  label: 'Obedience',  labelJP: '従順', color: '#c4a050' },
];

function renderStatPanel() {
  const heroine = UIState.heroine;
  const hData   = heroine ? HEROINE_DATA[heroine] : null;

  document.getElementById('sp-heroine-name').textContent =
    hData ? `${hData.nameEN}  —  ${hData.nameJP}` : '—';

  const container = document.getElementById('sp-stats');
  container.innerHTML = '';

  STAT_CONFIG.forEach(({ key, label, labelJP, color }) => {
    const raw = EngineState.stats[key] || 0;
    const val = Math.max(0, Math.min(100, raw));

    const row = document.createElement('div');
    row.className = 'sp-stat-row';
    row.innerHTML = `
      <div class="sp-stat-label">
        <span class="sp-stat-name">${label}</span>
        <span class="sp-stat-jp">${labelJP}</span>
      </div>
      <div class="sp-stat-bar-wrap">
        <div class="sp-stat-bar" data-color="${color}" style="width:${val}%; background:${color};"></div>
      </div>
      <span class="sp-stat-val">${val}</span>
    `;
    container.appendChild(row);
  });
}

function openStatusPanel() {
  renderStatPanel();
  const panel = document.getElementById('status-panel');
  panel.classList.remove('hidden');
  panel.classList.remove('sp-exit');
}

function closeStatusPanel() {
  const panel = document.getElementById('status-panel');
  panel.classList.add('sp-exit');
  setTimeout(() => {
    panel.classList.add('hidden');
    panel.classList.remove('sp-exit');
  }, 260);
}


/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 11 — STARTUP
   Entry point — runs when the DOM is fully loaded.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 10.5 — SCENE API
   Convenience functions usable from custom story steps or the browser console.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Set expression without advancing the scene (used in 'expression' steps). */
function setCharacterExpression(charId, expr) { CharacterSystem.setExpression(charId, expr); }

/** Swap a character's body layer (layered mode only). */
function setCharacterBody(charId, bodyFile) { CharacterSystem.setBody(charId, bodyFile); }

/** Add a named overlay layer (layered mode only). */
function addCharacterOverlay(charId, overlayFile) { CharacterSystem.addOverlay(charId, overlayFile); }

/** Remove a named overlay layer (layered mode only). */
function removeCharacterOverlay(charId, overlayFile) { CharacterSystem.removeOverlay(charId, overlayFile); }

/** Trigger a visual effect by name. */
function triggerVisualEffect(type, onDone) { EffectManager.horror(type, onDone); }

/** Change background using a scene key (see BackgroundManager.SCENE_MAP). */
function changeBackground(keyOrPath, opts) {
  if (keyOrPath.includes('/') || keyOrPath.includes('.')) {
    BackgroundManager.set(keyOrPath, opts);
  } else {
    BackgroundManager.setScene(keyOrPath, opts);
  }
}


window.addEventListener('DOMContentLoaded', () => {

  // 0. Initialize layered character + effects systems
  CharacterSystem.init();
  BackgroundManager.init();
  EffectManager.init();
  // Wire EngineState.activeSprites to the CharacterSystem proxy for backward compat
  EngineState.activeSprites = CharacterSystem.activeSprites;

  // 1. Load saved progress so home cards show correct completion rings
  loadProgress();

  // 2. Wire up home screen heroine card click handlers
  initHomeCards();

  // 3. Animate loading bar, then go to prologue (first run) or home (returning)
  const prologueDone = localStorage.getItem('cage_prologue_done') === 'true';
  UIState.prologueDone = prologueDone;

  animateLoadingBar(() => {
    if (!prologueDone) {
      // First time — play the prologue, then force Himari Ch1
      loadStats();
      UIState.forcedIntro = true;
      UIState.heroine     = 'himari';
      UIState.chapter     = 1;
      UI.goTo('screen-dialogue', { pushHistory: false });
      setTimeout(() => Engine.start('prologue', 'himari'), 350);
    } else {
      UI.goTo('screen-home', { pushHistory: false });
      setTimeout(updateHomeRings, 400);
    }
  });

  console.log('[Cage] Game loaded. Characters:', Object.keys(CHARACTERS));
  console.log('[Cage] Scenes loaded:', Object.keys(SCENES));
});


/* ═══════════════════════════════════════════════════════════════════════════
   LEGACY COMPATIBILITY
   The GameEngine object is kept so any old onclick="GameEngine.startGame()"
   calls (if still present anywhere) don't crash.
   ═══════════════════════════════════════════════════════════════════════════ */
const GameEngine = {
  startGame()     { UI.startDialogue(); },
  returnToTitle() { UI.goTo('screen-home'); },
};
