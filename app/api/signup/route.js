import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from "@/models/user";
import { sendEmail } from "@/helper/mailer";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST (request){
    //parse
    connectDB();
    const reqBody = await request.json();
    const {firstName,lastName,username,email,password} = reqBody;
    console.log(reqBody);
    const user = await User.findOne({email});
    if(user){
        return NextResponse.json({message:"user already exists",success:false},{status:400})
    }
    //create
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt)
    const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password:hashedPassword
    })
    //save
    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
    return NextResponse.json({message:"user registerd successfully",success:true})
}