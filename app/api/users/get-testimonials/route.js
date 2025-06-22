// app/api/testimonials/route.ts

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/dbConfigure/connectDB";
import Testimonial from "@/models/Testimonial";

export async function POST(request) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Read token from cookie
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Missing token", success: false },
        { status: 401 }
      );
    }

    // 3. Verify JWT and extract user id
    let payload;
    try {
      payload = jwt.verify(token, process.env.TOKEN_SECRET)
    
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token", success: false },
        { status: 401 }
      );
    }
    const userId = payload.id;

    // 4. Fetch testimonials by writer (ObjectId)
    const testimonials = await Testimonial.find({ writer: userId }).lean();

    // 5. Return response
    if (testimonials.length === 0) {
      return NextResponse.json(
        { message: "No testimonials found", success: true, testimonials: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Testimonials found", success: true, testimonials },
      { status: 200 }
    );

  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
