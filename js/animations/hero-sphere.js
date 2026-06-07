export function initHeroSphere() {
  const canvas = document.getElementById('hero-sphere');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, cx, cy, animId;
  let rotY = 0;
  let mouseX = 0, mouseY = 0;

  /* ── Geometry ── */
  const RADIUS   = 0;   // set dynamically
  let   R        = 200;
  const FOV      = 600;
  const LAT_SEG  = 14;
  const LON_SEG  = 18;

  let baseVerts = [], edges = [];

  function buildSphere(r) {
    R = r;
    baseVerts = [];
    edges     = [];

    for (let la = 0; la <= LAT_SEG; la++) {
      for (let lo = 0; lo < LON_SEG; lo++) {
        const phi   = (la / LAT_SEG) * Math.PI;
        const theta = (lo / LON_SEG) * Math.PI * 2;
        baseVerts.push({
          x: R * Math.sin(phi) * Math.cos(theta),
          y: R * Math.cos(phi),
          z: R * Math.sin(phi) * Math.sin(theta),
        });
      }
    }

    for (let la = 0; la <= LAT_SEG; la++) {
      for (let lo = 0; lo < LON_SEG; lo++) {
        const i    = la * LON_SEG + lo;
        const iNext = la * LON_SEG + (lo + 1) % LON_SEG;
        const iLat  = (la + 1) * LON_SEG + lo;
        edges.push([i, iNext]);
        if (la < LAT_SEG) edges.push([i, iLat]);
      }
    }
  }

  /* ── Transform ── */
  function rotate(p, rx, ry) {
    // Y axis
    const x1 = p.x * Math.cos(ry) - p.z * Math.sin(ry);
    const z1 = p.x * Math.sin(ry) + p.z * Math.cos(ry);
    // X axis
    const y2 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx);
    return { x: x1, y: y2, z: z2 };
  }

  function project(p) {
    const scale = FOV / (FOV + p.z + R * 1.2);
    return { sx: cx + p.x * scale, sy: cy + p.y * scale, scale, z: p.z };
  }

  /* ── Draw ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const rx = mouseY * 0.25;
    const ry = rotY + mouseX * 0.25;

    const verts = baseVerts.map(v => {
      const r = rotate(v, rx, ry);
      return { ...r, proj: project(r) };
    });

    /* Edges */
    edges.forEach(([a, b]) => {
      if (a >= verts.length || b >= verts.length) return;
      const pa = verts[a], pb = verts[b];
      const depth = ((pa.z + pb.z) / 2 + R) / (2 * R);
      const alpha = 0.04 + depth * 0.45;

      ctx.beginPath();
      ctx.moveTo(pa.proj.sx, pa.proj.sy);
      ctx.lineTo(pb.proj.sx, pb.proj.sy);
      ctx.strokeStyle = `rgba(99,139,217,${alpha})`;
      ctx.lineWidth   = 0.7;
      ctx.stroke();
    });

    /* Nodes — sorted back-to-front */
    [...verts]
      .sort((a, b) => a.z - b.z)
      .forEach(v => {
        const depth = (v.z + R) / (2 * R);
        const r     = 1.2 + depth * 2.4;
        const alpha = 0.15 + depth * 0.8;

        if (depth > 0.55) {
          const gAlpha = (depth - 0.55) * 0.5;
          const grd = ctx.createRadialGradient(
            v.proj.sx, v.proj.sy, 0,
            v.proj.sx, v.proj.sy, r * 5
          );
          grd.addColorStop(0, `rgba(99,139,217,${gAlpha})`);
          grd.addColorStop(1, 'rgba(99,139,217,0)');
          ctx.beginPath();
          ctx.arc(v.proj.sx, v.proj.sy, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(v.proj.sx, v.proj.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,180,255,${alpha})`;
        ctx.fill();
      });

    /* Equator accent ring */
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * 1.05, R * 0.28, rotY * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(65,95,157,0.15)';
    ctx.lineWidth   = 1;
    ctx.stroke();

    rotY += 0.0035;
    animId = requestAnimationFrame(draw);
  }

  /* ── Resize ── */
  function resize() {
    const wrap = canvas.parentElement;
    W = canvas.width  = wrap.offsetWidth;
    H = canvas.height = wrap.offsetHeight;
    cx = W / 2;
    cy = H / 2;
    const r = Math.min(W, H) * 0.36;
    buildSphere(r);
  }

  /* ── Mouse ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 0.6;
      mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 0.4;
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      mouseX = 0; mouseY = 0;
    });
  }

  /* ── Boot ── */
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
