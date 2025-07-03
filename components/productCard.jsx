"use client"
import { BackgroundGradient } from "./ui/background-gradient"
import Link from "next/link"

export function ProductCard({ imageSrc, title, description, reference }) {
  return (
    <BackgroundGradient className="rounded-[22px] w-[360px] h-[461px] shrink-0 p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col">
      {/* Image container */}
      <div className="w-[280px] h-[185px] overflow-hidden mx-auto flex-shrink-0">
        <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Title */}
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 flex-shrink-0">{title}</p>

      {/* Description with overflow handling */}
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-4 overflow-hidden">{description}</p>
      </div>

      {/* Button */}
      <Link href={reference} className="flex-shrink-0">
        <div className="mt-4 flex justify-end">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Border Magic
            </span>
          </button>
        </div>
      </Link>
    </BackgroundGradient>
  )
}
