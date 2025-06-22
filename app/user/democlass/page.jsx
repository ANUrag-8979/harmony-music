"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import VideoPlayer from "@/components/video-player"

function VideoPlayerContent() {
  const searchParams = useSearchParams()
  const [currentVideo, setCurrentVideo] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const videoParam = searchParams.get("demoVideoUrl")
    console.log("Video param:", videoParam)

    if (videoParam) {
      try {
        const decodedUrl = decodeURIComponent(videoParam)
        //const decodedUrl = "https://www.youtube.com/watch?v=9JDSGhhiOwI"
        // Basic URL validation
        new URL(decodedUrl)
        setCurrentVideo(decodedUrl)
        setIsValidUrl(true)
      } catch (error) {
        console.error("Invalid video URL:", error)
        setIsValidUrl(false)
      }
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!currentVideo && !isValidUrl) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Video Player</h1>
            <p className="text-orange-200 text-lg mb-6">No video URL provided in parameters</p>
            <div className="bg-zinc-900 border border-orange-500/30 rounded-lg p-6 text-left">
              <h3 className="text-orange-400 font-semibold mb-3">Usage:</h3>
              <code className="text-sm text-orange-200 block mb-2">?demoVideoUrl=https://example.com/video.mp4</code>
              <code className="text-sm text-orange-200 block">?video=https://example.com/video.mp4</code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-6">
        <div className="mt-28 max-w-6xl mx-auto">
          <VideoPlayer src={currentVideo} />
        </div>
      </div>
    </div>
  )
}

export default function VideoPlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      }
    >
      <VideoPlayerContent />
    </Suspense>
  )
}
