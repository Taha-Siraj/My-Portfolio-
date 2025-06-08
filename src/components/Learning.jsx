import React from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";

const Learning = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold uppercase   text-center  text-[#4C82CE]">My Journey</h1>
        <hr className="border-[#8bbbff] border-t-4 mb-12 w-[100px] mx-auto mt-2" />
        <div className=" flex justify-between gap-y-10 items-center  flex-col md:flex-row  ">
           
          <div className='flex flex-col gap-y-10 justify-center items-start'>
             <h1 className='flex justify-center  items-center gap-x-4 text-3xl text-[#4C82CE] font-extrabold'> <FaUserGraduate/> Education</h1>
            <div>
              <h1 className='text-2xl  font-semibold' >Intermediate (Science General)</h1>
              <p className='text-xl text-[#4C82CE] '>Govt. Jinnah College (2023 - 2025)</p>     
            </div>
            <div>
              <h1 className='text-2xl font-semibold' >Matriculation (Science)</h1>
              <p className='text-xl text-[#4C82CE]' >Mtachless Public Secondary School (2021 - 2023)</p>
            </div>
          </div>

          <div className='flex flex-col justify-center items-start  gap-y-10 '>
            <h1 className=' flex gap-x-4 text-3xl justify-center items-start text-[#4C82CE] font-extrabold'> <BsPersonWorkspace/> Learning & Experience</h1>
              <div>
              <h1 className='text-2xl  font-semibold' >MERN Stack Development</h1>
              <p className='text-xl text-[#4C82CE] '>SMIT  (2023 - Present)</p>        
              <p className='text-xl text-gray-500 text-wrap flex-wrap '>Actively learning and building projects using MongoDB, Express.js, React, and Node.js. Focusing on full-stack applications and modern web practices.</p>        
            </div>
            <div>
              <h1 className='text-2xl font-semibold' >Digital Marketing & Freelanching</h1>
              <p className='text-xl text-[#4C82CE]' >BanoQabil (2023 - 2024)</p>
              <p  className='text-xl text-gray-500 text-wrap flex-wrap '>
                Gained practical experience in digital marketing strategies and freelancing skills, enhancing my ability to promote and manage projects effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <hr className='border border-gray-600 rounded-sm px-10 w-[900px]' />
    </section>
  );
};

export default Learning;