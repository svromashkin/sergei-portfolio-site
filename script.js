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

// плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// кнопка печати в PDF
const printBtn = document.getElementById('printBtn');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

// авто-пауза/плей видео по видимости
(() => {
  const v = document.getElementById('heroVideo');
  if (!v || !('IntersectionObserver' in window)) return;

  const onVis = (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    }
  };
  const io = new IntersectionObserver(onVis, { root: null, threshold: 0.25 });
  io.observe(v);

  // страховка: на тач-устройствах без автоплея — попытаться стартануть через жест
  document.addEventListener('touchstart', () => v.play().catch(()=>{}), { once: true, passive: true });
})();
