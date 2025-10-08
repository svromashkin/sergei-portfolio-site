// год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// копирование email
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = btn.getAttribute('data-copy');
    const el = document.querySelector(sel);
    const text = el?.textContent?.trim();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const prev = btn.textContent;
      btn.textContent = 'Скопировано ✓';
      setTimeout(() => (btn.textContent = prev), 1200);
    });
  });
});
