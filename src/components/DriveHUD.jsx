import { useEffect, useState } from 'react';
import { profile, projects, skills, experience, education, services, socials, contactInfo } from '../data/content';
import { ZONES } from '../three/DriveWorld';

function Chip({ children, bg = '#101010', color = '#fff' }) {
  return (
    <span className="inline-block px-2.5 py-1 font-display text-[11px] tracking-wide" style={{ background: bg, color }}>
      {children}
    </span>
  );
}

function ZoneBody({ zone }) {
  if (zone === 'about') {
    return (
      <div>
        <p className="text-lg font-semibold leading-snug text-[#101010]">{profile.tagline}</p>
        <p className="font-hand mt-2 text-2xl text-[#a87c4e]">📍 {profile.location} — {profile.roles.join(' • ')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.stats.map((s) => (
            <Chip key={s.label} bg="#013900" color="#b6fe00">{s.value}{s.suffix} {s.label.toUpperCase()}</Chip>
          ))}
        </div>
        <a href={profile.cv} download className="btn-chunk mt-4 inline-block bg-[#013900] px-5 py-2.5 font-display text-sm text-[#b6fe00]">
          DOWNLOAD CV ↓
        </a>
      </div>
    );
  }
  if (zone === 'skills') {
    return (
      <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1">
        {skills.map((s) => (
          <Chip key={s.name} bg={s.color || '#101010'} color="#101010">{s.name.toUpperCase()}</Chip>
        ))}
      </div>
    );
  }
  if (zone === 'projects') {
    return (
      <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
        {projects.map((p) => (
          <div key={p.title} className="flex items-center justify-between gap-3 border-b-2 border-dashed border-[#101010]/20 pb-2">
            <div>
              <p className="font-display text-base leading-tight text-[#101010]">{p.title.toUpperCase()}</p>
              <p className="text-sm font-medium text-[#101010]/70">{p.tech.slice(0, 3).join(' • ')}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a href={p.liveLink} target="_blank" rel="noreferrer" className="btn-chunk bg-[#013900] px-3 py-1.5 font-display text-xs text-[#b6fe00]">LIVE ↗</a>
              <a href={p.githubLink} target="_blank" rel="noreferrer" className="btn-chunk bg-white px-3 py-1.5 font-display text-xs text-[#101010]">{'</>'}</a>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (zone === 'journey') {
    return (
      <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
        {experience.map((e, i) => (
          <div key={i} className="border-b-2 border-dashed border-[#101010]/20 pb-2">
            <p className="font-display text-base leading-tight text-[#101010]">{e.title.toUpperCase()}</p>
            <p className="font-hand text-2xl text-[#a87c4e]">{e.company} — {e.period}</p>
          </div>
        ))}
        {education.map((e, i) => (
          <div key={i} className="border-b-2 border-dashed border-[#101010]/20 pb-2">
            <p className="font-display text-base leading-tight text-[#101010]">{e.title.toUpperCase()}</p>
            <p className="font-hand text-2xl text-[#a87c4e]">{e.institution} — {e.period}</p>
          </div>
        ))}
      </div>
    );
  }
  if (zone === 'services') {
    return (
      <div className="grid max-h-56 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="border-[3px] border-[#101010] bg-white p-3">
            <p className="font-display text-sm text-[#101010]">{s.title.toUpperCase()}</p>
            <p className="mt-1 text-[13px] font-medium leading-snug text-[#101010]/70">{s.desc}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      <div className="space-y-2">
        {contactInfo.map((c) => (
          <div key={c.label} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border-[3px] border-[#101010] bg-[#b6fe00] text-[#013900]">
              <c.icon size={16} />
            </span>
            {c.href ? (
              <a href={c.href} target="_blank" rel="noreferrer" className="truncate font-bold text-[#101010] hover:underline">{c.value}</a>
            ) : (
              <span className="font-bold text-[#101010]">{c.value}</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="sticker flex h-10 w-10 items-center justify-center text-[#013900]">
            <s.icon size={18} />
          </a>
        ))}
        <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="btn-chunk bg-[#25d366] px-5 py-2 font-display text-sm text-white">
          WHATSAPP ME →
        </a>
      </div>
    </div>
  );
}

export default function DriveHUD({ zone, controlsRef }) {
  const [started, setStarted] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      const s = controlsRef?.current?.speed;
      if (typeof s === 'number') setSpeed(Math.round(s * 3.6));
    }, 150);
    return () => clearInterval(t);
  }, [controlsRef]);

  const press = (key, down) => (e) => {
    e.preventDefault();
    if (!controlsRef.current) controlsRef.current = {};
    if (!controlsRef.current.input) controlsRef.current.input = {};
    controlsRef.current.input[key] = down;
  };

  const zoneMeta = ZONES.find((z) => z.id === zone);
  const padBtn = 'flex h-16 w-16 items-center justify-center border-4 border-[#101010] bg-white/90 font-display text-2xl text-[#101010] active:bg-[#b6fe00] touch-none select-none';

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col">
      {/* top bar */}
      <div className="flex items-start justify-between p-3 md:p-5">
        <div className="sticker-dark rotate-[-2deg] px-4 py-2">
          <span className="font-display text-lg text-white md:text-xl">
            TAHA<span className="text-[#b6fe00]">.SIRAJ</span>
          </span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="sticker hidden px-4 py-2 font-display text-sm text-[#013900] sm:block">
            🚗 {speed} KM/H
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="sticker px-4 py-2 font-display text-sm text-[#013900]"
          >
            🗺️ MAP
          </button>
        </div>
      </div>

      {/* map / teleport panel */}
      {showMap && (
        <div className="pointer-events-auto mx-auto w-[min(92vw,480px)]">
          <div className="paper-card relative p-5">
            <span className="tape -top-3 left-8 rotate-[-5deg]" style={{ width: 90 }} />
            <p className="font-display text-xl text-[#013900]">🗺️ TELEPORT — KAHAN JANA HAI?</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => {
                    if (!controlsRef.current) controlsRef.current = {};
                    controlsRef.current.teleport = z.id;
                    setShowMap(false);
                  }}
                  className="btn-chunk px-4 py-3 text-left font-display text-sm text-[#101010]"
                  style={{ background: z.color }}
                >
                  {z.label} →
                </button>
              ))}
            </div>
            <p className="font-hand mt-3 text-center text-2xl text-[#a87c4e]">
              ya gaari chala ke khud dhoond lo!
            </p>
          </div>
        </div>
      )}

      <div className="flex-1" />

      {/* zone panel */}
      {zoneMeta && (
        <div className="pointer-events-auto mx-auto mb-3 w-[min(94vw,560px)] px-2">
          <div className="paper-card relative max-h-[46vh] overflow-y-auto p-5">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" style={{ width: 100 }} />
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-2xl text-[#013900]">📍 {zoneMeta.label}</p>
              <span className="sticker px-3 py-1 font-display text-xs text-[#013900]">YOU ARE HERE</span>
            </div>
            <div className="mt-3">
              <ZoneBody zone={zone} />
            </div>
          </div>
        </div>
      )}

      {/* controls hint + touch pads */}
      <div className="flex items-end justify-between p-3 md:p-5">
        <p className="font-hand hidden rotate-[-1deg] text-3xl text-white drop-shadow-[2px_2px_0_#101010] md:block">
          WASD / arrow keys se gaari chalao — glowing zone me ghuso!
        </p>
        <p className="font-hand rotate-[-1deg] text-2xl text-white drop-shadow-[2px_2px_0_#101010] md:hidden">
          neeche wale buttons se chalao!
        </p>
        {/* touch controls */}
        <div className="pointer-events-auto flex items-end gap-3 md:hidden">
          <div className="flex gap-2">
            <button className={padBtn} onPointerDown={press('left', true)} onPointerUp={press('left', false)} onPointerLeave={press('left', false)} onPointerCancel={press('left', false)}>◀</button>
            <button className={padBtn} onPointerDown={press('right', true)} onPointerUp={press('right', false)} onPointerLeave={press('right', false)} onPointerCancel={press('right', false)}>▶</button>
          </div>
          <div className="flex flex-col gap-2">
            <button className={padBtn} onPointerDown={press('up', true)} onPointerUp={press('up', false)} onPointerLeave={press('up', false)} onPointerCancel={press('up', false)}>▲</button>
            <button className={padBtn} onPointerDown={press('down', true)} onPointerUp={press('down', false)} onPointerLeave={press('down', false)} onPointerCancel={press('down', false)}>▼</button>
          </div>
        </div>
        <div className="pointer-events-auto hidden md:block">
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="btn-chunk bg-[#25d366] px-6 py-3 font-display text-sm text-white">
            HIRE ME →
          </a>
        </div>
      </div>

      {/* intro overlay */}
      {!started && (
        <div className="pointer-events-auto absolute inset-0 z-30 flex items-center justify-center bg-[#013900]/60 p-5">
          <div className="paper-card relative w-[min(92vw,520px)] p-7 text-center">
            <span className="tape tape-green -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" style={{ width: 110 }} />
            <p className="font-display text-4xl leading-none text-[#013900] md:text-5xl">
              WELCOME TO
              <br />
              MY WORLD! 🚗
            </p>
            <p className="mt-4 text-lg font-semibold leading-snug text-[#101010]">
              Ye mera portfolio hai — lekin parhne wala nahi, <b>chalane wala</b>.
              Gaari me betho, glowing zones me jao, aur har zone mera kaam kholega.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="bg-[#101010] px-3 py-1 font-display text-xs text-white">WASD / ARROWS — DRIVE</span>
              <span className="bg-[#101010] px-3 py-1 font-display text-xs text-white">MAP — TELEPORT</span>
              <span className="bg-[#101010] px-3 py-1 font-display text-xs text-white">MOBILE — ON-SCREEN BUTTONS</span>
            </div>
            <button
              onClick={() => setStarted(true)}
              className="btn-chunk mt-6 w-full bg-[#fa8005] px-8 py-4 font-display text-lg text-white"
            >
              🚗 START DRIVING →
            </button>
            <p className="font-hand mt-3 text-2xl text-[#a87c4e]">
              (drive nahi karni? MAP se teleport kar lo)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
