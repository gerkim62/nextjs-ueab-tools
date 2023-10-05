import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ text = "Fetching exam Timetable" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-pink-500 text-4xl mb-4">
        <FaSpinner className="animate-spin" />
      </div>
      <div className="text-pink-500 text-lg">{text}</div>
    </div>
  );
};

export default Loading;
