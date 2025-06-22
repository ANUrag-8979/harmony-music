import mongoose from "mongoose";
import Course from '@/models/course';
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST(request){
    connectDB();
    const reqBody = await request.json();
    const {courseId} = reqBody;
    const updatedCourse = await Course.findOneAndUpdate(
    { _id: courseId },   // filter
    { status: "verified" },        // update
    { new: true }                    // return updated doc
    );
    if(!updatedCourse){
        return NextResponse.json({message:"Course does not exists",success:false},{status:404});
    }
    return NextResponse.json({message:"course verified successfully!!",success:true},{status:200});

}