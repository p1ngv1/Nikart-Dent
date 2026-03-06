 // ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ── Burger ──
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  function closeMobile() {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }

  // ── Reveal on scroll ──
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // ── Slider ──
  const track = document.getElementById('sliderTrack');
  const cards = track.querySelectorAll('.cert-card');
  const dotsContainer = document.getElementById('dots');
  let current = 0;

  function getVisible() {
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function totalSlides() {
    return Math.max(1, cards.length - getVisible() + 1);
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const n = totalSlides();
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    }
  }


  
function goTo(index) {
  current = (index + cards.length) % cards.length;
  track.style.transform = `translateX(-${current * 80}%)`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );
}

  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

  buildDots();
  window.addEventListener('resize', () => { current = 0; buildDots(); goTo(0); });

  // ── Form ──
  function handleForm(btn) {
    btn.textContent = '✓ Заявка отправлена!';
    btn.style.background = 'linear-gradient(135deg,#4caf8a,#2e7d5e)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Отправить заявку';
      btn.style.background = '';
      btn.disabled = false;
    }, 3500);
  }