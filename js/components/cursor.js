export function initCursor() {
  // Only on pointer-fine devices (desktop)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const glow = document.querySelector('.cursor-glow');

  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  const lerp = (a, b, n) => (1 - n) * a + n * b;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    if (glow) {
      glow.style.left = mouseX + 'px';
      glow.style.top  = mouseY + 'px';
    }
  });

  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // State changes
  const links = document.querySelectorAll('a, button, [role="button"], .project-card');

  links.forEach((el) => {
    const isProject = el.classList.contains('project-card');

    el.addEventListener('mouseenter', () => {
      ring.classList.add(isProject ? 'hovering-project' : 'hovering-link');
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hovering-link', 'hovering-project');
    });
  });

  // Show glow on hero section
  const hero = document.querySelector('.hero');
  if (hero && glow) {
    hero.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
    hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  }
}
