import { GraduationCap, CalendarDays } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { education } from '../data/content';

export default function Education() {
  return (
    <section
      id="education"
      data-palette="6"
      className="relative z-10 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Academic Chronology"
          title="Education"
          desc="The foundation behind the craft."
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-gradient-to-b from-violet-400 via-fuchsia-500 to-cyan-400 opacity-40" />
          {education.map((item) => (
            <Reveal key={item.title} className="relative mb-10 pl-14 last:mb-0">
              <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/40 bg-[#0a0620] shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <GraduationCap size={17} className="text-violet-300" />
              </div>
              <div
                data-hover
                className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:shadow-[0_12px_44px_rgba(139,92,246,0.18)] md:p-7"
              >
                <span className="font-mono2 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3.5 py-1 text-[11px] font-semibold text-violet-200">
                  <CalendarDays size={12} />
                  {item.period}
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-cyan-300">
                  {item.institution}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
