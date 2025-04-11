import React, { useState } from "react";
import { FaImage } from "react-icons/fa"; // Add this import for the image icon
import { usePosts } from "../contexts/PostProvider";
import { useAuth } from "../contexts/AuthContext";

const Post = () => {
   const { user, isLoading } = useAuth();
   const { addPost } = usePosts();
   const [postText, setPostText] = useState("");
   const [media, setMedia] = useState(null);

   const handlePost = async () => {
      if (postText.trim() || media) {
         let mediaUrl = null;

         if (media) {
            // Upload media to Firebase and get the download URL
            mediaUrl = await addPost(postText, media); // Pass media to addPost
         } else {
            await addPost(postText); // Just text if no media
         }

         setPostText(""); // Clear input
         setMedia(null); // Clear media
      }
   };

   const handleMediaUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
         setMedia(file);
      }
   };

   return (
      <div
         className={`bg-white p-6 rounded-lg shadow-lg mb-8 w-[100%] max-w-[800px] font-one ${
            user ? "block" : "hidden"
         }`}
      >
         <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
         />
         <div className="flex flex-row items-center mt-2">
            <button
               onClick={handlePost}
               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer transition-transform transform hover:scale-105 z-0"
            >
               Post
            </button>
            <label className="flex items-center gap-2 cursor-pointer ml-2 text-blue-500 hover:text-blue-700">
               <FaImage />
               <span className="font-one">Upload Media</span>
               <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
               />
            </label>
         </div>
         {media && (
            <div className="mt-2">
               <img
                  src={URL.createObjectURL(media)}
                  alt="Preview"
                  className="max-w-[200px] max-h-[200px] h-auto rounded-lg"
               />
            </div>
         )}
      </div>
   );
};

export default Post;
