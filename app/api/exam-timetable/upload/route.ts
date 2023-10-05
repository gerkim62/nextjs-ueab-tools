import { NextResponse } from "next/server";

//boiler plate post route
export async function POST(request: Request) {
    try {
      const { examTimetable }: { examTimetable:any } =
        await request.json();
  
      
      return NextResponse.json({ message: "timetable update success" }, { status: 201 });
    } catch (error) {
      console.log(`error`, error);
      return NextResponse.json({ message: "failed to update timetable" }, { status: 500 });
    }
  }
  