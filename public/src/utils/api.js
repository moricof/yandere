// API client for Cloudflare Workers backend
import { CONFIG } from '../config.js';
import { Storage } from './storage.js';

class APIClient {
  get baseUrl() { return CONFIG.API_URL; }

  // True once the user has replaced the placeholder Worker URL
  get isConfigured() {
    return !CONFIG.API_URL.includes('YOUR_ACCOUNT');
  }

  // ─── Auth ────────────────────────────────────────────────────────────────

  async register() { return this._post('/api/auth/register', {}); }
  async refreshToken() { return this._post('/api/auth/refresh', {}); }

  // ─── Game State ───────────────────────────────────────────────────────────

  async loadState() { return this._get('/api/state'); }
  async saveState(stateData) { return this._post('/api/state', { state: stateData }); }
  async loadHistory() { return this._get('/api/state/history'); }

  // ─── Gacha ────────────────────────────────────────────────────────────────

  async pull(count = 1) {
    if (!navigator.onLine) throw new Error('offline');
    return this._post('/api/gacha/pull', { count });
  }

  // ─── Push Notifications ───────────────────────────────────────────────────

  async subscribePush(subscription) { return this._post('/api/push/subscribe', { subscription }); }
  async unsubscribePush() { return this._delete('/api/push/subscribe'); }
  async testPush() { return this._post('/api/push/test', {}); }

  // ─── Public Assets ────────────────────────────────────────────────────────

  async getPublicAssets() { return this._get('/api/assets/public', { auth: false }); }

  // ─── Admin ────────────────────────────────────────────────────────────────

  async adminLogin(password) { return this._post('/api/admin/login', { password }, { auth: false }); }
  async adminGetAssets(adminToken) { return this._get('/api/admin/assets', { adminToken }); }
  async adminUpsertAsset(adminToken, payload) { return this._post('/api/admin/assets', payload, { adminToken }); }
  async adminDeleteAsset(adminToken, id) { return this._delete(`/api/admin/assets/${id}`, { adminToken }); }
  async adminGetStats(adminToken) { return this._get('/api/admin/stats', { adminToken }); }

  // ─── Internals ────────────────────────────────────────────────────────────

  _buildHeaders(opts = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (opts.adminToken) {
      headers['Authorization'] = `Admin ${opts.adminToken}`;
    } else if (opts.auth !== false) {
      const token = Storage.get('auth_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async _request(method, path, body, opts = {}) {
    if (!this.isConfigured) throw new Error('API not configured — running in local-only mode');

    const url = `${CONFIG.API_URL}${path}`;
    const init = {
      method,
      headers: this._buildHeaders(opts),
      signal: AbortSignal.timeout(5_000),
    };
    if (body !== undefined) init.body = JSON.stringify(body);

    const resp = await fetch(url, init);
    const data = await resp.json();

    if (!resp.ok) throw Object.assign(new Error(data.error ?? 'Request failed'), { status: resp.status, data });

    return data;
  }

  _get(path, opts) { return this._request('GET', path, undefined, opts); }
  _post(path, body, opts) { return this._request('POST', path, body, opts); }
  _delete(path, opts) { return this._request('DELETE', path, undefined, opts); }
}

export const API = new APIClient();
