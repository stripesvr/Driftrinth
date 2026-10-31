// Single place to change the download link.
const DOWNLOAD_URL = "https://github.com/stripesvr/Driftrinth/releases/latest/download/Driftrinth.apk";

document.querySelectorAll("[data-download]").forEach((a) => { a.href = DOWNLOAD_URL; });
document.getElementById("year").textContent = new Date().getFullYear();

// Hero background: soft pools that drift and lean toward the pointer.
(function () {
  const canvas = document.getElementById("hero-bg");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const small = window.matchMedia("(max-width: 700px)").matches;
  const pools = [
    { x: .22, y: .35, r: .42, c: "79,156,255", a: .30, s: .00011, p: 0 },
    { x: .78, y: .30, r: .36, c: "144,196,255", a: .18, s: .00008, p: 2 },
    { x: .55, y: .80, r: .46, c: "40,110,230", a: .26, s: .00009, p: 4 },
    { x: .10, y: .85, r: .30, c: "79,156,255", a: .14, s: .00013, p: 1 },
  ].slice(0, small ? 2 : 4);
  let w = 0, h = 0, dpr = 1, px = .5, py = .4, lx = .5, ly = .4, raf = 0, last = 0;

  function resize() {
    dpr = small ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    lx += (px - lx) * .04; ly += (py - ly) * .04;
    const m = Math.max(w, h);
    for (const p of pools) {
      const x = (p.x + Math.sin(t * p.s + p.p) * .06 + (lx - .5) * .12) * w;
      const y = (p.y + Math.cos(t * p.s * 1.3 + p.p) * .06 + (ly - .5) * .10) * h;
      const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * m);
      g.addColorStop(0, `rgba(${p.c},${p.a})`);
      g.addColorStop(1, `rgba(${p.c},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  }
  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (small && t - last < 50) return; // ~20fps on phones
    last = t; draw(t);
  }
  function start() {
    cancelAnimationFrame(raf);
    if (reduce.matches) draw(0); else raf = requestAnimationFrame(loop);
  }
  resize(); start();
  window.addEventListener("resize", () => { resize(); if (reduce.matches) draw(0); });
  reduce.addEventListener?.("change", start);
  if (!small) window.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    px = (e.clientX - r.left) / r.width; py = (e.clientY - r.top) / r.height;
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf); else start();
  });
})();
