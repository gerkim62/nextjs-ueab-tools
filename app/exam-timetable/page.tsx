"use client";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";

import React from "react";
// import { CoursesPicker } from "../components/CoursesPicker";

const ExamTimetable = () => {
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
      {examTimetable && <div className="text-gray-500">Exam Timetable</div>}
    </div>
  );
};

export default ExamTimetable;
