/* report_mobile.js — posts the report form, swaps in the success state. */
(function () {
  'use strict';
  const form = document.getElementById('mReportForm');
  const success = document.getElementById('mReportSuccess');
  const again = document.getElementById('rAgain');
  if (!form) return;
  const btn = document.getElementById('rSubmit');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      reportType: form.reportType.value,
      discordId: form.discordId.value.trim(),
      serverId: form.serverId.value.trim(),
      description: form.description.value.trim(),
      evidence: form.evidence.value.trim(),
    };
    if (!data.discordId || !data.description) {
      window.MobileShell?.toast('Discord ID and description are required.', 'danger');
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const base = (window.KOZZ_CONFIG && window.KOZZ_CONFIG.API_BASE) || '';
      const res = await fetch(base + '/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.hidden = true;
      success.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      window.MobileShell?.toast('Couldn\'t submit. Try again in a minute.', 'danger', 3200);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit report';
    }
  });

  if (again) again.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    success.hidden = true;
  });
})();
