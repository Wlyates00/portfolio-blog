import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ isSidebarActive, setSidebarActive }) => {
   const toggleSidebar = () => {
      setSidebarActive(true);
   };

   return (
      <div
         className={`w-full h-[60px] fixed flex justify-end items-center ${
            isSidebarActive ? "hidden" : "flex bg-gray-100 "
         } sm:hidden`}
      >
         <div className="w-full h-full flex sm:hidden">
            {/* Hamburger Icon */}
            <button
               onClick={toggleSidebar}
               className="lg:hidden flex items-center justify-center hover:cursor-pointer p-2"
            >
               <RxHamburgerMenu className="ml-2 text-3xl" />
            </button>
            <div className="flex-1/2"></div>
            <div className="flex items-center gap-4 mr-3">
               <img
                  src="/LY.png" // Replace with your profile picture
                  alt="Profile"
                  className="w-12 h-auto rounded-full"
               />
            </div>
         </div>
      </div>
   );
};

export default Navbar;
