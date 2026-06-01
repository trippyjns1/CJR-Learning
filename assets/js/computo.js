(function () {
  'use strict';

  /* Sistema de tabs / paneles */
  function initTabs() {
    var tabs = document.querySelectorAll('.cp-tab');
    var panels = document.querySelectorAll('.cp-panel');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;
        tabs.forEach(function (t) {
          t.classList.remove('cp-tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('cp-tab--active');
        tab.setAttribute('aria-selected', 'true');
        panels.forEach(function (p) { p.classList.remove('cp-panel--active'); });
        var active = document.querySelector('.cp-panel[data-panel="' + target + '"]');
        if (active) active.classList.add('cp-panel--active');
      });
    });
  }

  /* Animaciones de entrada — threshold 0 para que dispare aunque el header tape parte */
  function initEntrada() {
    var targets = document.querySelectorAll(
      '.cp-header, .cp-tabs, .cp-cta-banner, .cp-tagline'
    );
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });           /* 0 = dispara en cuanto 1 pixel es visible */
    targets.forEach(function (el) { obs.observe(el); });
  }

  function init() {
    initTabs();
    initEntrada();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Hamburger */
  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');
  if (menuBtn) menuBtn.addEventListener('click', function () { mainNav.classList.toggle('open'); });
})();