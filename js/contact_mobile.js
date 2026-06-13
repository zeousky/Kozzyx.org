/* contact_mobile.js — posts the contact form to the API (same endpoint
   the desktop site uses), with a graceful mailto fallback if it 5xxs. */
(function () {
  'use strict';
  const form = document.getElementById('mContactForm');
  if (!form) return;
  const btn = document.getElementById('cSubmit');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      honeypot: form.website.value,
    };
    if (data.honeypot) return; // bot
    if (!data.name || !data.email || !data.message) {
      window.MobileShell?.toast('Please fill every field.', 'danger');
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const base = (window.KOZZ_CONFIG && window.KOZZ_CONFIG.API_BASE) || '';
      const res = await fetch(base + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      window.MobileShell?.toast('Sent — we\'ll be in touch.', 'ok', 3400);
    } catch (err) {
      window.MobileShell?.toast('Couldn\'t reach the server. Opening email instead.', 'danger', 3000);
      const subject = encodeURIComponent('kozzyx contact — ' + data.name);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} <${data.email}>`);
      location.href = `mailto:hello@kozzyx.app?subject=${subject}&body=${body}`;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send';
    }
  });
})();
