// app/api/testimonials/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfigure/connectDB";
import Testimonial from "@/models/Testimonial";
import { getUserId } from "@/helper/getUserId";

export async function POST(request) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Parse and validate body
    const body = await request.json();
    const { newQuote } = body;
    if (!newQuote || typeof newQuote !== "string") {
      return NextResponse.json(
        { message: "Missing or invalid `newQuote` in request body", success: false },
        { status: 400 }
      );
    }

    // 3. Authenticate
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated. Please log in first.", success: false },
        { status: 401 }
      );
    }

    // 4. Append the new quote to this user's testimonial document.
    //    Assumes you have one Testimonial per user, and a `quotes` array in the schema.
    const updated = await Testimonial.findOneAndUpdate(
      { writer: userId },
      { $push: { quotes: newQuote } },
      { new: true, upsert: true }   // create doc if none exists
    ).lean();

    return NextResponse.json(
      { message: "Review added successfully", success: true, testimonial: updated },
      { status: 200 }
    );

  } catch (err) {
    console.error("POST /api/testimonials error:", err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
