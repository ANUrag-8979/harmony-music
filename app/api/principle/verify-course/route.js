import mongoose from "mongoose";
import Course from '@/models/course';
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST(request) {
    try {
        await connectDB();  // Ensure DB is connected

        const reqBody = await request.json();
        const { courseId } = reqBody;
        console.log(courseId);
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return NextResponse.json({ message: "Invalid Course ID", success: false }, { status: 400 });
        }

        const updatedCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            { status: "verified" },
            { new: true }
        );

        if (!updatedCourse) {
            return NextResponse.json({ message: "Course does not exist", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Course verified successfully!!", success: true }, { status: 200 });

    } catch (error) {
        console.error("Error verifying course:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}