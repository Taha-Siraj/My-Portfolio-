import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link as ScrollLink } from 'react-scroll';
import { Typewriter } from 'react-simple-typewriter'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const iconsRef = useRef(null);

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/TahaSiraj-cv.pdf';
    link.download = 'TahaSiraj-cv.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 },
        '-=0.3'
      );

    gsap.fromTo(
      iconsRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: iconsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="bg-[#0F172A] text-white py-20 md:py-32 min-h-screen flex items-center overflow-x-hidden"
    >
      <div className="container px-6 mx-auto flex flex-col justify-center items-center text-center gap-y-6 max-w-5xl">
       <div className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#8D46AE] via-[#8D46AE] to-[#4A84D0] bg-clip-text text-transparent">
        <Typewriter
          words={["Hi, I'm Taha Siraj"]}
          loop={true}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
        <div className="text-xl sm:text-2xl md:text-4xl font-poppins max-w-3xl bg-gradient-to-r from-[#8D46AE] font-semibold via-[#3B82F6] to-[#4A84D0] bg-clip-text text-transparent">
          <Typewriter
            words={[ 
              "MERN Stack Developer",
              "Frontend with React & Next js",
              "Backend with Node & ExpressJs",
              "I Turn Ideas Into Web Apps"]}
            loop={true}
            cursor
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-poppins px-4"
        >
          Building modern, responsive, and full-stack web applications. Passionate
          about learning and implementing new technologies to create amazing digital
          experiences.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-6">
          <ScrollLink
            to="projects"
            smooth={true}
            duration={500}
            offset={-70}
            ref={buttonRef}
            className="cursor-pointer bg-[#06B6D4] text-gray-700 font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center gap-3 hover:bg-transparent hover:border-2 hover:text-[#dadada] border-cyan-400 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            View My Work
          </ScrollLink>

          <button
            type="button"
            onClick={handleDownload}
            className="bg-[#06B6D4] text-gray-700 font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center gap-3 hover:bg-transparent hover:border-2 hover:text-[#dadada] border-cyan-400 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Download Resume <FaDownload className="text-xl" />
          </button>
        </div>

        <div
          id="icons"
          ref={iconsRef}
          className="mt-12 flex flex-row  justify-center items-center gap-8 rounded-3xl p-4 border border-[#1a2f5d] bg-white/10 backdrop-blur-md shadow-lg max-w-xs w-full"
        >
          <a
            href="https://github.com/Taha-Siraj"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-4xl md:text-5xl text-white hover:text-gray-300 transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/taha-siraj-2331952a8/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-4xl md:text-5xl text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:tahasiraj16@gmail.com"
            aria-label="Email"
            className="text-4xl md:text-5xl text-[#06B6D4] hover:text-cyan-300 transition-colors duration-300"
          >
            <MdEmail />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
