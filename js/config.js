
if (window.trustedTypes && trustedTypes.createPolicy) {
    if (!trustedTypes.defaultPolicy) {
        trustedTypes.createPolicy('default', {
            createHTML: function(string) { return string; },
            createScript: function(string) { return string; },
            createScriptURL: function(string) { return string; }
        });
    }
}
/**
 * KozzyX Central Configuration
 * Shared constants across the entire website.
 */

window.KOZZ_CONFIG = {
    BOT_NAME: 'KozzyX',
    CLIENT_ID: '1442127404607737999',
    INVITE_URL: 'https://discord.com/oauth2/authorize?client_id=1442127404607737999&permissions=8&integration_type=0&scope=bot+applications.commands',
    SUPPORT_SERVER: 'https://discord.gg/fPG29xv7EA',
    API_BASE: 'https://kozzyx.org',
    NOTICE: {
        visible: false,
        text: '',
        color: '#ff4d4d'
    },
    EASTER_EGGS: {
        konami: true,
        logo_clicks: 7,
        console_message: true
    },
    ANALYTICS: {
        plausible: {
            enabled: true,
            domain: 'kozzyx.app'
        }
    },
    CSP_REPORT_ONLY: {
        enabled: true,
        reportUri: '/csp-report',
        policy: "default-src 'self'; script-src  'strict-dynamic' 'self' https://plausible.io https://static.cloudflareinsights.com https://accounts.google.com/gsi/client https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://kozzyx.org https://api.kozzyx.app https://kozzyx-api.bazsi9849.workers.dev https://plausible.io https://accounts.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; frame-src 'self' https://accounts.google.com https://challenges.cloudflare.com;"
    },
    THEMES: {
        current: 'dark',
        accent: 'dark_blue',
        accents: {
            violet: { name: 'violet', oklch: '0.72 0.17 280', label: 'Violet' },
            lime: { name: 'lime', oklch: '0.88 0.19 120', label: 'Lime' },
            coral: { name: 'coral', oklch: '0.75 0.17 28', label: 'Coral' },
            cyan: { name: 'cyan', oklch: '0.82 0.13 210', label: 'Cyan' },
            dark_blue: { name: 'dark_blue', oklch: '0.55 0.2 260', label: 'Dark Blue' },
            amber: { name: 'amber', oklch: '0.82 0.16 75', label: 'Amber' },
            blush: { name: 'blush', oklch: '0.80 0.12 350', label: 'Blush' }
        }
    },
    STATS: {
        servers: '1,240+',
        users: '450k+',
        uptime: '99.9%'
    }
};
