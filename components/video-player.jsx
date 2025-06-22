"use client"

import { useState, useRef, useEffect, useCallback } from "react"

export default function VideoPlayer({ src }) {
  // Refs
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const progressSliderRef = useRef(null)
  const volumeSliderRef = useRef(null)

  // Video state
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoading: true,
    isBuffering: false,
    hasError: false,
    errorMessage: "",
  })

  // Player controls state
  const [controls, setControls] = useState({
    showControls: true,
    isFullscreen: false,
    isDraggingProgress: false,
    isDraggingVolume: false,
    dragProgress: 0,
    dragVolume: 100,
  })

  // Video source detection
  const [videoSource, setVideoSource] = useState({
    isYouTube: false,
    embedUrl: "",
    originalUrl: src,
  })

  const controlsTimeoutRef = useRef(null)
  const animationFrameRef = useRef(null)

  // YouTube URL detection and conversion
  const detectVideoSource = useCallback((url) => {
    if (!url) {
      return {
        isYouTube: false,
        embedUrl: "",
        originalUrl: url,
      }
    }

    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = url.match(youtubeRegex)

    if (match && match[1]) {
      const videoId = match[1]
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&origin=${window.location.origin}`

      return {
        isYouTube: true,
        embedUrl,
        originalUrl: url,
      }
    }

    return {
      isYouTube: false,
      embedUrl: "",
      originalUrl: url,
    }
  }, [])

  // Initialize video source
  useEffect(() => {
    const source = detectVideoSource(src)
    setVideoSource(source)

    setVideoState((prev) => ({
      ...prev,
      isLoading: !source.isYouTube,
      hasError: false,
      errorMessage: "",
      currentTime: 0,
      duration: 0,
      isPlaying: false,
    }))

    if (source.isYouTube) {
      setVideoState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [src, detectVideoSource])

  // High-frequency time updates for smooth progress
  const updateVideoTime = useCallback(() => {
    const video = videoRef.current
    if (!video || videoSource.isYouTube || controls.isDraggingProgress) return

    setVideoState((prev) => ({
      ...prev,
      currentTime: video.currentTime,
    }))

    if (videoState.isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateVideoTime)
    }
  }, [videoSource.isYouTube, controls.isDraggingProgress, videoState.isPlaying])

  // Start/stop smooth time updates
  useEffect(() => {
    if (videoState.isPlaying && !videoSource.isYouTube) {
      animationFrameRef.current = requestAnimationFrame(updateVideoTime)
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [videoState.isPlaying, videoSource.isYouTube, updateVideoTime])

  // Video event handlers
  const handleVideoEvents = useCallback(() => {
    const video = videoRef.current
    if (!video || videoSource.isYouTube) return

    const updateVideoState = (updates) => {
      setVideoState((prev) => ({ ...prev, ...updates }))
    }

    const onLoadedMetadata = () => {
      updateVideoState({
        duration: video.duration,
        isLoading: false,
        hasError: false,
      })
    }

    const onPlay = () => {
      updateVideoState({ isPlaying: true, isBuffering: false })
    }

    const onPause = () => {
      updateVideoState({ isPlaying: false })
    }

    const onWaiting = () => {
      updateVideoState({ isBuffering: true })
    }

    const onCanPlay = () => {
      updateVideoState({ isBuffering: false })
    }

    const onError = () => {
      updateVideoState({
        hasError: true,
        errorMessage: "Failed to load video. Please check the URL or try a different video.",
        isLoading: false,
        isBuffering: false,
      })
    }

    const onLoadStart = () => {
      updateVideoState({ isLoading: true, hasError: false })
    }

    const onVolumeChange = () => {
      if (!controls.isDraggingVolume) {
        updateVideoState({
          volume: video.volume,
          isMuted: video.muted,
        })
      }
    }

    const onSeeked = () => {
      updateVideoState({ currentTime: video.currentTime })
    }

    // Add event listeners
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("canplay", onCanPlay)
    video.addEventListener("error", onError)
    video.addEventListener("loadstart", onLoadStart)
    video.addEventListener("volumechange", onVolumeChange)
    video.addEventListener("seeked", onSeeked)

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("canplay", onCanPlay)
      video.removeEventListener("error", onError)
      video.removeEventListener("loadstart", onLoadStart)
      video.removeEventListener("volumechange", onVolumeChange)
      video.removeEventListener("seeked", onSeeked)
    }
  }, [videoSource.isYouTube, controls.isDraggingVolume])

  // Setup video events
  useEffect(() => {
    const cleanup = handleVideoEvents()
    return cleanup
  }, [handleVideoEvents])

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setControls((prev) => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement,
      }))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Progress slider handlers with immediate visual feedback
  const handleProgressMouseDown = useCallback(() => {
    setControls((prev) => ({ ...prev, isDraggingProgress: true }))
  }, [])

  const handleProgressMouseUp = useCallback(() => {
    setControls((prev) => ({ ...prev, isDraggingProgress: false }))
  }, [])

  const handleProgressChange = useCallback(
    (event) => {
      if (videoSource.isYouTube) return

      const value = Number.parseFloat(event.target.value)
      setControls((prev) => ({ ...prev, dragProgress: value }))

      const video = videoRef.current
      if (!video || !videoState.duration) return

      const seekTime = (value / 100) * videoState.duration

      // Immediate visual feedback
      setVideoState((prev) => ({ ...prev, currentTime: seekTime }))

      // Actual video seeking
      video.currentTime = seekTime
    },
    [videoSource.isYouTube, videoState.duration],
  )

  // Volume slider handlers with immediate visual feedback
  const handleVolumeMouseDown = useCallback(() => {
    setControls((prev) => ({ ...prev, isDraggingVolume: true }))
  }, [])

  const handleVolumeMouseUp = useCallback(() => {
    setControls((prev) => ({ ...prev, isDraggingVolume: false }))
  }, [])

  const handleVolumeChange = useCallback(
    (event) => {
      if (videoSource.isYouTube) return

      const value = Number.parseFloat(event.target.value)
      const newVolume = value / 100

      // Immediate visual feedback
      setControls((prev) => ({ ...prev, dragVolume: value }))
      setVideoState((prev) => ({
        ...prev,
        volume: newVolume,
        isMuted: newVolume === 0,
      }))

      const video = videoRef.current
      if (!video) return

      // Actual volume change
      video.volume = newVolume
      video.muted = newVolume === 0
    },
    [videoSource.isYouTube],
  )

  // Control functions
  const togglePlay = useCallback(async () => {
    if (videoSource.isYouTube) return

    const video = videoRef.current
    if (!video) return

    try {
      if (videoState.isPlaying) {
        await video.pause()
      } else {
        await video.play()
      }
    } catch (error) {
      setVideoState((prev) => ({
        ...prev,
        hasError: true,
        errorMessage: `Playback failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      }))
    }
  }, [videoSource.isYouTube, videoState.isPlaying])

  const toggleMute = useCallback(() => {
    if (videoSource.isYouTube) return

    const video = videoRef.current
    if (!video) return

    const newMutedState = !video.muted
    video.muted = newMutedState

    // Immediate visual feedback
    setVideoState((prev) => ({ ...prev, isMuted: newMutedState }))
  }, [videoSource.isYouTube])

  const toggleFullscreen = useCallback(async () => {
    const element = containerRef.current
    if (!element) return

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error)
    }
  }, [])

  // Controls visibility
  const showControls = useCallback(() => {
    setControls((prev) => ({ ...prev, showControls: true }))

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (videoState.isPlaying && !videoSource.isYouTube) {
        setControls((prev) => ({ ...prev, showControls: false }))
      }
    }, 3000)
  }, [videoState.isPlaying, videoSource.isYouTube])

  const hideControls = useCallback(() => {
    if (videoState.isPlaying && !videoSource.isYouTube && !controls.isDraggingProgress && !controls.isDraggingVolume) {
      setControls((prev) => ({ ...prev, showControls: false }))
    }
  }, [videoState.isPlaying, videoSource.isYouTube, controls.isDraggingProgress, controls.isDraggingVolume])

  // Utility functions
  const formatTime = useCallback((seconds) => {
    if (!seconds || !isFinite(seconds)) return "0:00"

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }, [])

  // Calculate progress with drag state consideration
  const getProgress = useCallback(() => {
    if (controls.isDraggingProgress) {
      return controls.dragProgress
    }
    if (!videoState.duration) return 0
    return (videoState.currentTime / videoState.duration) * 100
  }, [videoState.currentTime, videoState.duration, controls.isDraggingProgress, controls.dragProgress])

  // Calculate volume with drag state consideration
  const getVolumeDisplay = useCallback(() => {
    if (controls.isDraggingVolume) {
      return controls.dragVolume
    }
    return videoState.isMuted ? 0 : videoState.volume * 100
  }, [videoState.volume, videoState.isMuted, controls.isDraggingVolume, controls.dragVolume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Global mouse event listeners for drag operations
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (controls.isDraggingProgress) {
        handleProgressMouseUp()
      }
      if (controls.isDraggingVolume) {
        handleVolumeMouseUp()
      }
    }

    if (controls.isDraggingProgress || controls.isDraggingVolume) {
      document.addEventListener("mouseup", handleGlobalMouseUp)
      document.addEventListener("mouseleave", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      document.removeEventListener("mouseleave", handleGlobalMouseUp)
    }
  }, [controls.isDraggingProgress, controls.isDraggingVolume, handleProgressMouseUp, handleVolumeMouseUp])

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-orange-500/20"
        onMouseMove={showControls}
        onMouseLeave={hideControls}
        style={{
          boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.25), 0 0 0 1px rgba(234, 88, 12, 0.1)",
        }}
      >
        {/* Regular Video Element */}
        {!videoSource.isYouTube && src && (
          <video
            ref={videoRef}
            src={src}
            className="w-full aspect-video cursor-pointer"
            onClick={togglePlay}
            preload="metadata"
            crossOrigin="anonymous"
            playsInline
          />
        )}

        {/* YouTube Iframe */}
        {videoSource.isYouTube && videoSource.embedUrl && (
          <iframe
            src={videoSource.embedUrl}
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="YouTube Video Player"
            loading="lazy"
          />
        )}

        {/* No Video Placeholder */}
        {!src && (
          <div className="w-full aspect-video bg-zinc-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="text-orange-200 text-lg">No video source provided</div>
              <div className="text-orange-400 text-sm mt-1">Add a video URL to get started</div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {videoState.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-500/30 rounded-full animate-spin border-t-orange-500" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-orange-500/50" />
              </div>
              <div className="text-orange-200 font-medium">Loading video...</div>
            </div>
          </div>
        )}

        {/* Buffering Overlay */}
        {videoState.isBuffering && !videoState.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-30">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-orange-500/30 rounded-full animate-spin border-t-orange-500" />
              <div className="text-orange-200 font-medium">Buffering...</div>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {videoState.hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="text-red-400 text-lg font-semibold mb-2">Video Error</div>
              <div className="text-orange-200 text-sm">{videoState.errorMessage}</div>
            </div>
          </div>
        )}

        {/* Controls Overlay - Only for regular videos */}
        {!videoSource.isYouTube && src && !videoState.hasError && (
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              controls.showControls || controls.isDraggingProgress || controls.isDraggingVolume
                ? "opacity-100"
                : "opacity-0"
            } z-20`}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="group relative w-20 h-20 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-orange-100 hover:bg-black/90 transition-all duration-300 border border-orange-500/30 hover:border-orange-500/60"
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(234, 88, 12, 0.2)",
                }}
                aria-label={videoState.isPlaying ? "Pause video" : "Play video"}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {videoState.isPlaying ? (
                  <svg className="w-10 h-10 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Progress Bar - Fixed Alignment */}
              <div className="mb-6 group">
                <div className="relative flex items-center h-2">
                  {/* Background Track */}
                  <div className="absolute inset-0 bg-black/50 rounded-full backdrop-blur-sm" />

                  {/* Progress Fill */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full pointer-events-none"
                    style={{
                      width: `${getProgress()}%`,
                      transition: controls.isDraggingProgress ? "none" : "width 0.1s ease",
                    }}
                  />

                  {/* Slider Input - Perfectly Aligned */}
                  <input
                    ref={progressSliderRef}
                    type="range"
                    min="0"
                    max="100"
                    value={getProgress()}
                    onChange={handleProgressChange}
                    onMouseDown={handleProgressMouseDown}
                    onMouseUp={handleProgressMouseUp}
                    className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent progress-slider"
                    aria-label="Video progress"
                    style={{
                      margin: 0,
                      padding: 0,
                      transition: controls.isDraggingProgress ? "none" : "all 0.1s ease",
                    }}
                  />

                  {/* Progress Dot - Perfectly Centered */}
                  <div
                    className={`absolute w-4 h-4 bg-orange-500 rounded-full shadow-lg transition-all duration-200 border-2 border-white pointer-events-none ${
                      controls.isDraggingProgress || controls.showControls
                        ? "opacity-100 scale-110"
                        : "opacity-0 scale-100"
                    }`}
                    style={{
                      left: `calc(${getProgress()}% - 8px)`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      transition: controls.isDraggingProgress
                        ? "left 0.05s ease, opacity 0.2s ease, transform 0.2s ease"
                        : "all 0.2s ease",
                    }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-orange-100">
                <div className="flex items-center space-x-6">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-2 hover:text-orange-400 transition-colors duration-200 hover:bg-white/10 rounded-lg"
                    aria-label={videoState.isPlaying ? "Pause" : "Play"}
                  >
                    {videoState.isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Volume Control - Fixed Alignment */}
                  <div className="flex items-center space-x-3 group">
                    <button
                      onClick={toggleMute}
                      className="p-2 hover:text-orange-400 transition-colors duration-200 hover:bg-white/10 rounded-lg"
                      aria-label={videoState.isMuted ? "Unmute" : "Mute"}
                    >
                      {videoState.isMuted || videoState.volume === 0 ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>

                    {/* Volume Slider Container - Fixed Height */}
                    <div className="relative flex items-center h-1 w-24">
                      {/* Background Track */}
                      <div className="absolute inset-0 bg-black/50 rounded-full backdrop-blur-sm" />

                      {/* Volume Fill */}
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full pointer-events-none"
                        style={{
                          width: `${getVolumeDisplay()}%`,
                          transition: controls.isDraggingVolume ? "none" : "width 0.1s ease",
                        }}
                      />

                      {/* Volume Slider Input - Perfectly Aligned */}
                      <input
                        ref={volumeSliderRef}
                        type="range"
                        min="0"
                        max="100"
                        value={getVolumeDisplay()}
                        onChange={handleVolumeChange}
                        onMouseDown={handleVolumeMouseDown}
                        onMouseUp={handleVolumeMouseUp}
                        className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent volume-slider"
                        aria-label="Volume"
                        style={{
                          margin: 0,
                          padding: 0,
                          transition: controls.isDraggingVolume ? "none" : "all 0.1s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <div className="text-sm font-mono bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm border border-orange-500/20">
                    <span className="text-orange-200">{formatTime(videoState.currentTime)}</span>
                    <span className="text-orange-400 mx-1">/</span>
                    <span className="text-orange-300">{formatTime(videoState.duration)}</span>
                  </div>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:text-orange-400 transition-colors duration-200 hover:bg-white/10 rounded-lg"
                  aria-label={controls.isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {controls.isFullscreen ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles - Fixed Alignment Issues */}
      <style jsx>{`
        .progress-slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
        }

        .progress-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
        }

        .volume-slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
        }

        /* Remove default track styling */
        .progress-slider::-webkit-slider-track {
          background: transparent;
          border: none;
          height: 100%;
        }

        .volume-slider::-webkit-slider-track {
          background: transparent;
          border: none;
          height: 100%;
        }

        .progress-slider::-moz-range-track {
          background: transparent;
          border: none;
          height: 100%;
        }

        .volume-slider::-moz-range-track {
          background: transparent;
          border: none;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
