(function () {
  'use strict';

  /* Animaciones de entrada — threshold 0 para que dispare con el header fijo */
  function initEntrada() {
    var targets = document.querySelectorAll('.ip-header, .ip-card, .ip-stats');
    if (!targets.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0 }); /* 0 = dispara en cuanto 1 pixel es visible */

    targets.forEach(function (el) { obs.observe(el); });
  }

  /* Hover sutil en ítems de servicio */
  function initServiceHover() {
    var items = document.querySelectorAll('.ip-service-item');
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        item.style.paddingLeft = '6px';
        item.style.transition = 'padding 0.18s ease';
      });
      item.addEventListener('mouseleave', function () {
        item.style.paddingLeft = '0';
      });
    });
  }

  /* Contador animado para +5000 */
  function initContador() {
    var el = document.querySelector('.ip-stat-number');
    if (!el) return;
    var objetivo = 5000;
    var arrancado = false;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !arrancado) {
          arrancado = true;
          var inicio = null;
          var duracion = 1400;
          function tick(ts) {
            if (!inicio) inicio = ts;
            var p = Math.min((ts - inicio) / duracion, 1);
            var ease = 1 - Math.pow(1 - p, 3);
            el.textContent = '+' + Math.floor(ease * objetivo);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = '+5000';
          }
          requestAnimationFrame(tick);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    obs.observe(el);
  }

  /* Punto de entrada */
  function init() {
    initEntrada();
    initServiceHover();
    initContador();
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