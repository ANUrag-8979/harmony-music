"use client"
import { useState } from "react"

import { MessageSquare, Send, Plus, X } from "lucide-react"
import axios from "axios"

const Page = () => {
  const [description, setDescription] = useState("")
  const [specialty, setSpecialty] = useState([])
  const [currentSpecialty, setCurrentSpecialty] = useState("")
  const [isSubmittingDescription, setIsSubmittingDescription] = useState(false)

  const addSpecialty = () => {
    if (currentSpecialty.trim() && !specialty.includes(currentSpecialty.trim())) {
      setSpecialty([...specialty, currentSpecialty.trim()])
      setCurrentSpecialty("")
    }
  }

  const removeSpecialty = (index) => {
    setSpecialty(specialty.filter((_, i) => i !== index))
  }

  const handleSpecialtyKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSpecialty()
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()

    // Add validation
    if (!description.trim()) {
      alert("Please enter a description before submitting.")
      return
    }

    // Set loading state to true at the beginning
    setIsSubmittingDescription(true)

    try {
      console.log("Submitting description:", description.trim()) // Debug log
      console.log("Submitting specialty:", specialty) // Debug log

      // POST the new description to your endpoint
      const res = await axios.post("/api/users/become-a-teacher", {
        description: description.trim(),
        specialty: specialty,
      })

      console.log("API Response:", res.data) // Debug log

      // Check response
      if (res.data && res.data.success) {
        alert("Application submitted successfully!")
        setDescription("") // clear input
        setSpecialty([]) // clear specialty array
      } else {
        // Handle case where API returns success: false
        const errorMessage = res.data?.message || "Submission failed"
        alert(`Submission failed: ${errorMessage}`)
      }
    } catch (err) {
      console.error("Error submitting description:", err)

      // More detailed error handling
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error status
          console.error("Server Error:", err.response.data)
          alert(`Server Error: ${err.response.data?.message || err.response.statusText}`)
        } else if (err.request) {
          // Request was made but no response received
          console.error("Network Error:", err.request)
          alert("Network error. Please check your connection and try again.")
        } else {
          // Something else happened
          console.error("Error:", err.message)
          alert("Something went wrong. Please try again.")
        }
      } else {
        console.error("Error:", err)
        alert("Something went wrong. Please try again.")
      }
    } finally {
      // Always reset loading state
      setIsSubmittingDescription(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="my-40 w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-purple-400 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-white">Write description about you</h3>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-purple-200">
              Share your experience to Sikarwar Music
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us about your experience, what you liked, and any suggestions for improvement..."
              disabled={isSubmittingDescription}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="specialty" className="block text-sm font-medium text-purple-200">
              Your Specialties
            </label>
            <div className="flex gap-2">
              <input
                id="specialty"
                type="text"
                value={currentSpecialty}
                onChange={(e) => setCurrentSpecialty(e.target.value)}
                onKeyPress={handleSpecialtyKeyPress}
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter a specialty (e.g., Piano, Guitar, Vocals)..."
                disabled={isSubmittingDescription}
              />
              <button
                type="button"
                onClick={addSpecialty}
                disabled={!currentSpecialty.trim() || isSubmittingDescription}
                className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>

            {specialty.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {specialty.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-200 rounded-full text-sm"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(index)}
                      disabled={isSubmittingDescription}
                      className="ml-2 text-purple-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingDescription || !description.trim()}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmittingDescription ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={16} />
                  Submit description
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
