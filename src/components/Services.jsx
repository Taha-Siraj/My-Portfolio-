import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ShoppingBag, MousePointerClick, Server, Palette, Gauge } from 'lucide-react';
import { services } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Layers, ShoppingBag, MousePointerClick, Server, Palette, Gauge];
const COLORS = ['#b6fe00', '#fa8005', '#50cbff', '#ff7b5f', '#f7d000', '#013900'];

export default function Services() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sv-card', {
        y: 90,
        opacity: 0,
        rotate: () => gsap.utils.random(-7, 7),
        duration: 0.8,
        ease: 'back.out(1.5)',
        stagger: 0.08,
        scrollTrigger: { trigger: '.sv-grid', start: 'top 85%' },
      });
      gsap.from('.sv-title', {
        yPercent: 110,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={rootRef} className="relative overflow-hidden bg-[#c9a876] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="overflow-hidden text-center">
          <h2 className="sv-title whitespace-nowrap font-display text-[10.5vw] text-[#013900] md:text-8xl" style={{ textShadow: '4px 4px 0 #f5f0e6' }}>
            WHAT I STICK TO
          </h2>
        </div>
        <p className="font-hand mt-3 rotate-[-1deg] text-center text-3xl text-[#5a3d1e]">
          six ways i can make your project stick
        </p>

        <div className="sv-grid mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = COLORS[i % COLORS.length];
            return (
              <div
                key={s.title}
                className="sv-card paper-card relative p-6"
                style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
              >
                <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[2deg]" style={{ width: 90 }} />
                <span
                  className="flex h-14 w-14 items-center justify-center border-4 border-[#101010]"
                  style={{ background: color, color: color === '#013900' ? '#b6fe00' : '#101010' }}
                >
                  <Icon size={26} />
                </span>
                <h3 className="font-display mt-4 text-xl leading-tight text-[#101010]">
                  {s.title.toUpperCase()}
                </h3>
                <p className="mt-2 text-[15px] font-medium leading-snug text-[#101010]/75">
                  {s.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="bg-[#101010] px-2 py-0.5 font-display text-[10px] tracking-wide text-white">
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
