import { connectDB } from "@/dbConfigure/connectDB";
import User from "@/models/user"; // Adjust based on your folder structure
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";
import { verify } from "crypto";

connectDB();

export async function POST(request){
    try{
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken:token,verify,
            verifyTokenExpiry:{$gt : Date.now()}
        })
        console.log("user",user);
        if(!user){
            return NextResponse.json({error:"Invalide token",success:false},{status:400});
        }
        // if(user.isVerified){
        //     return NextResponse.json({message:"already verified token",success:false},{status:404});
        // }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined
        await user.save();

        return NextResponse.json({message:"Email verified sucessfully",success:true},{status:200})
    }
    catch(error){
        return NextResponse.json({error:error.message},{status:500});
    }
}