"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { ButtonsCard } from "./ui/tailwindcss-buttons";
import Link from "next/link";

export function ProductCard({ imageSrc, title, description,reference }) {
  return (
    <BackgroundGradient className="rounded-[22px] w-[360px] shrink-0 p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <img
        src={imageSrc}
        alt={title}
        height="400"
        width="400"
        className="object-contain"
      />
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        {title}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      {/* <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
        <span>Explore</span>
        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
          ${price}
        </span>
      </button> */}
        <Link href={reference}>
      <div className="mt-4 flex justify-end">
      <button className=" relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Border Magic
        </span>
      </button>
      </div>
      </Link>
    </BackgroundGradient>
  );
}