"use client";

import useLocalStorage from "@/app/hooks/useLocalStorage";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const ViewExtracted = () => {
  const [selectedExamCourses, setSelectedExamCourses] = useLocalStorage(
    "selectedExamCourses",
    []
  );

  return selectedExamCourses.length > 0 ? (
    <Timetable />
  ) : (
    <div className="-mt-10 p-6 rounded-lg text-black text-center flex flex-col  justify-center items-center min-h-full">
      <p className="text-xl font-bold mb-2">Select your Courses First</p>
      <p className="text-lg mb-4 max-w-lg">
      You haven't selected any courses yet. To view your exam timetable, please click the button below and choose your courses.
      </p>
      <Link
        href="/exam-timetable"
        className="border px-5 p-2 rounded-md bg-pink-500 text-white shadow-sm flex items-center gap-1 justify-center"
      >
        Go to Select Courses <FiArrowRight className="ml-2" />
      </Link>
    </div>
  );
};

function Timetable() {
  return <div></div>;
}

export default ViewExtracted;
