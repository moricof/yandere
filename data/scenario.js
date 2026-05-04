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
