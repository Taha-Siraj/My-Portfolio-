import React from 'react';
import ProjectCard from './ProjectCard';

const projectsData = [
  {
    title: "Full-Stack CRUD Application",
    description:
      "A powerful full-stack CRUD application with seamless user experience and real-time product management. Built with React.js, Express.js, and styled using Tailwind CSS.",
    tech: ["Express.js", "React.js", "Tailwind CSS", "MongoDB"],
    liveLink: "https://product-post-allapi.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/product_post-allapi",
    imageSrc: "./src/assets/crud.png",
  },
  {
    title: "Interactive Animated Website",
    description:
      "Visually engaging website with smooth GSAP animations, interactive elements, and custom cursor effects. Focused on delivering a modern, animated UI experience.",
    tech: ["React.js", "GSAP"],
    liveLink: "https://animated-webistes.netlify.app/",
    githubLink: "https://github.com/Taha-Siraj/Sidcup-Animated-websites-",
    imageSrc: "/src/assets/animated.png",
  },
  {
    title: "Real-Time Weather App",
    description:
      "A modern weather app with live data fetching using Axios and OpenWeather API. Clean UI, responsive layout, and real-time weather updates for any city.",
    tech: ["React.js", "Tailwind CSS", "Axios", "Node.js", "Express.js"],
    liveLink: "https://weather-ui-gudb.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/Sidcup-Animated-websites-",
    imageSrc: "./src/assets/Weatherapp.png",
  },
  {
    title: "Facebook Clone",
    description:
      "A responsive Facebook clone with modern UI elements. Built using React.js and Tailwind CSS, this project includes sign-up, login, and feed-style layout inspired by real Facebook design.",
    tech: ["React.js", "Tailwind CSS"],
    liveLink: "https://facebookclone-bsaf8z6dv-taha-sirajs-projects.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/Facebook-Clone",
    imageSrc: "./src/assets/facebook.png",
  },
];


const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
         <h1 className="text-4xl font-extrabold uppercase text-center text-[#4C82CE]">
         Featured Projects</h1>
        <hr className="border-[#8bbbff] border-t-4 mb-12 w-[100px] mx-auto mt-2" />
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