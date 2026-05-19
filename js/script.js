/* ============================================================
   À CHAQUE LANGUE, SA BIBLE — Script principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navigation active link ───
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ─── Hamburger menu mobile ───
  const toggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Fermer le menu sur clic d'un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ─── Navbar scroll effect ───
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(5,5,5,0.98)';
      } else {
        nav.style.background = 'rgba(5,5,5,0.92)';
      }
    });
  }

  // ─── Intersection Observer (animations au scroll) ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

  // ─── Formulaire de contact ───
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;

      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      // Simulation d'envoi (à remplacer par Formspree ou Netlify Forms)
      setTimeout(() => {
        const msg = document.getElementById('form-success');
        if (msg) msg.style.display = 'block';
        contactForm.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 1500);
    });
  }

  // ─── Année dynamique dans le footer ───
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
