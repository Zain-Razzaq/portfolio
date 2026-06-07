export function animateProjects() {
  if (typeof gsap === 'undefined') return;

  // Image parallax inside each card
  document.querySelectorAll('.project-card').forEach((card) => {
    const img = card.querySelector('.project-image');
    if (!img) return;

    gsap.fromTo(
      img,
      { y: -30 },
      {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  });
}
