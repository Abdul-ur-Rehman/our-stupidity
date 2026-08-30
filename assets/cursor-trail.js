(function () {
  // No cursor on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var particles = [];
  var MAX = 120;
  var mx = -999, my = -999, pmx = -999, pmy = -999;

  document.addEventListener('mousemove', function (e) {
    pmx = mx; pmy = my;
    mx = e.clientX; my = e.clientY;

    var dx  = mx - pmx;
    var dy  = my - pmy;
    var spd = Math.sqrt(dx * dx + dy * dy);

    var count = Math.min(6, 1 + Math.floor(spd / 10));
    if (particles.length + count > MAX) particles.splice(0, count);

    for (var i = 0; i < count; i++) {
      var angle   = Math.atan2(dy, dx) + (Math.random() - 0.5) * 2;
      var scatter = Math.random() * spd * 0.15 + 0.5;
      var r       = Math.random();
      var color   = r < 0.55 ? '#E3000F' : r < 0.80 ? '#ffffff' : '#ff4422';

      particles.push({
        x: mx, y: my,
        vx: Math.cos(angle) * scatter + (Math.random() - 0.5) * 1.5,
        vy: Math.sin(angle) * scatter + (Math.random() - 0.5) * 1.5 - 0.9,
        size: 2.5 + Math.random() * 4.5,
        life: 1,
        decay: 0.022 + Math.random() * 0.028,
        color: color,
        rot:  Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.2,
        diamond: Math.random() < 0.45,
      });
    }
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.06;
      p.vx *= 0.98;
      p.life -= p.decay;
      p.rot  += p.rotV;

      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.globalAlpha = p.life * p.life;
      ctx.shadowBlur  = 12;
      ctx.shadowColor = p.color;
      ctx.fillStyle   = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      if (p.diamond) {
        var s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.55, 0);
        ctx.lineTo(0,  s);
        ctx.lineTo(-s * 0.55, 0);
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      }

      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  loop();
})();
