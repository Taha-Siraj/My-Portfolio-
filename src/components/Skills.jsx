import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const BG = ['#b6fe00', '#f7d000', '#50cbff', '#ff7b5f', '#f5f0e6', '#fa8005'];

export default function Skills() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sk-chip', {
        scale: 0,
        rotate: () => gsap.utils.random(-24, 24),
        duration: 0.65,
        ease: 'back.out(1.8)',
        stagger: { each: 0.05, from: 'random' },
        scrollTrigger: { trigger: '.sk-wall', start: 'top 82%' },
      });
      gsap.from('.sk-title', {
        yPercent: 110,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={rootRef} className="relative overflow-hidden bg-[#fa8005] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="overflow-hidden text-center">
          <h2 className="sk-title font-display text-6xl text-white md:text-8xl" style={{ textShadow: '5px 5px 0 #101010' }}>
            STICKER WALL
          </h2>
        </div>
        <p className="font-hand mt-2 rotate-[1deg] text-center text-3xl text-[#101010]">
          every skill earned, none just stuck on
        </p>

        <div className="sk-wall mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {skills.map((s, i) => {
            const Icon = s.icon;
            const rot = (i % 2 === 0 ? -1 : 1) * (2 + (i % 4));
            return (
              <div
                key={s.name}
                className="sk-chip sticker-pop flex items-center gap-3 rounded-2xl bg-white px-5 py-3"
                style={{ transform: `rotate(${rot}deg)`, background: BG[i % BG.length] }}
              >
                <Icon size={26} className="shrink-0 text-[#101010]" />
                <span className="font-display text-sm tracking-wide text-[#101010] md:text-base">
                  {s.name.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>

        <p className="font-hand mt-12 rotate-[-1deg] text-center text-3xl text-white">
          + currently sticking: advanced GSAP & WebGL wizardry
        </p>
      </div>
    </section>
  );
}
