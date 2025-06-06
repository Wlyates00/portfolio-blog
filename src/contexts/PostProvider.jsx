import React, { createContext, useContext, useEffect, useState } from "react";
import {
   collection,
   addDoc,
   query,
   orderBy,
   startAfter,
   limit,
   getDocs
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase"; // Import Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "./AuthContext";

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);
const addMedia = async (media) => {
   const mediaRef = ref(storage, `media/${media.name}`);

   try {
      // Upload the file to Firebase Storage
      await uploadBytes(mediaRef, media);
      // Get the download URL after the file is uploaded
      const url = await getDownloadURL(mediaRef); // Await the promise to get the URL
      return url;
   } catch (error) {
      console.error("Error uploading file:", error);
      return null;
   }
};

export const PostProvider = ({ children }) => {
   const postsCollection = collection(db, "posts");
   const [posts, setPosts] = useState([]);
   const [lastVisiblePost, setLastVisiblePost] = useState(null);
   const [hasMorePosts, setHasMorePosts] = useState(true);
   const page_size = 4;
   const { user, isLoading } = useAuth(); // Track the authenticated user

   const fetchPosts = async () => {
      if (!hasMorePosts) return;

      let q = query(
         postsCollection,
         orderBy("createdAt", "desc"),
         limit(page_size)
      );

      if (lastVisiblePost) {
         q = query(
            postsCollection,
            orderBy("createdAt", "desc"),
            startAfter(lastVisiblePost),
            limit(page_size)
         );
      }

      const snapshot = await getDocs(q);
      const postData = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      setPosts((prevPosts) => [...prevPosts, ...postData]);
      setLastVisiblePost(snapshot.docs[snapshot.docs.length - 1]);
      setHasMorePosts(snapshot.docs.length === page_size);
   };

   // Fetch posts from Firestore
   useEffect(() => {
      fetchPosts();
   }, []);

   // Function to add a post (only your UID can post)
   const addPost = async (content, media = null) => {
      if (user && user.uid === import.meta.env.VITE_OWNER_UID) {
         let mediaURL = null;

         if (media) {
            mediaURL = await addMedia(media);
         }

         await addDoc(postsCollection, {
            content,
            media: mediaURL,
            createdAt: new Date(),
         });
      } else {
         console.error("Unauthorized: Only you can post.");
      }
   };

   return (
      <PostContext.Provider value={{ posts, addPost, fetchPosts, hasMorePosts }}>
         {children}
      </PostContext.Provider>
   );
};
