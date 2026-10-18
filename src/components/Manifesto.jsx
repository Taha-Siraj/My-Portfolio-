import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { text: 'I BUILD FOR', color: '#b6fe00' },
  { text: 'THE EVERYDAY', color: '#f5f0e6' },
  { text: 'WEB.', color: '#fa8005' },
];

export default function Manifesto() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* pin and slide kraft panels up, revealing each line */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1,
        },
      });
      gsap.utils.toArray('.m-line').forEach((line, i) => {
        tl.fromTo(
          line.querySelector('.m-mask'),
          { yPercent: 0 },
          { yPercent: -101, duration: 1, ease: 'power2.inOut' },
          i * 0.9
        );
        tl.fromTo(
          line.querySelector('.m-text'),
          { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          i * 0.9 + 0.15
        );
      });
      tl.fromTo(
        '.m-note',
        { opacity: 0, scale: 0.7, rotate: -12 },
        { opacity: 1, scale: 1, rotate: -4, duration: 0.8, ease: 'back.out(1.6)' },
        2.2
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#013900]">
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-24">
        <p className="font-hand mb-8 rotate-[-2deg] text-3xl text-[#b6fe00] md:text-4xl">
          (why i exist — a manifesto in 3 lines)
        </p>
        <div className="w-full max-w-6xl">
          {LINES.map((l, i) => (
            <div key={i} className="m-line relative mb-2 overflow-hidden md:mb-4">
              <h2 className="m-text font-display text-center text-[17vw] leading-[0.95] md:text-[12vw]" style={{ color: l.color }}>
                {l.text}
              </h2>
              <div
                className="m-mask absolute inset-0 flex items-center justify-center border-y-4 border-[#101010] bg-[#c89b6a]"
              >
                <span className="font-display text-xl tracking-[0.35em] text-[#5a3d1e] md:text-3xl">
                  {['PEEL', 'STICK', 'REVEAL'][i]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="m-note sticker mt-10 rotate-[-4deg] px-6 py-3">
          <span className="font-hand text-3xl text-[#013900]">
            no templates were harmed — everything custom ✌
          </span>
        </div>
      </div>
    </section>
  );
}
