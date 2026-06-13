/* commands_mobile.js — renders / filters / searches the commands list
   reads window.KOZZ_COMMANDS (loaded from assets/js/commands-data.js). */
(function () {
  'use strict';

  const list = document.getElementById('mCmdList');
  const empty = document.getElementById('mCmdEmpty');
  const search = document.getElementById('mCmdSearch');
  const cats = document.getElementById('mCmdCats');
  if (!list || !window.KOZZ_COMMANDS) return;

  const ALL = window.KOZZ_COMMANDS;
  let q = '';
  let cat = 'all';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    const needle = q.trim().toLowerCase();
    const filtered = ALL.filter(c => {
      if (cat === 'popular' && !c.popular) return false;
      if (cat !== 'all' && cat !== 'popular' && c.cat !== cat) return false;
      if (!needle) return true;
      return (
        (c.cmd && c.cmd.toLowerCase().includes(needle)) ||
        (c.desc && c.desc.toLowerCase().includes(needle)) ||
        (c.args && c.args.toLowerCase().includes(needle))
      );
    });

    if (!filtered.length) {
      list.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    // group by category for readability when no search is active
    if (!needle && cat === 'all') {
      const groups = {};
      filtered.forEach(c => { (groups[c.cat] = groups[c.cat] || []).push(c); });
      const order = ['mod', 'ai', 'utility', 'setup', 'tickets', 'fun', 'general'];
      const keys = Object.keys(groups).sort((a, b) => {
        const ai = order.indexOf(a), bi = order.indexOf(b);
        return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
      });
      list.innerHTML = keys.map(k => `
        <div class="m-section-h" style="margin-top:18px;"><h2>${esc(k)}</h2><span style="color:var(--fg-faint); font-size:12px;">${groups[k].length}</span></div>
        ${groups[k].map(row).join('')}
      `).join('');
    } else {
      list.innerHTML = filtered.map(row).join('');
    }
  }

  function row(c) {
    const tag = c.prefix ? 'prefix' : 'slash';
    return `
      <div class="m-cmd">
        <div class="m-cmd-head">
          <span class="m-cmd-name">${esc(c.cmd)}${c.args ? ` <span style="color:var(--fg-faint); font-weight:500;">${esc(c.args)}</span>` : ''}</span>
          <span class="m-cmd-tag">${esc(c.cat)}</span>
        </div>
        <div class="m-cmd-desc">${esc(c.desc)}</div>
        <div style="margin-top:6px; font-family:'Geist Mono',monospace; font-size:10px; color:var(--fg-faint); text-transform:uppercase; letter-spacing:0.06em;">${tag}${c.popular ? ' · popular' : ''}</div>
      </div>
    `;
  }

  search.addEventListener('input', e => { q = e.target.value; render(); });
  cats.addEventListener('click', e => {
    const b = e.target.closest('.m-pill');
    if (!b) return;
    cats.querySelectorAll('.m-pill').forEach(p => p.classList.toggle('is-active', p === b));
    cat = b.dataset.cat;
    render();
  });

  render();
})();
