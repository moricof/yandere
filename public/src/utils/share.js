// Web Share API + Canvas-based gacha result screenshot
import { CHARACTERS, RARITY_COLORS } from '../data/characters.js';
import { CONFIG } from '../config.js';

/**
 * Renders gacha pull results to a canvas and triggers the native OS Share Sheet.
 * Falls back to image download if Web Share is unavailable.
 * @param {Array<{rarity, characterId, isDuplicate, shardsGained}>} results
 */
export async function shareGachaPull(results) {
  const canvas = buildResultCanvas(results);
  const blob = await canvasToBlob(canvas);

  const shareData = {
    title: `${CONFIG.TITLE} — Sacred Summon!`,
    text: buildShareText(results),
    url: window.location.origin,
  };

  // Try sharing with image (requires HTTPS + modern browser)
  if (navigator.share) {
    const imageFile = new File([blob], 'my-summon.png', { type: 'image/png' });

    if (navigator.canShare?.({ files: [imageFile] })) {
      try {
        await navigator.share({ ...shareData, files: [imageFile] });
        return { method: 'native-with-image' };
      } catch (e) {
        if (e.name === 'AbortError') return { method: 'cancelled' };
      }
    }

    // Try without image
    try {
      await navigator.share(shareData);
      return { method: 'native-text-only' };
    } catch (e) {
      if (e.name === 'AbortError') return { method: 'cancelled' };
    }
  }

  // Fallback: download the PNG
  downloadBlob(blob, 'goddess-rebirth-pull.png');
  return { method: 'download' };
}

function buildShareText(results) {
  const ssrs = results.filter(r => r.rarity === 'SSR');
  const srs  = results.filter(r => r.rarity === 'SR');

  const lines = [`🌟 My Sacred Summon in ${CONFIG.TITLE}!`];

  if (ssrs.length) {
    ssrs.forEach(r => {
      const char = CHARACTERS[r.characterId];
      lines.push(`✨ SSR: ${char?.name ?? r.characterId}${r.isDuplicate ? ' (dupe!)' : ' (NEW!)'}`);
    });
  }
  if (srs.length && !ssrs.length) {
    srs.forEach(r => {
      const char = CHARACTERS[r.characterId];
      lines.push(`💜 SR: ${char?.name ?? r.characterId}${r.isDuplicate ? ' (dupe)' : ''}`);
    });
  }

  if (!ssrs.length && !srs.length) {
    lines.push('💙 R pulls — saving up for SSR!');
  }

  lines.push(`by ${CONFIG.BRAND} | Play now → ${window.location.origin}`);
  return lines.join('\n');
}

function buildResultCanvas(results) {
  const W = 800;
  const cols = Math.min(results.length, 5);
  const rows = Math.ceil(results.length / cols);
  const CARD_W = 140;
  const CARD_H = 180;
  const PAD = 20;
  const HEADER = 100;
  const H = HEADER + rows * (CARD_H + PAD) + PAD;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#08080f');
  bg.addColorStop(1, '#0f0a1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Header
  ctx.fillStyle = '#f5c842';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚔ SACRED SUMMON ⚔', W / 2, 42);
  ctx.fillStyle = '#a78bfa';
  ctx.font = '16px sans-serif';
  ctx.fillText(CONFIG.TITLE + ' — by ' + CONFIG.BRAND, W / 2, 72);

  // Cards
  results.forEach((result, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const startX = (W - cols * (CARD_W + PAD) + PAD) / 2;
    const x = startX + col * (CARD_W + PAD);
    const y = HEADER + row * (CARD_H + PAD);

    drawCard(ctx, result, x, y, CARD_W, CARD_H);
  });

  return canvas;
}

function drawCard(ctx, result, x, y, w, h) {
  const char = CHARACTERS[result.characterId];
  const colors = RARITY_COLORS[result.rarity];

  // Card background
  ctx.fillStyle = colors.bg;
  roundRect(ctx, x, y, w, h, 12);
  ctx.fill();

  // Glowing border
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, w, h, 12);
  ctx.stroke();

  // Rarity glow
  ctx.shadowBlur = 12;
  ctx.shadowColor = colors.glow;
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  roundRect(ctx, x + 2, y + 2, w - 4, h - 4, 10);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Rarity label
  ctx.fillStyle = colors.label;
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(result.rarity, x + w / 2, y + 20);

  // Character emoji
  ctx.font = '52px serif';
  ctx.fillText(char?.emoji ?? '❓', x + w / 2, y + 85);

  // Character name
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(char?.name ?? result.characterId, x + w / 2, y + 110);

  // Status label
  if (result.isDuplicate) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText(`+${result.shardsGained} shards`, x + w / 2, y + 130);
  } else {
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('NEW!', x + w / 2, y + 130);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function canvasToBlob(canvas) {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
