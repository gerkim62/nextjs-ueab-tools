"use client";

import React, { useState } from "react";
import { FaUser, FaComment, FaPaperPlane } from "react-icons/fa";

function Suggestion() {
  const [suggestion, setSuggestion] = useState("");

  const handleSuggestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSuggestion(e.target.value);
  };

  const handleSubmit = () => {
    // You can implement your submission logic here, e.g., sending the suggestion to a server
    console.log("Submitted:", suggestion);
    // Clear the input field after submission
    setSuggestion("");
  };

  return (
    <div className="p-6 rounded-lg max-w-md lg:max-w-lg mx-auto min-h-full flex flex-col mt-10 items-center">
      <div className="text-center mb-6 flex flex-col items-center">
        <FaUser className="text-pink-500 text-5xl mb-2 border rounded-full border-pink-100" />
        <h2 className="text-xl font-semibold">Provide Your Suggestion</h2>
        <p className="text-sm  font-mono mt-2 text-gray-500 tracking-wide px-5">
          I am always looking for ways to improve UEAB tools App. If you have
          any suggestions, please let me know.
        </p>
      </div>
      <div className="flex items-center mb-4 w-[80%]">
        <FaComment className="text-pink-500 text-lg mr-2" />
        <textarea
          placeholder="Enter your suggestion ..."
          className="flex-1 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
          value={suggestion}
          onChange={handleSuggestionChange}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center"
        >
          <FaPaperPlane className="mr-2" />
          Submit
        </button>
      </div>
    </div>
  );
}

export default Suggestion;
