import React, { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "WAKISSHA School Management System",
    description:
      "Full-stack school management platform for 500+ students with examination management, fee invoicing, payment tracking, reporting, and role-based access control.",
    tech: ["React.js", "TypeScript", "Node.js", "MongoDB", "JWT"],
    liveLink: "https://product-post-allapi.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj",
    imageSrc: "wakissha.png",
  },
  {
    title: "Product Manager App",
    description:
      "A complete inventory management system featuring full CRUD operations, PostgreSQL integration, and responsive layout styling to optimize operational workflows.",
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    liveLink: "https://product-post-allapi.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/product_post-allapi",
    imageSrc: "crud.png",
  },
  {
    title: "TVS Emerald Auralis Landing Page",
    description:
      "High-converting real estate landing page integrated with WhatsApp, Email, and Google Sheets for real-time lead capture, automated reporting, and quick tracking.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    liveLink: "https://tvs-emerald-auralis-alpha.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/TVS-EMERALD-AURALIS-",
    imageSrc: "tvs-emerald.png",
  },
  {
    title: "OpenCodeShare",
    description:
      "Instant code and file sharing platform featuring zero signup, 50MB direct client-to-Supabase uploads bypassing Vercel API limits, and auto self-destructing shares.",
    tech: ["React.js", "Tailwind CSS", "Supabase"],
    liveLink: "https://opencodeshare.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/OpenCodeShare",
    imageSrc: "opencodeshare.png",
  },
  {
    title: "Facebook Clone",
    description:
      "Pixel-perfect, fully responsive social media interface copy built using React.js and Tailwind CSS, featuring active feed timelines, profile widgets, and GSAP-powered elements.",
    tech: ["React.js", "Tailwind CSS", "GSAP"],
    liveLink: "https://facebook-clone-git-main-taha-sirajs-projects.vercel.app/",
    githubLink: "https://github.com/Taha-Siraj/Facebook-Clone",
    imageSrc: "facebook.png",
  },
  {
    title: "Creative Animation Website",
    description:
      "Interactive, animation-focused digital portal with advanced GSAP scroll-triggered effects, custom cursor trails, and responsive design systems across multiple viewports.",
    tech: ["React.js", "GSAP"],
    liveLink: "https://animated-webistes.netlify.app/",
    githubLink: "https://github.com/Taha-Siraj/Sidcup-Animated-websites-",
    imageSrc: "animated.png",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 bg-[#060b13] overflow-hidden border-t border-[#10b981]/10"
    >
      <div className="absolute inset-0 cyber-grid-static opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl z-10 relative mb-12">
        {/* Header */}
        <div className="text-center">
          <div className="text-xs font-mono tracking-[0.3em] text-[#10b981] uppercase mb-2">
            [ Code Repositories ]
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest text-glow-emerald uppercase">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#10b981] to-[#047857] mx-auto mt-4 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>
      </div>

      {/* Full-width Carousel Container */}
      <div
        ref={carouselRef}
        className="w-full relative overflow-hidden py-8 z-10 select-none"
      >
        {/* Edge gradient overlays for smooth fade-out */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-48 bg-gradient-to-r from-[#060b13] via-[#060b13]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-48 bg-gradient-to-l from-[#060b13] via-[#060b13]/80 to-transparent z-20 pointer-events-none"></div>

        {/* Scroll Track */}
        <div className="flex gap-8 w-max animate-scroll-x-reverse py-2 px-12">
          {/* Double the list to loop seamlessly */}
          {[...projectsData, ...projectsData].map((project, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[380px] md:w-[420px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] h-full"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
