"use client";
import toast, { Toaster } from "react-hot-toast";

import CoursesPicker from "../components/CoursesPicker";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";

import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
// import { CoursesPicker } from "../components/CoursesPicker";

const ExamTimetable = () => {
  const router = useRouter();
  const [selectedExamCourses, setSelectedExamCourses] = useLocalStorage(
    "selectedExamCourses",
    []
  );
  const [extractingExamTimetable, setExtractingExamTimetable] = useState(false);
  const [selectedExamCourseIds, setSelectedExamCourseIds] = useLocalStorage(
    "selectedExamCourseIds",
    []
  );
  const [allExamCourses, setAllExamCourses] = useState([]);

  //for storing the current course in which uyser is selecting the option for
  const [selectingOptionFor, setSelectingOptionFor] = useLocalStorage(
    "selectingOptionFor",
    ""
  );
  const shakingDurationInMs = 500;

  const noCourseSelected = () =>
    toast.error("Please select at least one course.", {});

  const isShaking = false;
  //use the useFetch hook to fetch the exam timetable
  const {
    data: examTimetable,
    error,
    loading,
  } = useFetch("/api/exam-timetable");

  //useeffect for exam timetable
  useEffect(() => {
    if (examTimetable) {
      console.log(examTimetable, ` from effect`);
      const courses = getCourses((examTimetable as any).timetable);
      setAllExamCourses(courses as any);
    }
  }, [examTimetable]);

  const handCourseChange = (newValue: unknown, actionMeta: any) => {
    console.log(newValue);
    const ids = (newValue as any).map((item: any) => item.value);
    console.log(ids);
    setSelectedExamCourseIds(ids);
  };

  const handleCoursesSubmit = async () => {
    setExtractingExamTimetable(true);
    if (selectedExamCourseIds.length <= 0) {
      setExtractingExamTimetable(false);
      setSelectedExamCourses([]);
      noCourseSelected();
    } else {
      const selectedCoursesOptions = allExamCourses
        .filter((course) => selectedExamCourseIds.includes(course.code))
        .map((course) => {
          return course.options;
        });

      const selected = [];
      for (let i = 0; i < selectedCoursesOptions.length; i++) {
        const options = selectedCoursesOptions[i];
        if (options.length > 1) {
          const selectedOption = await chooseCourseOption(options);
          console.log(selectedOption, `selected option`);
          selected.push(selectedOption);
        } else {
          selected.push(options[0]);
        }
      }

      console.log(selected, `selected courses`);

      setSelectedExamCourses(selected);
      router.push("/exam-timetable/extracted");
      
    }
   
  };

  // Function to display the course selection prompt and return the selected course object
  async function chooseCourseOption(courses) {
    return new Promise((resolve, reject) => {
      const optionLabels = courses.map(
        (course, index) => `Option ${course.group} by ${course.instructor}`
      );
      const title = `${courses[0].title} - ${courses[0].code}`;

      Swal.fire({
        title: `${courses[0].code}`,
        text: `Select your option for ${title}`,
        input: "select",
        inputOptions: Object.assign(
          {},
          ...optionLabels.map((label, index) => ({ [index]: label }))
        ),
        inputPlaceholder: "Click to select",
        inputValidator: (value) => {
          if (value === "") {
            return "You must select an option";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedIndex = parseInt(result.value);
          resolve(courses[selectedIndex]);
        } else {
          Swal.fire("Option selection canceled", "", "info");
          reject("Selection canceled"); // Reject the promise if the selection is canceled
        }
      });
    });
  }

  return (
    <div className="h-full w-full">
      {error && (
        <div className="bg-white text-pink-500 p-4 rounded-lg">
          <div className="text-red-500">
            An Error has occurred. Please reload the page.
          </div>
          <button
            className="bg-white text-pink-500 border border-pink-500 px-3 py-1 rounded-md ml-2"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {loading && <Loading />}
      {allExamCourses.length > 0 && (
        <div className=" flex flex-col flex-wrap items-center gap-1 mt-12 max-w-md mx-auto text-center">
          <h2
            className={`text-xl font-bold mb-0 text-pink-500 ${
              isShaking ? "head-shake" : ""
            }`}
          >
            Extract Exam Timetable
          </h2>{" "}
          <p className="mb-5 mt-1 text-sm text-gray-500">
            Enter all your courses one by one, then click the extract button.
          </p>
          <CoursesPicker
            onCoursesChange={handCourseChange}
            coursesToSelect={allExamCourses}
            defaultSelectedCourses={selectedExamCourses}
          />
          <button
            disabled={extractingExamTimetable}
            onClick={handleCoursesSubmit}
            className={`mt-5 border p-2 rounded-md ${
              extractingExamTimetable ? "bg-gray-400" : "bg-pink-500"
            } text-white shadow-sm flex items-center gap-1`}
          >
            {extractingExamTimetable
              ? "Extracting Exam Timetable..."
              : "Extract Exam Timetable"}
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
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
