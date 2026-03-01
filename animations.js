/* ===========================
   Out of the Ashes — Scroll Animations
   Uses IntersectionObserver for tasteful fade-in reveals.
   Respects prefers-reduced-motion.
   =========================== */

(function () {
    'use strict';

    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Page load fade-in
    document.body.classList.add('page-loaded');

    if (prefersReducedMotion) {
        // Make everything visible immediately
        document.querySelectorAll('.animate-in').forEach(el => el.classList.add('visible'));
        return;
    }

    // Scroll-triggered fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

    // Stat count-up animation
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(el => {
                    const text = el.textContent.trim();
                    const match = text.match(/^(\d+)/);
                    if (match) {
                        const target = parseInt(match[1], 10);
                        const suffix = text.replace(match[1], '');
                        animateCount(el, target, suffix);
                    }
                });
                countUpObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stats-strip').forEach(el => countUpObserver.observe(el));

    function animateCount(el, target, suffix) {
        const duration = 1200;
        const start = performance.now();
        el.textContent = '0' + suffix;

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }
})();
