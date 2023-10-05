import connectMongoDB from "@/app/libs/mongodb";
import ExamTimetable from "@/app/models/examTimetable";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { timetable }: { timetable: Timetable } = await request.json();

    //if release date is greater than today's date, return error
    const today = new Date();
    const releaseDate = new Date(timetable.releaseDate);
    if (releaseDate > today) {
      console.log("Release date is greater than today's date.");
      return NextResponse.json(
        { message: "Release date is greater than today's date." },
        { status: 400 }
      );
    }

    //if no timetable name is provided, return error
    if (!timetable.name) {
      console.log("No timetable name provided.");
      return NextResponse.json(
        { message: "No timetable name provided." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if a timetable with the same semester and name exists
    const existingTimetable = await ExamTimetable.findOne({
      semester: timetable.semester,
      name: timetable.name,
    });

    if (existingTimetable) {
      // If a timetable with the same semester and name exists, check the release date
      const existingReleaseDate = existingTimetable.releaseDate.getTime();
      const newReleaseDate = new Date(timetable.releaseDate).getTime();

      if (existingReleaseDate > newReleaseDate) {
        // Existing release date is greater than or equal to the new release date
        console.log("A later date timetable already exists.");
        return NextResponse.json(
          { message: "A later date timetable already exists." },
          { status: 400 }
        );
      } else if (existingReleaseDate === newReleaseDate) {
        // Existing release date is equal to the new release date
        console.log("Timetable with same date already exists.");
        return NextResponse.json(
          { message: "Timetable with same date already exists." },
          { status: 400 }
        );
      } else {
        // Update the existing timetable with the new data
        existingTimetable.releaseDate = timetable.releaseDate;
        await existingTimetable.save();
        console.log("Timetable updated successfully.");
        return NextResponse.json(
          { message: "Timetable updated successfully." },
          { status: 200 }
        );
      }
    } else {
      // If no existing timetable is found, create a new timetable
      await ExamTimetable.create(timetable);
      console.log("New timetable created successfully.");
      return NextResponse.json(
        { message: "New timetable created successfully." },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to update timetable." },
      { status: 500 }
    );
  }
}
