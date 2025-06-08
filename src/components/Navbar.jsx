import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'skills', label: 'Skills' },
    { href: 'experience', label: 'Experience' },
    { href: 'projects', label: 'Projects' },
    { href: 'contact', label: 'Contact' },
  ];

  return (
    <nav id='nav' className="h-[75px] sticky top-0 z-50 shadow-lg flex justify-between items-center px-16 bg-[#02082c4d] backdrop-blur-md">
      <div>
        <h1 className='text-4xl font-extrabold'>
          Taha<span className='text-[#67E8F9] text-6xl'>.</span>
        </h1>
      </div>

      <div className='hidden md:flex'>
        {navLinks.map((link, index) => (
          <ScrollLink
            key={index}
            to={link.href}
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer text-[17px] font-semibold hover:text-[#06B6D4] mx-5 text-[#F3F4F6]"
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
