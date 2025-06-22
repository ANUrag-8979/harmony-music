"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Simulate API call
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true)
      try {
        const res = await axios.get("/api/get-all-teachers")
        setTeachers(res.data.data.teachers)
        console.log(res)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  // Filter teachers based on employment status
  useEffect(() => {
    let filtered = teachers
    if (filter === "employed") {
      filtered = teachers.filter((teacher) => teacher.employed)
    } else if (filter === "unemployed") {
      filtered = teachers.filter((teacher) => !teacher.employed)
    }
    setFilteredTeachers(filtered)
  }, [teachers, filter])

  const toggleEmployment = async (teacherId) => {
    setTeachers((prev) =>
      prev.map((teacher) => (teacher._id === teacherId ? { ...teacher, employed: !teacher.employed } : teacher)),
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading teachers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-gray-800/30"></div>
        <div className=" mt-33 relative px-6 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-gray-200 to-red-400 bg-clip-text text-transparent">
              Teacher Management
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Manage and discover talented educators in our learning community
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            All Teachers ({teachers.length})
          </button>
          <button
            onClick={() => setFilter("employed")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filter === "employed"
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            Employed ({teachers.filter((t) => t.employed).length})
          </button>
          <button
            onClick={() => setFilter("unemployed")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filter === "unemployed"
                ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/25"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            Available ({teachers.filter((t) => !t.employed).length})
          </button>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="group relative bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10 hover:bg-gray-800"
            >
              {/* Employment Badge */}
              {teacher.employed && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-400 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </div>
              )}

              {/* Avatar */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-lg">
                  {teacher.teacherId.firstName[0]}
                  {teacher.teacherId.lastName[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {teacher.teacherId.firstName} {teacher.teacherId.lastName}
                  </h3>
                  <p className="text-gray-400">{teacher.teacherId.email}</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {teacher.specialty.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-red-400 rounded-full text-sm border border-gray-600 hover:border-red-500/50 transition-colors duration-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Courses */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Courses:</h4>
                <div className="flex flex-wrap gap-1">
                  {teacher.courses.map((course, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-700"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6 line-clamp-3">{teacher.description}</p>

              {/* Employment Toggle Button */}
              <button
                onClick={() => toggleEmployment(teacher._id)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  teacher.employed
                    ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                }`}
              >
                {teacher.employed ? "Mark as Available" : "Employ Teacher"}
              </button>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No teachers found</h3>
            <p className="text-gray-400">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
