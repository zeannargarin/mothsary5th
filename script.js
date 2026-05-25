/* ── PETAL CANVAS ── */
const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');
let petals = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 1.2 + 0.4,
    speedX: (Math.random() - 0.5) * 0.8,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.04,
    opacity: Math.random() * 0.5 + 0.2,
    color: `hsl(${320 + Math.random() * 30}, ${70 + Math.random()*20}%, ${70 + Math.random()*15}%)`
  };
}

function animPetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.08) petals.push(createPetal());
  petals = petals.filter(p => p.y < canvas.height + 30);

  for (const p of petals) {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(p.y * 0.02) * 0.5;
    p.angle += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  requestAnimationFrame(animPetals);
}
animPetals();

/* ── INTRO CLICK ── */
const heartBtn = document.getElementById('heartBtn');
const intro = document.getElementById('intro');
const main = document.getElementById('main');

heartBtn.addEventListener('click', () => {
  intro.classList.add('hidden');
  setTimeout(() => {
    intro.style.display = 'none';
    main.classList.add('visible');
  }, 1300);
  spawnHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 12);
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('shown');
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ── PROMISE LIST REVEAL ── */
const promiseItems = document.querySelectorAll('.promise-item');
const promiseObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      promiseItems.forEach((item, i) => {
        setTimeout(() => item.classList.add('revealed'), i * 180);
      });
      promiseObs.disconnect();
    }
  });
}, { threshold: 0.2 });
promiseObs.observe(document.getElementById('promiseList'));

/* ── HEART BURST ── */
function spawnHeartBurst(cx, cy, count) {
  const emojis = ['💕','💖','💗','💓','🌸','✨','💫','🌹'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'burst-heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 80 + Math.random() * 160;
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    el.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }
}

/* ── CARD HOVER SPARKLES ── */
document.querySelectorAll('.reason-card').forEach(card => {
  card.addEventListener('click', (e) => {
    spawnHeartBurst(e.clientX, e.clientY, 6);
  });
});

/* ── CONFETTI BURST ── */
function launchConfetti() {
  const colors = ['#f48fb1','#c2185b','#f9c84e','#fff8f0','#7b0027','#ffd6e0'];
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'conf-piece';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.width = el.style.height = (6 + Math.random() * 8) + 'px';
      el.style.animationDuration = (1.8 + Math.random() * 2) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 18);
  }
  spawnHeartBurst(window.innerWidth / 2, window.innerHeight * 0.7, 20);
}

document.getElementById('burstBtn').addEventListener('click', launchConfetti);

/* ── MOUSE TRAIL SPARKLES ── */
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
  if (Date.now() - lastSparkle < 80) return;
  lastSparkle = Date.now();
  const el = document.createElement('div');
  el.className = 'sparkle';
  el.style.left = e.clientX + 'px';
  el.style.top = e.clientY + 'px';
  const angle = Math.random() * Math.PI * 2;
  const dist = 20 + Math.random() * 40;
  el.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
  el.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
  el.style.animationDuration = '0.8s';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
});
