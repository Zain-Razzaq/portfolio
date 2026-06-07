export function initTheme() {
  const saved = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = saved || system;

  document.documentElement.setAttribute('data-theme', theme);
  updateToggleUI(theme);

  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleUI(next);
  });
}

function updateToggleUI(theme) {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  const label = toggleBtn.querySelector('.toggle-label');
  const sunIcon = toggleBtn.querySelector('.icon-sun');
  const moonIcon = toggleBtn.querySelector('.icon-moon');

  if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  if (sunIcon) sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
  if (moonIcon) moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
}
