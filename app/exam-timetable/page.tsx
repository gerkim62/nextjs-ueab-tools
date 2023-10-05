"use client";
import CoursesPicker from "../components/CoursesPicker";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";

import React from "react";
// import { CoursesPicker } from "../components/CoursesPicker";

const ExamTimetable = () => {
  const isShaking = false;
  //use the useFetch hook to fetch the exam timetable
  const {
    data: examTimetable,
    error,
    loading,
  } = useFetch("/api/exam-timetable");

  return (
    <div className="h-full w-full">
      {error && <div className="text-red-500">{error}</div>}
      {loading && <Loading />}
      {examTimetable && (
        <div className=" flex flex-col flex-wrap items-center gap-1 mt-12 mx-5">
          
         
          <h2
            className={`text-xl font-bold mb-2 ${
              isShaking ? "head-shake" : ""
            }`}
          >
            Select Your Courses
          </h2>{" "}
          <p className="mb-5 mt-3">
            Enter all your courses one by one, then click the button below.
          </p>
          <CoursesPicker
            coursesToSelect={getCourses((examTimetable as any).timetable)}
          />
        </div>
      )}
    </div>
  );
};
function getCourses(timetable: ExamTimetable) {
  const courses: Course[] = [];
  console.log(timetable);
  timetable.pages.forEach((page) => {
    // courses.push(...page.courses);
    page.courses.forEach((course) => {
      course.page = page.id;
      courses.push(course);
    });
  });

  const coursecodes = Array.from(new Set(courses.map((course) => course.code)));
  // console.log(coursecodes);

  return coursecodes.map((code) => {
    const filtered = courses.filter((course) => course.code === code);
    // console.log(filtered);
    let course = {
      options: [],
      ...filtered[0],
    };
    filtered.forEach((item) => {
      //todo: remove unnecessary keys
      course.options.push(item);
    });
    return course;
  });
}

export default ExamTimetable;
