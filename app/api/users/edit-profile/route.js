import { connectDB } from "@/dbConfigure/connectDB";
import User from "@/models/user";
import { getUserId } from "@/helper/getUserId";
import { NextResponse } from "next/server";
export async function POST(request){
    await connectDB();
    const res = await request.json();
    const {formData,userPhoto} = res;
    const {firstName,lastName,city,state} = formData;
    const userId = await getUserId(request);
    // console.log("userId",userId)
    if(!userId){
        return NextResponse.json({message:"uer not found",success:false},{status:403});
    }
    const user = await User.findById(userId);
    user.firstName = firstName;
    user.lastName = lastName;
    user.city = city;
    user.state = state;
    user.userPhoto = userPhoto;
    await user.save();

    return NextResponse.json({message:"profile updated successfully!",success:true},{status:200});
}