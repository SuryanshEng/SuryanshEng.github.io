document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}));

// Typing line
const words = ['Algorithms.', 'C++ and Java.', 'Research.', 'Contests.'];
const el = document.getElementById('typed');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  el.textContent = words.join(' ');
  el.style.borderRight = 'none';
} else {
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) c++;
    else if (!del) { del = true; return setTimeout(tick, 1200); }
    else if (c > 0) c--;
    else { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 50 : 100);
  })();
}

// Active nav link
const links = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));

// Certificate filters
const filters = document.querySelectorAll('.filters button');
const figs = document.querySelectorAll('.certs figure');
filters.forEach(b => b.addEventListener('click', () => {
  filters.forEach(x => x.classList.toggle('on', x === b));
  figs.forEach(f => f.classList.toggle('hide', b.dataset.f !== 'all' && f.dataset.c !== b.dataset.f));
}));

// Certificate lightbox
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.certs button').forEach(b => b.addEventListener('click', () => {
  lbImg.src = b.dataset.img;
  lbImg.alt = b.querySelector('img').alt;
  lb.classList.add('open');
}));
const closeLb = () => lb.classList.remove('open');
lb.addEventListener('click', e => { if (e.target !== lbImg) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// Contact form opens email app (GitHub Pages has no backend)
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get('message')}\n\nFrom: ${f.get('name')} (${f.get('email')})`;
  window.location.href = 'mailto:suryanshtiwari512@gmail.com?subject=' +
    encodeURIComponent('Portfolio message from ' + f.get('name')) +
    '&body=' + encodeURIComponent(body);
});
