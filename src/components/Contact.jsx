import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#334155]">
      <div className="container mx-auto px-32 text-center">
        <h1 className="text-5xl font-black text-center  text-[#4C83CF]">Contact Me</h1>
        <hr className="border-[#8bbbff] border-t-4 mb-12 w-[120px] mx-auto mt-2" />

        <div className='bg-[#1E293B] flex justify-between  items-start py-10 h-[560px] rounded-xl border border-[#475569] w-full'>
         <div className='flex justify-start items-start flex-col gap-y-6 py-10 px-16 w-full'>
           <div className='flex justify-center items-start flex-col gap-y-6'>
             <h1 className="text-3xl font-black text-center  text-[#4C83CF]">Let's Connect!</h1>
           <p className="text-lg text-gray-400 text-start max-w-sm ">
            Have a project, an idea, or just want to say hi? My inbox is always open. Whether you have a question or just want to connect, I'll get back to you! 🚀
           </p>
          <div className='flex justify-center items-start flex-col gap-y-3'>
             <Link to="mailto:tahasiraj610@gmail.com" className='flex justify-center items-center gap-x-2  text-gray-400 hover:text-cyan-400'>
              <MdEmail className="text-3xl text-cyan-400" />
              tahasiraj610@gmail.com
            </Link>
           <h1 className=' gap-x-2 flex justify-center items-center text-gray-400  hover:text-cyan-400'><IoLocationSharp className='text-cyan-400 text-3xl' /> Karachi, Pakistan</h1>
          </div>
          </div>
          <div className='text-[#9CA3AF] flex justify-center items-center gap-x-2 '>
             <Link to="https://github.com/Taha-Siraj" >
              <FaGithub className="text-4xl hover:text-[#06B6D4] hover:scale-110 " />
            </Link>
            <Link to="https://www.linkedin.com/in/taha-siraj-2331952a8/" className=''>
              <FaLinkedin className="text-4xl hover:text-[#06B6D4] hover:scale-110 " />
            </Link>
            <Link to="mailto:tahasiraj16@gmail.com" >
              <MdEmail className="text-4xl hover:text-[#06B6D4] hover:scale-110 " />
            </Link>
          </div>
         </div>
         <div className='px-16 flex justify-center items-start py-8 flex-col gap-y-5 w-full'>
          <input type="text" placeholder='Your Name' className='py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400' />
          <input type="email" placeholder='Your Email' className='py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400' />
          <input type="text" placeholder='Subject' className='py-4 px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400' />
          <textarea  className='py-4  px-5 w-full bg-[#1E293B] outline-none border-2 rounded-md border-[#475569] focus:border-cyan-400' ></textarea>
          <button className='capitalize hover:bg-transparent bg-cyan-500 rounded-full px-5 py-2.5 border-2 outline-none border-[#06B6D4] font-semibold text-black hover:text-[#06B6D4] '>Send Message </button>
         </div>

        </div>

        {/* <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
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
        Optional: Add a contact form here later */}
      </div>
    </section>
  );
};

export default Contact;