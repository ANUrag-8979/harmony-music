import Teacher from "@/models/teacher";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfigure/connectDB";
import {getUserId} from '@/helper/getUserId'
export async function POST(request){
    connectDB();
    const {teacherId} = request.json();
    if(!teacherId){
        return NextResponse.json({message:"user  not found!!!",success:false},{status:404});
    }
    console.log(teacherId);
    const updatedTeacher = await Teacher.findOneAndUpdate(
    { _id: teacherId },   // filter
    { employed: true },        // update
    { new: true }                    // return updated doc
    );
    if(!updatedTeacher){
        return NextResponse.json({message:"teacher does not exists",success:false},{status:404});
    }
    return NextResponse.json({message:"teacher employed successfully!!",success:true},{status:200});

}