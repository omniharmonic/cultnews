// Late Edition — the theme toggle. Night is the default; a 'day' choice is
// persisted explicitly to localStorage so it survives across visits.
(function () {
  var KEY = 'cultnews-theme';
  var root = document.documentElement;
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  function isNight() { return root.getAttribute('data-theme') === 'night'; }

  function sync() {
    var night = isNight();
    btn.setAttribute('aria-pressed', night ? 'true' : 'false');
    btn.textContent = night ? 'Day Edition' : 'Late Edition';
  }

  btn.addEventListener('click', function () {
    var night = !isNight();
    if (night) root.setAttribute('data-theme', 'night');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem(KEY, night ? 'night' : 'day'); } catch (e) {}
    sync();
  });

  sync();
})();
