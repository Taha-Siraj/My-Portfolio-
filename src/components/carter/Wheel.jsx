import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/content';

const N = projects.length;
const GRADS = [
  'linear-gradient(135deg,#0ea5e9,#6366f1)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#10b981,#0ea5e9)',
  'linear-gradient(135deg,#8b5cf6,#ec4899)',
  'linear-gradient(135deg,#1f2937,#4b5563)',
  'linear-gradient(135deg,#f97316,#facc15)',
  'linear-gradient(135deg,#06b6d4,#3b82f6)',
  'linear-gradient(135deg,#14b8a6,#84cc16)',
  'linear-gradient(135deg,#a855f7,#f472b6)',
  'linear-gradient(135deg,#e11d48,#fb923c)',
  'linear-gradient(135deg,#0d9488,#22d3ee)',
  'linear-gradient(135deg,#7c3aed,#facc15)',
];

/* True 360° cylinder: cards orbit a vertical axis, front card faces the viewer.
   Rotation is target-based with exponential easing — no overshoot, no runaway
   flings, and transform/opacity writes only (GPU-composited, zero layout work). */
export default function Wheel() {
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const nameRef = useRef(null);
  const rotRef = useRef(0); // current rotation (deg)
  const targetRef = useRef(0); // eased target (deg)
  const activeRef = useRef(0);
  const dragRef = useRef(null);
  const wheelTimer = useRef(null);
  const lastPlaced = useRef(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  const step = 360 / N;
  const geom = isMobile
    ? { w: 170, r: 340, persp: 900 }
    : { w: 260, r: 520, persp: 1400 };

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const snapTarget = () => {
    targetRef.current = Math.round(targetRef.current / step) * step;
  };

  const next = () => {
    targetRef.current = Math.round(targetRef.current / step) * step - step;
  };
  const prev = () => {
    targetRef.current = Math.round(targetRef.current / step) * step + step;
  };
  const jump = (idx) => {
    const cur = ((-Math.round(rotRef.current / step)) % N + N) % N;
    let d = idx - cur;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    targetRef.current = rotRef.current - d * step;
  };

  /* animation loop */
  useEffect(() => {
    let raf;
    let last = performance.now();
    const place = () => {
      const R = rotRef.current;
      const { r } = geom;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        let a = (i * step + R) % 360;
        if (a > 180) a -= 360;
        if (a < -180) a += 360;
        const facing = Math.cos((a * Math.PI) / 180);
        if (facing < 0.02) {
          if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden';
          return;
        }
        if (el.style.visibility !== 'visible') el.style.visibility = 'visible';
        const op = 0.25 + 0.75 * Math.pow(facing, 1.4);
        el.style.opacity = op.toFixed(3);
        el.style.zIndex = String(Math.round(facing * 100));
        el.style.transform = `translate(-50%, -50%) rotateY(${a.toFixed(2)}deg) translateZ(${r}px)`;
      });
    };
    const loop = (now) => {
      const dt = Math.min(50, now - last);
      last = now;
      // exponential ease toward target (frame-rate independent)
      const k = 1 - Math.exp(-dt * 0.011);
      rotRef.current += (targetRef.current - rotRef.current) * k;
      if (Math.abs(targetRef.current - rotRef.current) < 0.01) {
        rotRef.current = targetRef.current;
      }
      // skip DOM writes when fully at rest
      const key = rotRef.current.toFixed(3);
      if (key !== lastPlaced.current) {
        lastPlaced.current = key;
        place();
      }
      const idx = ((-Math.round(rotRef.current / step)) % N + N) % N;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geom.r, geom.w, step]);

  /* scroll hijack + drag + keys */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      // scroll down = next project; cap queue so violent scrolling can't queue spins
      targetRef.current -= e.deltaY * 0.12;
      const diff = targetRef.current - rotRef.current;
      if (Math.abs(diff) > step * 3) {
        targetRef.current = rotRef.current + Math.sign(diff) * step * 3;
      }
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(snapTarget, 140);
    };
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev();
    };
    const onDown = (e) => {
      dragRef.current = {
        x: e.clientX,
        rot: rotRef.current,
        lastX: e.clientX,
        lastT: performance.now(),
        vel: 0,
      };
      targetRef.current = rotRef.current;
    };
    const onMove = (e) => {
      const dr = dragRef.current;
      if (!dr) return;
      const dx = e.clientX - dr.x;
      const now = performance.now();
      const dt = Math.max(1, now - dr.lastT);
      dr.vel = dr.vel * 0.7 + ((e.clientX - dr.lastX) / dt) * 0.3;
      dr.lastX = e.clientX;
      dr.lastT = now;
      // drag follows the finger 1:1; rotation tracks directly (no target lag)
      rotRef.current = dr.rot - dx * 0.25;
      targetRef.current = rotRef.current;
    };
    const onUp = () => {
      const dr = dragRef.current;
      if (!dr) return;
      dragRef.current = null;
      // fling: project rotation from release velocity, then snap to a card
      let t = rotRef.current - dr.vel * 160;
      const maxSpin = step * 4;
      if (Math.abs(t - rotRef.current) > maxSpin) {
        t = rotRef.current + Math.sign(t - rotRef.current) * maxSpin;
      }
      targetRef.current = Math.round(t / step) * step;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      clearTimeout(wheelTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  /* text rollover on active change (scoped to the name, transform/opacity only) */
  useEffect(() => {
    if (!nameRef.current) return;
    const chars = nameRef.current.querySelectorAll('.w-name-char');
    gsap.fromTo(
      chars,
      { yPercent: 110, opacity: 0, skewX: 4 },
      { yPercent: 0, opacity: 1, skewX: 0, duration: 0.5, stagger: 0.018, ease: 'power3.out' }
    );
    gsap.fromTo('.w-meta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }, [active]);

  const p = projects[active];
  const pad = (n) => String(n + 1).padStart(2, '0');

  return (
    <div ref={stageRef} className="relative flex h-full w-full flex-col md:flex-row" style={{ touchAction: 'none' }}>
      {/* cylinder stage */}
      <div
        className="relative h-[44vh] w-full shrink-0 overflow-hidden md:h-full md:w-[58%]"
        style={{ perspective: `${geom.persp}px` }}
      >
        <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((proj, i) => (
            <div
              key={proj.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              <div
                className="relative overflow-hidden rounded-[26px] border border-[var(--line)] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                style={{
                  width: `${geom.w}px`,
                  height: `${Math.round(geom.w * 1.35)}px`,
                  background: GRADS[i % GRADS.length],
                }}
              >
                {proj.image && (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    draggable={false}
                    decoding="async"
                    className="relative z-10 h-full w-full object-cover object-top"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                {/* barrel sheen */}
                <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-white/15 via-transparent to-black/25" />
                {/* cover monogram (visible when no screenshot) */}
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
                  <span className="text-[64px] font-bold leading-none text-white/90">
                    {proj.title.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>
                  <span className="mono text-[10px] tracking-[0.25em] text-white/75">
                    {proj.tech[0]?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              aria-label={`Project ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-[var(--fg)]' : 'w-2 bg-[var(--muted)]'}`}
            />
          ))}
        </div>
        {/* mobile arrows */}
        <div className="absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 gap-3 md:hidden">
          <button onClick={prev} className="pill flex h-10 w-10 items-center justify-center rounded-full" aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="pill flex h-10 w-10 items-center justify-center rounded-full" aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* text column */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center md:items-start md:pb-0 md:pl-2 md:pr-10 md:text-left">
        <p className="w-meta mono text-xs tracking-[0.25em] text-[var(--muted)]">
          NO. {pad(active)} / {pad(N - 1)}
        </p>
        <h1 ref={nameRef} className="mt-3 overflow-hidden text-[clamp(2.2rem,5.2vw,4.6rem)] font-bold leading-[0.95] tracking-tight">
          {p.title.split(' ').map((word, wi, words) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split('').map((ch, i) => (
                <span key={i} className="w-name-char inline-block">
                  {ch}
                </span>
              ))}
              {wi < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <div className="w-meta mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
          {p.tech.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <p className="w-meta mt-4 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
          {p.description}
        </p>
        <div className="w-meta mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <a
            href={p.liveLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-transform hover:scale-[1.03]"
          >
            OPEN PROJECT <ArrowUpRight size={16} />
          </a>
          <a
            href={p.githubLink}
            target="_blank"
            rel="noreferrer"
            className="pill rounded-full px-5 py-2.5 text-sm font-medium"
          >
            {'</>'} SOURCE
          </a>
        </div>
        <p className="w-meta mono mt-8 hidden text-[10px] tracking-[0.2em] text-[var(--muted)] md:block">
          SCROLL / DRAG / ARROW KEYS :: 360° LOOP
        </p>
      </div>
    </div>
  );
}
