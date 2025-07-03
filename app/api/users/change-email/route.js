import { connectDB } from "@/dbConfigure/connectDB";
import { getUserId } from "@/helper/getUserId";
import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(request){
    const userId = await getUserId(request);
    if(!userId){
        return NextResponse.json({message:"uer not found",success:false},{status:403});
    }
    const res = await request.json();
    const {password,new_email} = res;
    const user = await User.findById(userId);
    if(!user){
        return NextResponse.json({message:"we are not getting user ",success:false},{status:403});
    }
    const validPassword = await bcryptjs.compare(password,user.password);
    if(!validPassword){
        return NextResponse.json({error:"wrong password"},{status:400})
    }
    user.email = new_email;
    await user.save();
    return NextResponse.json({message:"email updated",success:true},{status:200});
}