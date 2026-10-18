import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { services } from '../data/content';

const COLORS = ['#00e436', '#29adff', '#ffec27', '#ff004d', '#a06ee1', '#ff7f27'];

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="POWER-UPS"
          title="ABILITIES"
          desc="Buffs I can apply to your project."
          color="blue"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="pixel-panel h-full p-6 transition-transform duration-150 hover:-translate-y-1.5">
                <div
                  className="font-pixel inline-block border-[3px] border-black px-3 py-2 text-[10px] text-black"
                  style={{ background: COLORS[i % COLORS.length] }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-pixel mt-5 text-[11px] leading-relaxed text-white md:text-xs">
                  {s.title.toUpperCase()}
                </h3>
                <p className="mt-3 text-xl leading-snug text-[#9a9ab0]">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="pixel-tag px-2 py-0.5 text-lg text-[#c9c9d8]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
