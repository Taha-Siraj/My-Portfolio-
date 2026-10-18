import { useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';
import { profile, socials } from '../data/content';

function Bar({ label, value, color, delay = 0 }) {
  const fillRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${value}%`,
          duration: 1.6,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: fillRef.current, start: 'top 95%' },
        }
      );
    });
    return () => ctx.revert();
  }, [value, delay]);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="font-pixel text-[9px] text-[#9a9ab0]">{label}</span>
        <span className="text-lg leading-none" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="stat-bar h-5">
        <div ref={fillRef} className="stat-fill w-0" style={{ background: color }} />
      </div>
    </div>
  );
}

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const run = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.h-badge', { opacity: 0, y: -20, duration: 0.5 })
          .from('.h-card', { opacity: 0, y: 60, duration: 0.8 }, '-=0.25')
          .from('.h-side > *', { opacity: 0, x: 40, duration: 0.6, stagger: 0.12 }, '-=0.5')
          .from('.h-stats > *', { opacity: 0, y: 24, duration: 0.5, stagger: 0.08 }, '-=0.3');
      }, rootRef);
      return () => ctx.revert();
    };
    let cleanup;
    if (window.__siteReady) cleanup = run();
    else {
      const handler = () => {
        cleanup = run();
      };
      window.addEventListener('site-ready', handler, { once: true });
      cleanup = () => window.removeEventListener('site-ready', handler);
    }
    return () => cleanup && cleanup();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-32 md:pt-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="h-badge mb-8 text-center">
          <span className="font-pixel animate-blink text-[10px] text-[#ffec27] md:text-xs">
            ▼ PRESS START ▼
          </span>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-5">
          {/* PLAYER CARD */}
          <div className="h-card pixel-panel p-6 md:p-8 lg:col-span-3">
            <div className="flex items-center justify-between">
              <span className="font-pixel bg-[#00e436] px-3 py-1.5 text-[9px] text-[#061206] border-2 border-black">
                PLAYER 1
              </span>
              <span className="font-pixel text-[9px] text-[#9a9ab0]">
                LVL {profile.level}
              </span>
            </div>

            <h1 className="h-pixel mt-6 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              {profile.firstName}
              <br />
              <span className="text-[#00e436]">{profile.lastName}</span>
            </h1>

            <div className="font-pixel mt-4 text-[10px] leading-relaxed text-[#29adff] md:text-xs">
              {'<'} {profile.title} {'>'}
            </div>

            <p className="mt-5 max-w-xl text-xl leading-snug text-[#c9c9d8] md:text-2xl">
              {profile.tagline}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <Bar label="HP / HEALTH" value={profile.hp} color="#ff004d" />
              <Bar label="MP / MANA" value={profile.mp} color="#29adff" delay={0.15} />
              <Bar label="XP / CAREER" value={profile.xp} color="#00e436" delay={0.3} />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ScrollLink
                to="projects"
                smooth
                duration={700}
                offset={-80}
                className="pixel-btn pixel-btn-green font-pixel cursor-pointer px-6 py-4 text-[11px]"
              >
                ▶ START QUEST
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth
                duration={700}
                offset={-80}
                className="pixel-btn pixel-btn-ghost font-pixel cursor-pointer px-6 py-4 text-[11px]"
              >
                JOIN PARTY
              </ScrollLink>
            </div>
          </div>

          {/* SIDE PANEL */}
          <div className="h-side flex flex-col gap-6 lg:col-span-2">
            <div className="pixel-panel p-6">
              <div className="font-pixel mb-4 text-[10px] text-[#ffec27]">
                ▣ CHARACTER STATS
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {profile.stats.map((s) => (
                  <div key={s.label} className="border-b-2 border-black/40 pb-2">
                    <div className="font-pixel text-lg text-white">
                      {s.value}
                      {s.suffix}
                    </div>
                    <div className="font-pixel mt-1 text-[8px] leading-relaxed text-[#9a9ab0]">
                      {s.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pixel-panel p-6">
              <div className="font-pixel mb-4 text-[10px] text-[#29adff]">
                ▣ SOCIAL LINKS
              </div>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="pixel-panel-light flex h-12 w-12 items-center justify-center text-white transition-transform hover:-translate-y-1"
                    style={{ color: '#f4f4f4' }}
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
              <div className="mt-4 text-xl text-[#9a9ab0]">
                <span className="text-[#00e436]">▸</span> {profile.location}
              </div>
            </div>
          </div>
        </div>

        <div className="h-stats mt-10 flex justify-center">
          <div className="animate-bounce-soft font-pixel text-[10px] text-[#9a9ab0]">
            ▼ SCROLL ▼
          </div>
        </div>
      </div>
    </section>
  );
}
