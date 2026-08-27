/* =====================================================
   Kavii's Surprise Website — vanilla JS, no dependencies
   Organised by section. Everything is self-contained.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     0. AMBIENT BACKGROUND: floating hearts + sparkles
     --------------------------------------------------- */
  const ambientHearts = document.getElementById('ambientHearts');
  const heartEmojis = ['❤️', '💗', '💖', '💕'];

  function spawnAmbientHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    const duration = 8 + Math.random() * 6;
    heart.style.animationDuration = duration + 's';
    heart.style.fontSize = (1 + Math.random()) + 'rem';
    ambientHearts.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }
  setInterval(spawnAmbientHeart, 1400);
  // seed a few immediately so the page doesn't feel empty on load
  for (let i = 0; i < 4; i++) setTimeout(spawnAmbientHeart, i * 400);

  const sparkleField = document.querySelector('.sparkle-field');
  if (sparkleField) {
    for (let i = 0; i < 22; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 2.4) + 's';
      sparkleField.appendChild(s);
    }
  }

  /* ---------------------------------------------------
     0b. SOUND TOGGLE — gentle generated tone, no file needed
     Uses the Web Audio API so nothing external has to load.
     Never autoplays; only starts after the user taps the button.
     --------------------------------------------------- */
  let audioCtx = null;
  let musicNodes = null;
  let isMuted = true;
  const soundBtn = document.getElementById('soundToggle');

  function startMusic() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.05; // very soft, background level
    masterGain.connect(audioCtx.destination);

    // A soft two-note pad that gently drifts, evoking a music-box feel
    const notes = [523.25, 659.25]; // C5, E5
    const oscillators = notes.map((freq) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = audioCtx.createGain();
      gain.gain.value = 0.5;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      return osc;
    });

    musicNodes = { masterGain, oscillators };
  }

  function stopMusic() {
    if (musicNodes) {
      musicNodes.oscillators.forEach((o) => o.stop());
      audioCtx.close();
      musicNodes = null;
    }
  }

  soundBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    soundBtn.textContent = isMuted ? '🔇' : '🔊';
    if (!isMuted) startMusic(); else stopMusic();
  });

  /* ---------------------------------------------------
     1. LANDING → reveal the rest of the site
     --------------------------------------------------- */
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');
  const mainContent = document.getElementById('mainContent');

  openSurpriseBtn.addEventListener('click', () => {
    mainContent.classList.remove('hidden');
    burstConfetti(60);
    setTimeout(() => {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  });

  /* ---------------------------------------------------
     3. HOSTEL MOOD — random funny messages
     --------------------------------------------------- */
  const hostelMessages = [
    'Hostel food again? RUN! 😂',
    'Today your bed is officially your best friend.',
    'Home food is calling... 📞🍛',
    "Don't worry, this phase will pass ❤️",
    "Emergency: One dose of Dev's motivation required!"
  ];
  const hostelMoodBtn = document.getElementById('hostelMoodBtn');
  const moodOutput = document.getElementById('moodOutput');

  hostelMoodBtn.addEventListener('click', () => {
    const msg = hostelMessages[Math.floor(Math.random() * hostelMessages.length)];
    moodOutput.textContent = msg;
  });

  /* ---------------------------------------------------
     4. MINI GAME — Catch the Happiness
     --------------------------------------------------- */
  const startGameBtn = document.getElementById('startGameBtn');
  const gameArea = document.getElementById('gameArea');
  const scoreValue = document.getElementById('scoreValue');
  const gameWin = document.getElementById('gameWin');

  let score = 0;
  let gameRunning = false;
  let spawnTimer = null;

  function spawnGameHeart() {
    if (!gameRunning) return;
    const heart = document.createElement('button');
    heart.className = 'game-heart';
    heart.textContent = '❤️';
    heart.setAttribute('aria-label', 'Catch this heart');

    const areaRect = gameArea.getBoundingClientRect();
    const maxX = Math.max(areaRect.width - 40, 10);
    const maxY = Math.max(areaRect.height - 40, 10);
    heart.style.left = Math.random() * maxX + 'px';
    heart.style.top = Math.random() * maxY + 'px';

    // Heart disappears on its own after a couple of seconds if not caught
    const disappearTimer = setTimeout(() => heart.remove(), 1800);

    heart.addEventListener('click', () => {
      clearTimeout(disappearTimer);
      heart.remove();
      score++;
      scoreValue.textContent = score;
      if (score >= 5) {
        endGame(true);
      }
    });

    gameArea.appendChild(heart);
  }

  function endGame(won) {
    gameRunning = false;
    clearInterval(spawnTimer);
    gameArea.querySelectorAll('.game-heart').forEach((h) => h.remove());
    if (won) {
      gameWin.classList.remove('hidden');
      burstConfetti(90);
    }
  }

  startGameBtn.addEventListener('click', () => {
    score = 0;
    scoreValue.textContent = 0;
    gameWin.classList.add('hidden');
    gameRunning = true;
    startGameBtn.textContent = 'Playing...';
    spawnTimer = setInterval(spawnGameHeart, 700);
  });

  /* ---------------------------------------------------
     5. HOME SECTION — typewriter reveal on scroll into view
     --------------------------------------------------- */
  const typewriterLine = document.getElementById('typewriterLine');
  const fullLine = 'And whenever you need someone... Dev is here. ❤️';
  let typewriterStarted = false;

  function typeWriterEffect(el, text, speed = 45) {
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  const homeSection = document.querySelector('.home-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !typewriterStarted) {
        typewriterStarted = true;
        typeWriterEffect(typewriterLine, fullLine);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(homeSection);

  /* ---------------------------------------------------
     6. SECRET MESSAGE — unlock reveal
     --------------------------------------------------- */
  const unlockBtn = document.getElementById('unlockBtn');
  const lockFace = document.getElementById('lockFace');
  const secretMessage = document.getElementById('secretMessage');

  unlockBtn.addEventListener('click', () => {
    lockFace.classList.add('hidden');
    secretMessage.classList.remove('hidden');
    burstConfetti(50);
  });

  /* ---------------------------------------------------
     7. FUNNY MOOD-FIXER BUTTONS
     --------------------------------------------------- */
  const funnyResponses = {
    sad: 'Emergency happiness protocol activated! 😎❤️',
    hungry: 'Unfortunately, Dev cannot teleport biryani yet. 😭🍗',
    home: 'Home is waiting for you. Until then, survive hostel like a champion! 🫡❤️'
  };
  const funnyOutput = document.getElementById('funnyOutput');

  document.querySelectorAll('.funny-buttons .btn-mini').forEach((btn) => {
    btn.addEventListener('click', () => {
      funnyOutput.textContent = funnyResponses[btn.dataset.mood];
    });
  });

  /* ---------------------------------------------------
     8. FINAL SURPRISE
     --------------------------------------------------- */
  const finalOpenBtn = document.getElementById('finalOpenBtn');
  const finalMessage = document.getElementById('finalMessage');
  const okayDevBtn = document.getElementById('okayDevBtn');
  const missionText = document.getElementById('missionText');

  finalOpenBtn.addEventListener('click', () => {
    finalOpenBtn.classList.add('hidden');
    finalMessage.classList.remove('hidden');
    burstConfetti(140);
    // extra wave of ambient hearts for the big finale
    for (let i = 0; i < 20; i++) setTimeout(spawnAmbientHeart, i * 80);
  });

  okayDevBtn.addEventListener('click', () => {
    okayDevBtn.classList.add('hidden');
    missionText.classList.remove('hidden');
    burstConfetti(70);
  });

  /* ---------------------------------------------------
     CONFETTI — plain canvas, no libraries
     --------------------------------------------------- */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  let confettiPieces = [];
  let confettiAnimating = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const confettiColors = ['#FF7FA6', '#C9B6F5', '#AEE3F5', '#FFC9DE', '#FFD98E'];

  function burstConfetti(count = 80) {
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        size: 6 + Math.random() * 6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: 2 + Math.random() * 3,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        spin: Math.random() * 10 - 5,
        life: 0,
        maxLife: 220 + Math.random() * 80
      });
    }
    if (!confettiAnimating) {
      confettiAnimating = true;
      requestAnimationFrame(animateConfetti);
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.spin;
      p.life++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    confettiPieces = confettiPieces.filter((p) => p.life < p.maxLife && p.y < canvas.height + 40);

    if (confettiPieces.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimating = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

});
