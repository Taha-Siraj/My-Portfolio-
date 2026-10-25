import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, ArrowUpRight, Download } from 'lucide-react';
import { profile } from '../../data/content';

export function CommandPalette({ close, go, toggleTheme, onUpdates }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const rows = useMemo(() => {
    const all = [
      { kind: 'PAGE', label: 'Home — Project Wheel', run: () => go('home') },
      { kind: 'PAGE', label: 'About — Desk Collage', run: () => go('about') },
      { kind: 'PAGE', label: 'Lab — Motion Experiments', run: () => go('lab') },
      { kind: 'PAGE', label: 'Studio — Hanging Badge', run: () => go('studio') },
      { kind: 'PAGE', label: 'Contact — Letter Form', run: () => go('contact') },
      { kind: 'ACTION', label: 'Toggle theme (dark / light)', run: toggleTheme },
      { kind: 'ACTION', label: 'View updates', run: () => { close(); onUpdates(); } },
      { kind: 'ACTION', label: 'Download CV', run: () => { const a = document.createElement('a'); a.href = profile.cv; a.download = ''; a.click(); } },
      { kind: 'ACTION', label: 'Copy email address', run: () => navigator.clipboard?.writeText(profile.email) },
    ];
    const f = q.trim().toLowerCase();
    return f ? all.filter((r) => r.label.toLowerCase().includes(f)) : all;
  }, [q, go, toggleTheme, close, onUpdates]);

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(rows.length - 1, s + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    if (e.key === 'Enter' && rows[sel]) { rows[sel].run(); close(); }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center bg-black/60 p-4 pt-[16vh] backdrop-blur-sm" onClick={close}>
      <div
        className="w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg2)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-palette
      >
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
          <Search size={17} className="shrink-0 text-[var(--muted)]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type a command or search..."
            className="w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-[var(--muted)]"
          />
          <button onClick={close} className="text-[var(--muted)] hover:text-[var(--fg)]" aria-label="Close">
            <X size={17} />
          </button>
        </div>
        <div className="max-h-[46vh] overflow-y-auto p-2">
          {rows.length === 0 && (
            <p className="mono px-3 py-6 text-center text-xs tracking-widest text-[var(--muted)]">
              NO RESULTS :: TRY "ABOUT" OR "THEME"
            </p>
          )}
          {rows.map((r, i) => (
            <button
              key={r.label}
              onClick={() => { r.run(); close(); }}
              onMouseEnter={() => setSel(i)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left ${i === sel ? 'bg-[var(--surface2)]' : ''}`}
            >
              <span className="flex items-center gap-3">
                <span className="mono text-[9px] tracking-[0.2em] text-[var(--muted)]">{r.kind}</span>
                <span className="text-[15px] font-medium">{r.label}</span>
              </span>
              <ArrowUpRight size={15} className="text-[var(--muted)]" />
            </button>
          ))}
        </div>
        <div className="mono flex gap-4 border-t border-[var(--line)] px-4 py-2.5 text-[10px] tracking-widest text-[var(--muted)]">
          <span>↑↓ NAVIGATE</span>
          <span>↵ RUN</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </div>
  );
}

const UPDATES = [
  { date: '25 OCT 2026', cat: 'SITE', text: 'Portfolio rebuilt as an app-style wheel system — scroll drives the work, pages are tactile objects.' },
  { date: '25 OCT 2026', cat: 'WORK', text: 'Driveable 3D world portfolio built — car, zones and teleport map (experimental build).' },
  { date: '19 OCT 2026', cat: 'SITE', text: 'Sticker-bomb rebuild with GSAP chapters, taped cards and a kraft Services section.' },
  { date: '12 SEP 2026', cat: 'WORK', text: 'WAKISSHA student platform shipped — 500+ students, full-stack MERN.' },
  { date: '01 SEP 2025', cat: 'ROLE', text: 'Joined Next Revolution Tech as Full Stack Engineer & Shopify Developer.' },
  { date: '01 SEP 2024', cat: 'ROLE', text: 'Started as Web Developer at Codezyratech — first full year in production code.' },
];

export function UpdatesPanel({ close }) {
  return (
    <div className="fixed inset-0 z-[94] flex justify-end bg-black/40" onClick={close}>
      <div
        className="flex h-full w-[min(92vw,400px)] flex-col border-l border-[var(--line)] bg-[var(--bg2)] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="mono text-[11px] tracking-[0.25em] text-[var(--muted)]">UPDATES :: LOG</p>
          <button onClick={close} className="text-[var(--muted)] hover:text-[var(--fg)]" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
          {UPDATES.map((u) => (
            <div key={u.date + u.text} className="border-b border-[var(--line)] pb-4">
              <div className="flex items-center gap-2">
                <span className="mono text-[10px] tracking-widest text-[var(--muted)]">{u.date}</span>
                <span className="tag !py-0.5">{u.cat}</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed">{u.text}</p>
            </div>
          ))}
        </div>
        <a href={profile.cv} download className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--fg)] py-3 text-sm font-medium text-[var(--bg)]">
          <Download size={15} /> DOWNLOAD CV
        </a>
      </div>
    </div>
  );
}
