import React from "react";
import { RiCloseLargeLine } from "react-icons/ri";

const Sidebar = ({ isSidebarActive, setSidebarActive }) => {
   return (
      <div
         className={`fixed top-0 left-0 h-full w-44 lg:w-64 bg-white shadow-lg p-6 z-10 transform transition-transform duration-300 ease-in-out ${
            isSidebarActive ? "translate-x-0" : "-translate-x-44"
         } sm:translate-x-0`}
      >
         <div className="flex sm:hidden justify-end mb-8">
            <button
               className="text-2xl hover:cursor-pointer absolute right-4"
               onClick={() => setSidebarActive(false)}
            >
               <RiCloseLargeLine />
            </button>
         </div>
         <div className="text-center">
            <img
               src="/photo.JPG" // Replace with your profile picture
               alt="Profile"
               className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <h2 className="mt-4 text-xl font-bold ">Layton Yates</h2>
            <p className="text-gray-600">Software Developer</p>
         </div>
         <div className="mt-8">
            <ul className="mt-2 space-y-2">
               <li>
                  <a
                     href="/"
                     className="text-blue-500 hover:underline font-one"
                  >
                     Feed
                  </a>
               </li>
               <li>
                  <a
                     href="/projects"
                     className="text-blue-500 hover:underline font-one"
                  >
                     Projects
                  </a>
               </li>

               <li>
                  <a
                     href="/resume"
                     className="text-blue-500 hover:underline font-one"
                  >
                     Resume
                  </a>
               </li>
               <li>
                  <a
                     href="/contact"
                     className="text-blue-500 hover:underline font-one"
                  >
                     Contact
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Sidebar;
