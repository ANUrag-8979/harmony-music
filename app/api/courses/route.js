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
    const rawCourses = await Course.find().lean();
    const courses = rawCourses.map((c) => ({             // rename _id → id
      image:         c.directorUrl,      // rename courseName → title
      category:   c.courseCatigory, // e.g. whatever your DB field is
      duration:      c.classes,             // rename tag → category
      instructor:     c.courseDirector, 
      _id : c._id,
      title : c.courseName,
      description : c.description,
      level  : c.level,
      price : c.price,
      status : c.status,
            // keep any you want
      // …and so on
    }));
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
