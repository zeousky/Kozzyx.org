(function () {
  'use strict';

  const API_BASE = (window.KOZZ_CONFIG && window.KOZZ_CONFIG.API_BASE) || 'https://kozzyx.org';
  const toast = (msg, kind) => window.MobileShell?.toast(msg, kind);

  let token = '';
  let me = null;
  let guilds = [];
  let activeGuildId = '';
  try {
    token = localStorage.getItem('kz_token') || '';
    me = JSON.parse(localStorage.getItem('kz_user') || 'null');
    activeGuildId = localStorage.getItem('kz_guild_id') || '';
  } catch (_) {}

  const gate = document.getElementById('mGate');
  const content = document.getElementById('mDashContent');
  const loginBtn = document.getElementById('mLogin');

  function showGate() {
    document.documentElement.classList.remove('authed');
    gate.hidden = false;
    content.style.display = 'none';
  }
  function hideGate() {
    document.documentElement.classList.add('authed');
    gate.hidden = true;
    content.style.display = '';
  }

  async function apiFetch(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (activeGuildId) headers['x-kozzyx-guild-id'] = activeGuildId;
    const res = await fetch(API_BASE + path, { ...opts, headers });
    if (res.status === 401 || res.status === 403) {
      logout(true);
      throw new Error('auth');
    }
    if (!res.ok) throw new Error('HTTP ' + res.status);
    if (res.status === 204) return null;
    return res.json();
  }

  loginBtn?.addEventListener('click', async () => {
    loginBtn.disabled = true;
    loginBtn.textContent = 'Opening Discord…';
    try {
      const r = await fetch(API_BASE + '/api/auth/login').then(r => r.json());
      if (r && r.url) location.href = r.url;
      else throw new Error();
    } catch (_) {
      toast('Could not start login.', 'danger');
      loginBtn.disabled = false;
      loginBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49l-.2.4c1.4.3 2.6.8 3.7 1.6-2-1-4.4-1.5-7.3-1.5S5.8 6.3 3.8 7.3c1.1-.8 2.3-1.3 3.7-1.6l-.2-.4c-1.5.2-2.9.6-4.2 1.2C1.5 10.4 1 13.7 1.2 17a17 17 0 0 0 5.2 2.6c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.8-.9c.1-.1.3-.2.4-.3 3.4 1.6 7.1 1.6 10.5 0 .1.1.3.2.4.3-.6.4-1.2.7-1.8.9.3.7.7 1.3 1.1 1.9A17 17 0 0 0 22.8 17c.2-3.8-.4-7-3.8-10.5z"/></svg> Continue with Discord';
    }
  });

  async function handleCallback() {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (!code) return false;
    history.replaceState({}, document.title, location.pathname);
    try {
      const r = await fetch(API_BASE + '/api/auth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
      }).then(r => r.json());
      if (r && r.token && r.user) {
        token = r.token; me = r.user;
        localStorage.setItem('kz_token', token);
        localStorage.setItem('kz_user', JSON.stringify(me));
        toast(`Welcome, ${me.username}!`, 'ok');
        return true;
      }
      toast(r?.error || 'Login failed', 'danger');
    } catch (_) {
      toast('Could not reach API.', 'danger');
    }
    return false;
  }

  function logout(silent) {
    token = ''; me = null; activeGuildId = '';
    try {
      localStorage.removeItem('kz_token');
      localStorage.removeItem('kz_user');
      localStorage.removeItem('kz_guild_id');
    } catch (_) {}
    if (!silent) toast('Signed out.', 'info');
    showGate();
  }

  document.getElementById('mLogout')?.addEventListener('click', () => logout());

  const tabsEl = document.getElementById('mDashTabs');
  let active = (location.hash.slice(1) || 'overview');
  if (!['overview', 'mod', 'ai', 'people', 'settings'].includes(active)) active = 'overview';

  function setTab(name) {
    active = name;
    tabsEl.querySelectorAll('.m-tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === name));
    document.querySelectorAll('.m-view').forEach(v => { v.hidden = v.dataset.view !== name; });
    if (location.hash.slice(1) !== name) history.replaceState(null, '', '#' + name);
    window.scrollTo({ top: 0, behavior: 'instant' });
    loadView(name);
  }
  tabsEl.addEventListener('click', e => {
    const t = e.target.closest('.m-tab');
    if (!t) return;
    e.preventDefault();
    setTab(t.dataset.tab);
  });
  document.addEventListener('click', e => {
    const j = e.target.closest('[data-jump]');
    if (j) { e.preventDefault(); setTab(j.dataset.jump); }
  });

  document.getElementById('mServerBtn').addEventListener('click', openServerSheet);

  function openServerSheet() {
    if (!guilds.length) return;
    const rows = guilds.map(g => `
      <button type="button" class="m-card-row" data-guild="${g.id}" style="width:100%; text-align:left;">
        <span class="m-row-ic" style="background:${colorFor(g.name)};">${esc((g.name || '?').slice(0, 1).toUpperCase())}</span>
        <span class="m-row-body">
          <span class="m-row-title">${esc(g.name || 'Server')}</span>
          <span class="m-row-sub">${g.id === activeGuildId ? '✓ active' : (g.isOwner ? 'owner' : 'admin')}</span>
        </span>
      </button>
    `).join('');
    window.MobileShell.openSheet(`<h3>Switch server</h3><div class="m-card is-flush">${rows}</div>`);
    setTimeout(() => {
      document.querySelectorAll('[data-guild]').forEach(b => {
        b.addEventListener('click', () => {
          activeGuildId = b.dataset.guild;
          try { localStorage.setItem('kz_guild_id', activeGuildId); } catch (_) {}
          window.MobileShell.closeSheet();
          renderServer();
          loadView(active);
        });
      });
    }, 30);
  }

  function colorFor(s) {
    let h = 0;
    for (let i = 0; i < (s || '').length; i++) h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff;
    return `oklch(0.62 0.18 ${h % 360})`;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function num(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
    return String(n);
  }
  function rel(t) {
    if (!t) return '';
    const d = (Date.now() - new Date(t).getTime()) / 1000;
    if (d < 60) return Math.max(1, d | 0) + 's';
    if (d < 3600) return ((d / 60) | 0) + 'm';
    if (d < 86400) return ((d / 3600) | 0) + 'h';
    return ((d / 86400) | 0) + 'd';
  }

  function renderGreeting() {
    const h = new Date().getHours();
    const word = h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const greet = document.getElementById('mGreeting');
    if (greet) greet.textContent = me ? `${word}, ${me.username}.` : `${word}.`;
  }

  function renderServer() {
    const g = guilds.find(g => g.id === activeGuildId) || guilds[0];
    const init = document.getElementById('mServerInitial');
    const name = document.getElementById('mServerName');
    const sub  = document.getElementById('mServerCount');
    if (!g) { name.textContent = 'No managed server'; sub.textContent = 'Invite kozzyx first'; return; }
    init.textContent = (g.name || '?').slice(0, 1).toUpperCase();
    init.style.background = colorFor(g.name);
    init.style.color = '#fff';
    name.textContent = g.name || 'Server';
    sub.textContent = `${g.memberCount ? num(g.memberCount) + ' members' : ''}${g.isOwner ? ' · owner' : ''}`;
  }

  const loaded = new Set();
  async function loadView(view) {
    if (!token || !activeGuildId) return;
    try {
      if (view === 'overview') await loadOverview();
      else if (view === 'mod') await loadMod();
      else if (view === 'ai') await loadAi();
      else if (view === 'people') await loadPeople();
    } catch (e) {
      if (e?.message !== 'auth') toast('Could not load. Pull to retry.', 'danger');
    }
  }

  async function loadOverview() {
    const stats = await apiFetch('/api/stats').catch(() => ({}));
    setStat('members', stats.memberCount);
    setStat('messages', stats.messages24h ?? stats.messageCount);
    setStat('mod',      stats.modActions24h ?? stats.modActions);
    setStat('ai',       stats.aiCalls24h ?? stats.aiCalls);

    const feed = await apiFetch('/api/feed', { silent: true }).catch(() => []);
    const list = (Array.isArray(feed) ? feed : []).slice(0, 8);
    const host = document.getElementById('mFeed');
    if (!list.length) {
      host.innerHTML = '<div class="m-card-row" style="color:var(--fg-faint);">No activity yet.</div>';
      return;
    }
    host.innerHTML = list.map(e => `
      <div class="m-card-row">
        <span class="m-row-ic">${eventEmoji(e.type)}</span>
        <span class="m-row-body">
          <span class="m-row-title">${esc(e.title || e.type || 'event')}</span>
          <span class="m-row-sub">${esc(e.detail || '')}</span>
        </span>
        <span style="font-family:'Geist Mono',monospace; font-size:10.5px; color:var(--fg-faint);">${rel(e.at || e.timestamp)}</span>
      </div>
    `).join('');
  }
  function setStat(key, v) {
    const el = document.querySelector(`[data-stat="${key}"]`);
    if (el) el.textContent = num(v);
  }
  function eventEmoji(t) {
    const map = { join: '👋', leave: '👋', message: '💬', warn: '⚠️', ban: '🔨', kick: '👢', mute: '🔇', ai: '✨', boost: '🚀' };
    return map[t] || '•';
  }

  async function loadMod() {
    const logs = await apiFetch('/api/modlogs').catch(() => []);
    const list = Array.isArray(logs) ? logs.slice(0, 30) : [];
    const host = document.getElementById('mModLog');
    if (!list.length) {
      host.innerHTML = '<div class="m-card-row" style="color:var(--fg-faint);">No mod actions yet.</div>';
      return;
    }
    host.innerHTML = list.map(l => `
      <div class="m-card-row">
        <span class="m-row-ic ${l.action === 'ban' ? 'is-danger' : 'is-ok'}">${eventEmoji(l.action)}</span>
        <span class="m-row-body">
          <span class="m-row-title">${esc((l.action || 'action').toUpperCase())} · ${esc(l.targetTag || l.targetId || '?')}</span>
          <span class="m-row-sub">${esc(l.reason || '—')} · by ${esc(l.executorTag || l.executorId || '?')}</span>
        </span>
        <span style="font-family:'Geist Mono',monospace; font-size:10.5px; color:var(--fg-faint);">${rel(l.at || l.timestamp)}</span>
      </div>
    `).join('');
  }

  async function loadAi() {
    const cfg = await apiFetch('/api/ai/config').catch(() => null);
    const host = document.getElementById('mAi');
    if (!cfg) { host.innerHTML = '<div class="m-card-row" style="color:var(--fg-faint);">AI not configured.</div>'; return; }
    host.innerHTML = `
      <div class="m-card-row">
        <span class="m-row-ic">✨</span>
        <span class="m-row-body">
          <span class="m-row-title">Model</span>
          <span class="m-row-sub">${esc(cfg.model || 'gemini')}</span>
        </span>
      </div>
      <div class="m-card-row">
        <span class="m-row-ic">🌡️</span>
        <span class="m-row-body">
          <span class="m-row-title">Temperature</span>
          <span class="m-row-sub">${esc(cfg.temperature ?? '—')}</span>
        </span>
      </div>
      <div class="m-card-row">
        <span class="m-row-ic">📝</span>
        <span class="m-row-body">
          <span class="m-row-title">System prompt</span>
          <span class="m-row-sub" style="overflow-wrap:anywhere;">${esc((cfg.systemPrompt || '').slice(0, 160) || '—')}</span>
        </span>
      </div>
      <div class="m-card-row">
        <span class="m-row-ic ${cfg.enabled ? 'is-ok' : 'is-danger'}">${cfg.enabled ? '✓' : '✕'}</span>
        <span class="m-row-body">
          <span class="m-row-title">${cfg.enabled ? 'AI enabled' : 'AI disabled'}</span>
          <span class="m-row-sub">${cfg.callsToday || 0} calls today</span>
        </span>
      </div>
    `;
  }

  async function loadPeople() {
    const board = await apiFetch('/api/leaderboard').catch(() => []);
    const list = Array.isArray(board) ? board.slice(0, 20) : [];
    const host = document.getElementById('mLeader');
    if (!list.length) {
      host.innerHTML = '<div class="m-card-row" style="color:var(--fg-faint);">No leaderboard data yet.</div>';
      return;
    }
    host.innerHTML = list.map((m, i) => {
      const rank = i + 1;
      const rankColor = rank === 1 ? '#f5c451' : rank === 2 ? '#c4c8cf' : rank === 3 ? '#cd8a52' : 'var(--fg-faint)';
      return `
        <div class="m-card-row">
          <span style="width:28px; text-align:center; font-family:'Geist Mono',monospace; font-weight:600; color:${rankColor}; flex-shrink:0;">${rank}</span>
          <span class="m-row-ic" style="background:${colorFor(m.username || m.id)}; color:#fff;">${esc((m.username || '?').slice(0,1).toUpperCase())}</span>
          <span class="m-row-body">
            <span class="m-row-title">${esc(m.username || m.id)}</span>
            <span class="m-row-sub">Lvl ${esc(m.level ?? 0)} · ${num(m.xp || 0)} xp</span>
          </span>
        </div>
      `;
    }).join('');
  }

  async function boot() {
    const fromCallback = await handleCallback();
    if (fromCallback) {

    }
    if (!token) { showGate(); return; }
    hideGate();
    renderGreeting();
    try {
      guilds = await apiFetch('/api/auth/guilds');
    } catch (_) { return; }
    if (!Array.isArray(guilds) || !guilds.length) {
      toast('No servers you can manage were found.', 'danger', 4000);
      return;
    }
    if (!activeGuildId || !guilds.find(g => g.id === activeGuildId)) {
      activeGuildId = guilds[0].id;
      try { localStorage.setItem('kz_guild_id', activeGuildId); } catch (_) {}
    }
    renderServer();
    setTab(active);
  }
  boot();
})();
