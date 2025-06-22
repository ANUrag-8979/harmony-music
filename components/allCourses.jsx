"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Clock,
  User,
  DollarSign,
  Music,
  ArrowUpDown,
  GraduationCap,
  Music2,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import axios from "axios"
import Link from "next/link"

const getLevelColor = (level) => {
  switch (level) {
    case "beginner":
      return "bg-green-900/50 text-green-300 border-green-700"
    case "intermediate":
      return "bg-yellow-900/50 text-yellow-300 border-yellow-700"
    case "advanced":
      return "bg-red-900/50 text-red-300 border-red-700"
    default:
      return "bg-zinc-800 text-zinc-300 border-zinc-700"
  }
}

const categories = ["All Categories", "instruments", "vocals"]
const levels = ["All Levels", "beginner", "intermediate", "advanced"]

// Custom Toast Component
const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast.id, onClose])

  return (
    <div
      className={`flex items-start p-4 mb-3 rounded-lg border backdrop-blur-sm transition-all duration-300 transform translate-x-0 ${
        toast.variant === "destructive"
          ? "bg-red-900/90 border-red-700 text-red-100"
          : "bg-green-900/90 border-green-700 text-green-100"
      }`}
    >
      <div className="flex-shrink-0 mr-3">
        {toast.variant === "destructive" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{toast.title}</h4>
        <p className="text-sm opacity-90">{toast.description}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Custom Toast Container
const ToastContainer = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}

export default function CoursesPage() {
  const [sortByPrice, setSortByPrice] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [toasts, setToasts] = useState([])

  // Custom toast function
  const showToast = (title, description, variant = "default") => {
    const id = Date.now()
    const newToast = { id, title, description, variant }
    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await axios.post("/api/courses/verified-courses")
        console.log("Fetched:", response.data.courses)
        setCourses(response.data.courses || [])
        console.log(response.data.courses)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setCourses([]) // Ensure courses is always an array
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredAndSortedCourses = useMemo(() => {
    if (!Array.isArray(courses)) {
      return []
    }

    let filtered = [...courses]

    // Filter by level
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    // Sort by price if enabled
    if (sortByPrice) {
      filtered = filtered.sort((a, b) => a.price - b.price)
    }

    return filtered
  }, [sortByPrice, selectedLevel, selectedCategory, courses])

  async function handleEnroll(id, courseName) {
    console.log(id, courseName)
    try {
      // const token = await cookies.get("token");
      // if(!token){
      //    showToast("login to Enrolled", "You are not login.", "destructive")
      //    return;
      // }
      const response = await axios.post("/api/users/assign-course", {
        id: id,
        courseName: courseName,
      })
      console.log(response)
      if (response.data.enrolled) {
        showToast("Already Enrolled", "You are already enrolled in this course.", "destructive")
      } else {
        showToast("Enrollment Successful!", "You have successfully enrolled in the course.")
      }
    } catch (error) {
      console.log("enternal server error!!", error)
      showToast("Enrollment Failed", "An error occurred while enrolling. Please try again.", "destructive")
    }
  }
  
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/30 mt-40 mb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-zinc-100 to-teal-400 bg-clip-text text-transparent">
              Music Courses
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Discover our comprehensive collection of music courses designed to help you master your craft, whether
              you're just starting out or looking to advance your skills.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b border-zinc-800 bg-zinc-900/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              {/* Price Sort Toggle */}
              <button
                onClick={() => setSortByPrice(!sortByPrice)}
                className={`flex items-center px-3 py-1.5 text-sm rounded-md border transition-colors ${
                  sortByPrice
                    ? "bg-gradient-to-r from-purple-900 to-purple-700 border-purple-600 text-purple-100"
                    : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort by Price {sortByPrice && "↑"}
              </button>

              {/* Level Filter */}
              <div className="relative">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-1.5 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 w-[180px]"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <div className="flex items-center">
                  <Music2 className="w-4 h-4 absolute left-3 text-zinc-400 pointer-events-none" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-1.5 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-teal-600 w-[200px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-zinc-400 text-sm">
              Showing {filteredAndSortedCourses.length} of {courses.length} courses
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedLevel !== "All Levels" || selectedCategory !== "All Categories" || sortByPrice) && (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-zinc-400 text-sm">Active filters:</span>
              {sortByPrice && (
                <span className="px-2 py-1 text-xs rounded-full bg-purple-900/60 text-purple-200 border border-purple-700">
                  Price: Low to High
                </span>
              )}
              {selectedLevel !== "All Levels" && (
                <span className="px-2 py-1 text-xs rounded-full bg-teal-900/60 text-teal-200 border border-teal-700">
                  Level: {selectedLevel}
                </span>
              )}
              {selectedCategory !== "All Categories" && (
                <span className="px-2 py-1 text-xs rounded-full bg-blue-900/60 text-blue-200 border border-blue-700">
                  Category: {selectedCategory}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">Loading courses...</h3>
            <p className="text-zinc-500">Please wait while we fetch the latest courses.</p>
          </div>
        ) : filteredAndSortedCourses.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">No courses found</h3>
            <p className="text-zinc-500">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-4 gap-9">
            {filteredAndSortedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/20 group relative"
              >
                {/* Shimmer Effect Overlay */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-zinc-400/10 to-transparent z-10 pointer-events-none"></div>

                {/* Card Header */}
                <div className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                          course.level,
                        )}`}
                      >
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-200 border border-zinc-700">
                        <Music className="w-3 h-3 mr-1" />
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-zinc-100 line-clamp-2">{course.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-zinc-300 text-sm">
                      <User className="w-4 h-4 mr-2 text-zinc-500" />
                      <span>Directed by {course.instructor}</span>
                    </div>

                    <div className="flex items-center text-zinc-300 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-zinc-500" />
                      <span>{course.duration} classes</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 pt-0">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-zinc-100">
                        <DollarSign className="w-5 h-5 mr-1 text-zinc-400" />
                        <span className="text-2xl font-bold">{course.price}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEnroll(course.id, course.title)}
                        className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                      >
                        Enroll know
                      </button>
                      <Link href={`/courses/${course.category}/${course.title}`}>
                      <button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
                        Explore more
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-zinc-800 bg-zinc-900/20">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-zinc-100">Ready to Start Your Musical Journey?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Join thousands of students who have transformed their musical abilities with our expert-led courses.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 via-teal-600 to-blue-600 hover:from-purple-700 hover:via-teal-700 hover:to-blue-700 text-white font-semibold rounded-md transition-colors shadow-lg shadow-purple-900/20">
            Browse All Courses
          </button>
        </div>
      </div>
    </div>
  )
}
