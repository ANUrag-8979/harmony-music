'use client'
import { Music, Users, Award, Mic, Guitar, Piano, Star, Play, Volume2, Headphones } from "lucide-react"
import Link from "next/link"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className=" mt-22 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <Music className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-gray-900" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Artium Academy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Elevating Melodies, Inspiring Souls
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>Vocals</span>
              </div>
              <div className="flex items-center gap-2">
                <Piano className="w-4 h-4" />
                <span>Piano</span>
              </div>
              <div className="flex items-center gap-2">
                <Guitar className="w-4 h-4" />
                <span>Guitar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Our Musical Vision</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Artium Academy envisions a world where the joy of music is accessible to everyone, transcending age and
              boundaries. We strive to cultivate a love for melody, nurture artistic expression, and empower individuals
              to find their unique voice in the vast symphony of life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-800/50 to-blue-800/50 border border-purple-700/30">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">All Ages Welcome</h3>
              <p className="text-gray-300">
                From children to adults, our programs cater to learners of every age and skill level.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-800/50 to-indigo-800/50 border border-blue-700/30">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Online Excellence</h3>
              <p className="text-gray-300">
                Learn from the comfort of your home with our expertly designed online curriculum.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-800/50 to-purple-800/50 border border-indigo-700/30">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Expert Guidance</h3>
              <p className="text-gray-300">
                Learn from certified teachers and industry legends who are passionate about music.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Artium Advantage */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Artium Advantage
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover what makes Artium Academy the premier choice for online music education
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Performance Based Curriculum */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-700/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Performance Based Curriculum</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our curriculum is meticulously designed by accomplished music maestros, focusing on hands-on performance
                to bring out the best in every student through practical proficiency and artistic expression.
              </p>
            </div>

            {/* 1:1 Live Classes */}
            <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-2xl p-8 border border-blue-700/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">1:1 Live Classes</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Exclusive personalized instruction in vocals and instruments by certified music teachers, ensuring
                dedicated attention and tailored guidance for every student.
              </p>
            </div>

            {/* Live Masterclasses */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 border border-indigo-700/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Exclusive Live Masterclasses</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Learn directly from industry legends like Sonu Nigam, KS Chitra, Shubha Mudgal, Aruna Sairam, and Louiz
                Banks through exclusive live sessions.
              </p>
            </div>

            {/* Practice Studio */}
            <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-2xl p-8 border border-green-700/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Digital Practice Studio</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Advanced digital tools including Tanpura, Tabla, and Metronome to accelerate your music learning
                experience with cutting-edge technology.
              </p>
            </div>

            {/* First Gig */}
            <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 rounded-2xl p-8 border border-pink-700/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Your First Gig!</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Every student gets the opportunity to perform for a live audience, gaining valuable real-world
                experience and building confidence on stage.
              </p>
            </div>

            {/* Progress Ladder */}
            <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-2xl p-8 border border-orange-700/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Goal-Based Progress Ladder</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Track your musical evolution with our structured roadmap to success, celebrating achievements and
                witnessing your musical prowess unfold step by step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Courses We Offer</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive range of vocal and instrumental courses designed for all skill levels
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vocals */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-700/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Vocals</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Hindustani Classical Vocal",
                  "Popular & Film Music - Hindi",
                  "Popular & Film Music - Tamil",
                  "Popular & Film Music - Kannada",
                  "Popular & Film Music - Telugu",
                  "Carnatic Classical Vocal",
                  "Ghazal",
                  "Devotional",
                  "Karaoke",
                  "Western Vocals",
                ].map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-purple-800/20 rounded-lg border border-purple-700/20"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruments */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 border border-blue-700/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Guitar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Instruments</h3>
              </div>
              <div className="grid gap-3">
                {[
                  { name: "Guitar - Acoustic", icon: Guitar },
                  { name: "Guitar - Rock & Pop", icon: Guitar },
                  { name: "Keyboard & Piano", icon: Piano },
                  { name: "Tabla", icon: Volume2 },
                ].map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-blue-800/20 rounded-lg border border-blue-700/20"
                  >
                    <course.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{course.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Begin Your Musical Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of students who have discovered their musical potential with Artium Academy. Start your
            transformation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/courses"}>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Start Learning Today
              </button>
            </Link>
            <Link href={"#"}>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
              Book a Free Trial
            </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
