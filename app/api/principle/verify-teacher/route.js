// app/api/principle/verify-teacher/route.js
import Teacher from "@/models/teacher";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST(request) {
  try {
    // 1. ensure DB is connected
    await connectDB();

    // 2. read incoming JSON
    const { teacher_id } = await request.json();

    if (!teacher_id) {
      return NextResponse.json(
        { message: "No teacher_id provided", success: false },
        { status: 400 }
      );
    }

    // 3. fetch the teacher document
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found", success: false },
        { status: 404 }
      );
    }

    // 4. flip the `employed` flag and save
    teacher.employed = !teacher.employed;
    await teacher.save();

    // 5. respond with the updated doc (optional)
    return NextResponse.json(
      {
        message: `Teacher is now ${teacher.employed ? "employed" : "unemployed"}`,
        success: true,
        data: teacher,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in verify-teacher:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
