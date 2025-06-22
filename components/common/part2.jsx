import React from 'react';
import { TextGenerateEffect } from "../ui/text-generate-effect";
export default function Part2() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <h2 className=" font-extrabold text-center text-4xl mb-12">
        Why Join Our Online Bollywood Vocal Classes
      </h2>

      <div className="flex flex-col md:flex-row justify-around gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: 'https://artiumacademy.mo.cloudinary.net/v1n/course-two/pink-logo-1.svg',
            title: 'Personalised Lessons',
            desc: 'Our online Bollywood vocal lessons are designed to make your learning experience interesting. The classes are tailored to your desired goals, and you will get personal guidance from our instructors throughout your music journey.',
          },
          {
            icon: 'https://artiumacademy.mo.cloudinary.net/v1n/course-two/pink-logo-1.svg',
            title: 'Flexible Schedule',
            desc: 'Learn at your own pace with classes that fit around your life commitments. Choose from one-on-one or small group sessions to suit your style.',
          },
          {
            icon: 'https://artiumacademy.mo.cloudinary.net/v1n/course-two/pink-logo-1.svg',
            title: 'Expert Instructors',
            desc: 'Our handpicked faculty are industry professionals who bring real‑world Bollywood experience straight to your screen.',
          },
        ].map((item, idx) => (
          <div key={idx} className="flex-1  p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md">
            <img
              src={item.icon}
              alt={item.title}
              className=" mb-4 h-12 w-12"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {item.title}
            </h3>
            {/* <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
              {item.desc}
            </p> */}
            <TextGenerateEffect words={item.desc} />
          </div>
        ))}
      </div>
    </section>
  );
}
