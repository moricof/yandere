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


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 3 — "The Arrangement"
     She's arranged your life after graduation.
     Apartment. Job. Schedule. You were never asked.

     ACCEPT PATH:
       himari_ch3_start → himari_ch3_accept_1 → himari_ch3_accept_2
         → himari_end_ch3_new_address      [20 — Normal]
         → himari_end_ch3_signed_in_full   [21 — Rare]

     REFUSE PATH:
       himari_ch3_start → himari_ch3_refuse_1 → himari_ch3_refuse_2
         → himari_end_ch3_terms_and_conditions [22 — Rare]
         → himari_end_ch3_the_open_door        [23 — Normal]
     ══════════════════════════════════════════════════════════ */

  himari_ch3_start: {
    id   : 'himari_ch3_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/rose_salon.jpg' },

      {
        type: 'narration',
        text: 'There are documents on the table.\n\nA stack of them.\nAnd beside the stack, on the white cloth, a single key on a silver ring.',
      },
      {
        type: 'narration',
        text: 'She doesn\'t greet you at the door.\nShe\'s already sitting.\nAlready waiting.\n\nThe tea is poured.',
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
        text       : 'I\'ve been looking forward to this conversation.\n\n(She gestures at the chair across from her.)\n\n"Please."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'After graduation.\n\nI\'ve given it a great deal of thought.\n\n(She sets one hand on the documents.)\n\n"And I\'ve made the necessary arrangements."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'The key is yours.\n\n(She slides it toward you across the cloth.)\n\n"Whenever you\'re ready."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I pick up the key.]',
            nextScene : 'himari_ch3_accept_1',
            statEffect: { affection: 7, obedience: 8 },
          },
          {
            label     : '"I haven\'t agreed to any arrangement."',
            nextScene : 'himari_ch3_refuse_1',
            statEffect: { fear: 8, defiance: 6 },
          },
        ],
      },

    ],
  },


  /* ── Accept Path: Act 1 ──────────────────────────────── */

  himari_ch3_accept_1: {
    id   : 'himari_ch3_accept_1',
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
        text       : 'Mm.\n\n(Something in her expression softens — just slightly.)\n\nGood.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'The apartment is in the Shirotsuru district.\nFifteenth floor.\nSoutheast-facing.\n\n(She opens the first document.)\n\n"I selected it for the light. You do better with natural light.\nI have three months of data on it."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She begins going through the documents.\n\nOne by one.\nIn order.',
      },
      {
        type: 'narration',
        text: 'The apartment.\nThe position she\'s arranged at a firm she has connections with.\nA weekly schedule — including meals, transit, and what she calls "designated proximity time."\n\nThree and a half hours.\nDaily.\nAlready cleared in her own calendar.',
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
        text       : 'The lease begins the first of next month.\n\nThe position starts two weeks after that.\n\n(She refills your cup.)\n\n"I\'ve accounted for the transition period.\nYou won\'t need to worry about any of it."',
      },

      { type: 'goto-scene', scene: 'himari_ch3_accept_2' },

    ],
  },


  /* ── Accept Path: Act 2 ──────────────────────────────── */

  himari_ch3_accept_2: {
    id   : 'himari_ch3_accept_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The key is still in your hand.\n\nIt\'s small. Warm from the table.\nYour address engraved on a small tag beneath the ring.',
      },
      {
        type: 'narration',
        text: 'Your address.\nAlready engraved.\nBefore you agreed.',
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
        text       : 'There\'s one more thing.\n\n(She removes the final document from the stack.\nSlides it across.)\n\n"This one requires your signature."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I look at what I\'m being asked to sign.]',
            nextScene : 'himari_end_ch3_new_address',
            statEffect: { affection: 10, obedience: 8 },
          },
          {
            label     : '[I set the key down. Something is wrong.]',
            nextScene : 'himari_end_ch3_signed_in_full',
            statEffect: { fear: 10, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Refuse Path: Act 1 ──────────────────────────────── */

  himari_ch3_refuse_1: {
    id   : 'himari_ch3_refuse_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'A pause.\n\nVery brief.\nVery controlled.',
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
        text       : 'You haven\'t.\n\n(She agrees, simply.)\n\n"Not formally.\nNo."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'But some arrangements don\'t require agreement.\nThey simply require time.\n\n(She opens the first document anyway.)\n\n"The lease, for instance.\nIs already signed.\nIt began last Tuesday."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Last Tuesday.\n\nYou were in class last Tuesday.\nYou had lunch in the courtyard.\nYou fed the pigeons.',
      },
      {
        type: 'narration',
        text: 'The apartment exists.\nThe lease is active.\n\nYour address is already decided.',
      },

      { type: 'goto-scene', scene: 'himari_ch3_refuse_2' },

    ],
  },


  /* ── Refuse Path: Act 2 ──────────────────────────────── */

  himari_ch3_refuse_2: {
    id   : 'himari_ch3_refuse_2',
    steps: [

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
        text       : 'The position, similarly.\n\nI spoke to the director last month.\nYour name is already in the system.\nOrientation is the fourteenth.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I understand this feels sudden.\n\n(She pours the tea as if the conversation is simply informational.)\n\n"But I want you to understand — none of this requires your agreement to exist.\nI\'m telling you as a courtesy.\nBecause I think you\'d like to know."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'The key is still on the table.\n\n(She looks at it, then at you.)\n\n"You can refuse it.\nThe apartment will still be there."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"This isn\'t legal. You can\'t do this."',
            nextScene : 'himari_end_ch3_terms_and_conditions',
            statEffect: { fear: 10, defiance: 7 },
          },
          {
            label     : '[I look at the key. I don\'t move.]',
            nextScene : 'himari_end_ch3_the_open_door',
            statEffect: { fear: 8, obedience: 5 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 20: New Address ──────────────────────────── */

  himari_end_ch3_new_address: {
    id   : 'himari_end_ch3_new_address',
    steps: [

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'It\'s a residency agreement.\n\nDetailed.\nLegal language.\nHer name and yours at the top.\n\nThe space for your signature is already marked.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'It outlines mutual expectations.\n\n(She folds her hands.)\n\n"Nothing unreasonable.\nProximity schedules.\nCommunication protocols.\nNotification requirements."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Page four covers the termination clause.\n\n(A pause.)\n\n"You\'ll notice it\'s quite short."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Page four is one sentence.\n\n"This agreement does not terminate."',
      },
      {
        type: 'narration',
        text: 'The key is still in your hand.\n\nShe watches you read.',
      },

      {
        type        : 'end',
        endingName  : 'New Address',
        endingIndex : 20,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 21: Signed in Full ───────────────────────── */

  himari_end_ch3_signed_in_full: {
    id   : 'himari_end_ch3_signed_in_full',
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
        text       : '(She watches you set it down.)\n\n…',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Something is wrong.\n\n(She says it softly.\nLike a diagnosis.)\n\n"What\'s wrong?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t know how to begin.\n\nShe waits.\nShe has always been very patient.',
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
        text       : 'You\'re frightened.\n\n(Not unkindly.)\n\n"That\'s all right.\nI expected that.\nI\'ve built for it."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'You don\'t have to sign today.\n\n(She slides the document closer anyway.)\n\n"But the apartment exists whether you sign or not.\nThe pen is right there."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The pen is right there.\n\nYou understand — with absolute clarity —\nthat the only question is how long it takes.',
      },

      {
        type        : 'end',
        endingName  : 'Signed in Full',
        endingIndex : 21,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 22: Terms and Conditions ────────────────── */

  himari_end_ch3_terms_and_conditions: {
    id   : 'himari_end_ch3_terms_and_conditions',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She considers this.',
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
        text       : 'You\'re right that there are legal complexities.\n\n(She doesn\'t flinch.)\n\n"I\'ve had it reviewed.\nThe residency agreement is standard.\nThe employment arrangement is standard.\nThe lease is in your name — I simply paid for it."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'None of this is illegal.\n\nNone of it requires your consent to exist.\n\n(She meets your eyes.)\n\n"What you\'re feeling isn\'t a legal question.\nIt\'s a much more personal one."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'The apartment is yours.\nThe job is yours.\nThe life is yours.\n\n(A pause.)\n\n"I simply built it.\nYou just have to live in it."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She waits.\n\nShe has been waiting much longer than today.',
      },

      {
        type        : 'end',
        endingName  : 'Terms and Conditions',
        endingIndex : 22,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 23: The Open Door ────────────────────────── */

  himari_end_ch3_the_open_door: {
    id   : 'himari_end_ch3_the_open_door',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stands.\n\nCrosses to the door.\nOpens it.',
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
        text       : 'You can leave.\n\n(She holds the door open.\nThe corridor beyond is quiet.)\n\n"I\'m not stopping you."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'The apartment will still be there.\nThe position will still be there.\n\n(She tilts her head slightly.)\n\n"And I will still be here.\nAs I always have been."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t move.',
      },
      {
        type: 'narration',
        text: 'The door is open.\n\nShe is right.\nShe is not stopping you.',
      },
      {
        type: 'narration',
        text: 'You don\'t move.',
      },

      {
        type        : 'end',
        endingName  : 'The Open Door',
        endingIndex : 23,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 3 — "The Letter"
     A letter fell from her bag. She didn't mean you to see it.
     It is addressed to you. It was never going to be sent.

     RETURN PATH:
       shizuku_ch3_start → shizuku_ch3_return_1 → shizuku_ch3_return_2
         → shizuku_end_ch3_unread  [20 — Normal]
         → shizuku_end_ch3_draft   [21 — Rare]

     READ PATH:
       shizuku_ch3_start → shizuku_ch3_read_1 → shizuku_ch3_read_2
         → shizuku_end_ch3_every_word  [22 — Rare]
         → shizuku_end_ch3_permission  [23 — Normal]
     ══════════════════════════════════════════════════════════ */

  shizuku_ch3_start: {
    id   : 'shizuku_ch3_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/library.jpg' },

      {
        type: 'narration',
        text: 'It falls when she reaches into her bag for her bookmark.\n\nA folded envelope.\nWhite.\nYour name on the front in her careful script.',
      },
      {
        type: 'narration',
        text: 'She doesn\'t notice immediately.\n\nShe\'s still looking in her bag.',
      },
      {
        type: 'narration',
        text: 'The envelope is on the floor between you.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I pick it up and hand it back without looking.]',
            nextScene : 'shizuku_ch3_return_1',
            statEffect: { affection: 6, obedience: 4 },
          },
          {
            label     : '[I pick it up. My name is on it. I open it.]',
            nextScene : 'shizuku_ch3_read_1',
            statEffect: { fear: 7, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Return Path: Act 1 ──────────────────────────────── */

  shizuku_ch3_return_1: {
    id   : 'shizuku_ch3_return_1',
    steps: [

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'She turns.\n\nSees the envelope in your hand.\nSees that it\'s still folded.\nSees that you\'re holding it out to her.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '…',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : '(She takes it.\nVery carefully.\nLike it might come apart.)\n\nYou didn\'t read it.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'blush',
        text       : '(It isn\'t a question.)\n\nYou didn\'t read it.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She holds it against her chest.\n\nThe way you hold something you almost lost.',
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
        text       : 'Thank you.\n\n(Very quietly.)\n\n"I — thank you."',
      },

      { type: 'goto-scene', scene: 'shizuku_ch3_return_2' },

    ],
  },


  /* ── Return Path: Act 2 ──────────────────────────────── */

  shizuku_ch3_return_2: {
    id   : 'shizuku_ch3_return_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She sits with the envelope in her hands for a long time.',
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
        text       : 'I\'ve written thirty-seven of these.\n\n(She says it like a confession.)\n\n"Since the beginning of second year.\nOne every few weeks."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I keep deciding which one to give you.\n\nAnd then I don\'t.\n\n(She looks at the envelope.)\n\n"This one got away from me."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Would you like to read it to me?"',
            nextScene : 'shizuku_end_ch3_unread',
            statEffect: { affection: 10, dependency: 9 },
          },
          {
            label     : '"Thirty-seven."',
            nextScene : 'shizuku_end_ch3_draft',
            statEffect: { fear: 9, dependency: 7 },
          },
        ],
      },

    ],
  },


  /* ── Read Path: Act 1 ────────────────────────────────── */

  shizuku_ch3_read_1: {
    id   : 'shizuku_ch3_read_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Your name is on it.\n\nYou open it.',
      },
      {
        type: 'narration',
        text: 'The handwriting is hers.\nBut different from her usual careful script.\nThis is the version that comes at 3am.\nThe version that shakes a little.',
      },
      {
        type: 'narration',
        text: 'The letter begins:\n\n"I know I\'m not supposed to feel this way.\nI know what it would look like if anyone else could see inside my head.\nI\'ve been trying to correct it for eight months.\nI don\'t think I can."',
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
        text       : '(She turns.)\n\n{name}—',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'cry',
        text       : '(She sees the letter open in your hands.)\n\n…',
      },

      { type: 'goto-scene', scene: 'shizuku_ch3_read_2' },

    ],
  },


  /* ── Read Path: Act 2 ────────────────────────────────── */

  shizuku_ch3_read_2: {
    id   : 'shizuku_ch3_read_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t try to take it back.\n\nShe watches you read.',
      },
      {
        type: 'narration',
        text: 'The letter goes on for four pages.\n\nMost of it is careful — she\'s clearly drafted it multiple times.\nBut there are passages that break through.\n\nThings she thought about doing.\nPaths she\'d considered.\nThings she tells herself not to want.',
      },
      {
        type: 'narration',
        text: 'The last line:\n\n"I\'m going to keep feeling this way forever.\nI thought you should know.\nI\'m sorry.\nI\'m not sorry."',
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
        text       : 'Does it change anything?\n\n(She asks it quietly.\nSteadily.\nLike she\'s been practicing.)',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Shizuku… this is a lot."',
            nextScene : 'shizuku_end_ch3_every_word',
            statEffect: { fear: 10, dependency: 7 },
          },
          {
            label     : '[I fold the letter. I hand it back.]',
            nextScene : 'shizuku_end_ch3_permission',
            statEffect: { fear: 7, affection: 5 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 20: Unread ───────────────────────────────── */

  shizuku_end_ch3_unread: {
    id   : 'shizuku_end_ch3_unread',
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
        text       : '(She looks at you for a long moment.)\n\n…Yes.\n\n(Slowly.)\n\n"Actually.\nYes.\nI think I would."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Her voice is very quiet when she reads.\n\nShe stops at certain passages.\nStays with them a moment.\nThen continues.',
      },
      {
        type: 'narration',
        text: 'When she finishes she folds it back along the same creases.\nPuts it in her bag.',
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
        text       : 'I\'ll give you one of the others eventually.\n\n(She opens her book again.)\n\n"When I find the right one."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : '(Without looking up.)\n\n"There are thirty-six left."',
      },

      {
        type        : 'end',
        endingName  : 'Unread',
        endingIndex : 20,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 21: The Draft ────────────────────────────── */

  shizuku_end_ch3_draft: {
    id   : 'shizuku_end_ch3_draft',
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
        text       : '(She doesn\'t look embarrassed.)\n\nThirty-seven.\n\n"The first one was from the end of first year.\nRight after I realized."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'Some of them are very short.\n\n(She looks at the envelope.)\n\n"Some of them are long enough that I had to stop.\nBecause I was frightening myself."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it without drama.\n\nJust information.\nJust the truth of what\'s been living inside her.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'yandere',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : 'I was going to give you number twelve.\n\n(Very quietly.)\n\n"It\'s the most honest one.\nI\'ve been deciding for two months.\n\nI think I\'ll give it to you soon."',
      },

      {
        type        : 'end',
        endingName  : 'The Draft',
        endingIndex : 21,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 22: Every Word ───────────────────────────── */

  shizuku_end_ch3_every_word: {
    id   : 'shizuku_end_ch3_every_word',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She nods.\n\nSlowly.',
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
        text       : 'I know.\n\n(No apology in it.)\n\n"I wrote it because I knew it was a lot.\nI needed somewhere to put it."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I\'ve been carrying all of that for a very long time.\n\n(She meets your eyes.)\n\n"Now you\'re carrying some of it too.\nI\'m sorry.\nI\'m not sorry."',
      },

      { type: 'horror', effect: 'static_brief' },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The last line of the letter.\n\nThe same words.\n\nSaid out loud now.\nTo your face.',
      },

      {
        type        : 'end',
        endingName  : 'Every Word',
        endingIndex : 22,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 23: Permission ───────────────────────────── */

  shizuku_end_ch3_permission: {
    id   : 'shizuku_end_ch3_permission',
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
        text       : '(She takes it back.\nHolds it.\nDoesn\'t put it away.)\n\nDoes it change anything?',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t answer.\n\nYou\'re not sure you could.',
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
        text       : 'That\'s okay.\n\n(She opens her book.\nThe bookmark is still on page one.)\n\n"You don\'t have to answer.\nI already know you\'ll come back tomorrow."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : '(Without looking up.)\n\n"And I\'ll be here.\nI\'m always here.\nThat\'s the part I didn\'t need to write down."',
      },

      {
        type        : 'end',
        endingName  : 'Permission',
        endingIndex : 23,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 3 — "The Variable"
     She has identified a flaw in the model.
     The flaw is that she has developed feelings.
     She is reporting this to you like a bug.

     ENGAGE PATH:
       reina_ch3_start → reina_ch3_engage_1 → reina_ch3_engage_2
         → reina_end_ch3_controlled_variable  [20 — Normal]
         → reina_end_ch3_non_linear_output    [21 — Rare]

     DEFLECT PATH:
       reina_ch3_start → reina_ch3_deflect_1 → reina_ch3_deflect_2
         → reina_end_ch3_null_hypothesis      [22 — Rare]
         → reina_end_ch3_standard_deviation   [23 — Normal]
     ══════════════════════════════════════════════════════════ */

  reina_ch3_start: {
    id   : 'reina_ch3_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/student_council.jpg' },

      {
        type: 'narration',
        text: 'There\'s no folder this time.\n\nNo report.\nNo stack of documents.\n\nShe\'s just sitting at the desk.\nHands folded.\nExpression unreadable.',
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
        text       : 'I\'ve identified an anomaly in the model.\n\n(She looks at you directly.)\n\n"I wanted to inform you."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Over the past six weeks, my projected outcomes have been consistently deprioritizing rational optimization.\n\nIn favor of an unaccounted-for variable.\n\n(A pause.)\n\n"The variable is you."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'More precisely:\n\nthe way I respond to your presence.\n\nIt falls outside the model\'s parameters.\nI cannot correct it.\nI have been attempting to for four weeks.',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"What does the variable do, exactly?"',
            nextScene : 'reina_ch3_engage_1',
            statEffect: { affection: 5, dependency: 6 },
          },
          {
            label     : '"Reina… are you telling me you have feelings?"',
            nextScene : 'reina_ch3_deflect_1',
            statEffect: { fear: 4, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Engage Path: Act 1 ──────────────────────────────── */

  reina_ch3_engage_1: {
    id   : 'reina_ch3_engage_1',
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
        text       : 'Several things.\n\n(She opens a notebook — not the report, something smaller, personal-looking.)\n\n"One. I have begun allocating decision-making resources to your welfare at the expense of more pressing priorities. The ratio is increasing."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Two. I have found myself running simulations of adverse scenarios involving you.\nThey produce an irrational aversion response.\n\n(She turns the page.)\n\n"Three. Your absence from expected locations causes a measurable disruption in my workflow."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She\'s not blushing.\nShe\'s not nervous.\n\nShe\'s reading from notes.\nLike a presentation.\nLike she prepared for this meeting.',
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
        text       : 'Four.\n\n(She closes the notebook.)\n\n"I have run seventeen scenarios in which the arrangement ends.\n\nIn all seventeen, the model collapses."',
      },

      { type: 'goto-scene', scene: 'reina_ch3_engage_2' },

    ],
  },


  /* ── Engage Path: Act 2 ──────────────────────────────── */

  reina_ch3_engage_2: {
    id   : 'reina_ch3_engage_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She looks at you the way she looks at unsolved problems.\n\nDirectly.\nWithout flinching.',
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
        text       : 'I\'ve considered three possible responses to this anomaly.\n\nOne: correction.\nI\'ve established it\'s not possible.\n\nTwo: removal of the variable.\nI\'ve run the projections.\nThe outcomes are unacceptable.\n\n(She straightens her pen on the desk.)\n\n"Three: reclassification."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'I have decided to reclassify the variable\nnot as a flaw,\nbut as a parameter.\n\n(She looks at you.)\n\n"The model now includes you as a fixed value."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"A fixed value."',
            nextScene : 'reina_end_ch3_controlled_variable',
            statEffect: { obedience: 8, dependency: 8 },
          },
          {
            label     : '"Reina. Is this your way of saying you care about me?"',
            nextScene : 'reina_end_ch3_non_linear_output',
            statEffect: { affection: 10, fear: 6 },
          },
        ],
      },

    ],
  },


  /* ── Deflect Path: Act 1 ─────────────────────────────── */

  reina_ch3_deflect_1: {
    id   : 'reina_ch3_deflect_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'A silence.',
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
        text       : '"Feelings" is imprecise.\n\n(She doesn\'t look away.)\n\n"What I\'ve identified is a persistent, non-correctable anomaly in my decision-making framework that prioritizes inputs related to you above all other inputs.\n\nIf that\'s what you mean by feelings, then yes."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I\'m telling you because the model operates more efficiently with full variable disclosure.\n\n(She picks up her pen.)\n\n"You were the last undisclosed variable."',
      },

      { type: 'goto-scene', scene: 'reina_ch3_deflect_2' },

    ],
  },


  /* ── Deflect Path: Act 2 ─────────────────────────────── */

  reina_ch3_deflect_2: {
    id   : 'reina_ch3_deflect_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She opens the notebook.\n\nBegins writing something.',
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
        text       : 'I\'ve run every scenario in which you leave the arrangement.\n\n(She writes without stopping.)\n\n"All scenarios. Every probable cause.\nEvery likely timeline."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The outputs are unacceptable.\n\n(She underlines something.)\n\n"All of them.\nWithout exception."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I want to be transparent about this.\n\n(She looks up.)\n\n"So that you understand the full scope of the arrangement\nyou are currently in."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"What happens in those scenarios?"',
            nextScene : 'reina_end_ch3_null_hypothesis',
            statEffect: { fear: 10, dependency: 6 },
          },
          {
            label     : '[I don\'t ask. I don\'t think I want to know.]',
            nextScene : 'reina_end_ch3_standard_deviation',
            statEffect: { fear: 8, obedience: 5 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 20: Controlled Variable ─────────────────── */

  reina_end_ch3_controlled_variable: {
    id   : 'reina_end_ch3_controlled_variable',
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
        text       : 'Yes.\n\n(She says it without hesitation.)\n\n"A fixed value.\nConstant across all projections.\nNon-negotiable."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The model is more stable this way.\n\n(She closes the notebook.)\n\n"I wanted you to understand that your position in the arrangement\nis no longer conditional.\nIt\'s structural."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Structural.\n\nLike a wall.\nLike a foundation.\n\nNon-negotiable.',
      },
      {
        type: 'narration',
        text: 'She begins a new page.\n\nMonth four.',
      },

      {
        type        : 'end',
        endingName  : 'Controlled Variable',
        endingIndex : 20,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 21: Non-Linear Output ────────────────────── */

  reina_end_ch3_non_linear_output: {
    id   : 'reina_end_ch3_non_linear_output',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She is quiet for three seconds.\n\nPrecisely three.',
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
        text       : 'That\'s one way to characterize it.\n\n(She considers the word.)\n\n"\'Care\' suggests preference.\nThis is more than preference."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The model now optimizes\nfor your continued presence.\n\n(She sets the pen down.)\n\n"At any cost.\nI\'ve checked the math multiple times.\nThe output doesn\'t change."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'At any cost.\n\nShe says it the way she says all true things:\ndirectly.\nWithout softening it.',
      },
      {
        type: 'narration',
        text: 'At any cost.',
      },

      {
        type        : 'end',
        endingName  : 'Non-Linear Output',
        endingIndex : 21,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 22: Null Hypothesis ──────────────────────── */

  reina_end_ch3_null_hypothesis: {
    id   : 'reina_end_ch3_null_hypothesis',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She sets the pen down.',
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
        text       : 'In all scenarios — I implement a correction.\n\n(She says it without inflection.)\n\n"The nature of the correction varies by scenario.\nBut the outcome is consistent.\n\nYou remain in the arrangement."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The model will not accept any other output.\n\n(She looks at you.\nSomething in her expression is almost a warning.)\n\n"I thought it was important for you to know that\nbefore you asked the question."',
      },

      { type: 'horror', effect: 'static_brief' },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You understand.\n\nYou think you understood before she finished the sentence.',
      },

      {
        type        : 'end',
        endingName  : 'Null Hypothesis',
        endingIndex : 22,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 23: Standard Deviation ──────────────────── */

  reina_end_ch3_standard_deviation: {
    id   : 'reina_end_ch3_standard_deviation',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She watches you decide not to ask.\n\nMakes a note.',
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
        text       : 'Smart.\n\n(She closes the notebook.)\n\n"This conversation has been logged.\nSubject demonstrated appropriate comprehension of scope."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'Month four begins Thursday.\n\nNo report this cycle.\n\n(She stands.)\n\n"Just attendance."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"Attendance."\n\nNot a meeting.\nNot a review.\n\nJust: be there.',
      },
      {
        type: 'narration',
        text: 'You will be there.\n\nYou both know it.',
      },

      {
        type        : 'end',
        endingName  : 'Standard Deviation',
        endingIndex : 23,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 3 — "The Red Pages"
     She said she'd show you someday. Today is that day.
     You didn't agree to today being that day.

     LOOK PATH:
       mei_ch3_start → mei_ch3_look_1 → mei_ch3_look_2
         → mei_end_ch3_red_ink      [20 — Normal]
         → mei_end_ch3_three_pages  [21 — Rare]

     DECLINE PATH:
       mei_ch3_start → mei_ch3_decline_1 → mei_ch3_decline_2
         → mei_end_ch3_already_happened  [22 — Rare]
         → mei_end_ch3_keeping_count     [23 — Normal]
     ══════════════════════════════════════════════════════════ */

  mei_ch3_start: {
    id   : 'mei_ch3_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/school_rooftop.jpg' },

      {
        type: 'narration',
        text: 'She\'s already there when you arrive.\n\nSitting cross-legged.\nMr. Buttons in her lap.\nThe notebook open on the ground in front of her.',
      },
      {
        type: 'narration',
        text: 'The first pages are white.\n\nShe turns past them.\n\nThe pages she stops on are red.',
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
        text       : '{name}~\n\n(She looks up.)\n\n"I said I\'d show you someday.\nI decided today is someday."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '(She holds the notebook out.)\n\n"Do you want to see?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I sit down. I look.]',
            nextScene : 'mei_ch3_look_1',
            statEffect: { fear: 6, dependency: 5 },
          },
          {
            label     : '"I don\'t think I want to see."',
            nextScene : 'mei_ch3_decline_1',
            statEffect: { fear: 7, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Look Path: Act 1 ────────────────────────────────── */

  mei_ch3_look_1: {
    id   : 'mei_ch3_look_1',
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
        text       : '(She scoots closer so you can both see.)\n\nOkay~\n\n"I\'ll explain the ones that need explaining."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The red pages are not dramatic.\n\nThat is the most frightening thing about them.',
      },
      {
        type: 'narration',
        text: 'Each entry is dated.\nA name, sometimes.\nMore often a description.\nA brief note.\n\n"Transferred schools — April."\n"Stopped coming to class — late March."\n"Left the group project. Didn\'t speak to {name} again."',
      },
      {
        type: 'narration',
        text: 'People who used to be near you.\n\nPeople who aren\'t anymore.',
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
        text       : 'Some of them resolved on their own~\n\n(She says it helpfully.)\n\n"I didn\'t have to do anything.\nThey just — left."',
      },

      { type: 'goto-scene', scene: 'mei_ch3_look_2' },

    ],
  },


  /* ── Look Path: Act 2 ────────────────────────────────── */

  mei_ch3_look_2: {
    id   : 'mei_ch3_look_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You stop on one entry.\n\nA name you recognize.\nSomeone who was your friend for two years\nand then, around April of last year,\nsimply wasn\'t.',
      },
      {
        type: 'narration',
        text: 'You asked them once what happened.\n\nThey said it was complicated.',
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
        text       : 'You\'re looking at that one~\n\n(She tilts her head.)\n\n"That one I helped a little.\nJust a little.\nI found some things out and I shared them.\n\nPeople make their own choices after that."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Did you do this to all of them?"',
            nextScene : 'mei_end_ch3_red_ink',
            statEffect: { fear: 9, defiance: 4 },
          },
          {
            label     : '[I close the notebook. I hand it back.]',
            nextScene : 'mei_end_ch3_three_pages',
            statEffect: { fear: 10, dependency: 5 },
          },
        ],
      },

    ],
  },


  /* ── Decline Path: Act 1 ─────────────────────────────── */

  mei_ch3_decline_1: {
    id   : 'mei_ch3_decline_1',
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
        text       : '(She closes the notebook.\nNo argument.)\n\nThat\'s okay~',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'They happened either way.\n\n(She sets it in her lap.)\n\n"I just thought you might want to know.\nSo you\'d understand."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"They happened either way."\n\nYou focus on that.\n\nNot "I did this."\nNot "I caused this."\n\n"They happened."',
      },
      {
        type: 'narration',
        text: 'Like weather.\nLike gravity.',
      },

      { type: 'goto-scene', scene: 'mei_ch3_decline_2' },

    ],
  },


  /* ── Decline Path: Act 2 ─────────────────────────────── */

  mei_ch3_decline_2: {
    id   : 'mei_ch3_decline_2',
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
        text       : 'I wanted you to understand\nthat I\'ve been careful.\n\n(She puts the notebook in her bag.)\n\n"For you.\nSpecifically.\nMore careful than I usually am."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'The number hasn\'t changed since I met you.\n\n(She picks up Mr. Buttons.)\n\n"That\'s — I think that\'s important for you to know.\nI\'ve been trying."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"What number?"',
            nextScene : 'mei_end_ch3_already_happened',
            statEffect: { fear: 10, defiance: 4 },
          },
          {
            label     : '[I don\'t ask. I look at her instead.]',
            nextScene : 'mei_end_ch3_keeping_count',
            statEffect: { fear: 7, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 20: Red Ink ──────────────────────────────── */

  mei_end_ch3_red_ink: {
    id   : 'mei_end_ch3_red_ink',
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
        text       : '(She thinks about it.)\n\nNot all of them.\n\n"Some of them I didn\'t have to.\nSome of them I just watched\nand waited\nand they went away on their own."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'People who aren\'t right for someone\nusually figure it out eventually~\n\n(She tilts her head.)\n\n"I just… helped the timeline.\nFor some of them."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"Helped the timeline."\n\nShe says it the way you\'d say "shortened the commute."\n\nCheerfully.\nPractically.',
      },
      {
        type: 'narration',
        text: 'You think about every person who drifted away from you in the last two years.\n\nEvery one you couldn\'t explain.',
      },

      {
        type        : 'end',
        endingName  : 'Red Ink',
        endingIndex : 20,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 21: Three Pages ──────────────────────────── */

  mei_end_ch3_three_pages: {
    id   : 'mei_end_ch3_three_pages',
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
        text       : '(She takes it back.)\n\nOkay~\n\n"That\'s okay.\nYou don\'t have to look at all of them."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'There are only three pages anyway.\n\n(She runs her thumb along the red edges.)\n\n"Three.\nFor two years.\n\nI think that\'s — I think that\'s pretty good, actually."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Pretty good.\n\nThree pages.\nFor two years.',
      },
      {
        type: 'narration',
        text: 'You look at her bright, earnest face.\n\nShe means it.\n\nShe has been — in her own way, by her own measure —\ntrying to be careful.\n\nFor you.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type: 'narration',
        text: 'That is either the most comforting thing\nor the most frightening thing\nanyone has ever said to you.\n\nYou\'re not sure which.',
      },

      {
        type        : 'end',
        endingName  : 'Three Pages',
        endingIndex : 21,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 22: Already Happened ─────────────────────── */

  mei_end_ch3_already_happened: {
    id   : 'mei_end_ch3_already_happened',
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
        text       : '(She looks at you for a moment.)\n\nThe number of red pages.\n\n(Simply.)\n\n"Since I met you it\'s been three.\nBefore I met you it was more."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'You make me want to be careful~\n\n(She holds Mr. Buttons up.)\n\n"Mr. Buttons says that\'s what it means when you really like someone.\nYou want to be better for them."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Before she met you.\n\nMore than three.',
      },
      {
        type: 'narration',
        text: 'You decide not to ask how many more.',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type: 'narration',
        text: 'They happened either way.\n\nShe said that.\n\nThey happened either way.',
      },

      {
        type        : 'end',
        endingName  : 'Already Happened',
        endingIndex : 22,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 23: Keeping Count ────────────────────────── */

  mei_end_ch3_keeping_count: {
    id   : 'mei_end_ch3_keeping_count',
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
        text       : '(She looks back at you.)\n\nMm~\n\n"You\'re not going to ask."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'That\'s okay.\n\n(She puts Mr. Buttons back in her lap.)\n\n"The number is small.\nThat\'s all you need to know.\n\nAnd it\'s stayed small\nbecause of you."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it like a gift.\n\nLike she\'s giving you something.',
      },
      {
        type: 'narration',
        text: 'The notebook goes back in her bag.\n\nThe afternoon goes quiet.\n\nShe starts humming something soft.',
      },
      {
        type: 'narration',
        text: 'You stay.\n\nYou\'re not entirely sure why.\n\nMaybe because not asking\nfeels safer than knowing.',
      },

      {
        type        : 'end',
        endingName  : 'Keeping Count',
        endingIndex : 23,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 4 — "The Silence"
     Things in your apartment have been moved.
     A photograph you don't remember giving her is on your desk.
     She has a key. She gave it to herself.

     QUIET PATH:
       himari_ch4_start → himari_ch4_quiet_1 → himari_ch4_quiet_2
         → himari_end_ch4_familiar      [30 — Normal]
         → himari_end_ch4_the_spare_key [31 — Rare]

     CONFRONT PATH:
       himari_ch4_start → himari_ch4_confront_1 → himari_ch4_confront_2
         → himari_end_ch4_visiting_hours [32 — Rare]
         → himari_end_ch4_still_yours    [33 — Normal]
     ══════════════════════════════════════════════════════════ */

  himari_ch4_start: {
    id   : 'himari_ch4_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/apartment.jpg' },

      {
        type: 'narration',
        text: 'You notice the vase first.\n\nIt was on the windowsill.\nNow it\'s on the table.\nFilled with flowers that were not there this morning.',
      },
      {
        type: 'narration',
        text: 'Then the books.\nOrdered now.\nBy — you look closer — by date of publication.\nNot how you had them.',
      },
      {
        type: 'narration',
        text: 'Then the photograph.\n\nOn your desk.\nFramed.\nYou in the courtyard.\nLooking up at something off-frame.\n\nYou have never seen this photograph before.',
      },
      {
        type: 'narration',
        text: 'A knock at the door.\n\nThree precise taps.',
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
        text       : '(She steps inside before you answer.\nShe has a key.)\n\nOh good. You\'re home.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I was hoping to be here before you.\n\n(She sets her bag down.\nLooks around the room with quiet satisfaction.)\n\n"The books needed attention."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I don\'t say anything. I watch her move through my apartment.]',
            nextScene : 'himari_ch4_quiet_1',
            statEffect: { fear: 6, obedience: 7 },
          },
          {
            label     : '"You\'ve been in here. When I wasn\'t home."',
            nextScene : 'himari_ch4_confront_1',
            statEffect: { fear: 8, defiance: 6 },
          },
        ],
      },

    ],
  },


  /* ── Quiet Path: Act 1 ───────────────────────────────── */

  himari_ch4_quiet_1: {
    id   : 'himari_ch4_quiet_1',
    steps: [

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She notices you watching her.)\n\nThe kettle is in the left cupboard now.\n\n(She fills it without looking.)\n\n"You had it in the wrong one.\nThe humidity by the window was affecting the seal."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I also moved the lamp.\n\n(She turns it on.\nThe light falls across the desk better.)\n\n"You were reading in the wrong angle.\nI could tell from where the books were marked."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She knows where the kettle was.\n\nShe knows where you mark your books.\nShe knows the humidity by the window.',
      },
      {
        type: 'narration',
        text: 'She has been here more than once.',
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
        text       : 'Sit.\n\n(She gestures at your own chair.)\n\n"I\'ll make the tea.\nI know how you take it."',
      },

      { type: 'goto-scene', scene: 'himari_ch4_quiet_2' },

    ],
  },


  /* ── Quiet Path: Act 2 ───────────────────────────────── */

  himari_ch4_quiet_2: {
    id   : 'himari_ch4_quiet_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She makes the tea correctly.\n\nWithout asking.\nWithout checking.\n\nExactly right.',
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
        text       : '(She sets the cup down.\nSits across from you.\nLooks at the room with quiet satisfaction.)\n\n"It\'s better now.\nDon\'t you think?"',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I have one more thing.\n\n(She opens her bag.\nProduces something small.\nSets it on the table between you.)',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I look at what she put on the table.]',
            nextScene : 'himari_end_ch4_familiar',
            statEffect: { affection: 8, obedience: 9 },
          },
          {
            label     : '"How many times have you been here?"',
            nextScene : 'himari_end_ch4_the_spare_key',
            statEffect: { fear: 10, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Confront Path: Act 1 ────────────────────────────── */

  himari_ch4_confront_1: {
    id   : 'himari_ch4_confront_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stops.\n\nTurns.\nLooks at you.',
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
        text       : 'Yes.\n\n(She says it simply.)\n\n"Several times."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I have a key because I arranged this apartment.\n\n(She sets her bag down.)\n\n"It would be strange not to.\nI needed to know it was acceptable for you.\nThat the light was right. The layout. The distance from campus."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I made adjustments.\n\nSmall ones.\nNothing you\'d miss.\n\n(She tilts her head.)\n\n"Did you miss them?"',
      },

      { type: 'goto-scene', scene: 'himari_ch4_confront_2' },

    ],
  },


  /* ── Confront Path: Act 2 ────────────────────────────── */

  himari_ch4_confront_2: {
    id   : 'himari_ch4_confront_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You didn\'t miss them.\n\nThat\'s the problem.\n\nYou didn\'t notice until now.',
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
        text       : 'Everything I\'ve done here has been careful.\n\nThe photograph on your desk — that\'s from the album.\nYou\'ve seen it.\nI just thought it should be somewhere you\'d see it every day.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'I know this space better than you do now.\n\n(She says it without apology.)\n\n"I\'ve spent more waking hours in it."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"You can\'t just — this is my space."',
            nextScene : 'himari_end_ch4_visiting_hours',
            statEffect: { fear: 10, defiance: 6 },
          },
          {
            label     : '[I look at the photograph. I sit down.]',
            nextScene : 'himari_end_ch4_still_yours',
            statEffect: { fear: 7, obedience: 7 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 30: Familiar ─────────────────────────────── */

  himari_end_ch4_familiar: {
    id   : 'himari_end_ch4_familiar',
    steps: [

      {
        type       : 'expression',
        character  : 'himari',
        expression : 'smile',
        position   : 'center',
      },
      {
        type: 'narration',
        text: 'A key.\n\nSilver.\nA ring.\nA small tag engraved: spare.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'In case you need one.\n\n(She folds her hands.)\n\n"You should always have a spare.\nSomewhere safe."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'I\'ll keep the original, of course.\n\n(She picks up her tea.)\n\n"For convenience."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'There are now two keys to your apartment.\n\nShe holds one.\nShe\'s given you the spare.',
      },
      {
        type: 'narration',
        text: 'You are a guest\nin the room she\'s made of your home.',
      },

      {
        type        : 'end',
        endingName  : 'Familiar',
        endingIndex : 30,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 31: The Spare Key ────────────────────────── */

  himari_end_ch4_the_spare_key: {
    id   : 'himari_end_ch4_the_spare_key',
    steps: [

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
        text       : '(She considers.)\n\nEnough.\n\n(Precisely.)\n\n"To understand it.\nTo be certain it was right for you."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'You were at class.\nAt the library.\nAt dinner with someone on a Tuesday.\n\n(She lists them without looking at notes.)\n\n"You\'re never home on Tuesdays before eight."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She knows your schedule\nbetter than you do.',
      },
      {
        type: 'narration',
        text: 'She has been inside this room\nevery Tuesday for how long.\n\nYou don\'t ask.\n\nYou\'re not sure you want the number.',
      },

      {
        type        : 'end',
        endingName  : 'The Spare Key',
        endingIndex : 31,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 32: Visiting Hours ───────────────────────── */

  himari_end_ch4_visiting_hours: {
    id   : 'himari_end_ch4_visiting_hours',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t react the way you expect.',
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
        text       : 'It is yours.\n\n(She agrees, evenly.)\n\n"I\'ve never suggested otherwise."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'But I arranged it.\nI selected it.\nI furnished the parts you hadn\'t yet.\nI know every room.\n\n(She looks around, calm and satisfied.)\n\n"I care for what\'s yours because I care for you.\nIs that not what you\'d want?"',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'The key isn\'t about access.\n\n(She holds it up briefly.\nThen puts it away.)\n\n"It\'s about knowing that if something happened to you —\nI could be here immediately.\n\n"Is that so unreasonable?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She says it so reasonably.\n\nYou look for the flaw in it.\n\nYou can\'t find it.',
      },

      {
        type        : 'end',
        endingName  : 'Visiting Hours',
        endingIndex : 32,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 33: Still Yours ──────────────────────────── */

  himari_end_ch4_still_yours: {
    id   : 'himari_end_ch4_still_yours',
    steps: [

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
        text       : '(She watches you look at the photograph.)\n\nThat\'s the one from the album.\nPage twelve.\n\n(She sets her tea down.)\n\n"You looked at it the longest when I showed you.\nI thought you\'d want it close."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She noticed.\n\nYou don\'t remember pausing on it.\nBut she noticed.',
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
        text       : 'Nothing I\'ve done here changes what belongs to you.\n\n(She sits across from you.\nFolds her hands in her lap.)\n\n"I\'ve simply been — careful with it.\nWhile you weren\'t looking."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'While you weren\'t looking.\n\nYou pick up the photograph.\n\nYour face in the courtyard.\nLooking peaceful.\nUnwatched.\n\nOr so you thought.',
      },

      {
        type        : 'end',
        endingName  : 'Still Yours',
        endingIndex : 33,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 4 — "The Bad Day"
     She didn't call. She came instead.
     She's been sitting outside your door for an unknown
     amount of time. She didn't knock.

     LET IN PATH:
       shizuku_ch4_start → shizuku_ch4_letin_1 → shizuku_ch4_letin_2
         → shizuku_end_ch4_floor_space   [30 — Normal]
         → shizuku_end_ch4_no_distance   [31 — Rare]

     OUTSIDE PATH:
       shizuku_ch4_start → shizuku_ch4_outside_1 → shizuku_ch4_outside_2
         → shizuku_end_ch4_outside_together [32 — Rare]
         → shizuku_end_ch4_same_door        [33 — Normal]
     ══════════════════════════════════════════════════════════ */

  shizuku_ch4_start: {
    id   : 'shizuku_ch4_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/apartment.jpg' },

      {
        type: 'narration',
        text: 'You open the door and she\'s there.\n\nOn the floor.\nBack against the wall.\nKnees drawn up.\nBag beside her.',
      },
      {
        type: 'narration',
        text: 'She looks up.\n\nHer eyes are dry.\nShe\'s past the crying stage.\nWhatever happened today, she\'s been sitting here long enough to get past it.',
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
        text       : 'I didn\'t knock.\n\n(She says it immediately.)\n\n"I was going to.\nAnd then I thought — if you don\'t answer, I\'ll have to leave.\nSo I didn\'t knock."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I just needed to be near the door.\n\n(Very quietly.)\n\n"I\'m sorry."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I step back. I hold the door open.]',
            nextScene : 'shizuku_ch4_letin_1',
            statEffect: { affection: 7, dependency: 8 },
          },
          {
            label     : '[I sit down beside her in the hallway.]',
            nextScene : 'shizuku_ch4_outside_1',
            statEffect: { affection: 5, dependency: 7 },
          },
        ],
      },

    ],
  },


  /* ── Let In Path: Act 1 ──────────────────────────────── */

  shizuku_ch4_letin_1: {
    id   : 'shizuku_ch4_letin_1',
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
        text       : '(She gets up slowly.\nPicks up her bag.)\n\n…Thank you.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I won\'t — I don\'t need anything.\n\n(She steps inside.\nShe doesn\'t go far.\nShe sits against the wall just inside the door.)\n\n"I just needed to not be out there."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t explain what happened.\n\nYou don\'t ask immediately.\n\nShe sits against your wall the way she sat against the wall outside — like the wall is load-bearing.\nLike it\'s holding something up.',
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
        text       : 'Can you just — do whatever you were doing?\n\n(She closes her eyes.)\n\n"Pretend I\'m not here.\nI just want to hear the room."',
      },

      { type: 'goto-scene', scene: 'shizuku_ch4_letin_2' },

    ],
  },


  /* ── Let In Path: Act 2 ──────────────────────────────── */

  shizuku_ch4_letin_2: {
    id   : 'shizuku_ch4_letin_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'An hour passes.\n\nMaybe more.\n\nYou read. You make something to eat. You move through the room quietly.\n\nShe stays against the wall.',
      },
      {
        type: 'narration',
        text: 'At some point her breathing changes.\n\nShe\'s asleep.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'default',
        position   : 'center',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I get a blanket. I leave it beside her.]',
            nextScene : 'shizuku_end_ch4_floor_space',
            statEffect: { affection: 10, dependency: 9 },
          },
          {
            label     : '[I sit near her. I wait for her to wake up.]',
            nextScene : 'shizuku_end_ch4_no_distance',
            statEffect: { fear: 8, dependency: 10 },
          },
        ],
      },

    ],
  },


  /* ── Outside Path: Act 1 ─────────────────────────────── */

  shizuku_ch4_outside_1: {
    id   : 'shizuku_ch4_outside_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The hallway floor is cold.\n\nYou sit beside her anyway.',
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
        text       : '(She looks at you sideways.)\n\nYou don\'t have to—',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : '(She stops.)\n\n…You sat down.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You sit beside her against the hallway wall.\n\nDoors on either side.\nThe light overhead is slightly too bright.\n\nNeither of you says anything.',
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
        expression : 'sad',
        text       : 'I almost called.\n\n(After a while.)\n\n"Before I came.\nI had my phone out and everything."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I thought — if I call, I have to explain.\nAnd I was too tired to explain.\n\n(She pulls her knees closer.)\n\n"So I just came."',
      },

      { type: 'goto-scene', scene: 'shizuku_ch4_outside_2' },

    ],
  },


  /* ── Outside Path: Act 2 ─────────────────────────────── */

  shizuku_ch4_outside_2: {
    id   : 'shizuku_ch4_outside_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The hallway stays quiet.\n\nSomeone passes at the far end.\nDoesn\'t look at you.',
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
        text       : 'How long were you going to sit here?\n\n(She asks it softly.\nNot accusingly.)',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t know.\n\nAs long as it took, probably.',
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
        text       : '(She breathes in.\nHolds it.\nLets it go.)\n\nI\'ll always come here first.\n\n"Before anywhere else.\nNo matter what.\nI wanted you to know that."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Is that okay? That you always come here?"',
            nextScene : 'shizuku_end_ch4_outside_together',
            statEffect: { fear: 8, dependency: 9 },
          },
          {
            label     : '[I don\'t answer. The hallway is enough for now.]',
            nextScene : 'shizuku_end_ch4_same_door',
            statEffect: { affection: 8, dependency: 8 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 30: Floor Space ──────────────────────────── */

  shizuku_end_ch4_floor_space: {
    id   : 'shizuku_end_ch4_floor_space',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She doesn\'t stir when you lay the blanket beside her.\n\nShe\'s fully asleep.\nSomething in her face has let go that hadn\'t let go since she got here.',
      },
      {
        type: 'narration',
        text: 'You sit in the chair across the room.\n\nThe lamp is on.\nThe room is quiet.',
      },
      {
        type: 'narration',
        text: 'She came here because there was nowhere else that would work.\n\nYou understand that.\n\nThe frightening part is:\nyou understand it completely.',
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
        text       : '(Hours later, half-awake.)\n\n…You\'re still here.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'smile',
        text       : '(She doesn\'t wait for an answer.\nShe closes her eyes again.)\n\nGood.',
      },

      {
        type        : 'end',
        endingName  : 'Floor Space',
        endingIndex : 30,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 31: No Distance ──────────────────────────── */

  shizuku_end_ch4_no_distance: {
    id   : 'shizuku_end_ch4_no_distance',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You sit near her on the floor.\n\nNot close enough to wake her.\nJust — nearby.',
      },
      {
        type: 'narration',
        text: 'She wakes a little while later.\n\nSees you.\nDoes not look surprised.',
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
        text       : 'I almost didn\'t come.\n\n(Sleep-rough voice.)\n\n"I sat outside for twenty minutes before I knocked — before I decided not to knock.\nI almost just went home."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : 'But I couldn\'t.\n\n(She looks at you.\nVery steadily.)\n\n"I can\'t put distance between us anymore.\nI\'ve tried.\nThe distance doesn\'t hold."',
      },

      {
        type        : 'end',
        endingName  : 'No Distance',
        endingIndex : 31,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 32: Outside Together ─────────────────────── */

  shizuku_end_ch4_outside_together: {
    id   : 'shizuku_end_ch4_outside_together',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'A long pause.',
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
        text       : 'No.\n\n(She says it quietly.\nHonestly.)\n\n"It\'s probably not okay."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : 'But I\'m going to do it anyway.\n\n(She leans her head back against the wall.)\n\n"Every time something goes wrong —\nthis will be the first place I come.\n\nI don\'t know how to make that not true anymore."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The hallway light buzzes slightly.\n\nNeither of you moves.',
      },
      {
        type: 'narration',
        text: 'She came here because nowhere else would work.\n\nShe told you it\'s not okay.\n\nShe\'s going to keep coming.',
      },

      {
        type        : 'end',
        endingName  : 'Outside Together',
        endingIndex : 32,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 33: Same Door ────────────────────────────── */

  shizuku_end_ch4_same_door: {
    id   : 'shizuku_end_ch4_same_door',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t answer.\n\nThe hallway holds the silence.',
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
        text       : '(Eventually.)\n\nThank you for sitting down.\n\n(She says it simply.)\n\n"You didn\'t have to."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You sit in the hallway until the building goes quiet.\n\nThen she stands.\nPicks up her bag.\nLooks at your door.',
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
        text       : 'I\'ll come back.\n\n(Not a question. Not a warning.\nJust a fact.)\n\n"Same door."',
      },

      {
        type        : 'end',
        endingName  : 'Same Door',
        endingIndex : 33,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 4 — "The Deviation"
     She was here all night. She looks tired — unprecedented.
     Something happened. She corrected it. She will not say
     exactly what. Only that you are safer now.

     ACCEPT PATH:
       reina_ch4_start → reina_ch4_accept_1 → reina_ch4_accept_2
         → reina_end_ch4_incident_report     [30 — Normal]
         → reina_end_ch4_protective_measure  [31 — Rare]

     DEMAND PATH:
       reina_ch4_start → reina_ch4_demand_1 → reina_ch4_demand_2
         → reina_end_ch4_the_calculation    [32 — Rare]
         → reina_end_ch4_necessary_outcome  [33 — Normal]
     ══════════════════════════════════════════════════════════ */

  reina_ch4_start: {
    id   : 'reina_ch4_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/student_council.jpg' },

      {
        type: 'narration',
        text: 'She\'s been here all night.\n\nYou can tell because the lamp is still on.\nBecause there are three empty tea cups.\nBecause Reina Kuzuba never looks tired\nand today she does.',
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
        text       : 'There was a deviation.\n\n(She says it before you ask.)\n\n"In the model.\nLast night.\nI corrected it."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The arrangement is stable.\n\n(She sets down her pen.)\n\n"You don\'t need to concern yourself with the specifics.\nEverything is fine now."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'I wanted you to know that there was a problem.\nAnd that it has been resolved.\n\n(She looks at you.)\n\n"That\'s all."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Are you all right?"',
            nextScene : 'reina_ch4_accept_1',
            statEffect: { affection: 5, dependency: 6 },
          },
          {
            label     : '"Tell me what you did."',
            nextScene : 'reina_ch4_demand_1',
            statEffect: { fear: 7, defiance: 6 },
          },
        ],
      },

    ],
  },


  /* ── Accept Path: Act 1 ──────────────────────────────── */

  reina_ch4_accept_1: {
    id   : 'reina_ch4_accept_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She pauses.\n\nA real pause.\nNot calculated.',
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
        text       : '…Yes.\n\n(She says it after a moment.)\n\n"Functionally."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The deviation emerged from an external variable I hadn\'t fully accounted for.\n\nSomeone whose continued proximity to you produced outcomes\nthe model classified as unacceptable.\n\n(She picks up her pen again.)\n\n"I ran the numbers. I made a decision. It\'s done."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"Someone."\n\nNot "something."\n\nSomeone.',
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
        text       : 'You don\'t need to know the details.\n\n(She meets your eyes.)\n\n"You just need to know you\'re safe."',
      },

      { type: 'goto-scene', scene: 'reina_ch4_accept_2' },

    ],
  },


  /* ── Accept Path: Act 2 ──────────────────────────────── */

  reina_ch4_accept_2: {
    id   : 'reina_ch4_accept_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You sit across from her.\n\nShe begins working again.\nLike the conversation has reached its conclusion.',
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
        text       : 'There are things I will not allow the model to produce.\n\n(Without looking up.)\n\n"Outcomes that involve harm to you.\nDisruption to the arrangement.\nYour removal from it."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'When variables threaten those constraints —\nI correct them.\n\n(She turns the page.)\n\n"That\'s all last night was."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"What was the deviation, exactly?"',
            nextScene : 'reina_end_ch4_incident_report',
            statEffect: { fear: 8, obedience: 7 },
          },
          {
            label     : '"You stayed here all night for me."',
            nextScene : 'reina_end_ch4_protective_measure',
            statEffect: { affection: 10, dependency: 8 },
          },
        ],
      },

    ],
  },


  /* ── Demand Path: Act 1 ──────────────────────────────── */

  reina_ch4_demand_1: {
    id   : 'reina_ch4_demand_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She looks at you for a moment.',
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
        text       : 'I\'ll walk you through the logic.\n\n(She opens a notebook.)\n\n"Not the specifics of the action.\nThe logic."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The model has a constraint set.\nThings it will not produce as outputs.\nYour continued safety is the primary constraint.\n\n(She draws a small diagram.)\n\n"Last night, a variable was identified that threatened that constraint.\nLeft unaddressed — projected outcome: harm to you within forty-eight hours."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Harm to you.\nWithin forty-eight hours.\n\nShe says it like a weather report.',
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
        text       : 'I ran the numbers.\nAll viable responses.\nCross-referenced against outcomes.\n\n(She turns the notebook toward you.)\n\n"The optimal response had the highest score by a significant margin."',
      },

      { type: 'goto-scene', scene: 'reina_ch4_demand_2' },

    ],
  },


  /* ── Demand Path: Act 2 ──────────────────────────────── */

  reina_ch4_demand_2: {
    id   : 'reina_ch4_demand_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The diagram is clean.\n\nBoxes. Arrows. Percentages.\n\nYou follow the logic.\nIt is, step by step, airtight.\n\nThe conclusion she reached is the correct conclusion\nif you accept the premises.',
      },
      {
        type: 'narration',
        text: 'The premise is: your safety is the highest priority.\nAbove all other considerations.\nWithout exception.',
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
        text       : 'You\'re looking for a flaw in the reasoning.\n\n(She watches you.)\n\n"There isn\'t one.\nI checked multiple times."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"What exactly did you do?"',
            nextScene : 'reina_end_ch4_the_calculation',
            statEffect: { fear: 10, defiance: 5 },
          },
          {
            label     : '[I close the notebook. The logic is sound. I don\'t want the rest.]',
            nextScene : 'reina_end_ch4_necessary_outcome',
            statEffect: { fear: 9, obedience: 6 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 30: Incident Report ──────────────────────── */

  reina_end_ch4_incident_report: {
    id   : 'reina_end_ch4_incident_report',
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
        text       : 'A variable whose continued proximity to you\nwas producing projected harm.\n\n(She says it calmly.)\n\n"I identified it three days ago.\nI monitored it for seventy-two hours.\nLast night it crossed the intervention threshold."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'The action I took was proportional.\nDocumented.\nFiled.\n\n(She closes the notebook.)\n\n"It won\'t happen again.\nBecause I\'ve corrected the variable."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Corrected the variable.\n\nYou don\'t ask what that means.\n\nYou think you understand it well enough.',
      },

      {
        type        : 'end',
        endingName  : 'Incident Report',
        endingIndex : 30,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 31: Protective Measure ───────────────────── */

  reina_end_ch4_protective_measure: {
    id   : 'reina_end_ch4_protective_measure',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She goes still.',
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
        text       : '…Yes.\n\n(She says it like she hadn\'t considered it that way.)\n\n"I suppose that\'s accurate."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'There are things I will not allow the model to produce.\n\n(She looks at you directly.)\n\n"You are one of them.\nYou are — specifically — the reason the constraint exists."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stayed up all night\nrunning calculations\nto protect you from something you didn\'t know was coming.',
      },
      {
        type: 'narration',
        text: 'You don\'t know whether to thank her.\n\nYou don\'t know whether to be frightened.',
      },
      {
        type: 'narration',
        text: 'Both.',
      },

      {
        type        : 'end',
        endingName  : 'Protective Measure',
        endingIndex : 31,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 32: The Calculation ──────────────────────── */

  reina_end_ch4_the_calculation: {
    id   : 'reina_end_ch4_the_calculation',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She considers whether to answer.\n\nFor exactly four seconds.',
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
        text       : 'I removed them.\n\n(Simply.)\n\n"From your environment.\nPermanently.\n\nThe method was clean.\nLegal.\nUntraceable to either of us."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I want to be transparent about what I\'m capable of.\n\n(She sets the pen down.)\n\n"So you understand the full scope of the arrangement you\'re in.\nI thought that was important."',
      },

      { type: 'horror', effect: 'static_brief' },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You would have done the same thing.\n\nIf you thought the way she thinks.\n\nThat\'s the most frightening part.',
      },

      {
        type        : 'end',
        endingName  : 'The Calculation',
        endingIndex : 32,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 33: Necessary Outcome ────────────────────── */

  reina_end_ch4_necessary_outcome: {
    id   : 'reina_end_ch4_necessary_outcome',
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
        text       : '(She watches you close it.)\n\nSmart.\n\n(She says it approvingly.)\n\n"You would have done the same thing.\nIf you thought the way I think."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'The logic is sound.\nThe outcome was necessary.\n\n(She gathers the papers.)\n\n"That\'s all that matters."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The notebook goes back on the shelf.\n\nShe pours a fourth cup of tea.\n\nThe room goes quiet.',
      },
      {
        type: 'narration',
        text: 'You don\'t know what she did.\n\nYou know it was done cleanly.\nYou know it was done for you.\n\nYou know you\'re not going to ask again.',
      },

      {
        type        : 'end',
        endingName  : 'Necessary Outcome',
        endingIndex : 33,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 4 — "The Favor"
     She asks you for a favor. Very casually. Very specifically.
     The favor is not small.

     YES PATH:
       mei_ch4_start → mei_ch4_yes_1 → mei_ch4_yes_2
         → mei_end_ch4_the_favor_done  [30 — Normal]
         → mei_end_ch4_because_you_asked [31 — Rare]

     ASK PATH:
       mei_ch4_start → mei_ch4_ask_1 → mei_ch4_ask_2
         → mei_end_ch4_small_request    [32 — Rare]
         → mei_end_ch4_already_handled  [33 — Normal]
     ══════════════════════════════════════════════════════════ */

  mei_ch4_start: {
    id   : 'mei_ch4_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/academy_corridor.jpg' },

      {
        type: 'narration',
        text: 'She finds you between classes.\n\nShe\'s been playful all day.\nTexts with little drawings.\nMr. Buttons waving.',
      },
      {
        type: 'narration',
        text: 'It\'s only now, walking beside you, that she goes quiet.\n\nJust for a moment.',
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
        text       : 'Ne, {name}~\n\n(She says it lightly.)\n\n"Can I ask you a favor?"',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'It\'s a small one.\n\n(She holds up her fingers — very small gap.)\n\n"Tiny.\nYou\'ll probably say yes right away."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Sure, what is it?"',
            nextScene : 'mei_ch4_yes_1',
            statEffect: { affection: 5, obedience: 6 },
          },
          {
            label     : '"What\'s the favor?"',
            nextScene : 'mei_ch4_ask_1',
            statEffect: { fear: 4, defiance: 4 },
          },
        ],
      },

    ],
  },


  /* ── Yes Path: Act 1 ─────────────────────────────────── */

  mei_ch4_yes_1: {
    id   : 'mei_ch4_yes_1',
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
        text       : 'Yay~!\n\n(She claps once, delighted.)\n\n"I knew you would.\nYou always say yes."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'Okay so~\n\n(She walks beside you.\nTilts her head.)\n\n"You know Sato-kun?\nFrom your Tuesday seminar?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You do.\n\nYou\'ve been study partners with him since the start of term.\nHe lent you notes when you were sick.\nYou had lunch with him twice last week.',
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
        text       : 'I need you to stop seeing him.\n\n(She says it the way she\'d say: "I need you to grab a snack.")\n\n"Not forever~\nJust — not anymore."',
      },

      { type: 'goto-scene', scene: 'mei_ch4_yes_2' },

    ],
  },


  /* ── Yes Path: Act 2 ─────────────────────────────────── */

  mei_ch4_yes_2: {
    id   : 'mei_ch4_yes_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You stop walking.',
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
        text       : '(She stops too.\nTurns to face you.)\n\nHe\'s too close~\n\n"I don\'t like how he talks to you.\nThe way he\'s always there at lunch.\nThe notes thing."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'I\'ve been thinking about asking for three weeks.\n\n(She looks at you steadily.)\n\n"You said yes already.\nSo it\'s fine~\n\nRight?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I said yes. I keep my word.]',
            nextScene : 'mei_end_ch4_the_favor_done',
            statEffect: { obedience: 10, affection: 7 },
          },
          {
            label     : '"Mei. That\'s not a small favor."',
            nextScene : 'mei_end_ch4_because_you_asked',
            statEffect: { fear: 9, dependency: 6 },
          },
        ],
      },

    ],
  },


  /* ── Ask Path: Act 1 ─────────────────────────────────── */

  mei_ch4_ask_1: {
    id   : 'mei_ch4_ask_1',
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
        text       : '(She tilts her head.)\n\nOh~\n\n"You want to hear it first."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'That\'s okay~\n\n(She falls back into step beside you.)\n\n"So. Sato-kun.\nYour Tuesday study partner.\nThe one who\'s always at lunch."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She describes him accurately.\n\nNot just his name.\nHis habits.\nWhere he sits.\nHow long he stays.',
      },
      {
        type: 'narration',
        text: 'She\'s been watching him.',
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
        text       : 'I need him to not be there anymore~\n\n(She says it gently.)\n\n"I\'ve been very patient about asking.\nThree weeks.\nMr. Buttons says that\'s good."',
      },

      { type: 'goto-scene', scene: 'mei_ch4_ask_2' },

    ],
  },


  /* ── Ask Path: Act 2 ─────────────────────────────────── */

  mei_ch4_ask_2: {
    id   : 'mei_ch4_ask_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"Not be there anymore."\n\nYou ask what that means.',
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
        text       : 'Not be near you~\n\n(Simply.)\n\n"Stop studying together.\nStop the lunches.\nStop the notes.\n\nJust — stop."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'You don\'t have to be mean about it.\n\n(She tilts her head.)\n\n"Just stop going.\nHe\'ll figure it out.\nThey always do."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Why him specifically?"',
            nextScene : 'mei_end_ch4_small_request',
            statEffect: { fear: 9, defiance: 4 },
          },
          {
            label     : '[Something in "they always do" stops me cold.]',
            nextScene : 'mei_end_ch4_already_handled',
            statEffect: { fear: 10, dependency: 5 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 30: The Favor Done ───────────────────────── */

  mei_end_ch4_the_favor_done: {
    id   : 'mei_end_ch4_the_favor_done',
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
        text       : '(She beams.)\n\nThank you~! ♪\n\n"I knew you would.\nYou always do what I need."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'It really is a small thing~\n\n(She takes your arm.\nKeeps walking.)\n\n"He\'ll find other people to study with.\nAnd you\'ll be better without the distraction."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She walks beside you.\n\nLight.\nHappy.\nContent.',
      },
      {
        type: 'narration',
        text: 'You said yes before you knew what you were agreeing to.\n\nYou\'re going to keep your word.\n\nShe knew you would.',
      },

      {
        type        : 'end',
        endingName  : 'The Favor Done',
        endingIndex : 30,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 31: Because You Asked ────────────────────── */

  mei_end_ch4_because_you_asked: {
    id   : 'mei_end_ch4_because_you_asked',
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
        text       : '(She tilts her head.)\n\nIs it~?\n\n"You just have to stop going to lunch.\nThat\'s — that\'s really small."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'And you already said yes~\n\n(She takes your arm.\nKeeps walking.)\n\n"So it doesn\'t matter if it\'s small or big.\nYou said yes.\nThat\'s all."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"You said yes.\nThat\'s all."',
      },
      {
        type: 'narration',
        text: 'She holds your arm lightly.\nHer grip is very gentle.\n\nShe doesn\'t let go.',
      },

      {
        type        : 'end',
        endingName  : 'Because You Asked',
        endingIndex : 31,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 32: Small Request ────────────────────────── */

  mei_end_ch4_small_request: {
    id   : 'mei_end_ch4_small_request',
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
        text       : 'Because he\'s there too much~\n\n(She says it simply.)\n\n"Every Tuesday. Both lunches last week. He texts you in the evenings.\nI know because I can see your phone light up from across the courtyard."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'That\'s too much for someone who\'s not me~\n\n(She tilts her head.)\n\n"So I\'d like you to stop.\nPlease.\n\nI\'ve been very patient."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She can see your phone light up\nfrom across the courtyard.\n\nShe\'s been watching.\nShe\'s been counting.',
      },
      {
        type: 'narration',
        text: 'Three weeks of patience.\n\nThree weeks of counting.',
      },

      {
        type        : 'end',
        endingName  : 'Small Request',
        endingIndex : 32,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 33: Already Handled ──────────────────────── */

  mei_end_ch4_already_handled: {
    id   : 'mei_end_ch4_already_handled',
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
        text       : '(She notices you stopping.)\n\nOh~\n\n"That part.\nYeah."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'Actually — I should tell you.\n\n(She says it like a small correction.)\n\n"I already handled it.\nEarlier this week.\nI was going to ask you first but — it felt urgent."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"Already handled."',
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
        text       : 'So the favor is already done~!\n\n(She takes your hand.\nKeeps walking.)\n\n"I was just going to tell you after.\nI thought you\'d want to know."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You think about the last time you saw him.\nThree days ago.\nHe seemed fine.\n\nYou haven\'t heard from him since.',
      },
      {
        type: 'narration',
        text: 'You don\'t ask what "handled" means.\n\nYou already know you won\'t like the answer.',
      },

      {
        type        : 'end',
        endingName  : 'Already Handled',
        endingIndex : 33,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     HIMARI CHAPTER 5 — "Forever"
     Graduation day. The life she arranged is now real.
     She's standing in it. She's been standing in it for years,
     in every version of the future she ran.

     SURRENDER PATH:
       himari_ch5_start → himari_ch5_surrender_1 → himari_ch5_surrender_2
         → himari_end_ch5_forever_begins  [40 — Normal]
         → himari_end_ch5_gilded_eternity [41 — Rare]

     RESISTANCE PATH:
       himari_ch5_start → himari_ch5_resist_1 → himari_ch5_resist_2
         → himari_end_ch5_the_answer       [42 — Rare]
         → himari_end_ch5_the_cage_complete [43 — True]
     ══════════════════════════════════════════════════════════ */

  himari_ch5_start: {
    id   : 'himari_ch5_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/apartment.jpg' },

      {
        type: 'narration',
        text: 'Graduation.\n\nThe ceremony was this morning.\nThe speeches. The photographs.\nThe slow dispersal of four years.',
      },
      {
        type: 'narration',
        text: 'And then this.\n\nThe apartment.\nThe one she arranged.\nThe key you\'ve been carrying for months.\n\nYou come home and she\'s already here.',
      },
      {
        type: 'narration',
        text: 'The flowers are fresh.\nThe table is set for two.\nThe light through the window is exactly the light she selected the apartment for.',
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
        text       : 'You\'re home.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : '(She says it simply.\nLike it\'s always been true.)\n\n"I\'ve been thinking about today for a long time.\nSince before I sent the first letter.\nSince before the clock tower."\n\n(She looks at you.)\n\n"Since I decided."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I set my things down. I stay.]',
            nextScene : 'himari_ch5_surrender_1',
            statEffect: { affection: 8, obedience: 9 },
          },
          {
            label     : '"Himari. I need to tell you something."',
            nextScene : 'himari_ch5_resist_1',
            statEffect: { fear: 8, defiance: 7 },
          },
        ],
      },

    ],
  },


  /* ── Surrender Path: Act 1 ───────────────────────────── */

  himari_ch5_surrender_1: {
    id   : 'himari_ch5_surrender_1',
    steps: [

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '(Something in her expression opens — just slightly.\nSomething she\'s been holding for a very long time.)\n\nGood.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'Sit.\n\nI\'ll pour the tea.\n\n(She moves to the kitchen — her kitchen now, the way she moves through it.)\n\n"Tell me about the ceremony.\nI want to hear your version."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You talk.\n\nShe listens the way she always listens — completely.\nEvery detail.\nHer eyes on you even when she\'s doing something else.',
      },
      {
        type: 'narration',
        text: 'The afternoon passes.\n\nThe light shifts.\nShe refills the tea without being asked.\nShe knows when you\'re cold before you do.',
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
        text       : 'Tomorrow your position starts.\n\n(She says it without looking up from her cup.)\n\n"I\'ve arranged for us to commute together.\nThe timing works out.\nI checked it four months ago."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'I\'ve been arranging tomorrow\nfor quite some time.',
      },

      { type: 'goto-scene', scene: 'himari_ch5_surrender_2' },

    ],
  },


  /* ── Surrender Path: Act 2 ───────────────────────────── */

  himari_ch5_surrender_2: {
    id   : 'himari_ch5_surrender_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Evening.\n\nThe apartment is warm.\nThe window is dark.',
      },
      {
        type: 'narration',
        text: 'She\'s been here this whole time.\nIn every room.\nLearning it.\nMaking it hers.\n\nYours.\n\nBoth.',
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
        text       : 'There\'s something I want to show you.\n\n(She stands.\nHolds out her hand.)\n\n"One last room."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I take her hand.]',
            nextScene : 'himari_end_ch5_forever_begins',
            statEffect: { affection: 12, obedience: 10 },
          },
          {
            label     : '[I follow without taking her hand.]',
            nextScene : 'himari_end_ch5_gilded_eternity',
            statEffect: { fear: 8, affection: 8 },
          },
        ],
      },

    ],
  },


  /* ── Resistance Path: Act 1 ──────────────────────────── */

  himari_ch5_resist_1: {
    id   : 'himari_ch5_resist_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She waits.\n\nThe tea steeps.\nThe apartment holds its breath.',
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
        text       : 'Tell me.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You say it.\n\nYou\'ve been building toward it for months.\nMaybe years.\nThe sentence that begins: I can\'t do this.',
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
        text       : '(She sets down her cup.)\n\nI see.',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : '(A pause.\nShe looks at the window.)\n\n"Where would you go?"',
      },

      { type: 'goto-scene', scene: 'himari_ch5_resist_2' },

    ],
  },


  /* ── Resistance Path: Act 2 ──────────────────────────── */

  himari_ch5_resist_2: {
    id   : 'himari_ch5_resist_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You answer.\n\nSomewhere specific.\nA city. A name. A plan you\'d been building quietly\nin the back of your head.',
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
        text       : '(She nods slowly.)\n\nMm.\n\n"I know that address.\nI\'ve known it since you looked it up in February.\nI\'ve had it watched since March."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'The person you were planning to stay with —\nI know them too.\n\n(Quietly.)\n\n"I\'ve already spoken to them.\nAbout a number of things."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'I\'m not angry.\n\n(She picks her cup back up.)\n\n"Plans are good.\nI make plans too.\n\nI\'ve been making yours\nfor much longer than you have."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"You had my plans watched."',
            nextScene : 'himari_end_ch5_the_answer',
            statEffect: { fear: 10, defiance: 5 },
          },
          {
            label     : '[The sentence I was building falls apart.]',
            nextScene : 'himari_end_ch5_the_cage_complete',
            statEffect: { fear: 9, obedience: 8 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 40: Forever Begins ───────────────────────── */

  himari_end_ch5_forever_begins: {
    id   : 'himari_end_ch5_forever_begins',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The room at the end of the hall.',
      },
      {
        type: 'narration',
        text: 'You\'ve seen the rest of the apartment.\n\nYou haven\'t seen this one.\n\nShe opens the door.',
      },
      {
        type: 'narration',
        text: 'A study.\n\nYour books — the ones from your old room, packed and moved without you noticing.\nThe fountain pen from the first day, on the desk.\nYour handwriting on the calendar on the wall.\nExcept you didn\'t write it.\n\nShe copied it.\nFrom memory.',
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
        text       : 'I\'ve been building this room for you\nsince the spring of second year.\n\n(She stands in the doorway.)\n\n"Every time I learned something new about you —\nI added it."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'default',
        text       : 'It took a long time to get right.\n\n(She looks at you with something close to peace.)\n\n"But I had time.\nI always knew we\'d get here."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The room is perfect.\n\nThat\'s the part that undoes you.\n\nNot that she built it.\nThat she got it right.\n\nEvery detail.\nBetter than you would have done yourself.',
      },

      {
        type        : 'end',
        endingName  : 'Forever Begins',
        endingIndex : 40,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 41: Gilded Eternity ──────────────────────── */

  himari_end_ch5_gilded_eternity: {
    id   : 'himari_end_ch5_gilded_eternity',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The study.\n\nYour things.\nYour handwriting on the calendar, copied in hers.\nThe pen from the first day.',
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
        text       : 'You didn\'t take my hand.\n\n(She notices. She always notices.)\n\n"That\'s all right."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'You\'re still here.\n\n(She crosses the room.\nOpens the window.\nThe evening air comes in.)\n\n"You came home.\nYou\'ve been coming home for months.\n\nThe hand doesn\'t change anything important."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She\'s right.',
      },
      {
        type: 'narration',
        text: 'The hand doesn\'t change anything.\n\nThe room is built.\nThe life is built.\n\nYou are standing in the middle of it\nand it fits you\nperfectly.',
      },

      {
        type        : 'end',
        endingName  : 'Gilded Eternity',
        endingIndex : 41,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 42: The Answer ───────────────────────────── */

  himari_end_ch5_the_answer: {
    id   : 'himari_end_ch5_the_answer',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She watches you arrive at the understanding.',
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
        text       : 'Yes.\n\n(She says it gently.)\n\n"Every exit you\'ve considered.\nI\'ve known about it before you finished thinking it."',
      },
      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'smile',
        text       : 'This isn\'t cruelty.\n\n(She pours the tea anyway.)\n\n"I just love you more carefully than most people do.\nI wanted to make sure there was nowhere for this to go\nexcept forward."',
      },

      { type: 'horror', effect: 'static_brief' },

      {
        type       : 'dialogue',
        character  : 'himari',
        expression : 'yandere',
        text       : 'Forward means here.\n\n(She slides the cup to you.)\n\n"With me.\nIn this room.\nFor as long as I can possibly arrange it."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She has built every exit shut.\n\nNot with locks.\nWith foresight.\nWith time.\nWith the quiet certainty of someone who decided\nbefore you had a chance to.',
      },

      {
        type        : 'end',
        endingName  : 'The Answer',
        endingIndex : 42,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 43: The Cage Complete (True Ending) ──────── */

  himari_end_ch5_the_cage_complete: {
    id   : 'himari_end_ch5_the_cage_complete',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The sentence you were building falls apart.',
      },
      {
        type: 'narration',
        text: 'Not because she stopped you.\n\nBecause you got to the end of it\nand found there was nothing on the other side.',
      },
      {
        type: 'narration',
        text: 'The city you named.\nThe person you were going to stay with.\n\nShe\'s already been there.\nAlready spoken to them.\nAlready — quietly, without violence — closed that door.',
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
        text       : 'You understand now.\n\n(She watches your face.\nReads it the way she\'s always read it.)\n\n"Not all at once.\nBut you\'re getting there."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She didn\'t break you.\n\nShe didn\'t need to.\n\nShe just — arranged things.\nFor long enough.\nCarefully enough.\n\nUntil leaving became the harder choice.\nUntil staying became what simply happens.',
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
        text       : 'I told you.\n\n(She stands.\nHolds out her hand.)\n\n"From the very beginning.\nI told you.\n\nYou\'re not leaving.\n\nAnd now — finally —\nyou believe me."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You take her hand.',
      },
      {
        type: 'narration',
        text: 'Not because you\'re afraid.\n\nBecause somewhere between the clock tower and today,\nyou stopped wanting to let go.\n\nShe knew that would happen.\n\nShe was always going to wait.',
      },

      {
        type        : 'end',
        endingName  : 'The Cage Complete',
        endingIndex : 43,
        rarity      : 'true',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     SHIZUKU CHAPTER 5 — "Always Here"
     The library is closing for good. Last day for graduates.
     She's been here since morning.
     After today there's no structure. No campus. Just her need.

     STAY PATH:
       shizuku_ch5_start → shizuku_ch5_stay_1 → shizuku_ch5_stay_2
         → shizuku_end_ch5_the_last_page [40 — Normal]
         → shizuku_end_ch5_anchor        [41 — Rare]

     AFTER PATH:
       shizuku_ch5_start → shizuku_ch5_after_1 → shizuku_ch5_after_2
         → shizuku_end_ch5_open_water [42 — Rare]
         → shizuku_end_ch5_she_waits  [43 — Normal]
     ══════════════════════════════════════════════════════════ */

  shizuku_ch5_start: {
    id   : 'shizuku_ch5_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/library.jpg' },

      {
        type: 'narration',
        text: 'They announced it in October.\nThe campus library would close to alumni after graduation.\n\nShe\'s been coming every day since.',
      },
      {
        type: 'narration',
        text: 'Today is the last day.\n\nThe shelves are already half-empty.\nBoxes. Labels. The small archaeology of a library being undone.',
      },
      {
        type: 'narration',
        text: 'She\'s in the back corner.\nThe same chair.\nThe bookmark still on page one.',
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
        text       : 'You found me.\n\n(She looks up.\nSomething tired in her eyes.\nSomething relieved.)\n\n"I wasn\'t sure you\'d come."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'They close at six.\n\n(She looks at the window.\nThe afternoon light.)\n\n"I\'ve been here since seven.\nI didn\'t want to miss any of it."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"I\'ll stay until they close."',
            nextScene : 'shizuku_ch5_stay_1',
            statEffect: { affection: 8, dependency: 8 },
          },
          {
            label     : '"Shizuku… what happens after today?"',
            nextScene : 'shizuku_ch5_after_1',
            statEffect: { fear: 6, dependency: 7 },
          },
        ],
      },

    ],
  },


  /* ── Stay Path: Act 1 ────────────────────────────────── */

  shizuku_ch5_stay_1: {
    id   : 'shizuku_ch5_stay_1',
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
        text       : '(She breathes out slowly.)\n\n…Okay.\n\n(She moves her bag from the chair beside her.)\n\n"Sit."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She reads to you.\n\nNot from the book she\'s been not-reading.\nFrom memory.\nPoems she learned by heart because she had no one to read them to.',
      },
      {
        type: 'narration',
        text: 'Her voice barely above a whisper.\nNot performing.\nJust — giving it somewhere to go.',
      },
      {
        type: 'narration',
        text: 'Around four o\'clock a librarian comes by.\nShe looks at Shizuku.\nLooks at you.\nMoves on without saying anything.',
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
        text       : 'She\'s been very kind.\n\n(Shizuku watches the librarian go.)\n\n"She stopped asking why I was here in October.\nI think she understood."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : 'I don\'t know what I\'ll do without a place to be.\n\n(Quietly.)\n\n"I\'ve always had somewhere to go.\nNow I\'ll just have — wherever you are."',
      },

      { type: 'goto-scene', scene: 'shizuku_ch5_stay_2' },

    ],
  },


  /* ── Stay Path: Act 2 ────────────────────────────────── */

  shizuku_ch5_stay_2: {
    id   : 'shizuku_ch5_stay_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Six o\'clock.\n\nThe lights change.\nA soft chime.\n\nLast call.',
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
        text       : '(She doesn\'t move.)\n\nI have one more thing.\n\n(She reaches into her bag.\nProduces an envelope.)\n\n"Number thirty-eight.\nI wrote it last night."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'default',
        text       : 'I think — I think this is the one I give you.\n\n(She holds it out.\nHer hand is very steady.)\n\n"I\'ve been deciding for three years.\nI think today is right."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I take it. I don\'t open it yet.]',
            nextScene : 'shizuku_end_ch5_the_last_page',
            statEffect: { affection: 10, dependency: 10 },
          },
          {
            label     : '[I take it. I open it now.]',
            nextScene : 'shizuku_end_ch5_anchor',
            statEffect: { fear: 9, dependency: 10 },
          },
        ],
      },

    ],
  },


  /* ── After Path: Act 1 ───────────────────────────────── */

  shizuku_ch5_after_1: {
    id   : 'shizuku_ch5_after_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She is quiet for a long time.',
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
        text       : '…I haven\'t thought about it.',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'sad',
        text       : '(A pause.)\n\nI\'ve thought about nothing else.\n\n(She corrects herself quietly.)\n\n"Both things are true.\nI think about it every night.\nAnd I still don\'t have an answer."',
      },

      { type: 'goto-scene', scene: 'shizuku_ch5_after_2' },

    ],
  },


  /* ── After Path: Act 2 ───────────────────────────────── */

  shizuku_ch5_after_2: {
    id   : 'shizuku_ch5_after_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She looks at the half-empty shelves.\n\nThe boxes.\nThe labeled spines disappearing one by one.',
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
        text       : 'I\'ve run through every version of after.\n\n(She says it slowly.)\n\n"Different cities. Different arrangements.\nVersions where I try to be better.\nVersions where I stop trying."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : 'Every version ends the same way.\n\n(She looks at you.)\n\n"With you still there.\n\nI don\'t know if that\'s me hoping\nor me knowing.\n\nI\'ve stopped being able to tell the difference."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"What if I told you I wasn\'t going anywhere?"',
            nextScene : 'shizuku_end_ch5_open_water',
            statEffect: { affection: 8, dependency: 10 },
          },
          {
            label     : '[I sit beside her. I don\'t answer the question.]',
            nextScene : 'shizuku_end_ch5_she_waits',
            statEffect: { affection: 7, dependency: 9 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 40: The Last Page ────────────────────────── */

  shizuku_end_ch5_the_last_page: {
    id   : 'shizuku_end_ch5_the_last_page',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You hold it.\n\nShe watches you hold it.\n\nThe library chimes again.',
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
        text       : 'I suppose we have to leave now.\n\n(She doesn\'t move.)',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Neither of you moves.\n\nA librarian passes.\nLooks at you both.\nKeeps walking.',
      },
      {
        type: 'narration',
        text: 'Eventually the lights go off one section at a time.\n\nYou sit in the last lit corner\nwith an unread letter in your hands\nand a person who has been sitting in this chair\nwaiting for you\nsince the beginning of second year.',
      },

      {
        type        : 'end',
        endingName  : 'The Last Page',
        endingIndex : 40,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 41: Anchor ───────────────────────────────── */

  shizuku_end_ch5_anchor: {
    id   : 'shizuku_end_ch5_anchor',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You open it.',
      },
      {
        type: 'narration',
        text: 'It\'s short.\n\nShorter than you expected.\nAfter thirty-seven tries.',
      },
      {
        type: 'narration',
        text: 'It says:\n\n"You are the only reason I am still here.\nI don\'t know what to do with that\nexcept tell you.\nI\'ve been trying to tell you for three years.\n\nThis is me telling you.\n\nPlease don\'t go."',
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
        text       : '(She watches you read.)\n\nThe others were longer.\n\n(Softly.)\n\n"I kept adding things.\nTrying to explain it properly.\nIn the end I think it only needed the last line."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Please don\'t go.\n\nThree years.\nThirty-eight letters.\nEvery night call.\nEvery hallway floor.\n\nAll of it was this one sentence.',
      },

      {
        type        : 'end',
        endingName  : 'Anchor',
        endingIndex : 41,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 42: Open Water ───────────────────────────── */

  shizuku_end_ch5_open_water: {
    id   : 'shizuku_end_ch5_open_water',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She goes very still.',
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
        text       : '(She looks at you for a long moment.)\n\nIs that — is that true?\n\n(Not hopeful.\nCareful.\nLike she\'s been wrong about this before.)',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You tell her it is.',
      },

      {
        type       : 'expression',
        character  : 'shizuku',
        expression : 'yandere',
        position   : 'center',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'yandere',
        text       : '(Something shifts in her face.\nNot relief.\nSomething quieter and more total.)\n\nThen I have everything I need.\n\n"I want you to understand — I would have been all right either way.\nI have been all right before."\n\n(A pause.)\n\n"But this is better.\nThis is so much better."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You understand, looking at her,\nthat "all right" covered a great many things\nshe will never describe to you.',
      },
      {
        type: 'narration',
        text: 'The library closes around you.\n\nShe doesn\'t let go of your hand.',
      },

      {
        type        : 'end',
        endingName  : 'Open Water',
        endingIndex : 42,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 43: She Waits ────────────────────────────── */

  shizuku_end_ch5_she_waits: {
    id   : 'shizuku_end_ch5_she_waits',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You sit beside her.\n\nThe question hangs.\n\nYou don\'t answer it.',
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
        text       : '(Eventually.)\n\nI\'ll be wherever we decide.\n\n"Every morning.\nBefore you wake up, probably.\nI can\'t help it."',
      },
      {
        type       : 'dialogue',
        character  : 'shizuku',
        expression : 'smile',
        text       : '(She looks at the window.\nThe last of the light.)\n\n"I\'ve been here before you every day for four years.\n\nI don\'t know how to be anywhere else first."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The library goes quiet.\n\nThe boxes. The empty shelves.\nThe chair she\'s been in since seven o\'clock.',
      },
      {
        type: 'narration',
        text: 'She will find the next place.\n\nThe next chair.\nThe next window.\n\nShe will be there before you.\n\nEvery time.',
      },

      {
        type        : 'end',
        endingName  : 'She Waits',
        endingIndex : 43,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     REINA CHAPTER 5 — "The Final Model"
     One last meeting. She has a document. Not a report.
     A proposal. Written in her own hand.

     READ PATH:
       reina_ch5_start → reina_ch5_read_1 → reina_ch5_read_2
         → reina_end_ch5_optimal_outcome   [40 — Normal]
         → reina_end_ch5_final_projection  [41 — Rare]

     BEFORE PATH:
       reina_ch5_start → reina_ch5_before_1 → reina_ch5_before_2
         → reina_end_ch5_the_pause     [42 — Rare]
         → reina_end_ch5_data_complete [43 — Normal]
     ══════════════════════════════════════════════════════════ */

  reina_ch5_start: {
    id   : 'reina_ch5_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/student_council.jpg' },

      {
        type: 'narration',
        text: 'The last day.\n\nThe student council room is clean.\nEverything filed. Everything ordered.\nFour years of her work, archived and closed.',
      },
      {
        type: 'narration',
        text: 'She\'s at the desk.\n\nOne document in front of her.\nA single sheet.\nNo cover. No binding.\n\nShe wrote it by hand.',
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
        text       : 'Sit.\n\n(She slides the document across the desk.)\n\n"The model has reached its terminal state.\nI\'ve run all remaining projections.\n\nThere is one optimal outcome."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'This is a formal proposal.\n\n(She folds her hands.)\n\n"I\'ve prepared it carefully.\nIt represents the best available solution\nfor both parties."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I pick up the document. I read it.]',
            nextScene : 'reina_ch5_read_1',
            statEffect: { obedience: 7, affection: 6 },
          },
          {
            label     : '"Reina."',
            nextScene : 'reina_ch5_before_1',
            statEffect: { affection: 7, defiance: 3 },
          },
        ],
      },

    ],
  },


  /* ── Read Path: Act 1 ────────────────────────────────── */

  reina_ch5_read_1: {
    id   : 'reina_ch5_read_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The document is formatted correctly.\n\nOf course it is.',
      },
      {
        type: 'narration',
        text: 'A proposed continuation of the arrangement, post-graduation.\nTerms. Logistics. A schedule — revised, she notes, to account for new variables.\n\nShe\'s left space in the margins.\nAnnotations.\nReasons for each clause.',
      },
      {
        type: 'narration',
        text: 'One margin note reads:\n\n"Clause 4 — proximity schedule — subject consulted on preference for the first time.\nAdjusted accordingly."',
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
        text       : 'You\'re on clause four.\n\n(She says it without looking up.)\n\n"I asked you — indirectly — what you preferred.\nThree weeks ago.\nYou mentioned Thursday evenings.\nI\'ve incorporated that."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'cold',
        text       : 'It\'s the first time I\'ve asked.\n\n(A pause.)\n\n"I\'m aware of that."',
      },

      { type: 'goto-scene', scene: 'reina_ch5_read_2' },

    ],
  },


  /* ── Read Path: Act 2 ────────────────────────────────── */

  reina_ch5_read_2: {
    id   : 'reina_ch5_read_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The last page.\n\nThe formal language ends three-quarters of the way down.\n\nBelow it, in handwriting — not her usual clean print, something more careful, like she drafted it many times — one line.',
      },
      {
        type: 'narration',
        text: '"I don\'t want the model to end."',
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
        text       : '(She\'s watching you read the last line.)\n\nI considered removing it.\n\n(She says it directly.)\n\n"I decided not to.\nI thought full variable disclosure was appropriate\nfor a document of this nature."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"You finally asked what I wanted."',
            nextScene : 'reina_end_ch5_optimal_outcome',
            statEffect: { affection: 10, obedience: 8 },
          },
          {
            label     : '[I read the last line again.]',
            nextScene : 'reina_end_ch5_final_projection',
            statEffect: { affection: 9, dependency: 9 },
          },
        ],
      },

    ],
  },


  /* ── Before Path: Act 1 ──────────────────────────────── */

  reina_ch5_before_1: {
    id   : 'reina_ch5_before_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She goes still.\n\nJust your name.\nNothing after it.\n\nAnd she goes still.',
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
        text       : '…',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : '(Four seconds.)\n\nI\'ve been preparing for every response.\n\n(She says it quietly.)\n\n"Every question you might ask.\nEvery objection.\nEvery way this conversation could go."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I did not prepare for that.\n\n(She looks at you.)\n\n"Just my name."',
      },

      { type: 'goto-scene', scene: 'reina_ch5_before_2' },

    ],
  },


  /* ── Before Path: Act 2 ──────────────────────────────── */

  reina_ch5_before_2: {
    id   : 'reina_ch5_before_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The room is very quiet.\n\nFour years of her work, filed and finished.\n\nJust you.\nJust her.\nJust her name still hanging in the air.',
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
        text       : 'The document is still there.\n\n(She gestures at it.\nSomething in her voice is different.\nStill precise.\nBut underneath the precision — something exposed.)\n\n"You don\'t have to read it right now."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I ran seventeen scenarios in which you leave.\n\n(She says it for the last time.)\n\n"I ran them again this morning.\n\nAnd then I put the notebook away\nand wrote this instead."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Say it again — just your name?"',
            nextScene : 'reina_end_ch5_the_pause',
            statEffect: { affection: 10, dependency: 8 },
          },
          {
            label     : '[I pick up the document.]',
            nextScene : 'reina_end_ch5_data_complete',
            statEffect: { affection: 8, obedience: 7 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 40: Optimal Outcome ──────────────────────── */

  reina_end_ch5_optimal_outcome: {
    id   : 'reina_end_ch5_optimal_outcome',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She is quiet for a moment.',
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
        text       : 'Yes.\n\n(She says it without her usual armor.)\n\n"I have been optimizing for the arrangement\nwithout — adequately — accounting for the subject\'s preferences.\n\nThe model had a flaw.\nI corrected it."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'Thursday evenings.\n\n(She points to clause four.)\n\n"That\'s yours.\nThe rest is mine.\nI thought — splitting it that way — seemed equitable."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Equitable.\n\nYou have one clause in a twelve-page proposal.\n\nShe is smiling.\nJust barely.\nBut she is.',
      },
      {
        type: 'narration',
        text: 'It is, for Reina Kuzuba,\nthe most open thing she has ever offered you.',
      },

      {
        type        : 'end',
        endingName  : 'Optimal Outcome',
        endingIndex : 40,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 41: Final Projection ─────────────────────── */

  reina_end_ch5_final_projection: {
    id   : 'reina_end_ch5_final_projection',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"I don\'t want the model to end."',
      },
      {
        type: 'narration',
        text: 'Not: I have calculated that the model should continue.\nNot: the optimal outcome requires continuation.\n\nWant.',
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
        text       : 'I\'ve used that word — precisely — once before.\n\n(She says it carefully.)\n\n"In four years.\nOnce.\n\nI wasn\'t sure I was using it correctly.\nI checked the definition four times."',
      },
      {
        type       : 'dialogue',
        character  : 'reina',
        expression : 'default',
        text       : 'I\'m using it correctly.\n\n(She looks at the document.\nThen at you.)\n\n"That\'s all."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'That\'s all.\n\nFour years of projections.\nEvery scenario.\nAll seventeen exits she made unacceptable.\n\nAnd underneath all of it:\nI don\'t want this to end.',
      },

      {
        type        : 'end',
        endingName  : 'Final Projection',
        endingIndex : 41,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 42: The Pause ────────────────────────────── */

  reina_end_ch5_the_pause: {
    id   : 'reina_end_ch5_the_pause',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She is still for a long moment.',
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
        text       : '…Say it again.',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You say her name again.\n\nJust her name.',
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
        text       : '(She opens the notebook.)\n\nI\'m logging this.\n\n(She writes something.\nThen stops.\nLooks at what she wrote.)\n\n"I don\'t — actually —\n\n(A pause.)\n\n"I don\'t want to log this one."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She closes the notebook.\n\nSets it aside.\n\nFor four years she has documented everything.\nEvery variable.\nEvery deviation.\nEvery exit.\n\nShe closes the notebook and sets it aside.',
      },

      {
        type        : 'end',
        endingName  : 'The Pause',
        endingIndex : 42,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 43: Data Complete ────────────────────────── */

  reina_end_ch5_data_complete: {
    id   : 'reina_end_ch5_data_complete',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You pick it up.\n\nShe watches you read it.\n\nShe has been watching you read things\nfor four years.',
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
        text       : 'The last line is mine.\n\n(She says it before you reach it.)\n\n"Not the model\'s.\nNot the arrangement\'s.\n\nMine."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You reach the last line.\n\n"I don\'t want the model to end."\n\nHer handwriting.\nCareful.\nLike she wrote it many times before she got it right.',
      },
      {
        type: 'narration',
        text: 'The data set is complete.\n\nFour years.\nEvery month.\nEvery correction.\n\nAnd at the end of all of it:\none sentence she couldn\'t fit into any category.',
      },

      {
        type        : 'end',
        endingName  : 'Data Complete',
        endingIndex : 43,
        rarity      : 'normal',
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════
     MEI CHAPTER 5 — "The Bell"
     Graduation day. You hear it before you see her.
     The same bell from Chapter 1.
     Now you understand what it was.

     LISTEN PATH:
       mei_ch5_start → mei_ch5_listen_1 → mei_ch5_listen_2
         → mei_end_ch5_the_smile_stays [40 — Normal]
         → mei_end_ch5_underneath      [41 — Rare]

     BELL PATH:
       mei_ch5_start → mei_ch5_bell_1 → mei_ch5_bell_2
         → mei_end_ch5_the_bell_answer [42 — Rare]
         → mei_end_ch5_complete        [43 — True]
     ══════════════════════════════════════════════════════════ */

  mei_ch5_start: {
    id   : 'mei_ch5_start',
    steps: [

      { type: 'bg', bg: 'assets/bg/academy_gates.jpg' },

      {
        type: 'narration',
        text: 'Graduation.\n\nThe crowd. The robes. The slow dispersal of four years into an afternoon.',
      },
      {
        type: 'narration',
        text: 'You hear it before you see her.\n\nA small sound.\nHigh and faint.\n\nA bell.',
      },
      {
        type: 'narration',
        text: 'Now you understand what it was.\n\nNow you understand it has been there since the very first day.',
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
        text       : '{name}~! ♪\n\n(She finds you in the crowd the way she always finds you.)\n\n"I\'ve been looking everywhere.\nWell — not everywhere."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(She tilts her head.)\n\n"I knew where you\'d be."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'I want to tell you something.\n\n(She says it simply.\nWithout the usual brightness on it.)\n\n"Something real.\nIs that okay?"',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Tell me."',
            nextScene : 'mei_ch5_listen_1',
            statEffect: { affection: 7, dependency: 7 },
          },
          {
            label     : '"The bell. You\'ve had it on my bag this whole time."',
            nextScene : 'mei_ch5_bell_1',
            statEffect: { fear: 7, defiance: 5 },
          },
        ],
      },

    ],
  },


  /* ── Listen Path: Act 1 ──────────────────────────────── */

  mei_ch5_listen_1: {
    id   : 'mei_ch5_listen_1',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She\'s quiet for a moment.\n\nWhich is unusual.',
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
        text       : 'I\'m very scared all the time.\n\n(She says it without decoration.)\n\n"I just — I don\'t look like it.\nI\'ve gotten good at not looking like it."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'Mr. Buttons helps.\n\n(She looks at the bear in her arms.)\n\n"And the game.\nAnd the notebook.\nAnd watching.\n\nAll of it is — it\'s not because I\'m bad.\nIt\'s because if I stop —"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She stops.',
      },
      {
        type: 'narration',
        text: 'She doesn\'t finish the sentence.\n\nShe doesn\'t need to.',
      },

      { type: 'goto-scene', scene: 'mei_ch5_listen_2' },

    ],
  },


  /* ── Listen Path: Act 2 ──────────────────────────────── */

  mei_ch5_listen_2: {
    id   : 'mei_ch5_listen_2',
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
        text       : 'I\'ve never left someone I loved.\n\n(She says it carefully.)\n\n"I don\'t know how to do it.\nI don\'t know if I could.\n\nI think if I tried —"\n\n(She looks at Mr. Buttons.)\n\n"The number would go up again."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The number.\n\nThe red pages.',
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
        text       : 'You\'re not going anywhere.\n\n(The smile comes back — the full brightness.)\n\n"I made sure.\nBut even if I hadn\'t —"\n\n(She tilts her head.)\n\n"I think you would have stayed anyway.\nYou always do."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '[I look at her smile. I can\'t tell which part is real.]',
            nextScene : 'mei_end_ch5_the_smile_stays',
            statEffect: { fear: 8, affection: 8 },
          },
          {
            label     : '"Thank you for telling me."',
            nextScene : 'mei_end_ch5_underneath',
            statEffect: { affection: 10, dependency: 9 },
          },
        ],
      },

    ],
  },


  /* ── Bell Path: Act 1 ────────────────────────────────── */

  mei_ch5_bell_1: {
    id   : 'mei_ch5_bell_1',
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
        text       : '(She tilts her head.)\n\nMm~\n\n"You figured it out."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : 'I put it there on the fourth day~\n\n(Simply.)\n\n"After the second day I thought — I need a way to know where you are.\nWhen I can\'t see you.\n\nThe bell was the nicest option."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: '"The nicest option."\n\nYou focus on that.\nYou don\'t ask about the others.',
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
        text       : 'I can hear it from about twelve meters~\n\n(She holds up her fingers.)\n\n"More in quiet spaces.\nI know your walk by the rhythm now.\nI could hear you coming even without it."',
      },

      { type: 'goto-scene', scene: 'mei_ch5_bell_2' },

    ],
  },


  /* ── Bell Path: Act 2 ────────────────────────────────── */

  mei_ch5_bell_2: {
    id   : 'mei_ch5_bell_2',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You ask what she would have done.\n\nIf you had taken it out.',
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
        text       : '(She considers this seriously.)\n\nWell~\n\nFirst I would have put a new one somewhere else.\n\n(She lists it the way you\'d list groceries.)\n\n"Probably your jacket lining.\nOr your bag strap — inside the seam.\nSomewhere you wouldn\'t look."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : 'And if you found all of those —\n\n(She tilts her head.)\n\n"I\'d find another way.\nI always find another way.\nI said that on the first day."',
      },

      {
        type   : 'choice',
        choices: [
          {
            label     : '"Show me the bell."',
            nextScene : 'mei_end_ch5_the_bell_answer',
            statEffect: { fear: 9, dependency: 7 },
          },
          {
            label     : '[I reach into my bag. I find it. I hold it out to her.]',
            nextScene : 'mei_end_ch5_complete',
            statEffect: { fear: 10, obedience: 9 },
          },
        ],
      },

    ],
  },


  /* ── ENDING 40: The Smile Stays ──────────────────────── */

  mei_end_ch5_the_smile_stays: {
    id   : 'mei_end_ch5_the_smile_stays',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The smile stays.',
      },
      {
        type: 'narration',
        text: 'Full brightness.\nPerfect.\n\nYou look at it and you think:\nis this the real one?\nIs this the one that\'s just for you?\n\nOr is this the one she shows everyone\nwhile the real thing moves underneath like deep water?',
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
        text       : '(She takes your arm.\nThe crowd moves around you both.)\n\nNe~\n\n"It doesn\'t matter which one it is.\nDoes it?"\n\n(She tilts her head.)\n\n"You\'re going to stay either way."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She\'s right.\n\nIt doesn\'t matter.\n\nThe smile stays.\nSo do you.',
      },

      {
        type        : 'end',
        endingName  : 'The Smile Stays',
        endingIndex : 40,
        rarity      : 'normal',
      },
    ],
  },


  /* ── ENDING 41: Underneath ───────────────────────────── */

  mei_end_ch5_underneath: {
    id   : 'mei_end_ch5_underneath',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'She goes still.\n\nFor a moment — just a moment — the smile is gone.\n\nNot replaced by anything frightening.\nJust her face.\nWith nothing performing.',
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
        text       : '(Quietly.)\n\nNo one\'s — said that to me before.\n\n"In that way."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You see it.\n\nFor one second.\nWhat\'s underneath the game and the notebook and the smile.\n\nSomething small.\nSomething frightened.\nSomething that has been doing all of this\nbecause it didn\'t know another way to hold on.',
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
        text       : '(The smile comes back.\nFull brightness.\nAlways full brightness.)\n\nOkay~\n\n"Let\'s go."',
      },

      {
        type        : 'end',
        endingName  : 'Underneath',
        endingIndex : 41,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 42: The Bell Answer ──────────────────────── */

  mei_end_ch5_the_bell_answer: {
    id   : 'mei_end_ch5_the_bell_answer',
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
        text       : '(She reaches into her pocket.)\n\nOh~\n\n"I have it here actually.\nI took it off your bag this morning.\nTo clean it."',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'Small.\nSilver.\nA thread she can follow across any distance.',
      },
      {
        type: 'narration',
        text: 'She holds it up between her fingers.\n\nIt rings — very softly — when she moves her hand.',
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
        text       : 'Do you want it?\n\n(She holds it out.)\n\n"You can have it.\nYou can throw it away.\n\nIt\'s yours."',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'smile',
        text       : '(The smile.)\n\n"I\'d just find another way~ ♪"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'The same words.\n\nFrom the first day.\nThe last day.\n\nSame sentence.\nSame certainty.',
      },

      {
        type        : 'end',
        endingName  : 'The Bell Answer',
        endingIndex : 42,
        rarity      : 'rare',
      },
    ],
  },


  /* ── ENDING 43: Complete (True Ending) ───────────────── */

  mei_end_ch5_complete: {
    id   : 'mei_end_ch5_complete',
    steps: [

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You reach into your bag.\n\nYou find it where it always is.\nSmall. Silver. Worn from four years of carrying.',
      },
      {
        type: 'narration',
        text: 'You hold it out to her.',
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
        text       : '(The smile stops.)\n\n…',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '(One second.\nThe face with nothing on it.)\n\nYou found it.',
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
        text       : '(She takes it from your hand.\nHolds it.)\n\nYou found it and you\'re giving it back.',
      },
      {
        type       : 'dialogue',
        character  : 'mei',
        expression : 'default',
        text       : '(She looks at it.\nThen at you.\nSomething in her is — trying to understand this.)\n\n"Why?"',
      },

      { type: 'clear-characters' },

      {
        type: 'narration',
        text: 'You don\'t have a clean answer.\n\nMaybe because taking it out didn\'t seem like the point.\nMaybe because you\'ve understood for a while now\nthat the bell was never really the thing keeping you here.',
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
        text       : '(The smile comes back.\nBut slower this time.\nLike it means something different.)\n\nOh.\n\n"Oh, {name}~"\n\n(She closes her fingers around the bell.)\n\n"That\'s the most — that\'s the most—"',
      },

      { type: 'clear-characters' },

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
        type        : 'end',
        endingName  : 'Complete',
        endingIndex : 43,
        rarity      : 'true',
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
