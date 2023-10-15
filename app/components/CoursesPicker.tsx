import React, { useRef, useTransition } from "react";
import Select, { createFilter } from "react-windowed-select";

type CoursesPickerProps = {
  coursesToSelect: Course[];
  defaultSelectedCourses?: Course[];
  onCoursesChange?: (newValue: unknown, actionMeta: any) => void;
  readonly ref?: React.Ref<typeof Select>;
};

const CoursesPicker = ({
  ref,
  coursesToSelect,
  defaultSelectedCourses = [],
  onCoursesChange,
}: CoursesPickerProps) => {
  const [isPending, startTransition] = useTransition();
  const selectRef = ref;
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
      isClearable={false}
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
      classNamePrefix="select"
      onChange={onCoursesChange}
    />
  );
};

export default CoursesPicker;
