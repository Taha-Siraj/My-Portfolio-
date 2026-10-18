import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Ribbon({ items, bg = '#013900', color = '#b6fe00', rotate = -2 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { rotate },
        {
          rotate: rotate * -0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [rotate]);

  const row = [...items, ...items];
  return (
    <div className="relative z-30 -my-6 overflow-hidden py-6">
      <div
        ref={ref}
        className="w-[110%] -ml-[5%] overflow-hidden border-y-4 border-[#101010] py-4"
        style={{ background: bg, transform: `rotate(${rotate}deg)` }}
      >
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl tracking-wide md:text-4xl" style={{ color }}>
                {item}
              </span>
              <span
                className="inline-block h-5 w-5 rotate-45 border-[3px] border-[#101010]"
                style={{ background: color === '#b6fe00' ? '#f7d000' : '#b6fe00' }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
