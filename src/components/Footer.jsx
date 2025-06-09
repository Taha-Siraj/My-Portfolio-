import React from 'react';
import {Link}  from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0F172A] text-center py-8 border-t border-gray-700">
      <p className='text-[#6B7280] flex justify-center items-center gap-x-2'>© 2025 Taha Siraj. All Rights Reserved. Built with <FaHeart className='text-red-600'/>  using Tailwind & GSAP.</p>
    </footer>
  );
};

export default Footer;