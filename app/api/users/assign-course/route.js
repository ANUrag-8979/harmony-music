import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import Student from "@/models/student";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST(request) {
  console.log("from-assign-courses");
  await connectDB();
  try {
    // parse the incoming course payload
    const { courseName } = await request.json(); // i have removed id ie : {courseName,id} -> {courseName}

    // get & verify the JWT
    const token = request.cookies.get("token")?.value || "";
    console.log(token);
    if (!token) {
      console.log("jfjhhkkgj.");
      return NextResponse.json(
        { error: "Missing auth token", success: false },
        { status: 401 }
      );
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token", success: false ,goToLogin:true},
        { status: 401 }
      );
    }

    // look for an existing Student doc by the studentId field
    let student = await Student.findOne({ studentId: payload.id });

    if (!student) {
      // if none exists, bootstrap a new Student record
      const user = await User.findById(payload.id);
      if (!user) {
        return NextResponse.json(
          { error: "User not found", success: false },
          { status: 404 }
        );
      }

      student = new Student({
        studentId: user._id,
        courses: [courseName],
      });
      await student.save();

      return NextResponse.json(
        { message: "Course added successfully", success: true, enrolled: false },
        { status: 200 }
      );
    }

    // otherwise check for duplicates and push the new course
    for (let i = 0; i < student.courses.length; i++) {
      if (student.courses[i] === courseName) {
        return NextResponse.json(
          { message: "Course already added", success: true, enrolled: true },
          { status: 200 }
        );
      }
    }

    student.courses.push(courseName);
    await student.save();

    return NextResponse.json(
      { message: "Course added successfully", success: true},
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in POST /api/your-route:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
