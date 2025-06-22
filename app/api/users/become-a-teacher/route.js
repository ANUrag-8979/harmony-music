import Teacher from "@/models/teacher";
import { connectDB } from "@/dbConfigure/connectDB";
import { getUserId } from "@/helper/getUserId";
import { NextResponse } from "next/server";
export async function POST(request){
    await connectDB();
    const reqBody = await request.json();
    const {specialty,description} = reqBody;
    const userId = await getUserId(request);
    if(!userId){
        return NextResponse.json({message:"token expired login again!!",success:false},{status:401});
    }
    const teacher = await Teacher.findOne({
        teacherId:userId
    })
    if(teacher){
        return NextResponse.json({message:"you already applied for the job!!",success:false},{status:405});
    }
    // console.log(teacher);
    const newTeacher = await new Teacher({
        teacherId:userId,
        specialty:specialty,
        description:description,
        roles:["teacher"]
    });
    console.log(newTeacher);
    await newTeacher.save();
    return NextResponse.json({message:"application given successfully",success:true},{status:200});
}