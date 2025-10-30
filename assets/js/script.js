/* global document, window */
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle (persist in localStorage)
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function setTheme(t) {
    if (t === 'dark') {
      root.style.setProperty('--bg', '#071827');
      document.body.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
      themeBtn.textContent = '☀️';
    } else {
      root.style.removeProperty('--bg');
      document.body.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
      themeBtn.textContent = '🌓';
    }
  }

  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);

  themeBtn.addEventListener('click', () => {
    const current = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Simple scroll reveal for .fade-up
  const revealElems = document.querySelectorAll('.fade-up');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    revealElems.forEach(el => {
      const box = el.getBoundingClientRect();
      if (box.top < trigger) el.classList.add('visible');
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Modal image viewer
  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.img;
      modalImg.src = src;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Smooth scroll polyfill is not required as CSS includes scroll-behavior in modern browsers,
  // but we can ensure anchor clicks are smooth:
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
});
