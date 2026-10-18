import { useRef } from 'react';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-5px)`;
  };
  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(1100px) rotateY(0deg) rotateX(0deg) translateY(0)';
  };

  return (
    <div className="tilt-scene h-full">
      <article
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="tilt-card pixel-panel flex h-full flex-col overflow-hidden"
      >
        <div className="relative h-48 shrink-0 overflow-hidden border-b-4 border-black bg-[#0a0a10] md:h-56">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-pixel absolute left-3 top-3 border-[3px] border-black bg-[#29adff] px-2.5 py-1.5 text-[9px] text-[#06121c]">
            M-{String(index + 1).padStart(2, '0')}
          </span>
          {project.featured && (
            <span className="font-pixel absolute right-3 top-3 border-[3px] border-black bg-[#ffec27] px-2.5 py-1.5 text-[9px] text-[#1c1a06]">
              ★ FEATURED
            </span>
          )}
        </div>

        <div className="tilt-inner flex flex-1 flex-col p-5 md:p-6">
          <h3 className="font-pixel text-[11px] leading-relaxed text-white md:text-xs">
            {project.title.toUpperCase()}
          </h3>
          <p className="mt-3 flex-1 text-xl leading-snug text-[#9a9ab0]">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="pixel-tag px-2 py-0.5 text-lg text-[#c9c9d8]">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn pixel-btn-green font-pixel flex-1 px-4 py-3 text-center text-[10px]"
            >
              ▶ PLAY
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Source code"
              className="pixel-btn pixel-btn-ghost font-pixel px-4 py-3 text-center text-[10px]"
            >
              {'</>'}
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
