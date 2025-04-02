"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface PodcastPlayerProps {
  episodeId: string
  title: string
  onClose: () => void
}

export default function PodcastPlayer({ episodeId, title, onClose }: PodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLIFrameElement>(null)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)

    if (audioRef.current) {
      const iframe = audioRef.current
      const message = isPlaying ? "pause" : "play"
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: message,
        }),
        "*",
      )
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    if (audioRef.current) {
      const iframe = audioRef.current
      const message = isMuted ? "unMute" : "mute"
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: message,
        }),
        "*",
      )
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioRef.current) {
      const iframe = audioRef.current
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [newVolume * 100],
        }),
        "*",
      )
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-compass-green text-compass-beige p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="hidden md:block">
            <iframe
              ref={audioRef}
              id="youtube-player"
              width="0"
              height="0"
              src={`https://www.youtube.com/embed/${episodeId}?enablejsapi=1&autoplay=0&fs=0&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="hidden"
            ></iframe>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-compass-beige hover:bg-compass-beige/10"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>

          <div className="truncate max-w-[200px] md:max-w-xs">
            <p className="font-medium truncate">{title}</p>
            <p className="text-xs text-compass-beige/70">Bitácora Podcast</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2 w-32">
            <Button
              variant="ghost"
              size="icon"
              className="text-compass-beige hover:bg-compass-beige/10"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-compass-beige text-compass-beige hover:bg-compass-beige/10"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}

