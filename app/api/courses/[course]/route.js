import { connectDB } from "@/dbConfigure/connectDB"
import Course from "@/models/course"
import { NextResponse } from "next/server"

// Add proper TypeScript types


export async function GET(request, { params }) {
  try {
    // Connect to database
    await connectDB()

    // Await params (Next.js 15 requirement)
    const { course } = await params

    // Decode URL parameter in case it contains special characters
    // const decodedCourse = decodeURIComponent(course)

    // Find course by name
    const resPage = await Course.findOne({ courseName: course }).lean()

    if (!resPage) {
      return NextResponse.json(
        {
          error: "Course not found",
          success: false,
        },
        { status: 404 },
      )
    }

    // Return success response
    return NextResponse.json(
      {
        resPage,
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("API Error fetching course:", error)

    // Handle specific database connection errors
    if (error.name === "MongooseError" || error.name === "MongoError") {
      return NextResponse.json(
        {
          error: "Database connection failed",
          success: false,
        },
        { status: 503 },
      )
    }

    // Generic server error
    return NextResponse.json(
      {
        error: "Internal Server Error",
        success: false,
      },
      { status: 500 },
    )
  }
}
