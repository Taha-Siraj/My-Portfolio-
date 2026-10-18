import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import { skills } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const SEGS = 10;
  const filled = Math.round(skill.level / 10);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.55,
        ease: 'power2.out',
        delay: (index % 4) * 0.06,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  const Icon = skill.icon;
  return (
    <div ref={cardRef} className="pixel-panel p-4 transition-transform duration-150 hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border-[3px] border-black bg-[#0a0a10]">
          <Icon size={22} style={{ color: skill.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xl leading-none text-white">{skill.name}</div>
          <div className="font-pixel mt-1 text-[8px] text-[#9a9ab0]">
            LVL {Math.ceil(skill.level / 10)}/10
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: SEGS }).map((_, i) => (
          <div key={i} className={`seg h-4 flex-1 ${i < filled ? 'on' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SKILL TREE"
          title="ABILITIES"
          desc="Points invested across the stack. No respec needed."
          color="yellow"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
