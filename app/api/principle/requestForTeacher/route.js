import { NextResponse } from "next/server"
import User from "@/models/user";
import Teacher from "@/models/teacher";
import { getUserId } from "@/helper/getUserId";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST(request){
    await connectDB();
    try {
        const reqBody = await request.json();
        const {description,specility} = reqBody;
        const userId = await getUserId(request);
        console.log(userId);
        if(!userId){
            return NextResponse.json({message:"token is spoiled",success:false},{status:404});
        }
        const existingTeacher = await Teacher.findOne({teacherId:userId});
        if(existingTeacher)   return NextResponse.json({message:"teacher already exists",success:false},{status:404});
        const newTeacher = new Teacher({
            teacherId:userId,
            description:description,
            specility:specility,
        })
        await newTeacher.save();

        return NextResponse.json({message:"application submitted successfully",success:true},{status:200})

    } catch (error) {
        return NextResponse.json({message:error.message,success:false},{status:500});
    }
}