// Tips form. If a Web3Forms access key is configured, submit over AJAX and show
// an in-character success line. If not (or if the network fails), fall back to a
// prefilled mailto: so a tip is never lost. No-JS submits post straight to
// Web3Forms and redirect to /thanks/.
(function () {
  var form = document.getElementById('tips-form');
  if (!form) return;
  var statusEl = document.getElementById('tips-status');
  var key = (form.getAttribute('data-access-key') || '').trim();
  var mailto = form.getAttribute('data-mailto') || '';

  function show(msg, ok) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form__status form__status--show' + (ok ? ' form__status--ok' : '');
  }

  function openMailto() {
    var subj = encodeURIComponent((form.subject && form.subject.value) || 'Tip — Cult News');
    var body = encodeURIComponent(
      'Name: ' + ((form.name && form.name.value) || '') + '\n' +
      'Email: ' + ((form.email && form.email.value) || '') + '\n\n' +
      ((form.message && form.message.value) || '')
    );
    window.location.href = 'mailto:' + mailto + '?subject=' + subj + '&body=' + body;
  }

  form.addEventListener('submit', function (e) {
    // Honeypots — silently drop bots.
    if ((form.botcheck && form.botcheck.checked) || (form.company && form.company.value)) {
      e.preventDefault();
      return;
    }

    if (!key) {
      // No live relay configured: use the mail client instead.
      e.preventDefault();
      show('Opening your mail client…', true);
      openMailto();
      return;
    }

    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    show('Filing your tip…', false);

    var data = new FormData(form);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json && json.success) {
          form.reset();
          show('Received. A reporter will reach you between deadlines.', true);
        } else {
          show('The wire dropped. Opening your mail client instead…', false);
          openMailto();
        }
      })
      .catch(function () {
        show('The wire dropped. Opening your mail client instead…', false);
        openMailto();
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send to the desk'; }
      });
  });
})();
