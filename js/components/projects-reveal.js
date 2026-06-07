const PROJECT_META = [
  { title: 'Classly — AI Learning Platform',    tags: ['LLM', 'Auto-Grading', 'React', 'Node.js'] },
  { title: 'Olsey Aesthetics — E-Commerce',     tags: ['Shopify', 'Custom Theme', 'Responsive'] },
  { title: 'Bitcoin Yay — Crypto Platform',     tags: ['Next.js', 'REST APIs', 'MongoDB'] },
  { title: 'BioRegen — Pharma Website',          tags: ['React', 'Custom Design', 'Biotech'] },
];

export function initProjectsReveal() {
  const rows = document.querySelectorAll('.project-row');
  const previews = document.querySelectorAll('.preview-img');
  const placeholder = document.querySelector('.preview-placeholder');
  const metaTitle = document.querySelector('.preview-meta-title');
  const metaTags  = document.querySelector('.preview-meta-tags');

  if (!rows.length || !previews.length) return;

  function activate(index) {
    rows.forEach((r, i) => r.classList.toggle('active', i === index));
    previews.forEach((p, i) => p.classList.toggle('active', i === index));

    if (placeholder) placeholder.classList.add('hidden');

    if (metaTitle && PROJECT_META[index]) {
      metaTitle.textContent = PROJECT_META[index].title;
    }
    if (metaTags && PROJECT_META[index]) {
      metaTags.innerHTML = PROJECT_META[index].tags
        .map(t => `<span class="preview-tag">${t}</span>`)
        .join('');
    }
  }

  function deactivate() {
    rows.forEach(r => r.classList.remove('active'));
    previews.forEach(p => p.classList.remove('active'));
    if (placeholder) placeholder.classList.remove('hidden');
    if (metaTitle) metaTitle.textContent = 'Hover a project to preview';
    if (metaTags) metaTags.innerHTML = '';
  }

  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => activate(i));
    row.addEventListener('focus',      () => activate(i));
    // On leave, snap back to first project instead of showing placeholder
    row.addEventListener('mouseleave', () => activate(0));
    row.addEventListener('blur',       () => activate(0));
  });

  // Show first project by default on load
  activate(0);
}
