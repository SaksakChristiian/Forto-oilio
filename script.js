/**
 * ============================================================
 * PORTFOLIO JAVASCRIPT — script.js
 * Author : Saksak Christiian Rambe Purba
 * Handles: Cursor, Navbar, Typing effect, Skills tabs,
 *          Counter animation, Scroll reveal, Form submit
 * ============================================================
 */

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower using requestAnimationFrame
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card, .info-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});


// ── NAVBAR SCROLL ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ── HAMBURGER MENU ────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ── TYPING EFFECT ─────────────────────────────────────────────
const roles = [
  'Siswa SMK Programmer',
  'Web Developer Pemula',
  'Java Enthusiast',
  'HTML & CSS Learner',
  'Problem Solver'
];
let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typedText = document.getElementById('typedText');

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    roleIndex   = (roleIndex + 1) % roles.length;
    delay       = 400;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();


// ── SKILLS DATA ───────────────────────────────────────────────
const skillsData = {
  frontend: [
    { icon: '🌐', name: 'HTML5',       level: 'Intermediate',  pct: 70 },
    { icon: '🎨', name: 'CSS3',        level: 'Intermediate',  pct: 65 },
    { icon: '⚡', name: 'JavaScript',  level: 'Intermediate',  pct: 60 },
    { icon: '🎭', name: 'Bootstrap',   level: 'Intermediate',  pct: 60 },
  ],
  backend: [
    { icon: '☕', name: 'Java',        level: 'Intermediate',  pct: 65 },
    { icon: '🐬', name: 'MySQL',       level: 'Intermediate',  pct: 55 },
  ],
  tools: [
    { icon: '🐙', name: 'Git & GitHub', level: 'Intermediate', pct: 60 },
    { icon: '🖥️', name: 'VS Code',      level: 'Intermediate', pct: 70 },
    { icon: '🎨', name: 'Figma',        level: 'Intermediate', pct: 50 },
  ]
};

// Render skills into grid
function renderSkills(category) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = '';

  skillsData[category].forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-level">${skill.level}</div>
      <div class="skill-bar">
        <div class="skill-fill" data-pct="${skill.pct}"></div>
      </div>`;
    grid.appendChild(card);
  });

  // Animate progress bars after DOM is painted
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      // Re-add cursor hover for new cards
      document.querySelectorAll('.skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hover');
          cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover');
          cursorFollower.classList.remove('hover');
        });
      });
    });
  });
}

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.dataset.tab);
  });
});

// Initial render
renderSkills('frontend');


// ── COUNTER ANIMATION ─────────────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = (target / duration) * 16;
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

let countersStarted = false;
function checkCounters() {
  if (countersStarted) return;
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    countersStarted = true;
    document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
  }
}


// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('revealed');
    }
  });
  checkCounters();
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load for above-fold elements
revealOnScroll();


// ── SMOOTH ACTIVE NAV LINK ────────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(lnk => {
        lnk.classList.remove('active');
        if (lnk.getAttribute('href') === '#' + sec.id) {
          lnk.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav);


// ── CONTACT FORM ──────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-primary');
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  // Simulate async send (replace with real API call)
  setTimeout(() => {
    contactForm.reset();
    btn.innerHTML = 'Kirim Pesan <span class="arrow">→</span>';
    btn.disabled  = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1400);
});


// ── DOWNLOAD CV BUTTON ────────────────────────────────────────
document.getElementById('downloadCV')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Replace the href below with your actual CV file path
  const link = document.createElement('a');
  link.href     = 'cv-aryan-pratama.pdf'; // ← ganti dengan path CV kamu
  link.download = 'CV-Saksak-Christiian-Rambe-Purba.pdf';
  link.click();
  alert('CV akan segera didownload! Pastikan file cv-saksak-rambe.pdf tersedia.');
});


// ── BACK TO TOP ───────────────────────────────────────────────
document.getElementById('backTop')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});