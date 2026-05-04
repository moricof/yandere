/**
 * scenario.js — Story Database  |  The Cage of Obsession
 * =========================================================
 * This is the ONLY file you need to edit to write your story.
 * The game engine in script.js reads this file — never touch
 * script.js unless you are adding a new feature.
 *
 * ── STEP TYPES ────────────────────────────────────────────
 *  type: "dialogue"         Show a character speaking.
 *  type: "narration"        Story narration (no name plate).
 *  type: "expression"       Change a character's sprite without dialogue.
 *  type: "clear-characters" Remove all sprites from screen.
 *  type: "bg"               Change the background image.
 *  type: "choice"           Show branch choices to the player.
 *  type: "name-input"       Show the player-name entry modal.
 *  type: "horror"           Trigger a visual shock effect.
 *  type: "goto-screen"      Navigate to a different UI screen.
 *  type: "end"              Show the "To be continued" card.
 *
 * ── {name} PLACEHOLDER ────────────────────────────────────
 *  Write {name} in any dialogue or narration text.
 *  The engine replaces it with the player's chosen name.
 *
 * ── HORROR EFFECTS ────────────────────────────────────────
 *  effect: "static_brief"  Short screen-noise flicker.
 *  effect: "red_flash"     Sharp red screen flash.
 *
 * ── IMAGE PATHS ───────────────────────────────────────────
 *  Characters:  assets/characters/<id>/<expression>.png
 *  Backgrounds: assets/bg/<name>.jpg
 *  Missing images are replaced with styled placeholders
 *  automatically — the story plays without any images.
 */

'use strict';


/* ═══════════════════════════════════════════════════════════════════════════
   CHARACTER PROFILES
   All four heroines + their expression keys.
   Replace image paths with your AI-generated art when ready.
   ═══════════════════════════════════════════════════════════════════════════ */

const CHARACTERS = {

  // ── Himari Eika — The Possessive Queen ─────────────────────────────────
  himari: {
    id        : 'himari',
    name      : 'Himari Eika',          // Shown in the name plate during dialogue
    nameColor : '#f05070',              // Rose red — matches her card color in UI
    expressions: {
      default : 'assets/characters/himari/default.png',
      smile   : 'assets/characters/himari/smile.png',     // The beautiful, dangerous smile
      blush   : 'assets/characters/himari/blush.png',
      yandere : 'assets/characters/himari/yandere.png',   // The obsessive stare
      angry   : 'assets/characters/himari/angry.png',
      cry     : 'assets/characters/himari/cry.png',
    },
    defaultPosition: 'center',
  },

  // ── Shizuku Kiyotaki — The Dependent Tragedy ───────────────────────────
  shizuku: {
    id        : 'shizuku',
    name      : 'Shizuku Kiyotaki',
    nameColor : '#88ccee',              // Ice blue — pale, cold, fragile
    expressions: {
      default : 'assets/characters/shizuku/default.png',
      smile   : 'assets/characters/shizuku/smile.png',    // Soft, trembling relief
      blush   : 'assets/characters/shizuku/blush.png',
      sad     : 'assets/characters/shizuku/sad.png',
      cry     : 'assets/characters/shizuku/cry.png',      // Openly weeping
      yandere : 'assets/characters/shizuku/yandere.png',  // Just before she breaks
    },
    defaultPosition: 'left',
  },

  // ── Reina Kuzuba — The Controlling Strategist ──────────────────────────
  reina: {
    id        : 'reina',
    name      : 'Reina Kuzuba',
    nameColor : '#aa66ee',              // Deep violet — authoritative
    expressions: {
      default : 'assets/characters/reina/default.png',   // Cool, unreadable
      cold    : 'assets/characters/reina/cold.png',       // Clinical, calculating
      smile   : 'assets/characters/reina/smile.png',      // Rare — more unsettling for its rarity
      scorn   : 'assets/characters/reina/scorn.png',
      angry   : 'assets/characters/reina/angry.png',
      yandere : 'assets/characters/reina/yandere.png',
    },
    defaultPosition: 'right',
  },

  // ── Mei Momozono — The Innocent Destroyer ──────────────────────────────
  mei: {
    id        : 'mei',
    name      : 'Mei Momozono',
    nameColor : '#ff80c0',              // Candy pink — childlike, alarming
    expressions: {
      default : 'assets/characters/mei/default.png',     // The dead-eyed cheerful expression
      smile   : 'assets/characters/mei/smile.png',        // Excited, bright
      excited : 'assets/characters/mei/excited.png',
      angry   : 'assets/characters/mei/angry.png',        // Rare — tilted head, very quiet
      yandere : 'assets/characters/mei/yandere.png',
    },
    defaultPosition: 'center',
  },

};


/* ═══════════════════════════════════════════════════════════════════════════
   SCENES
   ═══════════════════════════════════════════════════════════════════════════ */

const SCENES = {

  /* ══════════════════════════════════════════════════════════
     PROLOGUE — "The Invitation"
     Common opening shared by all routes.
     Plays automatically on first launch.
     Auto-transitions to Character Selection when complete.
     ══════════════════════════════════════════════════════════ */
  prologue: {
    id   : 'prologue',
    steps: [

      // ── Ask the player their name ─────────────────────────
      {
        type  : 'name-input',
        prompt: 'Before we begin…\n\nWhat shall we call you?',
        sub   : '(Your name will appear in the story.)',
      },

      // ── Opening narration — the academy, graduation ───────
      { type: 'bg', bg: 'assets/bg/academy_gates.jpg' },

      {
        type: 'narration',
        text: 'Graduation is three days away.\n\nYou\'ve been counting.',
      },
      {
        type: 'narration',
        text: 'Not out of excitement.\n\nMore like dread.',
      },
      {
        type: 'narration',
        text: 'Then, this morning, you found something tucked inside your desk.\n\nAn ivory envelope.\nNo sender\'s name.\nJust yours, written on the front in careful handwriting.',
      },
      {
        type: 'narration',
        text: 'Inside, a single line:\n\n「Come to the old clock tower at sundown.\n　— Your dearest ladies.」',
      },
      {
        type: 'narration',
        text: 'You should have ignored it.\n\n\n\n…You didn\'t.',
      },

      // ── Arriving at the clock tower ───────────────────────
      { type: 'bg', bg: 'assets/bg/clock_tower_steps.jpg' },

      {
        type: 'narration',
        text: 'The clock tower stands at the far edge of campus.\nNo classes. No events.\nJust old stone and older silence.',
      },
      {
        type: 'narration',
        text: 'Someone has placed candles on every step.\n\nRecent ones. The wax still soft.\n\nSomeone was expecting you.',
      },

      { type: 'bg', bg: 'assets/bg/clock_tower_top.jpg' },

      {
        type: 'narration',
        text: 'The door at the top of the stairs is already open.\n\nAnd four pairs of eyes\nare already waiting.',
      },

      // ── Himari's entrance ─────────────────────────────────
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Ohh…\n\n…You came.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '(She fans herself slowly, her gaze almost lazy.)\n\n"I was beginning to think I would have to send something more… persuasive."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Fufu. ♥\n\nWelcome, {name}.',
      },

      // ── Shizuku's entrance ────────────────────────────────
      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'left',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '…I\'m so glad.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I\'ve been here since noon.\nI thought — if you didn\'t come, I would—',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(She presses her lips together.\nHer fingers curl tightly into her sleeve.)\n\n…You\'re here.\nThat\'s all that matters.',
      },

      // ── Reina's entrance ──────────────────────────────────
      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'reina',
        expression : 'default',
        position   : 'right',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'Nine minutes and forty-three seconds late.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : '(She does not look up from her notebook.)\n\n"I\'ve noted it in your record."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '…Don\'t make a habit of it.',
      },

      // ── Mei's entrance ────────────────────────────────────
      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'excited',
        text       : 'He\'s HERE~! ♪',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(Mei spins once in place, her skirt fanning out.)\n\n"I told everyone you\'d come, {name}!"\n"I just knew it~"',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'You always come when I want you to.\n\n\n\n…Always.',
      },

      // ── Atmosphere shift — the mood turns ─────────────────
      { type: 'clear-characters' },
      {
        type: 'narration',
        text: 'Four of the most admired women at the academy.\n\nYou\'ve known them the way you know stars.\nBrilliant. Distant. Untouchable.\n\nOr so you always thought.',
      },
      {
        type: 'narration',
        text: 'But tonight, in this candlelit tower —\n\nthe way they\'re looking at you…',
      },
      { type: 'horror', effect: 'static_brief' },
      {
        type: 'narration',
        text: '…isn\'t the way you look at something you admire.\n\nIt\'s the way you look at something\nyou refuse to let go of.',
      },

      // ── The darkness surfaces — Himari ────────────────────
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'yandere',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'Graduation is in three days.\n\nAfter that — the gate closes.\nPeople scatter. Move on.\n\nForget.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(The fan folds shut with a quiet snap.)\n\n"That won\'t happen to us."\n\n"Will it, {name}?"',
      },

      // ── Shizuku reveals her depth ─────────────────────────
      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'cry',
        position   : 'left',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : 'You\'re not just going to… disappear, are you?',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(She\'s been trembling.\nYou realize she\'s been trembling this whole time.)\n\n"…I couldn\'t."\n"I mean it."\n"I could not survive that."',
      },

      // ── Reina reveals her design ──────────────────────────
      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'reina',
        expression : 'cold',
        position   : 'right',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'I\'ve run every projection.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : '(She closes the notebook.)\n\n"In each simulation, your absence produces an outcome I find…"\n"…unacceptable."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'For all parties involved.\n\nYou simply haven\'t been informed yet.',
      },

      // ── Mei reveals the abyss beneath the smile ───────────
      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'mei',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'Ne, {name}.',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '(She tilts her head to the left.)\n\n"Toys that try to run away sometimes get broken."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She tilts her head to the right. Still smiling.)\n\n"But I\'d never break you."\n"You\'re my favorite, after all~ ♪"',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '…So you\'ll stay.\n\nRight?',
      },

      // ── The Question ──────────────────────────────────────
      { type: 'clear-characters' },
      { type: 'horror', effect: 'red_flash' },
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '(The candlelight catches her eyes.\nShe steps forward.\nThe others go still.)',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'You\'ll stay with us forever…',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : '…even after graduation, right?',
      },

      // ── Branch point ──────────────────────────────────────
      {
        type   : 'choice',
        choices: [
          {
            label     : '"Of course. I won\'t go anywhere."',
            nextScene : 'prologue_devoted',
            statEffect: { affection: 8, obedience: 5 },
          },
          {
            label     : '"I… I haven\'t made up my mind yet."',
            nextScene : 'prologue_uncertain',
            statEffect: { fear: 8, dependency: 3 },
          },
        ],
      },

    ],
  },


  /* ══════════════════════════════════════════════════════════
     PROLOGUE ENDING A — Devoted Answer
     Player chose "I won't go anywhere."
     ══════════════════════════════════════════════════════════ */
  prologue_devoted: {
    id   : 'prologue_devoted',
    steps: [

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Fufu. ♥\n\nI knew you were wise.',
      },

      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'blush',
        position   : 'left',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : '(She exhales a long, shaking breath.)\n\nOh— oh, thank goodness.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : 'I… I won\'t let go.\n\nNot ever.\nI promise.',
      },

      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'reina',
        expression : 'default',
        position   : 'right',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'Acceptable.\n\n(She opens a new page in the notebook.)\n\n"I\'ve already made the necessary arrangements."',
      },

      { type: 'clear-characters' },
      {
        type       : 'expression',
        character  : 'mei',
        expression : 'excited',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'excited',
        text       : 'Yaaaay~! ♪♪♪\n\nWe\'re together forever and ever and EVER~!',
      },

      { type: 'clear-characters' },
      {
        type: 'narration',
        text: 'The smiles are beautiful.\n\nAll four of them.',
      },
      {
        type: 'narration',
        text: 'You tell yourself the weight settling in your chest\nis just the cold evening air coming through the stone.',
      },
      {
        type: 'narration',
        text: 'You chose this.\n\n\n\nIt\'ll be fine.\n\n\n\n…Right?',
      },

      // Transition to the character selection screen
      {
        type  : 'goto-screen',
        screen: 'screen-select',
      },

    ],
  },


  /* ══════════════════════════════════════════════════════════
     PROLOGUE ENDING B — Uncertain Answer
     Player chose "I haven't made up my mind yet."
     ══════════════════════════════════════════════════════════ */
  prologue_uncertain: {
    id   : 'prologue_uncertain',
    steps: [

      { type: 'clear-characters' },
      { type: 'horror', effect: 'static_brief' },
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'angry',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'angry',
        text       : '…',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'angry',
        text       : 'I see.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Fufu.\n\n…No matter.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'You\'ll understand, eventually.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : '(She turns away, just slightly.)\n\n"After all…"\n\n"…you\'re already here."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : '(She glances, slowly, toward the door behind you.)\n\nAnd you\'re not leaving.',
      },

      { type: 'clear-characters' },
      {
        type: 'narration',
        text: 'Something about the way she said that.',
      },
      {
        type: 'narration',
        text: 'You look back toward the door at the top of the stairs.\n\nThe one you came through.',
      },
      {
        type: 'narration',
        text: 'You never heard it close behind you.\n\n\n\nBut it is closed.',
      },
      {
        type: 'narration',
        text: 'And the key\n\nis not on your side.',
      },

      // Transition to the character selection screen
      {
        type  : 'goto-screen',
        screen: 'screen-select',
      },

    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 1 — "The Invitation" (placeholder)
     This scene plays when the player taps "Play Chapter 1"
     in Himari's album. Replace with full branching content.
     ══════════════════════════════════════════════════════════ */
  himari_ch1_start: {
    id   : 'himari_ch1_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/academy_corridor.jpg' },
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Oh my… you actually came.\n\nHow unexpectedly bold of you.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Did you think I would simply wait forever?\n\nHow… cute.',
      },
      {
        type   : 'choice',
        choices: [
          {
            label     : '"I came as fast as I could."',
            nextScene : 'route_devoted',
            statEffect: { affection: 10, obedience: 8 },
          },
          {
            label     : '"I almost didn\'t come at all."',
            nextScene : 'route_defiant',
            statEffect: { fear: 12, affection: -3, dependency: 4 },
          },
        ],
      },

    ],
  },

  route_devoted: {
    id   : 'route_devoted',
    steps: [
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'blush',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'blush',
        text       : 'Fufu… is that so.\nI suppose I can forgive your tardiness… this once.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Stay close to me. Always.\nThat is not a request.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'Because if you ever try to leave…\n\nI will simply have to make sure you cannot.',
      },
      { type: 'end' },
    ],
  },

  route_defiant: {
    id   : 'route_defiant',
    steps: [
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'angry',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'angry',
        text       : '…Excuse me?\n\nYou almost did not come?',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'How… interesting.\n\nI did not realize you wished to test me.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Do not worry.\n\nYou will learn very quickly…\n\nthat I always win.',
      },
      { type: 'end' },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     CHAPTER 1 PLACEHOLDERS — Shizuku / Reina / Mei
     Add their full Chapter 1 scenes here when ready.
     Each heroine's startScene in script.js HEROINE_DATA
     should point to the corresponding key below.
     ══════════════════════════════════════════════════════════ */
  shizuku_ch1_start: {
    id   : 'shizuku_ch1_start',
    steps: [
      { type: 'bg', bg: 'assets/bg/library.jpg' },
      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'smile',
        text       : 'Oh— {name}.\n\nYou came to the library.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '…I was hoping you would.\n\nI\'ve been here since morning.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '(She looks down at her book. The same page as before.)\n\n"I can\'t focus when you\'re not nearby."\n"Is that… strange?"',
      },
      {
        type   : 'choice',
        choices: [
          {
            label     : '"No. I\'ll stay here with you."',
            nextScene : 'shizuku_ch1_stay',
            statEffect: { dependency: 10, affection: 6 },
          },
          {
            label     : '"…Maybe a little."',
            nextScene : 'shizuku_ch1_hesitate',
            statEffect: { fear: 6, dependency: 5 },
          },
        ],
      },
    ],
  },

  reina_ch1_start: {
    id   : 'reina_ch1_start',
    steps: [
      { type: 'bg', bg: 'assets/bg/student_council.jpg' },
      {
        type       : 'expression',
        character  : 'reina',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'You\'re on time.\n\nFor once.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She sets a folder on the desk in front of you.)\n\n"Your schedule for the next four weeks.\nI\'ve optimized it."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'There is no room for deviation.\n\nYou will find that following my guidelines\nis simply… easier.',
      },
      { type: 'end' },
    ],
  },

  shizuku_ch1_stay: {
    id   : 'shizuku_ch1_stay',
    steps: [
      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'smile',
        text       : '(Her fingers stop trembling.\nShe exhales — slow, relieved.)\n\n…Thank you.\n\nPlease… don\'t ever leave.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : 'I know that\'s a lot to ask.\n\n(She turns back to her book, still smiling.)\n\n"I\'ll try to be worth staying for."',
      },
      { type: 'end' },
    ],
  },

  shizuku_ch1_hesitate: {
    id   : 'shizuku_ch1_hesitate',
    steps: [
      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'cry',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '…Oh.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(She turns the page. She hasn\'t read a word.)\n\n"I thought so."\n\n…It\'s all right.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : '(She looks up. The smile doesn\'t reach her eyes.)\n\n"You\'ll understand eventually."\n"That you can\'t leave either."',
      },
      { type: 'end' },
    ],
  },

  mei_ch1_start: {
    id   : 'mei_ch1_start',
    steps: [
      { type: 'bg', bg: 'assets/bg/courtyard.jpg' },
      {
        type       : 'expression',
        character  : 'mei',
        expression : 'excited',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'excited',
        text       : '{name}~! ♪\n\nI found you!',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She holds up a small stuffed rabbit.)\n\n"I wanted to show you Mr. Buttons.\nHe\'s been wanting to meet you for a long time."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '…He says he\'s glad you\'re still here.\n\n(She tilts her head.)\n\nWe all are.',
      },
      { type: 'end' },
    ],
  },

};


/* ═══════════════════════════════════════════════════════════════════════════
   PLAYER STATS — Initial Values
   These are the hidden parameters that drive the branching system.
   The engine stores them in localStorage between sessions.

   STAT MEANINGS:
     affection  — How deeply she loves you. High = devotion endings.
     fear       — How much control she has over you. High = confinement endings.
     dependency — How emotionally reliant you are on each other. High = co-ruin.
     obedience  — How much you submit. High = domination endings.
     defiance   — Your resistance. Unlocks hidden paths (use sparingly).
   ═══════════════════════════════════════════════════════════════════════════ */

const INITIAL_STATS = {
  affection  : 0,
  fear       : 0,
  dependency : 0,
  obedience  : 0,
  defiance   : 0,
};
