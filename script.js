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

// автопауза секционных видео + fade-in по видимости
(() => {
  const vids = Array.from(document.querySelectorAll('.section-video'));
  if (!vids.length || !('IntersectionObserver' in window)) return;

  vids.forEach(v => v.style.opacity = '0');

  const onVis = (entries) => {
    for (const e of entries) {
      const v = e.target;
      if (e.isIntersecting) {
        v.play().catch(()=>{});
        v.style.transition = 'opacity .6s ease';
        v.style.opacity = '1';
      } else {
        v.pause();
      }
    }
  };

  const io = new IntersectionObserver(onVis, { root: null, threshold: 0.25 });
  vids.forEach(v => io.observe(v));
})();

// === Anchor smart scroll (respects fixed #topnav height) ===
(function(){
  function topnavH(){
    const n = document.getElementById('topnav');
    return (n && n.offsetHeight) || 60;
  }
  function setVar(){
    document.documentElement.style.setProperty('--topnav-h', topnavH() + 'px');
  }
  function scrollToId(id){
    const el = document.getElementById(id);
    if(!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - topnavH() - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  // Init
  document.addEventListener('DOMContentLoaded', () => {
    setVar();
    // Если пришли по хэшу — скорректируем позицию
    if(location.hash && location.hash.length > 1){
      setTimeout(()=>scrollToId(decodeURIComponent(location.hash.substring(1))), 0);
    }
  });
  window.addEventListener('resize', setVar);

  // Перехватываем клики по якорям и скроллим точно под меню
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    const id = decodeURIComponent(href.slice(1));
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    scrollToId(id);
    history.pushState(null, '', '#' + id);
  });

  // Обработка прямой смены hash (например, Back/Forward)
  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent((location.hash || '').slice(1));
    if(id) scrollToId(id);
  });
})();

// === Mobile bottom-nav icons mapping v2 ===
(function(){
  function setIcons(){
    var nav = document.getElementById('topnav');
    if(!nav) return;
    var links = nav.querySelectorAll('.tabs a');
    links.forEach(function(a){
      var t = (a.textContent || "").toLowerCase();
      var h = (a.getAttribute('href') || "").toLowerCase();
      var icon = "❖";
      if (/summ|summary|глав|о мне|about/.test(t+h)) icon = "🧭";
      else if (/компет|skills|skill|навык/.test(t+h)) icon = "🧠";
      else if (/proj|портф|works|cases|case/.test(t+h)) icon = "📂";
      else if (/exp|опыт|career|cv|резюме/.test(t+h)) icon = "💼";
      else if (/pub|стать|articles|blog/.test(t+h)) icon = "🧾";
      else if (/cont|контакт|phone|tel/.test(t+h)) icon = "📞";
      a.setAttribute("data-ico", icon);
    });
  }
  document.addEventListener('DOMContentLoaded', setIcons);
  window.addEventListener('hashchange', setIcons);
  window.addEventListener('resize', setIcons);
})();
// === Mobile bottom-nav icons mapping v2 ===
(function(){
  function setIcons(){
    var nav = document.getElementById('topnav');
    if(!nav) return;
    var links = nav.querySelectorAll('.tabs a');
    links.forEach(function(a){
      var t = (a.textContent || "").toLowerCase();
      var h = (a.getAttribute('href') || "").toLowerCase();
      var icon = "❖";
      if (/summ|summary|глав|о мне|about/.test(t+h)) icon = "🧭";
      else if (/компет|skills|skill|навык/.test(t+h)) icon = "🧠";
      else if (/proj|портф|works|cases|case/.test(t+h)) icon = "📂";
      else if (/exp|опыт|career|cv|резюме/.test(t+h)) icon = "💼";
      else if (/pub|стать|articles|blog/.test(t+h)) icon = "🧾";
      else if (/cont|контакт|phone|tel/.test(t+h)) icon = "📞";
      a.setAttribute("data-ico", icon);
    });
  }
  document.addEventListener('DOMContentLoaded', setIcons);
  window.addEventListener('hashchange', setIcons);
  window.addEventListener('resize', setIcons);
})();
// === bottom-nav icons mapping (stable, veryfinal) ===
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('#topnav');
  if (!nav) return;
  nav.querySelectorAll('a').forEach(a => {
    const t = (a.textContent || "").toLowerCase();
    const h = (a.getAttribute("href") || "").toLowerCase();
    if (a.dataset.ico) return; // уже есть
    let icon = "❖";
    if (/summ|about|глав/.test(t+h)) icon = "🧭";
    else if (/компет|skill/.test(t+h)) icon = "🧠";
    else if (/proj|портф/.test(t+h)) icon = "📂";
    else if (/exp|резюме|career/.test(t+h)) icon = "💼";
    else if (/pub|стать|article/.test(t+h)) icon = "🧾";
    else if (/cont|контакт|tel|phone/.test(t+h)) icon = "📞";
    a.dataset.ico = icon;
  });
});
