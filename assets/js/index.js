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

const statsSection = document.querySelector('.nosotros-stats');
if (statsSection) {
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

    observer.observe(statsSection);
}

// Scroll horizontal cursos
const cursosGrid = document.querySelector('.spss-cursos-grid');
const prevBtn = document.getElementById('cursosPrev');
const nextBtn = document.getElementById('cursosNext');

if (cursosGrid && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        cursosGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
        cursosGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

// Efecto de escala en testimonios al centro
const track = document.querySelector('.testimonios-track');
const wrap = document.querySelector('.testimonios-track-wrap');

if (track && wrap) {
    const updateScale = () => {
        const slides = track.querySelectorAll('.testimonio-slide');
        const wrapCenter = wrap.getBoundingClientRect().left + wrap.offsetWidth / 2;

        slides.forEach(slide => {
            const slideCenter = slide.getBoundingClientRect().left + slide.offsetWidth / 2;
            const distance = Math.abs(wrapCenter - slideCenter);
            const maxDistance = wrap.offsetWidth / 2;
            const scale = Math.max(0.85, 1.15 - (distance / maxDistance) * 0.3);
            slide.style.transform = `scale(${scale})`;
            slide.style.zIndex = Math.round(scale * 10);
        });
    };

    // Actualizar en cada frame de la animación
    setInterval(updateScale, 50);
}