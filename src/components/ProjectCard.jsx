import { useRef } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-6px)`;
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
        data-hover
        className={`tilt-card glass group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.22)] ${
          project.featured ? 'border-fuchsia-400/30' : ''
        }`}
      >
        <div className="relative h-52 shrink-0 overflow-hidden md:h-60">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0620] via-transparent to-transparent" />
          <span className="font-mono2 absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-semibold tracking-widest text-cyan-200 backdrop-blur-md">
            {String(index + 1).padStart(2, '0')}
          </span>
          {project.featured && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-fuchsia-500 px-3 py-1 text-[11px] font-bold text-[#030014]">
              <Star size={12} /> FEATURED
            </span>
          )}
        </div>

        <div className="tilt-inner flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-cyan-200">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-violet-200"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-[13px] font-bold text-[#030014] transition-transform hover:scale-[1.03]"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="glass inline-flex items-center justify-center rounded-full px-4 py-2.5 text-white/80 transition-all hover:border-white/30 hover:text-white"
            >
              <Github size={17} />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
