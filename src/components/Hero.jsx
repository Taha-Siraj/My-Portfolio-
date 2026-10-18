import { useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useTypewriter } from 'react-simple-typewriter';
import { ArrowDown, FolderGit2, Send } from 'lucide-react';
import gsap from 'gsap';
import { profile, socials } from '../data/content';

function Counter({ value, suffix, label }) {
  const numRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 95%' },
        onUpdate: () => {
          el.textContent = Math.round(obj.n) + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div ref={wrapRef} className="text-center">
      <div
        ref={numRef}
        className="font-display text-3xl font-extrabold text-white md:text-4xl"
      >
        0{suffix}
      </div>
      <div className="font-mono2 mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const rootRef = useRef(null);
  const nameRef = useRef(null);
  const [text] = useTypewriter({
    words: profile.roles,
    loop: true,
    typeSpeed: 55,
    deleteSpeed: 32,
    delaySpeed: 1600,
  });

  useEffect(() => {
    const run = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.h-badge', { opacity: 0, y: -24, duration: 0.6 })
          .from('.h-line', { opacity: 0, y: 70, duration: 0.9, stagger: 0.12 }, '-=0.3')
          .from('.h-role', { opacity: 0, y: 24, duration: 0.6 }, '-=0.5')
          .from('.h-desc', { opacity: 0, y: 24, duration: 0.6 }, '-=0.4')
          .from('.h-cta', { opacity: 0, y: 24, duration: 0.6, stagger: 0.1 }, '-=0.4')
          .from('.h-social', { opacity: 0, y: 18, duration: 0.5, stagger: 0.07 }, '-=0.4')
          .from('.h-stats', { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
          .from('.h-scroll', { opacity: 0, duration: 0.8 }, '-=0.3');
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

  /* 3D tilt on the name */
  const onTilt = (e) => {
    const el = nameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };
  const onTiltEnd = () => {
    if (nameRef.current)
      nameRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <section
      id="home"
      data-palette="0"
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="h-badge mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-2 backdrop-blur-md">
          <span className="animate-blink-dot h-2 w-2 rounded-full bg-cyan-300" />
          <span className="font-mono2 text-[11px] uppercase tracking-[0.25em] text-cyan-200">
            Available for freelance work
          </span>
        </div>

        <div
          ref={nameRef}
          onMouseMove={onTilt}
          onMouseLeave={onTiltEnd}
          className="transition-transform duration-200 ease-out will-change-transform"
          data-hover
        >
          <h1 className="h-line font-display hero-shine text-[19vw] font-extrabold leading-[0.9] tracking-tight text-white sm:text-[15vw] lg:text-[10.5rem]">
            {profile.firstName}
          </h1>
          <h1 className="h-line font-display hero-shine gradient-text text-[19vw] font-extrabold leading-[0.9] tracking-tight sm:text-[15vw] lg:text-[10.5rem]">
            {profile.lastName}
          </h1>
        </div>

        <div className="h-role font-mono2 mt-6 text-base text-cyan-200 md:text-xl">
          <span className="text-white/40">&gt;_</span> {text}
          <span className="animate-blink-dot ml-1 inline-block h-4 w-[3px] translate-y-[2px] bg-cyan-300" />
        </div>

        <p className="h-desc mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          {profile.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <ScrollLink
            to="projects"
            smooth
            duration={700}
            offset={-70}
            className="h-cta group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-[#030014] shadow-[0_0_36px_rgba(34,211,238,0.35)] transition-transform hover:scale-105"
          >
            <FolderGit2 size={17} />
            View My Work
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth
            duration={700}
            offset={-70}
            className="h-cta glass inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:border-cyan-300/50 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]"
          >
            <Send size={16} />
            Let's Talk
          </ScrollLink>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="h-social glass flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-all hover:-translate-y-1 hover:border-fuchsia-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,255,0.35)]"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <div className="h-stats glass mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 rounded-3xl px-6 py-7 sm:grid-cols-4">
          {profile.stats.map((s) => (
            <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>

      <div className="h-scroll absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/25 p-2">
          <div
            className="h-2.5 w-1 rounded-full bg-cyan-300"
            style={{ animation: 'scroll-wheel 1.8s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
