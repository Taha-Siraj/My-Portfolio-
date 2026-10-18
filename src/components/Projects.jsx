import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { projects, profile } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const CARD_BG = ['#50cbff', '#ff7b5f', '#b6fe00', '#f7d000', '#fa8005', '#f5f0e6'];

export default function Projects() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pj-card').forEach((el, i) => {
        gsap.from(el, {
          y: 110,
          opacity: 0,
          rotate: i % 2 === 0 ? -5 : 5,
          duration: 0.9,
          ease: 'back.out(1.3)',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.from('.pj-title', {
        yPercent: 110,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
      /* explore badge spins on scroll */
      gsap.to('.pj-explore', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={rootRef} className="relative overflow-hidden bg-[#f7d000] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-display text-center text-lg tracking-[0.35em] text-[#101010]">
          MEET THE ONES THAT SHIP
        </p>
        <div className="overflow-hidden">
          <h2 className="pj-title font-display mt-2 text-center text-7xl text-[#013900] md:text-9xl" style={{ textShadow: '5px 5px 0 #fff' }}>
            THE WORK
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* spinning explore badge */}
          <div className="pj-explore badge-circle absolute -top-8 right-2 z-10 hidden h-28 w-28 items-center justify-center bg-[#013900] text-center font-display text-xs leading-tight text-[#b6fe00] lg:flex">
            100%
            <br />
            SHIPPED
          </div>

          {projects.map((p, i) => (
            <article
              key={p.title}
              className="pj-card paper-card relative flex flex-col p-3"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.6}deg)` }}
            >
              <span className="tape tape-white -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" style={{ width: 110 }} />
              <div
                className="relative h-48 overflow-hidden border-4 border-[#101010]"
                style={{ background: CARD_BG[i % CARD_BG.length] }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {p.featured && (
                  <span className="absolute right-2 top-2 rotate-6 bg-[#013900] px-3 py-1 font-display text-xs text-[#b6fe00]">
                    ★ BESTSELLER
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="font-display text-xl leading-tight text-[#101010]">
                  {p.title.toUpperCase()}
                </h3>
                <p className="mt-2 flex-1 text-[15px] font-medium leading-snug text-[#101010]/75">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="bg-[#101010] px-2 py-0.5 font-display text-[10px] tracking-wide text-white">
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-chunk flex-1 bg-[#013900] px-4 py-2.5 text-center font-display text-sm text-[#b6fe00]"
                  >
                    VIEW LIVE ↗
                  </a>
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Source code"
                    className="btn-chunk bg-white px-4 py-2.5 font-display text-sm text-[#101010]"
                  >
                    {'</>'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn-chunk inline-flex items-center gap-2 bg-[#101010] px-8 py-4 font-display text-base text-[#b6fe00]"
          >
            <ExternalLink size={18} /> ALL 74+ REPOS ON GITHUB
          </a>
        </div>
      </div>
    </section>
  );
}
