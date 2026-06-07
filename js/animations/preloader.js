export function runPreloader() {
  return new Promise((resolve) => {
    const preloader = document.querySelector('.preloader');
    const logo = document.querySelector('.preloader-logo');

    if (!preloader) { resolve(); return; }

    // Trigger logo animation
    requestAnimationFrame(() => {
      setTimeout(() => { logo?.classList.add('visible'); }, 50);
    });

    // Exit after bar fills (bar takes 0.3s delay + 0.9s = 1.2s)
    setTimeout(() => {
      preloader.classList.add('exit');
      document.body.style.overflow = '';

      setTimeout(() => {
        preloader.style.display = 'none';
        resolve();
      }, 700); // match CSS transition duration
    }, 1200);
  });
}
