export function initReveal() {
  if (typeof gsap === 'undefined') return;

  // Generic fade-up reveals
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Section headings — stagger word reveal
  document.querySelectorAll('.section-heading').forEach((heading) => {
    if (typeof SplitText !== 'undefined') {
      const split = new SplitText(heading, { type: 'words,chars' });
      gsap.fromTo(
        split.words,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        }
      );
    } else {
      // Fallback without SplitText
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
        }
      );
    }
  });

  // Service items stagger
  const serviceItems = document.querySelectorAll('.service-item');
  if (serviceItems.length) {
    gsap.fromTo(
      serviceItems,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // Tech pills random stagger
  const pills = document.querySelectorAll('.tech-pill');
  if (pills.length) {
    const shuffled = Array.from(pills).sort(() => Math.random() - 0.5);
    gsap.fromTo(
      shuffled,
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1, scale: 1,
        stagger: 0.04,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stack-grid',
          start: 'top 85%',
          once: true,
          onEnter: () => {
            // Start floating after reveal
            setTimeout(() => startPillFloat(), 600);
          },
        },
      }
    );
  }

  // About columns
  gsap.fromTo('.about-numbers', { x: -60, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.9,
    scrollTrigger: { trigger: '.about', start: 'top 80%', once: true },
  });
  gsap.fromTo('.about-content', { x: 60, opacity: 0 }, {
    x: 0, opacity: 1, duration: 0.9,
    scrollTrigger: { trigger: '.about', start: 'top 80%', once: true },
  });

  // Process steps
  const steps = document.querySelectorAll('.process-step');
  if (steps.length) {
    gsap.fromTo(steps, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.7,
      scrollTrigger: { trigger: '.process-grid', start: 'top 80%', once: true },
    });
  }

  // Project rows (desktop) + mobile cards
  const projectRows = document.querySelectorAll('.project-row, .project-mobile-card');
  if (projectRows.length) {
    gsap.fromTo(projectRows, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: { trigger: '.projects', start: 'top 80%', once: true },
    });
  }

  // Contact form fields
  const formGroups = document.querySelectorAll('.form-group');
  if (formGroups.length) {
    gsap.fromTo(formGroups, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
    });
  }

  // Footer
  gsap.fromTo('.footer', { opacity: 0 }, {
    opacity: 1, duration: 0.8,
    scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true },
  });
}

function startPillFloat() {
  document.querySelectorAll('.tech-pill').forEach((pill) => {
    const duration = 2.5 + Math.random() * 2;
    const delay = Math.random() * 2;
    const distance = 4 + Math.random() * 6;
    pill.style.setProperty('--float-start', '0px');
    pill.style.setProperty('--float-end', `-${distance}px`);
    pill.style.setProperty('--float-duration', `${duration}s`);
    pill.style.setProperty('--float-delay', `${delay}s`);
    pill.classList.add('floating');
  });
}
