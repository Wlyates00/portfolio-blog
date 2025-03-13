import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// The AuthProvider component that wraps the app and provides authentication context
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null); // Track the user state
   const [isLoading, setIsLoading] = useState(true); // Loading state

   useEffect(() => {
      const auth = getAuth();

      // Only sign in if user is not already authenticated
      if (
         !user &&
         import.meta.env.VITE_OWNER_EMAIL != null &&
         import.meta.env.VITE_OWNER_PASSWORD != null
      ) {
         signInWithEmailAndPassword(
            auth,
            import.meta.env.VITE_OWNER_EMAIL,
            import.meta.env.VITE_OWNER_PASSWORD
         )
            .then((userCredential) => {
               setUser(userCredential.user); // Set the authenticated user
            })
            .catch((error) => {
               console.error("Error signing in:", error);
            })
            .finally(() => {
               setIsLoading(false); // Mark loading as finished
            });
      } else {
         setIsLoading(false); // If user is already authenticated, stop loading
      }
   }, [user]); // Runs when `user` changes

   return (
      <AuthContext.Provider value={{ user, isLoading }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContext;
