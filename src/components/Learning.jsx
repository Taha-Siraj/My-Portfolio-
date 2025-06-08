import React from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";

const Learning = () => {
  return (
    <section id="experience" className="py-16 md:py-24  bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold uppercase text-center text-[#4C82CE]">
          My Journey
        </h1>
        <hr className="border-[#8bbbff] border-t-4 mb-12 w-[100px] mx-auto mt-2" />

        <div className="flex flex-col md:flex-row   justify-between px-10 items-center  gap-y-12 ">
          <div className="flex flex-col gap-y-10">
            <h2 className="flex items-center gap-x-4 text-3xl text-[#4C82CE] font-extrabold">
              <FaUserGraduate /> Education
            </h2>

            <div>
              <h3 className="text-2xl font-semibold">
                Intermediate (Science General)
              </h3>
              <p className="text-xl text-[#4C82CE]">
                Govt. Jinnah College (2023 - 2025)
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold">
                Matriculation (Science)
              </h3>
              <p className="text-xl text-[#4C82CE]">
                Matchless Public Secondary School (2021 - 2023)
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-10 ">
            <h2 className="flex items-center gap-x-4 text-3xl text-[#4C82CE] font-extrabold">
              <BsPersonWorkspace /> Learning & Experience
            </h2>

            <div>
              <h3 className="text-2xl font-semibold">MERN Stack Development</h3>
              <p className="text-xl text-[#4C82CE]">SMIT (2023 - Present)</p>
              
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Digital Marketing & Freelancing</h3>
              <p className="text-xl text-[#4C82CE]">BanoQabil (2023 - 2024)</p>
             
            </div>
          </div>
        </div>
      </div>

      <hr className="border border-gray-600 rounded-sm w-full max-w-[1300px] mx-auto mt-16" />
    </section>
  );
};

export default Learning;
