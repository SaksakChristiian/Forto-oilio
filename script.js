
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

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

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


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


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


const roles = [
  'Full Stack Developer',
  'Java Developer',
  'Frontend Engineer',
  'UI/UX Enthusiast',
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


const skillsData = {
  frontend: [
    { icon: '🌐', name: 'HTML5',       level: 'Expert',        pct: 95 },
    { icon: '🎨', name: 'CSS3',        level: 'Expert',        pct: 92 },
    { icon: '⚡', name: 'JavaScript',  level: 'Advanced',      pct: 88 },
    { icon: '⚛️', name: 'React.js',    level: 'Intermediate',  pct: 75 },
    { icon: '🎭', name: 'Bootstrap',   level: 'Advanced',      pct: 85 },
    { icon: '💨', name: 'Tailwind',    level: 'Intermediate',  pct: 70 },
  ],
  backend: [
    { icon: '☕', name: 'Java',        level: 'Advanced',      pct: 85 },
    { icon: '🐘', name: 'PostgreSQL',  level: 'Intermediate',  pct: 72 },
    { icon: '🐬', name: 'MySQL',       level: 'Advanced',      pct: 80 },
  ],
  tools: [
    { icon: '🐙', name: 'Git & GitHub', level: 'Advanced',     pct: 88 },
    { icon: '🖥️', name: 'VS Code',      level: 'Expert',       pct: 95 },
    { icon: '🎨', name: 'Figma',        level: 'Intermediate', pct: 65 },
  ]
};

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

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
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

const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.dataset.tab);
  });
});

renderSkills('frontend');


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
revealOnScroll();


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


const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-primary');
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    btn.innerHTML = 'Kirim Pesan <span class="arrow">→</span>';
    btn.disabled  = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1400);
});


document.getElementById('downloadCV')?.addEventListener('click', (e) => {
  e.preventDefault();
  const link = document.createElement('a');
  link.href     = 'cv-aryan-pratama.pdf'; // 
  link.download = 'CV-Saksak-Christiian-Rambe-Purba.pdf';
  link.click();
  alert('CV akan segera didownload! Pastikan file cv-saksak-rambe.pdf tersedia.');
});


document.getElementById('backTop')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});