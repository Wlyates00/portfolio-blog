import React, { useState } from "react";
import axios from "axios";

const CloneAI = () => {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSend = async () => {
      if (input.trim() === "") return;

      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
         const response = await axios.post(
            "https://me-ai-4yp8.onrender.com/ask",
            {
               message: input,
            }
         );

         const botReply = {
            sender: "clone",
            text: response.data.reply || "Sorry, I didn't understand that.",
         };

         setMessages((prev) => [...prev, botReply]);
      } catch (err) {
         setMessages((prev) => [
            ...prev,
            {
               sender: "clone",
               text: "⚠️ Failed to get response from the server.",
            },
         ]);
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full flex flex-col items-center font-one">
         <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-[800px]">
            <div className="flex gap-4 mb-2">
               <img
                  src="/photo.JPG"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
               />
               <div>
                  <p>
                     <b>Layton Yates</b>
                  </p>
                  <p className="text-sm text-gray-600">
                     I'm an AI so I may take some time to spin up ⏰
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto p-2 border border-gray-200 rounded min-h-[150px]">
               <div className="p-3 rounded-lg max-w-[75%] bg-gray-100 self-start">
                  Hello there, I am Layton's AI Clone so feel free to ask me
                  about myself or my work!
               </div>

               {messages.map((msg, index) => (
                  <div
                     key={index}
                     className={`p-3 rounded-lg max-w-[75%] ${
                        msg.sender === "user"
                           ? "bg-blue-100 self-end"
                           : "bg-gray-100 self-start"
                     }`}
                  >
                     {msg.text}
                  </div>
               ))}
               {loading && (
                  <div className="self-start bg-gray-100 p-3 rounded-lg">
                     Typing...
                  </div>
               )}
            </div>

            <div className="flex gap-2 mt-4">
               <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-2 border rounded-md"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
               />
               <button
                  onClick={handleSend}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
               >
                  Send
               </button>
            </div>
         </div>
      </div>
   );
};

export default CloneAI;
