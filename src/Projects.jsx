import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
   {
      id: 1,
      title: "Seasonal Merch",
      description:
         "Developed & maintain the ecommerce site using React, Tailwind, Firebase, NodeJS, ExpressJS.",
      image: "/seas.PNG",
      site: "https://seasonalmerch.store",
   },
   {
      id: 2,
      title: "AI Email Scribe",
      description:
         "Created frontend, API, and Google Chrome extension to help write emails qucker and more accurately. (API is not currently active)",
      image: "/aiemail.png",
      github: "https://github.com/Wlyates00/ai-email-scribe-Frontend",
   },
   {
      id: 3,
      title: "Faces+",
      description:
         "Built using Unity Game Engine, this simple yet infuriating game was enjoyed internationally by over 30,000 players! (Game is not currently on iOS App Stores)",
      image: "/faces.PNG",
      github: "https://github.com/Wlyates00/Faces",
   },
   {
      id: 4,
      title: "Style-able Text Editor",
      description:
         "Built using Java & Java Swing for the purpose of taking notes in class. Supports many actions like inserting symbols, saving as many file types, etc.",
      image: "/texteditor.png",
      github:
         "https://github.com/Wlyates00/https://github.com/Wlyates00/stylized-text-editor",
      site: "https://text-editor-site-iota.vercel.app/",
   },
   {
      id: 5,
      title: "Starship Versus",
      description:
         "Built for a client using Unity Game Engine and published to the market.",
      image: "/starship.webp",
      site: "https://apps.apple.com/us/app/starship-versus/id6467820162",
   },
];

const Projects = () => {
   return (
      <div className="w-full flex flex-col items-center mt-8 px-4 font-one">
         <div className="flex flex-col gap-6 w-full max-w-[90%] sm:max-w-[70%] mb-6">
            {projects.map((project) => (
               <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row"
               >
                  {/* Image Section */}
                  <div className="h-full w-full sm:max-w-[200px] flex items-center justify-center">
                     <img
                        src={project.image}
                        alt={project.title}
                        className="w-full sm:w-[100%] min-w-[125px] max-w-[200px] h-52 object-cover rounded-t-lg sm:rounded-none sm:rounded-s-lg"
                     />
                  </div>
                  {/* Text Section */}
                  <div className={`p-6 flex flex-col`}>
                     <h3 className="text-xl font-semibold text-gray-900">
                        {project.title}
                     </h3>
                     <p className="text-gray-600 text-sm mt-2">
                        {project.description}
                     </p>
                     <div className="flex-1"></div>
                     <div className="flex">
                        {project.github && (
                           <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:underline w-fit"
                           >
                              View on GitHub
                              <span className=" ml-2 mr-6">
                                 <FaGithub />
                              </span>
                           </a>
                        )}
                        {project.site && (
                           <a
                              href={project.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:underline w-fit"
                           >
                              View the site
                              <span className=" ml-2">
                                 <FaExternalLinkAlt />
                              </span>
                           </a>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Projects;
