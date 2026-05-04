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
