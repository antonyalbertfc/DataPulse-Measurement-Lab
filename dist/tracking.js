// Basic consent: the only GTM loader; no optional collection before opt-in.
(() => {
  'use strict';
  const KEY = 'datapulse.consent.v1';
  const MAX_AGE = 180 * 86400000;
  const DISABLE = 'ga-disable-G-4W889S6CY7';
  function readChoice() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      const age = Date.now() - v?.timestamp;
      return v?.version === 1 && typeof v.analytics === 'boolean' && age >= 0 && age < MAX_AGE ? v : null;
    } catch { return null; }
  }
  const choice = readChoice();
  window[DISABLE] = choice?.analytics !== true;
  window.dataLayer = window.dataLayer || [];
  function consent() { window.dataLayer.push(arguments); }
  const denied = {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',personalization_storage:'denied',security_storage:'granted'};
  consent('consent', 'default', denied);
  function clearCookies() {
    const parts = location.hostname.split('.');
    const domains = ['', ...parts.map((_,i) => parts.slice(i).join('.')).flatMap(d => [d,'.'+d])];
    for (const item of document.cookie.split(';')) {
      const name = item.trim().split('=')[0];
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) continue;
      for (const domain of domains) document.cookie = name+'=; Max-Age=0; path=/'+(domain ? '; domain='+domain : '');
    }
  }
  if (choice?.analytics === true) {
    consent('consent', 'update', {...denied, analytics_storage:'granted'});
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-5VQ4GMBG';
    document.head.appendChild(script);
  } else clearCookies();
  const banner = document.querySelector('#cookie-banner');
  const dialog = document.querySelector('#cookie-dialog');
  const checkbox = document.querySelector('#consent-analytics');
  banner.hidden = !!choice;
  function openPreferences() {
    checkbox.checked = readChoice()?.analytics === true;
    dialog.showModal();
  }
  function save(analytics) {
    // Prevent this GA4 property's unload events before a clean reload.
    window[DISABLE] = true;
    try { localStorage.setItem(KEY, JSON.stringify({version:1,analytics,timestamp:Date.now()})); }
    catch {
      document.querySelector('#cookie-error').hidden = false;
      if (!dialog.open) openPreferences();
      return;
    }
    if (!analytics) clearCookies();
    // Reload removes GTM listeners and avoids replaying pre-consent actions.
    location.reload();
  }
  document.querySelectorAll('[data-consent]').forEach(b => b.addEventListener('click', () => save(b.dataset.consent === 'accept')));
  document.querySelector('#cookie-customize').addEventListener('click', openPreferences);
  document.querySelector('#cookie-preferences').addEventListener('click', openPreferences);
  document.querySelector('#cookie-close').addEventListener('click', () => dialog.close());
  document.querySelector('#cookie-save').addEventListener('click', () => save(checkbox.checked));
  window.addEventListener('storage', e => {
    if (e.key === KEY || e.key === null) { window[DISABLE] = true; location.reload(); }
  });
  // Recheck on focus and periodically without overflowing browser timer limits.
  function checkExpiry() {
    if (choice && !readChoice()) { window[DISABLE] = true; location.reload(); }
  }
  window.addEventListener('focus', checkExpiry);
  setInterval(checkExpiry, 60000);
})();

