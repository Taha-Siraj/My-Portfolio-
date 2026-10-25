import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Download, Disc3 } from 'lucide-react';
import { profile, skills, experience, socials, contactInfo } from '../../data/content';

/* ---------------- ABOUT : desk collage ---------------- */
export function AboutPage({ go }) {
  const dots = Array.from({ length: 112 }, (_, i) => ((i * 37) % 10) / 10);
  return (
    <div className="h-full overflow-y-auto">
      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col items-center justify-center gap-6 px-5 py-10 lg:flex-row lg:items-start lg:gap-10 lg:pt-20">
        {/* postcard */}
        <div className="paper relative w-[min(92vw,420px)] shrink-0 rotate-[-1.5deg] p-5">
          <div className="absolute -top-3 left-10 h-8 w-24 rotate-[-8deg] border border-black/20 bg-white/70" />
          <div className="border-2 border-dashed border-black/30 p-2">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="aspect-square w-full object-cover object-top"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="absolute -right-3 top-6 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-2 border-black/60">
            <span className="mono text-center text-[8px] leading-tight tracking-widest">
              KARACHI
              <br />
              PAKISTAN
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-none">{profile.name.toUpperCase()}</h2>
          <p className="mono mt-2 text-[11px] tracking-[0.18em] text-black/60">
            {profile.roles.join(' :: ').toUpperCase()}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-black/75">{profile.tagline}</p>
          <div className="mt-4 flex gap-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center border-2 border-black/80 text-black transition-transform hover:-rotate-6">
                <s.icon size={18} />
              </a>
            ))}
            <a href={profile.cv} download className="ml-auto flex items-center gap-1.5 border-2 border-black bg-black px-4 py-2 text-sm font-medium text-white">
              <Download size={15} /> CV
            </a>
          </div>
        </div>

        <div className="flex w-[min(92vw,420px)] shrink-0 flex-col gap-6">
          {/* data card */}
          <div className="paper rotate-[1deg] p-5">
            <p className="mono text-[10px] tracking-[0.22em] text-black/60">FILE :: OUTPUT LOG</p>
            <div className="mt-3 grid grid-cols-14 gap-1.5" style={{ gridTemplateColumns: 'repeat(14, 1fr)' }}>
              {dots.map((o, i) => (
                <span key={i} className="aspect-square rounded-[2px] bg-black" style={{ opacity: 0.08 + o * 0.85 }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {profile.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold">{s.value}{s.suffix}</p>
                  <p className="mono text-[9px] tracking-widest text-black/55">{s.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* turntable card */}
          <div className="paper flex rotate-[-1deg] items-center gap-4 p-5">
            <div className="relative h-20 w-20 shrink-0 animate-spin-slower rounded-full bg-black">
              <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle_at_center,#111_0_2px,transparent_2px_5px)]" />
              <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#edede8]">
                <Disc3 size={16} className="text-black" />
              </div>
            </div>
            <div>
              <p className="mono text-[10px] tracking-[0.22em] text-black/60">NOW SPINNING ::</p>
              <p className="text-lg font-bold leading-tight">MERN STACK, ON REPEAT</p>
              <p className="mt-1 text-sm text-black/65">
                {experience[0].title} — {experience[0].company}
              </p>
            </div>
          </div>

          {/* skills strip */}
          <div className="paper rotate-[0.5deg] p-5">
            <p className="mono text-[10px] tracking-[0.22em] text-black/60">TOOLS :: LOADED</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.slice(0, 12).map((s) => (
                <span key={s.name} className="border border-black/70 px-2 py-0.5 text-xs font-medium">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* side tabs */}
        <div className="hidden flex-col gap-2 lg:flex">
          {[
            ['lab', 'LAB'],
            ['studio', 'STUDIO'],
            ['contact', 'CONTACT'],
          ].map(([p, label]) => (
            <button key={p} onClick={() => go(p)} className="pill mono rotate-90 whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] tracking-[0.25em] text-[var(--muted)] hover:text-[var(--fg)]" style={{ transformOrigin: 'left center', marginBottom: 56 }}>
              {label} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- LAB : motion experiments index ---------------- */
const EXPERIMENTS = [
  { title: 'Dual Wheel', desc: 'Scroll-hijacked project carousel, image + text wheels in sync.', tags: ['GSAP', 'WHEEL'], to: 'home' },
  { title: 'Torn Wipe', desc: 'Jagged paper-edge transitions between pages.', tags: ['TRANSITION'], to: 'home' },
  { title: 'Pendulum Badge', desc: 'Draggable studio pass with elastic swing physics.', tags: ['DRAG', 'ELASTIC'], to: 'studio' },
  { title: 'Letterform Rollover', desc: 'Split-character stagger with a glitch settle on every change.', tags: ['TYPOGRAPHY'], to: 'home' },
  { title: 'Desk Collage', desc: 'Postcard, output log and turntable as one tactile scene.', tags: ['LAYOUT'], to: 'about' },
  { title: 'Command Palette', desc: 'Keyboard-first navigation, pages + actions in one search.', tags: ['CMD-K'], to: 'home' },
  { title: 'Theme Inversion', desc: 'Instant dark / light system swap, layout untouched.', tags: ['THEME'], to: 'home' },
  { title: 'Letter Form', desc: 'Contact as a paper letter with a perforated job ticket.', tags: ['FORM'], to: 'contact' },
];

export function LabPage({ go }) {
  const [view, setView] = useState('list');
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono text-[11px] tracking-[0.25em] text-[var(--muted)]">INDEX :: 08 EXPERIMENTS</p>
            <h2 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">LAB</h2>
          </div>
          <div className="pill flex rounded-full p-1">
            {['list', 'grid'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium ${view === v ? 'bg-[var(--fg)] text-[var(--bg)]' : 'text-[var(--muted)]'}`}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {view === 'list' ? (
          <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {EXPERIMENTS.map((e, i) => (
              <button key={e.title} onClick={() => go && go(e.to)} className="group flex w-full items-center gap-4 py-4 text-left">
                <span className="mono w-8 text-xs text-[var(--muted)]">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-xl font-bold tracking-tight transition-transform group-hover:translate-x-1 md:text-2xl">
                  {e.title}
                </span>
                <span className="hidden gap-2 md:flex">
                  {e.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-[var(--muted)] group-hover:text-[var(--fg)]" />
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {EXPERIMENTS.map((e, i) => (
              <button key={e.title} onClick={() => go && go(e.to)} className="pill rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5">
                <p className="mono text-[10px] tracking-[0.22em] text-[var(--muted)]">EXP. {String(i + 1).padStart(2, '0')}</p>
                <p className="mt-2 text-xl font-bold">{e.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{e.desc}</p>
                <div className="mt-3 flex gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}
        <p className="mono mt-8 text-center text-[10px] tracking-[0.22em] text-[var(--muted)]">
          EVERY EXPERIMENT SHIPS IN THIS SITE :: NO DEMOS, ONLY WORKING PARTS
        </p>
      </div>
    </div>
  );
}

/* ---------------- STUDIO : hanging badge ---------------- */
export function StudioPage() {
  const swingRef = useRef(null);
  const dragRef = useRef(null);

  const onDown = (e) => {
    dragRef.current = { x: e.clientX, rot: 0 };
    gsap.killTweensOf(swingRef.current);
  };
  const onMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const rot = Math.max(-22, Math.min(22, dx * 0.12));
    dragRef.current.rot = rot;
    gsap.set(swingRef.current, { rotation: rot });
  };
  const onUp = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    gsap.to(swingRef.current, { rotation: 0, duration: 2.2, ease: 'elastic.out(1, 0.28)' });
  };

  return (
    <div
      className="relative flex h-full flex-col items-center overflow-hidden pt-16"
      onPointerMove={onMove}
      onPointerUp={onUp}
    >
      <p className="mono text-[11px] tracking-[0.25em] text-[var(--muted)]">STUDIO :: ONE OBJECT</p>
      <div ref={swingRef} className="mt-2 flex flex-col items-center" style={{ transformOrigin: 'top center' }}>
        {/* lanyard */}
        <div className="h-[22vh] w-[3px] bg-[var(--muted)]" />
        <div
          className="paper w-[min(86vw,320px)] cursor-grab touch-none select-none p-6 text-center active:cursor-grabbing"
          onPointerDown={onDown}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
            <span className="text-lg font-bold">TS</span>
          </div>
          <p className="mt-4 text-2xl font-bold leading-none">{profile.name.toUpperCase()}</p>
          <p className="mono mt-2 text-[10px] tracking-[0.25em] text-black/60">
            CREATIVE DEVELOPER :: KARACHI
          </p>
          <div className="barcode mx-auto mt-5 h-10 w-3/4" />
          <p className="mono mt-2 text-[10px] tracking-[0.3em] text-black/60">8 9 9 0 0 4 2 6</p>
          <span className="mt-4 inline-block bg-[#ff5c1f] px-3 py-1 text-xs font-bold text-white">
            STUDIO PASS — 2026
          </span>
        </div>
      </div>
      <p className="mono mt-8 animate-pulse text-[11px] tracking-[0.25em] text-[var(--muted)]">
        ← DRAG THE BADGE — IT SWINGS →
      </p>
    </div>
  );
}

/* ---------------- CONTACT : letter + job ticket ---------------- */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Taha,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`https://wa.me/${profile.whatsapp}?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls =
    'w-full border-b-2 border-black/30 bg-transparent py-2 text-[15px] font-medium text-black placeholder-black/35 outline-none focus:border-black';

  return (
    <div className="h-full overflow-y-auto">
      <div className="relative mx-auto flex min-h-full max-w-3xl items-center justify-center px-5 py-10">
        <form onSubmit={submit} className="paper relative w-full p-7 md:p-10">
          {/* ticket stub */}
          <div className="perf absolute -top-4 right-6 rotate-[8deg] border-2 border-dashed border-black/40 bg-white px-4 py-2">
            <p className="mono text-[9px] tracking-[0.25em] text-black/60">JOB TICKET :: NO. 042</p>
            <p className="text-sm font-bold">OPEN TO WORK ✓</p>
          </div>

          <p className="mono text-[11px] tracking-[0.25em] text-black/60">LETTER :: TO TAHA SIRAJ</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Say hello.</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-black/70">
            A project, a role, or just a weird idea — write it like a letter, it lands on my WhatsApp.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mono text-[10px] tracking-[0.22em] text-black/55">FROM :: NAME</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label className="mono text-[10px] tracking-[0.22em] text-black/55">FROM :: EMAIL</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className="mono text-[10px] tracking-[0.22em] text-black/55">MESSAGE ::</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the project..." className={`${inputCls} resize-none`} />
            </div>
          </div>

          <button type="submit" className="mt-7 w-full bg-black py-4 text-base font-bold text-white transition-transform hover:scale-[1.01]">
            {sent ? '✓ SENT — TALK SOON' : 'SEND LETTER →'}
          </button>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {contactInfo.map((c) => (
              <span key={c.label} className="flex items-center gap-2 text-sm font-medium text-black/80">
                <c.icon size={15} />
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="hover:underline">{c.value}</a>
                ) : (
                  c.value
                )}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
