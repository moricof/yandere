// localStorage wrapper with JSON serialization and error handling

const PREFIX = 'cn_'; // caelum noir namespace

export const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false; // Storage quota exceeded or private browsing
    }
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  remove(key) {
    try { localStorage.removeItem(PREFIX + key); } catch {}
  },

  clear() {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
      keys.forEach(k => localStorage.removeItem(k));
    } catch {}
  },
};
