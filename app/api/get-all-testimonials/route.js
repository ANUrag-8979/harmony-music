import Testimonial from "@/models/Testimonial"
import { NextResponse } from "next/server"
import { connectDB } from "@/dbConfigure/connectDB"

export async function GET() {
  try {
    await connectDB()

    const testimonials = await Testimonial.find().populate("writer", "firstName lastName").lean()

    // Handle both array and single string cases
    const allQuotesWithWriter = testimonials.reduce((acc, testimonial) => {
      let quotes = testimonial.quotes

      // Handle if quotes is a single string instead of array
      if (typeof quotes === "string") {
        quotes = [quotes]
      }

      if (quotes && Array.isArray(quotes)) {
        const quotesWithWriter = quotes.map((quote) => ({
          quote,
          firstName: testimonial.writer?.firstName || "Unknown",
          lastName: testimonial.writer?.lastName || "User",
        }))
        return [...acc, ...quotesWithWriter]
      }
      return acc
    }, [])

    return NextResponse.json(
      {
        message: "Successfully retrieved all quotes with writer details!",
        testimonials: allQuotesWithWriter,
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        success: false,
      },
      { status: 500 },
    )
  }
}
