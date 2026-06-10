// ================================
// Custom Cursor (only runs if cursor elements exist)
// ================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverables = document.querySelectorAll('a, button, .btn, .pill, .tag, .feature-card, .project, .stack-category, .fact, .contact-link, .nav-links a, .goals-list li');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

// ================================
// Reveal on Scroll
// ================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Stat counter
      const stats = entry.target.querySelectorAll('.stat-value[data-target]');
      stats.forEach(stat => {
        if (stat.dataset.animated) return;
        stat.dataset.animated = 'true';
        const target = parseFloat(stat.dataset.target);
        const isFloat = target % 1 !== 0;
        const duration = 1500;
        const start = performance.now();
        const startVal = 0;
        const animateCount = (now) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = startVal + (target - startVal) * eased;
          stat.textContent = isFloat ? value.toFixed(1) : Math.floor(value);
          if (t < 1) requestAnimationFrame(animateCount);
          else stat.textContent = isFloat ? target.toFixed(1) : target;
        };
        requestAnimationFrame(animateCount);
      });

      // Feature card stagger
      const cards = entry.target.querySelectorAll('.feature-card');
      cards.forEach((card, i) => {
        const delay = parseInt(card.dataset.delay) || i * 80;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.7s, transform 0.7s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, delay);
      });
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Trigger hero stat counters on load
window.addEventListener('load', () => {
  setTimeout(() => {
    const heroStats = document.querySelectorAll('.hero-stats .stat-value[data-target]');
    heroStats.forEach(stat => {
      if (stat.dataset.animated) return;
      stat.dataset.animated = 'true';
      const target = parseFloat(stat.dataset.target);
      const isFloat = target % 1 !== 0;
      const duration = 1800;
      const start = performance.now();
      const animateCount = (now) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = target * eased;
        stat.textContent = isFloat ? value.toFixed(1) : Math.floor(value);
        if (t < 1) requestAnimationFrame(animateCount);
        else stat.textContent = isFloat ? target.toFixed(1) : target;
      };
      requestAnimationFrame(animateCount);
    });
  }, 1500);
});

// ================================
// Subtitle Rotator
// ================================
const rotator = document.getElementById('rotator');
const titles = [
  'Data Scientist',
  'Full-Stack Builder',
  'Founder of Cronk',
  'AI Tinkerer',
  'BYU–Idaho Student',
  'Entrepreneur'
];

let titleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let pauseUntil = 0;

function typeLoop() {
  const now = performance.now();
  if (now < pauseUntil) {
    requestAnimationFrame(typeLoop);
    return;
  }

  const current = titles[titleIdx];
  if (!isDeleting) {
    charIdx++;
    rotator.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      pauseUntil = now + 1800;
    }
  } else {
    charIdx--;
    rotator.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      pauseUntil = now + 200;
    }
  }
  setTimeout(() => requestAnimationFrame(typeLoop), isDeleting ? 40 : 90);
}

setTimeout(() => {
  rotator.textContent = '';
  charIdx = 0;
  typeLoop();
}, 2400);

// ================================
// Nav Scroll State
// ================================
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ================================
// Footer Year
// ================================
document.getElementById('year').textContent = new Date().getFullYear();

// ================================
// Subtle Parallax on Hero
// ================================
const hero = document.querySelector('.hero-content');
document.addEventListener('mousemove', (e) => {
  if (window.scrollY > window.innerHeight) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * 14;
  hero.style.transform = `translate(${x}px, ${y}px)`;
});
