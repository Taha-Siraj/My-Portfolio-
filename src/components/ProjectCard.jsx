import React, { forwardRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = forwardRef(({ title, description, tech, liveLink, githubLink, imageSrc }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-teal-500/20 flex flex-col h-full"
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-56 object-cover object-center rounded-t-xl"
          loading="lazy"
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-teal-400 mb-3">{title}</h3>
        <p className="text-gray-300 mb-5 text-sm flex-grow leading-relaxed">{description}</p>
        {tech && (
          <div className="mb-4">
            <p className="text-xs text-teal-300">
              Built with: <span className="font-mono text-gray-400">{tech.join(', ')}</span>
            </p>
          </div>
        )}
        <div className="mt-auto flex justify-start space-x-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2"
              aria-label={`Live demo of ${title}`}
            >
              <FaExternalLinkAlt className="mr-1" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2"
              aria-label={`GitHub repository for ${title}`}
            >
              <FaGithub className="mr-1" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
