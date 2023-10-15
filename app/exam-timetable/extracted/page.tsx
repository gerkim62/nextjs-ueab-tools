"use client";

import PropertiesCard from "@/app/components/PropertiesCard";
import Timetable from "@/app/components/Timetable";
import { useFullscreen } from "@/app/hooks/useFullscreen";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const ViewExtracted = () => {
  const [selectedExamCourses, setSelectedExamCourses] = useLocalStorage(
    "selectedExamCourses",
    []
  );

  const [showingPropertiesFor, setShowingPropertiesFor] = useState<Course>();

  const { ref, toggle, fullscreen } = useFullscreen();

  function formatSelectedCourses(courses) {
    return courses
      .map((course, i) => {
        return {
          ...course,
          days: [
            {
              name: new Date(course.date).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
              timestamps: { start: course.startTime, end: course.endTime },
            },
          ],
          color: "--color-course-" + (+i + 1), //index start at 0 so add 1
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  console.log({ selectedExamCourses });

  return selectedExamCourses.length > 0 ? (
    <div className="mt-14 lg:mt-0 mx-auto w-[100vw] lg:w-[80vw]">
      <Timetable
        ref={ref}
        setShowingPropertiesFor={setShowingPropertiesFor}
        showingPropertiesFor={selectedExamCourses[0]}
        courses={formatSelectedCourses(selectedExamCourses)}
      />

      {showingPropertiesFor && (
        <div
          onClick={() => setShowingPropertiesFor(undefined)}
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          {/* <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="text-xl font-bold mb-2">
            {showingPropertiesFor.code}
          </p>
          <p className="text-lg mb-4">
            {showingPropertiesFor.instructor}
          </p>
          <p className="text-lg mb-4">
            {showingPropertiesFor.venue}
          </p>
          <p className="text-lg mb-4">
            {showingPropertiesFor.location}
          </p>
          <p className="text-lg mb-4">
            {showingPropertiesFor.building}
          </p>
          <p className="text-lg mb-4">
            {showingPropertiesFor.option}
          </p>
          <button
            onClick={() => setShowingPropertiesFor(undefined)}
            className="border px-5 p-2 rounded-md bg-pink-500 text-white shadow-sm flex items-center gap-1 justify-center"
          >
            Close
          </button>
        </div> */}
          <PropertiesCard
            setShowingPropertiesFor={setShowingPropertiesFor}
            course={showingPropertiesFor}
            onClose={() => setShowingPropertiesFor(undefined)}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="-mt-10 p-6 rounded-lg text-black text-center flex flex-col  justify-center items-center min-h-full">
      <p className="text-xl font-bold mb-2">Select your Courses First</p>
      <p className="text-lg mb-4 max-w-lg">
        You haven't selected any courses yet. To view your exam timetable,
        please click the button below and choose your courses.
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

export default ViewExtracted;
