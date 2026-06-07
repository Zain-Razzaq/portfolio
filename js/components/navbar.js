export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const scrollThreshold = 80;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Smooth scroll for nav CTA
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#contact');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
