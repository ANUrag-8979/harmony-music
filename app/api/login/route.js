import mongoose from "mongoose";
import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connectDB } from "@/dbConfigure/connectDB";
import { sendEmail } from "@/helper/mailer";
import Teacher from "@/models/teacher";

export async function POST(request){
    await connectDB();
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email:email});
        if(!user) return NextResponse.json({message:`wrong email `,success:false},{status:404});
        if(!user.isVerified){
            await sendEmail({email,emailType:"VERIFY",userId:user._id});
            return NextResponse.json({message:"user not verified and email is sent for verification!!",success:false},{status:400});
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({message:"wrong password"},{status:400})
        }
        // token data
        const teacher = await Teacher.findOne({teacherId : user._id});
        const tokenData = {
            id : user._id,
            roles : teacher?.roles
        }
        // create token
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn : '1d'});
        // responce
        const responce = NextResponse.json({
            message:"Logged in Successfully...",
            success : true,
        },{status:200})
        //cookies
        responce.cookies.set("token",token,{
           httpOnly: false, // if you want to access via js-cookie
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        })
        return responce;
        // return NextResponse.json({message:"ram ram"});
    } catch (error) {
        console.log("inside catch");
       return  NextResponse.json({message:error.message,success:false},{status:500})
    }

}