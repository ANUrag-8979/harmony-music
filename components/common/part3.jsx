"use client"
import {
  Clock,
  Check,
  Monitor,
  Star,
  Award,
  Mic,
  Piano,
  Guitar,
  Phone,
  Mail,
  Music,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const Toast = ({ toast, onClose }) => {
  useState(() => {
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

export default function MusicSchoolCard({
  description = "Master the fundamentals of music theory, rhythm, and basic instrumental techniques. Perfect for absolute beginners who want to start their musical journey with proper foundation.",
  price = "2,999",
  classes = "10",
  learn = [
    "Basic music theory and notation",
    "Rhythm and timing fundamentals",
    "Introduction to scales and chords",
    "Proper posture and technique",
    "Reading sheet music basics",
    "Ear training exercises",
  ],
  courseName = "Preparatory Level Music Course",
  demoVideoUrl,
}) {
  const [toasts, setToasts] = useState([])
  const [isEnrolling, setIsEnrolling] = useState(false)
  const router = useRouter()

  const showToast = (title, description, variant = "default") => {
    const id = Date.now()
    const newToast = { id, title, description, variant }
    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  async function handleEnroll() {
    if (isEnrolling) return

    console.log("Course Name:", courseName)
    console.log("Starting enrollment process...")

    setIsEnrolling(true)

    try {
      const response = await axios.post("/api/users/assign-course", {
        courseName: courseName,
      })

      console.log("API Response:", response.data)

      // Handle successful responses (200 status)
      if (response.data.success) {
        if (response.data.enrolled === true) {
          showToast("Already Enrolled", "You are already enrolled in this course.", "destructive")
        } else {
          // This covers both enrolled: false and when enrolled field is missing
          showToast("Enrollment Successful!", "You have successfully enrolled in the course.")
        }
      } else {
        showToast("Enrollment Failed", response.data.message || "An error occurred.", "destructive")
      }
    } catch (error) {
      console.error("Enrollment error:", error)

      if (error.response?.status === 401) {
        const errorData = error.response.data

        if (errorData?.goToLogin) {
          showToast("Session Expired", "Your session has expired. Redirecting to login...", "destructive")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        } else {
          showToast("Login Required", "Please log in to enroll in courses.", "destructive")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        }
      } else if (error.response?.status === 404) {
        showToast("User Not Found", "User account not found. Please contact support.", "destructive")
      } else if (error.response?.status === 500) {
        showToast("Server Error", "Internal server error. Please try again later.", "destructive")
      } else {
        showToast("Network Error", "Please check your connection and try again.", "destructive")
      }
    } finally {
      setIsEnrolling(false)
    }
  }
  async function handleDemoClass(){
    const url = encodeURIComponent(demoVideoUrl);
    router.push(`/user/democlass?demoVideoUrl=${url}`);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="w-full max-w-3xl bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-violet-900 p-6 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Music className="h-6 w-6 text-purple-300" />
            <span className="bg-purple-800/50 text-purple-200 border border-purple-700 px-2 py-1 rounded-md text-sm font-medium">
              Harmony Academy
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Preparatory Level</h1>
          <p className="text-purple-200 text-lg">
            Discover the foundations of music with our beginner-friendly program
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Dynamic description */}
          <p className="text-zinc-300 leading-relaxed">{description}</p>

          {/* Dynamic price & classes */}
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="text-zinc-400">Price</span>
            <span className="text-3xl font-bold text-purple-400">₹{price}</span>
            <span className="text-zinc-400 mx-2">/</span>
            <span className="text-xl text-zinc-300">{classes} classes</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={handleDemoClass} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
              Book Your Free Class
            </button>
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="border border-purple-500 text-purple-400 hover:bg-purple-950 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnrolling ? "Enrolling..." : "Buy Now"}
            </button>
          </div>

          <div className="h-px bg-zinc-800 my-6" />

          {/* Dynamic learn list */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">What will you learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              {learn.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800 my-6"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center bg-zinc-800/50 rounded-lg p-3 text-center hover:bg-zinc-800/70 transition-colors duration-200">
              <Monitor className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-zinc-200 text-sm">1 on 1 Personal teacher</p>
            </div>
            <div className="flex flex-col items-center bg-zinc-800/50 rounded-lg p-3 text-center hover:bg-zinc-800/70 transition-colors duration-200">
              <Star className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-zinc-200 text-sm">Live Masterclass</p>
            </div>
            <div className="flex flex-col items-center bg-zinc-800/50 rounded-lg p-3 text-center hover:bg-zinc-800/70 transition-colors duration-200">
              <Award className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-zinc-200 text-sm">Course Certificate</p>
            </div>
            <div className="flex flex-col items-center bg-zinc-800/50 rounded-lg p-3 text-center hover:bg-zinc-800/70 transition-colors duration-200">
              <Clock className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-zinc-200 text-sm">60 Mins Classes</p>
            </div>
          </div>

          <div className="bg-zinc-800/30 rounded-lg p-4 mt-6 border border-zinc-700/50">
            <h3 className="text-lg font-medium text-white mb-3">Available Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-700/30 transition-colors duration-200">
                <Mic className="h-4 w-4 text-purple-400" />
                <span className="text-zinc-300">Vocal Training</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-700/30 transition-colors duration-200">
                <Piano className="h-4 w-4 text-purple-400" />
                <span className="text-zinc-300">Piano Lessons</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-700/30 transition-colors duration-200">
                <Guitar className="h-4 w-4 text-purple-400" />
                <span className="text-zinc-300">Guitar Fundamentals</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-700/30 transition-colors duration-200">
                <Music className="h-4 w-4 text-purple-400" />
                <span className="text-zinc-300">Music Theory</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900 border-t border-zinc-800 p-6 -mx-6 -mb-6 mt-6">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-400" />
              <span className="text-zinc-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-400" />
              <span className="text-zinc-300">contact@harmonyacademy.com</span>
            </div>
            <button onClick={handleDemoClass} className="sm:ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
              Book a Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
