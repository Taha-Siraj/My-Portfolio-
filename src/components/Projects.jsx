import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import { projects, profile } from '../data/content';
import { Github } from 'lucide-react';

export default function Projects() {
  return (
    <section
      id="projects"
      data-palette="4"
      className="relative z-10 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects"
          desc="Real products, shipped live — each one taught me something new."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.25)]"
          >
            <Github size={18} />
            Explore 74+ repos on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
