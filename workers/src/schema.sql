-- Goddess Rebirth: Idle Oaths — D1 Schema
-- Run: npx wrangler d1 execute goddess-rebirth-db --file src/schema.sql [--remote]

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Anonymous user accounts (UUID-based, no login required)
CREATE TABLE IF NOT EXISTS users (
  id            TEXT    PRIMARY KEY,
  created_at    INTEGER NOT NULL,
  last_seen     INTEGER NOT NULL,
  pity_counter  INTEGER NOT NULL DEFAULT 0,
  total_pulls   INTEGER NOT NULL DEFAULT 0,
  push_notif_at INTEGER             -- unix ts of last push sent
);

-- Cloud save — full game state JSON blob
CREATE TABLE IF NOT EXISTS game_states (
  user_id    TEXT    PRIMARY KEY,
  state_json TEXT    NOT NULL,
  version    INTEGER NOT NULL DEFAULT 1,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Characters owned by each user
CREATE TABLE IF NOT EXISTS user_characters (
  user_id          TEXT    NOT NULL,
  character_id     TEXT    NOT NULL,
  copies           INTEGER NOT NULL DEFAULT 1,
  level            INTEGER NOT NULL DEFAULT 1,
  ascension_shards INTEGER NOT NULL DEFAULT 0,
  unlocked_at      INTEGER NOT NULL,
  PRIMARY KEY (user_id, character_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Gacha pull history (for auditing and display)
CREATE TABLE IF NOT EXISTS gacha_history (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id      TEXT    NOT NULL,
  character_id TEXT    NOT NULL,
  rarity       TEXT    NOT NULL CHECK (rarity IN ('SSR','SR','R')),
  is_duplicate INTEGER NOT NULL DEFAULT 0,
  shards_gained INTEGER NOT NULL DEFAULT 0,
  pulled_at    INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Admin-configurable asset overrides (character art, videos, banners, backgrounds)
CREATE TABLE IF NOT EXISTS admin_assets (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_type   TEXT    NOT NULL,  -- 'character_art','character_video','monster_art','banner_art','background_art'
  asset_key    TEXT    NOT NULL,  -- e.g. 'seraphine', 'stage_1_boss', 'banner_main'
  url          TEXT    NOT NULL,
  metadata_json TEXT   NOT NULL DEFAULT '{}',
  updated_at   INTEGER NOT NULL,
  UNIQUE(asset_type, asset_key)
);

-- Web Push subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  user_id           TEXT PRIMARY KEY,
  subscription_json TEXT NOT NULL,  -- full PushSubscription JSON
  created_at        INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_gacha_user ON gacha_history(user_id, pulled_at DESC);
CREATE INDEX IF NOT EXISTS idx_assets_type ON admin_assets(asset_type, asset_key);
