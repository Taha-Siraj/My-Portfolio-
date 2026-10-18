import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function Timeline({ items, kind }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[26px] top-0 w-1.5 bg-[#101010] md:left-1/2 md:-translate-x-1/2" />
      {items.map((item, i) => (
        <div
          key={i}
          className={`tl-item relative mb-10 pl-20 md:w-1/2 md:pl-0 ${
            i % 2 === 0 ? 'md:pr-14' : 'md:ml-auto md:pl-14'
          }`}
        >
          <div
            className={`absolute top-3 h-8 w-8 rotate-45 border-4 border-[#101010] ${
              i % 2 === 0
                ? 'left-[14px] md:left-auto md:-right-[16px]'
                : 'left-[14px] md:-left-[16px]'
            }`}
            style={{ background: ['#b6fe00', '#fa8005', '#50cbff'][i % 3] }}
          />
          <div
            className="paper-card relative p-6"
            style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.2}deg)` }}
          >
            <span className="tape -top-3 left-10 rotate-[-5deg]" style={{ width: 90 }} />
            <span className="inline-block bg-[#013900] px-3 py-1 font-display text-xs tracking-wider text-[#b6fe00]">
              {item.period.toUpperCase()}
            </span>
            <h3 className="font-display mt-3 text-xl leading-tight text-[#101010]">
              {(item.title).toUpperCase()}
            </h3>
            <p className="font-hand text-2xl text-[#a87c4e]">
              {item.company || item.institution}
              {item.location ? ` — ${item.location}` : ''}
            </p>
            <p className="mt-2 font-medium leading-snug text-[#101010]/75">{item.desc}</p>
            {item.tech && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span key={t} className="border-2 border-[#101010] bg-[#f7d000] px-2 py-0.5 font-display text-[10px] text-[#101010]">
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.tl-item').forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="experience" ref={rootRef} className="relative overflow-hidden bg-[#f5f0e6] py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center font-display text-6xl text-[#013900] md:text-8xl">
            THE <span className="tape-underline">JOURNEY</span>
          </h2>
          <p className="font-hand mt-3 rotate-[1deg] text-center text-3xl text-[#a87c4e]">
            stuck with me through every role
          </p>
          <div className="mt-16">
            <Timeline items={experience} kind="exp" />
          </div>
        </div>
      </section>

      <section id="education" className="relative overflow-hidden bg-[#50cbff] py-24 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center font-display text-5xl text-[#101010] md:text-7xl" style={{ textShadow: '4px 4px 0 #fff' }}>
            SCHOOL OF STICK
          </h2>
          <p className="font-hand mt-2 text-center text-3xl text-[#101010]">
            where the glue was made
          </p>
          <div className="mt-14">
            <Timeline items={education} kind="edu" />
          </div>
        </div>
      </section>
    </>
  );
}
