// Animación de conteo en estadísticas
const animateCount = (el, target, prefix = '', suffix = '') => {
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        el.textContent = prefix + start.toLocaleString() + suffix;
    }, 16);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(document.querySelectorAll('.stat-num')[0], 100, '', '%');
            animateCount(document.querySelectorAll('.stat-num')[1], 5000, '+', '');
            animateCount(document.querySelectorAll('.stat-num')[2], 24, '', 'h');
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.nosotros-stats'));