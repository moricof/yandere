'use strict';

/* ═══════════════════════════════════════════════════════════════════════════
   engine/diagnosis.js — Obsession Diagnosis System
   Evaluates the player's hidden stats and returns an emotionally charged
   "title" with heroine-specific voice lines and a shareable canvas image.
   ═══════════════════════════════════════════════════════════════════════════ */

const DiagnosisSystem = (() => {

  /* ══════════════════════════════════════════════════════════════════
     TITLE DEFINITIONS — evaluated top-to-bottom; first match wins.
     Ordered ultra-rare → common so rarest titles take priority.
     ══════════════════════════════════════════════════════════════════ */

  const TITLES = [

    // ── Ultra Rare ────────────────────────────────────────────────────
    {
      id      : 'the_only_one',
      rarity  : 'ultra',
      title   : 'The Only One',
      subtext : 'Every thought, every breath — all of it is already hers.',
      flavor  : 'possessive',
      cond    : s => s.affection >= 80 && s.dependency >= 80 && s.fear >= 60 && s.obedience >= 70,
    },
    {
      id      : 'perfect_vessel',
      rarity  : 'ultra',
      title   : 'Perfect Vessel',
      subtext : 'Emptied of yourself, filled entirely with her will.',
      flavor  : 'cold',
      cond    : s => s.obedience >= 90 && s.dependency >= 80 && s.affection >= 65,
    },
    {
      id      : 'hopelessly_devoted',
      rarity  : 'ultra',
      title   : 'Hopelessly Devoted',
      subtext : 'You stopped resisting long ago. This cage has become home.',
      flavor  : 'tender',
      cond    : s => s.affection >= 85 && s.dependency >= 85 && s.fear < 45,
    },
    {
      id      : 'ruined_for_others',
      rarity  : 'ultra',
      title   : 'Ruined for Others',
      subtext : 'No one else will ever compare. She made certain of that.',
      flavor  : 'gleeful',
      cond    : s => s.affection >= 82 && s.obedience >= 75 && s.dependency >= 75,
    },

    // ── Rare ──────────────────────────────────────────────────────────
    {
      id      : 'irreplaceable',
      rarity  : 'rare',
      title   : 'Irreplaceable',
      subtext : 'She would unmake the world before she let you go.',
      flavor  : 'possessive',
      cond    : s => s.affection >= 70 && s.fear >= 65 && s.dependency >= 68,
    },
    {
      id      : 'beloved_hostage',
      rarity  : 'rare',
      title   : 'Beloved Hostage',
      subtext : 'Treasured. Trapped. Unable to tell the difference.',
      flavor  : 'manipulative',
      cond    : s => s.affection >= 65 && s.dependency >= 62 && s.fear >= 52,
    },
    {
      id      : 'shattered_mirror',
      rarity  : 'rare',
      title   : 'Shattered Mirror',
      subtext : 'You no longer recognize who you were before her.',
      flavor  : 'broken',
      cond    : s => s.fear >= 75 && s.dependency >= 68,
    },
    {
      id      : 'willing_prisoner',
      rarity  : 'rare',
      title   : 'Willing Prisoner',
      subtext : 'The door was always open. You chose to stay.',
      flavor  : 'tender',
      cond    : s => s.obedience >= 80 && s.affection >= 60 && s.fear < 38,
    },
    {
      id      : 'exquisite_ruin',
      rarity  : 'rare',
      title   : 'Exquisite Ruin',
      subtext : 'Something beautiful that broke in exactly the right places.',
      flavor  : 'cold',
      cond    : s => s.fear >= 70 && s.affection >= 55 && s.obedience >= 60,
    },
    {
      id      : 'sweetest_obsession',
      rarity  : 'rare',
      title   : 'Her Sweetest Obsession',
      subtext : 'You exist in her mind every waking moment. She made sure.',
      flavor  : 'gleeful',
      cond    : s => s.affection >= 72 && s.dependency >= 70 && s.fear < 50,
    },

    // ── Uncommon ──────────────────────────────────────────────────────
    {
      id      : 'caged_bird',
      rarity  : 'uncommon',
      title   : 'Caged Bird',
      subtext : 'Beautiful. Contained. Entirely hers.',
      flavor  : 'possessive',
      cond    : s => s.affection >= 55 && s.fear >= 48 && s.obedience >= 48,
    },
    {
      id      : 'lost_soul',
      rarity  : 'uncommon',
      title   : 'Lost Soul',
      subtext : 'Without her, you simply do not know how to exist.',
      flavor  : 'broken',
      cond    : s => s.dependency >= 65 && s.fear >= 52 && s.affection < 50,
    },
    {
      id      : 'tamed_rebel',
      rarity  : 'uncommon',
      title   : 'Tamed Rebel',
      subtext : 'The fight left you. It was replaced by something softer.',
      flavor  : 'manipulative',
      cond    : s => s.obedience >= 58 && s.fear >= 38 && s.affection >= 42,
    },
    {
      id      : 'broken_toy',
      rarity  : 'uncommon',
      title   : 'Broken Toy',
      subtext : 'Still useful. Still kept. Just no longer intact.',
      flavor  : 'cold',
      cond    : s => s.fear >= 65 && s.obedience < 38 && s.affection < 42,
    },
    {
      id      : 'emotional_anchor',
      rarity  : 'uncommon',
      title   : 'Emotional Anchor',
      subtext : 'She falls apart without you. She resents that deeply.',
      flavor  : 'broken',
      cond    : s => s.dependency >= 60 && s.affection >= 52 && s.fear < 48,
    },
    {
      id      : 'glass_heart',
      rarity  : 'uncommon',
      title   : 'Glass Heart',
      subtext : 'Fragile and precious. She handles you like something that might shatter.',
      flavor  : 'tender',
      cond    : s => s.affection >= 50 && s.fear >= 45 && s.dependency >= 50 && s.obedience < 45,
    },

    // ── Common ────────────────────────────────────────────────────────
    {
      id      : 'devoted_pet',
      rarity  : 'normal',
      title   : 'Devoted Pet',
      subtext : 'Obedient, affectionate, and thoroughly domesticated.',
      flavor  : 'tender',
      cond    : s => s.affection >= 50 && s.obedience >= 50 && s.fear < 48,
    },
    {
      id      : 'clinging_shadow',
      rarity  : 'normal',
      title   : 'Clinging Shadow',
      subtext : 'Everywhere she goes, you follow — willingly or not.',
      flavor  : 'manipulative',
      cond    : s => s.dependency >= 55 && s.affection >= 38,
    },
    {
      id      : 'frightened_mouse',
      rarity  : 'normal',
      title   : 'Frightened Mouse',
      subtext : 'Every moment is spent waiting for what comes next.',
      flavor  : 'cold',
      cond    : s => s.fear >= 55 && s.affection < 48,
    },
    {
      id      : 'obedient_doll',
      rarity  : 'normal',
      title   : 'Obedient Doll',
      subtext : 'You do as told. You stopped asking why.',
      flavor  : 'cold',
      cond    : s => s.obedience >= 60 && s.dependency < 48,
    },
    {
      id      : 'treasured_secret',
      rarity  : 'normal',
      title   : 'Treasured Secret',
      subtext : 'She keeps you close. She keeps you quiet.',
      flavor  : 'possessive',
      cond    : s => s.affection >= 44 && s.dependency >= 42 && s.fear < 38,
    },
    {
      id      : 'reluctant_companion',
      rarity  : 'normal',
      title   : 'Reluctant Companion',
      subtext : 'You are still resisting. She finds that amusing.',
      flavor  : 'gleeful',
      cond    : s => s.fear >= 38 && s.obedience < 42 && s.affection < 42,
    },
    // Fallback — always matches
    {
      id      : 'uncertain_guest',
      rarity  : 'normal',
      title   : 'Uncertain Guest',
      subtext : 'You have not decided what this is yet. But she has.',
      flavor  : 'cold',
      cond    : () => true,
    },
  ];


  /* ══════════════════════════════════════════════════════════════════
     HEROINE VOICE LINES
     Lines are character-in-voice. Picked by flavor, with title-specific
     overrides where available.
     ══════════════════════════════════════════════════════════════════ */

  const LINES = {
    himari: {
      // title-specific overrides
      the_only_one         : ['You were always going to be mine. Every path led here.', 'Everything you are… it\'s mine. All of it.'],
      hopelessly_devoted   : ['You\'ve stopped fighting. Good. I was getting bored of winning.'],
      willing_prisoner     : ['You chose to stay. I love that you think it was your choice.'],
      devoted_pet          : ['Stay just like this. Perfect. Don\'t ever change.'],
      caged_bird           : ['Beautiful in your cage, aren\'t you? I won\'t open the door.'],
      // flavor fallbacks
      possessive   : ['You were always going to be mine.', 'Mine. That word suits you perfectly.'],
      tender       : ['Oh… you really are adorable when you look at me like that.', 'Stay. Always stay.'],
      cold         : ['This is exactly what I designed you to become.', 'Don\'t flatter yourself. I simply chose not to let you go.'],
      manipulative : ['I made sure of it. Every choice, every path — they all led to me.', 'How perfectly you\'ve grown. I\'m almost proud.'],
      broken       : ['You can\'t leave. I won\'t allow it. Not ever.', 'Don\'t you dare.'],
      gleeful      : ['How sweet. How perfectly, wonderfully sweet.', 'I win. I always win.'],
    },
    shizuku: {
      the_only_one         : ['Please… please don\'t disappear on me. I\'ll do anything.'],
      shattered_mirror     : ['I know I\'m not okay. But when you\'re here, I forget that.'],
      lost_soul            : ['I mapped every route you take. Just… just in case.'],
      clinging_shadow      : ['I know it\'s too much. I know. I just can\'t stop.'],
      emotional_anchor     : ['If you leave I — I don\'t know what I\'d do. I genuinely don\'t.'],
      glass_heart          : ['You\'re still here. I was so scared you wouldn\'t be.'],
      // flavor fallbacks
      possessive   : ['Please don\'t go. I\'ll do anything. Just… stay with me.', 'I need you here. I need it.'],
      tender       : ['I feel safe when you\'re close. Is that strange?', 'You stayed. You actually stayed.'],
      cold         : ['I\'ve been watching. Just… watching.', 'I just need to know where you are. That\'s all.'],
      manipulative : ['If you left, I — I don\'t know. I really don\'t.', 'I\'m sorry. I just love you so much it hurts.'],
      broken       : ['I\'m sorry. I\'m sorry. I just can\'t let go.', 'I\'ll be better. Just don\'t leave.'],
      gleeful      : ['You came back! You actually came back — I knew you would!'],
    },
    reina: {
      the_only_one         : ['Your compliance rate is optimal. I\'ve verified this thoroughly.'],
      perfect_vessel       : ['You perform exactly as expected. I find that satisfying.'],
      willing_prisoner     : ['You understand your position. That earns a degree of comfort.'],
      obedient_doll        : ['You do as instructed without deviation. Acceptable.'],
      broken_toy           : ['Inefficiency is unacceptable. You will correct this.'],
      exquisite_ruin       : ['I analyzed every variable. Your current state is… precisely intended.'],
      // flavor fallbacks
      possessive      : ['Your schedule has been optimized. For my convenience.', 'You belong in my calculations. Only mine.'],
      tender          : ['You\'re useful. More than most. That is worth… something.', 'I find your presence tolerable. Increasingly so.'],
      cold            : ['Don\'t mistake my permission for your freedom.', 'Your emotional patterns are predictable. Manageable.'],
      manipulative    : ['You think you\'re making choices. That\'s genuinely adorable.', 'I planned this outcome from the beginning.'],
      broken          : ['This deviation from the plan is unacceptable.', 'Correct yourself. Now.'],
      cold_analytical : ['Statistically, your current state was inevitable.'],
      gleeful         : ['Precisely as calculated. You\'re right on schedule.'],
    },
    mei: {
      the_only_one         : ['Mine mine mine mine mine. Okay? Just mine forever.'],
      ruined_for_others    : ['You can\'t like anyone else now. I made sure~ Don\'t be mad.'],
      hopelessly_devoted   : ['You love me the most, right? Right? Say it.'],
      beloved_hostage      : ['You\'re my favorite~ Don\'t tell the others. Actually there are no others~'],
      frightened_mouse     : ['Aww, you\'re scared? That\'s so cute. Come here~'],
      willing_prisoner     : ['You stayed! That means you wanted to stay~ Logic!'],
      // flavor fallbacks
      possessive   : ['Mine. M-I-N-E. Do you need me to spell it?', 'You\'re mine. I decided.'],
      tender       : ['I like you the most. Don\'t make me say it again.', 'You\'re warm. I like that.'],
      cold         : ['I already handled it. Don\'t worry about it.', 'It\'s fine. Everything is fine. Because I fixed it.'],
      manipulative : ['If you leave I\'ll just find you. I\'m very good at finding people~', 'I didn\'t do anything. Probably.'],
      broken       : ['You PROMISED. You\'re not allowed to — you can\'t—', 'No no no no no—'],
      gleeful      : ['Found you~!', 'I knew it. I KNEW it. You love me too~'],
    },
  };


  /* ══════════════════════════════════════════════════════════════════
     SECRET LORE FRAGMENTS — shown on return after sharing
     ══════════════════════════════════════════════════════════════════ */

  const SECRET_LORE = [
    {
      heroine : 'himari',
      title   : 'Entry 14 — Her Diary',
      body    : `"I found his handwriting on a napkin today. He'd written a phone number — not mine.\n\nI kept the napkin. I burned the number. I introduced myself to the girl whose number it was.\n\nShe transferred schools last week. I sent flowers to her new address.\n\nHe hasn't noticed. He won't."`,
    },
    {
      heroine : 'shizuku',
      title   : 'A Note She Left',
      body    : `"If you're reading this, it means I got scared again.\n\nI counted your footsteps in the hallway this morning. 47 steps to the classroom. Yesterday it was 52.\n\nI need to know why it changed.\n\nI need to know everything changed."`,
    },
    {
      heroine : 'reina',
      title   : 'Encrypted File — Excerpt',
      body    : `"Subject observation log — Day 312.\n\nAll variables within acceptable range. Social circle: reduced to 3 contacts (approved). Schedule: synchronized with mine (98.4% overlap).\n\nAnomaly detected: subject smiled at an unidentified individual in the east corridor.\n\nInitiating contingency protocol.\n\nNote: do not let him see me smile about this."`,
    },
    {
      heroine : 'mei',
      title   : 'A Text She Never Sent',
      body    : `"hey hey hey\nhey\nare you awake\ni know it's 3am\ni just wanted to know if you're awake\nbecause i was thinking about you\ni was JUST thinking about you\nand also the day before\nand also every day for like a year\nbut anyway\nare you awake\n\n[unsent]"`,
    },
    {
      heroine : null, // universal
      title   : 'The Cage — Architect\'s Note',
      body    : `"The girls were never designed to let go.\n\nI built this cage with four doors, one for each of them. I told myself the player could always leave.\n\nBut I gave each door a lock.\n\nAnd I gave each girl the only key.\n\nI'm sorry. I think I'm sorry."`,
    },
  ];


  /* ══════════════════════════════════════════════════════════════════
     RARITY DISPLAY CONFIG
     ══════════════════════════════════════════════════════════════════ */

  const RARITY_DISPLAY = {
    normal   : { label: '◆ Normal',      color: 'rgba(200,170,230,0.55)', glow: 'rgba(200,170,230,0.20)' },
    uncommon : { label: '◆◆ Uncommon',   color: 'rgba(90,170,208,0.80)',  glow: 'rgba(90,170,208,0.30)' },
    rare     : { label: '★ Rare',        color: '#aa66ee',                glow: 'rgba(170,102,238,0.40)' },
    ultra    : { label: '✦ Ultra Rare',  color: '#e8c870',                glow: 'rgba(232,200,112,0.50)' },
  };


  /* ══════════════════════════════════════════════════════════════════
     CORE EVALUATION
     ══════════════════════════════════════════════════════════════════ */

  function evaluate(stats, heroineId) {
    const s = {
      affection  : stats.affection  || 0,
      dependency : stats.dependency || 0,
      fear       : stats.fear       || 0,
      obedience  : stats.obedience  || 0,
    };

    const match = TITLES.find(t => t.cond(s)) || TITLES[TITLES.length - 1];
    const heroineLines = LINES[heroineId] || LINES.himari;

    // Pick voice line: title-specific first, then flavor fallback
    const pool = heroineLines[match.id] || heroineLines[match.flavor] || ['…'];
    const voiceLine = pool[Math.floor(Math.random() * pool.length)];

    return {
      id        : match.id,
      rarity    : match.rarity,
      title     : match.title,
      subtext   : match.subtext,
      flavor    : match.flavor,
      voiceLine : voiceLine,
      stats     : { ...s },
      heroineId,
    };
  }


  /* ══════════════════════════════════════════════════════════════════
     SHARE CANVAS GENERATION
     ══════════════════════════════════════════════════════════════════ */

  function _hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function _wrapText(ctx, text, maxW) {
    const words = text.split(' ');
    const lines = [];
    let cur = '';
    for (const word of words) {
      const test = cur ? cur + ' ' + word : word;
      if (ctx.measureText(test).width > maxW) {
        if (cur) lines.push(cur);
        cur = word;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [text];
  }

  async function generateShareCanvas(result) {
    const W = 540, H = 960;
    const canvas = document.getElementById('share-canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    await document.fonts.ready;

    const hData    = (typeof HEROINE_DATA !== 'undefined') ? HEROINE_DATA[result.heroineId] : null;
    const colorHex = hData?.colorValue  || '#8840cc';
    const rarCfg   = RARITY_DISPLAY[result.rarity] || RARITY_DISPLAY.normal;

    /* Background */
    const bg = ctx.createRadialGradient(W * 0.42, H * 0.22, 0, W * 0.5, H * 0.5, W);
    bg.addColorStop(0, _hexToRgba(colorHex, 0.55));
    bg.addColorStop(0.5, _hexToRgba('#100418', 0.92));
    bg.addColorStop(1, '#040208');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* Vignette */
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.18, W / 2, H / 2, H * 0.72);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.50)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    /* Top bar */
    ctx.fillStyle = 'rgba(200,170,230,0.28)';
    ctx.font      = '500 11px Cinzel, serif';
    ctx.textAlign = 'left';
    ctx.fillText('FREAKS TOKYO INC.', 32, 42);
    ctx.textAlign = 'right';
    ctx.fillText(hData?.nameEN || '', W - 32, 42);

    /* Top divider */
    ctx.strokeStyle = 'rgba(200,170,230,0.16)';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(32, 54); ctx.lineTo(W - 32, 54); ctx.stroke();

    /* Rarity badge */
    ctx.fillStyle = rarCfg.color;
    ctx.font      = '600 12px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = rarCfg.glow;
    ctx.shadowBlur  = result.rarity === 'ultra' ? 16 : result.rarity === 'rare' ? 10 : 0;
    ctx.fillText(rarCfg.label, W / 2, 86);
    ctx.shadowBlur = 0;

    /* "YOU ARE" label */
    ctx.fillStyle = 'rgba(200,170,230,0.38)';
    ctx.font      = '400 10px Cinzel, serif';
    ctx.fillText('— YOU ARE —', W / 2, 132);

    /* Title */
    ctx.fillStyle   = '#f0eaf8';
    ctx.shadowColor = _hexToRgba(colorHex, 0.60);
    ctx.shadowBlur  = result.rarity === 'ultra' ? 20 : 8;
    const titleUpper = result.title.toUpperCase();
    const titleFontSize = titleUpper.length > 16 ? 38 : titleUpper.length > 12 ? 44 : 50;
    ctx.font        = `700 ${titleFontSize}px Cinzel, serif`;
    const titleLines = _wrapText(ctx, titleUpper, W - 64);
    titleLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, 188 + i * (titleFontSize + 10));
    });
    ctx.shadowBlur = 0;
    const titleBottom = 188 + titleLines.length * (titleFontSize + 10);

    /* Subtext */
    ctx.fillStyle = 'rgba(200,170,230,0.62)';
    ctx.font      = `400 italic 16px "Cormorant Garamond", serif`;
    const subLines = _wrapText(ctx, result.subtext, W - 80);
    subLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, titleBottom + 24 + i * 24);
    });
    const subBottom = titleBottom + 24 + subLines.length * 24;

    /* Mid divider */
    ctx.strokeStyle = 'rgba(200,170,230,0.12)';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(64, subBottom + 22); ctx.lineTo(W - 64, subBottom + 22); ctx.stroke();

    /* Player name */
    const pName = (typeof UIState !== 'undefined') ? UIState.playerName : null;
    let statsY = subBottom + 50;
    if (pName && pName !== 'you' && pName !== 'Player') {
      ctx.fillStyle = 'rgba(240,234,248,0.42)';
      ctx.font      = '300 13px "Cormorant Garamond", serif';
      ctx.fillText(pName, W / 2, subBottom + 44);
      statsY = subBottom + 66;
    }

    /* Stat bars */
    const statDefs = [
      { key: 'affection',  label: 'AFFECTION',  color: '#f05070' },
      { key: 'dependency', label: 'DEPENDENCY',  color: '#88ccee' },
      { key: 'fear',       label: 'FEAR',        color: '#aa66ee' },
      { key: 'obedience',  label: 'OBEDIENCE',   color: '#c4a050' },
    ];
    const barAreaW = W - 64;
    const BAR_H    = 5;
    statDefs.forEach(({ key, label, color }, i) => {
      const y   = statsY + i * 36;
      const val = Math.max(0, Math.min(100, result.stats[key] || 0));
      const pct = val / 100;

      ctx.fillStyle = 'rgba(200,170,230,0.25)';
      ctx.font      = '400 9px Cinzel, serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, 32, y + 1);
      ctx.textAlign = 'right';
      ctx.fillStyle = _hexToRgba(color, 0.65);
      ctx.fillText(String(val), W - 32, y + 1);

      // Track
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fillRect(32, y + 8, barAreaW, BAR_H);

      // Fill
      ctx.fillStyle = _hexToRgba(color, 0.72);
      ctx.fillRect(32, y + 8, barAreaW * pct, BAR_H);
    });

    const afterStats = statsY + 4 * 36 + 16;

    /* Bottom divider */
    ctx.strokeStyle = 'rgba(200,170,230,0.12)';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(64, afterStats); ctx.lineTo(W - 64, afterStats); ctx.stroke();

    /* Brand footer */
    ctx.fillStyle = 'rgba(200,170,230,0.28)';
    ctx.font      = '600 13px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.fillText('THE CAGE OF OBSESSION', W / 2, afterStats + 30);
    ctx.fillStyle = 'rgba(200,170,230,0.16)';
    ctx.font      = '200 11px "Noto Serif JP", serif';
    ctx.fillText('執着お嬢様と絶望の檻', W / 2, afterStats + 50);
  }


  /* ══════════════════════════════════════════════════════════════════
     MODAL DISPLAY
     ══════════════════════════════════════════════════════════════════ */

  let _afterCloseFn = null; // called when diagnosis modal fully closes

  function show(trigger, stats, heroineId, afterClose) {
    const result = evaluate(stats, heroineId);
    _afterCloseFn = afterClose || null;

    /* Apply entry effect based on trigger type */
    const screen = document.getElementById('screen-dialogue');
    if (trigger === 'event') {
      screen?.classList.add('fx-glitch');
      setTimeout(() => screen?.classList.remove('fx-glitch'), 650);
    } else if (trigger === 'ending') {
      screen?.classList.add('fx-zoom-in');
      setTimeout(() => screen?.classList.remove('fx-zoom-in'), 800);
    }

    setTimeout(() => _openModal(result), trigger === 'manual' ? 0 : 400);
  }

  function _openModal(result) {
    const hData  = (typeof HEROINE_DATA !== 'undefined') ? HEROINE_DATA[result.heroineId] : null;
    const rarCfg = RARITY_DISPLAY[result.rarity] || RARITY_DISPLAY.normal;

    /* Populate modal DOM */
    const el = id => document.getElementById(id);

    el('diag-rarity').textContent  = rarCfg.label;
    el('diag-rarity').style.color  = rarCfg.color;
    el('diag-rarity').style.textShadow = `0 0 12px ${rarCfg.glow}`;
    el('diag-title').textContent   = result.title;
    el('diag-title').style.color   = '#f0eaf8';
    if (result.rarity === 'ultra') {
      el('diag-title').style.textShadow = `0 0 22px ${rarCfg.glow}, 0 0 44px ${rarCfg.glow}`;
    } else if (result.rarity === 'rare') {
      el('diag-title').style.textShadow = `0 0 14px ${rarCfg.glow}`;
    } else {
      el('diag-title').style.textShadow = '';
    }
    el('diag-subtext').textContent    = result.subtext;
    el('diag-voice-line').textContent = result.voiceLine;

    /* Heroine name in header */
    el('diag-heroine-name').textContent = hData?.nameEN || '';
    el('diag-heroine-name').style.color = hData?.colorLight || '#f0c8dc';

    /* Color the modal border with heroine color */
    const modal = document.querySelector('.diag-modal');
    if (modal && hData) {
      modal.style.borderColor = hData.colorValue + '55';
      modal.style.boxShadow   = `0 0 60px ${hData.colorValue}22, 0 24px 60px rgba(0,0,0,0.70)`;
    }

    /* Stat bars */
    const statContainer = el('diag-stats');
    statContainer.innerHTML = '';
    const statDefs = [
      { key: 'affection',  label: 'Affection',  labelJP: '愛情', color: '#f05070' },
      { key: 'dependency', label: 'Dependency', labelJP: '依存', color: '#88ccee' },
      { key: 'fear',       label: 'Fear',       labelJP: '恐怖', color: '#aa66ee' },
      { key: 'obedience',  label: 'Obedience',  labelJP: '従順', color: '#c4a050' },
    ];
    statDefs.forEach(({ key, label, labelJP, color }) => {
      const val = Math.max(0, Math.min(100, result.stats[key] || 0));
      const row = document.createElement('div');
      row.className = 'diag-stat-row';
      row.innerHTML = `
        <div class="diag-stat-labels">
          <span class="diag-stat-name">${label}</span>
          <span class="diag-stat-jp">${labelJP}</span>
        </div>
        <div class="diag-stat-bar-wrap">
          <div class="diag-stat-bar" style="width:${val}%;background:${color};box-shadow:0 0 6px ${color}55"></div>
        </div>
        <span class="diag-stat-val">${val}</span>
      `;
      statContainer.appendChild(row);
    });

    /* Store result for share canvas */
    _currentResult = result;

    /* Show overlay */
    const overlay = el('diagnosis-overlay');
    overlay.classList.remove('hidden', 'diag-exit');
    overlay.classList.add('diag-enter');
    overlay.addEventListener('animationend', () => overlay.classList.remove('diag-enter'), { once: true });

    /* Wire share button */
    el('diag-share-btn').onclick = _openShare;
    el('diag-close-btn').onclick = _closeModal;
  }

  let _currentResult = null;

  function _closeModal() {
    const overlay = document.getElementById('diagnosis-overlay');
    overlay.classList.add('diag-exit');
    overlay.addEventListener('animationend', () => {
      overlay.classList.add('hidden');
      overlay.classList.remove('diag-exit');
      if (typeof _afterCloseFn === 'function') {
        _afterCloseFn();
        _afterCloseFn = null;
      }
    }, { once: true });
    setTimeout(() => overlay.classList.add('hidden'), 500); // fallback
  }

  async function _openShare() {
    if (!_currentResult) return;
    await generateShareCanvas(_currentResult);

    // Set download href
    const canvas = document.getElementById('share-canvas');
    const dlBtn  = document.getElementById('share-download-btn');
    dlBtn.href = canvas.toDataURL('image/png');

    // Show share preview
    const prev = document.getElementById('share-preview-overlay');
    prev.classList.remove('hidden', 'share-prev-exit');

    // Mark sharing attempted → triggers Secret Lore on next load
    try {
      localStorage.setItem('cage_share_pending', '1');
    } catch { /* ignore */ }

    // Wire close
    document.getElementById('share-close-btn').onclick = () => {
      prev.classList.add('share-prev-exit');
      prev.addEventListener('animationend', () => {
        prev.classList.add('hidden');
        prev.classList.remove('share-prev-exit');
      }, { once: true });
      setTimeout(() => prev.classList.add('hidden'), 400);
    };

    document.getElementById('share-download-btn').addEventListener('click', () => {
      // Extra visual reward feedback
      document.getElementById('share-close-btn').textContent = 'Done ✦';
    }, { once: true });
  }


  /* ══════════════════════════════════════════════════════════════════
     PERSISTENT BUTTON + PULSE
     ══════════════════════════════════════════════════════════════════ */

  let _pulseTimeout = null;
  let _lastPulsedStats = null;

  function checkStatPulse(newStats) {
    if (!_lastPulsedStats) {
      _lastPulsedStats = { ...newStats };
      return;
    }
    const delta = ['affection', 'fear', 'dependency', 'obedience'].reduce((acc, k) => {
      return acc + Math.abs((newStats[k] || 0) - (_lastPulsedStats[k] || 0));
    }, 0);

    if (delta >= 8) {
      _lastPulsedStats = { ...newStats };
      _pulseButton();
    }
  }

  function _pulseButton() {
    const btn = document.getElementById('diag-trigger-btn');
    if (!btn) return;
    if (_pulseTimeout) clearTimeout(_pulseTimeout);
    btn.classList.remove('pulsing');
    void btn.offsetWidth;
    btn.classList.add('pulsing');
    _pulseTimeout = setTimeout(() => btn.classList.remove('pulsing'), 6000);
  }

  function setupButton() {
    const btn = document.getElementById('diag-trigger-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const stats     = (typeof EngineState !== 'undefined') ? EngineState.stats : {};
      const heroineId = (typeof UIState !== 'undefined') ? UIState.heroine : 'himari';
      show('manual', stats, heroineId || 'himari');
    });
  }


  /* ══════════════════════════════════════════════════════════════════
     SECRET LORE
     ══════════════════════════════════════════════════════════════════ */

  function checkAndShowSecretLore() {
    try {
      if (localStorage.getItem('cage_share_pending') !== '1') return;
      localStorage.removeItem('cage_share_pending');
    } catch { return; }

    const heroineId = (typeof UIState !== 'undefined') ? UIState.heroine : null;
    // Pick lore: prefer heroine-specific, fall back to universal
    const pool = SECRET_LORE.filter(l => l.heroine === heroineId || l.heroine === null);
    const lore = pool[Math.floor(Math.random() * pool.length)] || SECRET_LORE[SECRET_LORE.length - 1];

    setTimeout(() => _showLore(lore), 1200);
  }

  function _showLore(lore) {
    const el = document.getElementById('lore-content');
    if (!el) return;
    el.innerHTML = `
      <p class="lore-title">${lore.title}</p>
      <p class="lore-body">${lore.body.replace(/\n/g, '<br>')}</p>
    `;
    const overlay = document.getElementById('lore-overlay');
    overlay.classList.remove('hidden');

    document.getElementById('lore-close-btn').onclick = () => {
      overlay.classList.add('hidden');
    };
  }


  /* ══════════════════════════════════════════════════════════════════
     PUBLIC API
     ══════════════════════════════════════════════════════════════════ */

  return {
    evaluate,
    show,
    generateShareCanvas,
    setupButton,
    checkStatPulse,
    checkAndShowSecretLore,
    get titles() { return TITLES; },
  };

})();
