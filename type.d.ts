type Course = {
  date: Date | string;
  startTime: string;
  endTime: string;
  code: string;
  title: string;
  group: string;
  instructor: string;
  building: string;
  venue: string;
  rows: string[];
};

type Header = string;

type Page = {
  id: number;
  courses: Course[];
};

type ExamTimetable = {
  semester: string;
  name: string;
  pages: Page[];
  releaseDate: Date;
};

type CoursesPickerProps = {
  courses: Course[];
  options: Course[];
  setOptions: React.Dispatch<React.SetStateAction<Course[]>>;
};
