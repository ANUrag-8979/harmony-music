import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from "@/models/user";
import { sendEmail } from "@/helper/mailer";
import { connectDB } from "@/dbConfigure/connectDB";

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { firstName, lastName, username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists with email", success: false }, { status: 400 });
        }

        const user2 = await User.findOne({ username });
        if (user2) {
            return NextResponse.json({ message: "User already exists with username", success: false }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        try {
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            return NextResponse.json({ message: "User registered, but email sending failed", success: false }, { status: 500 });
        }

        return NextResponse.json({ message: "User registered successfully and verification email is sent", success: true }, { status: 200 });

    } catch (err) {
        console.error("Internal server error:", err);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
}
