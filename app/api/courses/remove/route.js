import { NextResponse } from 'next/server';
import {connectDB} from '@/dbConfigure/connectDB'; // your custom DB connector
import Course from '@/models/course'; // your Course model

export async function POST(request) {
  try {
    await connectDB(); // ensure MongoDB connection

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json({ success: false, message: "Course ID not provided." }, { status: 400 });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json({ success: false, message: "Course not found." }, { status: 404 });
    }
    const courses = await Course.find();
    return NextResponse.json({ success: true, message: "Course deleted successfully.",courses },{status:200});
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}