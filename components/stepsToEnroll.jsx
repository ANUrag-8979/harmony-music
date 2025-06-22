import { Ticket, FileText, CreditCard, Mic } from "lucide-react"

export default function Component() {
  const steps = [
    {
      number: "STEP 1",
      icon: <Ticket className="w-8 h-8 text-white" />,
      title: "Book A Free Trial :",
      description: "Select your favourite course and book a free trial class at your convenient time",
    },
    {
      number: "STEP 2",
      icon: <FileText className="w-8 h-8 text-white" />,
      title: "Try before you buy:",
      description: " Get personalised guidance from our Academic Expert in the free trial class",
    },
    {
      number: "STEP 3",
      icon: <CreditCard className="w-8 h-8 text-white" />,
      title: "Pay and Enroll:",
      description: " Begin your 1:1 live and customised learning sessions with Artium Certified Teachers",
    },
    {
      number: "STEP 4",
      icon: <Mic className="w-8 h-8 text-white" />,
      title: "Learn, Practice and Perform:",
      description: " Get Exclusive Access to Live Masterclasses, Artium Showcases and Digital Learning Tools.",
    },
  ]

  return (
    <div className="w-full  mx-auto px-4 py-8 bg-gray-50 ">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          How to Enroll in Online Music Lessons?
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-white rounded-lg shadow-lg border-0 h-full p-6 text-center flex flex-col items-center">
              {/* Step Number */}
              <div className="text-pink-500 font-bold text-lg mb-4">{step.number}</div>

              {/* Icon Circle */}
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>

            {/* Dotted Line Connector - Hidden on mobile, shown on larger screens */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                <div className="w-4 h-0.5 border-t-2 border-dotted border-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
