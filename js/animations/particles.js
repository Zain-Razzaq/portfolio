export function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, particles = [], animId;
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  function resize() {
    // Read from parent section, not canvas itself (canvas may report 0 before layout)
    const hero = canvas.parentElement;
    W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function getColors() {
    return isDark()
      ? { dot: 'rgba(100,140,220,', line: 'rgba(80,120,200,' }
      : { dot: 'rgba(35,59,110,',   line: 'rgba(35,59,110,' };
  }

  class Particle {
    constructor() { this.spawn(); }
    spawn() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 2.5 + 1;
      this.o  = Math.random() * 0.5 + 0.5;
    }
    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
  }

  function build() {
    if (W === 0 || H === 0) return;
    const count = Math.min(Math.floor((W * H) / 10000), 90);
    particles = Array.from({ length: count }, () => new Particle());
  }

  const LINK = 160;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (!particles.length) { animId = requestAnimationFrame(draw); return; }

    const c = getColors();

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK) {
          const alpha = (1 - dist / LINK) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = c.line + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.move();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = c.dot + p.o + ')';
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  // Defer until after first paint so offsetWidth is valid
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resize();
      build();
      draw();
    });
  });

  // Re-init on resize
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    build();
    draw();
  }, { passive: true });
}
