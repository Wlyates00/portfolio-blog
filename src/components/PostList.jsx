import React, { useState } from "react";
import { usePosts } from "../contexts/PostProvider";

const PostList = () => {
   const { posts } = usePosts(); // Access posts using the custom hook

   // Utility function to wrap URLs in <a> tags and preserve spaces
   const wrapLinksInText = (text) => {
      if (!text) return null;
      const urlRegex = /https?:\/\/[^\s]+/g; // Matches URLs starting with http:// or https://

      // Split the text into an array by spaces
      const words = text.split(" ");

      return words.map((word, index) => {
         // If the word matches the URL pattern, wrap it in <a> tags
         if (urlRegex.test(word)) {
            return (
               <React.Fragment key={index}>
                  <a
                     href={word}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-500"
                  >
                     {word}
                  </a>
                  {" " /* Adding space after link */}
               </React.Fragment>
            );
         }

         // Return the word with space
         return <span key={index}>{word} </span>;
      });
   };

   return (
      <div className="w-full flex flex-col items-center font-one">
         {posts.map((post) => (
            <div
               key={post.id}
               className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[100%] max-w-[800px] mb-2"
            >
               <div className="flex gap-4">
                  <img
                     src="/exampleSoln.PNG"
                     alt="Profile"
                     className="w-10 h-10 rounded-full"
                  />
                  <div>
                     <p>
                        <b>Layton Yates</b>
                     </p>
                     <p className="text-xs text-gray-500">
                        {new Date(
                           post.createdAt.seconds * 1000
                        ).toLocaleString()}
                     </p>
                     <p className="mt-1">{wrapLinksInText(post.content)}</p>
                  </div>
               </div>
               {post.media && (
                  <div className="mt-2">
                     <img
                        src={post.media}
                        alt="Posted media"
                        className="w-auto max-h-[500px] h-auto rounded-lg"
                     />
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default PostList;
