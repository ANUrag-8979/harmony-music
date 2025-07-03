"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, User, MapPin, Calendar, Settings, Mail, Lock, Save, MessageSquare, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    // dateOfBirth: "",
  })
  const [profileImage, setProfileImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)
  const [review, setReview] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const fileInputRef = useRef(null)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoadingUserData(true)
        const res = await axios.post(`/api/users/get-user-data`)

        // Check if response and response data exist
        if (res && res.data) {
          const { userDetails } = res.data

          // Check if userDetails exists before destructuring
          if (userDetails) {
            const { firstName, lastName, city, state, dateOfBirth } = userDetails

            setFormData({
              firstName: firstName || "",
              lastName: lastName || "",
              city: city || "",
              state: state || "",
              dateOfBirth: dateOfBirth || "",
            })
          } else {
            console.warn("userDetails not found in response")
            // Keep form data as empty strings - user can fill manually
          }
        } else {
          console.warn("Invalid response structure")
          // Keep form data as empty strings - user can fill manually
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        // Don't show alert for API errors - just log and let user fill form manually
        console.warn("Could not load existing user data. You can still edit your profile.")
      } finally {
        setIsLoadingUserData(false)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Replace this with your actual API call
      const res = await axios.post('/api/users/edit-profile',{
        formData:formData
      });
      console.log("Updated profile:", formData)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!review.trim()) return

    setIsSubmittingReview(true)
    try {
      // POST the new quote to your testimonials endpoint
      const res = await axios.post("/api/users/add-review", {
        newQuote: review.trim(),
      })

      // Check response
      if (res.data.success) {
        alert("Review submitted successfully!")
        setReview("") // clear input
      } else {
        // your API might return success: false with a message
        alert(`Submission failed: ${res.data.message}`)
      }
    } catch (err) {
      console.error("Error submitting review:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmittingReview(false)
    }
  }

  // Show loading state while fetching user data
  if (isLoadingUserData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mt-40 mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Edit Your Profile</h1>
          <p className="text-purple-200">Update your information on Sikarwar Music</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    {profileImage ? (
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-gray-400" />
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 p-3 rounded-full text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
                  <Camera size={20} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">Profile Picture</h3>
                <p className="text-gray-300 text-sm mb-3">Choose a photo that represents you on Sikarwar Music</p>
                <p className="text-xs text-gray-400">Recommended: Square image, at least 400x400px, max 5MB</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center mb-6">
              <User className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-purple-200">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-purple-200">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center mb-6">
              <MapPin className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Address</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-purple-200">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your city"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-purple-200">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your state"
                />
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center mb-6">
              <Calendar className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Date of Birth</h3>
            </div>

            <div className="max-w-md">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div> */}

          {/* Account Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center mb-6">
              <Settings className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Account Settings</h3>
            </div>

            <div className="space-y-4">
              <Link
                href="/user/change-password"
                className="flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <Lock className="text-purple-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-white">Change Password</p>
                    <p className="text-sm text-gray-400">Update your account password</p>
                  </div>
                </div>
                <div className="text-purple-400 group-hover:translate-x-1 transition-transform duration-200">→</div>
              </Link>

              <Link
                href="/user/change-email"
                className="flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <Mail className="text-purple-400 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-white">Change Email</p>
                    <p className="text-sm text-gray-400">Update your email address</p>
                  </div>
                </div>
                <div className="text-purple-400 group-hover:translate-x-1 transition-transform duration-200">→</div>
              </Link>
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Write a Review</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="review" className="block text-sm font-medium text-purple-200">
                  Share your experience with Sikarwar Music
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your experience, what you liked, and any suggestions for improvement..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleReviewSubmit}
                  disabled={isSubmittingReview || !review.trim()}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmittingReview ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={16} />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="mr-3" size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
