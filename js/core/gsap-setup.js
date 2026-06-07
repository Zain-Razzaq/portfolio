export function setupGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  if (typeof SplitText !== 'undefined') {
    gsap.registerPlugin(SplitText);
  }

  gsap.defaults({ ease: 'power3.out', duration: 0.9 });

  ScrollTrigger.defaults({
    start: 'top 85%',
    end: 'bottom 15%',
    invalidateOnRefresh: true,
  });

  // Disable animations for reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(100);
  }
}
