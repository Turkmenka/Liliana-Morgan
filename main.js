// Liliana Morgan — landing page interactions
document.addEventListener('DOMContentLoaded', () => {

  // 1. Smooth scrolling for in-page links
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 2. Reveal-on-scroll animation
  const revealTargets = document.querySelectorAll(
    '.about__left, .about__right, .code__tablet, .code__main, .code__side, ' +
    '.card, .polaroid, .cta__title, .cta__right, .contact__row'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
      io.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // 3. Subtle hero parallax
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.backgroundPosition = `center ${y * 0.3}px`;
    }
  }, { passive: true });
});