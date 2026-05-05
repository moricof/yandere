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
     HIMARI CHAPTER 2 — “Portrait”
     She had a painting made. Of you. From forty-three photographs,
     some taken from places you didn’t know she was watching.

     DEVOTED PATH  (4 choices):
       himari_ch2_start → himari_ch2_devoted_1 → himari_ch2_devoted_2
         → himari_ch2_devoted_3
         → himari_end_ch2_portrait_subject  [10 — Normal]
         → himari_end_ch2_living_canvas     [11 — Rare]

     UNSETTLED PATH  (4 choices):
       himari_ch2_start → himari_ch2_unsettled_1 → himari_ch2_unsettled_2
         → himari_ch2_unsettled_3
         → himari_end_ch2_the_frame         [12 — Rare]
         → himari_end_ch2_private_collection [13 — Normal]
     ════════════════════════════════════════════════════════ */

  himari_ch2_start: {
    id   : 'himari_ch2_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/rose_salon.jpg',
      },
      {
        type: 'narration',
        text: 'The message arrived at 4:47pm.\n\nNot a question. An expectation.\n"Come when you can. I have something to show you."\n\nYou came.',
      },
      {
        type: 'narration',
        text: 'The Rose Salon.\n\nThe far wall — something large, covered in silk.\nThe colour of an overcast afternoon.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'I knew you\'d notice it first.\n\n(She doesn\'t look at it yet.)\n\n"I commissioned it three months ago.\nThe artist required seventeen reference images."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: '(She sets her teacup down, very precisely.)\n\n"I provided forty-three."',
      },
      {
        type: 'narration',
        text: 'Forty-three.\n\nShe watches your face the way a collector watches an auction.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I wait for her to unveil it.]',
            nextScene: 'himari_ch2_devoted_1',
            statEffect: {
              affection: 5,
              obedience: 5,
            },
          },
          {
            label: '"Forty-three — where did you get forty-three photographs of me?"',
            nextScene: 'himari_ch2_unsettled_1',
            statEffect: {
              fear: 8,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch2_devoted_1: {
    id   : 'himari_ch2_devoted_1',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'Close your eyes.\n\n(She waits. She always waits until you comply.)',
      },
      {
        type: 'narration',
        text: 'Silk on stone.\nA long, whispering sound.\nA weight lifted.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'Open.',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'It\'s you.\n\nTwo meters of oil on canvas.\nThe courtyard — third week of October, late afternoon light.\nYou, looking up at something just past the frame.\nYour expression in the exact moment before a thought becomes a thought.',
      },
      {
        type: 'narration',
        text: 'You didn\'t know anyone was watching that day.\n\nYou look, in the painting, more precisely like yourself\nthan any photograph you have ever taken.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'That expression.\n\n(She stands beside the canvas. Looks between you and it.)\n\n"You make it when you\'re thinking of something pleasant\nand haven\'t realized yet that you\'re thinking it.\n\nI\'ve documented it four hundred and twelve times."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You counted."',
            nextScene: 'himari_ch2_devoted_2',
            statEffect: {
              affection: 4,
              dependency: 5,
            },
          },
          {
            label: '"Four hundred — how long have you been watching me like this?"',
            nextScene: 'himari_ch2_devoted_2',
            statEffect: {
              fear: 5,
              affection: 3,
            },
          },
        ],
      },
    ],
  },

  himari_ch2_devoted_2: {
    id   : 'himari_ch2_devoted_2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'Of course I counted.\n\n(She crosses to the sideboard. Opens a slim portfolio.)\n\n"The reference photographs took three years to collect.\nI organized them by context, then by expression, then by light quality."',
      },
      {
        type: 'narration',
        text: 'She turns the portfolio toward you.\n\nForty-three photographs. Printed. Labeled. Sorted.',
      },
      {
        type: 'narration',
        text: 'You recognize some — campus events, the library.\n\nThen angles that don\'t match anything you remember.\nA shot through the lecture hall window from a corridor you weren\'t in.\nYour face from across a street you thought was empty.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'You move differently when you don\'t know you\'re being seen.\n\n(She traces the edge of one photograph without touching it.)\n\n"You stop performing entirely.\nThat\'s when you\'re most interesting to me, {name}."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You were watching me without my knowledge. For three years."',
            nextScene: 'himari_ch2_devoted_3',
            statEffect: {
              fear: 6,
              defiance: 3,
            },
          },
          {
            label: '[I look at the photographs. There are so many of me I don\'t remember.]',
            nextScene: 'himari_ch2_devoted_3',
            statEffect: {
              fear: 4,
              dependency: 6,
            },
          },
        ],
      },
    ],
  },

  himari_ch2_devoted_3: {
    id   : 'himari_ch2_devoted_3',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: '"Watching" implies something passive.\n\n(She closes the portfolio.)\n\n"I was studying. There is a meaningful difference."',
      },
      {
        type: 'narration',
        text: 'She sets something else on the table.\n\nA key receipt. A locksmith\'s stamp.\nDate: eight months ago.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I\'ve been to your apartment, {name}.\n\n(She says it the way she says everything — as a fact that exists before your reaction.)\n\n"Three times. I needed to understand your space.\nThe light at different hours. The books you\'ve kept.\nThe way you\'ve arranged things."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'You keep your keys on the left hook.\nThere\'s a book on your nightstand you\'ve been reading for four months.\n\n(She meets your eyes.)\n\n"I returned the copy afterward.\nYou wouldn\'t have noticed it was gone."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"A copy — you had a copy made of my key."',
            nextScene: 'himari_end_ch2_living_canvas',
            statEffect: {
              fear: 12,
              defiance: 7,
            },
          },
          {
            label: '[I understand. She will always know where I am. She always has.]',
            nextScene: 'himari_end_ch2_portrait_subject',
            statEffect: {
              dependency: 10,
              obedience: 8,
            },
          },
        ],
      },
    ],
  },

  himari_ch2_unsettled_1: {
    id   : 'himari_ch2_unsettled_1',
    steps: [
      {
        type: 'narration',
        text: 'She pauses.\n\nNot because she\'s surprised.\nBecause she\'s deciding which part of the answer to offer first.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I didn\'t say you gave them to me.\n\n(She stands and crosses to the covered canvas.)\n\n"Those are two different questions.\nWhether I had the right —\nand whether you could have stopped me."',
      },
      {
        type: 'narration',
        text: 'She pulls the silk down anyway.\nEasily. Unhurried.\nLike the argument is already over.',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'It\'s you. Life-size.\n\nThe courtyard — an afternoon you don\'t quite recognize.\nYou, caught in a private moment of not-quite-thinking.\n\nThe painting knows something about that day you\'ve forgotten.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'You\'re looking at it like it frightens you, {name}.\n\n(Head tilted. Genuinely curious.)\n\n"Tell me why."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You didn\'t have permission. Those moments were mine."',
            nextScene: 'himari_ch2_unsettled_2',
            statEffect: {
              fear: 7,
              defiance: 6,
            },
          },
          {
            label: '[I can\'t explain it. The painting knows something I don\'t.]',
            nextScene: 'himari_ch2_unsettled_2',
            statEffect: {
              fear: 9,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  himari_ch2_unsettled_2: {
    id   : 'himari_ch2_unsettled_2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'Permission.\n\n(She considers it like a phrase from a language she doesn\'t use.)\n\n"I\'ve been photographing you for three years.\nBefore I knew your name.\nBefore you knew mine."',
      },
      {
        type: 'narration',
        text: 'Three years.\n\nBefore the introduction. Before the Rose Salon.\nBefore any moment she told you was the beginning.\n\nAll of it was designed.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I have the originals here.\n\n(She opens the portfolio.)\n\n"The ones from across the street are the most interesting.\nThe light through your apartment window varies by hour.\nThe 7am angle is particularly clean."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'narration',
        text: 'Your apartment window.\nThird floor.\nFrom across the street.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'You tend to sit with your back to your own window at home.\n\n(She says it before you can ask.)\n\n"I preferred the view when you faced it."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You\'ve been photographing me through my apartment window."',
            nextScene: 'himari_ch2_unsettled_3',
            statEffect: {
              fear: 10,
              defiance: 5,
            },
          },
          {
            label: '[I close the portfolio. I don\'t want to know how many there are.]',
            nextScene: 'himari_ch2_unsettled_3',
            statEffect: {
              fear: 12,
              obedience: 3,
            },
          },
        ],
      },
    ],
  },

  himari_ch2_unsettled_3: {
    id   : 'himari_ch2_unsettled_3',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I was also inside.\n\n(A minor clarification. Calm, the way you\'d correct a small misunderstanding.)\n\n"Three times. Before you gave me your address.\nI had a key made. It was returned afterward."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'The book on your nightstand.\nThe left hook — your keys.\nThe light through your bedroom window at 7am.\n\n(She holds eye contact.)\n\n"I photographed everything I needed.\nI understand your space now.\nI understand you, {name}."',
      },
      {
        type: 'narration',
        text: 'She was inside your apartment.\nWhile you were away.\nShe stood in your bedroom.\n\nShe knows what your window looks like from the inside.',
      },
      {
        type: 'narration',
        text: 'The painting watches from the wall.\n\nYour own painted eyes, fixed on something just out of frame.\nYou didn\'t know you were being seen that day.\n\nYou weren\'t aware of being seen on any of those days.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"This is not right. None of this is right. I\'m leaving."',
            nextScene: 'himari_end_ch2_the_frame',
            statEffect: {
              fear: 12,
              defiance: 10,
            },
          },
          {
            label: '[Nothing I say changes this. She has already done everything.]',
            nextScene: 'himari_end_ch2_private_collection',
            statEffect: {
              fear: 9,
              obedience: 8,
            },
          },
        ],
      },
    ],
  },

  himari_end_ch2_portrait_subject: {
    id   : 'himari_end_ch2_portrait_subject',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'Good.\n\n(She takes the portfolio. Closes it. Sets it away.)\n\n"You understand, then.\nThis is simply how things are.\nThey\'ve always been this way."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'You can be angry later if you need to.\n\n(She pours tea.)\n\n"But you came when I texted.\nYou\'ll come when I text again.\n\nThat\'s all I require of you today, {name}."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You stay until the light changes.\n\nShe talks. You listen.\nThe painting watches from the far wall.\n\nAt some point you stop seeing it as something wrong.\nAt some point it just becomes part of the room.',
      },
      {
        type: 'narration',
        text: 'You notice, leaving, that she\'s already reached for her phone.\n\nLogging the visit, maybe.\n\nYou don\'t ask.',
      },
      {
        type: 'end',
        endingName: 'Portrait Subject',
        endingIndex: 10,
        rarity: 'normal',
      },
    ],
  },

  himari_end_ch2_living_canvas: {
    id   : 'himari_end_ch2_living_canvas',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'yandere',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'A copy.\n\n(She looks at you the way she looks at the canvas.)\n\n"Yes. That\'s the word.\n\nI made a copy of your key.\nI used it.\nI documented what I found."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'And I would do it again, {name}.\n\n(She says it the way you\'d say it\'s raining — just weather.)\n\n"The difference between you and the painting\nis that you can still surprise me."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You think about the door.\n\nNow. Now. Now.\n\nThe door doesn\'t move farther away.\nYou just don\'t walk toward it.',
      },
      {
        type: 'narration',
        text: 'She has a sketchbook open on the table before you realize she moved.\n\nShe\'s drawing you as you sit there.\nThis expression. Right now.\n\n"Don\'t change it."\n\nYou don\'t.',
      },
      {
        type: 'end',
        endingName: 'Living Canvas',
        endingIndex: 11,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch2_the_frame: {
    id   : 'himari_end_ch2_the_frame',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You say it.\n\nI\'m leaving.\nYou want to sound certain.\nYou almost do.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'All right.\n\n(She doesn\'t move.)\n\n"Go. I won\'t stop you, {name}."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'I\'ll text Thursday.\n\n(She picks up her teacup.)\n\n"And you\'ll come."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You walk out.\n\nThe hallway is long.\nYour footsteps are the only sound in it.',
      },
      {
        type: 'narration',
        text: 'On Thursday she texts.\n\n"Come when you can."\n\nYou stare at your phone for a long time.\n\nYou go.',
      },
      {
        type: 'end',
        endingName: 'The Frame',
        endingIndex: 12,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch2_private_collection: {
    id   : 'himari_end_ch2_private_collection',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'The painting watches from the far wall.\n\nYour own eyes in oil and pigment, fixed on something just past the edge.\nYou can\'t see what you were looking at that day.\n\nNeither can she.\nBut she kept the image anyway.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'There.\n\n(She sets a teacup beside you.)\n\n"That\'s the expression I wanted.\nThank you, {name}."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'You don\'t have to understand it.\n\n(She sits.)\n\n"You just have to let me keep it.\nAll of it. Every version I\'ve documented.\n\nThat\'s all I\'ve ever asked."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'The copy of the key is destroyed, she said.\nBut the photographs still exist.\nThe painting still exists.\nShe knows what your apartment looks like at 7am.\n\nShe knows you, {name}.\nMore precisely than you know yourself.\n\nAnd you stay.',
      },
      {
        type: 'end',
        endingName: 'Private Collection',
        endingIndex: 13,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 2 — "Night Call"
     2:17am. Your phone. She's been calling every night for
     three months. Tonight you picked up.

     STAY PATH  (4 choices):
       shizuku_ch2_start → shizuku_ch2_a1 → shizuku_ch2_a2
         → shizuku_end_ch2_vigil          [10 — Normal]
         → shizuku_end_ch2_the_only_light [11 — Rare]

     BOUNDARY PATH  (4 choices):
       shizuku_ch2_start → shizuku_ch2_b1 → shizuku_ch2_b2
         → shizuku_end_ch2_paper_walls    [12 — Rare]
         → shizuku_end_ch2_small_hours    [13 — Normal]
     ════════════════════════════════════════════════════════ */

  shizuku_ch2_start: {
    id   : 'shizuku_ch2_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/dorm_room_night.jpg',
      },
      {
        type: 'narration',
        text: '2:17am.\n\nYour phone.',
      },
      {
        type: 'narration',
        text: 'Shizuku.\n\nThe call connects. She doesn\'t speak immediately.\nYou can hear her breathing — careful, controlled.\nShe\'s been crying but she doesn\'t want you to know.',
      },
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'You picked up.\n\n(A pause.)\n\n"I call every night. I know when you don\'t answer.\nI\'ve been calling for three months.\nTonight you picked up."',
      },
      {
        type: 'narration',
        text: 'Three months.\n\nShe has been calling at 2:17am for three months.\nYou picked up tonight.\n\nYou don\'t know why tonight felt different.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'m here, Shizuku. Talk to me."',
            nextScene: 'shizuku_ch2_a1',
            statEffect: {
              affection: 6,
              dependency: 5,
            },
          },
          {
            label: '"It\'s 2am. Is everything okay?"',
            nextScene: 'shizuku_ch2_b1',
            statEffect: {
              fear: 4,
              defiance: 4,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch2_a1: {
    id   : 'shizuku_ch2_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I don\'t always know what to say when you answer.\n\n(A small, uncertain sound.)\n\n"I practise sometimes. What I\'d say.\nBut when you actually pick up, I — forget.\nIs it okay if I just. Talk. For a while."',
      },
      {
        type: 'narration',
        text: 'You say yes.\n\nShe talks.\n\nNot about anything urgent. Small things — a book she read, a walk she took, something funny she saw and thought of you. She tells it badly. She laughs a little, surprised at herself.',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'Sorry. I know it\'s late.\n\n(She sounds less hollow now.)\n\n"Can you stay on a little longer?\nJust until I — feel like the room is smaller.\nRight now the room feels very large."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'ll stay."',
            nextScene: 'shizuku_ch2_a2',
            statEffect: {
              affection: 8,
              dependency: 6,
            },
          },
          {
            label: '[I stay without saying it. She can hear it in the silence.]',
            nextScene: 'shizuku_ch2_a2',
            statEffect: {
              affection: 6,
              dependency: 8,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch2_a2: {
    id   : 'shizuku_ch2_a2',
    steps: [
      {
        type: 'narration',
        text: 'The conversation slows.\n\nNot ending — just becoming quieter.\nHer voice steadies.\n\nAt some point she stops speaking in sentences and starts speaking in fragments, the way people do when they\'re almost asleep.',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: '...I\'m going to try to sleep now.\n\n(A long pause.)\n\n"...don\'t hang up yet."',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'ll be here when you wake up. Call me anytime."',
            nextScene: 'shizuku_end_ch2_vigil',
            statEffect: {
              affection: 10,
              dependency: 8,
            },
          },
          {
            label: '[I don\'t promise. But I don\'t hang up either.]',
            nextScene: 'shizuku_end_ch2_the_only_light',
            statEffect: {
              fear: 4,
              dependency: 10,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch2_b1: {
    id   : 'shizuku_ch2_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I know it\'s late.\n\n(She says it quickly, like she had the objection ready.)\n\n"I tried to call at a normal time.\nI really did.\nBut — the nights are different, {name}.\nDaytime I can manage.\nNights are — different."',
      },
      {
        type: 'narration',
        text: 'Different.\n\nYou listen to her voice in the dark.\nThere is something in it you haven\'t heard before — not sadness exactly, but something underneath sadness.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What\'s different at night?"',
            nextScene: 'shizuku_ch2_b2',
            statEffect: {
              affection: 4,
              fear: 3,
            },
          },
          {
            label: '[I hear something underneath her voice and I don\'t name it.]',
            nextScene: 'shizuku_ch2_b2',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch2_b2: {
    id   : 'shizuku_ch2_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'At night I need to hear your voice most.\n\n(Very quietly. Like she\'s confessing something small.)\n\n"I know when you don\'t answer.\nI keep track.\nI\'ve been keeping track for three months.\nThe nights you answered — I remember all of them."',
      },
      {
        type: 'narration',
        text: 'She keeps track.\n\nThe nights you answered.\nThe nights you didn\'t.\nThree months of a record you didn\'t know existed.',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I didn\'t know you needed this."',
            nextScene: 'shizuku_end_ch2_small_hours',
            statEffect: {
              affection: 5,
              dependency: 6,
            },
          },
          {
            label: '[She keeps a record. Of me. Of the nights I was and wasn\'t there.]',
            nextScene: 'shizuku_end_ch2_paper_walls',
            statEffect: {
              fear: 8,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_end_ch2_vigil: {
    id   : 'shizuku_end_ch2_vigil',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She falls asleep on the line.\n\nYou can hear it — the change in her breathing.\nThe silence becoming softer.\n\nYou stay for another hour.',
      },
      {
        type: 'narration',
        text: 'You don\'t hang up.\n\nYou just — sit with her.\nIn the dark, with the phone pressed to your ear, listening to someone sleep.',
      },
      {
        type: 'narration',
        text: 'In the morning there\'s a text.\n\n"Thank you for staying.\n\nI know you could have hung up.\nPlease call me whenever. About anything. I\'ll always pick up.\n\n— Shizuku"',
      },
      {
        type: 'end',
        endingName: 'Vigil',
        endingIndex: 10,
        rarity: 'normal',
      },
    ],
  },

  shizuku_end_ch2_the_only_light: {
    id   : 'shizuku_end_ch2_the_only_light',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'You\'re the only light in the house, {name}.\n\n(A long, honest silence.)\n\n"I know that\'s too much to say.\nI know.\nBut it\'s still true."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You don\'t know how to answer that.\n\nYou don\'t answer it.\n\nYou stay on the line.',
      },
      {
        type: 'narration',
        text: 'Two more hours pass.\nShe talks. You listen.\nAt 4:30am she says she thinks she can sleep now.\n\nShe doesn\'t say goodbye.\nShe just — lets the call end.\n\nThe only light in the house.\n\nYou sit in the dark for a while after, not sure what to do with that.',
      },
      {
        type: 'end',
        endingName: 'The Only Light',
        endingIndex: 11,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch2_paper_walls: {
    id   : 'shizuku_end_ch2_paper_walls',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I can hang up now if you want.\n\n(She says it like she\'s already resigned to it.)\n\n"It\'s very late. I\'ll — I\'ll call at a normal time. If you want.\nOr I won\'t call at all.\nIf you want."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You end the call gently.\n\nShe says okay.\nShe says goodnight.\nShe says sorry for the time.\n\nShe calls again at 2:17am the next night.\n\nAnd the night after.',
      },
      {
        type: 'narration',
        text: 'The calls are shorter now.\nShe doesn\'t ask to stay on as long.\nBut they come at the same time.\nThe same careful quiet on the other end.\n\nShe said she\'d call at a normal time.\n\nShe didn\'t say that was what she wanted.',
      },
      {
        type: 'end',
        endingName: 'Paper Walls',
        endingIndex: 12,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch2_small_hours: {
    id   : 'shizuku_end_ch2_small_hours',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: '"I\'ll try to sleep now."\n\nShe says it quietly.\nNot quite a goodbye.\n\nThe call ends.',
      },
      {
        type: 'narration',
        text: 'Your phone says 4:37am.\nCall duration: 2 hours, 20 minutes.\n\nYou sat up with her for two hours and twenty minutes\nwithout once noticing the time pass.',
      },
      {
        type: 'narration',
        text: 'You sit in the silence after.\n\nYou think about three months of 2:17am calls you didn\'t pick up.\nYou think about the ones she recorded.\nThe ones she remembers.\n\nSomewhere, in a list you\'ll never see, your name appears every night.',
      },
      {
        type: 'end',
        endingName: 'Small Hours',
        endingIndex: 13,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 2 — "The Report"
     She presents a bound document: "Wellness Assessment —
     Subject: [Name] — Month Seven."

     COOPERATE PATH  (4 choices):
       reina_ch2_start → reina_ch2_a1 → reina_ch2_a2
         → reina_end_ch2_satisfactory   [10 — Normal]
         → reina_end_ch2_revised_model  [11 — Rare]

     REJECT PATH  (4 choices):
       reina_ch2_start → reina_ch2_b1 → reina_ch2_b2
         → reina_end_ch2_the_subject            [12 — Rare]
         → reina_end_ch2_acceptable_parameters  [13 — Normal]
     ════════════════════════════════════════════════════════ */

  reina_ch2_start: {
    id   : 'reina_ch2_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/lab_office.jpg',
      },
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I want to show you something.\n\n(She sets a bound document on the table.)\n\n"Month Seven.\nI try to compile these monthly.\nThe data this time is particularly interesting."',
      },
      {
        type: 'narration',
        text: 'The cover reads:\n"Wellness Assessment — Subject: [Your Name]\nMonth 7 of Longitudinal Observation — R. Suzushiro"',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Sleep patterns. Nutritional intake. Emotional response indicators.\nSocial contact frequency and quality ratings.\n\n(She opens to a graph.)\n\n"Month Four was a clear stress spike.\nI was concerned. The data suggested you weren\'t managing it."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Show me."',
            nextScene: 'reina_ch2_a1',
            statEffect: {
              affection: 4,
              obedience: 6,
            },
          },
          {
            label: '"You can\'t monitor me like this without permission."',
            nextScene: 'reina_ch2_b1',
            statEffect: {
              fear: 8,
              defiance: 6,
            },
          },
        ],
      },
    ],
  },

  reina_ch2_a1: {
    id   : 'reina_ch2_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Month Four — here.\n\n(She points to the graph.)\n\n"Sleep dropped below six hours for eleven days.\nFood intake reduced.\nYou seemed distracted in our interactions.\nI cross-referenced with external stressors and identified three probable causes."',
      },
      {
        type: 'narration',
        text: 'She identified the probable causes.\n\nShe was tracking you closely enough to identify the probable causes.\n\nShe cross-referenced.',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Social contact data.\n\n(She turns a page.)\n\n"I log who you spend time with. Duration. Estimated quality based on subsequent behavioral indicators.\nYour social contact correlates significantly with your stress levels.\nBetter company — lower stress. Poorer company — higher."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You logged who I spend time with."',
            nextScene: 'reina_ch2_a2',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
          {
            label: '[I look at the graph of my own life for seven months.]',
            nextScene: 'reina_ch2_a2',
            statEffect: {
              fear: 5,
              dependency: 6,
            },
          },
        ],
      },
    ],
  },

  reina_ch2_a2: {
    id   : 'reina_ch2_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'For accuracy, yes.\n\n(She sets a pen beside the document.)\n\n"The external observation has limits though.\nI\'d like your self-assessment.\nYour own perception of Month Four, for comparison.\nThe dataset will be more complete with your contribution."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'It\'s a collaboration, {name}.\n\n(She looks at you over the document.)\n\n"I\'m not asking you to agree with the data.\nI\'m asking you to participate in it.\nThere\'s a meaningful difference."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I write something in the margin.]',
            nextScene: 'reina_end_ch2_revised_model',
            statEffect: {
              obedience: 10,
              dependency: 8,
            },
          },
          {
            label: '"I don\'t want to contribute to this."',
            nextScene: 'reina_end_ch2_satisfactory',
            statEffect: {
              defiance: 5,
              fear: 6,
            },
          },
        ],
      },
    ],
  },

  reina_ch2_b1: {
    id   : 'reina_ch2_b1',
    steps: [
      {
        type: 'narration',
        text: 'She pauses.\n\nNot like she\'s surprised.\nLike she\'s noting the objection.',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'You\'re right that I didn\'t ask.\n\n(She writes something in the margin of the document.)\n\n"I\'ve noted that. \'Subject expressed discomfort with monitoring at Month Seven reveal.\'\n\nI expected it earlier, actually. The model predicted Month Five."',
      },
      {
        type: 'narration',
        text: 'She\'s writing your objection into the document.\n\nAs data.\n\nYour discomfort is a data point.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You just wrote that down."',
            nextScene: 'reina_ch2_b2',
            statEffect: {
              fear: 7,
              defiance: 6,
            },
          },
          {
            label: '[She predicted my objection. She\'s been accounting for my resistance from the start.]',
            nextScene: 'reina_ch2_b2',
            statEffect: {
              fear: 9,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  reina_ch2_b2: {
    id   : 'reina_ch2_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'All observations are recorded.\n\n(She turns another page.)\n\n"The model predicted resistance at this juncture.\nYour reaction pattern is consistent with the prediction.\nWhich is — informative."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'You\'re very consistent, {name}.\n\n(She closes the document.)\n\n"That\'s not a criticism.\nConsistency is useful data.\nIt means the model is functioning correctly."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Stop analyzing me."',
            nextScene: 'reina_end_ch2_the_subject',
            statEffect: {
              defiance: 10,
              fear: 7,
            },
          },
          {
            label: '[She won\'t stop. This is just how she loves. I understand that now.]',
            nextScene: 'reina_end_ch2_acceptable_parameters',
            statEffect: {
              fear: 8,
              dependency: 6,
            },
          },
        ],
      },
    ],
  },

  reina_end_ch2_satisfactory: {
    id   : 'reina_end_ch2_satisfactory',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'All right.\n\n(She accepts this without changing expression.)\n\n"I\'ll note the refusal.\nMonth Eight will begin fresh baseline.\nI\'ll adjust the methodology."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She\'s already planning Month Eight.\n\nYou declined to add your observations.\nShe noted the refusal.\nShe\'s adjusting the methodology.\n\nThe document closes.\nMonth Eight begins in four weeks.\n\nShe\'ll be back with a new one.',
      },
      {
        type: 'end',
        endingName: 'Satisfactory',
        endingIndex: 10,
        rarity: 'normal',
      },
    ],
  },

  reina_end_ch2_revised_model: {
    id   : 'reina_end_ch2_revised_model',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: '(She reads what you wrote.)\n\n(She reads it again.)\n\n(She makes a small note in the margin of her own.) ',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She looks up from the document.\n\n"Your self-assessment is more accurate than the external data suggested.\nThat\'s — unusual. Subjects tend to underreport.\nYou don\'t."',
      },
      {
        type: 'narration',
        text: 'She seems genuinely pleased.\n\nNot warm, exactly.\nBut satisfied, the way a scientist is satisfied\nwhen data confirms a hypothesis they were hoping was true.\n\nShe\'ll be back next month.\nWith a new document.\nShe\'s already thinking about Month Eight.',
      },
      {
        type: 'end',
        endingName: 'Revised Model',
        endingIndex: 11,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch2_the_subject: {
    id   : 'reina_end_ch2_the_subject',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I could remove the data.\n\n(She says it without hesitation.)\n\n"If you want.\nAll of it.\nSeven months of observation — deleted."',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'But I won\'t stop watching, {name}.\n\n(She meets your eyes.)\n\n"Without the documentation, the observation will just be less organized.\nLess useful to you.\nMore instinctive."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She\'s telling you the truth.\n\nDeleting the document changes nothing.\nShe\'ll still watch.\nShe\'ll still count the days you look tired.\nShe\'ll still notice the people you spend time with.\n\nThe document was almost a kindness.\nAt least with the document, you could see what she\'d collected.',
      },
      {
        type: 'end',
        endingName: 'The Subject',
        endingIndex: 12,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch2_acceptable_parameters: {
    id   : 'reina_end_ch2_acceptable_parameters',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Discomfort with monitoring is within acceptable parameters.\n\n(She closes the document.)\n\n"The model accounted for it.\nMonth Eight will be better.\nI\'m adjusting the data collection methodology based on your response pattern."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She puts it away.\n\nAdjusted methodology.\nMonth Eight.\n\nShe\'ll be back.\nShe\'s always back.\n\nYou sit with the understanding that your discomfort\nhas been factored in, filed, and corrected for.\n\nYou are acceptable parameters.\n\nShe\'ll be back next month.',
      },
      {
        type: 'end',
        endingName: 'Acceptable Parameters',
        endingIndex: 13,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 2 — "The Game"
     She made a board game. The rules are in a notebook.
     There are 47 of them. Rule 47: the game ends when both players agree.

     PLAY PATH:
       mei_ch2_start → mei_ch2_a1 → mei_ch2_a2
         → mei_end_ch2_player_two   [10 — Normal]
         → mei_end_ch2_predictable  [11 — Rare]

     EXAMINE PATH:
       mei_ch2_start → mei_ch2_b1 → mei_ch2_b2
         → mei_end_ch2_house_rules     [12 — Rare]
         → mei_end_ch2_the_only_ending [13 — Normal]
     ══════════════════════════════════════════════════════════ */

  mei_ch2_start: {
    id   : 'mei_ch2_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/school_rooftop.jpg',
      },
      {
        type: 'narration',
        text: 'The rooftop at lunch.\n\nShe\'s already there.\nBlanket spread, board set up, pieces placed.\nMr. Buttons has been given his own corner square.\nShe\'s been waiting long enough to have everything perfect.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '{name}~! ♪\n\nI knew you\'d come.\n\n(She pats the blanket beside her.)\n\n"I made something."',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'A game.\n\n(She holds up a notebook — soft cover, corners worn, spine creased.)\n\n"All the rules are in here.\nI wrote them myself, so they\'re very official."',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She tilts the board toward you.)\n\nDo you want to read the rules first,\nor should we just start~?',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Let\'s just start."',
            nextScene: 'mei_ch2_a1',
            statEffect: {
              affection: 5,
              obedience: 5,
            },
          },
          {
            label: '"I\'d like to read the rules first."',
            nextScene: 'mei_ch2_b1',
            statEffect: {
              fear: 4,
              defiance: 4,
            },
          },
        ],
      },
    ],
  },

  mei_ch2_a1: {
    id   : 'mei_ch2_a1',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: 'Okay~!\n\n(She settles the pieces into place with practiced ease.)\n\n"First rule: you roll first.\nRule two: I explain the rule after you move."',
      },
      {
        type: 'narration',
        text: 'The game starts simply enough.\n\nYou roll. She smiles and tells you where your piece goes.\nThen tells you the rule that determined it.\nAfter you\'ve already moved.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'Oh~\n\nActually, Rule 12 says I can redirect pieces on shared squares.\n\n(She moves yours.)\n\n"Isn\'t that interesting?"',
      },
      {
        type: 'narration',
        text: 'This happens four more times.\n\nEach rule explained after it\'s already been applied.\nEach time, you\'ve already made your mistake.\n\nShe resets the board fast. Too fast.\nLike she\'s done this hundreds of times before.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '(She resets again. Cheerfully.)\n\nOne more~?\n\nYou almost had it that time, {name}~',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"How many times have you played this?"',
            nextScene: 'mei_ch2_a2',
            statEffect: {
              fear: 3,
              defiance: 3,
            },
          },
          {
            label: '"Sure. One more."',
            nextScene: 'mei_end_ch2_player_two',
            statEffect: {
              affection: 5,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch2_a2: {
    id   : 'mei_ch2_a2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'Hmm~\n\n(She counts on her fingers.)\n\nWith myself? To test the rules?\n\nAbout two hundred and thirty times, I think.\nMaybe two fifty.',
      },
      {
        type: 'narration',
        text: 'She says it the way you\'d say "I\'ve read that book a few times."\n\nTwo hundred and thirty solo games.\nIn careful preparation for today.\nFor you.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I wanted it to be perfect for {name}.\n\n(She lines up the pieces again.)\n\n"So you\'d always want to keep playing~"',
      },
      {
        type: 'narration',
        text: 'You understand, suddenly, what "perfect" means here.\n\nA game you can never win.\nRules that shift after you\'ve already moved.\nA board designed so you always want one more round.\nA Rule 47 that makes sure you never agree to stop.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She doesn\'t reset the board this time.\nShe just looks at you.)\n\n…\n\nDo you want to forfeit, {name}?',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I forfeit."',
            nextScene: 'mei_end_ch2_predictable',
            statEffect: {
              defiance: 5,
              fear: 3,
            },
          },
          {
            label: '"…Let\'s keep playing."',
            nextScene: 'mei_end_ch2_player_two',
            statEffect: {
              dependency: 6,
              obedience: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch2_b1: {
    id   : 'mei_ch2_b1',
    steps: [
      {
        type: 'narration',
        text: 'The notebook is heavy.\n\nSoft cover, worn at the corners.\nThe rules are written in very neat handwriting.\nThere are 47 of them.',
      },
      {
        type: 'narration',
        text: 'Rules 1 through 20: standard. Fair, even.\nRules 21 through 39: she can redirect, reset, add turns.\nYou start to see the shape of it.\n\nRule 40: "If a player forfeits, they forfeit their next three turns as well."\n\nRule 47: "The game ends when both players agree that it has ended."',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She\'s watching you read.\nChin in her hands.)\n\n{name}~\n\nHave you gotten to Rule 40 yet~?',
      },
      {
        type: 'narration',
        text: 'You have.\n\nYou\'ve also gotten to Rule 47.\nAnd you are trying very hard to make your face say nothing.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What does Rule 47 mean?"',
            nextScene: 'mei_ch2_b2',
            statEffect: {
              fear: 4,
              defiance: 3,
            },
          },
          {
            label: '"I don\'t think I want to play this."',
            nextScene: 'mei_ch2_b2',
            statEffect: {
              fear: 5,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch2_b2: {
    id   : 'mei_ch2_b2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(The smile doesn\'t change.)\n\nRule 47 means exactly what it says~\n\nThe game ends when both players agree it\'s over.\n\n(She gestures at the board.)\n\n"Do you agree it\'s over?"',
      },
      {
        type: 'narration',
        text: 'You open your mouth.\n\nYou think about what "agree" means here.\nWhether sitting down counted.\nWhether taking the notebook counted.\nWhether being here — on this blanket, on this rooftop — already counted.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She tilts her head.)\n\n{name}~\n\nYou\'re already playing.\n\n(She moves a piece to the center of the board.)\n\n"Your turn."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What if I never agree to end it?"',
            nextScene: 'mei_end_ch2_house_rules',
            statEffect: {
              defiance: 6,
              fear: 5,
            },
          },
          {
            label: '"…Fine. Let\'s play."',
            nextScene: 'mei_end_ch2_the_only_ending',
            statEffect: {
              obedience: 6,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  mei_end_ch2_player_two: {
    id   : 'mei_end_ch2_player_two',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: 'Yay~! ♪\n\n(She resets the board instantly.)\n\nOne more, one more~\n\n"I\'ll give you a hint this time.\nRule 3: the lucky number is whatever I say it is~"',
      },
      {
        type: 'narration',
        text: 'You play another round.\n\nAnd another.\n\nThe sun moves. The rooftop empties around you.\nYou are still here, still playing,\nand you don\'t know when you decided to stay.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She sets up the pieces again. Automatic. Precise.)\n\n{name}~\n\nI\'m glad you came today.\n\n"I thought you might not."',
      },
      {
        type: 'narration',
        text: 'You don\'t ask what would have happened if you hadn\'t.\n\nYou take your piece.\nYou roll.',
      },
      {
        type: 'end',
        endingName: 'Player Two',
        endingIndex: 10,
        rarity: 'normal',
      },
    ],
  },

  mei_end_ch2_predictable: {
    id   : 'mei_end_ch2_predictable',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She tilts her head.)\n\nOh.\n\n…\n\n"Rule 40."',
      },
      {
        type: 'narration',
        text: '"If a player forfeits, they forfeit their next three turns as well."\n\nShe recites it from memory.\nShe doesn\'t check the notebook.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'So you\'d still be playing.\n\n(She moves your piece for you, carefully.)\n\n"Forfeiting just means I move for you for a while~\n\nIsn\'t that — nicer? I\'ll be very careful with you."',
      },
      {
        type: 'narration',
        text: 'You stare at the board.\n\nYou called it.\nYou saw exactly what this game was.\n\nAnd it doesn\'t matter.\n\nShe knew you\'d see it.\nShe built the rules anyway.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She looks at you, steady and warm.)\n\nYou\'re very predictable, {name}.\n\n"That\'s why I like you~"',
      },
      {
        type: 'end',
        endingName: 'Predictable',
        endingIndex: 11,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch2_house_rules: {
    id   : 'mei_end_ch2_house_rules',
    steps: [
      {
        type: 'horror',
        effect: 'flicker_slow',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(The smile stays.\nBut it\'s different now.\nIt\'s the one she has when the answer is something she won\'t say out loud.)\n\n…',
      },
      {
        type: 'narration',
        text: 'She doesn\'t answer.\n\nShe picks up a piece instead.\nSets it down in the center of the board.\nSo gently it doesn\'t make a sound.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: 'Your turn, {name}.\n\n(She doesn\'t look away.)\n\n"…Your turn."',
      },
      {
        type: 'narration',
        text: 'You understand that the question has been answered.\n\nJust not in words.\n\nYou take your piece.\nYour hand is completely steady.\nYou don\'t know why.',
      },
      {
        type: 'end',
        endingName: 'House Rules',
        endingIndex: 12,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch2_the_only_ending: {
    id   : 'mei_end_ch2_the_only_ending',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '(Her whole face lights up.)\n\n♪~!\n\n"I knew you\'d choose that.\nRule 47 only works if you mean it, you know~"',
      },
      {
        type: 'narration',
        text: 'You didn\'t mean it.\n\nBut you said it,\nand she\'s already moving the pieces,\nand the afternoon is warm,\nand she\'s explaining Rule 5 now,\nand you\'re listening,\nand—\n\nYou\'re playing.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(Quietly, while you study the board.)\n\nThere\'s only one way this game ends, {name}~\n\n"Rule 47.\nBoth players agree.\n\nAnd I\'m not going to agree for a very long time."',
      },
      {
        type: 'narration',
        text: 'She says it like a gift.\n\nLike she\'s telling you something wonderful.\n\nMaybe she is.',
      },
      {
        type: 'end',
        endingName: 'The Only Ending',
        endingIndex: 13,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 3 — "The Arrangement"
     She's arranged your life after graduation. Apartment, job,
     schedule — all of it decided before you knew to have an opinion.

     DEVOTED PATH  (4 choices):
       himari_ch3_start → himari_ch3_a1 → himari_ch3_a2
         → himari_end_ch3_new_address    [20 — Normal]
         → himari_end_ch3_signed_in_full [21 — Rare]

     DEFIANT PATH  (4 choices):
       himari_ch3_start → himari_ch3_b1 → himari_ch3_b2
         → himari_end_ch3_terms_and_conditions [22 — Rare]
         → himari_end_ch3_the_open_door        [23 — Normal]
     ════════════════════════════════════════════════════════ */

  himari_ch3_start: {
    id   : 'himari_ch3_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/rose_salon.jpg',
      },
      {
        type: 'narration',
        text: 'She said she had news.\n\nShe said it the way she says everything — as if the information already existed and she was simply transmitting it.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'You\'re graduating in three weeks.\n\n(She sets a folder on the table between you.)\n\n"I\'ve been thinking about the transition.\nThere are arrangements I\'d like to discuss."',
      },
      {
        type: 'narration',
        text: 'The folder is thick.\n\nYou can see tabs. Dates. Paperwork.\n\nArrangements.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'A new apartment. Already furnished.\nA position at Aoyama Corporate Services — entry-level, good trajectory.\n\n(She opens the folder.)\n\n"I\'ve handled the paperwork for both.\nI simply need your signature."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I open the folder.]',
            nextScene: 'himari_ch3_a1',
            statEffect: {
              affection: 4,
              obedience: 6,
            },
          },
          {
            label: '"You arranged all of this without asking me."',
            nextScene: 'himari_ch3_b1',
            statEffect: {
              fear: 8,
              defiance: 6,
            },
          },
        ],
      },
    ],
  },

  himari_ch3_a1: {
    id   : 'himari_ch3_a1',
    steps: [
      {
        type: 'narration',
        text: 'Photographs of the apartment. Third floor.\nA window that faces east.\nThe kind of light you\'ve always liked.\n\nShe knows the kind of light you\'ve always liked.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'I had it staged the way your current place is arranged.\n\n(She turns to a page of interior photographs.)\n\n"Your bookshelf organization. Your preferred desk position.\nThe kitchen layout you use.\nI gave the designer specific reference photographs."',
      },
      {
        type: 'narration',
        text: 'Reference photographs.\n\nOf your current apartment.\nFrom her visits.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You knew what I\'d want."',
            nextScene: 'himari_ch3_a2',
            statEffect: {
              dependency: 6,
              affection: 4,
            },
          },
          {
            label: '[I look at the photographs. She knows me too well.]',
            nextScene: 'himari_ch3_a2',
            statEffect: {
              fear: 5,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch3_a2: {
    id   : 'himari_ch3_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I\'ve known what you\'d want for a long time, {name}.\n\n(She turns to the employment section.)\n\n"The position was written around your specific qualifications.\nI collaborated with the department director.\nThe role exists because I created it for you."',
      },
      {
        type: 'narration',
        text: 'A role created for you.\n\nNot applied for.\nNot earned.\nMade.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'The lease is on page fourteen.\nThe employment contract on page twenty-one.\n\n(She sets a pen beside the folder.)\n\n"Take your time, {name}.\nBut the apartment is available from the first.\nThat\'s in eleven days."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I pick up the pen.]',
            nextScene: 'himari_end_ch3_signed_in_full',
            statEffect: {
              obedience: 12,
              dependency: 8,
            },
          },
          {
            label: '"You planned this for years. This has been planned for years."',
            nextScene: 'himari_end_ch3_new_address',
            statEffect: {
              fear: 6,
              affection: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch3_b1: {
    id   : 'himari_ch3_b1',
    steps: [
      {
        type: 'narration',
        text: 'She doesn\'t look surprised.\n\nShe sets the folder open anyway.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'The decisions are already made, {name}.\n\n(Calmly. Not cruelly.)\n\n"The apartment lease is signed.\nThe employment position is held.\nWhat I\'m asking for now is your signature — which changes nothing material. It simply makes it official."',
      },
      {
        type: 'narration',
        text: 'Changes nothing material.\n\nThe apartments is already signed.\nThe job already exists.\nThe paperwork already done.\n\nYour signature is a formality.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'ll refuse the apartment. I\'ll find my own place."',
            nextScene: 'himari_ch3_b2',
            statEffect: {
              defiance: 8,
              fear: 5,
            },
          },
          {
            label: '[She\'s been building this since before I knew her.]',
            nextScene: 'himari_ch3_b2',
            statEffect: {
              fear: 9,
              obedience: 4,
            },
          },
        ],
      },
    ],
  },

  himari_ch3_b2: {
    id   : 'himari_ch3_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'You can refuse the apartment.\n\n(She considers it, like a logic problem.)\n\n"But I hold the lease. You\'d simply be paying rent\non an apartment you\'ve declined to live in.\nThe room will stay ready for you."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'The position at Aoyama is similar.\n\nThey\'re expecting you.\nDecline it and the role disappears — it was created specifically.\nThere\'s no transferring that into someone else\'s offer.\n\n(She closes the folder quietly.)\n\n"You\'re not trapped, {name}.\nI just — plan carefully."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I understand. There is no exit here I haven\'t already been placed inside.]',
            nextScene: 'himari_end_ch3_the_open_door',
            statEffect: {
              fear: 10,
              obedience: 7,
            },
          },
          {
            label: '"What if I don\'t sign anything?"',
            nextScene: 'himari_end_ch3_terms_and_conditions',
            statEffect: {
              defiance: 10,
              fear: 8,
            },
          },
        ],
      },
    ],
  },

  himari_end_ch3_new_address: {
    id   : 'himari_end_ch3_new_address',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'Yes.\n\n(She turns to a page near the back. A photograph of the front door.)\n\n"For years.\nSince before you graduated.\nSince before you chose your major, actually."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She hands you the key.\n\nA single key on a plain ring.\nThe apartment number stamped on the tag.\n\n"Welcome home, {name}."',
      },
      {
        type: 'narration',
        text: 'The apartment is everything you\'d have chosen.\n\nThat\'s what\'s wrong.\n\nYou can\'t point to a single thing and say it isn\'t right.\nEvery shelf, every window, every angle of light.\nChosen for you.\nFrom photographs of your existing life.',
      },
      {
        type: 'end',
        endingName: 'New Address',
        endingIndex: 20,
        rarity: 'normal',
      },
    ],
  },

  himari_end_ch3_signed_in_full: {
    id   : 'himari_end_ch3_signed_in_full',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: '(She watches you write your name.)\n\n(She doesn\'t look at the paper.)\n\n(She watches your hand.)',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You sign the lease.\nYou sign the employment contract.\n\nShe doesn\'t move to take them immediately.\nShe just watches you set the pen down.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I already have copies.\n\n(She takes the papers, finally.)\n\n"I just wanted to watch you sign your name.\nSomething about it — being official.\nI needed it to be official, {name}."',
      },
      {
        type: 'narration',
        text: 'The folder closes.\n\nYour future, organized by tab, filed by date.\nShe already had copies.\nShe just needed you to choose it in ink.',
      },
      {
        type: 'end',
        endingName: 'Signed in Full',
        endingIndex: 21,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch3_terms_and_conditions: {
    id   : 'himari_end_ch3_terms_and_conditions',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'All right.\n\n(She closes the folder. Sets it to one side.)\n\n"You don\'t have to sign anything today, {name}.\nThe arrangements will remain in place."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'The arrangements will remain in place.\n\nThe apartment sits empty, rented in your name without your signature.\nThe job waits, created for you, unfilled.\n\nShe\'s not angry.\nShe\'s just — waiting.',
      },
      {
        type: 'narration',
        text: 'She mails you a spare key to the apartment a week later.\n\n"In case you change your mind."\n\nThe card is in her handwriting.\nThe postscript: "I\'ve left the east window unlocked.\nYou always liked that light."',
      },
      {
        type: 'end',
        endingName: 'Terms and Conditions',
        endingIndex: 22,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch3_the_open_door: {
    id   : 'himari_end_ch3_the_open_door',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'Whenever you\'re ready, {name}.\n\n(She takes the folder from the table.)\n\n"I\'m not in a hurry.\nThe arrangements don\'t expire."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You leave without signing.\n\nThe apartment exists.\nThe job exists.\nThe future she designed for you exists.\n\nNone of it requires your signature to be real.',
      },
      {
        type: 'narration',
        text: 'She texts you three days later.\n\n"The east window has good light this week.\nThought you should know."\n\nYou think about a room you\'ve never been in.\nYou already know exactly what it looks like.',
      },
      {
        type: 'end',
        endingName: 'The Open Door',
        endingIndex: 23,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 3 — "The Letter"
     A letter falls from her bag. Written to you. Dated four
     months ago. She has thirty-seven of them.

     TOGETHER PATH  (4 choices):
       shizuku_ch3_start → shizuku_ch3_a1 → shizuku_ch3_a2
         → shizuku_end_ch3_unread  [20 — Normal]
         → shizuku_end_ch3_draft   [21 — Rare]

     DARK LETTER PATH  (4 choices):
       shizuku_ch3_start → shizuku_ch3_b1 → shizuku_ch3_b2
         → shizuku_end_ch3_every_word  [22 — Rare]
         → shizuku_end_ch3_permission  [23 — Normal]
     ════════════════════════════════════════════════════════ */

  shizuku_ch3_start: {
    id   : 'shizuku_ch3_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/library.jpg',
      },
      {
        type: 'narration',
        text: 'A letter falls from her bag.\n\nIt hits the floor and slides halfway under the table.\nShe moves fast — faster than you\'d expect from her — and snatches it back.',
      },
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'flustered',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'flustered',
        text: 'That\'s — it\'s nothing. Please don\'t—\n\n(She holds it against her chest.)\n\n"It\'s just something I was — it\'s nothing, {name}."',
      },
      {
        type: 'narration',
        text: 'It\'s an envelope.\nAddressed.\nIn her handwriting.\n\nYour name on the front.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Shizuku. That has my name on it."',
            nextScene: 'shizuku_ch3_a1',
            statEffect: {
              affection: 4,
              dependency: 4,
            },
          },
          {
            label: '[I saw your name. But I don\'t push. She\'ll tell me when she\'s ready.]',
            nextScene: 'shizuku_ch3_b1',
            statEffect: {
              affection: 3,
              fear: 4,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch3_a1: {
    id   : 'shizuku_ch3_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I have thirty-seven of them.\n\n(She sits back down. Holds the envelope in both hands.)\n\n"All to you. All unsent.\nI write them when I need to say something and can\'t.\nThis one is four months old."',
      },
      {
        type: 'narration',
        text: 'Thirty-seven letters.\n\nFour months. Thirty-seven times she needed to say something\nand chose paper instead of you.',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'You can read one if you want.\n\n(She offers it uncertainly.)\n\n"Or all of them.\nI\'ve thought about showing you.\nFor a long time I\'ve thought about it."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Can I read this one?"',
            nextScene: 'shizuku_ch3_a2',
            statEffect: {
              affection: 6,
              dependency: 5,
            },
          },
          {
            label: '[I pick one from her bag at random.]',
            nextScene: 'shizuku_ch3_a2',
            statEffect: {
              fear: 3,
              affection: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch3_a2: {
    id   : 'shizuku_ch3_a2',
    steps: [
      {
        type: 'narration',
        text: 'The letter is from eight months ago.\n\nIt begins: "I keep trying to tell you things directly and failing so I\'m going to write it down instead."\n\nShe notices everything.\nThe way you hold a pen. The specific sound of your laugh. The expression you make when you\'re pretending to agree with something you don\'t agree with.\n\nShe has catalogued you.',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I notice too much.\n\n(She\'s watching you read.)\n\n"I always have. Since I was small.\nI notice everything about everyone and it\'s usually a lot to carry.\n\nWith you it\'s — different. I don\'t mind the weight."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You notice everything."',
            nextScene: 'shizuku_end_ch3_draft',
            statEffect: {
              affection: 10,
              dependency: 8,
            },
          },
          {
            label: '[I fold the letter. I feel something I can\'t name when I read this.]',
            nextScene: 'shizuku_end_ch3_unread',
            statEffect: {
              fear: 4,
              dependency: 7,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch3_b1: {
    id   : 'shizuku_ch3_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'You saw the name.\n\n(She closes her eyes briefly.)\n\n"I\'ll tell you.\nI should tell you.\nIt\'s just — I\'ve imagined this moment many times\nand in none of them did you look at me quite like that."',
      },
      {
        type: 'narration',
        text: 'She shows you the envelope.\n\nYour name on the front.\nHer seal on the back. Intact. Never opened.\n\n"I have thirty-seven of these. All to you. All unsent.\nI write them when I can\'t say something directly."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Can I read them?"',
            nextScene: 'shizuku_ch3_b2',
            statEffect: {
              affection: 4,
              dependency: 5,
            },
          },
          {
            label: '[She has thirty-seven letters she\'s never sent me. I don\'t know what to do with that.]',
            nextScene: 'shizuku_ch3_b2',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch3_b2: {
    id   : 'shizuku_ch3_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Most of them are — fine.\n\n(She hands you a different envelope. Hesitates.)\n\n"But there\'s one. From a bad day last winter.\nIt\'s not — I wasn\'t okay that day.\nI wrote things I wouldn\'t normally—"',
      },
      {
        type: 'narration',
        text: 'She\'s showing it to you anyway.\n\nShe could have left it out.\nShe chose to show you.',
      },
      {
        type: 'narration',
        text: 'The letter from the bad day describes what she\'d do if you left.\n\nNot a threat.\nA feeling so specific it has the shape of a plan.\n\nThe handwriting doesn\'t shake at all.\nThat might be the most frightening thing about it.',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Shizuku — what does this mean?"',
            nextScene: 'shizuku_end_ch3_every_word',
            statEffect: {
              fear: 8,
              dependency: 5,
            },
          },
          {
            label: '[I read it again. The handwriting doesn\'t shake at all.]',
            nextScene: 'shizuku_end_ch3_permission',
            statEffect: {
              fear: 10,
              dependency: 6,
            },
          },
        ],
      },
    ],
  },

  shizuku_end_ch3_unread: {
    id   : 'shizuku_end_ch3_unread',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'You don\'t have to read more than you want to.\n\n(She takes the letters back. Ties them with a ribbon she had ready.)\n\n"Someday, maybe.\nWhen you\'re — ready.\nOr when I am."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She puts the bundle away.\n\nYou don\'t see where.\n\nYou\'re still thinking about the one you read.\nThe precision of it.\nThe weight of all the things she noticed and wrote down\ninstead of saying to your face.',
      },
      {
        type: 'narration',
        text: 'You wonder how many more she\'ll write.\n\nYou wonder if she\'s writing one right now, in her head,\nabout this moment.',
      },
      {
        type: 'end',
        endingName: 'Unread',
        endingIndex: 20,
        rarity: 'normal',
      },
    ],
  },

  shizuku_end_ch3_draft: {
    id   : 'shizuku_end_ch3_draft',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'Would you — \n\n(She pushes a blank sheet of paper toward you.)\n\n"I don\'t care what it says.\nAnything.\nI just want your handwriting.\nSomething to keep."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You pick up the pen.\n\nYou sit there for a while.\n\nThere\'s a lot you could say.\nYou\'re not sure which version of it is true yet.\n\nYou write something.\n\nShe reads it.\nHer expression doesn\'t change — \nbut something in her stills, the way water stills,\nand you understand that whatever you wrote\nwill go into the bundle with the ribbon.',
      },
      {
        type: 'end',
        endingName: 'Draft',
        endingIndex: 21,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch3_every_word: {
    id   : 'shizuku_end_ch3_every_word',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'It means I was very scared that day.\n\n(She doesn\'t try to take the letter back.)\n\n"When I\'m afraid of something badly enough,\nthe feeling has to go somewhere.\nI put it in letters.\nSo it doesn\'t have to be inside me."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You\'ve read three letters now.\n\nYou\'re going to read all of them.\n\nYou both know it.\n\nShe slides the stack toward you without being asked.\n\nThe bundle is heavier than you expected.\nShe\'s been afraid for a long time.',
      },
      {
        type: 'end',
        endingName: 'Every Word',
        endingIndex: 22,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch3_permission: {
    id   : 'shizuku_end_ch3_permission',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'Now you know.\n\n(She says it quietly, after a long silence.)\n\n"Now you know what I carry around.\nI always thought if you knew,\nyou\'d — leave.\n\nBut I wanted you to know anyway."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She sounds relieved.\n\nThat\'s what gets you.\nShe sounds relieved.\n\nShe showed you the letter about what she\'d do if you left,\nand she sounds relieved that you\'re still sitting here.',
      },
      {
        type: 'end',
        endingName: 'Permission',
        endingIndex: 23,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 3 — "The Variable"
     She shows you her predictive model. It predicts you with
     91.3% accuracy. It also flags her attachment as
     "uncorrectable variable — recommend removal."

     ENGAGE PATH  (4 choices):
       reina_ch3_start → reina_ch3_a1 → reina_ch3_a2
         → reina_end_ch3_controlled_variable  [20 — Normal]
         → reina_end_ch3_non_linear_output    [21 — Rare]

     DENY PATH  (4 choices):
       reina_ch3_start → reina_ch3_b1 → reina_ch3_b2
         → reina_end_ch3_null_hypothesis      [22 — Rare]
         → reina_end_ch3_standard_deviation   [23 — Normal]
     ════════════════════════════════════════════════════════ */

  reina_ch3_start: {
    id   : 'reina_ch3_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/lab_office.jpg',
      },
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I want to show you the model.\n\n(She opens her laptop.)\n\n"I\'ve been running it for sixteen months.\nThe predictive accuracy is currently 91.3%."',
      },
      {
        type: 'narration',
        text: 'A graph. A timeline. Data points labeled with your name.\n\nPredicted: what you\'d do. What you\'d say. How you\'d react.\n\nActual: what happened.\n\nThey match. Nearly every time, they match.',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Last Tuesday. The conversation we had at the library.\n\n(She points to a point on the graph.)\n\n"The model predicted you\'d say something specific about your brother.\nYou did.\nThe week before — the café. Your reaction to the menu change.\nPredicted correctly."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Show me all of it."',
            nextScene: 'reina_ch3_a1',
            statEffect: {
              fear: 4,
              dependency: 5,
            },
          },
          {
            label: '"I don\'t want to be a variable in your model."',
            nextScene: 'reina_ch3_b1',
            statEffect: {
              defiance: 8,
              fear: 5,
            },
          },
        ],
      },
    ],
  },

  reina_ch3_a1: {
    id   : 'reina_ch3_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Sixteen months of predictions.\n\n(She scrolls through them.)\n\n"The early months are less accurate — Month One was only 68%.\nBy Month Eight I was above 85.\nBy Month Twelve, consistent above 90."',
      },
      {
        type: 'narration',
        text: 'You scroll through your own predicted behavior.\n\nAccurate. Accurate. Accurate.\nOne misprediction in Month Six — she\'s annotated it: "Anomaly. Possible external input not captured."',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'There\'s something else.\n\n(She pauses.)\n\n"The model also analyzes me.\nAs a confounding variable.\nMonth Twelve — it flagged something.\nI want you to read it."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What did it flag?"',
            nextScene: 'reina_ch3_a2',
            statEffect: {
              fear: 6,
              dependency: 5,
            },
          },
          {
            label: '[I scroll to Month Twelve.]',
            nextScene: 'reina_ch3_a2',
            statEffect: {
              fear: 7,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  reina_ch3_a2: {
    id   : 'reina_ch3_a2',
    steps: [
      {
        type: 'narration',
        text: '"Analyst attachment to subject: significant.\nClassification: uncorrectable variable.\nRecommendation: remove analyst from study to preserve model integrity."',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I attempted to correct it.\n\n(She says it very quietly.)\n\n"I reduced contact for two weeks.\nThe model\'s predictions became less accurate, not more.\nI don\'t understand why yet.\n\nThe variable isn\'t correctable by removal."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Maybe the model is wrong about what should be corrected."',
            nextScene: 'reina_end_ch3_non_linear_output',
            statEffect: {
              affection: 10,
              dependency: 8,
            },
          },
          {
            label: '[She tried to stop. The model got worse. She couldn\'t stop.]',
            nextScene: 'reina_end_ch3_controlled_variable',
            statEffect: {
              fear: 6,
              dependency: 8,
            },
          },
        ],
      },
    ],
  },

  reina_ch3_b1: {
    id   : 'reina_ch3_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'You already are.\n\n(She says it without apology.)\n\n"Whether you look at the model changes nothing about the data.\nThe variable exists whether or not the subject acknowledges it."',
      },
      {
        type: 'narration',
        text: 'The variable exists.\n\nYou are a variable.\nYou have been one for sixteen months.\nWhether or not you know changes nothing about what she\'s already collected.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You can\'t reduce people to data."',
            nextScene: 'reina_ch3_b2',
            statEffect: {
              defiance: 8,
              fear: 5,
            },
          },
          {
            label: '[I know she knows this. I know she does it anyway.]',
            nextScene: 'reina_ch3_b2',
            statEffect: {
              fear: 8,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  reina_ch3_b2: {
    id   : 'reina_ch3_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model predicted you\'d say that.\n\n(She turns the laptop toward you.)\n\n"Exactly that phrasing. Week 48 of observation.\nPredicted: Subject will express objection to reductionism.\nActual: confirmed."',
      },
      {
        type: 'narration',
        text: 'Your exact objection.\nPredicted weeks ago.\nFiled.\nWaited for.',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model also predicted this response from me.\n\n(Quietly.)\n\n"And your response to my response.\nAnd the silence after.\nAnd the thing you\'re going to say next, {name}."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Is there anything in the model that I did that you didn\'t predict?"',
            nextScene: 'reina_end_ch3_null_hypothesis',
            statEffect: {
              fear: 8,
              defiance: 6,
            },
          },
          {
            label: '[Is there any part of me she hasn\'t already mapped?]',
            nextScene: 'reina_end_ch3_standard_deviation',
            statEffect: {
              fear: 10,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  reina_end_ch3_controlled_variable: {
    id   : 'reina_end_ch3_controlled_variable',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Month Seventeen will be interesting.\n\n(She closes the laptop.)\n\n"There\'s one scenario I haven\'t been able to model yet.\nOne variable I can\'t seem to account for correctly."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She hesitates.\n\nYou\'ve never seen her hesitate before.\n\n"The model doesn\'t know what to do with — happiness.\nAs a variable.\nIt keeps flagging it as noise.\nI think the model is wrong.\nI think it\'s signal."',
      },
      {
        type: 'end',
        endingName: 'Controlled Variable',
        endingIndex: 20,
        rarity: 'normal',
      },
    ],
  },

  reina_end_ch3_non_linear_output: {
    id   : 'reina_end_ch3_non_linear_output',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Maybe.\n\n(She looks at the screen for a long time.)\n\n"The accuracy started dropping after Month Twelve.\nI thought the model was flawed.\nThen I understood what had changed."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: '"You changed the model, {name}.\nFrom the inside.\nThe model can\'t fully account for a variable that affects the analyst.\nThe analyst is now different.\n\nSo the predictions are less clean."\n\nShe looks at her hands.\n\n"I find that — unexpectedly difficult to quantify."',
      },
      {
        type: 'end',
        endingName: 'Non-Linear Output',
        endingIndex: 21,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch3_null_hypothesis: {
    id   : 'reina_end_ch3_null_hypothesis',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'One thing.\n\n(She scrolls. Slowly.)\n\n"This conversation.\nThis exact exchange.\nThe model didn\'t predict it."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She closes the laptop.\n\n"The model predicted you\'d disengage.\nNot — engage like this.\nNot ask that question.\nIt\'s a small misprediction.\nBut it\'s the most important one."',
      },
      {
        type: 'narration',
        text: 'She looks at you.\n\nSomething shifts in her expression.\nVery small.\nJust barely.\n\n"I think that\'s good," she says.\n\nShe doesn\'t explain why.',
      },
      {
        type: 'end',
        endingName: 'Null Hypothesis',
        endingIndex: 22,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch3_standard_deviation: {
    id   : 'reina_end_ch3_standard_deviation',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'You\'re a standard deviation of yourself.\n\n(She says it quietly.)\n\n"The model can predict the mean.\nThe average {name}.\nIt can\'t predict you specifically, in any given moment.\n\nI find that very — " ',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She stops.\n\nShe doesn\'t finish the sentence.\n\nThe silence has a shape in it — \nsomething she chose not to say,\nor couldn\'t say,\nor found the model hadn\'t given her words for yet.\n\nYou sit with the incomplete sentence.\nIt doesn\'t feel empty.\n\nIt feels like a door she almost opened.',
      },
      {
        type: 'end',
        endingName: 'Standard Deviation',
        endingIndex: 23,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 3 — "The Red Pages"
     She said she'd show you someday. Today is the day.
     A red notebook. Twenty-three names. Your name on a blank page.

     LOOK PATH:
       mei_ch3_start → mei_ch3_a1 → mei_ch3_a2
         → mei_end_ch3_red_ink         [20 — Normal]
         → mei_end_ch3_three_pages     [21 — Rare]

     DECLINE PATH:
       mei_ch3_start → mei_ch3_b1 → mei_ch3_b2
         → mei_end_ch3_already_happened [22 — Rare]
         → mei_end_ch3_keeping_count    [23 — Normal]
     ══════════════════════════════════════════════════════════ */

  mei_ch3_start: {
    id   : 'mei_ch3_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/classroom.jpg',
      },
      {
        type: 'narration',
        text: 'After class.\n\nShe\'s waiting outside the door.\nShe has a notebook tucked under her arm — red leather, spine creased with use.\nShe looks like someone who\'s been deciding something for a long time\nand has finally decided.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '{name}~\n\nI said I\'d show you someday.\n\n(She holds it out, both hands.)\n\n"Today is the day~"',
      },
      {
        type: 'narration',
        text: 'The cover is red. Scuffed at the corners.\nThere\'s no title — just a small bell drawn on the inside flap.\nThe same kind she gave you.\n\nShe opens to the first page without looking at it.\nShe\'s memorized it.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I keep records.\n\n"Everyone who\'s been important to me.\nWhere they went.\nHow it ended.\n\nI\'ve been keeping this since I was nine~"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'d like to look."',
            nextScene: 'mei_ch3_a1',
            statEffect: {
              dependency: 4,
              affection: 3,
            },
          },
          {
            label: '"I don\'t think I should see that."',
            nextScene: 'mei_ch3_b1',
            statEffect: {
              fear: 5,
              defiance: 4,
            },
          },
        ],
      },
    ],
  },

  mei_ch3_a1: {
    id   : 'mei_ch3_a1',
    steps: [
      {
        type: 'narration',
        text: 'The first pages: names.\n\nA friend from elementary school. A neighbor. A tutor.\nA girl who sat next to her in second year.\nEach one: a name, a date, a short note.\n"Moved away." "Stopped responding." "Chose someone else."',
      },
      {
        type: 'narration',
        text: 'The notes get shorter as you go.\n\nThe later ones don\'t explain.\nThey just end.\nA name. A date. A blank line where the reason should be.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She\'s watching you read.\nVery still. Very patient.)\n\nTwenty-three names.\n\n"None of them stayed~"',
      },
      {
        type: 'narration',
        text: 'Twenty-three names.\nTwenty-three times someone decided she wasn\'t worth staying for.\n\nYou turn another page.\n\nThe remaining pages are blank.\nExcept for one name.\nNear the top of the first blank page.\n\nYours.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '(You go still.)',
            nextScene: 'mei_ch3_a2',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
          {
            label: '"Why is my name here?"',
            nextScene: 'mei_ch3_a2',
            statEffect: {
              fear: 5,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch3_a2: {
    id   : 'mei_ch3_a2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She looks at it.\nThen at you.)\n\nI haven\'t written anything yet.\n\n"There\'s nothing to write~"',
      },
      {
        type: 'narration',
        text: 'The name is written the same way as all the others.\nNeat. Patient. Like it was always going to be there.\n\nBut the rest of the page is blank.\nNo date. No note. No reason.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'Blank pages are — hopeful.\n\n(She closes the notebook gently, with both hands.)\n\n"They mean the story hasn\'t ended yet.\n\nI want {name}\'s pages to stay blank\nfor a very, very long time~"',
      },
      {
        type: 'narration',
        text: 'She says it like a kindness.\n\nLike blank pages are a promise.\nNot a threat.\n\nYou want very badly to believe they\'re the same thing.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'m not going to leave."',
            nextScene: 'mei_end_ch3_red_ink',
            statEffect: {
              affection: 6,
              dependency: 6,
            },
          },
          {
            label: '(You don\'t say anything.)',
            nextScene: 'mei_end_ch3_three_pages',
            statEffect: {
              fear: 5,
              defiance: 4,
            },
          },
        ],
      },
    ],
  },

  mei_ch3_b1: {
    id   : 'mei_ch3_b1',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She tilts her head.)\n\nWhy not~?\n\n(She pulls it back, holds it against her chest.)\n\n"I wasn\'t going to show you everyone.\nJust the blank pages."',
      },
      {
        type: 'narration',
        text: 'The blank pages.\n\nShe said it like it\'s already a section you should know about.\nLike it\'s been waiting for you specifically.\n\nYou don\'t like how she said "everyone."',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I keep blank pages at the back.\n\n(She opens to the very end without looking.)\n\n"For the ones I\'m still — waiting on.\nThe ones who haven\'t gone anywhere yet~"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What\'s written there?"',
            nextScene: 'mei_ch3_b2',
            statEffect: {
              fear: 4,
              defiance: 3,
            },
          },
          {
            label: '"I really don\'t want to see this."',
            nextScene: 'mei_ch3_b2',
            statEffect: {
              fear: 6,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch3_b2: {
    id   : 'mei_ch3_b2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She turns it toward you anyway.\nJust one page.)\n\nJust your name.\n\nNothing else~',
      },
      {
        type: 'narration',
        text: 'Your name.\n\nIn the same handwriting as the twenty-three before you.\nNeat. Patient. Written like it was always going to be there.\n\nThe rest of the page is completely blank.\nNo date. No note.\n\nYet.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I haven\'t written anything yet.\n\n(She holds the notebook lightly, like something precious.)\n\n"Blank pages are nice.\nThey mean I\'m still — waiting for the story~"',
      },
      {
        type: 'narration',
        text: 'Waiting for the story.\n\nYou think about what comes after your name when the story ends.\nYou think about the twenty-three people before you.\nThe ones with dates. The ones with reasons.\nThe ones whose pages are full.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"How long will you wait?"',
            nextScene: 'mei_end_ch3_keeping_count',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
          {
            label: '"Don\'t put me in that book."',
            nextScene: 'mei_end_ch3_already_happened',
            statEffect: {
              defiance: 7,
              fear: 5,
            },
          },
        ],
      },
    ],
  },

  mei_end_ch3_red_ink: {
    id   : 'mei_end_ch3_red_ink',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '(Something in her — brightens.)\n\n♪~\n\n"I know.\n\nI know you\'re not."\n\n(She hugs the notebook to her chest.)\n\n"That\'s why there\'s nothing to write~"',
      },
      {
        type: 'narration',
        text: 'You said it because it was true.\n\nYou think it\'s true.\n\nYou\'re almost completely certain it\'s true.\n\nAnd she\'s smiling the way she only smiles when she already knows the answer\nbefore you\'ve finished speaking.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(Quietly.)\n\n{name}~\n\nThank you for looking.\n\n"Most people don\'t look.\nThey just — leave."',
      },
      {
        type: 'narration',
        text: 'She puts the notebook away.\n\nYou walk home the long way.\nThe bell bumps gently against your chest with every step.',
      },
      {
        type: 'end',
        endingName: 'Red Ink',
        endingIndex: 20,
        rarity: 'normal',
      },
    ],
  },

  mei_end_ch3_three_pages: {
    id   : 'mei_end_ch3_three_pages',
    steps: [
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She watches you not say anything.)\n\n…\n\n(She closes the notebook.)\n\n"That\'s okay too."',
      },
      {
        type: 'narration',
        text: 'She\'s still smiling.\n\nBut it\'s the careful one.\nThe one that means she\'s filing something away.\nAdding it to the record.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I kept three pages for you, actually.\n\n(She tucks it under her arm.)\n\n"Most people only get one.\nBut you — you might need more space.\n\n{name} is a longer story~"',
      },
      {
        type: 'narration',
        text: 'Three pages.\n\nYou don\'t know what goes on three pages.\nYou\'re not sure you want to find out.\n\nShe walks beside you like nothing happened.\nThe bell at your chest doesn\'t make a sound.',
      },
      {
        type: 'end',
        endingName: 'Three Pages',
        endingIndex: 21,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch3_already_happened: {
    id   : 'mei_end_ch3_already_happened',
    steps: [
      {
        type: 'horror',
        effect: 'flicker_slow',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She doesn\'t react.\nShe looks at the notebook.\nThen at you.)\n\nYour name is already there.\n\n(Very quietly.)\n\n"It\'s been there for a while~"',
      },
      {
        type: 'narration',
        text: 'You don\'t know when she wrote it.\n\nSometime before today.\nSometime when you weren\'t watching.\nYour name, in her handwriting,\non a page that was already waiting.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I can\'t un-write it.\n\n(She closes the notebook.\nSmiles.)\n\n"That\'s not how the book works~\n\nBut the page is still blank.\nThat\'s what matters."',
      },
      {
        type: 'narration',
        text: 'That\'s what matters.\n\nYou repeat it to yourself on the way home.\nYou\'re not sure it makes you feel better.\n\nYou\'re not sure it\'s supposed to.',
      },
      {
        type: 'end',
        endingName: 'Already Happened',
        endingIndex: 22,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch3_keeping_count: {
    id   : 'mei_end_ch3_keeping_count',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She considers this carefully.)\n\nHmm~\n\n(She taps the cover.)\n\n"As long as I need to.\n\nI\'ve been very patient for a very long time, {name}.\nA little more is nothing~"',
      },
      {
        type: 'narration',
        text: 'She\'s been counting.\n\nHow long she\'s waited. How many people left before you.\nHow many blank pages she has left.\n\nShe keeps very careful records.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She puts the notebook away.)\n\n{name}~\n\n"I\'m patient.\n\nI\'m very, very patient\nwith the things I care about."',
      },
      {
        type: 'narration',
        text: 'Patient.\n\nYou think about what that means.\nAbout what she\'s been waiting for.\nAbout whether the blank pages were ever supposed to stay blank.',
      },
      {
        type: 'end',
        endingName: 'Keeping Count',
        endingIndex: 23,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 4 — "The Key"
     Things in your apartment are slightly wrong. A book moved.
     Your kettle in a different cabinet. You know.

     DEVOTED PATH  (4 choices):
       himari_ch4_start → himari_ch4_a1 → himari_ch4_a2
         → himari_end_ch4_familiar      [30 — Normal]
         → himari_end_ch4_the_spare_key [31 — Rare]

     DEFIANT PATH  (4 choices):
       himari_ch4_start → himari_ch4_b1 → himari_ch4_b2
         → himari_end_ch4_visiting_hours [32 — Rare]
         → himari_end_ch4_still_yours    [33 — Normal]
     ════════════════════════════════════════════════════════ */

  himari_ch4_start: {
    id   : 'himari_ch4_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/apartment.jpg',
      },
      {
        type: 'narration',
        text: 'The kettle is in a different cabinet.\n\nNot missing. Not broken.\nJust moved.\n\nYou don\'t move your kettle.',
      },
      {
        type: 'narration',
        text: 'The book on your nightstand is on the left side now.\nYou keep it on the right.\nYou have always kept it on the right.\n\nSomething has been here.',
      },
      {
        type: 'narration',
        text: 'Someone has been here.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I already know who it was. I go to the Rose Salon.]',
            nextScene: 'himari_ch4_a1',
            statEffect: {
              dependency: 5,
              obedience: 5,
            },
          },
          {
            label: '[I check every room. Every drawer. How long has this been happening?]',
            nextScene: 'himari_ch4_b1',
            statEffect: {
              fear: 8,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch4_a1: {
    id   : 'himari_ch4_a1',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/rose_salon.jpg',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I have a key, {name}.\n\n(She doesn\'t pretend not to know why you\'re here.)\n\n"I\'ve had one for some time.\nYou knew, I think, on some level.\nYou never said anything."',
      },
      {
        type: 'narration',
        text: 'You didn\'t say anything.\n\nThe kettle moved. The book moved.\nSmall signs left like breadcrumbs.\n\nYou knew.\nYou didn\'t say anything.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I want you to be able to come."',
            nextScene: 'himari_ch4_a2',
            statEffect: {
              affection: 8,
              obedience: 8,
            },
          },
          {
            label: '"How did you get it?"',
            nextScene: 'himari_ch4_a2',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  himari_ch4_a2: {
    id   : 'himari_ch4_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: '(She doesn\'t answer the how.\nShe accepts the want.)\n\n"I come on Tuesdays, usually.\nWhile you\'re at work.\nThursday evenings sometimes, when you have your late seminar."',
      },
      {
        type: 'narration',
        text: 'A schedule.\n\nShe has a domestic schedule in your apartment.\nTuesday mornings.\nThursday evenings.\n\nRegular. Consistent. Like it\'s always been this way.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I move things sometimes.\n\n(She says it matter-of-factly.)\n\n"Nothing significant. Just to see if you notice.\nYou always do, {name}.\nYou just never say anything."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[Every Tuesday. I think about that now on Tuesday mornings as I leave.]',
            nextScene: 'himari_end_ch4_familiar',
            statEffect: {
              dependency: 10,
              obedience: 8,
            },
          },
          {
            label: '"You can come when you want to."',
            nextScene: 'himari_end_ch4_the_spare_key',
            statEffect: {
              affection: 12,
              obedience: 10,
            },
          },
        ],
      },
    ],
  },

  himari_ch4_b1: {
    id   : 'himari_ch4_b1',
    steps: [
      {
        type: 'narration',
        text: 'You go through every room.\n\nKitchen: reorganized, subtly.\nDesk: papers shifted a few centimeters.\nBathroom: your soap in a different spot.\n\nAll small. All wrong.',
      },
      {
        type: 'bg',
        bg: 'assets/bg/rose_salon.jpg',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I have a key.\n\n(She says it before you can ask.)\n\n"I didn\'t announce it because there was nothing alarming to announce.\nI\'ve been careful."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Return it."',
            nextScene: 'himari_ch4_b2',
            statEffect: {
              defiance: 10,
              fear: 6,
            },
          },
          {
            label: '"How long?"',
            nextScene: 'himari_ch4_b2',
            statEffect: {
              fear: 9,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch4_b2: {
    id   : 'himari_ch4_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: '(She reaches into her bag.)\n\nSets a key on the table between you.\n\n(She doesn\'t say anything.)',
      },
      {
        type: 'narration',
        text: 'You pick it up.\n\nOne key.\n\nYou look at her.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'I had three made.\n\n(She says it quietly. Simply.)\n\n"You\'re holding one."',
      },
      {
        type: 'narration',
        text: 'One key in your hand.\n\nTwo more, somewhere.\nIn her bag. In a drawer. In some space you don\'t have access to.\n\nShe has placed one in your hand.\nYou cannot know if it\'s the only one.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Give me all of them."',
            nextScene: 'himari_end_ch4_still_yours',
            statEffect: {
              defiance: 12,
              fear: 8,
            },
          },
          {
            label: '[I look at the key in my hand. There are two more.]',
            nextScene: 'himari_end_ch4_visiting_hours',
            statEffect: {
              fear: 12,
              obedience: 6,
            },
          },
        ],
      },
    ],
  },

  himari_end_ch4_familiar: {
    id   : 'himari_end_ch4_familiar',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Every Tuesday.\n\nYou think about it now on Tuesday mornings as you lock the door behind you.\n\nThe apartment won\'t be empty while you\'re gone.\nShe\'ll be there, moving through your space with practiced familiarity.',
      },
      {
        type: 'narration',
        text: 'You leave the kettle where she put it.\n\nYou leave the book on the left side.\n\nWhen you come home on Tuesday evenings the rooms smell faintly different.\nNot bad.\nJust not entirely yours.',
      },
      {
        type: 'end',
        endingName: 'Familiar',
        endingIndex: 30,
        rarity: 'normal',
      },
    ],
  },

  himari_end_ch4_the_spare_key: {
    id   : 'himari_end_ch4_the_spare_key',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'You said that.\n\n(She closes her eyes briefly, like exhaling something long held.)\n\n"Thank you, {name}.\nI already knew.\nBut hearing you say it."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She already knew.\nShe comes every Tuesday regardless.\n\nBut you said it.\nYou gave it to her out loud.\n\nSomething about the saying changed what it was.',
      },
      {
        type: 'narration',
        text: 'She moves the kettle back to where you keep it, the next Tuesday.\n\nJust the kettle.\n\nEverything else stays exactly where she put it.',
      },
      {
        type: 'end',
        endingName: 'The Spare Key',
        endingIndex: 31,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch4_visiting_hours: {
    id   : 'himari_end_ch4_visiting_hours',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'yandere',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'You have one now.\n\n(She tilts her head slightly.)\n\n"That\'s more than before.\nBefore, I had three and you had none."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'One key in your hand.\n\nYou hold the one she gave you.\n\nTwo more, somewhere you don\'t know.\nShe comes on Tuesdays.\nShe comes on Thursday evenings.\n\nYou hold your one key\nand she holds her two.',
      },
      {
        type: 'end',
        endingName: 'Visiting Hours',
        endingIndex: 32,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch4_still_yours: {
    id   : 'himari_end_ch4_still_yours',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'All right.\n\n(She reaches back into her bag.\nSets two more keys on the table.)\n\n"Three. That\'s the right number."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You count them.\n\nThree keys.\nYou hold all three in your palm.\n\nShe watches you count them.',
      },
      {
        type: 'narration',
        text: 'You have no way of knowing if three is the actual number.\n\nShe told you three.\nShe gave you three.\n\nYou have no way of knowing.\n\nYou count them again. And again.\nThree.\n\nYou don\'t know if that means anything.',
      },
      {
        type: 'end',
        endingName: 'Still Yours',
        endingIndex: 33,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 4 — "The Bad Day"
     Midnight. She's outside your building in the rain. She's
     been there for two hours. She almost knocked.

     INSIDE PATH  (4 choices):
       shizuku_ch4_start → shizuku_ch4_a1 → shizuku_ch4_a2
         → shizuku_end_ch4_floor_space   [30 — Normal]
         → shizuku_end_ch4_no_distance   [31 — Rare]

     ASK PATH  (4 choices):
       shizuku_ch4_start → shizuku_ch4_b1 → shizuku_ch4_b2
         → shizuku_end_ch4_outside_together [32 — Rare]
         → shizuku_end_ch4_same_door        [33 — Normal]
     ════════════════════════════════════════════════════════ */

  shizuku_ch4_start: {
    id   : 'shizuku_ch4_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/apartment_night.jpg',
      },
      {
        type: 'narration',
        text: 'Midnight.\n\nYou look out the window for no reason in particular.\n\nSomeone below, in the rain.\n\nStanding very still.',
      },
      {
        type: 'narration',
        text: 'Shizuku.\n\nShe\'s not looking up. She doesn\'t know you\'re watching.\nShe\'s just — standing there.\nIn the rain.',
      },
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I\'ve been here for two hours.\n\n(She says it to the pavement. You\'re at the door now.)\n\n"I almost knocked.\nI wasn\'t sure if you\'d — I thought maybe you were asleep."',
      },
      {
        type: 'narration',
        text: 'She\'s soaked.\n\nTwo hours in the rain.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Come inside."',
            nextScene: 'shizuku_ch4_a1',
            statEffect: {
              affection: 6,
              dependency: 5,
            },
          },
          {
            label: '"How often do you come here?"',
            nextScene: 'shizuku_ch4_b1',
            statEffect: {
              fear: 7,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch4_a1: {
    id   : 'shizuku_ch4_a1',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/apartment.jpg',
      },
      {
        type: 'narration',
        text: 'You find her a towel.\n\nShe sits on your floor when you hand it to her. Not the couch — the floor, back against the wall, knees drawn up.\n\nLike she needs to make herself very small.',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Sorry.\n\n(She holds the towel in her hands without using it.)\n\n"I shouldn\'t have just — appeared.\nI know. I just didn\'t know where else to go\nand eventually I was standing here."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What happened?"',
            nextScene: 'shizuku_ch4_a2',
            statEffect: {
              affection: 6,
              dependency: 5,
            },
          },
          {
            label: '[I sit down beside her on the floor.]',
            nextScene: 'shizuku_ch4_a2',
            statEffect: {
              affection: 8,
              dependency: 4,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch4_a2: {
    id   : 'shizuku_ch4_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Work was — a lot. And then I called my mother and that was worse.\nAnd then I was just — walking.\n\n(She uses the towel, finally.)\n\n"And I ended up here.\nThis is where I always end up, on the bad days.\nI don\'t always knock. Usually I just stand outside for a while and then go home." ',
      },
      {
        type: 'narration',
        text: 'Usually.\n\nShe comes here on bad days.\nShe stands outside.\nShe usually doesn\'t knock.',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You can always come here."',
            nextScene: 'shizuku_end_ch4_floor_space',
            statEffect: {
              affection: 10,
              dependency: 8,
            },
          },
          {
            label: '[She always ends up here. Not once — always. I realize what that means.]',
            nextScene: 'shizuku_end_ch4_no_distance',
            statEffect: {
              fear: 5,
              dependency: 10,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch4_b1: {
    id   : 'shizuku_ch4_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Often.\n\n(She says it without shame. Without hesitation.)\n\n"More than you know.\nI\'ve been counting. Since March.\nFourteen times."',
      },
      {
        type: 'narration',
        text: 'Fourteen times.\n\nShe\'s been outside your building fourteen times since March.\nYou never knew.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Fourteen times, and you never knocked?"',
            nextScene: 'shizuku_ch4_b2',
            statEffect: {
              fear: 7,
              defiance: 5,
            },
          },
          {
            label: '[Fourteen. And I had no idea. I slept through fourteen of those nights.]',
            nextScene: 'shizuku_ch4_b2',
            statEffect: {
              fear: 9,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch4_b2: {
    id   : 'shizuku_ch4_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I didn\'t want to intrude.\n\n(She looks at the door instead of at you.)\n\n"I just needed to be — close.\nThe door was enough, usually.\nJust knowing you were on the other side."',
      },
      {
        type: 'narration',
        text: 'Usually.\n\nThat word again.',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Sometimes I\'d knock.\n\n(Very quietly.)\n\n"When it was a bad enough night, I\'d knock.\nYou didn\'t always answer.\nSo I\'d stand there a while longer and then go home."',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You knocked and I didn\'t answer."',
            nextScene: 'shizuku_end_ch4_outside_together',
            statEffect: {
              fear: 8,
              dependency: 7,
            },
          },
          {
            label: '[She stood outside my door and I was asleep. She went home alone.]',
            nextScene: 'shizuku_end_ch4_same_door',
            statEffect: {
              fear: 6,
              dependency: 8,
            },
          },
        ],
      },
    ],
  },

  shizuku_end_ch4_floor_space: {
    id   : 'shizuku_end_ch4_floor_space',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She falls asleep on your floor.\n\nYou put a blanket over her.\nShe doesn\'t move.',
      },
      {
        type: 'narration',
        text: 'In the morning she wakes up and says "I\'ll leave now."\n\nShe stays for another hour.\n\nYou make tea.\nYou sit together on the floor where she slept.\n\nNeither of you talks about last night.\nNeither of you needs to.',
      },
      {
        type: 'end',
        endingName: 'Floor Space',
        endingIndex: 30,
        rarity: 'normal',
      },
    ],
  },

  shizuku_end_ch4_no_distance: {
    id   : 'shizuku_end_ch4_no_distance',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Can I stay?\n\n(She asks it very quietly.)\n\n"I just don\'t want there to be — distance.\nTonight I don\'t want there to be distance, {name}."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You say yes.\n\nShe sleeps on the couch.\n\nYou lie in the next room and hear her breathing all night — this soft, irregular evidence that someone else is in the space.\n\nYou don\'t sleep easily.\nYou don\'t mind.',
      },
      {
        type: 'end',
        endingName: 'No Distance',
        endingIndex: 31,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch4_outside_together: {
    id   : 'shizuku_end_ch4_outside_together',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I went back out.\n\n(She says it the way you\'d confess to something small and irreversible.)\n\n"I stood there until I felt — enough.\nAnd then I came back the next night.\nI don\'t know why I\'m telling you this."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You know why she\'s telling you.\n\nBecause she needs someone to know.\nBecause carrying it alone has weight.\n\nBecause she knocked and you didn\'t answer\nand she went back out into the dark\nand came back the next night anyway.',
      },
      {
        type: 'end',
        endingName: 'Outside Together',
        endingIndex: 32,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch4_same_door: {
    id   : 'shizuku_end_ch4_same_door',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Fourteen times.\n\nShe was outside your door fourteen times and you didn\'t know.\n\nYou slept.\nYou cooked dinner.\nYou had ordinary evenings on the other side of a door\nshe was standing in front of, in the rain, counting.',
      },
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'narration',
        text: 'She\'s looking at you now like you might send her back out.\n\nYou don\'t.\n\nYou step aside.\nShe comes in.\n\nIt\'s still raining.',
      },
      {
        type: 'end',
        endingName: 'Same Door',
        endingIndex: 33,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 4 — "The Deviation"
     Someone in your life has stopped contacting you. Abruptly.
     Reina confirms she "corrected an interference variable."

     ACCEPT PATH  (4 choices):
       reina_ch4_start → reina_ch4_a1 → reina_ch4_a2
         → reina_end_ch4_incident_report     [30 — Normal]
         → reina_end_ch4_protective_measure  [31 — Rare]

     CONFRONT PATH  (4 choices):
       reina_ch4_start → reina_ch4_b1 → reina_ch4_b2
         → reina_end_ch4_the_calculation    [32 — Rare]
         → reina_end_ch4_necessary_outcome  [33 — Normal]
     ════════════════════════════════════════════════════════ */

  reina_ch4_start: {
    id   : 'reina_ch4_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/lab_office.jpg',
      },
      {
        type: 'narration',
        text: 'Someone in your life has stopped contacting you.\n\nA friend.\nA classmate you\'d known for years.\nNo argument. No explanation.\nJust — gone.',
      },
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'There was an interference variable.\n\n(She says it before you can raise it.)\n\n"I identified it in Month Fourteen.\nI corrected it last week.\nI should have told you."',
      },
      {
        type: 'narration',
        text: 'Corrected.\n\nA person.\nShe corrected a person.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What did you do?"',
            nextScene: 'reina_ch4_a1',
            statEffect: {
              fear: 6,
              dependency: 4,
            },
          },
          {
            label: '"That was a person. You can\'t correct a person."',
            nextScene: 'reina_ch4_b1',
            statEffect: {
              defiance: 9,
              fear: 6,
            },
          },
        ],
      },
    ],
  },

  reina_ch4_a1: {
    id   : 'reina_ch4_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I made contact.\n\n(She opens her notebook.)\n\n"I presented information about the dynamic.\nAbout how the relationship was affecting the model\'s predictions.\nAbout you.\n\nThey chose to withdraw.\nTheir choice."',
      },
      {
        type: 'narration',
        text: 'Their choice.\nBased on what she told them.\nAbout you.\nWithout your knowledge.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Their choice, based on what you decided to tell them."',
            nextScene: 'reina_ch4_a2',
            statEffect: {
              fear: 7,
              defiance: 5,
            },
          },
          {
            label: '[I feel something cold move through me.]',
            nextScene: 'reina_ch4_a2',
            statEffect: {
              fear: 9,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  reina_ch4_a2: {
    id   : 'reina_ch4_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Yes.\n\n(She doesn\'t soften it.)\n\n"I provided accurate information.\nWhat they did with it was their decision.\nI can\'t control outcomes. I can only control inputs."',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model predicted the interference would affect your trajectory.\n\n(She turns the laptop toward you.)\n\n"The deviation was significant.\nI acted within optimal parameters.\nThe outcome is — improved."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You thought you were protecting me."',
            nextScene: 'reina_end_ch4_protective_measure',
            statEffect: {
              fear: 6,
              dependency: 7,
            },
          },
          {
            label: '[I look at the model. The deviation was corrected. I was the optimal outcome.]',
            nextScene: 'reina_end_ch4_incident_report',
            statEffect: {
              fear: 8,
              obedience: 7,
            },
          },
        ],
      },
    ],
  },

  reina_ch4_b1: {
    id   : 'reina_ch4_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model defines them as a variable.\n\n(Calmly.)\n\n"Whether they\'re a person is not relevant to the correction.\nThe interference was measurable. The correction was calculable.\nI corrected it."',
      },
      {
        type: 'narration',
        text: 'Not relevant.\n\nTheir personhood is not relevant to her calculation.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What did you tell them?"',
            nextScene: 'reina_ch4_b2',
            statEffect: {
              defiance: 8,
              fear: 6,
            },
          },
          {
            label: '[She calculated someone out of my life.]',
            nextScene: 'reina_ch4_b2',
            statEffect: {
              fear: 11,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  reina_ch4_b2: {
    id   : 'reina_ch4_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Relevant information about the study.\n\n(She closes the notebook.)\n\n"About the nature of the dynamic.\nThe long-term projections.\nI was accurate.\nI didn\'t misrepresent anything."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model was clear, {name}.\n\n(She meets your eyes.)\n\n"The deviation required correction.\nI acted.\nIf the action was wrong — tell me the specific parameter that was violated\nand I\'ll account for it in future corrections."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Undo it. Contact them."',
            nextScene: 'reina_end_ch4_the_calculation',
            statEffect: {
              defiance: 12,
              fear: 8,
            },
          },
          {
            label: '"Future corrections. There will be future corrections."',
            nextScene: 'reina_end_ch4_necessary_outcome',
            statEffect: {
              fear: 12,
              obedience: 6,
            },
          },
        ],
      },
    ],
  },

  reina_end_ch4_incident_report: {
    id   : 'reina_end_ch4_incident_report',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I\'ll file the incident report.\n\n(She opens to a new page in her notebook.)\n\n"For the record.\nIn case a similar variable presents in future months.\nReference data for the correction methodology."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She files it.\n\nA careful, precise record of everything she did.\nEvery step. Every calculation. Every predicted outcome.\n\nSomewhere in the report is the person who stopped contacting you.\nFiled.\nLabeled: interference variable, corrected, outcome optimal.\n\nShe\'s already looking at Month Twenty-Three.',
      },
      {
        type: 'end',
        endingName: 'Incident Report',
        endingIndex: 30,
        rarity: 'normal',
      },
    ],
  },

  reina_end_ch4_protective_measure: {
    id   : 'reina_end_ch4_protective_measure',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Protecting you.\n\n(She seems to consider this framing.)\n\n"That\'s not — I wasn\'t — protecting you wasn\'t the objective.\nThe objective was model accuracy.\nOptimal trajectory for the study."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She pauses.\n\nA long pause, for her.\n\n"I suppose the model\'s optimal trajectory does align with your wellbeing.\nIn that sense — indirectly — the outcome was protective."\n\nShe says it like she\'s just discovered something true about herself\nthat she hadn\'t filed yet.\n\nShe writes it down.',
      },
      {
        type: 'end',
        endingName: 'Protective Measure',
        endingIndex: 31,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch4_the_calculation: {
    id   : 'reina_end_ch4_the_calculation',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Undo it.\n\n(She writes the instruction.)\n\n"You\'re asking me to re-introduce a known interference variable.\nI\'ll note the request.\nThe calculation was correct.\nThe action is irreversible."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Irreversible.\n\nShe said it so plainly.\n\nWhat she did is irreversible.\nThe person is gone.\nThe model predicted it.\nShe acted.\nAnd now she\'s writing down your objection\nlike it\'s a data point in the next correction.\n\n"I\'ll account for this preference in future interventions," she says.\n\nFuture interventions.\n\nThere will be others.',
      },
      {
        type: 'end',
        endingName: 'The Calculation',
        endingIndex: 32,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch4_necessary_outcome: {
    id   : 'reina_end_ch4_necessary_outcome',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model projects three more deviation events in the next eighteen months.\n\n(She says it matter-of-factly.)\n\n"I\'ll handle each one as it becomes significant.\nI\'ll inform you afterward.\nThat seems — appropriate."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Three more.\n\nThree more people in your life who she\'s already identified.\nWho she\'s already classified as interference variables.\nWho she\'ll correct.\nWhen the model says it\'s time.\n\nShe looks at you across the table.\n\n"The model is clear, {name}."\n\nYou believe her.\nThat\'s what frightens you most.',
      },
      {
        type: 'end',
        endingName: 'Necessary Outcome',
        endingIndex: 33,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 4 — "The Favor"
     She asks casually. He stopped coming to class three weeks ago.
     She already handled it.

     YES PATH:
       mei_ch4_start → mei_ch4_a1 → mei_ch4_a2
         → mei_end_ch4_the_favor_done   [30 — Normal]
         → mei_end_ch4_because_you_asked [31 — Rare]

     ASK PATH:
       mei_ch4_start → mei_ch4_b1 → mei_ch4_b2
         → mei_end_ch4_small_request    [32 — Rare]
         → mei_end_ch4_already_handled  [33 — Normal]
     ══════════════════════════════════════════════════════════ */

  mei_ch4_start: {
    id   : 'mei_ch4_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/school_hallway.jpg',
      },
      {
        type: 'narration',
        text: 'She falls into step beside you between classes.\n\nUsually she bounces.\nToday she just walks.\nLike someone with something already decided.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '{name}~\n\nCan I ask a favor?',
      },
      {
        type: 'narration',
        text: 'She says it the way you\'d ask to borrow a pencil.\nCasually. Lightly.\nLike the answer is already yes\nand the asking is just a formality.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'The study group you\'ve been doing on Tuesdays.\n\n(She tilts her head.)\n\n"Could you — not go anymore?\nJust one person, not the whole group.\nThe one who always walks you home after~"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Sure. If that\'s what you want."',
            nextScene: 'mei_ch4_a1',
            statEffect: {
              affection: 5,
              obedience: 6,
            },
          },
          {
            label: '"Why? What\'s this about?"',
            nextScene: 'mei_ch4_b1',
            statEffect: {
              fear: 4,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch4_a1: {
    id   : 'mei_ch4_a1',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '♪~\n\n(She squeezes your arm.)\n\n"I knew {name} would understand.\nYou always understand~"',
      },
      {
        type: 'narration',
        text: 'You stop going on Tuesdays.\n\nYou don\'t see him much after that.\nAt first you figure he\'s busy.\nA week passes. Then two.',
      },
      {
        type: 'narration',
        text: 'Three weeks later: he\'s not in class.\n\nA friend mentions he transferred sections.\nSomething happened, she thinks, but she doesn\'t know what.\nHe didn\'t say.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She finds you after class that day.\nShe\'s in a very good mood.)\n\nHeard about the transfer~?\n\n(She laces her fingers through yours.)\n\n"It worked out for everyone, I think."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What do you mean, \'worked out\'?"',
            nextScene: 'mei_ch4_a2',
            statEffect: {
              fear: 5,
              defiance: 4,
            },
          },
          {
            label: '"Yeah. I guess it did."',
            nextScene: 'mei_end_ch4_the_favor_done',
            statEffect: {
              dependency: 6,
              obedience: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch4_a2: {
    id   : 'mei_ch4_a2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She tilts her head.\nStill smiling.)\n\nHe was going to ask you something.\n\n(She says it like: "it looked like rain.")\n\n"I let him know it wouldn\'t go well.\nVery politely.\nHe agreed it was better this way."',
      },
      {
        type: 'narration',
        text: 'Very politely.\nHe agreed.\n\nYou think about what "very politely" means from her.\nYou think about what she said.\nWhat she knows about him that made him agree\nand transfer sections quietly\nand not tell anyone.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She squeezes your hand.)\n\nI was looking out for {name}~\n\n"He wasn\'t good for you.\nI could tell from the way he watched you.\nNot the road. Just you."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You shouldn\'t have done that."',
            nextScene: 'mei_end_ch4_because_you_asked',
            statEffect: {
              defiance: 6,
              fear: 5,
            },
          },
          {
            label: '"…Thank you."',
            nextScene: 'mei_end_ch4_the_favor_done',
            statEffect: {
              dependency: 7,
              affection: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch4_b1: {
    id   : 'mei_ch4_b1',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'Because~\n\n(She adjusts the strap of her bag, casual.)\n\n"He was going to complicate things.\nI don\'t like things getting complicated for {name}."',
      },
      {
        type: 'narration',
        text: '"Was going to."\n\nPast tense.\n\nYou notice it.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'Oh.\n\n(Lightly, like it\'s nothing.)\n\n"He stopped coming to class three weeks ago, actually.\n\nI already handled it.\nI\'m just — telling you now, as a formality~"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You already handled it?"',
            nextScene: 'mei_ch4_b2',
            statEffect: {
              fear: 6,
              defiance: 5,
            },
          },
          {
            label: '"What did you do to him?"',
            nextScene: 'mei_ch4_b2',
            statEffect: {
              fear: 7,
              defiance: 6,
            },
          },
        ],
      },
    ],
  },

  mei_ch4_b2: {
    id   : 'mei_ch4_b2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She doesn\'t slow down.\nDoesn\'t look away.)\n\nI talked to him.\n\n(A pause.)\n\n"He understood very quickly.\nSome people are like that — very reasonable,\nwhen you explain things clearly."',
      },
      {
        type: 'narration',
        text: 'Explained things.\nClearly.\n\nYou think about what she has on him.\nWhat she said.\nWhat she knows about him\nthat made him transfer sections without telling anyone.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I wasn\'t going to tell you.\n\n(She tilts her head.)\n\n"But you asked.\nAnd {name} deserves to know\nthe things I do for {name}~"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Don\'t ever do this again."',
            nextScene: 'mei_end_ch4_small_request',
            statEffect: {
              defiance: 7,
              fear: 6,
            },
          },
          {
            label: '(You don\'t know what to say.)',
            nextScene: 'mei_end_ch4_already_handled',
            statEffect: {
              fear: 6,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  mei_end_ch4_the_favor_done: {
    id   : 'mei_end_ch4_the_favor_done',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'See~?\n\n(She leans her head against your shoulder for just a moment.)\n\n"Easy.\n\nI like it when things are easy."',
      },
      {
        type: 'narration',
        text: 'You don\'t think about him very much after that.\n\nThis bothers you a little.\nThen less.\nThen not at all.\n\nMei is there on Tuesdays now.\nYou didn\'t replace him.\nYou just — stopped counting.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She hands you something.\nA tiny carved figure — a new piece for the game board.)\n\n"I made this one to look like you~\n\nDoesn\'t it?"',
      },
      {
        type: 'narration',
        text: 'It does.\n\nYou put it in your pocket.\nIt sits next to the bell.',
      },
      {
        type: 'end',
        endingName: 'The Favor Done',
        endingIndex: 30,
        rarity: 'normal',
      },
    ],
  },

  mei_end_ch4_because_you_asked: {
    id   : 'mei_end_ch4_because_you_asked',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She looks at you.\nFor a long moment.)\n\n…\n\n"Okay."',
      },
      {
        type: 'narration',
        text: 'She says it simply.\n\nNot sorry.\nNot defensive.\nJust: okay.\n\nLike she\'s filing your answer next to everything else she\'s collected about you.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(The smile comes back.)\n\n{name} said "shouldn\'t."\n\n(She tilts her head.)\n\n"Not \'can\'t\' or \'stop.\'\nShouldn\'t~\n\nThat\'s different."',
      },
      {
        type: 'narration',
        text: 'You don\'t correct her.\n\nYou think maybe you should have said something stronger.\nShe already knows that.\nYou think she\'s counting on it.',
      },
      {
        type: 'end',
        endingName: 'Because You Asked',
        endingIndex: 31,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch4_small_request: {
    id   : 'mei_end_ch4_small_request',
    steps: [
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She stops.\nLooks at you fully.)\n\n…\n\n(A pause that goes on too long.)\n\n"Don\'t worry.\n\nHe was just one.\nThere are only two more I\'m concerned about~"',
      },
      {
        type: 'narration',
        text: 'Two more.\n\nShe says it with the same voice she uses to say "I\'ll take two sugars please."\nCalm. Specific. Already decided.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: 'I\'m being very careful, {name}.\n\n(She starts walking again, light as ever.)\n\n"I\'m not doing anything wrong.\nI\'m just — making things simpler.\nFor both of us~"',
      },
      {
        type: 'narration',
        text: 'Two more people.\n\nYou don\'t ask who.\nYou\'re not sure you want to know.',
      },
      {
        type: 'end',
        endingName: 'Small Request',
        endingIndex: 32,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch4_already_handled: {
    id   : 'mei_end_ch4_already_handled',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She squeezes your hand.)\n\nSee~?\n\n"That\'s why I handled it instead of asking.\nI knew you\'d make that face.\nThe {name} face~"',
      },
      {
        type: 'narration',
        text: 'The {name} face.\n\nYou don\'t know what your face is doing.\nYou don\'t know what you\'re supposed to say.\n\nShe lets you be quiet about it.\nWalks beside you like everything is normal.\nMaybe it is.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(Eventually, lightly.)\n\nI just want things to be easy for {name}~\n\n"That\'s all I\'m ever doing.\nMaking things easy."',
      },
      {
        type: 'narration',
        text: 'Easy.\n\nYou think about what "easy" costs.\nYou think about who paid it.\nYou don\'t say any of this out loud.',
      },
      {
        type: 'end',
        endingName: 'Already Handled',
        endingIndex: 33,
        rarity: 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 5 — "Forever"
     Graduation day. She's already in your apartment when you
     return. A five-year plan is on the table.

     DEVOTED PATH  (4 choices):
       himari_ch5_start → himari_ch5_a1 → himari_ch5_a2
         → himari_end_ch5_forever_begins  [40 — Normal]
         → himari_end_ch5_gilded_eternity [41 — Rare]

     DEFIANT PATH  (4 choices):
       himari_ch5_start → himari_ch5_b1 → himari_ch5_b2
         → himari_end_ch5_the_answer       [42 — Rare]
         → himari_end_ch5_the_cage_complete [43 — True]
     ════════════════════════════════════════════════════════ */

  himari_ch5_start: {
    id   : 'himari_ch5_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/apartment.jpg',
      },
      {
        type: 'narration',
        text: 'Graduation day.\n\nYou come home still in your gown.\nThe door is unlocked.\n\nShe has a key.',
      },
      {
        type: 'narration',
        text: 'She\'s made dinner.\nCandles.\nYour favorite meal, though you don\'t remember ever telling her what that was.\n\nThere are papers on the table.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'Congratulations, {name}.\n\n(She says it warmly. Like she planned it. Like she built you toward this day.)\n\n"Sit down. I thought we could discuss the next phase."',
      },
      {
        type: 'narration',
        text: 'The next phase.\n\nThe folder on the table is thick.\nTabbed. Annotated.\nDated from three years ago.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I sit down. I open the folder.]',
            nextScene: 'himari_ch5_a1',
            statEffect: {
              obedience: 6,
              dependency: 6,
            },
          },
          {
            label: '"I haven\'t agreed to any of this."',
            nextScene: 'himari_ch5_b1',
            statEffect: {
              defiance: 8,
              fear: 6,
            },
          },
        ],
      },
    ],
  },

  himari_ch5_a1: {
    id   : 'himari_ch5_a1',
    steps: [
      {
        type: 'narration',
        text: 'Five years.\n\nHousing (arranged). Career (arranged). Social schedule (annotated). Travel (planned by season).\n\nEvery page has your name at the top.\nEvery margin has her handwriting in it.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'Year One is mostly transition.\n\n(She sits across from you.)\n\n"The apartment. The position at Aoyama.\nGetting settled.\n\nYear Two is more interesting."',
      },
      {
        type: 'narration',
        text: 'You turn to Year Two.\n\nThere is a tab marked "Permanent Arrangement — Preliminary."\n\nYou don\'t open it yet.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You planned all five years."',
            nextScene: 'himari_ch5_a2',
            statEffect: {
              fear: 5,
              dependency: 6,
            },
          },
          {
            label: '[I turn to the tab marked "Permanent Arrangement."]',
            nextScene: 'himari_ch5_a2',
            statEffect: {
              fear: 8,
              obedience: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch5_a2: {
    id   : 'himari_ch5_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'The graduation marks a transition.\n\n(She leans forward slightly.)\n\n"I needed the next stage to be clear.\nFor both of us.\nSo I cleared it."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'You\'re not surprised, {name}.\n\n(She studies your face.)\n\n"I can see that you\'re not surprised.\nYou haven\'t been surprised in — some time now.\nDo you know when you stopped being surprised by me?"',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I\'m not surprised."',
            nextScene: 'himari_end_ch5_forever_begins',
            statEffect: {
              dependency: 12,
              obedience: 10,
            },
          },
          {
            label: '[I turn to Year Five. I need to see how it ends.]',
            nextScene: 'himari_end_ch5_gilded_eternity',
            statEffect: {
              fear: 8,
              dependency: 8,
            },
          },
        ],
      },
    ],
  },

  himari_ch5_b1: {
    id   : 'himari_ch5_b1',
    steps: [
      {
        type: 'narration',
        text: 'She looks at you across the table.\n\nA long pause.\nShe doesn\'t argue.',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I know you haven\'t.\n\n(She sets her hands flat on the table.)\n\n"But {name} — I\'m not asking.\nI think that time has passed."',
      },
      {
        type: 'narration',
        text: 'Not asking.\n\nNot a request.\nNot an offer.\n\nA statement.\nA transition already past.\n\nI\'m not asking anymore.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What does that mean — you\'re not asking?"',
            nextScene: 'himari_ch5_b2',
            statEffect: {
              fear: 8,
              defiance: 7,
            },
          },
          {
            label: '[I look at the five-year plan. My whole future, annotated in her handwriting.]',
            nextScene: 'himari_ch5_b2',
            statEffect: {
              fear: 10,
              obedience: 5,
            },
          },
        ],
      },
    ],
  },

  himari_ch5_b2: {
    id   : 'himari_ch5_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'It means I\'ve been patient, {name}.\n\n(She doesn\'t raise her voice. She never raises her voice.)\n\n"For three years I arranged things around your comfort.\nAround your pace.\nAround your capacity to accept."',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'The graduation is the end of that phase.\n\n(She looks at the folder.)\n\n"The next phase doesn\'t wait for you to be ready.\nYou don\'t need to be ready.\nYou just need to be present."',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I want to be angry. I don\'t know what I am."',
            nextScene: 'himari_end_ch5_the_answer',
            statEffect: {
              fear: 12,
              defiance: 8,
            },
          },
          {
            label: '[I look at her handwriting on the five-year plan. It\'s very beautiful.]',
            nextScene: 'himari_end_ch5_the_cage_complete',
            statEffect: {
              fear: 10,
              obedience: 10,
            },
          },
        ],
      },
    ],
  },

  himari_end_ch5_forever_begins: {
    id   : 'himari_end_ch5_forever_begins',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You read through the plan.\n\nAll five years.\nShe answers every question.\nShe fills in every gap you didn\'t know you had.\n\nBy the time you set it down,\nit feels like something you agreed to a long time ago.',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'The dinner is ready.\n\n(She stands.)\n\n"We can discuss Year Three over the meal.\nYear Four can wait until after.\nYear Five — that one I\'d like to save."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Year Five.\n\nYou don\'t ask what it says.\n\nYou sit at the table she set.\nIn the apartment she arranged.\nWith the folder she planned three years ago open in your lap.\n\nThe candles burn.\nYou don\'t ask.',
      },
      {
        type: 'end',
        endingName: 'Forever Begins',
        endingIndex: 40,
        rarity: 'normal',
      },
    ],
  },

  himari_end_ch5_gilded_eternity: {
    id   : 'himari_end_ch5_gilded_eternity',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Year Five.\n\nThe tab marked "Permanent Arrangement."\n\nYou open it.\n\nThe page is nearly blank.\nJust a date — five years from today — and two words:\n"Complete. Irreversible."',
      },
      {
        type: 'expression',
        character: 'himari',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'default',
        text: 'I don\'t explain Year Five.\n\n(She sets a plate in front of you.)\n\n"Not yet.\nYear Five is something you\'ll understand when you\'re already inside it."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'Complete. Irreversible.\n\nYou eat dinner.\nThe candles are very good.\n\nSomewhere in your chest is something that should be panic.\nIt has been there for years.\n\nIt has been there so long it feels like furniture.',
      },
      {
        type: 'end',
        endingName: 'Gilded Eternity',
        endingIndex: 41,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch5_the_answer: {
    id   : 'himari_end_ch5_the_answer',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'yandere',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'yandere',
        text: 'Not asking anymore.\n\n(She repeats it. Quietly.)\n\n"You said it back.\nDo you understand what that means?\nNot anger. Not sadness.\nYou said it back, {name}."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You said it back.\n\nNot asking anymore.\n\nSomething in you named it — recognized the shape of it.\nNot anger.\nNot sadness.\nSomething past both of those.',
      },
      {
        type: 'narration',
        text: 'She serves dinner.\n\nYou sit at her table, in your apartment, with her five-year plan open in your lap.\n\n"I hope you understand what that means," she said.\n\nYou don\'t tell her that you do.',
      },
      {
        type: 'end',
        endingName: 'The Answer',
        endingIndex: 42,
        rarity: 'rare',
      },
    ],
  },

  himari_end_ch5_the_cage_complete: {
    id   : 'himari_end_ch5_the_cage_complete',
    steps: [
      {
        type: 'expression',
        character: 'himari',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'himari',
        expression: 'smile',
        text: 'Then let\'s begin.\n\n(She turns to the first page of the plan.)\n\n"Year One.\nPage one.\nI\'ve been waiting to read this one with you."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You look at her handwriting.\n\nIt is very beautiful.\nPrecise. Unhurried.\n\nEvery letter formed with the same care she gives everything.',
      },
      {
        type: 'narration',
        text: 'You realize, sitting here, that you\'ve always known it would end here.\n\nNot this room. Not this folder.\nBut this — this quality of sitting.\nOf being known completely.\nOf having nowhere further to go.\n\nThe cage doesn\'t lock.\n\nYou never tried to leave.',
      },
      {
        type: 'end',
        endingName: 'The Cage Complete',
        endingIndex: 43,
        rarity: 'true',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 5 — "Always Here"
     A letter arrives. Addressed and stamped. Written about you,
     in past tense. "In case something happens to me."

     ACCEPT PATH  (4 choices):
       shizuku_ch5_start → shizuku_ch5_a1 → shizuku_ch5_a2
         → shizuku_end_ch5_the_last_page [40 — Normal]
         → shizuku_end_ch5_anchor        [41 — Rare]

     CONFRONT PATH  (4 choices):
       shizuku_ch5_start → shizuku_ch5_b1 → shizuku_ch5_b2
         → shizuku_end_ch5_open_water [42 — Rare]
         → shizuku_end_ch5_she_waits  [43 — True]
     ════════════════════════════════════════════════════════ */

  shizuku_ch5_start: {
    id   : 'shizuku_ch5_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/apartment.jpg',
      },
      {
        type: 'narration',
        text: 'An envelope in the mail.\n\nAddressed. Stamped.\nHer handwriting.',
      },
      {
        type: 'narration',
        text: 'Inside: a letter.\n\nAbout you.\n\nAll of it about you.\nWritten in past tense.',
      },
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'narration',
        text: '"In case something happens to me,\nI want someone to know what {name} meant.\n\nI\'ve been writing one of these every month for three years.\nThis is letter thirty-eight."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I put the letter down. I call her.]',
            nextScene: 'shizuku_ch5_a1',
            statEffect: {
              affection: 6,
              dependency: 5,
            },
          },
          {
            label: '"Shizuku — is this a goodbye letter?"',
            nextScene: 'shizuku_ch5_b1',
            statEffect: {
              fear: 7,
              defiance: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch5_a1: {
    id   : 'shizuku_ch5_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'You got it.\n\n(She doesn\'t sound surprised. She sounds like she\'s been waiting.)\n\n"I\'ve been writing them for three years.\nOne every month.\nIn case."',
      },
      {
        type: 'narration',
        text: 'She arrives before you can form the next question.\n\nShe sees you holding the letter.\nShe doesn\'t look ashamed.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"How many have you written?"',
            nextScene: 'shizuku_ch5_a2',
            statEffect: {
              affection: 4,
              fear: 5,
            },
          },
          {
            label: '[I already know the answer is going to be too many.]',
            nextScene: 'shizuku_ch5_a2',
            statEffect: {
              fear: 7,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch5_a2: {
    id   : 'shizuku_ch5_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'Thirty-eight.\n\n(She sits down.)\n\n"One every month.\nNone of them sent.\nUntil this one.\nI don\'t know why I sent this one.\nI think I needed you to know."',
      },
      {
        type: 'narration',
        text: 'She takes the letter gently from your hands.\n\n"Having it — helps.\nKnowing it exists.\nLike — just in case the worst happens,\nsomething will persist.\nSomething will remain to say: this happened. It was real."',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"You won\'t need it, Shizuku."',
            nextScene: 'shizuku_end_ch5_the_last_page',
            statEffect: {
              affection: 10,
              dependency: 8,
            },
          },
          {
            label: '[I take her hands. She lets me.]',
            nextScene: 'shizuku_end_ch5_anchor',
            statEffect: {
              affection: 12,
              dependency: 10,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch5_b1: {
    id   : 'shizuku_ch5_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'No. No, it\'s not — \n\n(She startles when you ask.)\n\n"It\'s just in case. Accidents happen.\nPeople disappear.\nI wanted there to be something, just in case I — in case I couldn\'t."',
      },
      {
        type: 'narration',
        text: 'Couldn\'t.\n\nThe word she chose.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Three years. You\'ve been writing these for three years?"',
            nextScene: 'shizuku_ch5_b2',
            statEffect: {
              fear: 7,
              defiance: 5,
            },
          },
          {
            label: '[She wrote "in case I couldn\'t." Not "in case something happened."]',
            nextScene: 'shizuku_ch5_b2',
            statEffect: {
              fear: 10,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  shizuku_ch5_b2: {
    id   : 'shizuku_ch5_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I\'ll show you.\n\n(She brings a box.\nA small cardboard box, worn at the corners.)\n\n"All of them. Organized by date.\nAll addressed. All stamped.\nI never sent them.\nBut they had to exist."',
      },
      {
        type: 'narration',
        text: 'Thirty-eight letters.\n\nThirty-eight monthly letters written to you\nin case she couldn\'t.\nIn case she disappeared.\nIn case something happened to her that she\'s not telling you about.\n\nShe opens the box.\nShe shows you.',
      },
      {
        type: 'horror',
        effect: 'heavy_heart',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I look at the box. Thirty-eight versions of the world without her in it.]',
            nextScene: 'shizuku_end_ch5_open_water',
            statEffect: {
              fear: 8,
              dependency: 8,
            },
          },
          {
            label: '"Shizuku."',
            nextScene: 'shizuku_end_ch5_she_waits',
            statEffect: {
              fear: 6,
              affection: 10,
            },
          },
        ],
      },
    ],
  },

  shizuku_end_ch5_the_last_page: {
    id   : 'shizuku_end_ch5_the_last_page',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'default',
        text: 'You won\'t need it?\n\n(She says it like a question she\'s wanted to ask for years.)\n\n"...You won\'t need it."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She tears the letter in half.\n\nThen she tucks both halves into her pocket.\n\n"Just in case," she says. Very quietly.\n\nNot a joke.\n\nShe tears it and keeps the pieces\nbecause even torn, something remains.\nEven in halves, it still exists.',
      },
      {
        type: 'end',
        endingName: 'The Last Page',
        endingIndex: 40,
        rarity: 'normal',
      },
    ],
  },

  shizuku_end_ch5_anchor: {
    id   : 'shizuku_end_ch5_anchor',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'You\'re in every letter.\n\n(She looks out the window.)\n\n"From the first one.\nI think I\'ve been saying goodbye to losing you for three years, {name}.\n\nI didn\'t realize that\'s what I was doing until just now."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You hold her hands.\n\nShe lets you.\n\nShe looks at the floor.\nShe says: "I think I can stop now.\nI think I don\'t need to keep planning for the worst anymore."\n\nShe doesn\'t sound entirely sure.\n\nBut she sounds like she means to try.',
      },
      {
        type: 'end',
        endingName: 'Anchor',
        endingIndex: 41,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch5_open_water: {
    id   : 'shizuku_end_ch5_open_water',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'Delete them if you want.\n\n(She says it carefully.)\n\n"The letters. All of them.\nI have them memorized anyway.\nEvery word. In order.\n\nThey\'re not going anywhere even if the paper does."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She has them memorized.\n\nThirty-eight letters to you.\nThree years of worst-case planning.\nAll of it, by heart.\n\nThe box closes.\n\nYou don\'t take it with you.\nYou don\'t ask her to destroy it.\n\nShe has them memorized.\nThe paper was never really the point.',
      },
      {
        type: 'end',
        endingName: 'Open Water',
        endingIndex: 42,
        rarity: 'rare',
      },
    ],
  },

  shizuku_end_ch5_she_waits: {
    id   : 'shizuku_end_ch5_she_waits',
    steps: [
      {
        type: 'expression',
        character: 'shizuku',
        expression: 'sad',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'shizuku',
        expression: 'sad',
        text: 'I\'ll stop writing them.\n\n(She looks at the box.)\n\n"If you promise to stay.\nI\'ll stop.\n\n...I\'ll stop writing them anyway.\nI just wanted you to choose it."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'A long silence.\n\nShe closes the box.\nShe sets it on the table between you.\n\nYou put your hand on top of it.',
      },
      {
        type: 'narration',
        text: 'She looks at your hand.\n\nShe doesn\'t move.\nShe barely breathes.\n\nShe has been waiting three years for someone to stay.\n\nShe waits a little longer.',
      },
      {
        type: 'end',
        endingName: 'She Waits',
        endingIndex: 43,
        rarity: 'true',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 5 — "Final Model"
     She presents Model v.37. Predictive accuracy: 94.2%.
     Then she closes the notebook. Inside the back cover:
     handwritten — "I don't want the model to end."

     STAY PATH  (4 choices):
       reina_ch5_start → reina_ch5_a1 → reina_ch5_a2
         → reina_end_ch5_optimal_outcome   [40 — Normal]
         → reina_end_ch5_final_projection  [41 — Rare]

     ASK PATH  (4 choices):
       reina_ch5_start → reina_ch5_b1 → reina_ch5_b2
         → reina_end_ch5_the_pause     [42 — Rare]
         → reina_end_ch5_data_complete [43 — True]
     ════════════════════════════════════════════════════════ */

  reina_ch5_start: {
    id   : 'reina_ch5_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/lab_office.jpg',
      },
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'Model version thirty-seven.\n\n(She opens her laptop. Turns it toward you.)\n\n"Two years, eleven months, and sixteen days.\nCurrent predictive accuracy: 94.2%.\n\nI\'ve been running this for almost three years, {name}."',
      },
      {
        type: 'narration',
        text: 'The screen shows a graph.\n\nAccuracy climbing in a steady, unbroken line.\nMonths of data. Hundreds of data points.\nAll of them converging on you.',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I want to present the final results.\n\n(She looks at the screen.)\n\n"Month Thirty-Six closes the longitudinal window.\nAfter today, the formal study period ends."',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I look at the final model. Three years of being known.]',
            nextScene: 'reina_ch5_a1',
            statEffect: {
              dependency: 6,
              fear: 4,
            },
          },
          {
            label: '"What happens after the study ends?"',
            nextScene: 'reina_ch5_b1',
            statEffect: {
              fear: 6,
              defiance: 4,
            },
          },
        ],
      },
    ],
  },

  reina_ch5_a1: {
    id   : 'reina_ch5_a1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The final projection.\n\n(She pulls up the last graph.)\n\n"Based on three years of data.\nSubject trajectory probability: 87% continuation of current dynamic.\n\n87%.\nI\'ve been trying to close the gap for four months.\nI can\'t find the variable that would move it to 88."',
      },
      {
        type: 'narration',
        text: '87%.\n\nShe left 13% for uncertainty.\nFor you.\n\nThe model predicts you\'ll stay.\nWith an 87% certainty.\n\nShe couldn\'t make it 88.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"The model thinks I\'ll stay."',
            nextScene: 'reina_ch5_a2',
            statEffect: {
              fear: 5,
              dependency: 7,
            },
          },
          {
            label: '[She left 13% for me. She couldn\'t close that gap.]',
            nextScene: 'reina_ch5_a2',
            statEffect: {
              fear: 4,
              dependency: 8,
            },
          },
        ],
      },
    ],
  },

  reina_ch5_a2: {
    id   : 'reina_ch5_a2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The model predicts continuation.\n\n(She closes the laptop.)\n\n"But I want to present the complete dataset."',
      },
      {
        type: 'narration',
        text: 'She closes her notebook too.\n\nThen she sees something.\n\nOn the inside back cover — her own handwriting, but cramped and messier than usual.\nShe goes very still.\n\nShe stares at it.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '[I can read it from where I\'m sitting.]',
            nextScene: 'reina_end_ch5_final_projection',
            statEffect: {
              fear: 5,
              dependency: 8,
            },
          },
          {
            label: '"Reina. What does it say?"',
            nextScene: 'reina_end_ch5_optimal_outcome',
            statEffect: {
              affection: 6,
              dependency: 7,
            },
          },
        ],
      },
    ],
  },

  reina_ch5_b1: {
    id   : 'reina_ch5_b1',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'The formal study ends.\n\n(A pause.)\n\n"The data collection is complete.\nThe documentation closes.\n\n...The observation continues.\nInformally."',
      },
      {
        type: 'narration',
        text: 'Informally.\n\nThe study ends.\nThe watching doesn\'t.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What does that mean — the observation continues?"',
            nextScene: 'reina_ch5_b2',
            statEffect: {
              fear: 7,
              defiance: 5,
            },
          },
          {
            label: '[I know what that means. I think I\'ve always known.]',
            nextScene: 'reina_ch5_b2',
            statEffect: {
              fear: 8,
              dependency: 5,
            },
          },
        ],
      },
    ],
  },

  reina_ch5_b2: {
    id   : 'reina_ch5_b2',
    steps: [
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'It means I\'ll continue watching.\n\n(She closes the laptop. Then the notebook.)\n\n"Without the formal structure.\nWithout the monthly documents.\nBut — yes.\nObservation continues."',
      },
      {
        type: 'narration',
        text: 'She\'s looking at the back cover of her notebook.\n\nSomething written there in messier handwriting than usual.\nShe\'s very still.\n\nShe hasn\'t noticed you noticed.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What did you write? Inside the back cover."',
            nextScene: 'reina_end_ch5_data_complete',
            statEffect: {
              affection: 8,
              fear: 5,
            },
          },
          {
            label: '[I reach across. She lets me take the notebook.]',
            nextScene: 'reina_end_ch5_the_pause',
            statEffect: {
              fear: 5,
              affection: 7,
            },
          },
        ],
      },
    ],
  },

  reina_end_ch5_optimal_outcome: {
    id   : 'reina_end_ch5_optimal_outcome',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: '...It\'s nothing.\n\n(She closes the notebook quickly.)\n\n"A note to myself.\nIrrelevant to the study."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She reopens to a fresh page.\n\n"Month Thirty-Seven begins tomorrow.\nInformal observation.\nNew methodology."\n\nShe writes the date.\nShe writes your name.\nShe writes the word: present.\n\nShe underlines it.\n\nWhatever was written in the back cover stays there.\nYou don\'t ask again.\nShe doesn\'t show you.\n\nBut it stays.',
      },
      {
        type: 'end',
        endingName: 'Optimal Outcome',
        endingIndex: 40,
        rarity: 'normal',
      },
    ],
  },

  reina_end_ch5_final_projection: {
    id   : 'reina_end_ch5_final_projection',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: '"I don\'t want the model to end."\n\n(She realizes you\'re reading it.)\n\n(She goes very still.)\n\nA long silence.',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She\'s crying.\n\nVery slightly.\nShe doesn\'t seem to know.\n\n"I don\'t want the model to end." Five words in cramped handwriting on the back cover of a scientific notebook.\n\nThe model is her name for what she has with you.\nAll of it.\nThe whole three years.\nEvery correction and observation and monthly document.\n\nShe doesn\'t want it to end.\n\nShe still doesn\'t realize she\'s crying.',
      },
      {
        type: 'end',
        endingName: 'Final Projection',
        endingIndex: 41,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch5_the_pause: {
    id   : 'reina_end_ch5_the_pause',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: 'I didn\'t mean for you to see that.\n\n(Very quietly.)\n\n"The model doesn\'t account for — handwriting.\nFor things that aren\'t data.\n\nI didn\'t mean for you to see it."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: '"I don\'t want the model to end."\n\nShe\'s crying and she still doesn\'t know.\n\nThe tears are very small. Barely visible.\nBut you\'re watching her the way she\'s watched you for three years\nand you see.\n\nThe model doesn\'t account for handwriting.\nFor the things she wrote when she wasn\'t being scientific.\n\nFor the parts of her that loved you before she had a word for it.',
      },
      {
        type: 'end',
        endingName: 'The Pause',
        endingIndex: 42,
        rarity: 'rare',
      },
    ],
  },

  reina_end_ch5_data_complete: {
    id   : 'reina_end_ch5_data_complete',
    steps: [
      {
        type: 'expression',
        character: 'reina',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'reina',
        expression: 'default',
        text: '"I don\'t want the model to end."\n\n(She reads it as you read it.\nLike she\'s reading it for the first time.)\n\nBelow that, smaller:\n"I don\'t want {name} to leave. I don\'t want to go back to before."',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She\'s crying.\n\nNow she knows.\n\nShe looks at her own handwriting for a long time.\nThen she looks at you.\n\nShe doesn\'t say anything.\nShe doesn\'t reach for the notebook.\n\nShe lets you hold it.\nShe lets you read.\n\nAfter everything she\'s collected,\neverything she\'s recorded and filed and analyzed —\n\nshe lets you see this.\n\nAnd she reaches for your hand.',
      },
      {
        type: 'end',
        endingName: 'Data Complete',
        endingIndex: 43,
        rarity: 'true',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 5 — "The Bell"
     Graduation day. Rule 47: the game ends when both players agree.
     You've been carrying her bell for four years.

     LISTEN PATH:
       mei_ch5_start → mei_ch5_a1 → mei_ch5_a2
         → mei_end_ch5_the_smile_stays [40 — Normal]
         → mei_end_ch5_underneath      [41 — Rare]

     BELL PATH:
       mei_ch5_start → mei_ch5_b1 → mei_ch5_b2
         → mei_end_ch5_the_bell_answer [42 — Rare]
         → mei_end_ch5_complete        [43 — TRUE]
     ══════════════════════════════════════════════════════════ */

  mei_ch5_start: {
    id   : 'mei_ch5_start',
    steps: [
      {
        type: 'bg',
        bg: 'assets/bg/school_hallway.jpg',
      },
      {
        type: 'narration',
        text: 'Graduation day.\n\nThe school fills up with people.\nFamilies, cameras, flowers passed hand to hand.\nEveryone finds their person.\n\nYou hear it before you see her.\n\nA small, clear sound.\nA bell.',
      },
      {
        type: 'narration',
        text: 'Not the ceremony bell.\n\nYours.\nThe one she gave you in first year.\nSmall and silver, worn from carrying.\nIt rings every time you move.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '{name}~! ♪\n\n(She pushes through the crowd like it isn\'t there.)\n\n"I found you.\nI always find you~"',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She straightens your collar, precise and practiced.\nShe\'s thought about this moment.)\n\nWe graduated.\n\n"Can you believe it?\nFour years~\n\nAnd you still have it."',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She looks at the bell against your chest.\nSomething crosses her face — soft, careful.)\n\nYou know Rule 47, {name}~\n\n"The game ends when both players agree.\n\nDo you — agree?\nOr do we keep playing~?"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '(You let her take your hand.)',
            nextScene: 'mei_ch5_a1',
            statEffect: {
              dependency: 5,
              affection: 5,
            },
          },
          {
            label: '(You reach for the bell.)',
            nextScene: 'mei_ch5_b1',
            statEffect: {
              defiance: 4,
              fear: 3,
            },
          },
        ],
      },
    ],
  },

  mei_ch5_a1: {
    id   : 'mei_ch5_a1',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '(She squeezes, once.)\n\n♪~\n\n"Good.\n\nI didn\'t want it to end yet."',
      },
      {
        type: 'narration',
        text: 'You walk through the crowd together.\n\nShe knows exactly where to go — through the side hall,\nup the stairs, to the rooftop.\nThe same blanket is there.\nThe same board. The same pieces.\n\nShe planned this.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She sits. Sets up the pieces. Pats the blanket.)\n\nOne last game, {name}~\n\n"Or the first game of everything after.\nI can\'t decide which~"',
      },
      {
        type: 'narration',
        text: 'You sit.\n\nThe city spreads below the rooftop.\nEveryone else is somewhere else being finished with school.\nYou are here, in the same spot as the first day, about to play a game you\'ve never won.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"What happens after we graduate?"',
            nextScene: 'mei_ch5_a2',
            statEffect: {
              dependency: 4,
              fear: 3,
            },
          },
          {
            label: '"Roll for first turn."',
            nextScene: 'mei_end_ch5_the_smile_stays',
            statEffect: {
              affection: 5,
              obedience: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch5_a2: {
    id   : 'mei_ch5_a2',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She looks up from the board.)\n\nHmm~\n\n"After?\n\nThe same as before.\nI\'ll be near {name}.\n{name} will be near me.\n\nWe\'ll keep playing~"',
      },
      {
        type: 'narration',
        text: 'Said simply.\nLike it\'s already decided.\n\nYou think about what "keep playing" means after school.\nAfter the rooftop. After the rules you\'ve been playing by for four years.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She looks at you, steady.)\n\nAre you afraid of after~?\n\n"You don\'t have to be.\nI\'ve been thinking about it for a long time.\n\nI\'ve thought of everything~"',
      },
      {
        type: 'narration',
        text: 'She has.\n\nYou know she has.\nShe\'s been planning this since before you knew there was anything to plan.\n\nFour years of rules.\nThree hundred solo test games.\nTwenty-three names in a red notebook.\nOne bell, worn silver from carrying.\n\nShe\'s thought of everything.',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"I know you have."',
            nextScene: 'mei_end_ch5_underneath',
            statEffect: {
              fear: 6,
              dependency: 6,
            },
          },
          {
            label: '"What if I want to decide?"',
            nextScene: 'mei_end_ch5_the_bell_answer',
            statEffect: {
              defiance: 6,
              fear: 5,
            },
          },
        ],
      },
    ],
  },

  mei_ch5_b1: {
    id   : 'mei_ch5_b1',
    steps: [
      {
        type: 'narration',
        text: 'Your hand closes around the bell.\n\nShe watches you.\nShe doesn\'t move.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(The smile doesn\'t change.\nBut something in her — goes very still.)\n\n…\n\n{name}~',
      },
      {
        type: 'narration',
        text: 'You hold the bell in your palm.\n\nIt\'s small. Silver. Warm from four years against your chest.\nThe sound it makes is very clear.\n\nShe\'s looking at your hand.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(Carefully, like each word matters.)\n\nAre you — giving it back?\n\n"…Or are you just holding it~?"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '(You hold it out to her.)',
            nextScene: 'mei_ch5_b2',
            statEffect: {
              defiance: 5,
              fear: 4,
            },
          },
          {
            label: '(You close your hand around it.)',
            nextScene: 'mei_end_ch5_the_smile_stays',
            statEffect: {
              dependency: 5,
              obedience: 4,
            },
          },
        ],
      },
    ],
  },

  mei_ch5_b2: {
    id   : 'mei_ch5_b2',
    steps: [
      {
        type: 'narration',
        text: 'You hold it out.\n\nShe looks at it for a long moment.\nNot at you.\nAt the bell in your palm.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(One second.\nThe face with nothing on it.)\n\n…\n\nYou\'re giving it back.',
      },
      {
        type: 'narration',
        text: 'Not a question.\n\nA statement.\nLike she\'s still processing it.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She looks up at you.)\n\nWhy?\n\n(She\'s completely serious now.\nThe voice she uses when the game goes somewhere she didn\'t plan.)\n\n"Why are you giving it back, {name}~?"',
      },
      {
        type: 'choice',
        choices: [
          {
            label: '"Because I want to."',
            nextScene: 'mei_end_ch5_complete',
            statEffect: {
              affection: 7,
              dependency: 5,
            },
          },
          {
            label: '"Because the game should end."',
            nextScene: 'mei_end_ch5_the_bell_answer',
            statEffect: {
              defiance: 6,
              fear: 5,
            },
          },
        ],
      },
    ],
  },

  mei_end_ch5_the_smile_stays: {
    id   : 'mei_end_ch5_the_smile_stays',
    steps: [
      {
        type: 'expression',
        character: 'mei',
        expression: 'excited',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'excited',
        text: '(The smile is instant. Complete.)\n\n♪~!\n\n"Good.\n\nRule 47, {name}~\nBoth players agree.\nAnd I don\'t agree~"',
      },
      {
        type: 'narration',
        text: 'She sets the first piece.\n\nYou play.\n\nThe ceremony bells ring somewhere below.\nEveryone else is being graduated.\nYou are being kept.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(After a long time, quietly.)\n\nI\'m glad you stayed.\n\n"I\'m always glad you stay~"',
      },
      {
        type: 'narration',
        text: 'The smile stays.\n\nIt always stays.\n\nYou\'ve stopped trying to find what\'s underneath it.\nMaybe that\'s the point.\nMaybe that\'s the game.',
      },
      {
        type: 'end',
        endingName: 'The Smile Stays',
        endingIndex: 40,
        rarity: 'normal',
      },
    ],
  },

  mei_end_ch5_underneath: {
    id   : 'mei_end_ch5_underneath',
    steps: [
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(Something passes through her face.\nQuick. Gone before you can name it.)\n\n…\n\n"You know I have."\n\n(The smile comes back. Slower than usual.)\n\n"That scares you, doesn\'t it~?"',
      },
      {
        type: 'narration',
        text: 'It does.\n\nNot the planning.\nNot the rules.\nNot the red notebook or the transferred student or the two hundred and thirty solo games.\n\nThis.\n\nThe moment underneath the smile\nwhere she\'s completely serious\nand she knows you completely\nand she\'s been waiting for you to know her too.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(She takes your hand. Holds it.)\n\n{name}~\n\n"I know everything about you.\n\nAnd I\'m still here.\nI\'m always still here.\n\nIsn\'t that — something~?"',
      },
      {
        type: 'narration',
        text: 'It is something.\n\nYou don\'t know what.\n\nShe sets the first piece.\nYou play.',
      },
      {
        type: 'end',
        endingName: 'Underneath',
        endingIndex: 41,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch5_the_bell_answer: {
    id   : 'mei_end_ch5_the_bell_answer',
    steps: [
      {
        type: 'horror',
        effect: 'flicker_slow',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She looks at you for a long moment.\nThe smile is still there.\nBut it\'s waiting.)\n\n…\n\n"Rule 47, {name}~\n\nThe game ends when both players agree."',
      },
      {
        type: 'narration',
        text: 'Both players.\n\nShe lets the word sit.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(Very quietly.)\n\nI don\'t agree.\n\n(She closes her hand around the bell.\nOrShe doesn\'t take it. She just closes her hand around yours.)\n\n"I don\'t agree.\nI\'m never going to agree.\n\n{name} knew that~"',
      },
      {
        type: 'narration',
        text: 'You did know that.\n\nYou knew it before you reached for the bell.\nYou knew it before Rule 47.\nYou knew it from the first game, the first reset,\nthe first two hundred and thirty times she played alone so it would be perfect for you.\n\nYou knew.\n\nYou asked anyway.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(The smile softens. Just slightly.)\n\nThat\'s okay~\n\n"It\'s okay that you asked.\n\nI like that you asked.\n\nBut the answer is no.\nThe answer is always no~"',
      },
      {
        type: 'end',
        endingName: 'The Bell Answer',
        endingIndex: 42,
        rarity: 'rare',
      },
    ],
  },

  mei_end_ch5_complete: {
    id   : 'mei_end_ch5_complete',
    steps: [
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You reach into your bag.\n\nYou find it where it always is.\nSmall. Silver. Worn from four years of carrying.',
      },
      {
        type: 'narration',
        text: 'You hold it out to her.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(The smile stops.)\n\n…',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(One second.\nThe face with nothing on it.)\n\nYou found it.',
      },
      {
        type: 'horror',
        effect: 'static_brief',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'default',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She takes it from your hand.\nHolds it.)\n\nYou found it and you\'re giving it back.',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'default',
        text: '(She looks at it.\nThen at you.\nSomething in her is — trying to understand this.)\n\n"Why?"',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'You don\'t have a clean answer.\n\nMaybe because taking it out didn\'t seem like the point.\nMaybe because you\'ve understood for a while now\nthat the bell was never really the thing keeping you here.',
      },
      {
        type: 'expression',
        character: 'mei',
        expression: 'smile',
        position: 'center',
      },
      {
        type: 'dialogue',
        character: 'mei',
        expression: 'smile',
        text: '(The smile comes back.\nBut slower this time.\nLike it means something different.)\n\nOh.\n\n"Oh, {name}~"\n\n(She closes her fingers around the bell.)\n\n"That\'s the most — that\'s the most—"',
      },
      {
        type: 'clear-characters',
      },
      {
        type: 'narration',
        text: 'She doesn\'t finish the sentence.\n\nShe doesn\'t need to.',
      },
      {
        type: 'narration',
        text: 'She puts the bell back in her pocket.\n\nShe takes your hand.\n\nThe crowd moves around you both in the afternoon light.',
      },
      {
        type: 'narration',
        text: 'You gave her the bell back.\n\nNot because you were afraid.\nNot because she would have found another way.\n\nBecause somewhere between the first day and today\nyou stopped counting the reasons to leave\nand started counting something else entirely.',
      },
      {
        type: 'narration',
        text: 'She knew.\n\nShe always knew.\n\nShe was just waiting\nfor you to know it too.',
      },
      {
        type: 'end',
        endingName: 'Complete',
        endingIndex: 43,
        rarity: 'true',
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
