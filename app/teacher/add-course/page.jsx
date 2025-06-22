"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, ImageIcon, BookOpen, DollarSign, Users, Tag, Award } from "lucide-react"

export default function AddCourse() {
  const router = useRouter()
  const [form, setForm] = useState({
    myImages: [""],
    description: "",
    price: "",
    classes: "",
    learn: [""],
    courseDirector: "",
    courseName: "",
    para1: "",
    para2: "",
    directorUrl: "",
    courseCatigory: "",
    level: "",
    demoVideoUrl: "",
    courseImage: "",
  })

  function handleChange(e, idx, field, subIdx) {
    const { name, value } = e.target
    setForm((prev) => {
      const copy = { ...prev }
      if (field === "myImages" || field === "learn") {
        copy[field][idx] = value
      } else {
        copy[name] = value
      }
      return copy
    })
  }

  function addField(field) {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  function removeField(field, index) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Basic validation
    const isEmpty = (val) => !val || val.trim() === ""
    const isAnyEmptyInArray = (arr) => arr.some((item) => isEmpty(item))

    if (
      isAnyEmptyInArray(form.myImages) ||
      isEmpty(form.description) ||
      isEmpty(form.price) ||
      isEmpty(form.classes) ||
      isAnyEmptyInArray(form.learn) ||
      isEmpty(form.courseDirector) ||
      isEmpty(form.courseName) ||
      isEmpty(form.para1) ||
      isEmpty(form.para2) ||
      isEmpty(form.directorUrl) ||
      isEmpty(form.courseCatigory) ||
      isEmpty(form.level) ||
      isEmpty(form.demoVideoUrl) ||
      isEmpty(form.courseImage)
    ) {
      alert("Please fill out all fields before submitting.")
      return
    }

    const body = {
      ...form,
      price: Number.parseInt(form.price),
      classes: Number.parseInt(form.classes),
    }

    const res = await fetch("/api/add-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      router.push("/")
    } else {
      console.error("Failed to save")
    }
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-40">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Course</h1>
          <p className="text-gray-400">Fill in the details to add a new course to your platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-black rounded-xl p-6 border border-green-500/30">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Name</label>
                <input
                  name="courseName"
                  type="text"
                  value={form.courseName}
                  onChange={(e) => handleChange(e)}
                  className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter course name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Director</label>
                <input
                  name="courseDirector"
                  type="text"
                  value={form.courseDirector}
                  onChange={(e) => handleChange(e)}
                  className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter director name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="courseCatigory"
                    type="text"
                    value={form.courseCatigory}
                    onChange={(e) => handleChange(e)}
                    className="w-full bg-gray-900 border border-green-500/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., vocals,instruments"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Badge</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="level"
                    type="text"
                    value={form.level}
                    onChange={(e) => handleChange(e)}
                    className="w-full bg-gray-900 border border-green-500/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 mb-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => handleChange(e)}
                rows={4}
                className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your course..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Director Image URL</label>
              <input
                name="directorUrl"
                type="text"
                value={form.directorUrl}
                onChange={(e) => handleChange(e)}
                className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter director image url"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Paragraph 1</label>
                <textarea
                  name="para1"
                  value={form.para1}
                  onChange={(e) => handleChange(e)}
                  rows={3}
                  className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="First paragraph content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Paragraph 2</label>
                <textarea
                  name="para2"
                  value={form.para2}
                  onChange={(e) => handleChange(e)}
                  rows={3}
                  className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Second paragraph content..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Classes */}
          <div className="bg-black rounded-xl p-6 border border-green-500/30">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Pricing & Structure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={(e) => handleChange(e)}
                    className="w-full bg-gray-900 border border-green-500/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Classes</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="classes"
                    type="number"
                    value={form.classes}
                    onChange={(e) => handleChange(e)}
                    className="w-full bg-gray-900 border border-green-500/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Image & Gallery */}
          <div className="bg-black rounded-xl p-6 border border-green-500/30">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-green-400" />
              Course Image & Gallery
            </h2>

            {/* Main Course Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Main Course Image</label>
              <input
                name="courseImage"
                type="text"
                value={form.courseImage}
                onChange={(e) => handleChange(e)}
                className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter main course image URL"
              />
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Additional Course Images</label>
              <div className="space-y-3">
                {form.myImages.map((img, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter additional image URL"
                      value={img}
                      onChange={(e) => handleChange(e, i, "myImages")}
                      className="flex-1 bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                    {form.myImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField("myImages", i)}
                        className="px-3 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("myImages")}
                  className="flex items-center gap-2 px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Additional Image
                </button>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-black rounded-xl p-6 border border-green-500/30">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              What Students Will Learn
            </h2>

            <div className="space-y-3">
              {form.learn.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter learning outcome"
                    value={item}
                    onChange={(e) => handleChange(e, i, "learn")}
                    className="flex-1 bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  {form.learn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField("learn", i)}
                      className="px-3 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField("learn")}
                className="flex items-center gap-2 px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Learning Outcome
              </button>
            </div>
          </div>

          {/* Demo Video */}
          <div className="bg-black rounded-xl p-6 border border-green-500/30">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-green-400" />
              Demo Video
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Demo Video URL</label>
              <input
                name="demoVideoUrl"
                type="text"
                value={form.demoVideoUrl}
                onChange={(e) => handleChange(e)}
                className="w-full bg-gray-900 border border-green-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter demo video URL"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-green-900 to-green-900 hover:from-green-950 hover:to-green-950 text-white font-semibold rounded-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-black"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
