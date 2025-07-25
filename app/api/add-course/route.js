// app/api/page/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from '@/dbConfigure/connectDB'
import Course from '@/models/course'

export async function POST(request) {
  await connectDB()

  const body = await request.json()
  try {
    const newcourse = new Course(body)
    await newcourse.save()
    return NextResponse.json({ success: true, data: newcourse }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

// (optional) can also add a GET handler:
// export async function GET() {
//   await dbConnect()
//   const allPages = await Page.find()
//   return NextResponse.json({ success: true, data: allPages })
// }
