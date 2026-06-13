(function () {
  'use strict';

  var API_BASE = (window.KOZZ_CONFIG && window.KOZZ_CONFIG.API_BASE) || 'https://kozzyx.org';

  var years = document.querySelectorAll('[data-year]');
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = new Date().getFullYear();
  }

  var cmdBody = document.getElementById('cmd-rows');
  if (cmdBody && window.KOZZ_COMMANDS) {
    var catLabel = {
      mod: 'Moderation', ai: 'AI', utility: 'Utility',
      setup: 'Setup', tickets: 'Tickets', fun: 'Fun'
    };
    var rows = '';
    for (var c = 0; c < window.KOZZ_COMMANDS.length; c++) {
      var k = window.KOZZ_COMMANDS[c];
      var name = esc(k.cmd) + (k.args ? ' <span class="hint">' + esc(k.args) + '</span>' : '');
      rows += '<tr>' +
        '<td><code>' + esc(k.cmd) + '</code>' + (k.args ? ' <span class="hint">' + esc(k.args) + '</span>' : '') + '</td>' +
        '<td>' + (catLabel[k.cat] || esc(k.cat)) + (k.popular ? ' &#9733;' : '') + '</td>' +
        '<td>' + (k.prefix ? 'prefix' : 'slash') + '</td>' +
        '<td>' + esc(k.desc) + '</td>' +
        '</tr>';
    }
    cmdBody.innerHTML = rows;
    var count = document.getElementById('cmd-count');
    if (count) count.textContent = window.KOZZ_COMMANDS.length;
  }

  var contact = document.getElementById('contactForm');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgEl = document.getElementById('msg');
      var data = {
        name: contact.name.value.trim(),
        email: contact.email.value.trim(),
        message: contact.message.value.trim(),
        honeypot: contact.website ? contact.website.value : ''
      };
      if (data.honeypot) return;
      if (!data.name || !data.email || !data.message) {
        say(msgEl, 'Please fill in every field.');
        return;
      }
      say(msgEl, 'Sending...');
      fetch(API_BASE + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        contact.reset();
        say(msgEl, 'Message sent. We will be in touch.');
      }).catch(function () {
        say(msgEl, 'Could not reach the server. Opening your email program instead...');
        var subject = encodeURIComponent('kozzyx contact - ' + data.name);
        var body = encodeURIComponent(data.message + '\n\n- ' + data.name + ' <' + data.email + '>');
        window.location.href = 'mailto:hello@kozzyx.app?subject=' + subject + '&body=' + body;
      });
    });
  }

  var report = document.getElementById('reportForm');
  if (report) {
    report.addEventListener('submit', function (e) {
      e.preventDefault();
      var msgEl = document.getElementById('msg');
      var data = {
        reportType: report.reportType.value,
        discordId: report.discordId.value.trim(),
        serverId: report.serverId.value.trim(),
        description: report.description.value.trim(),
        evidence: report.evidence.value.trim()
      };
      if (!data.discordId || !data.description) {
        say(msgEl, 'Discord ID and description are required.');
        return;
      }
      say(msgEl, 'Submitting...');
      fetch(API_BASE + '/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        report.reset();
        say(msgEl, 'Report submitted. Thanks for helping keep kozzyx safe.');
      }).catch(function () {
        say(msgEl, 'Could not submit. Please try again in a minute.');
      });
    });
  }

  function say(el, text) { if (el) el.textContent = text; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
