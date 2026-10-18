import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import { projects, profile } from '../data/content';

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="MISSION BOARD"
          title="MISSIONS"
          desc="Side quests shipped to production. Each one leveled me up."
          color="red"
        />
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn pixel-btn-blue font-pixel inline-block px-8 py-4 text-[11px]"
          >
            VIEW ALL 74+ REPOS ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
