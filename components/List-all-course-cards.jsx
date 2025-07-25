"use client";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./productCard";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import axios from "axios";
import { Cover } from "@/components/ui/cover";
export function ProductList() {
  const [products,setProducts] = useState([]);
 useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.post("/api/courses/verified-courses");
        const allCourses = res.data.courses;

        // filter out any bad records, then map into your shape
        const filtered = allCourses
          .filter(
            (c) =>
              c.image &&
              c.title &&
              c.description &&
              c.category // ensure we have what we need
          )
          .map((c) => {
            const slug = c.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");

            return {
              imageSrc: c.image,
              title: c.title,
              description: c.description,
              reference: `/courses/${c.category}/${slug}`,
            };
          });

        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    }

    fetchCourses();
  }, []);
  // const products = [
  //   {
  //     imageSrc: "https://artiumacademy.mo.cloudinary.net/v1n/Sonu%20nigam_280.jpg",
  //     title: "Hindi Film Music",
  //     description:
  //       "A first of its kind in India – a Film Music training course that combines in-depth training in Hindustani Classical Music and Scientific Voice Training.",
  //     reference:`/courses/voacals/popular-film-music-hindi`,
  //   },
  //   {
  //     imageSrc: "https://artiumacademy.mo.cloudinary.net/v1n/Chithraji_280.jpg",
  //     title: "Tamil Film Music",
  //     description:
  //       "A revolutionary training program in Tamil film music of all periods and styles. Offering a solid base of Carnatic Music Training and Voice Training.",
  //     reference:`/courses/voacals/popular-film-music-hindi`,
  //   },
  //   {
  //     imageSrc: "https://artiumacademy.mo.cloudinary.net/v1n/karaoke-img-our-courses.jpg",
  //     title: "Karaoke & Stage Skills",
  //     description:
  //       "This course is specially designed for vast numbers of a new community of aspirants who have grabbed the opportunity presented by the karaoke track revolution.",
  //     reference:`/courses/voacals/popular-film-music-hindi`,
  //   },
  //   {
  //     imageSrc: "/jordans.webp",
  //     title: "Jordan 5 Fire Red",
  //     description:
  //       "A fan favorite returns with bold fire red detailing.",
  //     reference:`/courses/voacals/popular-film-music-hindi`,
  //   }
    // Add more cards as needed
  // ];

  return (
    <>
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Explore Courses at <br /> <Cover>Harmony Music</Cover>
      </h1>
    </div>
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