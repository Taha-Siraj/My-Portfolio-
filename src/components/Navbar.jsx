import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Home, User, Cpu, Folder, Mail, Briefcase, GraduationCap, Layers } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);

  const navLinks = [
    { href: 'home', label: 'Home', icon: Home },
    { href: 'experience', label: 'Experience', icon: Briefcase },
    { href: 'about', label: 'About', icon: User },
    { href: 'skills', label: 'Skills', icon: Cpu },
    { href: 'services', label: 'Services', icon: Layers },
    { href: 'projects', label: 'Projects', icon: Folder },
    { href: 'education', label: 'Education', icon: GraduationCap },
    { href: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, xPercent: -50, opacity: 0 },
      { y: 0, xPercent: -50, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 z-50 capsule-nav rounded-full px-4 py-2 sm:px-6 sm:py-2.5 flex items-center justify-center gap-x-1 sm:gap-x-2 transition-all duration-300 w-[92%] max-w-max"
    >
      {navLinks.map((link, index) => {
        const IconComponent = link.icon;
        return (
          <ScrollLink
            key={index}
            to={link.href}
            smooth={true}
            duration={500}
            offset={-70}
            spy={true}
            activeClass="text-[#10b981] bg-emerald-500/10 font-bold"
            className="cursor-pointer flex items-center gap-x-2 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-300 hover:text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-300"
          >
            <IconComponent size={14} className="flex-shrink-0" />
            <span className="hidden md:inline">{link.label}</span>
          </ScrollLink>
        );
      })}
    </nav>
  );
};

export default Navbar;
