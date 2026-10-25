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
];

export default function Wheel() {
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const posRef = useRef(0);
  const velRef = useRef(0);
  const glideRef = useRef(null);
  const activeRef = useRef(0);
  const dragRef = useRef(null);
  const [active, setActive] = useState(0);

  /* animation loop: momentum + glide + snap + card placement */
  useEffect(() => {
    let raf;
    const place = () => {
      const pos = posRef.current;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        let d = (i - pos) % N;
        if (d > N / 2) d -= N;
        if (d < -N / 2) d += N;
        const ad = Math.abs(d);
        if (ad > 2.6) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          return;
        }
        el.style.opacity = String(ad < 0.01 ? 1 : Math.max(0.3, 1 - ad * 0.3));
        el.style.pointerEvents = 'none';
        el.style.zIndex = String(20 - Math.round(ad * 10));
        el.style.transform = `translate(-50%, -50%) translateX(${d * 200}px) translateZ(${-ad * 160}px) rotateY(${d * -16}deg) scale(${1 - ad * 0.13})`;
      });
    };
    const loop = () => {
      posRef.current += velRef.current;
      velRef.current *= 0.93;
      if (glideRef.current != null) {
        posRef.current += (glideRef.current - posRef.current) * 0.13;
        if (Math.abs(glideRef.current - posRef.current) < 0.01) {
          posRef.current = glideRef.current;
          glideRef.current = null;
        }
      } else if (Math.abs(velRef.current) < 0.003) {
        const t = Math.round(posRef.current);
        posRef.current += (t - posRef.current) * 0.14;
        if (Math.abs(t - posRef.current) < 0.002) posRef.current = t;
      }
      place();
      const idx = ((Math.round(posRef.current) % N) + N) % N;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* scroll hijack + drag + keys */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      glideRef.current = null;
      velRef.current = e.deltaY * 0.0032;
    };
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        glideRef.current = null;
        velRef.current += 0.4;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        glideRef.current = null;
        velRef.current -= 0.4;
      }
    };
    const onDown = (e) => {
      dragRef.current = { x: e.clientX, pos: posRef.current, lastX: e.clientX, vel: 0 };
      glideRef.current = null;
    };
    const onMove = (e) => {
      const dr = dragRef.current;
      if (!dr) return;
      const dx = e.clientX - dr.x;
      posRef.current = dr.pos - dx * 0.006;
      velRef.current = -(e.clientX - dr.lastX) * 0.006;
      dr.lastX = e.clientX;
    };
    const onUp = () => { dragRef.current = null; };
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
    };
  }, []);

  const jump = (idx) => {
    const cur = ((Math.round(posRef.current) % N) + N) % N;
    let d = idx - cur;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    glideRef.current = Math.round(posRef.current) + d;
    velRef.current = 0;
  };

  /* text rollover on active change */
  useEffect(() => {
    gsap.fromTo(
      '.w-name-char',
      { yPercent: 110, opacity: 0, rotate: 3 },
      { yPercent: 0, opacity: 1, rotate: 0, duration: 0.55, stagger: 0.022, ease: 'power3.out' }
    );
    gsap.fromTo('.w-meta', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
  }, [active]);

  const p = projects[active];
  const pad = (n) => String(n + 1).padStart(2, '0');

  return (
    <div ref={stageRef} className="relative flex h-full w-full flex-col md:flex-row" style={{ touchAction: 'none' }}>
      {/* wheel stage */}
      <div className="relative h-[44vh] w-full shrink-0 overflow-hidden md:h-full md:w-[58%]" style={{ perspective: '1200px' }}>
        <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((proj, i) => (
            <div
              key={proj.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="relative overflow-hidden rounded-[26px] border border-[var(--line)] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                style={{
                  width: 'min(70vw, 400px)',
                  height: 'min(38vh, 520px)',
                  background: GRADS[i % GRADS.length],
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  draggable={false}
                  className="relative z-10 h-full w-full object-cover object-top"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                {/* barrel/cylinder sheen */}
                <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-white/15 via-transparent to-black/25" />
                {/* fallback monogram when image missing */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  <span className="text-[96px] font-bold leading-none text-white/85">
                    {proj.title.split(' ').map((w) => w[0]).join('').slice(0, 2)}
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
          <button onClick={() => { glideRef.current = null; velRef.current -= 0.5; }} className="pill flex h-10 w-10 items-center justify-center rounded-full" aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => { glideRef.current = null; velRef.current += 0.5; }} className="pill flex h-10 w-10 items-center justify-center rounded-full" aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* text column */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center md:items-start md:pb-0 md:pl-2 md:pr-10 md:text-left">
        <p className="w-meta mono text-xs tracking-[0.25em] text-[var(--muted)]">
          NO. {pad(active)} / {pad(N - 1)}
        </p>
        <h1 className="mt-3 overflow-hidden text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
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
          SCROLL / DRAG / ARROW KEYS :: WHEEL LOOPS
        </p>
      </div>
    </div>
  );
}
