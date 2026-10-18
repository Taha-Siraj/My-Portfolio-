import { useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function Chars({ text, className }) {
  return (
    <span className={`inline-block overflow-hidden ${className || ''}`}>
      {text.split('').map((ch, i) => (
        <span key={i} className="h-char inline-block will-change-transform">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

const STICKERS = [
  { text: 'OPEN TO WORK', bg: '#fa8005', color: '#fff', rot: -8, cls: 'st-1' },
  { text: '74+ REPOS', bg: '#50cbff', color: '#101010', rot: 7, cls: 'st-2' },
  { text: 'MERN STACK', bg: '#f7d000', color: '#101010', rot: -5, cls: 'st-3' },
  { text: '★ SHIPPED', bg: '#ff7b5f', color: '#fff', rot: 9, cls: 'st-4' },
];

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const run = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.from('.h-logo', { scale: 0, rotate: -20, duration: 0.7, ease: 'back.out(1.8)' })
          .from('.h-char', { yPercent: 115, duration: 0.85, stagger: 0.035 }, '-=0.35')
          .from('.h-tape', { scaleX: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
          .from('.h-photo', { scale: 0.6, opacity: 0, rotate: 14, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.55')
          .from('.h-sticker', { scale: 0, rotate: 30, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' }, '-=0.6')
          .from('.h-cta', { y: 40, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.5')
          .from('.h-note', { opacity: 0, x: -30, duration: 0.7 }, '-=0.4');

        /* floating stickers drift */
        gsap.utils.toArray('.h-sticker').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -16 : 14,
            duration: 2.4 + i * 0.4,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          });
        });

        /* scroll parallax: headline races ahead */
        gsap.to('.h-title', {
          yPercent: 28,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.h-photo', {
          yPercent: -18,
          rotate: 8,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }, rootRef);
      return () => ctx.revert();
    };
    let cleanup;
    if (window.__siteReady) cleanup = run();
    else {
      const h = () => { cleanup = run(); };
      window.addEventListener('site-ready', h, { once: true });
      cleanup = () => window.removeEventListener('site-ready', h);
    }
    return () => cleanup && cleanup();
  }, []);

  /* mouse parallax on stickers */
  const onMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to('.h-sticker', { x: px * 34, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    gsap.to('.h-photo', { x: px * -22, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
  };

  return (
    <section
      id="home"
      ref={rootRef}
      onMouseMove={onMove}
      className="relative overflow-hidden bg-[#b6fe00] pb-24 pt-32 md:pt-40"
    >
      {/* scattered sticker badges — desktop only (mobile gets a clean row) */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <div className="h-sticker sticker-pop absolute left-[6%] top-[22%] rotate-[-8deg] bg-[#fa8005] px-4 py-2 font-display text-sm text-white">
          OPEN TO WORK
        </div>
        <div className="h-sticker sticker-pop absolute right-[8%] top-[30%] rotate-[7deg] bg-[#50cbff] px-4 py-2 font-display text-sm text-[#101010]">
          74+ REPOS
        </div>
        <div className="h-sticker badge-circle absolute bottom-[26%] left-[10%] flex h-28 w-28 rotate-[-5deg] items-center justify-center bg-[#f7d000] text-center font-display text-xs leading-tight text-[#101010]">
          MERN
          <br />
          STACK
        </div>
        <div className="h-sticker sticker-pop absolute bottom-[30%] right-[12%] rotate-[9deg] bg-[#ff7b5f] px-4 py-2 font-display text-sm text-white">
          ★ SHIPPED
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-5">
        {/* mobile sticker row — no collisions, no overflow */}
        <div className="mb-5 flex flex-wrap gap-3 md:hidden">
          <div className="h-sticker sticker-pop rotate-[-4deg] bg-[#fa8005] px-3 py-1.5 font-display text-xs text-white">
            ● OPEN TO WORK
          </div>
          <div className="h-sticker sticker-pop rotate-[3deg] bg-[#50cbff] px-3 py-1.5 font-display text-xs text-[#101010]">
            74+ REPOS
          </div>
          <div className="h-sticker sticker-pop rotate-[-2deg] bg-[#f7d000] px-3 py-1.5 font-display text-xs text-[#101010]">
            MERN STACK
          </div>
        </div>

        <h1 className="h-title font-display leading-[0.88] text-[#013900]">
          <Chars text="TAHA" className="block text-[26vw] md:text-[19vw]" />
          <Chars text="SIRAJ" className="block text-[26vw] text-outline md:text-[19vw]" />
        </h1>

        <div className="mt-8 flex flex-col items-start gap-10 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <div className="h-tape inline-block origin-left rotate-[-1.5deg] bg-[#013900] px-5 py-2.5">
              <span className="font-display text-lg tracking-wider text-[#b6fe00] md:text-xl">
                MERN STACK DEVELOPER
              </span>
            </div>
            <p className="mt-5 max-w-md text-lg font-semibold leading-snug text-[#013900]">
              {profile.tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <ScrollLink
                to="projects"
                smooth
                duration={700}
                offset={-60}
                className="h-cta btn-chunk cursor-pointer bg-[#013900] px-8 py-4 font-display text-base text-[#b6fe00]"
              >
                VIEW MY WORK →
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth
                duration={700}
                offset={-60}
                className="h-cta btn-chunk cursor-pointer bg-white px-8 py-4 font-display text-base text-[#013900]"
              >
                HIRE ME
              </ScrollLink>
            </div>
            <p className="h-note font-hand mt-6 rotate-[-2deg] text-3xl text-[#013900]">
              ↑ yes, this whole site is one big sticker. scroll on!
            </p>
          </div>

          {/* taped photo */}
          <div className="h-photo relative mx-auto w-64 shrink-0 rotate-[5deg] md:w-80">
            <div className="paper-card relative p-3 pb-10">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
              <span className="tape tape-white -bottom-2 left-6 rotate-[8deg]" style={{ width: 100 }} />
              <img
                src={profile.avatar}
                alt="Taha Siraj"
                className="h-72 w-full border-4 border-[#101010] object-cover object-top md:h-96"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <p className="font-hand mt-2 text-center text-2xl text-[#101010]">
                the dev himself
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* pull-me tab */}
      <div className="absolute right-6 top-28 z-20 hidden rotate-90 md:block">
        <div className="border-y-4 border-dashed border-[#013900]/40 px-6 py-2 font-display text-sm tracking-[0.3em] text-[#013900]">
          PULL ME ↓
        </div>
      </div>
    </section>
  );
}
