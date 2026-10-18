import Reveal from './Reveal';

const COLORS = {
  green: '#00e436',
  blue: '#29adff',
  yellow: '#ffec27',
  red: '#ff004d',
};

export default function SectionHeading({ eyebrow, title, desc, color = 'green' }) {
  const c = COLORS[color] || COLORS.green;
  return (
    <Reveal className="mb-12 text-center md:mb-16">
      <div
        className="font-pixel mb-5 inline-block border-4 border-black px-4 py-2 text-[10px] md:text-xs"
        style={{ background: c, color: '#0a0a10' }}
      >
        {eyebrow}
      </div>
      <h2 className="h-pixel text-2xl text-white md:text-4xl">{title}</h2>
      {desc && (
        <p className="mx-auto mt-5 max-w-2xl text-xl leading-snug text-[#9a9ab0] md:text-2xl">
          {desc}
        </p>
      )}
      <div className="mx-auto mt-6 flex justify-center gap-2">
        {[c, c, c].map((col, i) => (
          <div key={i} className="h-3 w-3 border-2 border-black" style={{ background: col }} />
        ))}
      </div>
    </Reveal>
  );
}
