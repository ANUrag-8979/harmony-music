import Image from "next/image"
import { TrendingUp, BookOpen, Clock } from "lucide-react"

export default function Component() {
  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Features */}
          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Experienced Dedicated Teachers</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Providing a qualitative music education is our top priority. Hence, every Artium teacher must undergo
                  a rigorous 5-step evaluation process that aids us in selecting the most qualified teachers for you.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Personalised Learning Plans</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To ensure a smooth learning experience, we customise our lessons based on your skills and abilities.
                  Every lesson is designed to ensure you're learning at a pace that is comfortable to you.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">Flexible Scheduling</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  You can easily schedule your lessons at your convenience and stay up to date. Our online Bollywood
                  vocal classes let you take vocal lessons anytime, anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Image and Text */}
          <div className="space-y-8">
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1681396936672-b992d1a51897?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2ljJTIwdGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Three professional music teachers in purple uniforms smiling"
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Learn from the best teachers in the industry
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
