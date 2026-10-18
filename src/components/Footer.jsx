import { useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials, profile } from '../data/content';
import { marqueeItems } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ft-word', {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-[#012b00] pt-20">
      {/* wavy top edge */}
      <svg className="absolute -top-1 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 46 }}>
        <path d="M0,60 C240,0 480,0 720,30 C960,60 1200,60 1440,10 L1440,0 L0,0 Z" fill="#013900" />
      </svg>

      <div className="mx-auto max-w-6xl px-5 text-center">
        <div className="sticker-dark mx-auto inline-block rotate-[-2deg] px-6 py-3">
          <span className="font-display text-xl text-white">
            TAHA<span className="text-[#b6fe00]">.SIRAJ</span>
          </span>
        </div>
        <h2 className="ft-word font-display mt-8 whitespace-nowrap text-[13vw] leading-[0.9] text-[#b6fe00] md:text-[10vw]">
          STICK BY YOU
        </h2>
        <p className="font-hand mt-4 text-3xl text-[#b6fe00]/80">
          (that's the whole philosophy, really)
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['ABOUT', 'SKILLS', 'WORK', 'JOURNEY', 'CONTACT'].map((l, i) => (
            <ScrollLink
              key={l}
              to={['about', 'skills', 'projects', 'experience', 'contact'][i]}
              smooth
              duration={650}
              offset={-60}
              className="cursor-pointer font-display text-sm tracking-[0.2em] text-[#b6fe00] hover:text-white"
            >
              {l}
            </ScrollLink>
          ))}
        </div>

        {/* sticker strip */}
        <div className="mt-12 overflow-hidden border-t-4 border-[#b6fe00]/25 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-4 pb-4">
            {marqueeItems.slice(0, 6).map((m, i) => (
              <span
                key={i}
                className="sticker px-4 py-2 font-display text-xs text-[#013900]"
                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 3}deg)` }}
              >
                {m.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 pb-10">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#b6fe00] text-[#b6fe00] transition-transform hover:scale-110 hover:bg-[#b6fe00] hover:text-[#013900]"
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <p className="border-t border-[#b6fe00]/20 py-6 font-display text-xs tracking-[0.25em] text-[#b6fe00]/60">
          © {new Date().getFullYear()} {profile.name.toUpperCase()} — STUCK TOGETHER WITH GSAP
        </p>
      </div>
    </footer>
  );
}
