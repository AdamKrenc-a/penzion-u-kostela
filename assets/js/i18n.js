/* Lightweight i18n loader for CZ/EN */
(function() {
  const DEFAULT_LANG = 'cs';
  const supported = new Set(['cs', 'en']);

  function getInitialLanguage() {
    const stored = localStorage.getItem('lang');
    if (stored && supported.has(stored)) return stored;
    const browser = (navigator.language || 'cs').slice(0,2).toLowerCase();
    return supported.has(browser) ? browser : DEFAULT_LANG;
  }

  async function loadTranslations(lang) {
    const res = await fetch(`assets/i18n/${lang}.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load translations');
    return res.json();
  }

  function applyTranslations(dict) {
    document.documentElement.setAttribute('lang', dict.__meta?.lang || 'cs');
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
      const key = node.getAttribute('data-i18n');
      const value = getByKey(dict, key);
      if (typeof value === 'string') {
        if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
          node.setAttribute('placeholder', value);
        } else {
          node.innerHTML = value;
        }
      }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(node => {
      const key = node.getAttribute('data-i18n-placeholder');
      const value = getByKey(dict, key);
      if (typeof value === 'string') node.setAttribute('placeholder', value);
    });
    // Update title if present
    const titleKey = document.querySelector('meta[data-i18n-title]')?.getAttribute('data-i18n-title');
    if (titleKey) {
      const t = getByKey(dict, titleKey);
      if (t) document.title = t;
    }
  }

  function getByKey(obj, key) {
    return key.split('.').reduce((acc, k) => acc && acc[k], obj);
  }

  async function setLanguage(lang) {
    if (!supported.has(lang)) lang = DEFAULT_LANG;
    try {
      const dict = await loadTranslations(lang);
      applyTranslations(dict);
      localStorage.setItem('lang', lang);
      document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Expose globally
  window.I18N = { setLanguage, getInitialLanguage };
})();


