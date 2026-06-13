(function() {

    window.KOZZ_UTILS = {
        escapeHtml: function(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },
        toast: function(msg, type = 'info') {
            console.log(`[Toast] ${type.toUpperCase()}: ${msg}`);
            if (window.toast) window.toast(msg, type);
        }
    };

    function initEasterEggs() {
        const config = window.KOZZ_CONFIG?.EASTER_EGGS;
        if (!config) return;

        if (window.KOZZ_EGGS_INIT) return;
        window.KOZZ_EGGS_INIT = true;

        let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        window.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateHyperMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        if (!document.getElementById('kozz-easter-egg-styles')) {
            const styles = document.createElement('style');
            styles.id = 'kozz-easter-egg-styles';
            styles.innerHTML = `
                @keyframes glitchAnim {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 1px); }
                    40% { transform: translate(-1px, -2px); }
                    60% { transform: translate(2px, 1px); }
                    80% { transform: translate(1px, -1px); }
                    100% { transform: translate(0); }
                }
                .hyper-mode { animation: hyperPulse 2s infinite alternate; }
                @keyframes hyperPulse {
                    from { filter: hue-rotate(0deg); }
                    to { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(styles);
        }

        function activateHyperMode() {
            console.log('%c HYPER MODE ACTIVATED ', 'background: #8b5cf6; color: white; font-weight: bold; font-size: 20px; padding: 10px;');
            document.body.style.transition = 'all 1s ease';
            document.documentElement.style.setProperty('--accent', 'oklch(0.7 0.3 300)');
            document.body.classList.add('hyper-mode');

            const glitch = document.createElement('div');
            glitch.style.position = 'fixed';
            glitch.style.inset = '0';
            glitch.style.zIndex = '1000000';
            glitch.style.pointerEvents = 'none';
            glitch.style.background = 'repeating-linear-gradient(0deg, rgba(139, 92, 246, 0.1) 0px, rgba(139, 92, 246, 0.1) 1px, transparent 2px, transparent 4px)';
            glitch.style.animation = 'glitchAnim 0.2s infinite';
            document.body.appendChild(glitch);

            setTimeout(() => glitch.remove(), 3000);
            window.KOZZ_UTILS.toast('Hyper-mode initialized.', 'ok');
        }

        let logoClicks = 0;
        document.addEventListener('click', (e) => {
            const logo = e.target.closest('.logo, .nav-logo, [data-logo]');
            if (logo) {
                logoClicks++;
                if (logoClicks === config.logo_clicks) {
                    logoClicks = 0;
                    activateMatrixEffect();
                }
            }
        });

        function activateMatrixEffect() {
            window.KOZZ_UTILS.toast('Entering the grid...', 'warn');
            document.body.style.filter = 'contrast(1.2) brightness(1.1) sepia(0.5) hue-rotate(80deg)';
            setTimeout(() => document.body.style.filter = '', 5000);
        }

        if (config.console_message) {
            console.log(`%c
   __  __
  |  |/  /  ____  _____  _____  __  __
  |     /  /  _ \\\\ \\\\_  /  \\\\_  / |  ||  |
  |     \\\\ (  <_> ) / /_   / /_ |  ||  |
  |__|\\\\__\\\\ \\\\____/ /____| /____| \\\\____ |
                                 /____|
            `, 'color: #8b5cf6; font-weight: bold;');
            console.log('%cSystem: %cSearching for vulnerabilities... %c[OK]', 'color: #8b5cf6;', 'color: #ededf0;', 'color: #22c55e;');
            console.log('%cSystem: %c"The cake is a lie." %c- Management', 'color: #8b5cf6;', 'color: #a0a0a8; font-style: italic;', 'color: #5a5a62;');
        }
    }

    function initVisualEngine() {
        const config = window.KOZZ_CONFIG;
        if (window.KOZZ_VISUAL_INIT) return;
        window.KOZZ_VISUAL_INIT = true;

        function applyTilt() {
            const elements = document.querySelectorAll('.card, .price-card, .stat, .feature-card, .btn-primary');
            elements.forEach(el => {
                el.style.transition = 'transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99)';
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((centerY - y) / centerY) * 10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
                el.addEventListener('mouseleave', () => {
                    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });
        }

        applyTilt();
    }

    function removeSystemNotices() {
        const ids = ['system-notice', 'site-notice', 'notice-banner', 'top-notice', 'global-notice'];
        ids.forEach(id => {
            const el = document.getElementById(id) || document.querySelector('.' + id);
            if (el) el.remove();
        });
    }

    function ensureToastUI() {
        if (document.getElementById('kozz-toast-styles')) return;
        const styles = document.createElement('style');
        styles.id = 'kozz-toast-styles';
        styles.innerHTML = `
            #kozz-toast-container { position: fixed; right: 20px; bottom: 22px; display:flex; flex-direction:column; gap:10px; z-index:100000; }
            .kozz-toast { background: rgba(11,11,13,0.9); color: #fff; padding: 10px 14px; border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); font-family: 'Geist', sans-serif; font-size:13px; opacity:0; transform: translateY(6px); transition: opacity 0.18s ease, transform 0.18s ease; }
            .kozz-toast.show { opacity:1; transform: translateY(0); }
            .kozz-toast.ok { background: linear-gradient(90deg, rgba(34,197,94,0.15), rgba(34,197,94,0.06)); border:1px solid rgba(34,197,94,0.12); }
            .kozz-toast.warn { background: linear-gradient(90deg, rgba(245,158,11,0.08), rgba(245,158,11,0.04)); border:1px solid rgba(245,158,11,0.08); }
            .kozz-toast.error { background: linear-gradient(90deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04)); border:1px solid rgba(239,68,68,0.1); }
        `;
        document.head.appendChild(styles);

        const container = document.createElement('div');
        container.id = 'kozz-toast-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
    }

    function showToast(message, type = 'info', timeout = 3000) {
        try {
            ensureToastUI();
            const container = document.getElementById('kozz-toast-container');
            const el = document.createElement('div');
            el.className = 'kozz-toast ' + (type === 'ok' ? 'ok' : (type === 'warn' ? 'warn' : (type === 'error' ? 'error' : '')));
            el.textContent = message;
            container.appendChild(el);

            void el.offsetWidth;
            el.classList.add('show');
            setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 200); }, timeout);
        } catch (e) { console.log('[KOZZ_UTILS] toast fallback:', message); }
    }

    window.KOZZ_UTILS.toast = function(msg, type) {
        showToast(msg, type === 'ok' ? 'ok' : (type === 'warn' ? 'warn' : (type === 'error' ? 'error' : '')));
        console.log(`[Toast] ${type || 'info'}: ${msg}`);
    };

    function setupCopyButtons() {
        document.addEventListener('click', async (e) => {
            const btn = e.target.closest('.kozz-copy-btn');
            if (!btn) return;
            const text = btn.getAttribute('data-clipboard-text') || btn.dataset.clipboardText || btn.textContent || '';
            const originalText = btn.textContent;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    ta.style.position = 'fixed';
                    ta.style.left = '-9999px';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    ta.remove();
                }

                try { btn.textContent = 'Copied!'; btn.classList.add('kozz-copied'); } catch (e) {}
                window.KOZZ_UTILS.toast('Copied to clipboard', 'ok');
                setTimeout(() => { try { btn.textContent = originalText; btn.classList.remove('kozz-copied'); } catch (e) {} }, 1200);
            } catch (err) {
                window.KOZZ_UTILS.toast('Copy failed', 'warn');
            }
        });
    }

    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        const status = document.getElementById('contact-form-status');
        const mailtoAnchor = document.querySelector('a[href^="mailto:"]');
        const fallbackEmail = mailtoAnchor ? (mailtoAnchor.getAttribute('href') || '').replace('mailto:', '') : '';

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = (form.querySelector('[name="name"]') || {}).value || '';
            const email = (form.querySelector('[name="email"]') || {}).value || '';
            const message = (form.querySelector('[name="message"]') || {}).value || '';
            const honeypot = (form.querySelector('[name="website"]') || {}).value || '';

            status.textContent = '';
            if (honeypot.trim()) { window.KOZZ_UTILS.toast('Spam detected — submission cancelled', 'warn'); return; }
            if (!name.trim() || !email.trim() || !message.trim()) { status.textContent = 'Please complete all fields.'; return; }

            const payload = { name: name.trim(), email: email.trim(), message: message.trim(), page: location.pathname };
            try {
                if (window.KOZZ_CONFIG && window.KOZZ_CONFIG.API_BASE) {
                    const res = await fetch(window.KOZZ_CONFIG.API_BASE + '/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
                    if (res && res.ok) {
                        window.KOZZ_UTILS.toast('Message sent — thank you!', 'ok');
                        form.reset();
                        status.textContent = 'Message sent — thank you!';
                        return;
                    }
                }
            } catch (err) {
                console.warn('Contact form POST failed', err);
            }

            if (fallbackEmail) {
                const subject = encodeURIComponent('Website contact from ' + name.trim());
                const body = encodeURIComponent('Name: ' + name.trim() + '\nEmail: ' + email.trim() + '\n\n' + message.trim());
                window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
                window.KOZZ_UTILS.toast('Opening mail client...', 'info');
                form.reset();
            } else {
                status.textContent = 'Unable to send message. Please email us directly.';
                window.KOZZ_UTILS.toast('Unable to send message', 'warn');
            }
        });
    }

    function injectAccessibilityHelpers() {
        if (!document.getElementById('kozz-access-styles')) {
            const s = document.createElement('style'); s.id = 'kozz-access-styles';
            s.innerHTML = `
                .kozz-skip-link { position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden; }
                .kozz-skip-link:focus { left: 12px; top: 12px; width: auto; height: auto; padding: 8px 12px; background: var(--bg-elev); color: var(--fg); border-radius:8px; z-index:10001; }
                :focus { outline: 3px solid color-mix(in oklab, var(--accent) 60%, white); outline-offset: 2px; }
            `; document.head.appendChild(s);
        }
        if (!document.getElementById('kozz-skip-link')) {
            const main = document.querySelector('.page, #root, main');
            if (main && !main.id) main.id = 'content';
            if (main) main.setAttribute('role', 'main');
            const skip = document.createElement('a'); skip.href = '#content'; skip.className = 'kozz-skip-link'; skip.id = 'kozz-skip-link'; skip.textContent = 'Skip to content';
            document.body.insertBefore(skip, document.body.firstChild);
        }
    }

    function injectJSONLD() {
        try {
            if (document.querySelector('script[type="application/ld+json"][data-kozz]')) return;
            const cfg = window.KOZZ_CONFIG || {};
            const data = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: cfg.BOT_NAME || 'KozzyX',
                url: location.origin,
                sameAs: cfg.SUPPORT_SERVER ? [cfg.SUPPORT_SERVER] : []
            };
            const s = document.createElement('script'); s.type = 'application/ld+json'; s.dataset.kozz = 'true'; s.textContent = JSON.stringify(data);
            document.head.appendChild(s);

            if (!document.querySelector('link[rel="canonical"]')) {
                const link = document.createElement('link'); link.rel = 'canonical'; link.href = location.href; document.head.appendChild(link);
            }

            if (!document.querySelector('meta[name="referrer"]')) {
                const m = document.createElement('meta'); m.name = 'referrer'; m.content = 'strict-origin-when-cross-origin'; document.head.appendChild(m);
            }
        } catch (e) {  }
    }

    function setupAnalytics() {
        try {
            const cfg = window.KOZZ_CONFIG || {};
            const plausible = cfg.ANALYTICS && cfg.ANALYTICS.plausible;
            if (plausible && plausible.enabled && plausible.domain) {
                if (!document.querySelector('script[data-plausible]')) {
                    const s = document.createElement('script'); s.setAttribute('data-plausible', 'true'); s.defer = true; s.src = 'https://plausible.io/js/plausible.js'; s.setAttribute('data-domain', plausible.domain); document.head.appendChild(s);
                }
            }
        } catch (e) { console.warn('Analytics injection failed', e); }
    }

    function applyPerformanceAndSecurity() {
        try {

            document.querySelectorAll('a[target="_blank"]').forEach(a => {
                const rel = (a.getAttribute('rel') || '');
                if (!/noopener/i.test(rel)) a.setAttribute('rel', (rel + ' noopener noreferrer').trim());
            });

            document.querySelectorAll('img:not([loading])').forEach(img => img.setAttribute('loading', 'lazy'));

            document.querySelectorAll('script[src]').forEach(s => {
                const src = s.getAttribute('src') || '';
                if (/config\.js$/.test(src) || /shared\.js$/.test(src)) s.defer = true;
            });
        } catch (e) { console.warn('perf/security tweaks failed', e); }
    }

    function injectReportOnlyCSP() {

        return;
    }

    function init() {
        initEasterEggs();
        initVisualEngine();
        try { removeSystemNotices(); } catch (e) { console.warn('removeSystemNotices failed', e); }
        try { injectAccessibilityHelpers(); } catch (e) { console.warn('injectAccessibilityHelpers failed', e); }
        try { ensureToastUI(); setupCopyButtons(); initContactForm(); } catch (e) { console.warn('UI init failed', e); }
        try { injectJSONLD(); } catch (e) { console.warn('injectJSONLD failed', e); }
        try { injectReportOnlyCSP(); } catch (e) { console.warn('injectReportOnlyCSP failed', e); }
        try { setupAnalytics(); } catch (e) { console.warn('setupAnalytics failed', e); }
        try { applyPerformanceAndSecurity(); } catch (e) { console.warn('applyPerformanceAndSecurity failed', e); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
