import connectMongoDB from "@/app/libs/mongodb";
import ExamTimetable from "@/app/models/examTimetable";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Getting timetables...");
  try {
    await connectMongoDB();

    const timetable = (
      await ExamTimetable.find({}).sort({ releaseDate: -1 })
    )[0];
    console.log("Timetables retrieved successfully.");
    return NextResponse.json({ timetable }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to get timetable." },
      { status: 500 }
    );
  }
}
