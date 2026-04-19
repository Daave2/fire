/* ===========================
   Out of the Ashes — Image Lightbox
   Minimal, tasteful click-to-expand for figures.
   =========================== */

(function () {
    'use strict';

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Expanded image');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.tabIndex = -1;
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('.lightbox-img');
    const lbCaption = overlay.querySelector('.lightbox-caption');
    const lbClose = overlay.querySelector('.lightbox-close');
    let lastFocusedElement = null;

    document.querySelectorAll('figure img').forEach(img => {
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Open image: ${img.alt || 'site photograph'}`);
        img.addEventListener('click', () => openLightbox(img));
        img.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            openLightbox(img);
        });
    });

    function openLightbox(img) {
        const figure = img.closest('figure');
        const caption = figure ? figure.querySelector('figcaption') : null;

        lastFocusedElement = document.activeElement;
        lbImg.src = img.dataset.fullsrc || img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = caption ? caption.textContent : '';
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lbClose.focus({ preventScroll: true });
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lbImg.removeAttribute('src');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus({ preventScroll: true });
        }
    }

    lbClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
        if (e.key === 'Tab' && overlay.classList.contains('active')) {
            e.preventDefault();
            lbClose.focus({ preventScroll: true });
        }
    });
})();
