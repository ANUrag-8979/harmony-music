// app/api/courses/filter/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfigure/connectDB";
import Course from "@/models/course";

export async function POST(request) {
  try {
    // 1. Connect to your database
    await connectDB();

    // 2. Parse incoming body
    // const { tag, courseType } = await request.json();

    // 3. Build filter dynamically
    // const filter = {};
    // filter.status = "verified"
    // if (tag && tag !== "All Levels") {
    //   filter.tag = tag;
    // }
    // if (courseType && courseType !== "All Categories") {
    //   filter.courseType = courseType;
    // }

    // 4. Query with your filter
    const courses = await Course.find().lean();

    // 5. Return the results
    return NextResponse.json(
      { success: true, courses },
      { status: 200 }
    );
  } catch (err) {
    console.error("POST /api/courses/filter error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
