import {
  CURRENT_PAGE_NUMBER_SELECTOR,
  SEMESTER_SELECTOR,
  TABLES_SELECTOR,
  TIMETABLE_NAME_SELECTOR,
  RELEASE_DATE_SELECTOR,
} from "./selectors";

import {
  parseDate,
  getCourseFromTr,
  getHeaders,
  isFooter,
  isValidCourse,
  isValidDate,
} from "./helpers";

// const timetable = getTimetableFromUploadedHtml(uploadedHTMLDocument);

// console.log(JSON.stringify(timetable));

function getTimetableFromUploadedHtml(uploadedHTMLDocument: Document) {
  const timetableHTMLDocument = uploadedHTMLDocument;

  const semester =
    timetableHTMLDocument.querySelector(SEMESTER_SELECTOR)?.innerHTML;

  const timetableNameElement = timetableHTMLDocument.querySelector(
    TIMETABLE_NAME_SELECTOR
  );

  let timetableName = timetableNameElement?.textContent;
  timetableName = timetableName?.trim();

  const dateStringElement = timetableHTMLDocument.querySelector(
    RELEASE_DATE_SELECTOR
  );
  const dateString = dateStringElement?.textContent;

  const timetableReleaseDate = parseDate((dateString as string).trim(), "0");

  console.log(timetableReleaseDate);

  const tables: HTMLTableElement[] = timetableHTMLDocument.querySelectorAll(
    TABLES_SELECTOR
  ) as any;
  const headers: Header[] = getHeaders(timetableHTMLDocument);

  const timetablePages: Page[] = [];
  tables.forEach((table) => {
    const page: Page = { id: NaN, courses: [] };

    //convert it from the format "Page n of" to "n"
    const pageIdEl = table.querySelector(CURRENT_PAGE_NUMBER_SELECTOR);
    const pageIdStr = pageIdEl?.innerHTML
      .replace("Page", "")
      .replace("of", "")
      .trim();
    const pageId = parseInt(pageIdStr as string);

    page.id = pageId;
    page.courses = [];

    const trs = table.querySelectorAll("tr");

    let lastValidDate = "";

    for (let i = 0; i < trs.length; i++) {
      const course = getCourseFromTr(trs[i], headers);

      if (isValidDate(course.date as string) && !isFooter(course)) {
        //update valid date
        lastValidDate = parseDate(
          course.date as string,
          timetableReleaseDate?.getFullYear() as any
        ) as any;
      }
      course.date = lastValidDate;

      if (isValidCourse(course)) page.courses.push(course);
    }

    timetablePages.push(page);
  });

  return {
    semester: semester,
    name: timetableName,
    releaseDate: timetableReleaseDate,
    pages: timetablePages,
  };
}

export default getTimetableFromUploadedHtml;
