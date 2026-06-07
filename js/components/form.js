export function initForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  // EmailJS public key — user's existing config
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const msgEl = form.querySelector('.form-message');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending…';
    btn.disabled = true;

    if (msgEl) {
      msgEl.className = 'form-message';
      msgEl.textContent = '';
    }

    const data = {
      from_name:  form.querySelector('[name="name"]')?.value || '',
      from_email: form.querySelector('[name="email"]')?.value || '',
      message:    form.querySelector('[name="message"]')?.value || '',
    };

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
      } else {
        // Fallback: mailto
        window.location.href = `mailto:zainrazzaq2003@gmail.com?subject=Portfolio Contact from ${data.from_name}&body=${encodeURIComponent(data.message)}`;
      }

      if (msgEl) {
        msgEl.className = 'form-message success';
        msgEl.textContent = "Message sent! I'll get back to you soon.";
      }
      form.reset();
    } catch {
      if (msgEl) {
        msgEl.className = 'form-message error';
        msgEl.textContent = 'Something went wrong. Please email me directly.';
      }
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}
