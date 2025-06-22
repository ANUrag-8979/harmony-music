export default function MusicSchoolCard({director,course,para1,para2,directorUrl}) {
  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-black rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 p-4">
            <div className="rounded-lg overflow-hidden">
              <img src={directorUrl} />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
            <div className="text-pink-500 font-medium mb-2">Courses Designed And Certified By</div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Mr. {director}</h1>

            <h2 className="text-xl text-gray-300 mb-6">
              Artium Academy Patron-In-Chief - Online {course} Course
            </h2>

            <p className="text-gray-400 mb-4 leading-relaxed">
              {para1}
            </p>

            <p className="text-gray-400 leading-relaxed">
              {para2}
            </p>
          </div>
        </div>

        {/* Bottom border line */}
        <div className="h-px bg-gray-800 w-full mt-4"></div>
      </div>
    </div>
  )
}
