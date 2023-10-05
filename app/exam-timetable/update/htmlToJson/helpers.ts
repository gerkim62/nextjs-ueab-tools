import { HEADERS_TR_SELECTOR } from "./selectors";
import { toCamelCase, sanitizeString } from "./utils";
const DDMMYYYY_DATE_SEPARATOR = "-";
const MMDDYYYY_DATE_SEPARATOR = "/";

export function isFooter(course: Course) {
  return (course.date as string).includes(MMDDYYYY_DATE_SEPARATOR);
}

export function getCourseFromTr(tr: HTMLTableRowElement, headers: Header[]) {
  const course: Course = {
    date: "",
    startTime: "",
    endTime: "",
    code: "",
    title: "",
    group: "",
    instructor: "",
    building: "",
    venue: "",
    rows: [],
  };
  const tds = tr.querySelectorAll("td");

  tds.forEach((td: HTMLTableCellElement, i: number) => {
    const header: keyof Course = headers[i] as keyof Course;
    if (header) {
      if (header === "group") {
        course[header] = td.innerText.trim().replace("Group ", "");
      } else if (header === "rows") {
        const rows = td.innerText.trim().split(",").filter(Boolean);
        course[header] = rows.length > 0 ? rows : [];
      } else if (header.startsWith(`ven`)) {
        console.log(header, td.innerText);
        course[`venue`] = sanitizeString(td.innerText);
        console.log(header, td.innerText);
      } else {
        course[header] = sanitizeString(td.innerText) as any;
      }
    }
  });

  return course;
}

export function getHeaders(timetableHTMLDocument: Document) {
  const DATE_INDEX = 0;
  const headers: Header[] = [];
  const headersTr = timetableHTMLDocument.querySelector(HEADERS_TR_SELECTOR);

  const tds = headersTr?.querySelectorAll("td");

  tds?.forEach((td: HTMLTableCellElement, i: number) => {
    const header = toCamelCase(td.innerText.trim());
    if (i === DATE_INDEX) headers.push("date");
    else if (header === "course") headers.push("code");
    else if (header === "option") headers.push("group");
    else if (header === "row") headers.push("rows");
    else if (header === "courseTitle") headers.push("title");
    else headers.push(header);
  });

  return headers;
}

export function isValidCourse(course: Course) {
  return (
    course?.startTime !== "" &&
    course.endTime !== "" &&
    course.code !== "Course"
  );
}

export function parseDate(dateString: string, timetableReleaseYear: string) {
  let day: string | number, month: string | number, year: string | number;

  const currentYear = new Date().getFullYear();
  const currentCentury = Math.floor(currentYear / 100) * 100;

  const isDDMMYYYY = dateString.includes(DDMMYYYY_DATE_SEPARATOR);
  const isMMDDYYYY = dateString.includes(MMDDYYYY_DATE_SEPARATOR);

  if (isDDMMYYYY) {
    //e.g Thu, 13-04-2023
    [day, month, year] = dateString.trim().split(" ")[1].split("-");
  } else if (isMMDDYYYY) {
    //e.g 4/6/23 2:54 PM
    console.log(dateString);
    [month, day, year] = dateString.trim().split(" ")[0].split("/");
  } else {
    console.log("date unparsable", dateString, dateString);
    return null;
  }

  year = Number(year);
  if (year === 0) {
    //Assumption made: exam can only be done during timetable release year
    console.log("Year is 0. let set it to", timetableReleaseYear);
    year = timetableReleaseYear || 0;
  } else if (year < 100) {
    console.log("Year has no century");
    year += currentCentury;
  }

  return new Date(
    year as number,
    (month as unknown as number) - 1,
    day as unknown as number
  ); //months start index 0
}

export function isValidDate(str: string) {
  return str !== "" && !str.includes("Date");
}
