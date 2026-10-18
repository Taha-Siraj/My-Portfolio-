import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    word: 'TO CREATE',
    bg: '#b6fe00',
    color: '#013900',
    note: 'every masterpiece starts held in place.',
    stickers: [
      { t: 'UI THAT POPS', bg: '#fa8005', x: '8%', y: '18%', r: -8, d: 1 },
      { t: 'PIXEL PERFECT', bg: '#50cbff', x: '82%', y: '24%', r: 7, d: 2 },
      { t: '★ WOW', bg: '#f7d000', x: '12%', y: '72%', r: 6, d: 3 },
    ],
  },
  {
    word: 'TO CODE',
    bg: '#f7d000',
    color: '#101010',
    note: 'the quick fix that outlasts the thing it fixed.',
    stickers: [
      { t: 'CLEAN CODE', bg: '#b6fe00', x: '84%', y: '20%', r: -6, d: 1 },
      { t: '0 BUGS*', bg: '#ff7b5f', x: '10%', y: '26%', r: 8, d: 2 },
      { t: '*ALMOST', bg: '#f5f0e6', x: '78%', y: '70%', r: -9, d: 3 },
    ],
  },
  {
    word: 'TO SHIP',
    bg: '#fa8005',
    color: '#fff',
    note: 'from my hands to production, arriving whole.',
    stickers: [
      { t: 'DEPLOYED ✓', bg: '#b6fe00', x: '12%', y: '22%', r: -7, d: 1 },
      { t: 'LIVE!', bg: '#013900', x: '80%', y: '68%', r: 6, d: 2 },
      { t: 'v1.0 → ∞', bg: '#50cbff', x: '82%', y: '22%', r: -5, d: 3 },
    ],
  },
];

export default function Chapters() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.ch-panel');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: `+=${panels.length * 110}%`,
          pin: true,
          scrub: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i > 0) {
          tl.fromTo(
            panel,
            { yPercent: 100 },
            { yPercent: 0, duration: 1, ease: 'power2.inOut' },
            (i - 0.5)
          );
        }
        /* stickers float at different depths */
        panel.querySelectorAll('.ch-sticker').forEach((st) => {
          const depth = parseFloat(st.dataset.d || 1);
          tl.fromTo(
            st,
            { y: 120 * depth, rotate: 0 },
            { y: -90 * depth, rotate: depth * 8, duration: 2.2, ease: 'none' },
            Math.max(0, i - 0.5)
          );
        });
        /* giant word drifts */
        tl.fromTo(
          panel.querySelector('.ch-word'),
          { xPercent: 6 },
          { xPercent: -6, duration: 2.2, ease: 'none' },
          Math.max(0, i - 0.5)
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div className="relative h-screen">
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.word}
            className="ch-panel absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: ch.bg, zIndex: i + 1 }}
          >
            {/* parallax stickers */}
            {ch.stickers.map((s, j) => (
              <div
                key={j}
                data-d={s.d}
                className="ch-sticker sticker-pop absolute px-5 py-3 font-display text-sm md:text-base"
                style={{ background: s.bg, color: s.bg === '#f5f0e6' || s.bg === '#50cbff' || s.bg === '#b6fe00' || s.bg === '#f7d000' ? '#101010' : '#fff', left: s.x, top: s.y, transform: `rotate(${s.r}deg)` }}
              >
                {s.t}
              </div>
            ))}

            <span className="font-display text-lg tracking-[0.4em] md:text-xl" style={{ color: ch.color }}>
              CHAPTER {i + 1}
            </span>
            <h2
              className="ch-word font-display mt-2 whitespace-nowrap text-[15vw] leading-none md:text-[15vw]"
              style={{ color: ch.color, textShadow: i === 2 ? '6px 6px 0 #101010' : 'none' }}
            >
              {ch.word}
            </h2>
            <p className="font-hand mt-6 rotate-[-2deg] px-6 text-center text-3xl md:text-4xl" style={{ color: ch.color }}>
              "{ch.note}"
            </p>

            {/* taped photo card */}
            <div className="paper-card relative mt-8 w-56 rotate-[-4deg] p-2.5 md:w-72">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[5deg]" style={{ width: 110 }} />
              <div
                className="flex h-32 items-center justify-center border-4 border-[#101010] font-display text-2xl md:h-40"
                style={{ background: ['#50cbff', '#ff7b5f', '#b6fe00'][i] }}
              >
                <span className="text-[#101010]">{['🎨', '💻', '🚀'][i]}</span>
              </div>
              <p className="font-hand mt-1 text-center text-2xl">
                {['design first', 'code second', 'ship always'][i]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
