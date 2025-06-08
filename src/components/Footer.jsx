import React from 'react';
import {Link}  from 'react-router-dom';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-center py-8 border-t border-gray-700">
      <p className="text-gray-400">
        &copy; {currentYear} Taha Siraj. All rights reserved.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Built with React & Tailwind CSS.
      </p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </footer>
  );
};

export default Footer;