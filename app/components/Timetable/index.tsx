import useLocalStorage from "@/app/hooks/useLocalStorage";
import { getCurrentCourses, getTimestamps, getDays, convertTo12HourFormat } from "./helpers";
import "./Timetable.css";
import { forwardRef, useState } from "react";
import { useFullscreen } from "@/app/hooks/useFullscreen";
import Link from "next/link";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaExpand,
} from "react-icons/fa";
import WindowedSelect from "react-windowed-select";

type Props = {
  courses: Course[];
  title?: string;
  emptyCellLabel?: string;
  showingPropertiesFor?: Course;
  setShowingPropertiesFor: (course: Course) => void;
  ref?: React.Ref<HTMLDivElement>;
  updateUrl?:string;
  updateUrlLabel?:string;
};

const Timetable = forwardRef(
  ({
    courses,
    // title,
    emptyCellLabel,
    showingPropertiesFor,
    setShowingPropertiesFor,
    updateUrl = "/exam-timetable",
    updateUrlLabel = "Update Timetable",
  }: Props) => {
    const { ref, toggle, fullscreen } = useFullscreen();

    const [title, setTitle] = useLocalStorage(`title`, "");
    const [prefferedCoursesIdentifier, setPrefferedCoursesIdentifier] =
      useLocalStorage(`prefferedCoursesIdentifier`, "code");

    //identifier: "title", "code", "instructor", "venue", "location", "building", "option"

    const leftHeaders = getDays(courses);
    const topHeaders = getTimestamps(courses);
    // console.log({topHeaders});
    // const formatedTimestamps = formatTimestamps(timestamps);
    const copyrightNotice = `Designed by Gerison \u00A9 ${new Date().getFullYear()}`;

    const DEFAULT_EMPTY_CELL_LABEL = "No class";

    const uppercaseFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <>
        <div
          ref={ref}
          // fix this issue with overflow
          className={
            "w-[100%] overflow-auto p-4 bg-[#001d54] mx-auto  justify-center items-center" +
            (fullscreen ? " flex" : "")
          } //TODO: fix this issue with overflow
        >
          <table className="mx-auto">
            {/* add the title or caption eg Gerison's timetable */}
            <caption
              onDoubleClick={() => setTitle(prompt("Enter new title")?.trim() || title)}
            >
              {title || `Double click here to edit title`}
            </caption>
            <thead>
              {/* first row before we add days */}
              <tr key="timestamps" className="timestamps">
                <th
                  className="intersection flex flex-col justify-between uppercase"
                  key="intersection"
                >
                  <p className="self-end flex items-center justify-between">
                    Time <FaArrowRight />
                  </p>
                  <p className="self-start flex items-center justify-between">
                    Day <FaArrowDown />
                  </p>
                </th>

                {/* top header row of timestamps */}
                {topHeaders.map((timestamp) => (
                  <th key={`${timestamp.start}-${timestamp.end}`}>
                    <p key={timestamp.start}>{ convertTo12HourFormat(timestamp.start)}</p>
                    <p key={timestamp.end}>{ convertTo12HourFormat(timestamp.end)}</p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody key={"tbody"}>
              {/* days rows */}
              {leftHeaders.map((day) => {
                return (
                  <tr key={day}>
                    {/* the first th is the day name eg Mon */}
                    <th key={day} className="day font-mono">
                      {day}
                    </th>

                    {/* the rest tds are equal to number of timestamps, will hold the courses */}
                    {topHeaders.map((timestamp, i, timestamps) => {
                      // console.log(timestamp);
                      // get the courses that apply to the current day and timestamp
                      const currentCourses = getCurrentCourses({
                        dayName: day,
                        timestamp,
                        courses,
                      });
                      console.log({ currentCourses });

                      return (
                        <td
                          onClick={({ target }) => {
                            // todo: fix this problem
                            // target.classList.add("active")
                            setShowingPropertiesFor(currentCourses[0]);
                          }}
                          style={{
                            backgroundColor: `var(${currentCourses[0]?.color})`,
                          }}
                          data-color={currentCourses[0]?.color}
                          key={`${timestamp.start}-${timestamp.end} on ${day.name}`}
                          className={`${
                            currentCourses.length === 0
                              ? "unscheduled"
                              : "scheduled"
                          }`}
                        >
                          {
                            //TODO: handle multiple courses in a single cell: a clash
                            currentCourses.length === 0
                              ? emptyCellLabel ?? DEFAULT_EMPTY_CELL_LABEL
                              : currentCourses[0][prefferedCoursesIdentifier]
                          }
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                {/* this is a hack to make the td span full width of the entire table */}
                <td colSpan={topHeaders.length + 1}>
                  <p>{copyrightNotice}</p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex items-center space-x-2 justify-evenly mt-2">
          <Link
            href={updateUrl}
            className="flex items-center space-x-2 border-pink-500 text-pink-500 hover:border-b px-4 transition duration-300 ease-in-out  focus:outline-none"
          >
            <FaEdit />
            <span>{updateUrlLabel}</span>
          </Link>
          <button
            onClick={toggle}
            className="bg-pink-500 hover:bg-pink-700 text-white hover:text-white py-2 px-4 rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-pink-500 focus:outline-none flex items-center space-x-2"
          >
            <FaExpand />
            <span>Fullscreen</span>
          </button>
        </div>
        <div className="flex justify-center">
          <small className="mt-3 text-center mx-auto font-bold font-mono">
            Choose what appears in your timetable
          </small>
        </div>

        <WindowedSelect
          defaultValue={{
            value: prefferedCoursesIdentifier,
            label: `Course ` + uppercaseFirstLetter(prefferedCoursesIdentifier),
          }}
          options={[
            { value: "title", label: "Course Title" },
            { value: "code", label: "Course Code" },
          ]}
          theme={(theme) => {
            // console.log("theme", theme);

            return {
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary: "#FF69B4", // Pink primary color
                primary75: "#FF85A1", // Lighter pink
                primary50: "#FFA6C9", // Even lighter pink
                primary25: "#FFD9EE", // Very light pink
                danger: "#DE350B", // Red for danger
                dangerLight: "#FFBDAD", // Lighter red
                neutral0: "#FFFFFF", // White background
                neutral5: "#F5F5F5", // Slightly off-white
                neutral10: "#E6E6E6", // Even lighter off-white
                neutral20: "#CCCCCC", // Light gray
                neutral30: "#B3B3B3", // Slightly darker gray
                neutral40: "#999999", // Gray
                neutral50: "#7F7F7F", // Darker gray
                neutral60: "#666666", // Even darker gray
                neutral70: "#4C4C4C", // Very dark gray
                neutral80: "#333333", // Almost black
                neutral90: "#1A1A1A", // Deep black
              },
            };
          }}
          onChange={(option) => {
            console.log(option);
            setPrefferedCoursesIdentifier(option.value);
          }}
          className="max-w-md mx-auto"
        />
      </>
    );
  }
);

export default Timetable;
