import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef([]); // Array of all nav links

  const navLinks = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'skills', label: 'Skills' },
    { href: 'experience', label: 'Experience' },
    { href: 'projects', label: 'Projects' },
    { href: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Timeline start
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: navRef.current,
        start: 'top top',
        
        toggleActions: 'play none none none',
      },
    });

    // Navbar slide from top
    tl.from(navRef.current, {
      y: -100,
      duration: 0.8,
      opacity: 0,
      stagger: 0.5,
      ease: 'power3.out',
    });

    // Staggered nav links animation
    tl.from(
      linksRef.current,
      {
        opacity: 0,
        y: -20,
        stagger: 0.5, // <- Yeh hai hero: delay between each nav link
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4' // overlap a little with previous animation
    );
  }, []);

  return (
    <nav
      id="nav"
      ref={navRef}
      className="h-[75px] sticky top-0 z-50 shadow-lg flex justify-between items-center px-16 bg-[#02082c4d] backdrop-blur-md"
    >
      <div>
        <h1 className="text-4xl font-extrabold text-white">
          Taha<span className="text-[#67E8F9] text-6xl">.</span>
        </h1>
      </div>

      <div className="hidden md:flex">
        {navLinks.map((link, index) => (
          <ScrollLink
            key={index}
            to={link.href}
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer text-[17px] font-semibold hover:text-[#06B6D4] mx-5 text-[#F3F4F6]"
            ref={(el) => (linksRef.current[index] = el)} // Set ref for each nav link
          >
            {link.label}
          </ScrollLink>
        ))}
      </div>

      <div>
        <button
          className="md:hidden text-3xl text-[#F3F4F6] hover:text-[#06B6D4]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1F2937] text-white md:hidden z-50">
          <div className="flex flex-col items-center py-4">
            {navLinks.map((link, index) => (
              <ScrollLink
                key={index}
                to={link.href}
                smooth={true}
                duration={200}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold hover:text-[#06B6D4] my-2 cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
