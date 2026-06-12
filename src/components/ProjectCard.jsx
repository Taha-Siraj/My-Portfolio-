import React, { forwardRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = forwardRef(({ title, description, tech, liveLink, githubLink, imageSrc }, ref) => {
  return (
    <div
      ref={ref}
      className="cyber-card rounded-xl overflow-hidden flex flex-col h-full border border-slate-800 hover:border-[#10b981]/30 shadow-2xl group transition-all duration-300 relative tech-corners"
    >
      {imageSrc && (
        <div className="w-full h-56 overflow-hidden relative border-b border-slate-800">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow z-10 relative">
        <h3 className="text-xl font-orbitron font-bold text-white tracking-wide group-hover:text-[#10b981] transition-colors duration-300 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-400 text-xs sm:text-sm mb-6 flex-grow leading-relaxed font-poppins">
          {description}
        </p>
        
        {tech && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((t, i) => (
              <span 
                key={i} 
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#10b981]/25 bg-emerald-950/20 text-[#10b981] rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-slate-800/80 flex justify-start space-x-6 font-orbitron text-xs tracking-wider uppercase font-semibold">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10b981] hover:text-white transition-colors duration-300 flex items-center gap-1.5"
              aria-label={`Live demo of ${title}`}
            >
              <FaExternalLinkAlt className="text-[10px]" />
              <span>Live Monitor</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#34d399] hover:text-white transition-colors duration-300 flex items-center gap-1.5"
              aria-label={`GitHub repository for ${title}`}
            >
              <FaGithub className="text-[11px]" />
              <span>Source Core</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
