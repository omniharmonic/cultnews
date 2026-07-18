// Tips form. Submits over AJAX to the Web3Forms relay and shows an in-character
// status line. No-JS submits post straight to Web3Forms and redirect to /thanks/.
(function () {
  var form = document.getElementById('tips-form');
  if (!form) return;
  var statusEl = document.getElementById('tips-status');

  function show(msg, ok) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form__status form__status--show' + (ok ? ' form__status--ok' : '');
  }

  form.addEventListener('submit', function (e) {
    // Honeypots — silently drop bots.
    if ((form.botcheck && form.botcheck.checked) || (form.company && form.company.value)) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    show('Filing your tip…', false);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json && json.success) {
          form.reset();
          show('Received. A reporter will reach you between deadlines.', true);
        } else {
          show('The wire dropped. Please try again in a moment.', false);
        }
      })
      .catch(function () {
        show('The wire dropped. Please try again in a moment.', false);
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send to the desk'; }
      });
  });
})();
