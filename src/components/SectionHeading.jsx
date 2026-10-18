import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, desc }) {
  return (
    <Reveal className="mb-14 text-center md:mb-20">
      <div className="font-mono2 mb-3 text-xs uppercase tracking-[0.35em] text-cyan-300">
        {'//'} {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      {desc && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          {desc}
        </p>
      )}
      <div className="mx-auto mt-6 h-[3px] w-28 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_16px_rgba(34,211,238,0.6)]" />
    </Reveal>
  );
}
