"use client"

import { notFound } from "next/navigation"
import { ImagesSliderDemo } from "@/components/common/part1"
import Part2 from "@/components/common/part2"
import Part3 from "@/components/common/part3"
import Part4 from "@/components/common/part4"
import Part5 from "@/components/common/part5"
import axios from "axios"
import { useEffect, useState } from "react"

// Add proper TypeScript types
// interface PageData {
//   myImages?: string[]
//   description?: string
//   price?: number
//   classes?: number
//   learn?: string[]
//   courseDirector?: string
//   courseName?: string
//   para1?: string
//   para2?: string
//   directorUrl?: string
// }

// interface Testimonial {
//   id: string
//   name: string
//   content: string
//   rating?: number
// }

// interface CoursePageProps {
//   params: Promise<{
//     course: string
//     courseCatigory: string
//   }>
// }

export default function CoursePage({ params }) {
  const [resolvedParams, setResolvedParams] = useState(null)
  const [pageData, setPageData] = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Resolve params first (Next.js 15 requirement)
  useEffect(() => {
    async function resolveParams() {
      try {
        const resolved = await params
        setResolvedParams(resolved)
      } catch (err) {
        console.error("Error resolving params:", err)
        setError("Failed to load page parameters")
      }
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const { course } = resolvedParams

    // Fetch course data
    async function getCourseData() {
      try {
        const res = await axios.get(`/api/courses/${course}`, {
          params: { course },
        })

        if (!res.data.success) {
          notFound()
          return
        }

        const { resPage } = res.data
        setPageData(resPage)
      } catch (error) {
        console.error("Error fetching course:", error)
        setError("Failed to load course data")
      }
    }

    // Fetch testimonials
    async function getTestimonials() {
      try {
        const res = await axios.get(`/api/get-all-testimonials`)

        if (!res.data.success) {
          console.warn("No testimonials found")
          return
        }

        const { testimonials } = res.data
        console.log(testimonials);
        setTestimonials(testimonials || [])
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        // Don't set error for testimonials as they're not critical
      }
    }

    // Run both fetch functions and handle loading state
    Promise.all([getCourseData(), getTestimonials()]).finally(() => setLoading(false))
  }, [resolvedParams])

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  // Destructure with proper defaults
  const {
    myImages = [],
    description = "",
    price = 0,
    classes = 0,
    learn = [],
    courseDirector = "",
    courseName = "",
    para1 = "",
    para2 = "",
    directorUrl = "",
    demoVideoUrl = ""
  } = pageData

  return (
    <div>
      <ImagesSliderDemo images={myImages} />
      <Part2 />
      <Part3 description={description} price={price} classes={classes} learn={learn} courseName={courseName} demoVideoUrl = {demoVideoUrl}/>
      <Part4 testimonials={testimonials} />
      <Part5 director={courseDirector} course={courseName} para1={para1} para2={para2} directorUrl={directorUrl} />
    </div>
  )
}
