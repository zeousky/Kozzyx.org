if (typeof trustedTypes !== 'undefined' && trustedTypes.createPolicy) {
  try { trustedTypes.createPolicy('default', { createHTML: s => s, createScript: s => s, createScriptURL: s => s }); } catch (_) {}
}
(function () {
  'use strict';

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.prototype.slice.call(c.querySelectorAll(s));

  let modlogCache = null;
  let auditCache = null;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOUCH = window.matchMedia('(pointer: coarse)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);

  function svg(tag, attrs) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) {
      const v = attrs[k];
      if (typeof v === 'string' && v.indexOf('var(') === 0 &&
        (k === 'fill' || k === 'stroke' || k === 'stop-color')) {
        n.style.setProperty(k, v);
      } else {
        n.setAttribute(k, v);
      }
    }
    return n;
  }

  function rng(seed) {
    let s = seed % 2147483647; if (s <= 0) s += 2147483646;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
  }

  function smooth(pts, tension) {
    if (pts.length < 2) return '';
    tension = tension == null ? 0.17 : tension;
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) * tension, c1y = p1[1] + (p2[1] - p0[1]) * tension;
      const c2x = p2[0] - (p3[0] - p1[0]) * tension, c2y = p2[1] - (p3[1] - p1[1]) * tension;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  }

  function clockTick() {
    const now = new Date();
    const c = $('#clock');
    if (c) c.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  (function initClock() {
    clockTick();
    setInterval(clockTick, 20000);
    const t = $('#todayStr');
    if (t) t.textContent = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
    const h = new Date().getHours();
    const g = h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const greet = $('#greeting');
    let storedName = 'ckaz';
    try { const u = JSON.parse(localStorage.getItem('kz_user') || 'null'); if (u && u.username) storedName = u.username; } catch (e) {}
    if (greet) greet.textContent = g + ', ' + storedName;
  })();

  $('#themeBtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('kzTheme', next); } catch (e) {}
    toast(next === 'light' ? 'Light theme on' : 'Dark theme on', 'i-' + (next === 'light' ? 'sun' : 'moon'));
  });

  function fmtNum(n, fmt) {
    if (fmt === 'k') return (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) : n) + 'K';
    return n.toLocaleString('en-US');
  }
  function countUp(node) {
    if (node.dataset.done) return;
    node.dataset.done = '1';
    const target = parseFloat(node.dataset.count);
    const fmt = node.dataset.fmt;
    if (REDUCED) { node.textContent = fmtNum(target, fmt); return; }
    const dur = 1500, t0 = performance.now();
    (function frame(t) {
      const p = clamp((t - t0) / dur, 0, 1);
      node.textContent = fmtNum(Math.round(target * ease(p)), fmt);
      if (p < 1) requestAnimationFrame(frame);
    })(t0);
  }

  const TONE = { accent: 'var(--accent)', ok: 'var(--ok)', warn: 'var(--warn)', violet: 'var(--violet)' };
  function buildSpark(node) {
    const vals = node.dataset.spark.split(',').map(Number);
    const color = TONE[node.dataset.tone] || TONE.accent;
    const W = 120, H = 40, max = Math.max.apply(null, vals), min = Math.min.apply(null, vals), rg = max - min || 1;
    const pts = vals.map((v, i) => [i / (vals.length - 1) * W, H - 4 - (v - min) / rg * (H - 10)]);
    const line = smooth(pts);
    const s = svg('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none' });
    const gid = 'sg' + Math.random().toString(36).slice(2, 7);
    const defs = svg('defs');
    const grad = svg('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(svg('stop', { offset: '0%', 'stop-color': color, 'stop-opacity': 0.45 }));
    grad.appendChild(svg('stop', { offset: '100%', 'stop-color': color, 'stop-opacity': 0 }));
    defs.appendChild(grad); s.appendChild(defs);
    const fill = svg('path', { d: line + ` L${W},${H} L0,${H} Z`, fill: `url(#${gid})` });
    const stroke = svg('path', { class: 'spark-line', d: line, stroke: color });
    s.appendChild(fill); s.appendChild(stroke);
    node.innerHTML = ''; node.appendChild(s);
    if (!REDUCED && typeof stroke.getTotalLength === 'function') {
      try {
        const len = stroke.getTotalLength();
        stroke.style.strokeDasharray = len;
        stroke.style.strokeDashoffset = len;
        fill.style.opacity = 0;
        requestAnimationFrame(() => {
          stroke.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)';
          stroke.style.strokeDashoffset = 0;
          fill.style.transition = 'opacity 0.9s ease 0.3s';
          fill.style.opacity = 1;
        });
      } catch (e) {  }
    }
  }

  function buildChart(container, cfg) {
    container.innerHTML = '';
    const W = 600, H = 240, padL = 10, padR = 10, padT = 18, padB = 28;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const n = cfg.series[0].values.length;
    const s = svg('svg', { viewBox: `0 0 ${W} ${H}` });
    container.appendChild(s);

    const grid = svg('g', { class: 'chart-grid' });
    for (let i = 0; i <= 4; i++) {
      const y = padT + plotH / 4 * i;
      grid.appendChild(svg('line', { x1: padL, y1: y, x2: W - padR, y2: y }));
    }
    s.appendChild(grid);

    const labels = cfg.labels;
    [0, 0.25, 0.5, 0.75, 1].forEach(f => {
      const idx = Math.round(f * (n - 1));
      const tx = svg('text', { class: 'chart-axis', x: padL + f * plotW, y: H - 8, 'text-anchor': f === 0 ? 'start' : f === 1 ? 'end' : 'middle' });
      tx.textContent = labels[idx];
      s.appendChild(tx);
    });

    const allPts = [];
    cfg.series.forEach((ser, si) => {
      const max = Math.max.apply(null, ser.values) * 1.12 || 1;
      const pts = ser.values.map((v, i) => [
        padL + i / (n - 1) * plotW,
        padT + plotH - (v / max) * plotH
      ]);
      allPts.push(pts);
      const path = smooth(pts);
      if (si === 0) {
        const gid = 'cg' + Math.random().toString(36).slice(2, 7);
        const defs = svg('defs');
        const grad = svg('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
        grad.appendChild(svg('stop', { offset: '0%', 'stop-color': ser.color, 'stop-opacity': 0.34 }));
        grad.appendChild(svg('stop', { offset: '100%', 'stop-color': ser.color, 'stop-opacity': 0 }));
        defs.appendChild(grad); s.appendChild(defs);
        const fill = svg('path', { class: 'area-fill', d: path + ` L${pts[n - 1][0]},${padT + plotH} L${pts[0][0]},${padT + plotH} Z`, fill: `url(#${gid})` });
        s.appendChild(fill);
        if (!REDUCED) { fill.style.opacity = 0; requestAnimationFrame(() => { fill.style.opacity = 1; }); }
      }
      const line = svg('path', { class: 'area-line' + (si ? ' l2' : ''), d: path, stroke: ser.color });
      s.appendChild(line);
      if (!REDUCED) {
        if (si === 0 && typeof line.getTotalLength === 'function') {
          try {
            const len = line.getTotalLength();
            line.style.strokeDasharray = len;
            line.style.strokeDashoffset = len;
            requestAnimationFrame(() => {
              line.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)';
              line.style.strokeDashoffset = 0;
            });
          } catch (e) {  }
        } else if (si !== 0) {
          line.style.opacity = 0;
          requestAnimationFrame(() => {
            line.style.transition = 'opacity 0.8s ease 0.35s';
            line.style.opacity = 0.7;
          });
        }
      }
    });

    const dots = allPts[0].map((p, i) => {
      const dot = svg('circle', { class: 'chart-dot', cx: p[0], cy: p[1], r: 0, fill: 'var(--bg-elev)', stroke: cfg.series[0].color, 'stroke-width': 2.4 });
      s.appendChild(dot);
      if (!REDUCED) setTimeout(() => { dot.setAttribute('r', 3.2); }, 700 + i * (700 / n));
      else dot.setAttribute('r', 3.2);
      return dot;
    });

    const cross = svg('line', { class: 'crosshair', x1: 0, y1: padT, x2: 0, y2: padT + plotH });
    s.appendChild(cross);
    const cursor = svg('circle', { class: 'chart-cursor', r: 5.5, fill: cfg.series[0].color, stroke: 'var(--bg)', 'stroke-width': 3 });
    s.appendChild(cursor);

    const tip = document.createElement('div');
    tip.className = 'chart-tip';
    container.appendChild(tip);

    const hit = svg('rect', { x: 0, y: 0, width: W, height: H, fill: 'transparent', style: 'cursor:crosshair' });
    s.appendChild(hit);

    function move(e) {
      const r = s.getBoundingClientRect();
      const cx = e.clientX != null ? e.clientX : (e.touches && e.touches[0].clientX);
      const px = (cx - r.left) / r.width * W;
      let idx = Math.round((px - padL) / plotW * (n - 1));
      idx = clamp(idx, 0, n - 1);
      const x = allPts[0][idx][0], y = allPts[0][idx][1];
      cross.setAttribute('x1', x); cross.setAttribute('x2', x);
      cross.style.opacity = 1;
      cursor.setAttribute('cx', x); cursor.setAttribute('cy', y);
      cursor.style.opacity = 1;
      dots[idx].setAttribute('r', 4.5);
      dots.forEach((d, i) => { if (i !== idx) d.setAttribute('r', 3.2); });
      let rows = '';
      cfg.series.forEach(ser => {
        rows += `<div class="tip-row"><span class="tip-dot" style="background:${ser.color}"></span>${ser.name} <b style="margin-left:auto;padding-left:10px">${ser.values[idx].toLocaleString()}</b></div>`;
      });
      tip.innerHTML = rows + `<time>${labels[idx]}</time>`;
      tip.style.left = (x / W * r.width) + 'px';
      tip.style.top = (y / H * r.height) + 'px';
      tip.classList.add('show');
    }
    function leave() {
      cross.style.opacity = 0; cursor.style.opacity = 0;
      tip.classList.remove('show');
      dots.forEach(d => d.setAttribute('r', 3.2));
    }
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerleave', leave);
  }

  function genWave(n, base, amp, seed) {
    const r = rng(seed), out = [];
    for (let i = 0; i < n; i++) {
      const v = base
        + Math.sin(i / n * Math.PI * 2.2 + seed) * amp
        + Math.sin(i * 0.7 + seed) * amp * 0.35
        + (r() - 0.5) * amp * 0.6;
      out.push(Math.max(1, Math.round(v)));
    }
    return out;
  }
  function activityData(range) {
    if (range === '24h') {
      return {
        labels: Array.from({ length: 24 }, (_, i) => (i < 10 ? '0' : '') + i + ':00'),
        series: [
          { name: 'Commands', color: 'var(--accent)', values: genWave(24, 210, 95, 7) },
          { name: 'Active users', color: 'var(--ok)', values: genWave(24, 120, 60, 13) }
        ]
      };
    }
    if (range === '7d') {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
          { name: 'Commands', color: 'var(--accent)', values: [620, 710, 680, 790, 910, 1180, 1025] },
          { name: 'Active users', color: 'var(--ok)', values: [310, 360, 340, 390, 470, 590, 540] }
        ]
      };
    }
    return {
      labels: Array.from({ length: 30 }, (_, i) => 'D' + (i + 1)),
      series: [
        { name: 'Commands', color: 'var(--accent)', values: genWave(30, 760, 280, 21) },
        { name: 'Active users', color: 'var(--ok)', values: genWave(30, 410, 150, 29) }
      ]
    };
  }

  function buildGauge(container, value) {
    container.innerHTML = '';
    const s = svg('svg', { viewBox: '0 0 200 200' });
    const defs = svg('defs');
    const grad = svg('linearGradient', { id: 'gaugeGrad', x1: 0, y1: 0, x2: 1, y2: 1 });
    grad.appendChild(svg('stop', { offset: '0%', 'stop-color': 'var(--accent)' }));
    grad.appendChild(svg('stop', { offset: '100%', 'stop-color': 'var(--ok)' }));
    defs.appendChild(grad); s.appendChild(defs);
    const rot = 'rotate(135 100 100)';
    s.appendChild(svg('circle', { class: 'gauge-track', cx: 100, cy: 100, r: 80, pathLength: 100, 'stroke-width': 14, 'stroke-dasharray': '75 25', transform: rot }));
    const f = value / 100;
    const arc = svg('circle', { class: 'gauge-arc', cx: 100, cy: 100, r: 80, pathLength: 100, 'stroke-width': 14, 'stroke-dasharray': (f * 75) + ' 100', transform: rot });
    s.appendChild(arc);
    container.appendChild(s);
    const center = document.createElement('div');
    center.className = 'gauge-center';
    center.innerHTML = `<div class="gauge-val" data-count="${value}">0</div><div class="gauge-cap">Excellent</div>`;
    container.appendChild(center);
    if (!REDUCED) {
      arc.style.strokeDashoffset = f * 75;
      requestAnimationFrame(() => {
        arc.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)';
        arc.style.strokeDashoffset = 0;
      });
    }
    countUp($('.gauge-val', container));
  }

  function buildBars(container) {
    container.innerHTML = '';
    const r = rng(99), vals = [];
    for (let i = 0; i < 14; i++) vals.push(6 + Math.round(r() * 26 + Math.sin(i) * 5 + 8));
    const max = Math.max.apply(null, vals);
    const today = new Date();
    vals.forEach((v, i) => {
      const col = document.createElement('div');
      col.className = 'bar-col';
      const d = new Date(today); d.setDate(d.getDate() - (13 - i));
      col.innerHTML = `<div class="bar-track"><div class="bar"><span class="bar-val">${v} actions</span></div></div>` +
        `<span class="bar-label">${d.getDate()}/${d.getMonth() + 1}</span>`;
      container.appendChild(col);
      const bar = $('.bar', col);
      const h = (v / max * 100) + '%';
      if (REDUCED) bar.style.height = h;
      else setTimeout(() => { bar.style.height = h; }, 80 + i * 55);
    });
  }

  function buildDonut(container, legendEl, segs) {
    container.innerHTML = '';
    const total = segs.reduce((a, b) => a + b.value, 0);
    const s = svg('svg', { viewBox: '0 0 160 160' });
    s.appendChild(svg('circle', { cx: 80, cy: 80, r: 60, fill: 'none', stroke: 'var(--bg-elev-3)', 'stroke-width': 16 }));
    let cum = 0;
    const arcs = [];
    segs.forEach(seg => {
      const pct = seg.value / total * 100;
      const c = svg('circle', {
        class: 'donut-seg', cx: 80, cy: 80, r: 60, pathLength: 100,
        stroke: seg.color, 'stroke-dasharray': '0 100',
        'stroke-dashoffset': 25 - cum, transform: 'rotate(0 80 80)'
      });
      s.appendChild(c);
      arcs.push({ c: c, pct: pct, cum: cum });
      cum += pct;
    });
    const tv = svg('text', { class: 'donut-center-val', x: 80, y: 80, 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
    tv.textContent = total.toLocaleString();
    const tc = svg('text', { class: 'donut-center-cap', x: 80, y: 98, 'text-anchor': 'middle' });
    tc.textContent = 'REQUESTS';
    s.appendChild(tv); s.appendChild(tc);
    container.appendChild(s);
    arcs.forEach((a, i) => {
      const apply = () => { a.c.style.transition = 'stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1)'; a.c.setAttribute('stroke-dasharray', (a.pct - 1.5) + ' 100'); };
      if (REDUCED) a.c.setAttribute('stroke-dasharray', (a.pct - 1.5) + ' 100');
      else setTimeout(apply, 200 + i * 140);
    });
    if (legendEl) {
      legendEl.innerHTML = segs.map(seg =>
        `<li><span class="lg-dot" style="background:${seg.color}"></span><span class="lg-name">${seg.label}</span><span class="lg-val">${seg.value.toLocaleString()}</span></li>`
      ).join('');
    }
  }

  function animateMeters(root) {
    $$('.meter-fill', root).forEach(m => {
      if (m.dataset.done) return; m.dataset.done = '1';
      const pct = parseFloat(getComputedStyle(m).getPropertyValue('--pct')) || 0;
      if (REDUCED) { m.style.width = pct + '%'; return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { m.style.width = pct + '%'; }));
    });
  }

  const VIEW_LABEL = {
    overview: 'Overview',
    moderation: 'Moderation',
    security: 'Security',
    commands: 'Commands',
    automation: 'Automation',
    tickets: 'Support Tickets',
    voice: 'Voice Channels',
    ai: 'AI Studio',
    members: 'Members',
    social: 'Social',
    logs: 'Audit Log',
    appeals: 'Appeals',
    settings: 'Settings'
  };
  const built = {};
  const app = $('#app');

  function moveIndicator() {
    const active = $('.nav-item.is-active');
    const ind = $('#navIndicator');
    if (!active) { ind.style.opacity = 0; return; }
    ind.style.opacity = 1;
    ind.style.height = active.offsetHeight + 'px';
    ind.style.transform = `translateY(${active.offsetTop}px)`;
  }

  function go(view) {
    if (!VIEW_LABEL[view]) return;
    $$('.nav-item').forEach(n => n.classList.toggle('is-active', n.dataset.view === view));
    $$('.view').forEach(v => v.classList.toggle('is-active', v.dataset.view === view));
    $('#crumbNow').textContent = VIEW_LABEL[view];
    moveIndicator();
    initView(view);
    loadViewData(view);
    app.classList.remove('nav-open');
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    if (location.hash.slice(1) !== view) location.hash = view;
  }
  window.addEventListener('hashchange', () => {
    const v = location.hash.slice(1) || 'overview';
    if (VIEW_LABEL[v]) go(v);
  });

  $('#nav').addEventListener('click', e => {
    const item = e.target.closest('.nav-item');
    if (item) go(item.dataset.view);
  });
  $$('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));

  function initView(view) {
    if (built[view]) { return; }
    built[view] = true;
    const root = $(`.view[data-view="${view}"]`);
    $$('[data-count]', root).forEach(countUp);
    animateMeters(root);

    if (view === 'overview') {
      $$('.spark', root).forEach(buildSpark);
      buildChart($('#activityChart'), activityData('24h'));
      buildGauge($('#healthGauge'), 98);
    }
    if (view === 'moderation') {
      buildBars($('#modBars'));
      renderWarnings();
    }
    if (view === 'security') {
      const btn = $('#saveSecurityBtn');
      if (btn) btn.addEventListener('click', () => saveAllSettings(btn));
    }
    if (view === 'automation') renderAutomation();
    if (view === 'tickets') {
      const btn = $('#saveTicketsBtn');
      if (btn) btn.addEventListener('click', () => saveAllSettings(btn));
    }
    if (view === 'voice') {
      const btn = $('#saveVoiceBtn');
      if (btn) btn.addEventListener('click', () => saveAllSettings(btn));
    }
    if (view === 'ai') {
      buildDonut($('#aiDonut'), $('#aiLegend'), [
        { label: '/ask', value: 1240, color: 'var(--accent)' },
        { label: '/imagine', value: 680, color: 'var(--violet)' },
        { label: '/translate', value: 410, color: 'var(--ok)' },
        { label: '/summarize', value: 95, color: 'var(--warn)' }
      ]);
      const runBtn = $('#runAiAssistantBtn');
      if (runBtn) runBtn.addEventListener('click', runAiAssistant);
      const inp = $('#aiAssistantPrompt');
      if (inp) {
        inp.addEventListener('keypress', e => {
          if (e.key === 'Enter') runAiAssistant();
        });
      }
    }
    if (view === 'members') {
      buildChart($('#growthChart'), {
        labels: Array.from({ length: 30 }, (_, i) => 'D' + (i + 1)),
        series: [{ name: 'Net joins', color: 'var(--accent)', values: genWave(30, 48, 26, 5) }]
      });
      renderBoard();
    }
    if (view === 'social') {
      const btn = $('#saveSocialBtn');
      if (btn) btn.addEventListener('click', () => saveAllSettings(btn));
    }
    if (view === 'logs') renderTimeline();
    if (view === 'settings') buildSwatches();
  }

  $('#rangeSeg').addEventListener('click', e => {
    const b = e.target.closest('.seg-btn');
    if (!b) return;
    $$('.seg-btn', $('#rangeSeg')).forEach(x => x.classList.toggle('is-active', x === b));
    buildChart($('#activityChart'), activityData(b.dataset.range));
  });

  $('#collapseBtn').addEventListener('click', () => {
    app.classList.toggle('collapsed');
    setTimeout(moveIndicator, 420);
  });
  $('#menuToggle').addEventListener('click', () => app.classList.add('nav-open'));
  $('#scrim').addEventListener('click', () => app.classList.remove('nav-open'));
  window.addEventListener('resize', moveIndicator);

  const srvBtn = $('#serverSwitcher'), srvMenu = $('#srvMenu');
  srvBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = srvMenu.hasAttribute('hidden');
    srvMenu.toggleAttribute('hidden', !open);
    srvBtn.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', e => {
    if (!srvMenu.contains(e.target) && !srvBtn.contains(e.target)) {
      srvMenu.setAttribute('hidden', ''); srvBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const NOTIFS = [
    { ic: 'i-alert', tone: 'warn', html: 'Raid attempt <b>blocked</b> — 14 accounts', t: '2m' },
    { ic: 'i-ticket', tone: 'accent', html: 'New ticket from <b>lunar</b>', t: '11m' },
    { ic: 'i-user-plus', tone: 'ok', html: '<b>+128</b> members joined today', t: '1h' },
    { ic: 'i-sparkles', tone: 'violet', html: 'AI usage hit <b>60%</b> of monthly budget', t: '3h' },
    { ic: 'i-rocket', tone: 'accent', html: 'kozzyx updated to <b>v4.2</b>', t: '5h' }
  ];
  const notifPop = $('#notifPop');
  $('#notifList').innerHTML = NOTIFS.map(n =>
    `<div class="notif-item"><span class="n-ic feed-ic ${n.tone}"><svg class="ic"><use href="#${n.ic}"/></svg></span>` +
    `<div style="flex:1"><p>${n.html}</p><time>${n.t} ago</time></div></div>`
  ).join('');
  $('#bellBtn').addEventListener('click', e => {
    e.stopPropagation();
    notifPop.toggleAttribute('hidden');
  });
  document.addEventListener('click', e => {
    if (!notifPop.contains(e.target) && !$('#bellBtn').contains(e.target)) notifPop.setAttribute('hidden', '');
  });

  const NAMES = ['lunar', 'vex', 'echo.dev', 'maya', 'kojiro', 'pixel', 'novaa', 'drift', 'sable', 'wren', 'cipher', 'aria_'];
  const CMDS = ['ask', 'rank', 'play', 'warn', 'avatar', 'poll', 'remind', 'translate'];
  const CHANS = ['general', 'memes', 'support', 'dev-chat', 'lounge', 'music'];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const FEED_TPL = [
    { ic: 'i-user-plus', tone: 'ok', f: () => `<b>${pick(NAMES)}</b> joined the server` },
    { ic: 'i-command', tone: 'accent', f: () => `<b>${pick(NAMES)}</b> ran <b>/${pick(CMDS)}</b>` },
    { ic: 'i-shield', tone: 'warn', f: () => `<b>${pick(NAMES)}</b> was warned · auto-mod` },
    { ic: 'i-ticket', tone: 'violet', f: () => `<b>${pick(NAMES)}</b> opened a ticket` },
    { ic: 'i-message', tone: 'accent', f: () => `${4 + Math.floor(Math.random() * 40)} messages purged in <b>#${pick(CHANS)}</b>` },
    { ic: 'i-gift', tone: 'ok', f: () => `<b>${pick(NAMES)}</b> boosted the server` },
    { ic: 'i-mic', tone: 'accent', f: () => `<b>${pick(NAMES)}</b> joined <b>${pick(CHANS)}</b> VC` },
    { ic: 'i-ban', tone: 'danger', f: () => `<b>${pick(NAMES)}</b> was banned · raid` }
  ];
  function feedRow(tpl, fresh) {
    const li = document.createElement('li');
    li.className = 'feed-item' + (fresh ? ' fresh' : '');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    li.innerHTML = `<span class="feed-ic ${tpl.tone}"><svg class="ic"><use href="#${tpl.ic}"/></svg></span>` +
      `<div class="feed-body"><p>${tpl.f()}</p><time>${fresh ? 'just now' : time}</time></div>`;
    return li;
  }
  let feedSimTimer = null;
  function startFeedSimulator() {
    const feed = $('#liveFeed');
    if (!feed) return;
    if (feedSimTimer) { clearInterval(feedSimTimer); feedSimTimer = null; }
    feed.innerHTML = '';
    for (let i = 0; i < 6; i++) feed.appendChild(feedRow(pick(FEED_TPL), false));
    feedSimTimer = setInterval(() => {
      if (document.hidden) return;
      feed.insertBefore(feedRow(pick(FEED_TPL), true), feed.firstChild);
      while (feed.children.length > 7) feed.removeChild(feed.lastChild);
    }, 4800);
  }
  function restartFeedSimulator() {
    startFeedSimulator();
  }
  (function initFeed() {

    if (localStorage.getItem('kz_token')) return;
    startFeedSimulator();
  })();

  document.addEventListener('click', e => {
    const sw = e.target.closest('.switch');
    if (!sw) return;
    if (sw.dataset.plugin || sw.dataset.cmd || sw.dataset.cfg) return;

    if (sw.id && (sw.id.startsWith('cfg') || sw.id.startsWith('ar'))) return;
    const on = sw.classList.toggle('is-on');
    sw.setAttribute('aria-checked', on);
  });

  const WARNS = [
    { user: 'driftwood', seed: 'dev', reason: 'Spam in #general', sev: 'low', mod: 'ckaz', when: '12m ago' },
    { user: 'vex.exe', seed: 'arch', reason: 'Posting NSFW links', sev: 'high', mod: 'aria_', when: '1h ago' },
    { user: 'novaa', seed: 'neon', reason: 'Mass mention abuse', sev: 'med', mod: 'ckaz', when: '3h ago' },
    { user: 'kojiro', seed: 'cosmic', reason: 'Advertising other servers', sev: 'med', mod: 'wren', when: '6h ago' },
    { user: 'pixel_', seed: 'dev', reason: 'Disrespecting staff', sev: 'high', mod: 'aria_', when: '9h ago' },
    { user: 'sable', seed: 'arch', reason: 'Caps lock spam', sev: 'low', mod: 'ckaz', when: '1d ago' },
    { user: 'cipher', seed: 'neon', reason: 'Slur in voice chat', sev: 'high', mod: 'wren', when: '1d ago' },
    { user: 'maya.k', seed: 'cosmic', reason: 'Off-topic flooding', sev: 'low', mod: 'ckaz', when: '2d ago' }
  ];
  const SEVLABEL = { low: 'Low', med: 'Medium', high: 'Severe' };
  const SEV_TAG = { BAN: 'high', SOFTBAN: 'high', KICK: 'med', TIMEOUT: 'med', MUTE: 'med', WARN: 'low', UNBAN: 'low', UNTIMEOUT: 'low' };
  function renderWarnings(filter) {
    const tb = $('#warnTable tbody');
    if (!tb) return;
    const q = (filter || '').toLowerCase();

    if (Array.isArray(modlogCache)) {
      const rows = modlogCache.filter(w => !q
        || String(w.target || '').toLowerCase().includes(q)
        || String(w.reason || '').toLowerCase().includes(q)
        || String(w.action || '').toLowerCase().includes(q));
      if (!rows.length) {
        tb.innerHTML = '<tr class="empty-row"><td colspan="6">' +
          (modlogCache.length ? 'No cases match that search.' : 'No moderation cases yet.') + '</td></tr>';
        return;
      }
      tb.innerHTML = rows.map(w => {
        const sev = SEV_TAG[w.action] || 'low';
        const when = w.timestamp ? new Date(w.timestamp).toLocaleString() : '—';
        return `<tr><td><div class="cell-user"><span class="avatar">${escapeHtml(String(w.target || '?').slice(0, 2).toUpperCase())}</span><b>${escapeHtml(w.target || 'Unknown')}</b></div></td>` +
          `<td>${escapeHtml(w.reason || 'No reason')}</td>` +
          `<td><span class="tag ${sev}">${escapeHtml(w.action || 'MOD')}</span></td>` +
          `<td>${escapeHtml(w.moderator || '—')}</td>` +
          `<td class="td-muted">${escapeHtml(when)}</td>` +
          `<td class="td-muted">${w.case != null ? '#' + escapeHtml(String(w.case)) : ''}</td></tr>`;
      }).join('');
      return;
    }

    const rows = WARNS.filter(w => !q || w.user.toLowerCase().includes(q) || w.reason.toLowerCase().includes(q));
    if (!rows.length) { tb.innerHTML = '<tr class="empty-row"><td colspan="6">No warnings match that search.</td></tr>'; return; }
    tb.innerHTML = rows.map(w =>
      `<tr><td><div class="cell-user"><span class="avatar" data-seed="${w.seed}">${w.user.slice(0, 2).toUpperCase()}</span><b>${w.user}</b></div></td>` +
      `<td>${w.reason}</td>` +
      `<td><span class="tag ${w.sev}">${SEVLABEL[w.sev]}</span></td>` +
      `<td>${w.mod}</td>` +
      `<td class="td-muted">${w.when}</td>` +
      `<td><button class="row-act" title="Dismiss"><svg class="ic"><use href="#i-trash"/></svg></button></td></tr>`
    ).join('');
  }
  document.addEventListener('input', e => {
    if (e.target.id === 'warnSearch') renderWarnings(e.target.value);
    if (e.target.id === 'logSearch') renderTimeline(e.target.value);
  });
  document.addEventListener('click', e => {
    const act = e.target.closest('.row-act');
    if (!act) return;

    if (act.classList.contains('auto-del') || act.classList.contains('auto-rm')) return;
    const tr = act.closest('tr');
    if (!tr) return;
    tr.style.transition = 'opacity .25s, transform .25s';
    tr.style.opacity = 0;
    tr.style.transform = 'translateX(20px)';
    setTimeout(() => tr.remove(), 250);
    toast('Removed from view', 'i-check');
  });

  function renderAutomation() {
    const autos = [
      { trig: 'gm', resp: 'Good morning! ☀️ Hope you have a great day.', on: true },
      { trig: 'invite', resp: 'Here is our permanent invite: discord.gg/kozzyx', on: true },
      { trig: 'rules', resp: 'Please read the rules in #welcome before chatting.', on: true },
      { trig: 'ip', resp: 'Nice try 😏 — we don\'t share server IPs.', on: false },
      { trig: 'support', resp: 'Open a ticket in #get-help and staff will assist.', on: true }
    ];
    const al = $('#autoList');
    if (al) {
      al.innerHTML = autos.map(a =>
        `<li class="auto-item"><span class="auto-trigger">${a.trig}</span>` +
        `<svg class="ic auto-arrow"><use href="#i-right"/></svg>` +
        `<span class="auto-resp">${a.resp}</span>` +
        `<button class="switch ${a.on ? 'is-on' : ''}" role="switch" aria-checked="${a.on}"><span></span></button></li>`
      ).join('');
    }
    const sched = [
      { ic: 'i-message', name: 'Daily standup ping', sub: '#dev-chat', when: '09:00' },
      { ic: 'i-gift', name: 'Weekly giveaway', sub: '#events', when: 'Sun 18:00' },
      { ic: 'i-pin', name: 'Rules reminder', sub: '#general', when: 'Mon 12:00' },
      { ic: 'i-flame', name: 'Server stats drop', sub: '#analytics', when: '23:30' }
    ];
    const sl = $('#schedList');
    if (sl) {
      sl.innerHTML = sched.map(s =>
        `<li class="sched-item"><span class="sched-ic"><svg class="ic"><use href="#${s.ic}"/></svg></span>` +
        `<div class="sched-meta"><b>${s.name}</b><i>${s.sub}</i></div>` +
        `<span class="sched-when">${s.when}</span></li>`
      ).join('');
    }
  }

  function renderBoard() {
    const ppl = [
      { n: 'aria_', s: 'cosmic', lvl: 64, xp: 92, msg: '48.2k' },
      { n: 'kojiro', s: 'neon', lvl: 58, xp: 71, msg: '41.0k' },
      { n: 'lunar', s: 'dev', lvl: 52, xp: 40, msg: '37.6k' },
      { n: 'pixel_', s: 'arch', lvl: 47, xp: 88, msg: '29.1k' },
      { n: 'wren', s: 'cosmic', lvl: 43, xp: 22, msg: '24.8k' },
      { n: 'drift', s: 'neon', lvl: 39, xp: 55, msg: '21.3k' },
      { n: 'sable', s: 'dev', lvl: 35, xp: 67, msg: '18.0k' }
    ];
    $('#board').innerHTML = ppl.map((p, i) =>
      `<li class="board-row"><span class="board-rank">${i + 1}</span>` +
      `<span class="avatar" data-seed="${p.s}">${p.n.slice(0, 2).toUpperCase()}</span>` +
      `<span class="board-meta"><span class="board-name">${p.n}</span><span class="board-sub">${p.msg} messages</span></span>` +
      `<span class="board-lvl"><span class="lvl-txt">Level <b>${p.lvl}</b></span><span class="lvl-bar"><span data-w="${p.xp}"></span></span></span></li>`
    ).join('');
    $$('#board .lvl-bar span').forEach((s, i) => {
      const w = s.dataset.w + '%';
      if (REDUCED) s.style.width = w;
      else setTimeout(() => { s.style.width = w; }, 200 + i * 90);
    });
  }

  const LOGS = [
    { ic: 'i-ban', tone: 'danger', html: '<b>ckaz</b> banned <b>cipher</b>', meta: 'Reason: raid participation · today 14:22' },
    { ic: 'i-shield', tone: 'warn', html: '<b>aria_</b> warned <b>vex.exe</b>', meta: 'Reason: NSFW links · today 13:08' },
    { ic: 'i-sliders', tone: 'accent', html: '<b>ckaz</b> updated <b>auto-mod</b> settings', meta: 'Spam threshold 5 → 3 · today 11:40' },
    { ic: 'i-hash', tone: 'accent', html: '<b>wren</b> created channel <b>#season-4</b>', meta: 'Category: Events · today 09:15' },
    { ic: 'i-user-plus', tone: 'ok', html: '<b>aria_</b> added role <b>Moderator</b> to <b>lunar</b>', meta: 'yesterday 22:01' },
    { ic: 'i-mic', tone: 'violet', html: '<b>ckaz</b> moved 8 members out of <b>AFK</b>', meta: 'yesterday 20:33' },
    { ic: 'i-trash', tone: 'danger', html: '<b>wren</b> purged 64 messages in <b>#memes</b>', meta: 'yesterday 18:50' },
    { ic: 'i-gift', tone: 'ok', html: '<b>kozzyx</b> ended giveaway <b>Nitro x3</b>', meta: 'yesterday 18:00' }
  ];
  function renderTimeline(filter) {
    const tl = $('#timeline');
    if (!tl) return;
    const q = (filter || '').toLowerCase();

    if (Array.isArray(auditCache)) {
      const rows = auditCache.filter(l => !q
        || String(l.action || '').toLowerCase().includes(q)
        || String(l.target || '').toLowerCase().includes(q)
        || String(l.moderator || '').toLowerCase().includes(q)
        || String(l.reason || '').toLowerCase().includes(q));
      if (!rows.length) {
        tl.innerHTML = '<li class="cmdk-empty">' +
          (auditCache.length ? 'Nothing in the log matches that.' : 'No staff actions logged yet.') + '</li>';
        return;
      }
      tl.innerHTML = rows.map(l => {
        const danger = ['BAN', 'SOFTBAN', 'KICK'].includes(l.action);
        const when = l.timestamp ? new Date(l.timestamp).toLocaleString() : '—';
        return `<li class="tl-item"><span class="tl-node feed-ic ${danger ? 'danger' : 'warn'}"><svg class="ic"><use href="#${danger ? 'i-ban' : 'i-shield'}"/></svg></span>` +
          `<div class="tl-body"><p><b>${escapeHtml(l.moderator || 'Staff')}</b> · ${escapeHtml(l.action || 'MOD')} · <b>${escapeHtml(l.target || 'Unknown')}</b></p>` +
          `<div class="tl-meta">${escapeHtml(l.reason || 'No reason')} · ${escapeHtml(when)}${l.case != null ? ' · case #' + escapeHtml(String(l.case)) : ''}</div></div></li>`;
      }).join('');
      return;
    }

    const rows = LOGS.filter(l => !q || (l.html + l.meta).toLowerCase().includes(q));
    if (!rows.length) { tl.innerHTML = '<li class="cmdk-empty">Nothing in the log matches that.</li>'; return; }
    tl.innerHTML = rows.map(l =>
      `<li class="tl-item"><span class="tl-node feed-ic ${l.tone}"><svg class="ic"><use href="#${l.ic}"/></svg></span>` +
      `<div class="tl-body"><p>${l.html}</p><div class="tl-meta">${l.meta}</div></div></li>`
    ).join('');
  }

  $('#modelGrid').addEventListener('click', e => {
    const m = e.target.closest('.model');
    if (!m) return;
    $$('#modelGrid .model').forEach(x => x.classList.toggle('is-active', x === m));
    toast('Model set: ' + $('b', m).textContent, 'i-sparkles');
  });

  const ACCENTS = [
    { name: 'Dark Blue', ok: '0.55 0.2 260' },
    { name: 'Violet', ok: '0.62 0.2 295' },
    { name: 'Cyan', ok: '0.7 0.13 210' },
    { name: 'Emerald', ok: '0.7 0.16 160' },
    { name: 'Amber', ok: '0.78 0.15 75' },
    { name: 'Coral', ok: '0.68 0.18 25' },
    { name: 'Blush', ok: '0.72 0.13 350' }
  ];
  function buildSwatches() {
    const wrap = $('#swatches');
    let current = '0.55 0.2 260';
    try { current = localStorage.getItem('kzAccent') || current; } catch (e) {}
    wrap.innerHTML = ACCENTS.map(a =>
      `<button class="swatch${a.ok === current ? ' is-active' : ''}" title="${a.name}" ` +
      `style="background:oklch(${a.ok});color:oklch(${a.ok})" data-ok="${a.ok}"></button>`
    ).join('');
    wrap.addEventListener('click', e => {
      const sw = e.target.closest('.swatch');
      if (!sw) return;
      document.documentElement.style.setProperty('--accent-oklch', sw.dataset.ok);
      try { localStorage.setItem('kzAccent', sw.dataset.ok); } catch (er) {}
      $$('.swatch', wrap).forEach(x => x.classList.toggle('is-active', x === sw));
      toast('Accent updated', 'i-check');
    });
  }

  const cmdk = $('#cmdk'), cmdkInput = $('#cmdkInput'), cmdkList = $('#cmdkList');
  const COMMANDS = [
    { g: 'Navigate', i: 'i-grid', label: 'Go to Overview', run: () => go('overview') },
    { g: 'Navigate', i: 'i-shield', label: 'Go to Moderation', run: () => go('moderation') },
    { g: 'Navigate', i: 'i-zap', label: 'Go to Automation', run: () => go('automation') },
    { g: 'Navigate', i: 'i-sparkles', label: 'Go to AI Studio', run: () => go('ai') },
    { g: 'Navigate', i: 'i-users', label: 'Go to Members', run: () => go('members') },
    { g: 'Navigate', i: 'i-list', label: 'Go to Audit Log', run: () => go('logs') },
    { g: 'Navigate', i: 'i-sliders', label: 'Go to Settings', run: () => go('settings') },
    { g: 'Actions', i: 'i-moon', label: 'Toggle light / dark theme', run: () => $('#themeBtn').click() },
    { g: 'Actions', i: 'i-server', label: 'Collapse / expand sidebar', run: () => $('#collapseBtn').click() },
    { g: 'Actions', i: 'i-up', label: 'Export server report', run: () => toast('Report exported to #mod-logs', 'i-up') },
    { g: 'Actions', i: 'i-shield', label: 'Open a new moderation case', run: () => { go('moderation'); toast('New case opened', 'i-plus'); } },
    { g: 'Actions', i: 'i-refresh', label: 'Sync with Discord now', run: () => toast('Synced with Discord ✓', 'i-refresh') },
    { g: 'Actions', i: 'i-bell', label: 'Mute notifications for 1h', run: () => toast('Notifications muted for 1 hour', 'i-bell') }
  ];
  let cmdkActive = 0, cmdkFiltered = COMMANDS.slice();

  function renderCmdk() {
    const q = cmdkInput.value.toLowerCase().trim();
    cmdkFiltered = COMMANDS.filter(c => c.label.toLowerCase().includes(q));
    cmdkActive = 0;
    if (!cmdkFiltered.length) { cmdkList.innerHTML = '<div class="cmdk-empty">No matching commands</div>'; return; }
    let html = '', lastG = '';
    cmdkFiltered.forEach((c, i) => {
      if (c.g !== lastG) { html += `<div class="cmdk-group">${c.g}</div>`; lastG = c.g; }
      html += `<button class="cmdk-opt${i === 0 ? ' is-active' : ''}" data-i="${i}">` +
        `<svg class="ic"><use href="#${c.i}"/></svg><span>${c.label}</span>` +
        `<span class="opt-hint">↵</span></button>`;
    });
    cmdkList.innerHTML = html;
  }
  function cmdkSetActive(idx) {
    cmdkActive = (idx + cmdkFiltered.length) % cmdkFiltered.length;
    $$('.cmdk-opt', cmdkList).forEach((o, i) => o.classList.toggle('is-active', i === cmdkActive));
    const act = $('.cmdk-opt.is-active', cmdkList);
    if (act) act.scrollIntoView({ block: 'nearest' });
  }
  function openCmdk() {
    cmdk.removeAttribute('hidden');
    cmdkInput.value = '';
    renderCmdk();
    setTimeout(() => cmdkInput.focus(), 30);
  }
  function closeCmdk() { cmdk.setAttribute('hidden', ''); }
  function runCmdk(i) {
    const c = cmdkFiltered[i];
    if (!c) return;
    closeCmdk();
    setTimeout(c.run, 80);
  }
  $('#searchTrigger').addEventListener('click', openCmdk);
  $$('[data-cmdk]').forEach(b => b.addEventListener('click', openCmdk));
  $('#cmdkBackdrop').addEventListener('click', closeCmdk);
  cmdkInput.addEventListener('input', renderCmdk);
  cmdkList.addEventListener('click', e => {
    const o = e.target.closest('.cmdk-opt');
    if (o) runCmdk(+o.dataset.i);
  });
  cmdkInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdkSetActive(cmdkActive + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cmdkSetActive(cmdkActive - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); runCmdk(cmdkActive); }
  });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdk.hasAttribute('hidden') ? openCmdk() : closeCmdk();
    } else if (e.key === 'Escape') {
      if (!cmdk.hasAttribute('hidden')) closeCmdk();
      notifPop.setAttribute('hidden', '');
      srvMenu.setAttribute('hidden', '');
      closeModal();
    }
  });

  const toastWrap = $('#toasts');
  function toast(msg, icon) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span class="toast-ic"><svg class="ic"><use href="#${icon || 'i-check'}"/></svg></span>` +
      `<span>${msg}</span><span class="toast-bar"></span>`;
    toastWrap.appendChild(t);
    const bar = $('.toast-bar', t);
    if (bar && bar.animate && !REDUCED) {
      bar.style.width = '100%';
      bar.animate([{ width: '100%' }, { width: '0%' }], { duration: 3200, easing: 'linear' });
    }
    const kill = () => { t.classList.add('out'); setTimeout(() => t.remove(), 360); };
    const timer = setTimeout(kill, 3200);
    t.addEventListener('click', () => { clearTimeout(timer); kill(); });
    while (toastWrap.children.length > 4) toastWrap.removeChild(toastWrap.firstChild);
  }
  $$('[data-toast]').forEach(b => b.addEventListener('click', () => toast(b.dataset.toast)));

  if (!REDUCED) {
    document.addEventListener('pointerdown', e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const rip = document.createElement('span');
      rip.className = 'ripple';
      rip.style.width = rip.style.height = size + 'px';
      rip.style.left = (e.clientX - r.left) + 'px';
      rip.style.top = (e.clientY - r.top) + 'px';
      btn.appendChild(rip);
      rip.animate(
        [{ transform: 'translate(-50%,-50%) scale(0)', opacity: 0.4 },
         { transform: 'translate(-50%,-50%) scale(1)', opacity: 0 }],
        { duration: 600, easing: 'cubic-bezier(0.16,1,0.3,1)' }
      ).onfinish = () => rip.remove();
    });
  }

  if (!REDUCED && !TOUCH) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(680px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        card.style.transform = '';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
      card.addEventListener('pointerenter', () => { card.style.transition = 'transform 0.1s'; });
    });
  }

  if (!REDUCED && !TOUCH) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px,${y}px)`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
        btn.style.transform = '';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }

  (function () {
    let clicks = 0;
    $('#brandMark').addEventListener('click', () => {
      clicks++;
      if (clicks === 5) { toast('You found a quiet corner of kozzyx ✦', 'i-sparkles'); clicks = 0; }
    });
  })();

  const API_BASE = (window.KOZZ_CONFIG && window.KOZZ_CONFIG.API_BASE) || 'https://kozzyx.org';
  let authToken = localStorage.getItem('kz_token');
  let currentUser = JSON.parse(localStorage.getItem('kz_user') || 'null');
  let activeGuildId = localStorage.getItem('kz_guild_id') || null;
  let guildsCache = [];
  let commandsCache = null;
  let customCommandsCache = [];
  let channelsCache = [];
  let rolesCache = [];
  let giveawaysCache = [];
  let birthdaysCache = [];
  let membersCache = [];
  let triggersCache = [];
  let settingsCache = null;
  let appealsCache = [];
  let appealsFilter = 'pending';
  let pollTimer = null;
  let currentView = VIEW_LABEL[location.hash.slice(1)] ? location.hash.slice(1) : 'overview';

  function showGate() { document.documentElement.classList.remove('authed'); }
  function hideGate() { document.documentElement.classList.add('authed'); }

  function logoutLocal() {
    authToken = null; currentUser = null; activeGuildId = null; guildsCache = [];
    localStorage.removeItem('kz_token');
    localStorage.removeItem('kz_user');
    localStorage.removeItem('kz_guild_id');
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
    showGate();
    updateAuthUI();

    restartFeedSimulator();
  }

  function apiHeaders(extra) {
    const h = Object.assign({ 'Content-Type': 'application/json' }, extra || {});
    if (authToken) h['Authorization'] = 'Bearer ' + authToken;
    if (activeGuildId) h['x-guild-id'] = activeGuildId;
    return h;
  }
  async function apiFetch(path, opts) {
    opts = opts || {};
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    let res;
    try {
      res = await fetch(API_BASE + path, {
        method: opts.method || 'GET',
        headers: apiHeaders(opts.headers),
        body: opts.body != null ? JSON.stringify(opts.body) : undefined,
        signal: ctrl.signal
      });
    } catch (e) {
      clearTimeout(timer);
      if (!opts.silent) toast(e.name === 'AbortError' ? 'Request timed out' : 'Cannot reach the bot API', 'i-alert');
      throw e;
    }
    clearTimeout(timer);
    if (res.status === 401) {
      if (!opts.silent) toast('Session expired — please sign in again', 'i-alert');
      logoutLocal();
      throw new Error('unauthorized');
    }
    if (res.status === 403) {
      if (!opts.silent) toast("You don't have permission to manage this server", 'i-x');
      throw new Error('forbidden');
    }
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = (data && data.error) || ('HTTP ' + res.status);
      if (!opts.silent) toast(msg, 'i-x');
      throw new Error(msg);
    }
    return data;
  }

  async function checkAuth() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      toast('Signing in with Discord…', 'i-sparkles');
      try {
        const res = await fetch(`${API_BASE}/api/auth/callback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        }).then(r => r.json());
        if (res && res.token && res.user) {
          authToken = res.token;
          currentUser = res.user;
          localStorage.setItem('kz_token', authToken);
          localStorage.setItem('kz_user', JSON.stringify(currentUser));
          hideGate();
          toast(`Welcome, ${currentUser.username}!`, 'i-check');
          updateAuthUI();
          initRealDashboard();
        } else {
          showGate();
          toast((res && res.error) || 'Login failed', 'i-x');
        }
      } catch (err) {
        showGate();
        toast('Could not reach the bot API', 'i-alert');
      }
      return;
    }
    if (!authToken) { showGate(); updateAuthUI(); return; }
    hideGate(); updateAuthUI(); initRealDashboard();
  }

  function loginWithDiscord() {
    if (authToken) {
      if (confirm('Log out of the dashboard?')) { logoutLocal(); toast('Logged out', 'i-check'); }
      return;
    }
    fetch(`${API_BASE}/api/auth/login`)
      .then(r => r.json())
      .then(data => {
        if (data && data.url) window.location.href = data.url;
        else toast('Failed to get login URL', 'i-x');
      })
      .catch(() => toast('Cannot reach the bot API', 'i-alert'));
  }

  function updateAuthUI() {
    const chip = $('#userChip'), av = $('#avatarBtn');
    if (!authToken || !currentUser) {
      if (chip) {
        $('.user-name', chip).textContent = 'Sign in';
        $('.user-role', chip).textContent = 'Click to connect';
        $('.avatar', chip).textContent = '?';
      }
      if (av) av.textContent = '?';

      const greet = $('#greeting');
      if (greet) {
        const h = new Date().getHours();
        const g = h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
        greet.textContent = g;
      }
      return;
    }
    const initials = (currentUser.username || '?').slice(0, 2).toUpperCase();
    if (chip) {
      $('.user-name', chip).textContent = currentUser.username;
      $('.user-role', chip).textContent = currentUser.isOwner ? 'owner' : 'admin';
      $('.avatar', chip).textContent = initials;
    }
    if (av) av.textContent = initials;

    const greet = $('#greeting');
    if (greet) {
      const h = new Date().getHours();
      const g = h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
      greet.textContent = g + ', ' + currentUser.username;
    }
  }

  async function initRealDashboard() {
    if (!authToken) return;
    let guilds;
    try { guilds = await apiFetch('/api/auth/guilds'); }
    catch (e) { return; }
    if (!Array.isArray(guilds) || guilds.length === 0) {
      toast('No servers you can manage were found', 'i-alert');
      return;
    }
    guildsCache = guilds;
    if (!activeGuildId || !guilds.find(g => g.id === activeGuildId)) activeGuildId = guilds[0].id;
    localStorage.setItem('kz_guild_id', activeGuildId);
    renderServerMenu();
    loadViewData(currentView);
    startPolling();
  }

  function activeGuild() {
    return guildsCache.find(g => g.id === activeGuildId) || guildsCache[0] || null;
  }

  function renderServerMenu() {
    const srvMenu = $('#srvMenu'), srvBtn = $('#serverSwitcher');
    if (!srvMenu || !srvBtn) return;
    const g = activeGuild();
    if (g) {
      $('.srv-name', srvBtn).textContent = g.name;
      $('.srv-sub', srvBtn).textContent = g.memberCount ? `${g.memberCount.toLocaleString()} members` : 'connected';
      $('.srv-avatar', srvBtn).textContent = g.name.slice(0, 2).toUpperCase();
    }
    let html = '<div class="srv-menu-head mono">switch server</div>';
    guildsCache.forEach(gg => {
      html += `<button type="button" class="srv-opt ${gg.id === activeGuildId ? 'is-active' : ''}" data-id="${escapeHtml(gg.id)}">` +
        `<span class="srv-avatar">${escapeHtml(gg.name.slice(0, 2).toUpperCase())}</span>` +
        `<span class="srv-name">${escapeHtml(gg.name)}</span>` +
        `<svg class="ic tick"><use href="#i-check"/></svg></button>`;
    });
    html += '<button type="button" class="srv-add" id="srvAddBtn"><svg class="ic"><use href="#i-plus"/></svg> Add a server</button>';
    srvMenu.innerHTML = html;
  }

  function switchGuild(id) {
    if (!id || id === activeGuildId) return;
    activeGuildId = id;
    localStorage.setItem('kz_guild_id', id);
    renderServerMenu();
    const g = activeGuild();
    if (g) toast('Switched to ' + g.name, 'i-server');
    loadViewData(currentView);
  }

  function syncGuildLabels() {
    const g = activeGuild();
    if (!g) return;
    $$('.js-guild').forEach(el => { el.textContent = g.name; });
  }

  async function loadViewData(view) {
    currentView = view;
    if (!authToken || !activeGuildId) return;
    syncGuildLabels();
    try {
      if (view === 'overview') await loadOverview();
      else if (view === 'moderation') await loadModeration();
      else if (view === 'security') await loadSecurity();
      else if (view === 'commands') await loadCommands();
      else if (view === 'automation') await loadAutomation();
      else if (view === 'tickets') await loadTickets();
      else if (view === 'voice') await loadVoice();
      else if (view === 'ai') await loadAi();
      else if (view === 'members') await loadMembers();
      else if (view === 'social') await loadSocial();
      else if (view === 'logs') await loadLogs();
      else if (view === 'appeals') await loadAppeals();
      else if (view === 'settings') await loadSettings();
    } catch (e) {  }
  }

  function formatUptime(secs) {
    secs = Number(secs) || 0;
    const d = Math.floor(secs / 86400), h = Math.floor((secs % 86400) / 3600), m = Math.floor((secs % 3600) / 60);
    if (d) return `${d}d ${h}h`;
    if (h) return `${h}h ${m}m`;
    return `${m}m`;
  }
  function setStat(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.dataset.count = value;
    el.dataset.done = '';
    countUp(el);
  }

  async function loadOverview() {
    const stats = await apiFetch('/api/stats');
    setStat('statMembers', stats.guildMembers || 0);
    setStat('statOnline', stats.guildOnline || 0);
    setStat('statCommands', stats.commandsRan || 0);
    const ping = $('#hlPing'); if (ping) ping.textContent = (stats.ping >= 0 ? stats.ping : '—') + ' ms';
    const up = $('#hlUptime'); if (up) up.textContent = formatUptime(stats.uptime);
    const mem = $('#hlMemory'); if (mem) mem.textContent = stats.sys && stats.sys.memory != null ? stats.sys.memory + ' MB' : '—';
    renderSpecs(stats);
    try {
      const logs = await apiFetch('/api/modlogs', { silent: true });
      if (Array.isArray(logs)) setStat('statMod', logs.length);
    } catch (e) { }
    try {
      const plugins = await apiFetch('/api/plugins', { silent: true });
      renderPlugins(plugins || {});
    } catch (e) { }
    refreshFeed();
  }

  function renderSpecs(s) {
    const el = $('#serverSpecs');
    if (!el) return;
    const verify = { '0': 'None', '1': 'Low', '2': 'Medium', '3': 'High', '4': 'Highest' };
    const items = [
      ['Server name', s.guildName || '—'],
      ['Server ID', s.guildId || '—'],
      ['Members', (s.guildMembers || 0).toLocaleString()],
      ['Online now', (s.guildOnline || 0).toLocaleString()],
      ['Bots', (s.guildBots || 0).toLocaleString()],
      ['Text channels', (s.guildTextChannels || 0).toLocaleString()],
      ['Voice channels', (s.guildVoiceChannels || 0).toLocaleString()],
      ['Roles', (s.guildRoles || 0).toLocaleString()],
      ['Emojis', (s.guildEmojis || 0).toLocaleString()],
      ['Boost tier', 'Tier ' + (s.guildBoostTier || 0)],
      ['Boosts', (s.guildBoostCount || 0).toLocaleString()],
      ['Verification', verify[String(s.guildVerification)] || s.guildVerification || '—'],
      ['Owner', s.guildOwner || '—'],
      ['Created', s.guildCreated ? new Date(s.guildCreated).toLocaleDateString() : '—']
    ];
    el.innerHTML = items.map(([k, v]) =>
      `<div class="spec"><span class="spec-k">${escapeHtml(k)}</span><span class="spec-v">${escapeHtml(v)}</span></div>`
    ).join('');
  }

  const PLUGIN_META = {
    conversation_memory: { name: 'Conversation memory', desc: 'AI remembers context per user', ic: 'i-sparkles' },
    ai_moderation: { name: 'AI moderation', desc: 'AI-assisted content moderation', ic: 'i-shield' },
    dynamic_vc: { name: 'Dynamic voice channels', desc: 'Auto-create temporary VCs', ic: 'i-mic' },
    invite_tracking: { name: 'Invite tracking', desc: 'Track who invited each member', ic: 'i-user-plus' },
    anti_raid: { name: 'Anti-raid', desc: 'Detect and stop join raids', ic: 'i-shield' },
    appeals: { name: 'Ban appeals', desc: 'Let banned users submit appeals', ic: 'i-ticket' },
    audit_log: { name: 'Audit log', desc: 'Record staff actions', ic: 'i-list' }
  };
  function renderPlugins(plugins) {
    const list = $('#pluginList');
    if (!list) return;
    list.innerHTML = Object.keys(PLUGIN_META).map(k => {
      const on = plugins[k] === true, m = PLUGIN_META[k];
      return `<li class="plugin"><span class="plugin-ic"><svg class="ic"><use href="#${m.ic}"/></svg></span>` +
        `<span class="plugin-meta"><b>${escapeHtml(m.name)}</b><i>${escapeHtml(m.desc)}</i></span>` +
        `<button type="button" class="switch ${on ? 'is-on' : ''}" data-plugin="${k}" role="switch" aria-checked="${on}"><span></span></button></li>`;
    }).join('');
  }

  async function refreshFeed() {
    const feed = $('#liveFeed');
    if (!feed || !authToken || !activeGuildId) return;
    let events;
    try { events = await apiFetch('/api/feed', { silent: true }); }
    catch (e) { return; }
    if (!Array.isArray(events)) return;
    if (feedSimTimer) { clearInterval(feedSimTimer); feedSimTimer = null; }
    if (!events.length) {
      feed.innerHTML = '<li class="feed-item"><div class="feed-body"><p>No recent activity yet — run a command in Discord.</p><time>—</time></div></li>';
      return;
    }
    const ICON = {
      command: { ic: 'i-command', tone: 'accent' },
      join: { ic: 'i-user-plus', tone: 'ok' },
      mod: { ic: 'i-shield', tone: 'warn' }
    };
    feed.innerHTML = events.slice(0, 8).map(ev => {
      const m = ICON[ev.kind] || { ic: 'i-activity', tone: 'accent' };
      const t = new Date(ev.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `<li class="feed-item"><span class="feed-ic ${m.tone}"><svg class="ic"><use href="#${m.ic}"/></svg></span>` +
        `<div class="feed-body"><p>${escapeHtml(ev.text)}</p><time>${escapeHtml(t)}</time></div></li>`;
    }).join('');
  }

  async function loadModeration() {
    let logs;
    try { logs = await apiFetch('/api/modlogs'); }
    catch (e) { return; }
    modlogCache = Array.isArray(logs) ? logs : [];
    renderWarnings($('#warnSearch') ? $('#warnSearch').value : '');
    const minis = $$('.mini-grid .stat-num');
    const setMini = (i, v) => { if (minis[i]) { minis[i].dataset.count = v; minis[i].dataset.done = ''; countUp(minis[i]); } };
    setMini(0, modlogCache.filter(l => l.action === 'WARN').length);
    setMini(1, modlogCache.filter(l => ['BAN', 'SOFTBAN'].includes(l.action)).length);
    setMini(2, modlogCache.filter(l => ['TIMEOUT', 'MUTE'].includes(l.action)).length);
    setMini(3, modlogCache.length);
    const badge = $('#modBadge');
    if (badge) {
      if (modlogCache.length) { badge.textContent = modlogCache.length > 99 ? '99+' : modlogCache.length; badge.hidden = false; }
      else badge.hidden = true;
    }
  }

  async function loadCommands() {
    try {
      commandsCache = await apiFetch('/api/commands');
    } catch (e) { commandsCache = null; }
    try {
      customCommandsCache = await apiFetch('/api/custom-commands');
    } catch (e) { customCommandsCache = []; }
    const filter = ($('#cmdSearch') ? $('#cmdSearch').value : '');
    renderCommands(filter);
    renderCustomCommands(filter);
  }

  function renderCustomCommands(filter) {
    const list = $('#customCmdList');
    if (!list) return;
    if (!Array.isArray(customCommandsCache)) {
      list.innerHTML = '<li class="cmd-loading">Connect a server to load custom commands…</li>';
      return;
    }
    const q = (filter || '').toLowerCase();
    const rows = customCommandsCache.filter(c => !q || c.name.toLowerCase().includes(q) || (c.response || '').toLowerCase().includes(q));

    let html = rows.map(c =>
      `<li class="auto-item" data-id="${escapeHtml(String(c.id))}"><span class="auto-trigger">/${escapeHtml(c.name)}</span>` +
      `<svg class="ic auto-arrow"><use href="#i-right"/></svg>` +
      `<span class="auto-resp">${escapeHtml(c.response)}</span>` +
      `<button type="button" class="row-act custom-cmd-del" title="Delete"><svg class="ic"><use href="#i-trash"/></svg></button></li>`
    ).join('');

    html += '<li class="auto-add">' +
      '<input type="text" id="newCustomCmdName" placeholder="command name (e.g. store)" style="min-width: 140px; padding: 8px 11px; border: 1px solid var(--line); border-radius: var(--r-sm); background: var(--bg-elev); color: var(--fg); font-size: 13px;">' +
      '<input type="text" id="newCustomCmdResponse" placeholder="response text" style="flex: 1; padding: 8px 11px; border: 1px solid var(--line); border-radius: var(--r-sm); background: var(--bg-elev); color: var(--fg); font-size: 13px;">' +
      '<button type="button" class="btn btn-accent" id="addCustomCmdBtn">Add</button></li>';

    list.innerHTML = html;
  }
  function renderCommands(filter) {
    const wrap = $('#cmdGroups');
    if (!wrap || !commandsCache) return;
    const q = (filter || '').toLowerCase();
    const groups = [
      ['Slash commands', 'slash', commandsCache.slash || []],
      ['Prefix commands', 'prefix', commandsCache.prefix || []]
    ];
    let html = '';
    groups.forEach(([label, type, list]) => {
      const rows = list.filter(c => !q || c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
      html += `<div class="cmd-group"><div class="cmd-group-head">${escapeHtml(label)} <span class="cmd-count">${rows.length}</span></div>`;
      if (!rows.length) {
        html += '<div class="cmd-empty">No commands match.</div>';
      } else {
        rows.forEach(c => {
          const on = c.enabled !== false;
          html += `<div class="cmd-row${on ? '' : ' is-off'}" data-type="${type}" data-name="${escapeHtml(c.name)}">` +
            `<div class="cmd-info"><b>${type === 'slash' ? '/' : ''}${escapeHtml(c.name)}</b>` +
            `<i>${escapeHtml(c.description || 'No description')}</i></div>` +
            `<div class="cmd-ctl">` +
            `<label class="cmd-cd">cd <input type="number" min="0" class="cmd-cd-input" value="${Number(c.cooldown) || 0}">s</label>` +
            (type === 'prefix' ? '<button type="button" class="btn btn-ghost cmd-run">Run</button>' : '') +
            `<button type="button" class="switch ${on ? 'is-on' : ''}" data-cmd="1" role="switch" aria-checked="${on}"><span></span></button>` +
            `</div></div>`;
        });
      }
      html += '</div>';
    });
    wrap.innerHTML = html;
  }

  async function loadAutomation() {
    let triggers = [];
    try { triggers = await apiFetch('/api/triggers'); } catch (e) { }
    triggersCache = Array.isArray(triggers) ? triggers : [];
    renderAutoresponders();

    let autos = [];
    try { autos = await apiFetch('/api/automations', { silent: true }); } catch (e) { }
    renderScheduled(Array.isArray(autos) ? autos : []);

    try {
      channelsCache = await apiFetch('/api/channels', { silent: true });
      populateGiveawayChannels();
    } catch (e) { }

    try {
      giveawaysCache = await apiFetch('/api/giveaways', { silent: true });
    } catch (e) { giveawaysCache = []; }
    renderGiveaways();
  }

  function populateGiveawayChannels() {
    const sel = $('#newGiveawayChannel');
    if (!sel || !Array.isArray(channelsCache)) return;
    sel.innerHTML = '<option value="">Select Channel</option>' + channelsCache
      .filter(ch => ch.type === 0 || ch.type === 5)
      .map(ch => `<option value="${escapeHtml(ch.id)}">#${escapeHtml(ch.name)}</option>`)
      .join('');
  }

  function renderGiveaways() {
    const gl = $('#giveawayList');
    if (!gl) return;
    if (!Array.isArray(giveawaysCache) || !giveawaysCache.length) {
      gl.innerHTML = '<li class="sched-item"><div class="sched-meta"><b>No active giveaways</b><i>Create one using the form below</i></div></li>';
      return;
    }
    gl.innerHTML = giveawaysCache.map(g => {
      const channel = Array.isArray(channelsCache) ? channelsCache.find(ch => ch.id === g.channel_id) : null;
      const chName = channel ? '#' + channel.name : 'Unknown Channel';
      const ends = g.end_time ? new Date(g.end_time).toLocaleString() : '—';
      const status = Date.now() > g.end_time ? 'Ended' : 'Active';
      return `<li class="sched-item" data-id="${escapeHtml(String(g.id))}">` +
        `<span class="sched-ic" style="background:var(--accent-soft);color:var(--accent);"><svg class="ic"><use href="#i-gift"/></svg></span>` +
        `<div class="sched-meta"><b>${escapeHtml(g.prize)}</b>` +
        `<i>${escapeHtml(chName)} · ${escapeHtml(g.winners)} winner(s) · Status: ${status}</i></div>` +
        `<span class="sched-when">${escapeHtml(ends)}</span></li>`;
    }).join('');
  }
  function renderAutoresponders() {
    const al = $('#autoList');
    if (!al) return;
    let html = triggersCache.map(a =>
      `<li class="auto-item" data-trigger="${escapeHtml(a.trigger)}"><span class="auto-trigger">${escapeHtml(a.trigger)}</span>` +
      `<svg class="ic auto-arrow"><use href="#i-right"/></svg>` +
      `<span class="auto-resp">${escapeHtml(a.response)}</span>` +
      `<button type="button" class="row-act auto-del" title="Delete"><svg class="ic"><use href="#i-trash"/></svg></button></li>`
    ).join('');
    html += '<li class="auto-add">' +
      '<input type="text" id="newTrigger" placeholder="trigger word">' +
      '<input type="text" id="newResponse" placeholder="response text">' +
      '<button type="button" class="btn btn-accent" id="addTriggerBtn">Add</button></li>';
    al.innerHTML = html;
  }
  function renderScheduled(autos) {
    const sl = $('#schedList');
    if (!sl) return;
    if (!autos.length) {
      sl.innerHTML = '<li class="sched-item"><div class="sched-meta"><b>No automations yet</b><i>Create them with the bot</i></div></li>';
      return;
    }
    sl.innerHTML = autos.map(a =>
      `<li class="sched-item" data-id="${escapeHtml(String(a.id))}"><span class="sched-ic"><svg class="ic"><use href="#i-zap"/></svg></span>` +
      `<div class="sched-meta"><b>${escapeHtml(a.trigger_type || 'trigger')} → ${escapeHtml(a.action_type || 'action')}</b>` +
      `<i>${escapeHtml(a.trigger_data || '')}</i></div>` +
      `<button type="button" class="row-act auto-rm" title="Delete"><svg class="ic"><use href="#i-trash"/></svg></button></li>`
    ).join('');
  }

  const AI_COMMANDS = ['ask', 'imagine', 'translate', 'summarize', 'roast', 'generate_rules', 'clear_memory', 'define'];
  async function loadAi() {
    if (!commandsCache) {
      try { commandsCache = await apiFetch('/api/commands'); } catch (e) { return; }
    }
    const slashNames = (commandsCache.slash || []).map(c => c.name);
    const all = [].concat(commandsCache.slash || [], commandsCache.prefix || []);
    const ai = all.filter(c => AI_COMMANDS.includes(c.name));
    const grid = $('#modelGrid');
    if (grid) {
      grid.innerHTML = ai.length ? ai.map(c => {
        const type = slashNames.includes(c.name) ? 'slash' : 'prefix';
        const on = c.enabled !== false;
        return `<div class="cmd-row${on ? '' : ' is-off'}" data-type="${type}" data-name="${escapeHtml(c.name)}">` +
          `<div class="cmd-info"><b>/${escapeHtml(c.name)}</b><i>${escapeHtml(c.description || '')}</i></div>` +
          `<div class="cmd-ctl"><button type="button" class="switch ${on ? 'is-on' : ''}" data-cmd="1" role="switch" aria-checked="${on}"><span></span></button></div></div>`;
      }).join('') : '<div class="cmd-empty">No AI commands found.</div>';
    }

    if (ai.length && $('#aiDonut')) {
      const enabled = ai.filter(c => c.enabled !== false).length;
      buildDonut($('#aiDonut'), $('#aiLegend'), [
        { label: 'Enabled', value: Math.max(enabled, 0.0001), color: 'var(--ok)' },
        { label: 'Disabled', value: Math.max(ai.length - enabled, 0.0001), color: 'var(--warn)' }
      ]);
    }
  }

  async function loadMembers() {
    let members;
    try { members = await apiFetch('/api/members'); }
    catch (e) { return; }
    membersCache = Array.isArray(members) ? members : [];
    renderMembers(membersCache);

    populateBirthdayUsers();

    try {
      birthdaysCache = await apiFetch('/api/birthdays', { silent: true });
    } catch (e) { birthdaysCache = []; }
    renderBirthdays();

    try {
      const hist = await apiFetch('/api/history', { silent: true });
      if (hist && Array.isArray(hist.growth) && hist.growth.length) {
        buildChart($('#growthChart'), {
          labels: hist.growth.map((_, i) => 'D' + (i + 1)),
          series: [{ name: 'Members', color: 'var(--accent)', values: hist.growth }]
        });
      }
    } catch (e) { }
  }

  function populateBirthdayUsers() {
    const sel = $('#newBirthdayUser');
    if (!sel || !Array.isArray(membersCache)) return;
    sel.innerHTML = '<option value="">Select Member</option>' + membersCache
      .filter(m => !m.bot)
      .map(m => `<option value="${escapeHtml(m.id)}">${escapeHtml(m.username)}</option>`)
      .join('');
  }

  function renderBirthdays() {
    const bl = $('#birthdayList');
    if (!bl) return;
    if (!Array.isArray(birthdaysCache) || !birthdaysCache.length) {
      bl.innerHTML = '<li class="sched-item"><div class="sched-meta"><b>No birthdays registered</b><i>Register one using the form below</i></div></li>';
      return;
    }
    bl.innerHTML = birthdaysCache.map(b => {
      let dateStr = b.birthday || '';
      if (dateStr.length === 10) {
        const parts = dateStr.split('-');
        const d = new Date(parts[0], parts[1]-1, parts[2]);
        dateStr = d.toLocaleDateString([], { month: 'long', day: 'numeric' });
      }
      const user = Array.isArray(membersCache) ? membersCache.find(m => m.id === b.user_id) : null;
      const username = user ? user.username : (b.username || 'User ' + b.user_id);
      return `<li class="sched-item" data-user-id="${escapeHtml(String(b.user_id))}"><span class="sched-ic" style="background:var(--ok-soft);color:var(--ok);"><svg class="ic"><use href="#i-user-plus"/></svg></span>` +
        `<div class="sched-meta"><b>${escapeHtml(username)}</b>` +
        `<i>Birthday: ${escapeHtml(dateStr)}</i></div>` +
        `<button type="button" class="row-act birthday-del" title="Delete"><svg class="ic"><use href="#i-trash"/></svg></button></li>`;
    }).join('');
  }
  function renderMembers(members) {
    const board = $('#board');
    if (!board) return;
    if (!members.length) { board.innerHTML = '<li class="board-row">No members loaded.</li>'; return; }
    const sorted = members.slice().sort((a, b) => new Date(a.joinedAt || 0) - new Date(b.joinedAt || 0));
    board.innerHTML = sorted.slice(0, 60).map((m, i) => {
      const roles = (m.roles || []).slice(0, 3).map(r => escapeHtml(r.name)).join(', ') || 'No roles';
      const joined = m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : '—';
      return `<li class="board-row" data-id="${escapeHtml(m.id)}">` +
        `<span class="board-rank">${i + 1}</span>` +
        `<span class="avatar">${escapeHtml((m.username || '?').slice(0, 2).toUpperCase())}</span>` +
        `<span class="board-meta"><span class="board-name">${escapeHtml(m.username || 'Unknown')}` +
        (m.bot ? ' <em class="bot-tag">BOT</em>' : '') + `</span>` +
        `<span class="board-sub">${roles} · joined ${escapeHtml(joined)}</span></span>` +
        `<span class="member-acts">` +
        `<button type="button" class="btn btn-ghost mem-act" data-act="TIMEOUT">Timeout</button>` +
        `<button type="button" class="btn btn-ghost mem-act" data-act="KICK">Kick</button>` +
        `<button type="button" class="btn btn-danger-ghost mem-act" data-act="BAN">Ban</button>` +
        `</span></li>`;
    }).join('');
  }

  async function loadLogs() {
    let logs;
    try { logs = await apiFetch('/api/modlogs'); }
    catch (e) { return; }
    auditCache = Array.isArray(logs) ? logs : [];
    renderTimeline($('#logSearch') ? $('#logSearch').value : '');
  }

  async function loadAppeals() {
    let rows;
    try { rows = await apiFetch('/api/appeals?status=' + appealsFilter); }
    catch (e) { return; }
    appealsCache = Array.isArray(rows) ? rows : [];
    renderAppeals();
    if (appealsFilter === 'pending') {
      const badge = $('#appealsBadge');
      if (badge) {
        badge.textContent = appealsCache.length > 99 ? '99+' : String(appealsCache.length);
        badge.hidden = appealsCache.length === 0;
      }
    }
  }

  function appealTimeAgo(ts) {
    const secs = Math.floor((Date.now() - Number(ts)) / 1000);
    if (secs < 60) return secs + 's ago';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    return Math.floor(hrs / 24) + 'd ago';
  }

  function renderAppeals() {
    const tbody = $('#appealsTable tbody');
    if (!tbody) return;
    if (!appealsCache.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="cmd-loading">No ' + appealsFilter + ' appeals.</td></tr>';
      return;
    }
    tbody.innerHTML = appealsCache.map(a => {
      const statusClass = a.status === 'accepted' ? 'low' : a.status === 'rejected' ? 'high' : 'med';
      const statusLabel = a.status === 'accepted' ? 'Accepted' : a.status === 'rejected' ? 'Rejected' : 'Pending';
      const actions = a.status === 'pending'
        ? '<button type="button" class="btn btn-sm btn-accent appeal-accept" data-id="' + escapeHtml(String(a.id)) + '">Accept</button>' +
          '<button type="button" class="btn btn-sm btn-danger-ghost appeal-reject" data-id="' + escapeHtml(String(a.id)) + '" style="margin-left:6px">Reject</button>'
        : '';
      return '<tr>' +
        '<td class="mono">' + escapeHtml(String(a.user_id)) + '</td>' +
        '<td>' + escapeHtml(a.reason || '—') + '</td>' +
        '<td style="color:var(--fg-dim);white-space:nowrap">' + appealTimeAgo(a.created_at) + '</td>' +
        '<td><span class="tag ' + statusClass + '">' + statusLabel + '</span></td>' +
        '<td style="white-space:nowrap">' + actions + '</td>' +
        '</tr>';
    }).join('');
  }

  async function loadSettings() {
    try {
      const cfg = await apiFetch('/api/config', { silent: true });
      if (cfg && cfg.prefix) { const p = $('#cfgPrefix'); if (p) p.value = cfg.prefix; }
    } catch (e) { }
    try {
      channelsCache = await apiFetch('/api/channels', { silent: true });
    } catch (e) { }
    try {
      rolesCache = await apiFetch('/api/roles', { silent: true });
    } catch (e) { }

    let s;
    try { s = await apiFetch('/api/settings'); } catch (e) { return; }
    settingsCache = s || {};

    const popSelect = (id, selectedValue, filterFn) => {
      const sel = $(id);
      if (!sel) return;
      let html = '<option value="">None (Disabled)</option>';
      if (Array.isArray(channelsCache)) {
        const filtered = filterFn ? channelsCache.filter(filterFn) : channelsCache;
        html += filtered.map(ch => `<option value="${escapeHtml(ch.id)}"${ch.id === selectedValue ? ' selected' : ''}>#${escapeHtml(ch.name)}</option>`).join('');
      } else if (selectedValue) {
        html += `<option value="${escapeHtml(selectedValue)}" selected>${escapeHtml(selectedValue)}</option>`;
      }
      sel.innerHTML = html;
    };

    popSelect('#cfgAppealsChannel', s.appealsChannelId, ch => ch.type === 0 || ch.type === 5);
    popSelect('#cfgCaseChannel', s.caseChannelId, ch => ch.type === 0 || ch.type === 5);
    popSelect('#cfgTicketChannel', s.ticketPanelChannelId, ch => ch.type === 0 || ch.type === 5);
  }

  async function ensureCommonData() {
    if (!channelsCache.length) {
      try { channelsCache = await apiFetch('/api/channels', { silent: true }); } catch (e) { }
    }
    if (!rolesCache.length) {
      try { rolesCache = await apiFetch('/api/roles', { silent: true }); } catch (e) { }
    }
  }

  async function loadSecurity() {
    await ensureCommonData();
    let s;
    try { s = await apiFetch('/api/settings'); } catch (e) { return; }
    settingsCache = s || {};
    renderSecurityConfig(s);
  }

  async function loadTickets() {
    await ensureCommonData();
    let s;
    try { s = await apiFetch('/api/settings'); } catch (e) { return; }
    settingsCache = s || {};
    renderTicketsConfig(s);
  }

  async function loadVoice() {
    await ensureCommonData();
    let s;
    try { s = await apiFetch('/api/settings'); } catch (e) { return; }
    settingsCache = s || {};
    renderVoiceConfig(s);
  }

  async function loadSocial() {
    await ensureCommonData();
    let s;
    try { s = await apiFetch('/api/settings'); } catch (e) { return; }
    settingsCache = s || {};
    renderSocialConfig(s);
  }

  function buildChannelOptions(selectedValue, filterFn, allowEmpty = true) {
    let html = allowEmpty ? '<option value="">None (Disabled)</option>' : '';
    if (Array.isArray(channelsCache)) {
      const filtered = filterFn ? channelsCache.filter(filterFn) : channelsCache;
      html += filtered.map(ch => `<option value="${escapeHtml(ch.id)}"${ch.id === selectedValue ? ' selected' : ''}>#${escapeHtml(ch.name)}</option>`).join('');
    } else if (selectedValue) {
      html += `<option value="${escapeHtml(selectedValue)}" selected>${escapeHtml(selectedValue)}</option>`;
    }
    return html;
  }

  function buildRoleOptions(selectedValue, allowEmpty = true) {
    let html = allowEmpty ? '<option value="">None (Disabled)</option>' : '';
    if (Array.isArray(rolesCache)) {
      html += rolesCache.map(r => `<option value="${escapeHtml(r.id)}"${r.id === selectedValue ? ' selected' : ''}>@${escapeHtml(r.name)}</option>`).join('');
    } else if (selectedValue) {
      html += `<option value="${escapeHtml(selectedValue)}" selected>${escapeHtml(selectedValue)}</option>`;
    }
    return html;
  }

  function renderSecurityConfig(s) {
    const el = $('#securityConfig');
    if (!el) return;
    const ar = s.antiRaid || {};
    const badwords = Array.isArray(s.badWords) ? s.badWords.join(', ') : '';
    el.innerHTML =
      '<article class="card reveal" style="--i:1">' +
      '  <div class="card-head"><div><h2>🛡️ Anti-Raid & Security</h2><p class="card-sub">Protect server from rapid join spikes and mass mentions</p></div></div>' +
      '  <div style="margin-bottom:12px;">' +
      '    <li class="plugin" style="list-style:none; padding:0; display:flex; justify-content:space-between; align-items:center;">' +
      '      <span class="plugin-meta" style="flex:1;"><b>Enable Anti-Raid</b></span>' +
      `      <button type="button" class="switch ${s.plugins && s.plugins.anti_raid ? 'is-on' : ''}" id="cfgAntiRaidToggle" role="switch" aria-checked="${s.plugins && s.plugins.anti_raid ? 'true' : 'false'}"><span></span></button>` +
      '    </li>' +
      '  </div>' +
      '  <div class="field-grid">' +
      `    <label class="field"><span>Join threshold (joins)</span><input type="number" id="arThreshold" min="2" value="${Number(ar.threshold) || 10}"></label>` +
      `    <label class="field"><span>Window (seconds)</span><input type="number" id="arWindow" min="5" value="${Math.round((Number(ar.windowMs) || 60000) / 1000)}"></label>` +
      `    <label class="field"><span>Action on trigger</span><select id="arAction">${['lockdown', 'kick', 'ban'].map(o => `<option value="${o}"${ar.action === o ? ' selected' : ''}>${o}</option>`).join('')}</select></label>` +
      `    <label class="field"><span>Min account age (days)</span><input type="number" id="arMinAge" min="0" value="${ar.minAccountAgeMs ? Math.round(ar.minAccountAgeMs / 86400000) : 0}"></label>` +
      `    <label class="field"><span>Mass-mention limit</span><input type="number" id="arMention" min="0" value="${Number(ar.massMentionThreshold) || 0}"></label>` +
      `    <label class="field"><span>Timeout (minutes)</span><input type="number" id="arMentionTimeout" min="1" value="${ar.massMentionTimeoutMs ? Math.round(ar.massMentionTimeoutMs / 60000) : 10}"></label>` +
      `    <label class="field"><span>Alert channel</span><select id="arAlertChannel">${buildChannelOptions(ar.alertChannelId, ch => ch.type === 0 || ch.type === 5)}</select></label>` +
      '  </div>' +
      '</article>' +
      '<article class="card reveal" style="--i:2">' +
      '  <div class="card-head"><div><h2>🚫 Bad Words Filter</h2><p class="card-sub">Blocked words (comma-separated)</p></div></div>' +
      `  <label class="field"><input type="text" id="cfgBadwords" value="${escapeHtml(badwords)}"></label>` +
      '</article>';
  }

  function renderTicketsConfig(s) {
    const el = $('#ticketsConfig');
    if (!el) return;
    const autoCloseMins = s.ticket && s.ticket.autoCloseMs ? Math.round(s.ticket.autoCloseMs / 60000) : 0;
    el.innerHTML =
      '<article class="card reveal" style="--i:1">' +
      '  <div class="card-head"><div><h2>🎫 Support Tickets</h2><p class="card-sub">Configure the ticket system</p></div></div>' +
      '  <div class="field-grid" style="margin-bottom:12px;">' +
      `    <label class="field"><span>Ticket Panel Title</span><input type="text" id="cfgTicketPanelTitle" value="${escapeHtml((s.ticket && s.ticket.panelTitle) || '🎫 Support Tickets')}"></label>` +
      `    <label class="field"><span>Staff role</span><select id="cfgTicketRole">${buildRoleOptions(s.ticket && s.ticket.displayRoleId)}</select></label>` +
      `    <label class="field"><span>Auto-close (minutes)</span><input type="number" id="cfgTicketAutoClose" min="0" value="${autoCloseMins}"></label>` +
      '  </div>' +
      '  <label class="field"><span>Ticket Panel Description</span>' +
      `    <textarea id="cfgTicketPanelText" rows="3" style="width:100%; padding:9px 11px; border-radius:var(--r-sm); font-size:12.5px; background:var(--bg-elev-2); border:1px solid var(--line); color:var(--fg); font-family:inherit; resize:vertical;">${escapeHtml((s.ticket && (s.ticket.panelText || s.ticket.panelDescription)) || '')}</textarea>` +
      '  </label>' +
      '</article>';
  }

  function renderVoiceConfig(s) {
    const el = $('#voiceConfig');
    if (!el) return;
    el.innerHTML =
      '<article class="card reveal" style="--i:1">' +
      '  <div class="card-head"><div><h2>🔊 Dynamic Voice Channels</h2><p class="card-sub">Auto-create voice channels</p></div></div>' +
      '  <div style="margin-bottom:12px;">' +
      '    <li class="plugin" style="list-style:none; padding:0; display:flex; justify-content:space-between; align-items:center;">' +
      '      <span class="plugin-meta" style="flex:1;"><b>Enable Dynamic Voice Channels</b></span>' +
      `      <button type="button" class="switch ${s.plugins && s.plugins.dynamic_vc ? 'is-on' : ''}" id="cfgDynamicVcToggle" role="switch" aria-checked="${s.plugins && s.plugins.dynamic_vc ? 'true' : 'false'}"><span></span></button>` +
      '    </li>' +
      '  </div>' +
      '  <div class="field-grid">' +
      `    <label class="field"><span>Trigger Channel</span><select id="cfgVcTrigger">${buildChannelOptions(s.dynamicVc && s.dynamicVc.triggerChannelId, ch => ch.type === 2)}</select></label>` +
      `    <label class="field"><span>Category</span><select id="cfgVcCategory">${buildChannelOptions(s.dynamicVc && s.dynamicVc.categoryId, ch => ch.type === 4)}</select></label>` +
      `    <label class="field"><span>User Limit</span><input type="number" id="cfgVcLimit" min="0" max="99" value="${Number(s.dynamicVc && s.dynamicVc.userLimit) || 0}"></label>` +
      '  </div>' +
      '</article>';
  }

  function renderSocialConfig(s) {
    const el = $('#socialConfig');
    if (!el) return;
    el.innerHTML =
      '<div class="announcement-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">' +
      '    <article class="card reveal" style="--i:1">' +
      '      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '        <b style="font-size:13px; color:var(--fg);">Welcome Announcement</b>' +
      `        <button type="button" class="switch ${s.welcome && s.welcome.enabled ? 'is-on' : ''}" id="cfgWelcomeEnabled" role="switch" aria-checked="${s.welcome && s.welcome.enabled ? 'true' : 'false'}"><span></span></button>` +
      '      </div>' +
      '      <div class="field-grid" style="grid-template-columns: 1fr; gap:10px;">' +
      `        <label class="field"><span>Channel</span><select id="cfgWelcomeChannel">${buildChannelOptions(s.welcome && s.welcome.channelId, ch => ch.type === 0 || ch.type === 5)}</select></label>` +
      `        <label class="field"><span>Message</span><input type="text" id="cfgWelcomeMessage" value="${escapeHtml((s.welcome && s.welcome.message) || 'Welcome {user} to the server!')}"></label>` +
      '      </div>' +
      '    </article>' +
      '    <article class="card reveal" style="--i:2">' +
      '      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '        <b style="font-size:13px; color:var(--fg);">Goodbye Announcement</b>' +
      `        <button type="button" class="switch ${s.goodbye && s.goodbye.enabled ? 'is-on' : ''}" id="cfgGoodbyeEnabled" role="switch" aria-checked="${s.goodbye && s.goodbye.enabled ? 'true' : 'false'}"><span></span></button>` +
      '      </div>' +
      '      <div class="field-grid" style="grid-template-columns: 1fr; gap:10px;">' +
      `        <label class="field"><span>Channel</span><select id="cfgGoodbyeChannel">${buildChannelOptions(s.goodbye && s.goodbye.channelId, ch => ch.type === 0 || ch.type === 5)}</select></label>` +
      `        <label class="field"><span>Message</span><input type="text" id="cfgGoodbyeMessage" value="${escapeHtml((s.goodbye && s.goodbye.message) || '{user} left the server.')}"></label>` +
      '      </div>' +
      '    </article>' +
      '    <article class="card reveal" style="--i:3">' +
      '      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '        <b style="font-size:13px; color:var(--fg);">Leveling Announcement</b>' +
      `        <button type="button" class="switch ${s.leveling && s.leveling.enabled ? 'is-on' : ''}" id="cfgLevelingEnabled" role="switch" aria-checked="${s.leveling && s.leveling.enabled ? 'true' : 'false'}"><span></span></button>` +
      '      </div>' +
      '      <div class="field-grid" style="grid-template-columns: 1fr; gap:10px;">' +
      `        <label class="field"><span>Channel</span><select id="cfgLevelingChannel">${buildChannelOptions(s.leveling && s.leveling.channelId, ch => ch.type === 0 || ch.type === 5)}</select></label>` +
      `        <label class="field"><span>Message</span><input type="text" id="cfgLevelingMessage" value="${escapeHtml((s.leveling && s.leveling.message) || 'Congrats {user}, you reached level {level}!')}"></label>` +
      '      </div>' +
      '    </article>' +
      '    <article class="card reveal" style="--i:4">' +
      '      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '        <b style="font-size:13px; color:var(--fg);">Birthdays Announcement</b>' +
      `        <button type="button" class="switch ${s.birthdays && s.birthdays.enabled ? 'is-on' : ''}" id="cfgBirthdayEnabled" role="switch" aria-checked="${s.birthdays && s.birthdays.enabled ? 'true' : 'false'}"><span></span></button>` +
      '      </div>' +
      '      <div class="field-grid" style="grid-template-columns: 1fr; gap:10px;">' +
      `        <label class="field"><span>Channel</span><select id="cfgBirthdayChannel">${buildChannelOptions(s.birthdays && s.birthdays.channelId, ch => ch.type === 0 || ch.type === 5)}</select></label>` +
      `        <label class="field"><span>Message</span><input type="text" id="cfgBirthdayMessage" value="${escapeHtml((s.birthdays && s.birthdays.message) || 'Happy Birthday {user}!')}"></label>` +
      '      </div>' +
      '    </article>' +
      '    <article class="card reveal" style="--i:5">' +
      '      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '        <b style="font-size:13px; color:var(--fg);">💜 Server Booster Bonus</b>' +
      `        <button type="button" class="switch ${s.boosterWelcomeBonus && s.boosterWelcomeBonus.enabled ? 'is-on' : ''}" id="cfgBoosterEnabled" role="switch" aria-checked="${s.boosterWelcomeBonus && s.boosterWelcomeBonus.enabled ? 'true' : 'false'}"><span></span></button>` +
      '      </div>' +
      `      <label class="field"><span>Booster Special Role Title</span><input type="text" id="cfgBoosterTitle" value="${escapeHtml((s.boosterWelcomeBonus && s.boosterWelcomeBonus.title) || 'Server Booster')}"></label>` +
      '    </article>' +
      '</div>';
  }

  async function saveAllSettings(btn) {
    if (!authToken || !activeGuildId) { toast('Sign in first', 'i-alert'); return; }
    const ic = btn ? $('.ic', btn) : null;
    if (ic) ic.classList.add('spin');
    try {

      const prefix = (($('#cfgPrefix') || {}).value || ',').trim() || ',';
      await apiFetch('/api/config', { method: 'POST', body: { prefix } });

      const appealsChannelId = (($('#cfgAppealsChannel') || {}).value || '').trim() || null;
      const caseChannelId = (($('#cfgCaseChannel') || {}).value || '').trim() || null;
      const ticketPanelChannelId = (($('#cfgTicketChannel') || {}).value || '').trim() || null;

      const arToggle = $('#cfgAntiRaidToggle');
      const arEnabled = arToggle ? arToggle.classList.contains('is-on') : false;
      const arThreshold = Math.max(2, Number((($('#arThreshold') || {}).value)) || 10);
      const arWindow = Math.max(5, Number((($('#arWindow') || {}).value)) || 60) * 1000;
      const arAction = (($('#arAction') || {}).value) || 'lockdown';
      const arMinAge = Math.max(0, Number((($('#arMinAge') || {}).value)) || 0) * 86400000;
      const arMention = Math.max(0, Number((($('#arMention') || {}).value)) || 0);
      const arMentionTimeout = Math.max(1, Number((($('#arMentionTimeout') || {}).value)) || 10) * 60000;
      const arAlertChannel = (($('#arAlertChannel') || {}).value) || null;

      const badwordsInput = (($('#cfgBadwords') || {}).value || '').trim();
      const badWords = badwordsInput ? badwordsInput.split(',').map(w => w.trim().toLowerCase()).filter(Boolean) : [];

      const ticketPanelTitle = (($('#cfgTicketPanelTitle') || {}).value || '🎫 Support Tickets').trim();
      const ticketPanelText = (($('#cfgTicketPanelText') || {}).value || '').trim();
      const ticketRole = (($('#cfgTicketRole') || {}).value) || null;
      const ticketAutoClose = Math.max(0, Number((($('#cfgTicketAutoClose') || {}).value)) || 0) * 60000;

      const vcToggle = $('#cfgDynamicVcToggle');
      const vcEnabled = vcToggle ? vcToggle.classList.contains('is-on') : false;
      const vcTrigger = (($('#cfgVcTrigger') || {}).value) || null;
      const vcCategory = (($('#cfgVcCategory') || {}).value) || null;
      const vcLimit = Math.max(0, Number((($('#cfgVcLimit') || {}).value)) || 0);

      const wEnabled = $('#cfgWelcomeEnabled');
      const welcomeEnabled = wEnabled ? wEnabled.classList.contains('is-on') : false;
      const welcomeChannel = (($('#cfgWelcomeChannel') || {}).value) || null;
      const welcomeMessage = (($('#cfgWelcomeMessage') || {}).value || 'Welcome {user} to the server!').trim();

      const gEnabled = $('#cfgGoodbyeEnabled');
      const goodbyeEnabled = gEnabled ? gEnabled.classList.contains('is-on') : false;
      const goodbyeChannel = (($('#cfgGoodbyeChannel') || {}).value) || null;
      const goodbyeMessage = (($('#cfgGoodbyeMessage') || {}).value || '{user} left the server.').trim();

      const lEnabled = $('#cfgLevelingEnabled');
      const levelingEnabled = lEnabled ? lEnabled.classList.contains('is-on') : false;
      const levelingChannel = (($('#cfgLevelingChannel') || {}).value) || null;
      const levelingMessage = (($('#cfgLevelingMessage') || {}).value || 'Congrats {user}, you reached level {level}!').trim();

      const bEnabled = $('#cfgBirthdayEnabled');
      const birthdayEnabled = bEnabled ? bEnabled.classList.contains('is-on') : false;
      const birthdayChannel = (($('#cfgBirthdayChannel') || {}).value) || null;
      const birthdayMessage = (($('#cfgBirthdayMessage') || {}).value || 'Happy Birthday {user}!').trim();

      const boostEnabled = $('#cfgBoosterEnabled');
      const boosterEnabled = boostEnabled ? boostEnabled.classList.contains('is-on') : false;
      const boosterTitle = (($('#cfgBoosterTitle') || {}).value || 'Server Booster').trim();

      const settingsBody = {
        appealsChannelId: $('#cfgAppealsChannel') ? ($('#cfgAppealsChannel').value || null) : (settingsCache.appealsChannelId || null),
        caseChannelId: $('#cfgCaseChannel') ? ($('#cfgCaseChannel').value || null) : (settingsCache.caseChannelId || null),
        ticketPanelChannelId: $('#cfgTicketChannel') ? ($('#cfgTicketChannel').value || null) : (settingsCache.ticketPanelChannelId || null),
        badWords: $('#cfgBadwords') ? ($('#cfgBadwords').value.split(',').map(w => w.trim().toLowerCase()).filter(Boolean)) : (settingsCache.badWords || []),
        plugins: {
          ...(settingsCache ? settingsCache.plugins : {}),
          anti_raid: $('#cfgAntiRaidToggle') ? $('#cfgAntiRaidToggle').classList.contains('is-on') : (settingsCache.plugins && settingsCache.plugins.anti_raid),
          dynamic_vc: $('#cfgDynamicVcToggle') ? $('#cfgDynamicVcToggle').classList.contains('is-on') : (settingsCache.plugins && settingsCache.plugins.dynamic_vc)
        },
        antiRaid: {
          threshold: $('#arThreshold') ? Number($('#arThreshold').value) : (settingsCache.antiRaid && settingsCache.antiRaid.threshold),
          windowMs: $('#arWindow') ? Number($('#arWindow').value) * 1000 : (settingsCache.antiRaid && settingsCache.antiRaid.windowMs),
          action: $('#arAction') ? $('#arAction').value : (settingsCache.antiRaid && settingsCache.antiRaid.action),
          minAccountAgeMs: $('#arMinAge') ? Number($('#arMinAge').value) * 86400000 : (settingsCache.antiRaid && settingsCache.antiRaid.minAccountAgeMs),
          massMentionThreshold: $('#arMention') ? Number($('#arMention').value) : (settingsCache.antiRaid && settingsCache.antiRaid.massMentionThreshold),
          massMentionTimeoutMs: $('#arMentionTimeout') ? Number($('#arMentionTimeout').value) * 60000 : (settingsCache.antiRaid && settingsCache.antiRaid.massMentionTimeoutMs),
          alertChannelId: $('#arAlertChannel') ? $('#arAlertChannel').value : (settingsCache.antiRaid && settingsCache.antiRaid.alertChannelId)
        },
        ticket: {
          ...(settingsCache ? settingsCache.ticket : {}),
          panelTitle: $('#cfgTicketPanelTitle') ? $('#cfgTicketPanelTitle').value : (settingsCache.ticket && settingsCache.ticket.panelTitle),
          panelText: $('#cfgTicketPanelText') ? $('#cfgTicketPanelText').value : (settingsCache.ticket && settingsCache.ticket.panelText),
          panelDescription: $('#cfgTicketPanelText') ? $('#cfgTicketPanelText').value : (settingsCache.ticket && settingsCache.ticket.panelDescription),
          displayRoleId: $('#cfgTicketRole') ? $('#cfgTicketRole').value : (settingsCache.ticket && settingsCache.ticket.displayRoleId),
          autoCloseMs: $('#cfgTicketAutoClose') ? Number($('#cfgTicketAutoClose').value) * 60000 : (settingsCache.ticket && settingsCache.ticket.autoCloseMs)
        },
        dynamicVc: {
          triggerChannelId: $('#cfgVcTrigger') ? $('#cfgVcTrigger').value : (settingsCache.dynamicVc && settingsCache.dynamicVc.triggerChannelId),
          categoryId: $('#cfgVcCategory') ? $('#cfgVcCategory').value : (settingsCache.dynamicVc && settingsCache.dynamicVc.categoryId),
          userLimit: $('#cfgVcLimit') ? Number($('#cfgVcLimit').value) : (settingsCache.dynamicVc && settingsCache.dynamicVc.userLimit)
        },
        welcome: {
          enabled: $('#cfgWelcomeEnabled') ? $('#cfgWelcomeEnabled').classList.contains('is-on') : (settingsCache.welcome && settingsCache.welcome.enabled),
          channelId: $('#cfgWelcomeChannel') ? $('#cfgWelcomeChannel').value : (settingsCache.welcome && settingsCache.welcome.channelId),
          message: $('#cfgWelcomeMessage') ? $('#cfgWelcomeMessage').value : (settingsCache.welcome && settingsCache.welcome.message)
        },
        goodbye: {
          enabled: $('#cfgGoodbyeEnabled') ? $('#cfgGoodbyeEnabled').classList.contains('is-on') : (settingsCache.goodbye && settingsCache.goodbye.enabled),
          channelId: $('#cfgGoodbyeChannel') ? $('#cfgGoodbyeChannel').value : (settingsCache.goodbye && settingsCache.goodbye.channelId),
          message: $('#cfgGoodbyeMessage') ? $('#cfgGoodbyeMessage').value : (settingsCache.goodbye && settingsCache.goodbye.message)
        },
        leveling: {
          enabled: $('#cfgLevelingEnabled') ? $('#cfgLevelingEnabled').classList.contains('is-on') : (settingsCache.leveling && settingsCache.leveling.enabled),
          channelId: $('#cfgLevelingChannel') ? $('#cfgLevelingChannel').value : (settingsCache.leveling && settingsCache.leveling.channelId),
          message: $('#cfgLevelingMessage') ? $('#cfgLevelingMessage').value : (settingsCache.leveling && settingsCache.leveling.message)
        },
        birthdays: {
          enabled: $('#cfgBirthdayEnabled') ? $('#cfgBirthdayEnabled').classList.contains('is-on') : (settingsCache.birthdays && settingsCache.birthdays.enabled),
          channelId: $('#cfgBirthdayChannel') ? $('#cfgBirthdayChannel').value : (settingsCache.birthdays && settingsCache.birthdays.channelId),
          message: $('#cfgBirthdayMessage') ? $('#cfgBirthdayMessage').value : (settingsCache.birthdays && settingsCache.birthdays.message)
        },
        boosterWelcomeBonus: {
          enabled: $('#cfgBoosterEnabled') ? $('#cfgBoosterEnabled').classList.contains('is-on') : (settingsCache.boosterWelcomeBonus && settingsCache.boosterWelcomeBonus.enabled),
          title: $('#cfgBoosterTitle') ? $('#cfgBoosterTitle').value : (settingsCache.boosterWelcomeBonus && settingsCache.boosterWelcomeBonus.title)
        }
      };

      await apiFetch('/api/settings', { method: 'POST', body: settingsBody });
      settingsCache = settingsBody;

      renderPlugins(settingsBody.plugins || {});

      toast('Configuration saved successfully ✓', 'i-check');
    } catch (e) {
      toast('Failed to save configuration', 'i-alert');
    } finally {
      if (ic) ic.classList.remove('spin');
    }
  }

  function startPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(() => {
      if (document.hidden || !authToken || currentView !== 'overview') return;
      apiFetch('/api/stats', { silent: true }).then(s => {
        if (!s) return;
        setStat('statMembers', s.guildMembers || 0);
        setStat('statOnline', s.guildOnline || 0);
        setStat('statCommands', s.commandsRan || 0);
        const ping = $('#hlPing'); if (ping) ping.textContent = (s.ping >= 0 ? s.ping : '—') + ' ms';
      }).catch(() => { });
      refreshFeed();
    }, 12000);
  }

  document.addEventListener('click', async e => {

    const pSw = e.target.closest('.switch[data-plugin]');
    if (pSw) {
      if (!authToken || !activeGuildId) { toast('Sign in first', 'i-alert'); return; }
      const plugin = pSw.dataset.plugin;
      const enabled = !pSw.classList.contains('is-on');
      pSw.classList.toggle('is-on', enabled);
      pSw.setAttribute('aria-checked', enabled);
      try {
        await apiFetch('/api/plugins', { method: 'POST', body: { plugin, enabled } });
        toast(`${(PLUGIN_META[plugin] || {}).name || plugin} ${enabled ? 'enabled' : 'disabled'}`, enabled ? 'i-check' : 'i-x');
      } catch (err) {
        pSw.classList.toggle('is-on', !enabled);
        pSw.setAttribute('aria-checked', !enabled);
      }
      return;
    }

    const gSw = e.target.closest('.switch:not([data-plugin]):not([data-cmd])');
    if (gSw) {
      const enabled = !gSw.classList.contains('is-on');
      gSw.classList.toggle('is-on', enabled);
      gSw.setAttribute('aria-checked', enabled ? 'true' : 'false');
      return;
    }

    const cSw = e.target.closest('.switch[data-cmd]');
    if (cSw) {
      const row = cSw.closest('.cmd-row');
      if (!row) return;
      const enabled = !cSw.classList.contains('is-on');
      try {
        await apiFetch(`/api/commands/${row.dataset.type}/${encodeURIComponent(row.dataset.name)}`, { method: 'PATCH', body: { enabled } });
        cSw.classList.toggle('is-on', enabled);
        cSw.setAttribute('aria-checked', enabled);
        row.classList.toggle('is-off', !enabled);
        if (commandsCache) {
          const list = commandsCache[row.dataset.type] || [];
          const c = list.find(x => x.name === row.dataset.name);
          if (c) c.enabled = enabled;
        }
        toast(`${row.dataset.name} ${enabled ? 'enabled' : 'disabled'}`, enabled ? 'i-check' : 'i-x');
      } catch (err) { }
      return;
    }

    if (e.target.closest('.cmd-run')) {
      const row = e.target.closest('.cmd-row');
      if (!row) return;
      const input = prompt('Run this prefix command (edit arguments as needed):', ',' + row.dataset.name + ' ');
      if (input == null) return;
      try {
        const res = await apiFetch('/api/terminal', { method: 'POST', body: { command: input } });
        toast('Command executed ✓', 'i-check');
        if (res && Array.isArray(res.output) && res.output.length) console.log('[terminal output]', res.output.join('\n'));
      } catch (err) { }
      return;
    }

    const mBtn = e.target.closest('.mem-act');
    if (mBtn) {
      const row = mBtn.closest('.board-row');
      if (!row || !row.dataset.id) return;
      const action = mBtn.dataset.act;
      const nameEl = $('.board-name', row);
      const name = nameEl ? nameEl.textContent.replace('BOT', '').trim() : 'this member';
      showActionConfirm({
        title: action + ' ' + name,
        desc: action === 'BAN' ? 'This will ban ' + name + ' from the server.' :
              action === 'KICK' ? 'This will kick ' + name + ' from the server.' :
              'This will timeout ' + name + ' for 10 minutes.',
        isDanger: action === 'BAN',
        onConfirm: async (reason) => {
          const body = { userId: row.dataset.id, action, reason };
          if (action === 'TIMEOUT') body.duration = 600;
          try {
            await apiFetch('/api/members/action', { method: 'POST', body });
            toast(action + ' applied to ' + name, 'i-check');
          } catch (err) { }
        }
      });
      return;
    }

    if (e.target.closest('#addTriggerBtn')) {
      const t = $('#newTrigger'), r = $('#newResponse');
      if (!t || !t.value.trim() || !r || !r.value.trim()) { toast('Enter a trigger and a response', 'i-alert'); return; }
      try {
        await apiFetch('/api/triggers', { method: 'POST', body: { trigger: t.value.trim(), response: r.value.trim() } });
        toast('Autoresponder added', 'i-check');
        loadAutomation();
      } catch (err) { }
      return;
    }

    const aDel = e.target.closest('.auto-del');
    if (aDel) {
      const item = aDel.closest('.auto-item');
      if (!item || !item.dataset.trigger) return;
      try {
        await apiFetch('/api/triggers/' + encodeURIComponent(item.dataset.trigger), { method: 'DELETE' });
        toast('Autoresponder removed', 'i-check');
        loadAutomation();
      } catch (err) { }
      return;
    }

    const aRm = e.target.closest('.auto-rm');
    if (aRm) {
      const item = aRm.closest('.sched-item');
      if (!item || !item.dataset.id) return;
      try {
        await apiFetch('/api/automations/' + encodeURIComponent(item.dataset.id), { method: 'DELETE' });
        toast('Automation removed', 'i-check');
        loadAutomation();
      } catch (err) { }
      return;
    }

    if (e.target.closest('#saveServerConfig')) {
      saveAllSettings(e.target.closest('#saveServerConfig'));
      return;
    }

    if (e.target.closest('#srvAddBtn')) {
      const url = (window.KOZZ_CONFIG && window.KOZZ_CONFIG.INVITE_URL) || '';
      if (url) window.open(url, '_blank', 'noopener');
      const sm = $('#srvMenu'); if (sm) sm.setAttribute('hidden', '');
      return;
    }
    const srvOpt = e.target.closest('.srv-opt');
    if (srvOpt && srvOpt.dataset.id) {
      switchGuild(srvOpt.dataset.id);
      const sm = $('#srvMenu'); if (sm) sm.setAttribute('hidden', '');
      const sb = $('#serverSwitcher'); if (sb) sb.setAttribute('aria-expanded', 'false');
      return;
    }

    if (e.target.closest('#addCustomCmdBtn')) {
      const name = $('#newCustomCmdName'), resp = $('#newCustomCmdResponse');
      if (!name || !name.value.trim() || !resp || !resp.value.trim()) { toast('Enter a name and response', 'i-alert'); return; }
      try {
        await apiFetch('/api/custom-commands', {
          method: 'POST',
          body: {
            name: name.value.trim().toLowerCase(),
            response: resp.value.trim(),
            enabled: true
          }
        });
        toast('Custom command added', 'i-check');
        customCommandsCache = await apiFetch('/api/custom-commands');
        renderCustomCommands();
      } catch (err) { }
      return;
    }

    const ccDel = e.target.closest('.custom-cmd-del');
    if (ccDel) {
      const item = ccDel.closest('.auto-item');
      if (!item || !item.dataset.id) return;
      try {
        await apiFetch('/api/custom-commands/' + encodeURIComponent(item.dataset.id), { method: 'DELETE' });
        toast('Custom command removed', 'i-check');
        customCommandsCache = await apiFetch('/api/custom-commands');
        renderCustomCommands();
      } catch (err) { }
      return;
    }

    if (e.target.closest('#startGiveawayBtn')) {
      const chan = $('#newGiveawayChannel'), prize = $('#newGiveawayPrize'), winners = $('#newGiveawayWinners'), dur = $('#newGiveawayDuration');
      if (!chan || !chan.value || !prize || !prize.value.trim() || !winners || !winners.value || !dur || !dur.value.trim()) {
        toast('Fill in all giveaway fields', 'i-alert'); return;
      }
      const durationStr = dur.value.trim();
      const match = durationStr.match(/^(\d+)([mhd])$/);
      if (!match) {
        toast('Invalid duration format (e.g. 10m, 2h, 5d)', 'i-alert'); return;
      }
      const num = parseInt(match[1]), unit = match[2];
      let ms = num * 60000;
      if (unit === 'h') ms = num * 3600000;
      if (unit === 'd') ms = num * 86400000;
      const endTime = Date.now() + ms;
      try {
        await apiFetch('/api/giveaways', {
          method: 'POST',
          body: {
            channel_id: chan.value,
            prize: prize.value.trim(),
            winners: parseInt(winners.value),
            end_time: endTime
          }
        });
        toast('Giveaway started ✓', 'i-check');
        prize.value = ''; winners.value = ''; dur.value = '';
        giveawaysCache = await apiFetch('/api/giveaways', { silent: true });
        renderGiveaways();
      } catch (err) { }
      return;
    }

    if (e.target.closest('#registerBirthdayBtn')) {
      const user = $('#newBirthdayUser'), date = $('#newBirthdayDate');
      if (!user || !user.value || !date || !date.value) { toast('Select a member and a date', 'i-alert'); return; }
      try {
        const member = membersCache.find(m => m.id === user.value);
        await apiFetch('/api/birthdays', {
          method: 'POST',
          body: {
            user_id: user.value,
            username: member ? member.username : 'Unknown',
            birthday: date.value
          }
        });
        toast('Birthday registered ✓', 'i-check');
        date.value = '';
        birthdaysCache = await apiFetch('/api/birthdays', { silent: true });
        renderBirthdays();
      } catch (err) { }
      return;
    }

    const bDel = e.target.closest('.birthday-del');
    if (bDel) {
      const item = bDel.closest('.sched-item');
      if (!item || !item.dataset.userId) return;
      try {
        await apiFetch('/api/birthdays/' + encodeURIComponent(item.dataset.userId), { method: 'DELETE' });
        toast('Birthday removed', 'i-check');
        birthdaysCache = await apiFetch('/api/birthdays', { silent: true });
        renderBirthdays();
      } catch (err) { }
      return;
    }

    const modalBtn = e.target.closest('.modal-act');
    if (modalBtn) {
      const modal = $('#memberModal');
      const userId = modal.dataset.userId;
      if (!userId) return;
      const action = modalBtn.dataset.act;
      const member = membersCache.find(m => m.id === userId);
      const name = member ? member.username : 'this member';
      showActionConfirm({
        title: action + ' ' + name,
        desc: action === 'BAN' ? 'This will ban ' + name + ' from the server.' :
              action === 'KICK' ? 'This will kick ' + name + ' from the server.' :
              'This will timeout ' + name + ' for 10 minutes.',
        isDanger: action === 'BAN',
        onConfirm: async (reason) => {
          const body = { userId, action, reason };
          if (action === 'TIMEOUT') body.duration = 600;
          try {
            await apiFetch('/api/members/action', { method: 'POST', body });
            toast(action + ' applied to ' + name, 'i-check');
            closeModal();
            if (currentView === 'moderation') loadModeration();
            if (currentView === 'members') loadMembers();
          } catch (err) { }
        }
      });
      return;
    }

    const boardRow = e.target.closest('.board-row');
    if (boardRow && !e.target.closest('.mem-act') && boardRow.closest('#board')) {
      const userId = boardRow.dataset.id;
      if (userId) openMemberModal(userId);
      return;
    }

    if (e.target.closest('#memberModalClose') || e.target.closest('#memberModalBackdrop')) {
      closeModal();
      return;
    }

    const appealAccept = e.target.closest('.appeal-accept');
    if (appealAccept && appealAccept.dataset.id) {
      const id = appealAccept.dataset.id;
      appealAccept.disabled = true;
      try {
        await apiFetch('/api/appeals/' + id + '/accept', { method: 'POST' });
        toast('Appeal accepted — user unbanned', 'i-check');
        loadAppeals();
      } catch (err) { appealAccept.disabled = false; }
      return;
    }

    const appealReject = e.target.closest('.appeal-reject');
    if (appealReject && appealReject.dataset.id) {
      const id = appealReject.dataset.id;
      appealReject.disabled = true;
      try {
        await apiFetch('/api/appeals/' + id + '/reject', { method: 'POST' });
        toast('Appeal rejected', 'i-x');
        loadAppeals();
      } catch (err) { appealReject.disabled = false; }
      return;
    }

    const filterBtn = e.target.closest('[data-appeals-filter]');
    if (filterBtn) {
      appealsFilter = filterBtn.dataset.appealsFilter;
      $$('[data-appeals-filter]').forEach(b => b.classList.toggle('is-active', b.dataset.appealsFilter === appealsFilter));
      loadAppeals();
      return;
    }
  });

  document.addEventListener('change', async e => {
    const inp = e.target.closest('.cmd-cd-input');
    if (!inp) return;
    const row = e.target.closest('.cmd-row');
    if (!row) return;
    const cooldown = Math.max(0, Number(inp.value) || 0);
    try {
      await apiFetch(`/api/commands/${row.dataset.type}/${encodeURIComponent(row.dataset.name)}`, { method: 'PATCH', body: { cooldown } });
      toast(`${row.dataset.name} cooldown set to ${cooldown}s`, 'i-clock');
    } catch (err) { }
  });

  document.addEventListener('input', e => {
    if (e.target.id === 'cmdSearch') renderCommands(e.target.value);
  });

  const userChip = $('#userChip'); if (userChip) userChip.addEventListener('click', loginWithDiscord);
  const avatarBtn = $('#avatarBtn'); if (avatarBtn) avatarBtn.addEventListener('click', loginWithDiscord);
  const loginBtn = $('#loginBtn'); if (loginBtn) loginBtn.addEventListener('click', loginWithDiscord);
  const specsRefresh = $('#specsRefresh'); if (specsRefresh) specsRefresh.addEventListener('click', () => loadOverview());

  const saveBtn = $('#saveBtn');
  if (saveBtn) saveBtn.addEventListener('click', async () => {
    await saveAllSettings(saveBtn);
  });

  const leaveBtn = $('#leaveBtn');
  if (leaveBtn) leaveBtn.addEventListener('click', async () => {
    const g = activeGuild();
    if (!g) { toast('No server selected', 'i-alert'); return; }
    if (!confirm(`Remove kozzyx from ${g.name}? The bot will leave the server.`)) return;
    try {
      await apiFetch('/api/leave', { method: 'POST' });
      toast('Bot removed from ' + g.name, 'i-check');
    } catch (err) { }
  });

  async function runAiAssistant() {
    const inp = $('#aiAssistantPrompt');
    const btn = $('#runAiAssistantBtn');
    const term = $('#aiTerminalBody');
    if (!inp || !inp.value.trim() || !term) return;
    const prompt = inp.value.trim();
    inp.value = '';
    inp.disabled = true;
    btn.disabled = true;

    term.innerHTML = '';

    function log(txt, type) {
      const line = document.createElement('div');
      line.className = 'term-line' + (type ? ' ' + type : '');
      line.textContent = txt;
      term.appendChild(line);
      term.scrollTop = term.scrollHeight;
    }

    log(`$ kozzyx-ai --execute "${prompt}"`, 'info');
    log('Initializing template parser...', 'info');

    setTimeout(async () => {
      try {
        log('Analyzing server structure & matching template...', 'info');
        const res = await apiFetch('/api/ai/execute', {
          method: 'POST',
          body: { prompt }
        });

        if (res && res.success && Array.isArray(res.actions)) {
          res.actions.forEach(action => {
            if (action.includes('Refused') || action.includes("don't have a template")) {
              log(`[WARN] ${action}`, 'warn');
            } else {
              log(`[OK] ${action}`, 'ok');
            }
          });
          log('Assistant execution complete.', 'ok');
        } else {
          log('[ERROR] Unrecognized response format', 'danger');
        }
      } catch (err) {
        log(`[ERROR] Failed to execute actions: ${err.message || err}`, 'danger');
      } finally {
        inp.disabled = false;
        btn.disabled = false;
        const cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        term.appendChild(cursor);
        term.scrollTop = term.scrollHeight;
      }
    }, 900);
  }

  function openMemberModal(userId) {
    const modal = $('#memberModal');
    if (!modal) return;

    const member = membersCache.find(m => m.id === userId);
    if (!member) { toast('Member details not found in cache', 'i-alert'); return; }

    modal.dataset.userId = userId;

    $('#modalMemberAvatar').textContent = member.username.slice(0, 2).toUpperCase();
    $('#modalMemberName').textContent = member.username;
    $('#modalMemberId').textContent = 'ID: ' + member.id;
    $('#modalMemberIsBot').textContent = member.bot ? 'Yes' : 'No';
    $('#modalMemberJoinedAt').textContent = member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '—';

    try {
      const createdTimestamp = Number((BigInt(member.id) >> 22n) + 1420070400000n);
      const createdDate = new Date(createdTimestamp);
      const diffDays = Math.floor((Date.now() - createdTimestamp) / (1000 * 60 * 60 * 24));
      $('#modalMemberAccountAge').textContent = createdDate.toLocaleDateString() + ` (${diffDays} days old)`;

      const warnings = Array.isArray(modlogCache) ? modlogCache.filter(w => w.target === member.username || w.target === member.id) : [];
      let risk = 'Low Risk';
      let riskClass = 'low';

      if (warnings.length > 2 || (warnings.length > 0 && diffDays < 15)) {
        risk = 'High Risk';
        riskClass = 'high';
      } else if (warnings.length > 0 || diffDays < 30) {
        risk = 'Medium Risk';
        riskClass = 'med';
      }

      const riskEl = $('#modalMemberRisk');
      riskEl.textContent = risk;
      riskEl.className = 'tag ' + riskClass;

      const warnList = $('#modalMemberWarnings');
      if (warnings.length === 0) {
        warnList.innerHTML = '<li class="empty-warns" style="list-style: none; text-align: center; color: var(--fg-faint); padding: 10px 0;">No infractions recorded.</li>';
      } else {
        warnList.innerHTML = warnings.map(w => {
          const when = w.timestamp ? new Date(w.timestamp).toLocaleDateString() : '—';
          return `<li class="tl-item" style="padding: 6px 0; border-bottom: 1px solid var(--line-soft); list-style: none;">` +
            `<div class="tl-body"><p style="margin: 0;"><b>${escapeHtml(w.action)}</b>: ${escapeHtml(w.reason)}</p>` +
            `<div class="tl-meta" style="font-size: 10px; color: var(--fg-faint);">${escapeHtml(when)} · by ${escapeHtml(w.moderator)}</div></div></li>`;
        }).join('');
      }
    } catch (e) {
      $('#modalMemberAccountAge').textContent = '—';
      $('#modalMemberRisk').textContent = 'Low Risk';
      $('#modalMemberRisk').className = 'tag low';
    }

    const roles = (member.roles || []).map(r => r.name).join(', ') || 'No roles';
    $('#modalMemberRoles').textContent = roles;

    modal.hidden = false;
  }

  function closeModal() {
    const modal = $('#memberModal');
    if (modal) modal.hidden = true;
  }

  let _confirmCallback = null;
  function showActionConfirm({ title, desc, isDanger, onConfirm }) {
    const m = $('#actionConfirmModal');
    if (!m) return;
    $('#actionConfirmTitle').textContent = title;
    $('#actionConfirmDesc').textContent = desc || '';
    const okBtn = $('#actionConfirmOk');
    okBtn.className = 'btn ' + (isDanger ? 'btn-danger' : 'btn-accent');
    okBtn.textContent = isDanger ? 'Yes, ' + title.split(' ')[0].toLowerCase() : 'Confirm';
    $('#actionConfirmReason').value = '';
    _confirmCallback = onConfirm;
    m.hidden = false;
    setTimeout(() => $('#actionConfirmReason').focus(), 60);
  }
  function closeActionConfirm() {
    const m = $('#actionConfirmModal');
    if (m) m.hidden = true;
    _confirmCallback = null;
  }
  $('#actionConfirmClose').addEventListener('click', closeActionConfirm);
  $('#actionConfirmCancel').addEventListener('click', closeActionConfirm);
  $('#actionConfirmBackdrop').addEventListener('click', closeActionConfirm);
  $('#actionConfirmOk').addEventListener('click', async () => {
    if (!_confirmCallback) return;
    const cb = _confirmCallback;
    const reason = $('#actionConfirmReason').value.trim() || 'Dashboard action';
    closeActionConfirm();
    await cb(reason);
  });
  $('#actionConfirmReason').addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') { e.preventDefault(); $('#actionConfirmOk').click(); }
    if (e.key === 'Escape') closeActionConfirm();
  });

  initView('overview');
  if (currentView !== 'overview') go(currentView);
  requestAnimationFrame(moveIndicator);
  setTimeout(moveIndicator, 120);
  checkAuth();

})();
