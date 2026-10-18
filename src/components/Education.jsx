import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { education } from '../data/content';

export default function Education() {
  return (
    <section id="education" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="TRAINING GROUNDS"
          title="TRAINING"
          desc="Where the base stats were built."
          color="yellow"
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[22px] top-0 w-1 bg-black" />
          {education.map((item, i) => (
            <Reveal key={item.title} className="relative mb-8 pl-16 last:mb-0">
              <div
                className="absolute left-[10px] top-2 h-7 w-7 border-[3px] border-black"
                style={{ background: ['#ffec27', '#29adff', '#00e436'][i % 3] }}
              />
              <div className="pixel-panel p-6">
                <span className="font-pixel text-[8px] text-[#9a9ab0]">
                  {item.period.toUpperCase()}
                </span>
                <h3 className="font-pixel mt-3 text-[11px] leading-relaxed text-white md:text-xs">
                  {item.title.toUpperCase()}
                </h3>
                <p className="mt-2 text-xl text-[#29adff]">{item.institution}</p>
                <p className="mt-2 text-xl leading-snug text-[#9a9ab0]">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
