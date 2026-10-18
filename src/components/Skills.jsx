import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { skills } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function SkillCard({ skill, index }) {
  const barRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 36,
        scale: 0.96,
        duration: 0.7,
        ease: 'power3.out',
        delay: (index % 4) * 0.08,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [skill.level, index]);

  const Icon = skill.icon;
  return (
    <div
      ref={cardRef}
      data-hover
      className="glass group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_12px_44px_rgba(34,211,238,0.18)]"
    >
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        >
          <Icon size={24} style={{ color: skill.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold text-white">
            {skill.name}
          </div>
          <div className="font-mono2 text-xs text-white/40">{skill.level}%</div>
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
          style={{ boxShadow: '0 0 12px rgba(34,211,238,0.6)' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" data-palette="2" className="relative z-10 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Arsenal"
          title="Skills & Tech"
          desc="The weapons I wield to bend the web to my will."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="font-mono2 text-sm text-white/40">
            <span className="text-cyan-300">+</span> always learning — currently
            deep-diving into <span className="text-fuchsia-300">GLSL shaders</span> &{' '}
            <span className="text-fuchsia-300">advanced Three.js</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
