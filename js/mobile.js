(function () {
  'use strict';

  const I = {
    home:     '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    sparkles: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    grid:     '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    help:     '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>',
    more:     '<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>',
    back:     '<path d="m15 18-6-6 6-6"/>',
    sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon:     '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    shield:   '<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/>',
    mod:      '<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bot:      '<rect x="3" y="8" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><path d="M12 4v4"/><circle cx="12" cy="3" r="1" fill="currentColor"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
    flag:     '<path d="M4 21V4a1 1 0 0 1 1.5-.87L20 7l-14 3v11z"/>',
    file:     '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
    desktop:  '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    discord:  '<path d="M19 6.5c-1.3-.6-2.7-1-4.2-1.2l-.2.4c1.4.3 2.6.8 3.7 1.6-2-1-4.4-1.5-7.3-1.5S5.8 6.3 3.8 7.3c1.1-.8 2.3-1.3 3.7-1.6l-.2-.4c-1.5.2-2.9.6-4.2 1.2C1.5 10.4 1 13.7 1.2 17a17 17 0 0 0 5.2 2.6c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.8-.9.1-.1.3-.2.4-.3 3.4 1.6 7.1 1.6 10.5 0 .1.1.3.2.4.3-.6.4-1.2.7-1.8.9.3.7.7 1.3 1.1 1.9A17 17 0 0 0 22.8 17c.2-3.8-.4-7-3.8-10.5zM8.5 14.5c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7zm7 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7z"/>',
  };

  function svg(pathHtml, opts = {}) {
    const stroke = opts.fill ? 'none' : 'currentColor';
    const fill = opts.fill ? 'currentColor' : 'none';
    return `<svg viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathHtml}</svg>`;
  }

  const NAV = [
    { key: 'home',     label: 'Home',     href: 'index_mobile.html',     ic: I.home },
    { key: 'features', label: 'Features', href: 'features_mobile.html', ic: I.sparkles },
    { key: 'commands', label: 'Commands', href: 'commands_mobile.html', ic: I.grid },
    { key: 'faq',      label: 'FAQ',      href: 'faq_mobile.html',      ic: I.help },
    { key: 'more',     label: 'More',     href: '#more',                ic: I.more },
  ];

  function buildTopbar(body) {
    if (body.dataset.topbar === 'off') return;
    const title = body.dataset.title || document.title.replace(/.*—\s*/, '');
    const eyebrow = body.dataset.eyebrow || '';
    const back = body.dataset.back;

    const topbar = document.createElement('header');
    topbar.className = 'm-topbar';
    topbar.innerHTML = `
      ${back ? `<a href="${back}" class="m-iconbtn" aria-label="Back">${svg(I.back)}</a>` : `<span class="m-iconbtn" aria-hidden="true" style="visibility:hidden"></span>`}
      <div class="m-topbar-title">${eyebrow ? `<small>${eyebrow}</small>` : ''}${title}</div>
      <button type="button" class="m-iconbtn" id="mThemeBtn" aria-label="Theme">${svg(I.moon)}</button>
    `;
    body.prepend(topbar);
    document.getElementById('mThemeBtn').addEventListener('click', toggleTheme);
    syncThemeIcon();
  }

  function buildTabbar(body) {
    if (body.dataset.tabbar === 'off') return;
    const active = body.dataset.page || '';
    const bar = document.createElement('nav');
    bar.className = 'm-tabbar';
    bar.setAttribute('aria-label', 'Primary');
    bar.innerHTML = NAV.map(n => {
      const cls = n.key === active ? 'm-tab is-active' : 'm-tab';
      return `<a href="${n.href}" class="${cls}" data-key="${n.key}">${svg(n.ic)}<span>${n.label}</span></a>`;
    }).join('');
    body.appendChild(bar);

    bar.querySelector('[data-key="more"]').addEventListener('click', e => {
      e.preventDefault();
      openMoreSheet();
    });
  }

  let sheetEls = null;
  function ensureSheet() {
    if (sheetEls) return sheetEls;
    const bd = document.createElement('div');
    bd.className = 'm-sheet-backdrop';
    const sh = document.createElement('div');
    sh.className = 'm-sheet';
    sh.setAttribute('role', 'dialog');
    sh.setAttribute('aria-modal', 'true');
    document.body.appendChild(bd);
    document.body.appendChild(sh);
    bd.addEventListener('click', closeSheet);
    sheetEls = { bd, sh };
    return sheetEls;
  }
  function openSheet(html) {
    const { bd, sh } = ensureSheet();
    sh.innerHTML = `<div class="m-sheet-handle"></div>${html}`;
    requestAnimationFrame(() => {
      bd.classList.add('is-open');
      sh.classList.add('is-open');
    });
  }
  function closeSheet() {
    if (!sheetEls) return;
    sheetEls.bd.classList.remove('is-open');
    sheetEls.sh.classList.remove('is-open');
  }

  function openMoreSheet() {
    const items = [
      { label: 'Dashboard',   href: 'dashboard_mobile.html', ic: I.shield },
      { label: 'Team',        href: 'team_mobile.html',      ic: I.user },
      { label: 'Contact',     href: 'contact_mobile.html',   ic: I.mail },
      { label: 'Report issue',href: 'report_mobile.html',    ic: I.flag },
      { label: 'Privacy',     href: 'privacy_mobile.html',   ic: I.file },
      { label: 'Terms',       href: 'terms_mobile.html',     ic: I.file },
      { label: 'Invite the bot', href: (window.KOZZ && window.KOZZ.INVITE_URL) || 'https://discord.com/oauth2/authorize?client_id=1352199076963979365&permissions=8&scope=bot%20applications.commands', ic: I.bot, external: true },
      { label: 'Switch to desktop site', href: '#desktop', ic: I.desktop, action: 'desktop' },
    ];
    const rows = items.map(i => `
      <a href="${i.href}" ${i.external ? 'target="_blank" rel="noopener"' : ''} class="m-card-row" data-action="${i.action || ''}">
        <span class="m-row-ic">${svg(i.ic)}</span>
        <span class="m-row-body"><span class="m-row-title">${i.label}</span></span>
        <span class="m-row-chev">${svg('<path d="m9 18 6-6-6-6"/>')}</span>
      </a>
    `).join('');
    openSheet(`<h3>More</h3><div class="m-card is-flush">${rows}</div>`);

    const desktop = sheetEls.sh.querySelector('[data-action="desktop"]');
    if (desktop) desktop.addEventListener('click', e => {
      e.preventDefault();
      try { sessionStorage.setItem('kzMobileOptOut', '1'); } catch (_) {}
      const dst = location.pathname.replace(/_mobile\.html$/, '.html').replace(/\/$/, '/index.html');
      location.href = dst.endsWith('.html') ? dst : 'index.html';
    });
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('kzTheme', next); } catch (_) {}
    syncThemeIcon();
  }
  function syncThemeIcon() {
    const btn = document.getElementById('mThemeBtn');
    if (!btn) return;
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerHTML = svg(cur === 'dark' ? I.moon : I.sun);
  }

  function toast(msg, type = 'info', ms = 2600) {
    let host = document.querySelector('.m-toasts');
    if (!host) {
      host = document.createElement('div');
      host.className = 'm-toasts';
      document.body.appendChild(host);
    }
    const el = document.createElement('div');
    el.className = 'm-toast' + (type === 'ok' ? ' is-ok' : type === 'danger' ? ' is-danger' : '');
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-out');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, ms);
  }

  window.MobileShell = {
    toast,
    openSheet,
    closeSheet,
    svg,
    icons: I,
  };

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), +delay);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  function initCountUp() {
    const nums = document.querySelectorAll('.m-stat-num[data-target]');
    if (!nums.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const decimals = Number.isInteger(target) ? 0 : 1;
        let start = null;
        const duration = 1200;
        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * ease).toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(el => obs.observe(el));
  }

  function init() {
    const body = document.body;

    try {
      const t = localStorage.getItem('kzTheme');
      if (t) document.documentElement.setAttribute('data-theme', t);
    } catch (_) {}

    buildTopbar(body);
    buildTabbar(body);

    document.addEventListener('click', e => {
      const t = e.target.closest('[data-toast]');
      if (t) toast(t.dataset.toast, t.dataset.toastKind || 'info');
    });

    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

    initReveal();
    initCountUp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
