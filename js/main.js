import { initLenis }          from './core/lenis.js';
import { setupGSAP }          from './core/gsap-setup.js';
import { initTheme }          from './components/theme.js';
import { initNavbar }         from './components/navbar.js';
import { initCursor }         from './components/cursor.js';
import { initCarousel }       from './components/carousel.js';
import { initForm }           from './components/form.js';
import { initProjectsReveal } from './components/projects-reveal.js';
import { runPreloader }       from './animations/preloader.js';
import { animateHero }        from './animations/hero.js';
import { initReveal }         from './animations/scroll-reveal.js';
import { animateProcess }     from './animations/process.js';
import { animateProjects }    from './animations/projects.js';
import { initParticles }      from './animations/particles.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  document.body.style.overflow = 'hidden';

  setupGSAP();
  initLenis();
  initNavbar();
  initCursor();
  initParticles();
  initProjectsReveal();

  runPreloader().then(() => {
    animateHero();
    initReveal();
    animateProcess();
    animateProjects();
  });

  initCarousel();
  initForm();
});
