// Object-pooled floating damage numbers — no DOM churn during combat
const POOL_SIZE = 25;
const DURATION = 1.2; // seconds

const pool = [];
let container = null;
const active = [];

function ensureContainer() {
  if (!container) container = document.getElementById('floating-texts');
}

function getOrCreate() {
  if (pool.length) return pool.pop();
  ensureContainer();
  const el = document.createElement('div');
  el.className = 'floating-dmg hidden';
  container?.appendChild(el);
  return el;
}

function recycle(item) {
  item.el.className = 'floating-dmg hidden';
  pool.push(item.el);
}

export const FloatingText = {
  /**
   * Spawns a floating damage/reward number at position (x, y) within the battle zone.
   * @param {string} text
   * @param {number} x - pixels from left edge of battle-zone
   * @param {number} y - pixels from top edge of battle-zone
   * @param {'tap'|'auto'|'boss'|'gold'} type
   */
  spawn(text, x, y, type = 'auto') {
    ensureContainer();
    const el = getOrCreate();

    el.textContent = text;
    el.className = `floating-dmg type-${type}`;

    // Jitter X slightly for variety
    const jitter = (Math.random() - 0.5) * 30;
    el.style.left = (x + jitter) + 'px';
    el.style.top = y + 'px';

    // Trigger reflow so animation restarts properly on recycled elements
    void el.offsetWidth;
    el.classList.add('animate');

    active.push({ el, age: 0 });
  },

  /** Called every frame from GameLoop. Ages and recycles expired elements. */
  update(delta) {
    for (let i = active.length - 1; i >= 0; i--) {
      active[i].age += delta;
      if (active[i].age >= DURATION) {
        recycle(active[i]);
        active.splice(i, 1);
      }
    }
  },

  clear() {
    for (const item of active) recycle(item);
    active.length = 0;
  },
};
