import React from 'react';
import { FaLinkedin, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-teal-400">Get In Touch 📫</h2>
        <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
          I'm always open to new opportunities and collaborations! Let's connect and create something amazing together! 🚀
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
          <a
            href="https://linkedin.com/in/taha-siraj-2331952a8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300 text-lg"
          >
            <FaLinkedin size={28} className="mr-3" /> LinkedIn
          </a>
          <a
            href="https://github.com/Taha-Siraj"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300 text-lg"
          >
            <FaGithub size={28} className="mr-3" /> GitHub
          </a>
          <div className="flex items-center text-gray-300 text-lg">
            <FaMapMarkerAlt size={28} className="mr-3 text-teal-400" /> Karachi, Pakistan
          </div>
        </div>
        {/* Optional: Add a contact form here later */}
      </div>
    </section>
  );
};

export default Contact;