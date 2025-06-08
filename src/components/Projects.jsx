import React from 'react';
import ProjectCard from './ProjectCard';

const projectsData = [
  {
    title: "Full-Stack CRUD Application",
    description: "Clean, responsive UI with complete CRUD operations. Built with Express.js and React.js, styled with Tailwind CSS.",
    tech: ["Express.js", "React.js", "Tailwind CSS", "MongoDB"],
    liveLink: "https://product-post-allapi.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/product_post-allapi",
  },
  {
    title: "Interactive Animated Website",
    description: "Smooth animations and transitions with custom cursor effects. Built with React.js and GSAP.",
    tech: ["React.js", "GSAP"],
    liveLink: "https://animated-webistes.netlify.app/",
    githubLink: "https://github.com/Taha-Siraj/Sidcup-Animated-websites-",
    // imageSrc: "/path/to/your/animated-website-screenshot.jpg" // Add a screenshot
  }
  // Add more projects here
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">Featured Projects 🚀</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;