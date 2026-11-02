document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('year');
  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const currentPage = href.split('/').pop();
    if (page && currentPage === `${page}.html`) link.classList.add('active');
    if (!page && currentPage === 'index.html') link.classList.add('active');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left').forEach((el) => observer.observe(el));

  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const statusEl = form.querySelector('.form-status');
      const fields = form.querySelectorAll('[required]');
      let isValid = true;

      fields.forEach((field) => {
        const val = field.value.trim();
        if (!val) {
          isValid = false;
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      if (!isValid) {
        if (statusEl) {
          statusEl.textContent = 'Please complete all required fields before submitting.';
          statusEl.className = 'form-status error';
        }
        return;
      }

      if (statusEl) {
        statusEl.textContent = 'This form is validated locally for preview. Connect it to a working backend to send messages.';
        statusEl.className = 'form-status success';
      }

      form.reset();
    });
  });
});
