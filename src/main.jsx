import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { PostProvider } from "./contexts/PostProvider.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
   <AuthProvider>
      <PostProvider>
         <App />
      </PostProvider>
   </AuthProvider>
);
