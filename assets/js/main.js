// Main site JS: nav, language switch, forms, active links
(function() {
  function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  function markActiveLink() {
    const path = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href').replace(/index\.html$/, '').replace(/\/$/, '');
      if (href === '' && path === '') a.classList.add('active');
      else if (href && path.endsWith(href)) a.classList.add('active');
    });
  }

  function initLangSwitch() {
    const stored = window.I18N.getInitialLanguage();
    window.I18N.setLanguage(stored);
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => window.I18N.setLanguage(btn.dataset.lang));
    });
  }

  function initMailtoForms() {
    const forms = document.querySelectorAll('form.mailto-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const entries = Array.from(data.entries());
        const lines = entries.map(([k, v]) => `${k}: ${v}`);
        const subject = form.dataset.subject || 'Rezervace / Reservation';
        const mail = form.dataset.to || 'penzionlitvinov@seznam.cz';
        const body = encodeURIComponent(lines.join('\n'));
        const url = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = url;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    markActiveLink();
    initLangSwitch();
    initMailtoForms();
  });
})();


