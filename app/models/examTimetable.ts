import { Schema, model, models } from "mongoose";

// Define the Course subdocument schema
const courseSchema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  code: { type: String, required: true },
  title: { type: String, required: true },
  group: { type: String, required: true },
  instructor: { type: String, required: true },
  building: { type: String, required: true },
  venue: { type: String, required: true },
  rows: [{ type: String }],
});

// Define the Page subdocument schema
const pageSchema = new Schema({
  id: { type: Number, required: true },
  courses: [courseSchema], // Embed the Course schema as an array
});

// Define the Timetable schema
const timetableSchema = new Schema({
  releaseDate: { type: Date, required: true },
  semester: { type: String, required: true },
  name: { type: String, required: true },
  pages: [pageSchema], // Embed the Page schema as an array
});

const ExamTimetable =
  models.ExamTimetable || model("ExamTimetable", timetableSchema);

export default ExamTimetable;
