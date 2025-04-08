import React, { useState } from "react";

const Contact = () => {
   const [result, setResult] = useState("");

   const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending...");
      const formData = new FormData(event.target);
      formData.append("access_key", "bc6d77a8-0b58-419e-be94-59d184ddc4a2");

      const response = await fetch("https://api.web3forms.com/submit", {
         method: "POST",
         body: formData,
      });

      const data = await response.json();

      if (data.success) {
         setResult("Form Submitted Successfully!");
         event.target.reset();
      } else {
         console.error("Error:", data);
         setResult(data.message);
      }
   };

   return (
      <div className="w-full flex flex-col items-center mt-6 px-4 mb-12 font-one">
         <h2 className="text-2xl font-bold mb-6">Contact Me</h2>
         <form
            onSubmit={onSubmit}
            className="w-full max-w-[500px] bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4"
         >
            <div className="flex flex-col">
               <label className="text-gray-700 text-sm font-semibold mb-1">
                  Name
               </label>
               <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Your Name"
               />
            </div>

            <div className="flex flex-col">
               <label className="text-gray-700 text-sm font-semibold mb-1">
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  placeholder="your@email.com"
               />
            </div>

            <div className="flex flex-col">
               <label className="text-gray-700 text-sm font-semibold mb-1">
                  Message
               </label>
               <textarea
                  name="message"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none h-32"
                  placeholder="Write your message here..."
               ></textarea>
            </div>

            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
               Send Message
            </button>

            {/* Submission Status Message */}
            {result && (
               <p className="text-center text-gray-600 text-sm mt-2">
                  {result}
               </p>
            )}
         </form>
      </div>
   );
};

export default Contact;
