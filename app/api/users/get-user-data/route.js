import mongoose from "mongoose";
import { connectDB } from "@/dbConfigure/connectDB";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/models/user";
import { getUserId } from "@/helper/getUserId";

export async function POST(request) {
    console.log("from getUserData");
    connectDB();
    try {
        const userId = await getUserId(request);
        console.log(`userId is ${userId}`);
        if (!userId) return NextResponse.json({ message: "user not found", success: false, userDetails: null }, { status: 404 });
        try {
            const userDetails = await User.findById(userId);
            return NextResponse.json({ message: "successfully found details", success: true, userDetails: userDetails }, { status: 200 });

        } catch (error) {
            return NextResponse.json({ error: error.message, success: false }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}