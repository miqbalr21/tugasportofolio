// Inisialisasi: tema, navigasi, form, tahun otomatis
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle with localStorage
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(current);

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  function setTheme(name){
    if(name === 'dark'){
      root.setAttribute('data-theme','dark');
      themeToggle.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', name);
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
  });

  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(id.length > 1){
        e.preventDefault();
        const el = document.querySelector(id);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Form handling (sederhana, tidak mengirim email — gunakan backend atau Formspree untuk produksi)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(!name || !email || !message){
      status.textContent = 'Mohon lengkapi semua field.';
      return;
    }
    if(!validateEmail(email)){
      status.textContent = 'Format email tidak valid.';
      return;
    }

    // Simulasi kirim
    status.textContent = 'Mengirim...';
    setTimeout(()=>{
      status.textContent = 'Terima kasih! Pesan Anda telah diterima (ini simulasi).';
      form.reset();
    }, 900);
  });

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();
});