// app/api/teachers/route.js
import Teacher from "@/models/teacher";
import User from "@/models/user";
import { connectDB } from "@/dbConfigure/connectDB";   // your MongoDB connection util
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    console.log("from get api")
    const teachers = await Teacher.find()
      .populate({
        path: "teacherId",
        select: "userPhoto firstName lastName email",     // pick whatever User fields you need
      })
      .lean();                         // optional: returns plain JS objects

    // 3. return with status 200 and success flag
    console.log(teachers);
    return NextResponse.json(
      {
        data: { teachers },
        message: "Teachers fetched successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to load teachers:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
