/* ===========================
   Out of the Ashes — Image Lightbox
   Minimal, tasteful click-to-expand for figures.
   =========================== */

(function () {
    'use strict';

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('.lightbox-img');
    const lbCaption = overlay.querySelector('.lightbox-caption');
    const lbClose = overlay.querySelector('.lightbox-close');

    // Open lightbox on figure img click
    document.querySelectorAll('figure img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function (e) {
            e.preventDefault();
            const figure = this.closest('figure');
            const caption = figure ? figure.querySelector('figcaption') : null;

            lbImg.src = this.src;
            lbImg.alt = this.alt;
            lbCaption.textContent = caption ? caption.textContent : '';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close handlers
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
})();
