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
     HIMARI CHAPTER 1 — "The Invitation"
     Four endings accessible via two branch paths.

     DEVOTED PATH:
       himari_ch1_start → himari_ch1_devoted_1 → himari_ch1_devoted_2
         → himari_end_devoted_servant   [Ending 1 — Normal]
         → himari_end_perfect_cage      [Ending 2 — Rare]

     DEFIANT PATH:
       himari_ch1_start → himari_ch1_defiant_1 → himari_ch1_defiant_2
         → himari_end_shattered_resistance  [Ending 4 — Rare]
         → himari_end_gilded_prison          [Ending 5 — Normal]
     ══════════════════════════════════════════════════════════ */

  himari_ch1_start: {
    id   : 'himari_ch1_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/academy_corridor.jpg' },

      {
        type: 'narration',
        text: 'The note arrived during third period.\n\nIvory envelope.\nYour name in careful script.\nNo sender.',
      },
      {
        type: 'narration',
        text: 'The Rose Salon.\nEnd of the East Wing.\nA room with no official purpose.',
      },
      {
        type: 'narration',
        text: 'You\'ve passed it a hundred times without thinking about it.\n\n\n\n…You\'ve never been inside.',
      },

      { type: 'bg', bg: 'assets/bg/rose_salon.jpg' },

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
        text       : 'You came exactly on time.\n\n(She sets down her teacup without looking up.)\n\n"I wasn\'t sure you would."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'A small lie, actually.\n\nI was perfectly certain.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Please.\n\nSit.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I sit across from her.]',
            nextScene : 'himari_ch1_devoted_1',
            statEffect: { affection: 5, obedience: 6 },
          },
          {
            label     : '"I can\'t stay long."',
            nextScene : 'himari_ch1_defiant_1',
            statEffect: { fear: 7, defiance: 5 },
          },
        ],
      },

    ],
  },


  /* ── Devoted Path: Act 1 ─────────────────────────────── */

  himari_ch1_devoted_1: {
    id   : 'himari_ch1_devoted_1',
    steps: [

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Mm.\n\n(She refills your cup before you ask.)\n\nGood.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I prepared something for you.\n\nDon\'t look at me like that.\nIt isn\'t much.',
      },
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
        text       : '(She places a small, flat box on the table.)\n\n"Open it."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'A fountain pen.\nBlack lacquer.\nGold nib.\n\nYour name engraved on the side.',
      },
      {
        type: 'narration',
        text: 'Your name.\n\nIn her handwriting.\n\nOn something she clearly had made to order.',
      },

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
        text       : 'You\'re going to write something for me one day.\n\nI want it to be with that.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She lifts her cup again.)\n\n"We have thirty minutes before your next class.\nI took the liberty of clearing your afternoon as well."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I\'d like you to stay.',
      },

      { type: 'goto-scene', scene: 'himari_ch1_devoted_2' },

    ],
  },


  /* ── Devoted Path: Act 2 — the album ────────────────── */

  himari_ch1_devoted_2: {
    id   : 'himari_ch1_devoted_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You stay.\n\nOf course you stay.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I want to show you something.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She opens a drawer in the writing desk.\nTakes out a leather-bound album.)\n\n"This is private.\nYou\'re the only person I\'ve shown it to."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'It\'s photographs.\n\nAll of them are of you.',
      },
      {
        type: 'narration',
        text: 'Not stolen — or not precisely stolen.\n\nThe courtyard. The hallway. The library window.\nYour back. Your profile.\nOnce, somehow, you looking up at the sky.',
      },
      {
        type: 'narration',
        text: 'Months of them.',
      },

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
        text       : 'I know every lecture you\'ve ever been late to.\nEvery meal you skipped.\nEvery face you made when you thought no one was watching.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : '(She closes the album gently, like closing a prayer.)\n\n"You\'ve never been alone.\nNot once.\nNot since I decided."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I\'m… thank you."',
            nextScene : 'himari_end_devoted_servant',
            statEffect: { affection: 12, obedience: 8 },
          },
          {
            label     : '"That\'s… that\'s a lot, Himari."',
            nextScene : 'himari_end_perfect_cage',
            statEffect: { fear: 8, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Defiant Path: Act 1 ─────────────────────────────── */

  himari_ch1_defiant_1: {
    id   : 'himari_ch1_defiant_1',
    steps: [

      { type: 'clear-characters' },
      {
        type: 'narration',
        text: 'The sentence lands wrong in the room.',
      },
      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '…',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She sets her cup down.\nVery carefully.)\n\n"You can\'t stay long."\n\nThat\'s what you said.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Your third period ends at two-forty.\nYour club meeting was rescheduled — I had the advisor move it.\nYour last class today has been marked as a free period.\n\n(She tilts her head.)\n\n"By whom, you ask?"',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '…By me.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You have nowhere else to be.\n\n(She gestures at the empty chair.)\n\n"Sit down."',
      },

      { type: 'goto-scene', scene: 'himari_ch1_defiant_2' },

    ],
  },


  /* ── Defiant Path: Act 2 — the record ───────────────── */

  himari_ch1_defiant_2: {
    id   : 'himari_ch1_defiant_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You sit.\n\nYou tell yourself it isn\'t because you\'re afraid.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'There\'s no need for that expression.\n\nI\'m not angry.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '(She pours your tea as if nothing happened.)\n\n"Anger would mean I expected something different from you."\n\n"I never expect things.\nI arrange them."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You\'ve been resisting me for some time, actually.\n\n(She opens a slim notebook.)\n\n"I\'ve kept a record."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Your name on the spine.\nDate-stamped entries going back months.',
      },
      {
        type: 'narration',
        text: 'Every time you sat elsewhere in the cafeteria.\nEvery assignment you turned in to someone other than her.\nEach conversation she wasn\'t part of.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She closes it.)\n\n"It\'s a very short list, now that I look at it."\n\n"You\'ve been very good.\nWithout even knowing I was watching."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I find that… charming, actually.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I won\'t be controlled."',
            nextScene : 'himari_end_shattered_resistance',
            statEffect: { fear: 10, defiance: 8 },
          },
          {
            label     : '[Stay silent. Don\'t move.]',
            nextScene : 'himari_end_gilded_prison',
            statEffect: { fear: 6, obedience: 5, dependency: 4 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 1: Devoted Servant ───────────────────────── */

  himari_end_devoted_servant: {
    id   : 'himari_end_devoted_servant',
    steps: [

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
        text       : '(Something shifts in her expression.\nNot surprise — she doesn\'t do surprise.)\n\n"…Fufu."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'blush',
        text       : 'I see.\n\n(She takes the album back, holds it against her chest.)\n\n"That\'s the right answer."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I knew you\'d understand.\n\nYou always do.\n\nEven before you know what you\'re agreeing to.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She begins talking — softly, happily — about the future.\n\nApartments she\'s looked at.\nSchedules she\'s planned.\nRooms she\'s already decorated.',
      },
      {
        type: 'narration',
        text: 'The pen is still in your hands.\nYour name in her handwriting.',
      },
      {
        type: 'narration',
        text: 'Somewhere, distantly, you understand:\nyou just agreed to something permanent.',
      },
      {
        type: 'narration',
        text: 'You\'re not sure when.',
      },

      {
        type        : 'end',
        endingName  : 'Devoted Servant',
        endingIndex : 0,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 2: The Perfect Cage ─────────────────────── */

  himari_end_perfect_cage: {
    id   : 'himari_end_perfect_cage',
    steps: [

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She doesn\'t flinch.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'A lot.\n\n(She considers this.)\n\nYes. I suppose it is.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'But you\'re still here.\n\n(She stands. Straightens her uniform.)\n\n"You didn\'t leave.\nYou didn\'t scream.\nYou\'re sitting in my chair, in my room, with your name in my hands."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : '(She looks at you from across the table.)\n\n"So it can\'t be that much.\n\nCan it?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t have an answer.\n\nShe knew you wouldn\'t.',
      },

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
        text       : 'We\'ll meet here again tomorrow.\n\nSame time.\n\n(She moves to the door — opens it, waits.)\n\n"I won\'t send a note next time.\nYou\'ll simply know to come."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The frightening part:\n\nyou think you will.',
      },

      {
        type        : 'end',
        endingName  : 'The Perfect Cage',
        endingIndex : 1,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 4: Shattered Resistance ─────────────────── */

  himari_end_shattered_resistance: {
    id   : 'himari_end_shattered_resistance',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The room goes very still.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '…',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She sets the notebook down.)\n\nI see.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'How refreshing.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'Most people don\'t say it out loud.\n\n(She comes around the table — slowly, unhurried.)\n\n"It never changes anything, of course.\nBut it\'s nice to hear."\n\n"It means there\'s still something here to break."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stops just in front of you.\n\nLooks at you the way you look at something you intend to own completely\nbefore you\'re finished with it.',
      },

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
        text       : 'Don\'t worry.\nI\'m not angry.\n\n(A pause.)\n\n"I\'m motivated."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t make it home that afternoon.',
      },

      {
        type        : 'end',
        endingName  : 'Shattered Resistance',
        endingIndex : 3,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 5: Gilded Prison ─────────────────────────── */

  himari_end_gilded_prison: {
    id   : 'himari_end_gilded_prison',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t answer.\n\nShe watches you not answering.',
      },

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
        text       : 'Mm.\n\n(She closes the notebook.)\n\n"Smart."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Silence is the most honest thing you\'ve said to me today.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Don\'t worry.\nI know what you\'re feeling.\nYou don\'t have to name it.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stands. Moves to the window.\nThe afternoon light catches the side of her face.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You\'ll get used to this.\n\nEveryone does, eventually.\n\n(Without turning.)\n\n"The important thing is — you came."\n"You stayed."\n"You\'ll come again."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'That\'s all I need from you.\n\nFor now.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The door is right there.\n\nYou could leave.',
      },
      {
        type: 'narration',
        text: 'You don\'t move.',
      },

      {
        type        : 'end',
        endingName  : 'Gilded Prison',
        endingIndex : 4,
        rarity      : 'normal',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 1 — "Fragile Threads"
     Four endings accessible via two branch paths.

     GENTLE PATH:
       shizuku_ch1_start → shizuku_ch1_gentle_1 → shizuku_ch1_gentle_2
         → shizuku_end_sweet_submission  [Ending 2 — Normal]
         → shizuku_end_midnight_vow      [Ending 5 — Rare]

     CONCERN PATH:
       shizuku_ch1_start → shizuku_ch1_concern_1 → shizuku_ch1_concern_2
         → shizuku_end_broken_wings      [Ending 7 — Rare]
         → shizuku_end_eternal_leash     [Ending 8 — Normal]

     PLACEHOLDERS — Reina / Mei
     Add their full Chapter 1 scenes below when ready.
     ══════════════════════════════════════════════════════════ */

  shizuku_ch1_start: {
    id   : 'shizuku_ch1_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/library.jpg' },

      {
        type: 'narration',
        text: 'She\'s been here since morning.',
      },
      {
        type: 'narration',
        text: 'The librarian mentioned it quietly, to no one in particular.\n\n"Seven o\'clock.\nBefore the gates opened."',
      },
      {
        type: 'narration',
        text: 'It\'s late afternoon now.\n\nBlue light through the tall windows.\nThe stacks are nearly empty.',
      },

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
        text       : '(She looks up from the page she\'s been on all day.)\n\nOh.\n\n{name}.\n\nYou came.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I was hoping you would.\n\n(Soft. Like a thing she shouldn\'t say out loud.)',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '(She looks back at her book.\nThe bookmark is still on page one.)\n\n"I haven\'t been able to read."\n\n"Not since this morning."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I sit down beside her.]',
            nextScene : 'shizuku_ch1_gentle_1',
            statEffect: { affection: 6, dependency: 5 },
          },
          {
            label     : '"Are you all right? You look pale."',
            nextScene : 'shizuku_ch1_concern_1',
            statEffect: { fear: 4, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Gentle Path: Act 1 ──────────────────────────────── */

  shizuku_ch1_gentle_1: {
    id   : 'shizuku_ch1_gentle_1',
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
        expression : 'blush',
        text       : '(She breathes out.\nSomething in her shoulders loosens.)\n\nOh.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : '…You sat down.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I didn\'t ask you to.\n\n(A pause.)\n\n"I almost said — \'don\'t go anywhere.\' But I didn\'t."\n"I wasn\'t sure you\'d listen."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She opens her book again.\nThis time, her eyes actually move across the page.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Is it all right if I… read out loud?\n\n(She doesn\'t look at you.)\n\n"It helps me focus.\nWhen you\'re here."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Her voice, when she reads, is barely above a whisper.\nNot performing.\nJust present.',
      },
      {
        type: 'narration',
        text: 'An hour passes.\nOr maybe two.\n\nYou\'ve lost track.',
      },

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
        text       : '(She closes the book.\nStill doesn\'t look at you.)\n\n"You stayed the whole time."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I wasn\'t counting.\n\n(Beat.)\n\n…I was counting.',
      },

      { type: 'goto-scene', scene: 'shizuku_ch1_gentle_2' },

    ],
  },


  /* ── Gentle Path: Act 2 — she asks if you'll come back ─ */

  shizuku_ch1_gentle_2: {
    id   : 'shizuku_ch1_gentle_2',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'You\'ll be back tomorrow, won\'t you?\n\n(She finally looks at you.)\n\n"Not here, necessarily.\nI just mean — somewhere I can find you."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I know that\'s a lot to ask.\n\nI know it is.\n\n(She looks back down.)\n\n"I just… don\'t do very well.\nWhen you\'re somewhere I can\'t reach."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Her fingers are tight around the spine of the book.\nYou watch her knuckles.',
      },

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
        text       : '(She laughs softly, at herself.)\n\n"This is the part where you say something kind.\nAnd I say I\'ll be fine.\n\nAnd then neither of us will believe it."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I like this. Being here with you."',
            nextScene : 'shizuku_end_sweet_submission',
            statEffect: { affection: 10, dependency: 8 },
          },
          {
            label     : '"I… I should probably go soon."',
            nextScene : 'shizuku_end_midnight_vow',
            statEffect: { fear: 10, dependency: 10 },
          },
        ],
      },

    ],
  },


  /* ── Concern Path: Act 1 ─────────────────────────────── */

  shizuku_ch1_concern_1: {
    id   : 'shizuku_ch1_concern_1',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'sad',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She looks at her hands.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '…It gets like this.\n\n(Quietly.)\n\n"When I don\'t know where you are."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I know your class schedule.\nYour usual routes.\nWhich window of the cafeteria you sit nearest to.\n\n(She closes her book.)\n\n"But knowing isn\'t the same as seeing."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : 'I get very cold.\n\nAnd I can\'t eat.\nAnd the words stop making sense.\n\n(A pause.)\n\n"It started about six months ago."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it like she\'s reporting weather.\nLike it\'s just a fact about herself\nshe\'s had time to accept.',
      },
      {
        type: 'narration',
        text: 'Six months ago.',
      },

      { type: 'goto-scene', scene: 'shizuku_ch1_concern_2' },

    ],
  },


  /* ── Concern Path: Act 2 — the coping list ──────────── */

  shizuku_ch1_concern_2: {
    id   : 'shizuku_ch1_concern_2',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I\'ve tried to be better about it.\n\n(She straightens the pages of her book.\nThey\'re already straight.)\n\n"I keep a list.\nThings I can do when I can\'t find you."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She shows you a small notepad.\n\nThe list has seven items.\n\nThe last one says: "wait."',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'sad',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I always end up at the last one.\n\n(She closes the notepad.)\n\n"But you\'re here now.\nSo it\'s all right."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(Her voice is very small.)\n\n"You are here.\n\n…You\'re not going anywhere.\n\nAre you?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I\'m here. I\'m not going anywhere."',
            nextScene : 'shizuku_end_broken_wings',
            statEffect: { affection: 8, dependency: 12 },
          },
          {
            label     : '[Stay quiet. Don\'t answer.]',
            nextScene : 'shizuku_end_eternal_leash',
            statEffect: { fear: 8, dependency: 8, obedience: 4 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 2: Sweet Submission ─────────────────────── */

  shizuku_end_sweet_submission: {
    id   : 'shizuku_end_sweet_submission',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'blush',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She goes very still.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : '(Very quietly.)\n\nOh.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'smile',
        text       : 'Then… come back tomorrow.\n\nSame time, if you can.\n\n(She stands, begins tidying her things with careful, deliberate movements.)\n\n"I\'ll save your seat."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I already do.\n\nI\'ve been saving it for a while.\n\n(She doesn\'t look at you.)\n\n"I wasn\'t sure you\'d ever sit in it."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She walks to the door ahead of you.\nPauses with her hand on the frame.',
      },

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
        text       : '(Without looking back.)\n\n"Thank you for today.\n\n…I\'ll be all right tonight.\nKnowing you\'ll come back."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The way she says "all right" —\n\nyou understand it means something specific for her.\nA scale you didn\'t know you were being measured against.',
      },

      {
        type        : 'end',
        endingName  : 'Sweet Submission',
        endingIndex : 2,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 5: Midnight Vow ──────────────────────────── */

  shizuku_end_midnight_vow: {
    id   : 'shizuku_end_midnight_vow',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She doesn\'t react.\n\nA long pause.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '…All right.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She takes out a small slip of paper.\nWrites something.\nSlides it across the table.',
      },
      {
        type: 'narration',
        text: 'Your address.\n\nAlready written there.\n\nIn ink that isn\'t fresh.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'sad',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I\'ve never…\n\nI never would have come uninvited.\n\n(She looks at the paper in your hands.)\n\n"But now that I\'ve written it down."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : '(She closes her book.\nFinally — after all day — turns to the next page.)\n\n"I suppose the rules have changed."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t say anything else.',
      },
      {
        type: 'narration',
        text: 'Neither do you.\n\nYou\'re still holding the slip of paper\nwhen you leave.',
      },

      {
        type        : 'end',
        endingName  : 'Midnight Vow',
        endingIndex : 5,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 7: Broken Wings ──────────────────────────── */

  shizuku_end_broken_wings: {
    id   : 'shizuku_end_broken_wings',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She closes her eyes.\n\nStays like that for a moment.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Say it again.',
      },
      {
        type: 'narration',
        text: 'You do.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '(She doesn\'t open her eyes.)\n\nOnce more.',
      },
      {
        type: 'narration',
        text: 'You do.',
      },

      { type: 'clear-characters' },

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
        text       : '(She opens her eyes.)\n\n"I\'ll remember every time.\nI\'ll remember tonight\'s voice specifically."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'smile',
        text       : '"And when it gets bad again —"\n"When it always gets bad again —"\n"I\'ll hear you saying it."\n\n"You\'ll be there even when you\'re not here."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : '(She tilts her head.\nVery gently.)\n\n"Isn\'t that a little like being mine?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it the way you\'d say: "isn\'t that a nice coincidence."\n\nLike it isn\'t a question at all.',
      },

      {
        type        : 'end',
        endingName  : 'Broken Wings',
        endingIndex : 7,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 8: Eternal Leash ─────────────────────────── */

  shizuku_end_eternal_leash: {
    id   : 'shizuku_end_eternal_leash',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The silence stretches.',
      },
      {
        type: 'narration',
        text: 'She watches your face.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'sad',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '(Very quietly.)\n\nAh.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'You don\'t have to say it.\n\nI know what it means,\nwhen someone doesn\'t answer.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stands.\nPuts her things away.\nNeatly. Slowly. Like she\'s done this before.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Come back tomorrow anyway.\n\n(She picks up her bag.)\n\n"I\'ll be here. Same time."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I always am.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She leaves first.\n\nThe seat across from her is empty.\nThe bookmark is still on page one.',
      },
      {
        type: 'narration',
        text: 'You come back the next day anyway.\n\nYou\'re not sure why.',
      },

      {
        type        : 'end',
        endingName  : 'Eternal Leash',
        endingIndex : 8,
        rarity      : 'normal',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 1 — "Under Observation"
     Four endings accessible via two branch paths.

     COMPLIANT PATH:
       reina_ch1_start → reina_ch1_compliant_1 → reina_ch1_compliant_2
         → reina_end_devoted_servant  [Ending 0 — Normal]
         → reina_end_perfect_cage     [Ending 1 — Rare]

     DEFIANT PATH:
       reina_ch1_start → reina_ch1_defiant_1 → reina_ch1_defiant_2
         → reina_end_shattered_resistance  [Ending 3 — Rare]
         → reina_end_gilded_prison          [Ending 4 — Normal]
     ══════════════════════════════════════════════════════════ */

  reina_ch1_start: {
    id   : 'reina_ch1_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/student_council.jpg' },

      {
        type: 'narration',
        text: 'The memo was formatted correctly.\n\nThat\'s what you remember most.',
      },
      {
        type: 'narration',
        text: 'Your name in the header.\nThe date.\nThe room number.\nThe time.\n\nLike a meeting request.\nLike you work for her.',
      },

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
        text       : '(She\'s writing when you enter.\nDoesn\'t look up.)\n\n"You\'re on time."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : '(She finishes the sentence.\nSets down the pen.)\n\n"I expected slightly early, based on your pattern.\nYou were not.\n\nI\'ve updated the model."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She slides a folder across the desk toward you.)\n\n"Please sit.\nI have something to go over with you."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I sit. I open the folder.]',
            nextScene : 'reina_ch1_compliant_1',
            statEffect: { obedience: 7, affection: 3 },
          },
          {
            label     : '"What is this?"',
            nextScene : 'reina_ch1_defiant_1',
            statEffect: { fear: 5, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Compliant Path: Act 1 ───────────────────────────── */

  reina_ch1_compliant_1: {
    id   : 'reina_ch1_compliant_1',
    steps: [

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
        text       : 'Section one is your weekly structure.\nOptimized for observed energy patterns, academic output, and commute variables.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Each hour is accounted for.\n\nWake time. Meals. Transit. Study blocks.\nSomething labeled "ambient recovery."',
      },

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
        text       : 'Section two covers nutritional targets.\nYour current intake has three gaps I\'ve flagged.\nA corrected meal plan is included.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : '(She turns to section three herself.)\n\n"Section three is social allocation.\nCertain current associations have been assessed.\n\nSome have been marked for reduction."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'There are names.\nSome crossed out.\nAnnotations in the margins.\n\n"Inefficient."\n"Disruptive variable."\n"Low yield."',
      },
      {
        type: 'narration',
        text: 'And at the end — one column with no name.\n\nHeader: "Primary Contact.\nAllocated: 3.5 hours, daily."',
      },

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
        text       : 'Any questions so far?',
      },

      { type: 'goto-scene', scene: 'reina_ch1_compliant_2' },

    ],
  },


  /* ── Compliant Path: Act 2 — fourteen months ────────── */

  reina_ch1_compliant_2: {
    id   : 'reina_ch1_compliant_2',
    steps: [

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
        text       : 'I should note — this is a living document.\nAs conditions change, the plan revises.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She places a second folder beside the first.)\n\n"Version twelve.\nThe date on the cover is fourteen months ago."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Version twelve.\n\nFourteen months ago.',
      },

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
        text       : 'Your preferences, habits, and behavioral variables have been tracked and integrated across that period.\nIterative refinement produces better outcomes than a static model.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'You\'ve been part of this project for fourteen months.\n\nYou weren\'t aware.\nThat was intentional.\n\nObserved subjects modify behavior.\nUnobserved data is cleaner.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I\'ll follow it."',
            nextScene : 'reina_end_devoted_servant',
            statEffect: { obedience: 10, affection: 5 },
          },
          {
            label     : '"This column. \'Primary Contact.\' What does that mean?"',
            nextScene : 'reina_end_perfect_cage',
            statEffect: { fear: 8, dependency: 5 },
          },
        ],
      },

    ],
  },


  /* ── Defiant Path: Act 1 ─────────────────────────────── */

  reina_ch1_defiant_1: {
    id   : 'reina_ch1_defiant_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t look surprised.',
      },

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
        text       : 'A schedule revision.\nI\'ve been modeling your current time allocation.\nThe inefficiencies are significant.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She opens her notebook to a graph.)\n\n"This is your average output by day of week.\nEight months of data.\nThe dip on Tuesdays correlates with your fourth-period placement.\n\nI\'ve had it rescheduled."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You didn\'t ask for that.',
      },

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
        text       : 'No.\n\nBut you would have, eventually.\n\nThis is simply faster.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She closes the notebook.)\n\n"Please sit.\nThere\'s more."',
      },

      { type: 'goto-scene', scene: 'reina_ch1_defiant_2' },

    ],
  },


  /* ── Defiant Path: Act 2 — fourteen folders ─────────── */

  reina_ch1_defiant_2: {
    id   : 'reina_ch1_defiant_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She pulls something from the filing cabinet.\nSets it on the desk.',
      },
      {
        type: 'narration',
        text: 'A folder.\nNumbered on the spine: 01 / 14.',
      },

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
        text       : 'I began documentation fourteen months ago.\nThis is the first volume.\n\nThere are thirteen more.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Fourteen folders.\nFourteen months.\nA complete archive.',
      },
      {
        type: 'narration',
        text: 'About you.',
      },

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I want to clarify something.\n\nThis is not surveillance.\nSurveillance implies adversarial framing.\n\nThis is optimization research.\nWith a specific subject.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : '(She looks at you directly.)\n\nYou.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"You can\'t plan my entire life."',
            nextScene : 'reina_end_shattered_resistance',
            statEffect: { fear: 10, defiance: 8 },
          },
          {
            label     : '[Open the folder. Read it.]',
            nextScene : 'reina_end_gilded_prison',
            statEffect: { fear: 6, obedience: 5, dependency: 4 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 0: Devoted Servant ───────────────────────── */

  reina_end_devoted_servant: {
    id   : 'reina_end_devoted_servant',
    steps: [

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'cold',
        position   : 'right',
      },
      {
        type: 'narration',
        text: 'She makes a note.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Good.\n\nI\'ll log compliance from today\'s date.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She turns back to section one.)\n\n"I\'d recommend beginning with the sleep revision.\nYour current pattern is suboptimal by twenty-two minutes.\nThe compounding effect over one week is measurable."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You\'re going to follow a schedule\nsomeone else designed for you.\n\nDown to when you sleep.',
      },

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
        text       : 'Report back in one week.\nI\'ve blocked time for a review.\n\n(Without looking up.)\n\n"It\'s in the document.\nSection four."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You look.\n\nIt is.',
      },
      {
        type: 'narration',
        text: 'So is next week.\nAnd the week after that.\n\nA full year of reviews,\nalready scheduled.',
      },
      {
        type: 'narration',
        text: 'You hadn\'t noticed the last page.',
      },

      {
        type        : 'end',
        endingName  : 'Devoted Servant',
        endingIndex : 0,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 1: The Perfect Cage ─────────────────────── */

  reina_end_perfect_cage: {
    id   : 'reina_end_perfect_cage',
    steps: [

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'cold',
        position   : 'right',
      },
      {
        type: 'narration',
        text: 'She doesn\'t look at the column right away.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'That allocation refers to a contact type I\'ve found produces consistent positive outcomes across tracked metrics.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : '(A pause.)\n\n"The specific variable is you."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it like a result.\nLike she\'s reading a number off a chart.',
      },

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
        text       : 'The hours aren\'t restrictive.\n3.5 is a minimum.\nThe ceiling is currently unspecified.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She closes the folder.)\n\n"I don\'t place ceilings on productive variables."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You understand what kind of variable you are.',
      },

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'smile',
        text       : '(Almost a smile.\nNot quite.)\n\n"You\'re processing it.\nGood.\n\nThe sooner you process, the more efficiently we can proceed."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You\'re not sure if you\'ve agreed to something.\n\nYou haven\'t said anything at all.\n\nSomehow that doesn\'t seem to matter.',
      },

      {
        type        : 'end',
        endingName  : 'The Perfect Cage',
        endingIndex : 1,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 3: Shattered Resistance ─────────────────── */

  reina_end_shattered_resistance: {
    id   : 'reina_end_shattered_resistance',
    steps: [

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'cold',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'A long pause.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'I modeled this response.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She opens to a specific page.\nTurns it to face you.',
      },

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
        text       : 'Objection rate at this stage of the process: high.\nCompliance rate within seventy-two hours: 94.3%.\n\nHistorical data.\nNot a prediction for you specifically.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She closes the folder.)\n\n"I\'m not planning your entire life.\nI\'m planning the portion that intersects with optimal outcomes.\n\nThat portion is currently significant.\nBut not total."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'yandere',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'yandere',
        text       : '(She looks at you steadily.)\n\n"The 5.7% is why I keep the files open.\nNot every subject processes at the same rate.\n\nI can wait.\n\nI\'ve already been waiting fourteen months."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it like a deadline.\nNot a threat.\nJust a projection.',
      },
      {
        type: 'narration',
        text: 'Somehow that\'s worse.',
      },

      {
        type        : 'end',
        endingName  : 'Shattered Resistance',
        endingIndex : 3,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 4: Gilded Prison ─────────────────────────── */

  reina_end_gilded_prison: {
    id   : 'reina_end_gilded_prison',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Folder 01 / 14.',
      },
      {
        type: 'narration',
        text: 'Your first week at this school.\nNotes in a precise hand.\n\nSubject heading.\nPhysical description.\nClass section.\nClub affiliation.\nLunch window.\n\nInitial parameters.',
      },

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'default',
        position   : 'right',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Month one was baseline collection only.\nNo hypothesis yet.\n\n(She looks toward the window.)\n\n"Just interest."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Just interest.\n\nFrom someone who doesn\'t use that word loosely.',
      },

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
        text       : '(Without looking at you.)\n\n"The hypothesis formed in month two.\nSupporting documentation begins in volume three.\nYou can read those as well, if you prefer.\n\nThey\'re more conclusive."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"Conclusive."',
      },

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
        text       : 'The conclusion was:\nyou are the most efficient path to a stable long-term outcome.\nFor the relevant variables.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You\'re not sure what "the relevant variables" means.',
      },
      {
        type: 'narration',
        text: 'You don\'t ask.',
      },

      {
        type        : 'end',
        endingName  : 'Gilded Prison',
        endingIndex : 4,
        rarity      : 'normal',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 1 — "My Favorite Toy"
     Four endings accessible via two branch paths.

     PLAYFUL PATH:
       mei_ch1_start → mei_ch1_playful_1 → mei_ch1_playful_2
         → mei_end_devoted_servant  [Ending 0 — Normal]
         → mei_end_perfect_cage     [Ending 1 — Rare]

     UNSETTLE PATH:
       mei_ch1_start → mei_ch1_unsettle_1 → mei_ch1_unsettle_2
         → mei_end_eternal_leash       [Ending 8 — Normal]
         → mei_end_complete_ownership  [Ending 9 — True]
     ══════════════════════════════════════════════════════════ */

  mei_ch1_start: {
    id   : 'mei_ch1_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/courtyard.jpg' },

      {
        type: 'narration',
        text: 'You hear her before you see her.',
      },
      {
        type: 'narration',
        text: 'Not her voice.\n\nSomething else.\nA small sound.\nHigh and faint.\n\nLike a bell.',
      },
      {
        type: 'narration',
        text: 'Later you\'ll understand what it was.',
      },

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
        text       : 'I\'ve been looking everywhere.\n\nWell — not everywhere.\n\n(She tilts her head to the left.)\n\n"I knew you\'d be here."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She holds Mr. Buttons out toward you.)\n\n"Mr. Buttons says hi~\nHe\'s been wanting to see you for days."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I hold my hand out to Mr. Buttons.]',
            nextScene : 'mei_ch1_playful_1',
            statEffect: { affection: 7, dependency: 4 },
          },
          {
            label     : '"How did you know I\'d be here?"',
            nextScene : 'mei_ch1_unsettle_1',
            statEffect: { fear: 6, dependency: 5 },
          },
        ],
      },

    ],
  },


  /* ── Playful Path: Act 1 ─────────────────────────────── */

  mei_ch1_playful_1: {
    id   : 'mei_ch1_playful_1',
    steps: [

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
        text       : '(She makes Mr. Buttons bow very seriously.)\n\n"He says you have good manners~\nHe doesn\'t shake hands with just anyone."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'We have a rule.\n\n(She says this very casually.)\n\n"You have to answer when I call you.\nThat\'s the rule for being Mr. Buttons\' friend."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She said "we."\n\nYou and her.\nA rule between you.\n\nYou didn\'t agree to it.\nShe doesn\'t seem to notice.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She looks up at you.)\n\n"You agree, right~?"',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'excited',
        text       : '(She sits down.\nPats the ground beside her.)\n\n"Sit~\nI have something to show you.\nI made it."',
      },

      { type: 'goto-scene', scene: 'mei_ch1_playful_2' },

    ],
  },


  /* ── Playful Path: Act 2 — the bracelet box ─────────── */

  mei_ch1_playful_2: {
    id   : 'mei_ch1_playful_2',
    steps: [

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She pulls a small box from her bag.\nDecorated with your name in careful letters.)\n\n"I made this for you~"',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '…I made a lot of them, actually.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Inside: a bracelet.\nSmall beads.\nYour name in the center.',
      },
      {
        type: 'narration',
        text: 'And beside it: several more.\nSlightly different.\nSome with errors.\nLike she practiced until she got it right.',
      },
      {
        type: 'narration',
        text: 'There are a lot of practice ones.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'The first twenty or so weren\'t very good.\n\n(She picks up the final one.)\n\n"This one is perfect, though~"',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'excited',
        text       : '(She holds it up like a prize.)\n\n"Will you wear it~?\nI want to see it on you."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I hold out my wrist.]',
            nextScene : 'mei_end_devoted_servant',
            statEffect: { affection: 12, obedience: 8 },
          },
          {
            label     : '"How many did you make to practice?"',
            nextScene : 'mei_end_perfect_cage',
            statEffect: { fear: 8, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Unsettle Path: Act 1 ────────────────────────────── */

  mei_ch1_unsettle_1: {
    id   : 'mei_ch1_unsettle_1',
    steps: [

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She tilts her head.\nLeft.',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'I always know~',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She skips forward a step.\nSits cross-legged on the ground in front of you.)\n\n"You come here on days when classes go badly.\nAnd on days when someone upsets you.\nAnd on days when it rained during lunch and you didn\'t have an umbrella."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She tilts her head the other way.)\n\n"Today it rained during lunch.\n\nYou didn\'t have an umbrella.\n\nI knew~"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She knew.\n\nFrom the rain.\nFrom your habits.\nFrom a pattern she\'s been reading\nlong enough to know it by heart.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She holds up one finger.)\n\n"Plus there\'s the other thing.\nBut that\'s a secret for now~"',
      },

      { type: 'goto-scene', scene: 'mei_ch1_unsettle_2' },

    ],
  },


  /* ── Unsettle Path: Act 2 — the tally ───────────────── */

  mei_ch1_unsettle_2: {
    id   : 'mei_ch1_unsettle_2',
    steps: [

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
        text       : '(She pulls a small notebook from her pocket.\nThe cover has your name on it.\nDecorated with tiny stars.)\n\n"I keep track~\nEvery time I find you.\nI write it down."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Columns of dates.\nTimes.\nLocations.\n\nThe notebook is nearly full.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She finds the last entry.)\n\n"Five hundred and nine times.\nSince April."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Five hundred and nine.\n\nApril was eight months ago.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She looks up.\nStill smiling.)\n\n"Don\'t worry — I never miss~\nWell.\nAlmost never.\n\nThe almost-misses are on the red pages."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You didn\'t know there were red pages.',
      },
      {
        type: 'narration',
        text: 'There are three of them.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[Don\'t react. Stay very still.]',
            nextScene : 'mei_end_eternal_leash',
            statEffect: { fear: 8, obedience: 6, dependency: 6 },
          },
          {
            label     : '"Mei — the other thing. What did you put on my bag?"',
            nextScene : 'mei_end_complete_ownership',
            statEffect: { fear: 14, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 0: Devoted Servant ───────────────────────── */

  mei_end_devoted_servant: {
    id   : 'mei_end_devoted_servant',
    steps: [

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
        text       : '(She makes a small, delighted sound.)\n\nOh~! ♪\n\nIt fits perfectly~',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She takes your wrist in both hands.\nStudies the bracelet.)\n\n"I measured."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '(Beat.)\n\n"I measured your wrist while you were sleeping once.\n\nI was going to say it a different way.\nBut that\'s what happened."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it with complete serenity.\nLike it explains itself.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'You won\'t take it off, right~?\n\n(She looks up from your wrist.)\n\n"Mr. Buttons says people who take off gifts\ndon\'t really like you.\n\nAnd I know you really like me."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says "I know"\nthe way other people say "I hope."',
      },
      {
        type: 'narration',
        text: 'Or maybe she just says it differently.',
      },

      {
        type        : 'end',
        endingName  : 'Devoted Servant',
        endingIndex : 0,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 1: The Perfect Cage ─────────────────────── */

  mei_end_perfect_cage: {
    id   : 'mei_end_perfect_cage',
    steps: [

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She doesn\'t answer right away.',
      },
      {
        type: 'narration',
        text: 'She counts.\n\nShe touches each practice bracelet, one by one.',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '…Thirty-one.\nThirty-one practice ones.\nAnd then this one.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Thirty-two total.\nFor one bracelet.\nFor you.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Is that a lot~?\n\n(She tilts her head.)\n\n"I wanted it to be perfect.\nYou deserve the perfect version."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '(She holds the perfect one back out.)\n\n"Some of my other favorites only got ten or twelve.\n\nYou got thirty-one."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says "other favorites"\nthe way you\'d say "other friends."\n\nLike it\'s a category.\nLike it\'s been organized.',
      },
      {
        type: 'narration',
        text: 'Like there\'s a hierarchy.\n\nAnd you know, without her saying it:\nyou\'re at the top.',
      },

      {
        type        : 'end',
        endingName  : 'The Perfect Cage',
        endingIndex : 1,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 8: Eternal Leash ─────────────────────────── */

  mei_end_eternal_leash: {
    id   : 'mei_end_eternal_leash',
    steps: [

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She watches you not react.',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Good~\n\n(She makes a small approving sound.)\n\n"Mr. Buttons says calm people are the best kind.\nThey last longer."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She opens the notebook.\nAdds a new entry.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Five hundred and ten now~\n\n(She closes it carefully.)\n\n"I\'ll show you the red pages someday.\nWhen we know each other better."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says "when we know each other better."\n\nYou\'ve been at this school together for eight months.\nShe has five hundred and ten entries about you.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She stands.\nDusts off her skirt.)\n\n"Come find me tomorrow~\n\nOr I\'ll find you.\nEither way is fine."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You understand, looking at her bright honest face,\nthat she means exactly what she says.',
      },
      {
        type: 'narration',
        text: 'Either way.',
      },

      {
        type        : 'end',
        endingName  : 'Eternal Leash',
        endingIndex : 8,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 9: Complete Ownership (True Ending) ──────── */

  mei_end_complete_ownership: {
    id   : 'mei_end_complete_ownership',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The smile stops.',
      },
      {
        type: 'narration',
        text: 'It stops for exactly one second.\n\nNo expression at all.\nJust Mei\'s face with nothing on it.',
      },

      { type: 'horror', effect: 'static_brief' },

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
        text       : '…',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(Then it comes back.)\n\n…Ohh~\n\nYou noticed~ ♪',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'excited',
        text       : '(She puts a hand to her mouth, delighted.)\n\n"It\'s a little bell~\nI tied it to the inside of your bag pocket.\n\nCan you hear it?\nWhen you walk?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You think about every day.\n\nThe small sound you kept almost-noticing.\nThe one you never traced.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'It\'s so I can always find you~\n\n(She sets Mr. Buttons down carefully.)\n\n"I tried other ways first.\nBut the bell was the most reliable."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Other ways.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'yandere',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'yandere',
        text       : '(She looks at you directly.\nCompletely still.)\n\n"You\'re not going to take it out, are you?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She asks it the same way she asks\nif you want a snack.\n\nCheerful.\nCertain.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She picks Mr. Buttons back up.\nThe smile comes back\nfull brightness.)\n\n"Because if you took it out…\n\n…I\'d just find another way~ ♪"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it exactly like:\n"no problem, I have a backup plan."\n\nLike it\'s the most reasonable thing in the world.',
      },
      {
        type: 'narration',
        text: 'The most frightening part:\n\nfor her, it is.',
      },

      {
        type        : 'end',
        endingName  : 'Complete Ownership',
        endingIndex : 9,
        rarity      : 'true',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 2 — "Portrait"
     She had a painting made. Of you. From her photographs.

     DEVOTED PATH:
       himari_ch2_start → himari_ch2_devoted_1 → himari_ch2_devoted_2
         → himari_end_ch2_portrait_subject  [10 — Normal]
         → himari_end_ch2_living_canvas     [11 — Rare]

     UNSETTLED PATH:
       himari_ch2_start → himari_ch2_unsettled_1 → himari_ch2_unsettled_2
         → himari_end_ch2_the_frame         [12 — Rare]
         → himari_end_ch2_private_collection [13 — Normal]
     ══════════════════════════════════════════════════════════ */

  himari_ch2_start: {
    id   : 'himari_ch2_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/rose_salon.jpg' },

      {
        type: 'narration',
        text: 'She texted you at exactly the right time.\n\nNot a moment you could refuse.\nNot a moment that felt planned.\n\nBut it was.',
      },
      {
        type: 'narration',
        text: 'The Rose Salon again.\nDifferent, though.\n\nSomething on the far wall that wasn\'t there before.\nCovered in silk.',
      },

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
        text       : 'You noticed immediately.\n\n(She doesn\'t turn toward it yet.)\n\n"Good. I wanted you to notice."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I had it commissioned three months ago.\n\nThe artist required seventeen reference images.\n\n(A small pause.)\n\n"I had forty-three."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Shall I show you?',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I nod.]',
            nextScene : 'himari_ch2_devoted_1',
            statEffect: { affection: 6, obedience: 5 },
          },
          {
            label     : '"You had my photograph taken without asking?"',
            nextScene : 'himari_ch2_unsettled_1',
            statEffect: { fear: 7, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Devoted Path: Act 1 ─────────────────────────────── */

  himari_ch2_devoted_1: {
    id   : 'himari_ch2_devoted_1',
    steps: [

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '(She crosses the room.\nTakes the silk edge in her fingers.)\n\n"Close your eyes first."',
      },
      {
        type: 'narration',
        text: 'You close them.',
      },
      {
        type: 'narration',
        text: 'The silk slides down.\n\nYou hear it land.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Open.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'It\'s you.\n\nOil on canvas.\nLarge — two meters, perhaps more.\n\nYou, in the courtyard.\nLooking up at something off-frame.\nThe afternoon light.\nYour expression in that specific moment of not-quite-thinking.',
      },
      {
        type: 'narration',
        text: 'You didn\'t know anyone was watching that day.\n\nYou look — in the painting — like yourself.\nMore precisely yourself than any mirror.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'That expression.\n\n(She stands beside you, looking at it.)\n\n"You make it when you\'re thinking about something pleasant and don\'t realize it."\n"I\'ve seen it four hundred and twelve times."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I wanted to keep it.\n\nSo I did.',
      },

      { type: 'goto-scene', scene: 'himari_ch2_devoted_2' },

    ],
  },


  /* ── Devoted Path: Act 2 ────────────────────────────── */

  himari_ch2_devoted_2: {
    id   : 'himari_ch2_devoted_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She begins to describe the painting.\n\nNot its technique.\nIts subject.',
      },
      {
        type: 'narration',
        text: 'She describes you the way an expert describes a beloved piece.\nClinically. Lovingly. With far too much detail.\n\nThe angle of your jaw.\nWhich side you favor when you turn.\nThe specific way the light catches your eyes when you\'re tired versus when you\'re not.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I know your face better than you do.\n\n(She says this without arrogance.\nLike a fact.)\n\n"You\'ve never looked at yourself long enough.\nI have."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I could describe you to a stranger in precise enough detail\nthat they would recognize you in a crowd.\n\n(She glances at you.)\n\n"Useful, don\'t you think?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I didn\'t know you paid that much attention."',
            nextScene : 'himari_end_ch2_portrait_subject',
            statEffect: { affection: 10, obedience: 7 },
          },
          {
            label     : '[I look at the painting. Something feels wrong.]',
            nextScene : 'himari_end_ch2_living_canvas',
            statEffect: { fear: 8, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Unsettled Path: Act 1 ───────────────────────────── */

  himari_ch2_unsettled_1: {
    id   : 'himari_ch2_unsettled_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She pauses.\n\nNot because she\'s surprised.\nBecause she\'s deciding how to explain it.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '"Without asking."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She considers the phrase.)\n\n"I didn\'t take the photographs.\nI already had them.\nI commissioned a painting from what I already owned."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'You\'re conflating two different questions.\n\nWhether I had the right —\nand whether you could have stopped me.',
      },

      {
        type: 'narration',
        text: 'She pulls the silk down anyway.\n\nEasily. Unhurried.\nLike the conversation is already over.',
      },

      { type: 'goto-scene', scene: 'himari_ch2_unsettled_2' },

    ],
  },


  /* ── Unsettled Path: Act 2 ───────────────────────────── */

  himari_ch2_unsettled_2: {
    id   : 'himari_ch2_unsettled_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The painting is large.\n\nYou, in the courtyard.\nAn afternoon you don\'t remember.\nLooking peaceful in a way that doesn\'t feel like yours anymore.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You\'re looking at it like it frightens you.\n\n(She tilts her head, curious.)\n\n"Why?"',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Everything I\'ve done has been careful.\nDeliberate.\n\nYou\'ve been safe this whole time.\n\n(She gestures at the canvas.)\n\n"Nothing about this harms you.\nI simply wanted to keep something of yours."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'And I do.\n\nThe question is whether you\'ll make this unpleasant\nor whether you\'ll understand that I\'m going to keep it either way.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"You can\'t just — this isn\'t right."',
            nextScene : 'himari_end_ch2_the_frame',
            statEffect: { fear: 10, defiance: 6 },
          },
          {
            label     : '[I stop talking. The painting is already there.]',
            nextScene : 'himari_end_ch2_private_collection',
            statEffect: { fear: 7, obedience: 5 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 10: Portrait Subject ─────────────────────── */

  himari_end_ch2_portrait_subject: {
    id   : 'himari_end_ch2_portrait_subject',
    steps: [

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
        text       : 'Of course I do.\n\n(She moves back to the painting.\nStands beside it.\nLooks between you and it.)\n\n"It\'s the most important thing I\'ve studied."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You\'ll notice I haven\'t hung anything else in this room.\n\n(She says it simply.)\n\n"There isn\'t anything else I\'d want here."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You stay until evening.\n\nShe talks. You listen.\nShe pours tea you don\'t ask for.\n\nAt some point you stop noticing the painting.\nAt some point it just becomes part of the room.',
      },
      {
        type: 'narration',
        text: 'At some point you stop noticing\nthat she\'s watching you the same way she watches it.',
      },

      {
        type        : 'end',
        endingName  : 'Portrait Subject',
        endingIndex : 10,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 11: Living Canvas ────────────────────────── */

  himari_end_ch2_living_canvas: {
    id   : 'himari_end_ch2_living_canvas',
    steps: [

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
        text       : '(She notices immediately.)\n\nWhat is it?\n\n(She steps closer.)\n\n"Your expression just changed.\nI want to know which one that was."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You can\'t describe it.\n\nThe feeling of seeing yourself owned.\nOf realizing the painting was always going to be here\nregardless of whether you agreed.',
      },

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
        text       : 'Oh.\n\n(A slow, delighted intake of breath.)\n\n"That one.\nI haven\'t captured that one yet."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'Sit there.\nJust like that.\nDon\'t change it.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She has a sketchbook open before you can respond.\n\nYou understand, in this moment, that the album was only the beginning.\n\nThe painting was only the beginning.',
      },
      {
        type: 'narration',
        text: 'She is going to document every version of you\nshe has not yet collected.',
      },

      {
        type        : 'end',
        endingName  : 'Living Canvas',
        endingIndex : 11,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 12: The Frame ────────────────────────────── */

  himari_end_ch2_the_frame: {
    id   : 'himari_end_ch2_the_frame',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t flinch.\n\nShe watches you with the same calm she always has.',
      },

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You\'re right.\n\n(She says it so easily it stops you.)\n\n"It\'s not right.\nNot by any standard you were taught."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'And yet here you are.\n\nIn my room.\nLooking at a painting I made of you.\nFor the third time this month.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'You keep coming back, {name}.\n\n(She tilts her head, genuinely curious.)\n\n"What does that tell you?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t answer.\n\nShe doesn\'t need you to.',
      },

      {
        type        : 'end',
        endingName  : 'The Frame',
        endingIndex : 12,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 13: Private Collection ──────────────────── */

  himari_end_ch2_private_collection: {
    id   : 'himari_end_ch2_private_collection',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The painting is already there.\n\nThe silk is already on the floor.\n\nYou are already in this room.',
      },

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
        text       : 'There.\n\n(She sets a cup of tea in front of you.)\n\n"That\'s much better."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'You don\'t have to like it.\n\n(She sits across from you.)\n\n"You just have to stay.\nThat\'s all I\'ve ever asked."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The painting watches from the far wall.\n\nYour own eyes, in oil and pigment, looking up at something you can\'t remember.',
      },
      {
        type: 'narration',
        text: 'She pours her tea.\n\nYou drink yours.',
      },

      {
        type        : 'end',
        endingName  : 'Private Collection',
        endingIndex : 13,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 2 — "The Night Call"
     2am. Your phone. She's been crying for so long
     she doesn't remember when she started.

     STAY PATH:
       shizuku_ch2_start → shizuku_ch2_stay_1 → shizuku_ch2_stay_2
         → shizuku_end_ch2_vigil          [10 — Normal]
         → shizuku_end_ch2_the_only_light [11 — Rare]

     BOUNDARY PATH:
       shizuku_ch2_start → shizuku_ch2_boundary_1 → shizuku_ch2_boundary_2
         → shizuku_end_ch2_paper_walls    [12 — Rare]
         → shizuku_end_ch2_small_hours    [13 — Normal]
     ══════════════════════════════════════════════════════════ */

  shizuku_ch2_start: {
    id   : 'shizuku_ch2_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/bedroom_night.jpg' },

      {
        type: 'narration',
        text: '2:17 a.m.',
      },
      {
        type: 'narration',
        text: 'Your phone lights up.\n\nShizuku.',
      },
      {
        type: 'narration',
        text: 'You answer before you\'re fully awake.',
      },

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
        text       : '(Breathing. Not speaking yet.)',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '…Sorry.\n\n(Her voice is raw.)\n\n"I know it\'s late.\nI just — I needed to hear you."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : 'I\'ve been — I don\'t know how long I\'ve been—\n\n(A breath breaks in the middle.)\n\n"It got bad again."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I\'m here. I\'m not going anywhere."',
            nextScene : 'shizuku_ch2_stay_1',
            statEffect: { affection: 7, dependency: 7 },
          },
          {
            label     : '"Shizuku… it\'s two in the morning."',
            nextScene : 'shizuku_ch2_boundary_1',
            statEffect: { fear: 5, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Stay Path: Act 1 ────────────────────────────────── */

  shizuku_ch2_stay_1: {
    id   : 'shizuku_ch2_stay_1',
    steps: [

      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(The sound she makes isn\'t a word.)\n\nOh—',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '…You\'re — you actually said that.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'There is silence for a moment.\n\nNot empty silence.\nFull silence.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Can you just…\n\n(Very quietly.)\n\n"Keep talking?\nIt doesn\'t have to be about anything.\nI just need — I need to know you\'re there."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You talk.\n\nAbout nothing.\nThe week. The courtyard pigeons. A book you\'ve been meaning to finish.\n\nHer breathing slows.',
      },
      {
        type: 'narration',
        text: 'Somewhere in the third hour she starts to talk back.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'When it gets like this…\n\n(Soft. Nearly asleep, almost.)\n\n"It feels like there\'s nothing holding me down.\nLike I could just — come apart."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Your voice is the thing.\n\n"It\'s — it\'s the weight.\nDo you understand?"\n"You\'re the weight that keeps me here."',
      },

      { type: 'goto-scene', scene: 'shizuku_ch2_stay_2' },

    ],
  },


  /* ── Stay Path: Act 2 ────────────────────────────────── */

  shizuku_ch2_stay_2: {
    id   : 'shizuku_ch2_stay_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '4:40 a.m.\n\nThe dark has started going blue at the edges.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Are you still there?',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '(She asks it the same way she\'s asked it four times tonight.)\n\n"I keep thinking you might have fallen asleep.\nOr—"',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'Or just put the phone down and not told me.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Still here. I haven\'t moved."',
            nextScene : 'shizuku_end_ch2_vigil',
            statEffect: { affection: 10, dependency: 9 },
          },
          {
            label     : '"Shizuku… you know I can\'t do this every night."',
            nextScene : 'shizuku_end_ch2_the_only_light',
            statEffect: { fear: 9, dependency: 8 },
          },
        ],
      },

    ],
  },


  /* ── Boundary Path: Act 1 ────────────────────────────── */

  shizuku_ch2_boundary_1: {
    id   : 'shizuku_ch2_boundary_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'A long pause.',
      },

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
        text       : '…I know.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(She doesn\'t hang up.)\n\n"I know it is.\nI\'m — I know this isn\'t fair."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : 'I tried not to call.\n\n(A small, broken sound.)\n\n"I tried for two hours.\nI kept picking up the phone and putting it down.\nI couldn\'t — I needed—"',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : 'You don\'t have to stay.\n\n(Quietly.)\n\n"I just needed to hear your voice for a second.\nYou can go back to sleep.\nI\'ll be fine."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t sound fine.',
      },

      { type: 'goto-scene', scene: 'shizuku_ch2_boundary_2' },

    ],
  },


  /* ── Boundary Path: Act 2 ────────────────────────────── */

  shizuku_ch2_boundary_2: {
    id   : 'shizuku_ch2_boundary_2',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'sad',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'Are you still on?\n\n(She asks it small.)',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You are.\n\nYou weren\'t sure you were going to be.\nBut you are.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I won\'t ask you to understand it.\n\n(She sounds tired.\nPast the crying stage.)\n\n"I just — the nights are longer than the days.\nAnd the days only make sense because I know I\'ll see you."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'Is that terrible?\n\n(A pause.)\n\n"Don\'t answer that."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Shizuku. You need more than just me."',
            nextScene : 'shizuku_end_ch2_paper_walls',
            statEffect: { fear: 8, defiance: 5 },
          },
          {
            label     : '[I stay on the line without saying anything.]',
            nextScene : 'shizuku_end_ch2_small_hours',
            statEffect: { dependency: 8, affection: 5 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 10: Vigil ────────────────────────────────── */

  shizuku_end_ch2_vigil: {
    id   : 'shizuku_end_ch2_vigil',
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
        text       : '(A sound that might be a small laugh.)\n\n…You haven\'t moved.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I\'m going to remember this night.\n\n(Soft. Precise.)\n\n"This exact hour.\nThe way it felt to know you were there\nthe whole time."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The light comes up slowly.\n\nYou\'re both quiet for the last twenty minutes.\nJust breathing on either end of the line.',
      },
      {
        type: 'narration',
        text: 'When she finally says goodbye\nher voice is steady.\n\nYou\'ve held her together through the night\nwith nothing but your presence.',
      },
      {
        type: 'narration',
        text: 'She will call again.\n\nYou both know it.',
      },

      {
        type        : 'end',
        endingName  : 'Vigil',
        endingIndex : 10,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 11: The Only Light ───────────────────────── */

  shizuku_end_ch2_the_only_light: {
    id   : 'shizuku_end_ch2_the_only_light',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The line goes very quiet.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I know.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '(She doesn\'t say it defensively.\nShe says it like a thing she\'s already considered.)\n\n"I know you can\'t.\nI know this isn\'t healthy.\nI know all of it."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : 'And I still — I can\'t.\n\n(Very quietly.)\n\n"You\'re the only light I can see from here.\nI know that\'s not fair to put on you."\n\n"I\'m putting it on you anyway."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it without apology.\n\nNot cruelty — just honesty.\nThe kind that comes at 4am\nwhen there\'s nothing left to manage.',
      },
      {
        type: 'narration',
        text: 'You don\'t know how to answer that.\n\nThe sky outside is turning gray.',
      },

      {
        type        : 'end',
        endingName  : 'The Only Light',
        endingIndex : 11,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 12: Paper Walls ──────────────────────────── */

  shizuku_end_ch2_paper_walls: {
    id   : 'shizuku_end_ch2_paper_walls',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'A very long silence.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'sad',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '…I know.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '(She says it like she\'s expected this.)\n\n"I know that\'s the right thing.\nI know you\'re right."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : 'Don\'t go anyway.\n\n(Her voice breaks open.)\n\n"Please.\nJust — don\'t go yet.\nI know it\'s not okay to ask.\nI\'m asking anyway."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She knows.\n\nShe\'s always known.\n\nKnowing has never been enough to stop her.',
      },

      {
        type        : 'end',
        endingName  : 'Paper Walls',
        endingIndex : 12,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 13: Small Hours ──────────────────────────── */

  shizuku_end_ch2_small_hours: {
    id   : 'shizuku_end_ch2_small_hours',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The silence between you carries.',
      },
      {
        type: 'narration',
        text: 'Not uncomfortable.\nJust present.\nTwo people on either end of a line at 3am.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '(Eventually.)\n\n…Same time tomorrow?',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She asks it quietly.\n\nNot as a joke.',
      },
      {
        type: 'narration',
        text: 'You don\'t answer.\n\nShe takes that as a yes.\n\nShe\'s probably right.',
      },

      {
        type        : 'end',
        endingName  : 'Small Hours',
        endingIndex : 13,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 2 — "The Report"
     She presents a monthly performance report. On you.

     COMPLY PATH:
       reina_ch2_start → reina_ch2_comply_1 → reina_ch2_comply_2
         → reina_end_ch2_satisfactory   [10 — Normal]
         → reina_end_ch2_revised_model  [11 — Rare]

     OBJECT PATH:
       reina_ch2_start → reina_ch2_object_1 → reina_ch2_object_2
         → reina_end_ch2_the_subject            [12 — Rare]
         → reina_end_ch2_acceptable_parameters  [13 — Normal]
     ══════════════════════════════════════════════════════════ */

  reina_ch2_start: {
    id   : 'reina_ch2_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/student_council.jpg' },

      {
        type: 'narration',
        text: 'The document is waiting on the desk when you arrive.\n\nThick. Bound in a black cover.\nYour name on the front, printed and laminated.\n\nBelow it: Month Two — Progress Assessment.',
      },

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
        text       : 'I\'ll summarize the findings.\n\n(She sits.\nOpens her own copy.)\n\n"Sleep average — down eleven minutes from baseline.\nI\'ve identified a cause and a correction."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Academic performance — within acceptable range.\nSocial contact hours — trending in the correct direction.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(She looks up briefly.)\n\n"\'Correct\' meaning reduced exposure to low-value contacts.\nThe model predicted you\'d resist that phase.\nYou didn\'t."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I open the report and start reading.]',
            nextScene : 'reina_ch2_comply_1',
            statEffect: { obedience: 6, affection: 3 },
          },
          {
            label     : '"You\'ve been tracking all of this?"',
            nextScene : 'reina_ch2_object_1',
            statEffect: { fear: 6, defiance: 5 },
          },
        ],
      },

    ],
  },


  /* ── Comply Path: Act 1 ──────────────────────────────── */

  reina_ch2_comply_1: {
    id   : 'reina_ch2_comply_1',
    steps: [

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
        text       : 'Section two covers physiological baselines.\n\n(She doesn\'t pause for your reaction.)\n\n"Resting heart rate — I\'ve noted variance in high-interaction scenarios.\nI\'ve been averaging across contexts."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Section two is twelve pages.\n\nSleeping hours cross-referenced against meal timing.\nActivity logs.\nSubjective mood assessments drawn from — you check the footnote — observation.',
      },
      {
        type: 'narration',
        text: '"Observation."\n\nNot self-report.\nObservation.',
      },

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
        text       : 'You\'re on page fourteen.\n\n(She checks her own copy without looking at yours.)\n\n"That section references cross-campus positioning data.\nI have a separate appendix if you\'d like the raw figures."',
      },

      { type: 'goto-scene', scene: 'reina_ch2_comply_2' },

    ],
  },


  /* ── Comply Path: Act 2 ──────────────────────────────── */

  reina_ch2_comply_2: {
    id   : 'reina_ch2_comply_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You keep reading.\n\nYou\'re not sure why you keep reading.\n\nYou keep reading.',
      },
      {
        type: 'narration',
        text: 'Section four is a projection model.\nThree scenarios.\nAll labeled with outcomes measured in years.\n\nThe shortest is labeled: Baseline Continuity — eighteen months.\n\nYou look at the longest.',
      },

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
        text       : 'The third scenario is the preferred outcome.\n\n(She says it without inflection.)\n\n"Indefinite continuation.\nOpen-ended.\nNo terminal date."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The model performs best with consistency.\n\n(She closes the report.)\n\n"You\'ve been consistent.\nThat\'s reflected in the assessment."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I scored highly?"',
            nextScene : 'reina_end_ch2_satisfactory',
            statEffect: { obedience: 10, affection: 5 },
          },
          {
            label     : '"There\'s no end date on this."',
            nextScene : 'reina_end_ch2_revised_model',
            statEffect: { fear: 9, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Object Path: Act 1 ──────────────────────────────── */

  reina_ch2_object_1: {
    id   : 'reina_ch2_object_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She pauses.\n\nA single beat.',
      },

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
        text       : '"Tracking" implies passive observation without purpose.\n\n(She sets down her pen.)\n\n"This is structured data collection with defined objectives.\nThere\'s a meaningful distinction."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The objectives were established at the beginning of the arrangement.\nYou were provided with the general terms at our first meeting.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You think back to the first meeting.\n\nThe folder.\nSection three — social allocation.\nThe names crossed out.',
      },
      {
        type: 'narration',
        text: '"General terms" is doing a significant amount of work in that sentence.',
      },

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
        text       : 'I understand your concern.\n\n(She reopens her copy.)\n\n"I\'ll walk you through the methodology.\nIt may clarify things."',
      },

      { type: 'goto-scene', scene: 'reina_ch2_object_2' },

    ],
  },


  /* ── Object Path: Act 2 ──────────────────────────────── */

  reina_ch2_object_2: {
    id   : 'reina_ch2_object_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The methodology section is twenty-two pages.\n\nShe reads it to you.\n\nAll of it.',
      },
      {
        type: 'narration',
        text: 'Not quickly.\nNot skipping.\nEvery footnote, every cross-reference, every definition.\n\nBy page twelve you\'ve stopped arguing.\nBy page eighteen you\'ve stopped thinking about arguing.',
      },

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
        text       : 'Your objection is noted.\n\n(She flips to the back of the document.)\n\n"I\'ve added it to the appendix.\nSection 7C — Subject Resistance Events.\nDate-stamped."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'Your objection is now part of the data set.\n\n(She looks at you.)\n\n"Is there anything else you\'d like to add?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"You can\'t just put my objection in a report."',
            nextScene : 'reina_end_ch2_the_subject',
            statEffect: { fear: 9, defiance: 6 },
          },
          {
            label     : '[I have run out of things to say.]',
            nextScene : 'reina_end_ch2_acceptable_parameters',
            statEffect: { fear: 6, obedience: 6 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 10: Satisfactory ─────────────────────────── */

  reina_end_ch2_satisfactory: {
    id   : 'reina_end_ch2_satisfactory',
    steps: [

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
        text       : '(A brief pause.)\n\n…Yes.',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The assessment places you in the ninety-first percentile\nof projected optimal outcomes.\n\n(She makes a small note.)\n\n"That figure will be updated monthly."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t know what the ninety-first percentile of her projected optimal outcomes means for you.',
      },
      {
        type: 'narration',
        text: 'Somehow, that she\'s pleased is not as comforting as it should be.',
      },

      {
        type       : 'expression',
        character  : 'reina',
        expression : 'smile',
        position   : 'right',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'smile',
        text       : 'Month three begins Monday.\n\n(She closes the folder.)\n\n"I look forward to the data."',
      },

      {
        type        : 'end',
        endingName  : 'Satisfactory',
        endingIndex : 10,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 11: Revised Model ────────────────────────── */

  reina_end_ch2_revised_model: {
    id   : 'reina_end_ch2_revised_model',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t deny it.',
      },

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
        text       : 'Correct.\n\n(She says it without hesitation.)\n\n"Terminal models introduce exit-point variables that degrade data integrity.\nI\'ve found the open-ended structure produces more reliable outputs."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The model requires you to continue.\n\nI\'m aware that\'s not a standard arrangement.\n\n(She meets your eyes.)\n\n"I find standard arrangements insufficient."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says "requires" the way an engineer says "requires."\n\nNot as a threat.\nAs a specification.',
      },
      {
        type: 'narration',
        text: 'The report is still open in your hands.\n\nYour name on every page.\nMonth two of an arrangement with no end.',
      },

      {
        type        : 'end',
        endingName  : 'Revised Model',
        endingIndex : 11,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 12: The Subject ──────────────────────────── */

  reina_end_ch2_the_subject: {
    id   : 'reina_end_ch2_the_subject',
    steps: [

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
        text       : 'I just did.\n\n(Without looking up from the appendix.)\n\n"Section 7C contains all subject resistance events.\nThis is the fourth."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The data shows resistance events correlate with above-average comprehension of the arrangement\'s scope.\n\n(She adds another line.)\n\n"Which means you understand more than most.\nI consider that a positive variable."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Your objection is in the appendix.\n\nDate-stamped.\nCross-referenced.\n\nPart of her data.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type: 'narration',
        text: 'You are the subject of a study that has no end date\nand no withdrawal option.',
      },

      {
        type        : 'end',
        endingName  : 'The Subject',
        endingIndex : 12,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 13: Acceptable Parameters ───────────────── */

  reina_end_ch2_acceptable_parameters: {
    id   : 'reina_end_ch2_acceptable_parameters',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She waits five seconds for an answer.\n\nWhen none comes, she makes a note.',
      },

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
        text       : 'That concludes the monthly review.\n\n(She closes the folder.\nStacks it neatly to one side.)\n\n"You\'re free to go."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Month three begins Monday.\n\nSame time.\nBring the report.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'As if you have a copy.\n\nAs if you\'ll come.',
      },
      {
        type: 'narration',
        text: 'You pick up your bag.\n\nYou will come.',
      },

      {
        type        : 'end',
        endingName  : 'Acceptable Parameters',
        endingIndex : 13,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 2 — "The Game"
     She made a board game. The rules are in a notebook.
     They are all in your favor until you realize they aren't.

     PLAY PATH:
       mei_ch2_start → mei_ch2_play_1 → mei_ch2_play_2
         → mei_end_ch2_player_two  [10 — Normal]
         → mei_end_ch2_predictable [11 — Rare]

     EXAMINE PATH:
       mei_ch2_start → mei_ch2_examine_1 → mei_ch2_examine_2
         → mei_end_ch2_house_rules      [12 — Rare]
         → mei_end_ch2_the_only_ending  [13 — Normal]
     ══════════════════════════════════════════════════════════ */

  mei_ch2_start: {
    id   : 'mei_ch2_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/school_rooftop.jpg' },

      {
        type: 'narration',
        text: 'She\'s on the rooftop.\n\nThere\'s a blanket spread on the ground.\nA board in the center.\nPieces arranged like she\'s been waiting for some time.',
      },

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
        text       : '{name}~! ♪\n\nI\'ve been waiting~\nSat down, stood up, sat down again.',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'I made a game!\n\n(She pats the blanket beside her.)\n\n"I made all the pieces too.\nMr. Buttons helped judge the rules."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'This one is just for us~\n\n(She holds up a notebook.)\n\n"The rules are in here.\nDo you want to read them first\nor should we just start?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Let\'s just start."',
            nextScene : 'mei_ch2_play_1',
            statEffect: { affection: 5, obedience: 5 },
          },
          {
            label     : '"I\'d like to read the rules first."',
            nextScene : 'mei_ch2_examine_1',
            statEffect: { fear: 4, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Play Path: Act 1 ────────────────────────────────── */

  mei_ch2_play_1: {
    id   : 'mei_ch2_play_1',
    steps: [

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
        text       : 'Okay~!\n\n(She settles cross-legged and sets Mr. Buttons on his designated square.)\n\n"I\'ll explain as we go.\nI\'m good at explaining."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Rule one: I go first.\n\nRule two: {name}\'s pieces can only move toward mine.\n\n(She places her first piece with great ceremony.)\n\n"Rule three: Mr. Buttons is an impartial judge."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The board doesn\'t resemble anything you\'ve seen before.\n\nThe squares are different sizes.\nSome are labeled in her handwriting.\nOne just says: "here."\n\nAnother says: "found you."',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Your turn~\n\n(She watches your hand over the pieces with great interest.)\n\n"Go wherever you want.\nBut keep in mind — I already know where you\'ll go."',
      },

      { type: 'goto-scene', scene: 'mei_ch2_play_2' },

    ],
  },


  /* ── Play Path: Act 2 ────────────────────────────────── */

  mei_ch2_play_2: {
    id   : 'mei_ch2_play_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You move a piece.\n\nShe moves immediately.\n\nYou move again.\nShe moves immediately.\n\nShe never hesitates.\nNot once.',
      },
      {
        type: 'narration',
        text: 'By the fifth turn every path forward is blocked.',
      },

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
        text       : 'You lose~! ♪\n\n(She claps.)\n\n"That was so fast~\nYou went exactly where I thought you would\nevery single time."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Want to play again?\n\n(She\'s already resetting the board.)\n\n"It\'ll be different this time.\nMaybe~"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Sure. Let\'s go again."',
            nextScene : 'mei_end_ch2_player_two',
            statEffect: { affection: 10, obedience: 7 },
          },
          {
            label     : '"…You knew every move I was going to make?"',
            nextScene : 'mei_end_ch2_predictable',
            statEffect: { fear: 9, dependency: 5 },
          },
        ],
      },

    ],
  },


  /* ── Examine Path: Act 1 ─────────────────────────────── */

  mei_ch2_examine_1: {
    id   : 'mei_ch2_examine_1',
    steps: [

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Oh~!\n\n(She holds the notebook out with both hands.)\n\n"Okay~ I\'m glad you want to read them.\nI worked really hard on them."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The notebook is thick.',
      },
      {
        type: 'narration',
        text: 'The rules section begins on page one.\n\nRule 1 through Rule 12 are fairly ordinary.\nMovement. Turn order. Point values.',
      },
      {
        type: 'narration',
        text: 'Rule 13 reads:\n\n"The player who is {name} must not leave the board area until Mei says the game is over."\n\nYou check.\nThat\'s still the rules section.\n\nYou keep reading.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She watches you read.)\n\nYou\'re on rule thirteen~\n\n"There are forty-seven rules total.\nSome of them are about you specifically."',
      },

      { type: 'goto-scene', scene: 'mei_ch2_examine_2' },

    ],
  },


  /* ── Examine Path: Act 2 ─────────────────────────────── */

  mei_ch2_examine_2: {
    id   : 'mei_ch2_examine_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Rule 27: "{name} must answer when called."\n\nRule 31: "If {name} moves to a square Mei hasn\'t been to yet, Mei goes there first. Retroactively."\n\nRule 40: "If {name} wins, the game was misread and should be replayed."',
      },
      {
        type: 'narration',
        text: 'Rule 47:\n\n"The game ends when Mei says it ends.\nNot before."\n\nRule 47, addendum:\n\n"This applies outside the game too."',
      },

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
        text       : 'Did you find rule forty-seven yet?',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"There\'s an addendum to rule forty-seven."',
            nextScene : 'mei_end_ch2_house_rules',
            statEffect: { fear: 10, defiance: 4 },
          },
          {
            label     : '[I close the notebook.]',
            nextScene : 'mei_end_ch2_the_only_ending',
            statEffect: { fear: 6, obedience: 6 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 10: Player Two ───────────────────────────── */

  mei_end_ch2_player_two: {
    id   : 'mei_end_ch2_player_two',
    steps: [

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
        text       : 'Yay~! ♪\n\n(She resets the board in seconds.\nShe\'s clearly done this many times before.)\n\n"I\'ll give you a small hint this time."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'The hint is: it doesn\'t matter which way you go~\n\n(She places her piece.)\n\n"I know them all."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You play again.\n\nYou lose in six turns instead of five.\n\nShe calls it progress.',
      },
      {
        type: 'narration',
        text: 'The sun moves across the rooftop.\n\nShe resets the board.\n\n"Best of forever~" she says.\n\nIt doesn\'t sound like a joke.',
      },

      {
        type        : 'end',
        endingName  : 'Player Two',
        endingIndex : 10,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 11: Predictable ──────────────────────────── */

  mei_end_ch2_predictable: {
    id   : 'mei_end_ch2_predictable',
    steps: [

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
        text       : '(She tilts her head.)\n\nMm~\n\n"Not every move.\nMost of them."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'I\'ve been watching you for a long time~\n\n(She picks up Mr. Buttons.)\n\n"I know how you think when you\'re comfortable.\nHow you move when you\'re nervous.\nWhat you do when you think no one is watching."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She\'s not bragging.\n\nShe\'s reporting.',
      },

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'That\'s why I made the game for you specifically~\n\n(She begins resetting the pieces.)\n\n"It only works on you.\nI checked."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She checked.\n\nYou don\'t want to know what "checking" involved.\n\nYou think you already know.',
      },

      {
        type        : 'end',
        endingName  : 'Predictable',
        endingIndex : 11,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 12: House Rules ──────────────────────────── */

  mei_end_ch2_house_rules: {
    id   : 'mei_end_ch2_house_rules',
    steps: [

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
        text       : '(She nods, very seriously.)\n\nYes~\n\n"That part was important so I wanted to be clear."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Some rules only exist inside the game.\n\n(She tilts her head.)\n\n"Rule forty-seven exists everywhere."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it so simply.\n\nLike it\'s been true for a while now.\nLike you just hadn\'t read that page yet.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type: 'narration',
        text: 'You think about every time you\'ve left a room and she\'s been there when you arrived somewhere else.\n\nEvery coincidence.\n\nThe game was already running.',
      },

      {
        type        : 'end',
        endingName  : 'House Rules',
        endingIndex : 12,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 13: The Only Ending ──────────────────────── */

  mei_end_ch2_the_only_ending: {
    id   : 'mei_end_ch2_the_only_ending',
    steps: [

      {
        type       : 'expression',
        character  : 'mei',
        expression : 'smile',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She watches you close it.)\n\nMm~\n\n"That\'s okay.\nYou\'ll learn the rules as you go."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'There\'s only one ending anyway~\n\n(She picks up the first piece.)\n\n"So it doesn\'t really matter which path you take."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She holds the piece out to you.\n\nSmiling.\nPatient.\nLike the answer to what she means\nwill come to you eventually.',
      },
      {
        type: 'narration',
        text: 'You take the piece.\n\nThe game begins.',
      },

      {
        type        : 'end',
        endingName  : 'The Only Ending',
        endingIndex : 13,
        rarity      : 'normal',
      },
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
