import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, password }: { username: string; password: string } =
      await request.json();

    await connectMongoDB();
    const user = await User.findOne({ username }).select("_id");
    console.log(user);

    // const hashedPassword = await bcrypt.hash(password, 10);
    if (!user) await User.create({ username, password });

    return NextResponse.json({ message: "login success" }, { status: 201 });
  } catch (error) {
    console.log(`error`, error);
    return NextResponse.json({ message: "login failed" }, { status: 500 });
  }
}
