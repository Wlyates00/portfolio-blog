import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PostList from "./components/PostList";
import Post from "./components/Post";
import { PostProvider } from "./contexts/PostProvider";
import Resume from "./components/Resume";
import Projects from "./Projects";
import Contact from "./Contact";

function App() {
   const [activeSidebar, setActiveSidebar] = useState(false);
   return (
      <div className="flex flex-col min-h-screen w-full bg-gray-100 overflow-hidden sm:pr-44 lg:pr-64">
         <div
            className={`w-full sm:ml-44 lg:ml-64 ${
               activeSidebar ? "pt-0" : "pt-12"
            } sm:pt-0`}
         >
            <img
               src="/linkedinBanner.jpg"
               alt="Banner"
               className="w-full h-[200px] sm:h-[200px] md:h-[300px] xl:h-[20%] object-cover"
            />
         </div>
         <Router>
            <Navbar
               isSidebarActive={activeSidebar}
               setSidebarActive={setActiveSidebar}
            />
            <Sidebar
               isSidebarActive={activeSidebar}
               setSidebarActive={setActiveSidebar}
            />

            <Routes>
               <Route
                  path="/"
                  element={
                     <div className="flex flex-col items-center sm:ml-44 lg:ml-64 p-8 mx-auto w-full">
                        <PostProvider>
                           <Post />

                           <PostList />
                        </PostProvider>
                     </div>
                  }
               />

               <Route
                  path="/projects"
                  element={
                     <div className="sm:ml-44 lg:ml-64 w-full flex flex-col items-center">
                        <Projects />
                     </div>
                  }
               />

               <Route
                  path="/contact"
                  element={
                     <div className="sm:ml-44 lg:ml-64 w-full flex flex-col items-center">
                        <Contact />
                     </div>
                  }
               />

               <Route
                  path="/resume"
                  element={
                     <div className="flex flex-col items-center sm:ml-44 lg:ml-64 p-8 mx-auto w-full">
                        <Resume />
                     </div>
                  }
               />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
