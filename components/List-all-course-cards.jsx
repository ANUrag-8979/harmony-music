"use client";
import React from "react";
import { ProductCard } from "./productCard";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export function ProductList() {
  const products = [
    {
      imageSrc: "https://artiumacademy.mo.cloudinary.net/v1n/Sonu%20nigam_280.jpg",
      title: "Hindi Film Music",
      description:
        "A first of its kind in India – a Film Music training course that combines in-depth training in Hindustani Classical Music and Scientific Voice Training.",
      reference:`/courses/voacals/popular-film-music-hindi`,
    },
    {
      imageSrc: "https://artiumacademy.mo.cloudinary.net/v1n/Chithraji_280.jpg",
      title: "Tamil Film Music",
      description:
        "A revolutionary training program in Tamil film music of all periods and styles. Offering a solid base of Carnatic Music Training and Voice Training.",
      reference:`/courses/voacals/popular-film-music-hindi`,
    },
    {
      imageSrc: "https://artiumacademy.mo.cloudinary.net/v1n/karaoke-img-our-courses.jpg",
      title: "Karaoke & Stage Skills",
      description:
        "This course is specially designed for vast numbers of a new community of aspirants who have grabbed the opportunity presented by the karaoke track revolution.",
      reference:`/courses/voacals/popular-film-music-hindi`,
    },
    {
      imageSrc: "/jordans.webp",
      title: "Jordan 5 Fire Red",
      description:
        "A fan favorite returns with bold fire red detailing.",
      reference:`/courses/voacals/popular-film-music-hindi`,
    },
    {
      imageSrc: "/jordans.webp",
      title: "Jordan 5 Fire Red",
      description:
        "A fan favorite returns with bold fire red detailing.",
      reference:`/courses/voacals/popular-film-music-hindi`,
    },
    {
      imageSrc: "/jordans.webp",
      title: "Jordan 5 Fire Red",
      description:
        "A fan favorite returns with bold fire red detailing.",
      reference:`/courses/voacals/popular-film-music-hindi`,
    }
    // Add more cards as needed
  ];

  return (
    <>
    <TextGenerateEffect words={"Explore All Courses"}></TextGenerateEffect>
    <div
  className="
    flex 
    flex-nowrap          /* prevent wrapping */
    gap-6 
    overflow-x-auto 
    px-4 py-6 
    scrollbar-thin 
    scrollbar-thumb-gray-400
  "
>
  {products.map((product, index) => (
    <div
      key={index}
      className="flex-shrink-0"  /* prevent each card from shrinking */
    >
      <ProductCard {...product} />
    </div>
  ))}
</div>
</>
  );
}