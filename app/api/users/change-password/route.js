import { connectDB } from "@/dbConfigure/connectDB";
import { getUserId } from "@/helper/getUserId";
import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(request){
    await connectDB();
    const userId = await getUserId(request);
    if(!userId){
        return NextResponse.json({message:"uer not found",success:false},{status:403});
    }
    const res = await request.json();
    const {password,new_password} = res;
    // debuging..
    console.log(password,new_password);
    const user = await User.findById(userId);
    if(!user){
        return NextResponse.json({message:"we are not getting user ",success:false},{status:403});
    }
    const validPassword = await bcryptjs.compare(password,user.password);
    if(!validPassword){
        return NextResponse.json({message:"wrong old password",success:false},{status:400})
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(new_password, salt);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({message:"password updated",success:true},{status:200});
}