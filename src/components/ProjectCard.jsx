import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ title, description, tech, liveLink, githubLink, imageSrc }) => {
  // GSAP: Add hover animations here
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      {imageSrc && <img src={imageSrc} alt={title} className="w-full h-48 object-cover"/>}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-teal-400 mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm flex-grow">{description}</p>
        {tech && (
          <div className="mb-4">
            <p className="text-xs text-teal-300">Built with: {tech.join(', ')}</p>
          </div>
        )}
        <div className="mt-auto flex justify-start space-x-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center"
              aria-label={`Live demo of ${title}`}
            >
              <FaExternalLinkAlt className="mr-2" /> Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center"
              aria-label={`GitHub repository for ${title}`}
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;