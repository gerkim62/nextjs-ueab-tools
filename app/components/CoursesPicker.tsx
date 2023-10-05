import React, { useRef, useTransition } from "react";
import Select, { createFilter } from "react-windowed-select";

type CoursesPickerProps = {
  coursesToSelect: Course[];
  defaultSelectedCourses?: Course[];
  onCoursesChange?: (newValue: unknown, actionMeta: any) => void;
};

const CoursesPicker = ({
  coursesToSelect,
  defaultSelectedCourses=[],
  onCoursesChange,
}: CoursesPickerProps) => {
  const [isPending, startTransition] = useTransition();
  const selectRef = useRef(null);
  const isPickerDisabled = false;
  const displayedProperty: "code" | "title" = "code";
  const options = isPending
    ? []
    : coursesToSelect
        .map((course) => ({
          value: course.code,
          label: course[displayedProperty] + ": " + course.title,
        }))
        .sort((a, b) =>
          a.label
            .substring(a.label.indexOf(": ") + 2)
            .toLowerCase()
            .localeCompare(
              b.label.substring(b.label.indexOf(": ") + 2).toLowerCase()
            )
        );
  return (
    <Select
      onFocus={() => startTransition(() => {})}
      onInputChange={() => startTransition(() => {})}
      isLoading={isPending}
      // end of optimization
      filterOption={createFilter({ ignoreAccents: false })}
      // virtualization={true}
      windowThreshold={50}
      ref={selectRef}
      placeholder={`Type to search courses...`}
      noOptionsMessage={() => "Course not found."}
      loadingMessage={() => "Searching..."}
      options={options}
      defaultValue={() =>
        defaultSelectedCourses.map((course) => ({
          value: course.code,
          label: course[displayedProperty] + ": " + course.title,
        }))
      }
      isMulti
      isDisabled={isPickerDisabled}
      autoFocus
      name="courses"
      className=" flex-grow mr-4"
      classNamePrefix="select"
      onChange={onCoursesChange}
    />
  );
};

export default CoursesPicker;
