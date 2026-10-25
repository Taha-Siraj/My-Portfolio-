import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/carter/Header';
import Wheel from './components/carter/Wheel';
import { AboutPage, LabPage, StudioPage, ContactPage } from './components/carter/Pages';
import { CommandPalette, UpdatesPanel } from './components/carter/Overlays';
import { profile } from './data/content';

export const PAGES = ['home', 'about', 'lab', 'studio', 'contact'];

function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else if (!doneRef.current) {
        doneRef.current = true;
        setLeaving(true);
        setTimeout(onDone, 550);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#111] p-6 transition-transform duration-500 ease-in-out md:p-10"
      style={{ transform: leaving ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <div className="mono text-xs tracking-[0.25em] text-white/50">
        FILE :: PORTFOLIO — {profile.name.toUpperCase()}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-1">
          <span className="flex h-12 w-12 items-center justify-center border-2 border-white/80 font-bold text-white">T</span>
          <span className="flex h-12 w-12 items-center justify-center border-2 border-white/80 font-bold text-white">S</span>
        </div>
        <div className="text-[26vw] font-bold leading-[0.8] text-white md:text-[16vw]">
          {count}
        </div>
      </div>
    </div>
  );
}

/* torn-paper wipe: jagged SVG edge sweeps down, page swaps under it */
function Wipe({ phase }) {
  if (!phase) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: phase === 'cover' ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="h-full w-full bg-[#edede8]" />
      <svg
        className="absolute -top-[23px] left-0 h-[24px] w-full"
        viewBox="0 0 1440 24"
        preserveAspectRatio="none"
      >
        <path
          d="M0,24 L0,14 L60,8 L130,18 L210,6 L300,16 L390,4 L470,15 L560,9 L640,19 L730,5 L820,14 L910,8 L1000,18 L1090,6 L1180,15 L1270,9 L1360,17 L1440,7 L1440,24 Z"
          fill="#edede8"
        />
      </svg>
    </div>
  );
}

function Telemetry() {
  const [time, setTime] = useState('');
  const [fps, setFps] = useState(60);
  const fpsRef = useRef({ last: performance.now(), ema: 60 });

  useEffect(() => {
    const ti = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Karachi',
          hour12: false,
        })
      );
    }, 1000);
    setTime(
      new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Karachi',
        hour12: false,
      })
    );
    let raf;
    const loop = () => {
      const now = performance.now();
      const dt = now - fpsRef.current.last;
      fpsRef.current.last = now;
      if (dt > 0) {
        fpsRef.current.ema = fpsRef.current.ema * 0.95 + (1000 / dt) * 0.05;
        setFps(Math.round(fpsRef.current.ema));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      clearInterval(ti);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mono pointer-events-none fixed left-4 top-3 z-40 text-[10px] tracking-[0.18em] text-[var(--muted)] md:left-6">
      PKT {time} :: FPS {fps} :: STATUS :: OPEN TO WORK
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [wipe, setWipe] = useState(null);
  const wipeTimer = useRef([]);

  const go = useCallback(
    (p) => {
      if (p === page || wipe) return;
      setPaletteOpen(false);
      setUpdatesOpen(false);
      setWipe('cover');
      wipeTimer.current.push(setTimeout(() => setPage(p), 480));
      wipeTimer.current.push(
        setTimeout(() => setWipe('lift'), 520)
      );
      wipeTimer.current.push(setTimeout(() => setWipe(null), 1050));
    },
    [page, wipe]
  );

  useEffect(() => () => wipeTimer.current.forEach(clearTimeout), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setUpdatesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div data-theme={theme} className="grain banding relative h-[100dvh] w-full overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Telemetry />
      <Header
        page={page}
        go={go}
        theme={theme}
        toggleTheme={toggleTheme}
        onPalette={() => setPaletteOpen(true)}
        onUpdates={() => setUpdatesOpen(!updatesOpen)}
      />

      <main className="relative h-full w-full pt-[76px]">
        {page === 'home' && <Wheel />}
        {page === 'about' && <AboutPage go={go} />}
        {page === 'lab' && <LabPage go={go} />}
        {page === 'studio' && <StudioPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      {/* presence toast */}
      <div className="pointer-events-none fixed bottom-4 left-4 z-40 md:left-6">
        <div className="pill flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="mono text-[10px] tracking-[0.18em] text-[var(--muted)]">
            LIVE :: KARACHI, PK
          </span>
        </div>
      </div>

      <Wipe phase={wipe} />
      {paletteOpen && (
        <CommandPalette
          close={() => setPaletteOpen(false)}
          go={go}
          toggleTheme={toggleTheme}
          onUpdates={() => setUpdatesOpen(true)}
        />
      )}
      {updatesOpen && <UpdatesPanel close={() => setUpdatesOpen(false)} />}
    </div>
  );
}
