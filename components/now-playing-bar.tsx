"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  Repeat2,
  Shuffle,
} from "lucide-react"
import { MY_NOW_PLAYING } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function NowPlayingBar() {
  const [playing, setPlaying] = useState(true)
  const [liked, setLiked] = useState(false)
  const [progress, setProgress] = useState(38)

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-now-playing-bg backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-screen-2xl items-center gap-4 px-4 md:px-6">
        {/* Track info */}
        <div className="flex w-64 shrink-0 items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md">
            <Image
              src={MY_NOW_PLAYING.cover}
              alt={MY_NOW_PLAYING.album}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {MY_NOW_PLAYING.title}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {MY_NOW_PLAYING.artist}
            </p>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            aria-label={liked ? "Unlike" : "Like"}
            className="ml-1 shrink-0"
          >
            <Heart
              size={16}
              className={cn(
                "transition-colors",
                liked ? "fill-brand text-brand" : "text-muted-foreground hover:text-foreground"
              )}
            />
          </button>
        </div>

        {/* Center controls */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-5">
            <button aria-label="Shuffle" className="text-muted-foreground hover:text-foreground transition-colors">
              <Shuffle size={15} />
            </button>
            <button aria-label="Previous" className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack size={18} />
            </button>
            <button
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying(!playing)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button aria-label="Next" className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward size={18} />
            </button>
            <button aria-label="Repeat" className="text-muted-foreground hover:text-foreground transition-colors">
              <Repeat2 size={15} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="w-8 text-right text-[10px] text-muted-foreground">2:02</span>
            <div
              className="relative h-1 flex-1 cursor-pointer rounded-full bg-border"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100)
                setProgress(pct)
              }}
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-8 text-[10px] text-muted-foreground">{MY_NOW_PLAYING.duration}</span>
          </div>
        </div>

        {/* Right controls */}
        <div className="hidden w-48 shrink-0 items-center justify-end gap-3 md:flex">
          <button aria-label="Share now playing" className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
            <Share2 size={12} />
            Brag
          </button>
          <Volume2 size={16} className="text-muted-foreground" />
          <div className="h-1 w-24 rounded-full bg-border">
            <div className="h-full w-3/4 rounded-full bg-muted-foreground" />
          </div>
        </div>
      </div>
    </footer>
  )
}
