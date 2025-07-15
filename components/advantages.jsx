import { Star, FileText, Award, Network, Mic, TrendingUp } from "lucide-react"

export default function Component() {
  const features = [
    {
      url: "https://artiumacademy.mo.cloudinary.net/v1n/webNewImages/home-mentoring-image.svg",
      title: "Performance based curriculum designed by music maestros",
    },
    {
      url: "https://artiumacademy.mo.cloudinary.net/v1n/webNewImages/home-skills-theory-image.svg",
      title: "1:1 Live Classes in vocals and instruments by certified music teachers",
    },
    {
      url: `https://artiumacademy.mo.cloudinary.net/v1n/webNewImages/home-personlizedlearning-image.svg`,
      title: "Exclusive Live masterclasses by industry legends",
    },
    {
      url: `https://artiumacademy.mo.cloudinary.net/v1n/webNewImages/home-practicestudion-image.svg`,
      title: "Practice Studio with digital tools to accelerate learning",
    },
    {
      url: `https://artiumacademy.mo.cloudinary.net/v1n/webNewImages/home-parformanceplatform-image.svg`,
      title: "Your first gig! Every student gets to perform for an audience",
    },
    {
      url: `https://artiumacademy.mo.cloudinary.net/v1n/webNewImages/home-goalbased-image.svg`,
      title: "Goal based progress ladder to track your musical evolution",
    },
  ]

  return (
    <div className="bg-slate-800 text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left">Harmony Advantage</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  {/* <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center"> */}
                    <img src={feature.url} className="w-27 h-27 text-pink-500" />
                  {/* </div> */}
                </div>
                <p className="text-lg leading-relaxed max-w-xs">{feature.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
