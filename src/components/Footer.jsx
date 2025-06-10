import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0F172A] text-center py-8 border-t border-gray-700 px-4 md:px-0">
      <p className="text-[#6B7280] flex flex-col md:flex-row justify-center items-center gap-y-2 md:gap-x-2 text-sm md:text-base max-w-screen-md mx-auto">
        © {currentYear} Taha Siraj. All Rights Reserved. Built with{' '}
        <FaHeart className="text-red-600 mx-1 inline-block hover:animate-pulse" aria-label="heart" />
        using Tailwind & GSAP.
      </p>
    </footer>
  );
};

export default Footer;
