/* ===================================================
   STARDEW VALLEY PORTFOLIO - JavaScript
   =================================================== */

// ===================== STARS =====================
function createStars() {
  const bg = document.querySelector('.farm-bg');
  if (!bg) return;
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 4 + 2;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 38}%;
      --dur:${(Math.random() * 3 + 2).toFixed(1)}s;
      --delay:${(Math.random() * 4).toFixed(1)}s;
    `;
    bg.appendChild(s);
  }
}

// ===================== SKILL BARS =====================
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => { el.style.width = el.dataset.width + '%'; }, 200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => observer.observe(b));
}

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

// ===================== ACTIVE NAV =====================
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const href = btn.getAttribute('href');
    btn.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

// ===================== FLOATING PARTICLES =====================
function createParticles() {
  const items = ['🌱', '🌿', '⭐', '✨', '🍃', '🌾', '🌸'];
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rise-up {
      0%   { transform: translateY(0) rotate(0deg); opacity: 0.7; }
      100% { transform: translateY(-110vh) rotate(540deg); opacity: 0; }
    }
    .float-particle {
      position: fixed;
      pointer-events: none;
      z-index: -1;
      animation: rise-up linear forwards;
    }
  `;
  document.head.appendChild(style);

  setInterval(() => {
    const p = document.createElement('div');
    p.className = 'float-particle';
    p.textContent = items[Math.floor(Math.random() * items.length)];
    const dur = (Math.random() * 6 + 8).toFixed(1);
    p.style.cssText = `
      left:${Math.random() * 100}vw;
      bottom:-60px;
      font-size:${Math.random() * 14 + 12}px;
      animation-duration:${dur}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), parseFloat(dur) * 1000 + 200);
  }, 2500);
}

// ===================== COUNTER ANIMATION =====================
function animateCounters() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const inc = target / 50;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + suffix;
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ===================== CERTIFICATE MODAL =====================
function initCertModal() {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('.modal-img');
  const modalTitle = modal.querySelector('.modal-title');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('[data-cert]').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.cert;
      const title = card.dataset.certTitle || '';

      if (src.endsWith('.pdf')) {
        window.open(src, '_blank');
        return;
      }

      modalImg.src = src;
      modalTitle.textContent = title;
      modal.classList.add('open');
    });
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
}

// ===================== PAGE TRANSITION =====================
function initPageTransition() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = '1'; }));

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 320);
      });
    }
  });
}

// ===================== MOBILE MENU =====================
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger) return;

  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ===================== PIXEL CURSOR SPARKLE =====================
function initCursorSparkle() {
  const sparks = ['✦', '✧', '⭐', '✨', '·'];
  const style = document.createElement('style');
  style.textContent = `
    .cursor-spark {
      position: fixed;
      pointer-events: none;
      font-size: 14px;
      z-index: 9999;
      animation: spark-fade 0.6s ease-out forwards;
    }
    @keyframes spark-fade {
      0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%,-120%) scale(0.3); }
    }
  `;
  document.head.appendChild(style);

  let lastSpark = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastSpark < 80) return;
    lastSpark = now;

    const sp = document.createElement('span');
    sp.className = 'cursor-spark';
    sp.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    sp.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; color: hsl(${Math.random()*60 + 30}, 90%, 60%);`;
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 650);
  });
}

// ===================== CONTACT FORM =====================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoURL = `mailto:chinmai.mokida22422@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoURL;

    // Visual feedback
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '📧 OPENING EMAIL CLIENT...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
    }, 3000);
  });
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  animateSkillBars();
  initScrollReveal();
  setActiveNav();
  createParticles();
  animateCounters();
  initCertModal();
  initPageTransition();
  initMobileMenu();
  initCursorSparkle();
  initContactForm();
});
