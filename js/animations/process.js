export function animateProcess() {
  const flow = document.querySelector('.process-flow');
  if (!flow) return;

  const steps = document.querySelectorAll('.process-step');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Animate the track fill line on scroll
    ScrollTrigger.create({
      trigger: '.process-flow',
      start: 'top 70%',
      onEnter: () => flow.classList.add('animate-track'),
      onLeaveBack: () => flow.classList.remove('animate-track'),
    });

    // Stagger-activate each step node
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 80%',
        onEnter: () => step.classList.add('step-active'),
        onLeaveBack: () => step.classList.remove('step-active'),
      });
    });
  } else {
    flow.classList.add('animate-track');
    steps.forEach(s => s.classList.add('step-active'));
  }
}
