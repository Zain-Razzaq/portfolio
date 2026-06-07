export function initCircuit() {
  const canvas = document.getElementById('hero-circuit');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, animId;
  let traces = [], pulses = [];

  /* ── Resize + rebuild ─────────────────────────────────────── */
  function resize() {
    const wrap = canvas.parentElement;
    W = canvas.width  = wrap.offsetWidth;
    H = canvas.height = wrap.offsetHeight;
    build();
  }

  /* ── Build trace paths ────────────────────────────────────── */
  function build() {
    traces = [];
    pulses = [];

    /* Chip sits at ~38% from left, vertically centered */
    const chipW  = Math.min(W, H) * 0.22;
    const chipH  = chipW;
    const chipCX = W * 0.35;
    const chipCY = H * 0.50;
    const L  = chipCX - chipW / 2;   // left edge
    const R  = chipCX + chipW / 2;   // right edge
    const T  = chipCY - chipH / 2;   // top edge
    const B  = chipCY + chipH / 2;   // bottom edge

    /* ── RIGHT SIDE — dense fan (primary visual) ── */
    const rightCount = 18;
    for (let i = 0; i < rightCount; i++) {
      const t       = i / (rightCount - 1);
      const startY  = T + t * chipH;                        // evenly spaced on right edge
      const endY    = H * 0.03 + t * (H * 0.94);           // spread full canvas height
      const turnX   = R + 30 + Math.random() * 70;          // first horizontal run
      const endX    = W * 0.80 + Math.random() * W * 0.18; // ends near right edge

      const path = [
        [R, startY],
        [turnX, startY],   // horizontal
        [turnX, endY],     // vertical (the turn)
        [endX, endY],      // horizontal to edge
      ];
      traces.push({ path, side: 'right' });
    }

    /* ── TOP SIDE — fan upward ── */
    const topCount = 10;
    for (let i = 0; i < topCount; i++) {
      const t      = i / (topCount - 1);
      const startX = L + t * chipW;
      const endX   = W * 0.02 + t * (W * 0.96);
      const turnY  = T - 25 - Math.random() * 60;
      const endY   = H * 0.02 + Math.random() * H * 0.1;

      const path = [
        [startX, T],
        [startX, turnY],   // vertical
        [endX, turnY],     // horizontal (the turn)
        [endX, endY],      // vertical to edge
      ];
      traces.push({ path, side: 'top' });
    }

    /* ── BOTTOM SIDE — fan downward ── */
    const botCount = 8;
    for (let i = 0; i < botCount; i++) {
      const t      = i / (botCount - 1);
      const startX = L + t * chipW;
      const endX   = W * 0.05 + t * (W * 0.88);
      const turnY  = B + 25 + Math.random() * 55;
      const endY   = H * 0.88 + Math.random() * H * 0.1;

      const path = [
        [startX, B],
        [startX, turnY],
        [endX, turnY],
        [endX, endY],
      ];
      traces.push({ path, side: 'bottom' });
    }

    /* ── LEFT SIDE — a few going left ── */
    const leftCount = 6;
    for (let i = 0; i < leftCount; i++) {
      const t      = i / (leftCount - 1);
      const startY = T + t * chipH;
      const endY   = H * 0.1 + t * (H * 0.8);
      const turnX  = L - 30 - Math.random() * 60;
      const endX   = Math.random() * W * 0.18;

      const path = [
        [L, startY],
        [turnX, startY],
        [turnX, endY],
        [endX, endY],
      ];
      traces.push({ path, side: 'left' });
    }

    /* Initialise one pulse per trace */
    traces.forEach((tr, i) => {
      const totalLen = pathLength(tr.path);
      pulses.push({
        traceIdx: i,
        t:        Math.random(),
        speed:    0.35 / totalLen,    // normalised so speed is px/frame
        active:   Math.random() > 0.5,
        delay:    Math.random() * 200,
        frame:    0,
      });
    });

    /* Also add extra pulses for busy right-side traces */
    traces.forEach((tr, i) => {
      if (tr.side !== 'right') return;
      if (Math.random() > 0.5) return;
      const totalLen = pathLength(tr.path);
      pulses.push({
        traceIdx: i,
        t:        Math.random(),
        speed:    0.35 / totalLen,
        active:   true,
        delay:    Math.random() * 100,
        frame:    0,
      });
    });
  }

  /* ── Path helpers ─────────────────────────────────────────── */
  function pathLength(pts) {
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i][0] - pts[i-1][0];
      const dy = pts[i][1] - pts[i-1][1];
      len += Math.sqrt(dx*dx + dy*dy);
    }
    return len || 1;
  }

  function posAtT(pts, t) {
    const total = pathLength(pts);
    let target = t * total;
    for (let i = 1; i < pts.length; i++) {
      const dx   = pts[i][0] - pts[i-1][0];
      const dy   = pts[i][1] - pts[i-1][1];
      const segL = Math.sqrt(dx*dx + dy*dy);
      if (target <= segL || i === pts.length - 1) {
        const u = segL > 0 ? target / segL : 0;
        return [pts[i-1][0] + dx * u, pts[i-1][1] + dy * u];
      }
      target -= segL;
    }
    return pts[pts.length - 1];
  }

  /* ── Draw ─────────────────────────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const chipW  = Math.min(W, H) * 0.22;
    const chipH  = chipW;
    const chipCX = W * 0.35;
    const chipCY = H * 0.50;

    /* --- Draw traces --- */
    traces.forEach(({ path }) => {
      ctx.beginPath();
      path.forEach(([x, y], i) =>
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      );
      ctx.strokeStyle = 'rgba(60,110,210,0.30)';
      ctx.lineWidth   = 1.2;
      ctx.lineJoin    = 'round';
      ctx.stroke();

      /* Dots at every bend + endpoint */
      path.forEach(([x, y], i) => {
        if (i === 0) return;
        const isEnd = i === path.length - 1;
        const r     = isEnd ? 3.5 : 2;
        const alpha = isEnd ? 0.9 : 0.55;

        if (isEnd) {
          /* Soft glow behind endpoint */
          const grd = ctx.createRadialGradient(x, y, 0, x, y, 10);
          grd.addColorStop(0, 'rgba(80,180,255,0.30)');
          grd.addColorStop(1, 'rgba(80,180,255,0)');
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,180,255,${alpha})`;
        ctx.fill();
      });
    });

    /* --- Draw pulses --- */
    pulses.forEach(pulse => {
      pulse.frame++;
      if (pulse.frame < pulse.delay) return;

      if (!pulse.active) {
        pulse.t += pulse.speed;
        if (pulse.t >= 1) { pulse.t = 0; pulse.active = true; }
        return;
      }

      pulse.t += pulse.speed;
      if (pulse.t >= 1) {
        pulse.t = 0;
        pulse.active = Math.random() > 0.2;
      }

      const { path } = traces[pulse.traceIdx];
      const [px, py] = posAtT(path, pulse.t);

      const grd = ctx.createRadialGradient(px, py, 0, px, py, 9);
      grd.addColorStop(0,   'rgba(130,220,255,1)');
      grd.addColorStop(0.35,'rgba(80,160,255,0.5)');
      grd.addColorStop(1,   'rgba(60,120,255,0)');
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#c8f0ff';
      ctx.fill();
    });

    /* --- Chip body --- */
    const cs = chipW / 2;
    const cx = chipCX, cy = chipCY;
    const cr = 5;

    /* Outer ambient glow */
    const outerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs * 2.2);
    outerGrd.addColorStop(0,   'rgba(90,60,180,0.35)');
    outerGrd.addColorStop(0.5, 'rgba(50,40,160,0.12)');
    outerGrd.addColorStop(1,   'rgba(30,30,140,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, cs * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = outerGrd;
    ctx.fill();

    /* Chip fill */
    ctx.beginPath();
    ctx.roundRect(cx - cs, cy - cs, cs * 2, cs * 2, cr);
    ctx.fillStyle = '#0c1230';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80,130,220,0.65)';
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    /* Inner border */
    const ins = 7;
    ctx.beginPath();
    ctx.roundRect(cx - cs + ins, cy - cs + ins, (cs - ins) * 2, (cs - ins) * 2, cr * 0.4);
    ctx.strokeStyle = 'rgba(80,130,220,0.25)';
    ctx.lineWidth   = 1;
    ctx.stroke();

    /* Tickmarks — top & bottom */
    const ticks = 8;
    ctx.strokeStyle = 'rgba(80,200,230,0.55)';
    ctx.lineWidth   = 1;
    for (let i = 0; i < ticks; i++) {
      const fx = cx - cs + (i + 0.5) * (cs * 2 / ticks);
      ctx.beginPath(); ctx.moveTo(fx, cy - cs - 1); ctx.lineTo(fx, cy - cs - 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fx, cy + cs + 1); ctx.lineTo(fx, cy + cs + 8); ctx.stroke();
    }
    /* Left & right */
    const vticks = 6;
    for (let i = 0; i < vticks; i++) {
      const fy = cy - cs + (i + 0.5) * (cs * 2 / vticks);
      ctx.beginPath(); ctx.moveTo(cx - cs - 1, fy); ctx.lineTo(cx - cs - 8, fy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + cs + 1, fy); ctx.lineTo(cx + cs + 8, fy); ctx.stroke();
    }

    /* Dotted pin row (right edge, like reference image) */
    ctx.fillStyle = 'rgba(80,220,200,0.7)';
    for (let i = 0; i < vticks * 2; i++) {
      const fy = cy - cs + ins + i * ((cs * 2 - ins * 2) / (vticks * 2 - 1));
      ctx.beginPath();
      ctx.arc(cx + cs - ins * 0.6, fy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - cs + ins * 0.6, fy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Inner purple glow */
    const innerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, cs * 0.85);
    innerGrd.addColorStop(0,   'rgba(140,80,220,0.55)');
    innerGrd.addColorStop(0.7, 'rgba(90,60,180,0.20)');
    innerGrd.addColorStop(1,   'rgba(60,50,160,0)');
    ctx.beginPath();
    ctx.roundRect(cx - cs + ins, cy - cs + ins, (cs - ins) * 2, (cs - ins) * 2, cr * 0.4);
    ctx.fillStyle = innerGrd;
    ctx.fill();

    /* "AI" text */
    const fontSize = cs * 0.82;
    ctx.font         = `800 ${fontSize}px Geist, system-ui, sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor  = 'rgba(160,100,255,0.95)';
    ctx.shadowBlur   = 22;
    ctx.fillStyle    = '#ffffff';
    ctx.fillText('AI', cx, cy);
    ctx.shadowBlur   = 0;

    animId = requestAnimationFrame(draw);
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resize();
      draw();
    });
  });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    draw();
  }, { passive: true });
}
