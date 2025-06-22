"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo({ testimonials }) {
  // If there are no testimonials, render nothing:
  console.log(testimonials);
  if (!testimonials?.length) {
    return null;
  }

  // Otherwise return your real JSX:
  return (
    <div
      className="h-[40rem] rounded-md flex flex-col antialiased bg-white 
                 dark:bg-black dark:bg-grid-white/[0.05] items-center 
                 justify-center relative overflow-hidden"
    >
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
