"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";


export function ThreeDMarqueeDemo() {
  const images = [
    "https://images.unsplash.com/photo-1741190745018-50ed4935c493?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzaWMlMjBkYXJrJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1659682342865-c58cb5e069f9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWMlMjBkYXJrJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://media.istockphoto.com/id/182163747/photo/rock-n-roll-stage.webp?a=1&b=1&s=612x612&w=0&k=20&c=PoV9d8hIZmFvdwhMR_SiN21AU8m16C7gO3l76wUH1SQ=",
    "https://plus.unsplash.com/premium_photo-1677589330352-509c3d18f3a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjAlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1749201890981-0a0e78a97a70?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4NHx8fGVufDB8fHx8fA%3D%3D",
    // "https://plus.unsplash.com/premium_photo-1682125488670-29e72e5a7672?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljJTIwJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1708164333066-dabc2dac17d2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWMlMjAlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://images.unsplash.com/photo-1612249075164-f5e6a6181364?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFibGF8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1679814561272-03e6099a32f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljJTIwJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1723710357254-dfee0e229728?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljJTIwJTIwaW1hZ2VzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1619983081563-430f63602796?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1682125768864-c80b650614f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG11c2ljfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwc2luZ2VyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1704357669391-47adbf425ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwc2luZ2VyfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1718570262726-fb764ebc89c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwc2luZ2VyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1699383443309-9a5d6f2e39c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWMlMjBpbnN0cnVtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681074651819-e3a6ef2783b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwc2luZ2VyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljJTIwaW5zdHJ1bWVudHN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1703618157206-3568d94cc168?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZpb2xpbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1718570262726-fb764ebc89c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwc2luZ2VyfGVufDB8fDB8fHww",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://images.unsplash.com/photo-1677254112978-d7121217135e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMHNpbmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1718570262726-fb764ebc89c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwc2luZ2VyfGVufDB8fDB8fHww",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://plus.unsplash.com/premium_photo-1677446657652-144c8c6d2ef8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZpb2xpbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1677254112978-d7121217135e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMHNpbmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://assets.aceternity.com/world-map.webp",
  ];
//   return (
// <div
//   className="w-full my-3 rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
//       <ThreeDMarquee images={images} />
//     </div>
//   );
return (
    <div className="relative mx-auto my-2 flex h-screen w-full  flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        We Welcomes you{" "}
        <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          Sikarwar
        </span>{" "}
        Music School.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        You are not your job, you&apos;re not how much money you have in the
        bank. You are not the car you drive. You&apos;re not the contents of
        your wallet.
      </p>
 
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          Explore all Courses
        </button>
        <button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          Read more
        </button>
      </div>
 
      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
