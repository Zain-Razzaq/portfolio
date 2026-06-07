import { initCounters } from '../components/counter.js';

export function animateHero() {
  const label  = document.querySelector('.hero-label');
  const titleLines = document.querySelectorAll('.hero-title .line-wrapper');
  const body   = document.querySelector('.hero-body');
  const ctas   = document.querySelector('.hero-ctas');
  const stats  = document.querySelector('.hero-stats');
  const grid   = document.querySelector('.hero-grid');

  if (typeof gsap === 'undefined') {
    // Fallback: just show everything
    [label, body, ctas, stats].forEach(el => {
      if (el) { el.style.opacity = 1; el.style.transform = 'none'; }
    });
    titleLines.forEach(el => {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    initCounters();
    return;
  }

  const tl = gsap.timeline();

  // Nav fade in
  tl.to('.navbar', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2);

  // Label
  tl.to(label, { opacity: 1, y: 0, duration: 0.7 }, 0.3);

  // Title lines — clip reveal from bottom
  titleLines.forEach((line, i) => {
    tl.fromTo(
      line,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.4 + i * 0.1
    );
  });

  // Body + CTAs
  tl.to(body,  { opacity: 1, y: 0, duration: 0.7 }, 0.85);
  tl.to(ctas,  { opacity: 1, y: 0, duration: 0.7 }, 0.95);
  tl.to(stats, { opacity: 1, y: 0, duration: 0.7 }, 1.05);

  // Initialize counters (they use ScrollTrigger internally)
  initCounters();

  // Hero parallax on scroll
  if (grid) {
    gsap.to(grid, {
      backgroundPositionY: '30px',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // Hero content fades out as user scrolls away
  gsap.to('.hero-content', {
    y: -60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '40% top',
      scrub: 1,
    },
  });
}
