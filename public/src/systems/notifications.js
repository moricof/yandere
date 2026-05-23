// Web Push Notification system
import { CONFIG } from '../config.js';
import { API } from '../utils/api.js';
import { state } from '../state.js';
import { Storage } from '../utils/storage.js';

export const NotificationSystem = {
  get isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
  },

  get permission() {
    return Notification.permission; // 'default' | 'granted' | 'denied'
  },

  async requestAndSubscribe() {
    if (!this.isSupported) return { success: false, reason: 'unsupported' };

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return { success: false, reason: 'denied' };

    return this.subscribe();
  },

  async subscribe() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const publicKey = urlBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY);

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      await API.subscribePush(sub.toJSON());

      state.settings.notificationsEnabled = true;
      Storage.set('push_subscription', sub.toJSON());

      return { success: true };
    } catch (err) {
      return { success: false, reason: err.message };
    }
  },

  async unsubscribe() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) await sub.unsubscribe();
      await API.unsubscribePush();
      state.settings.notificationsEnabled = false;
      Storage.remove('push_subscription');
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  /** Shows a local notification (no server required — for immediate feedback). */
  showLocal(title, body, options = {}) {
    if (Notification.permission !== 'granted') return;
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        ...options,
      });
    });
  },
};

// Decode base64url VAPID public key to Uint8Array (required by pushManager.subscribe)
function urlBase64ToUint8Array(base64String) {
  const pad = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + pad).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}
