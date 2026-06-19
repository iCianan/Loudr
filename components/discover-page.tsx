"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Plus, Heart, ChevronRight, Sparkles, TrendingUp, Users } from "lucide-react"
import { DISCOVERY_TRACKS, TRENDING_TRACKS, MOCK_USERS } from "@/lib/data"
import { cn } from "@/lib/utils"

type DiscoverSection = "for-you" | "trending" | "from-friends"

export default function DiscoverPage() {
  const [section, setSection] = useState<DiscoverSection>("for-you")
  const [savedTracks, setSavedTracks] = useState<Set<string>>(new Set())

  function toggleSave(id: string) {
    setSavedTracks((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="p-6">
      {/* Hero banner */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-surface-raised p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">
              Discover
            </p>
            <h1 className="mt-1 text-2xl font-bold text-balance text-foreground">
              Music picked just for you
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
              Based on your plays, your friends&apos; taste, and what&apos;s hot right now.
            </p>
          </div>
          <Sparkles size={40} className="hidden text-brand/30 md:block" />
        </div>

        {/* Section tabs */}
        <div className="mt-5 flex gap-2">
          {(
            [
              { key: "for-you", label: "For You", icon: Sparkles },
              { key: "trending", label: "Trending", icon: TrendingUp },
              { key: "from-friends", label: "From Friends", icon: Users },
            ] as { key: DiscoverSection; label: string; icon: React.ElementType }[]
          ).map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setSection(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  section === tab.key
                    ? "bg-brand text-brand-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Discovery grid */}
      <section aria-label="Recommended tracks">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            {section === "for-you"
              ? "Recommended for You"
              : section === "trending"
              ? "Trending This Week"
              : "Friends are Playing"}
          </h2>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-brand transition-colors">
            See all <ChevronRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {(section === "trending" ? TRENDING_TRACKS.map((t) => ({
            ...t, reason: "Trending globally", matchScore: 0,
          })) : DISCOVERY_TRACKS).map((track, i) => (
            <article
              key={track.id + i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-border/60 hover:bg-card/80"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={track.cover}
                    alt={track.album}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    aria-label={`Play ${track.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play size={22} className="fill-white text-white" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{track.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
                  <p className="mt-1 truncate text-[11px] text-muted-foreground/70">{track.album}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleSave(track.id + i)}
                    aria-label="Save track"
                    className={cn(
                      "transition-colors",
                      savedTracks.has(track.id + i)
                        ? "text-brand"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Heart
                      size={15}
                      className={cn(savedTracks.has(track.id + i) && "fill-brand")}
                    />
                  </button>
                  <button
                    aria-label="Add to playlist"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-muted-foreground">
                  {track.genre}
                </span>
                {"reason" in track && track.reason && (
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground/80">
                    <Sparkles size={9} className="text-brand" />
                    {track.reason}
                  </p>
                )}
                {"matchScore" in track && track.matchScore > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${track.matchScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-brand">{track.matchScore}%</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Suggested friends */}
      <section aria-label="Suggested friends" className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">People with Great Taste</h2>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-brand transition-colors">
            See all <ChevronRight size={13} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {MOCK_USERS.map((user) => (
            <div
              key={user.id}
              className="flex w-40 shrink-0 flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
            >
              <div className="relative h-12 w-12">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-[11px] text-muted-foreground">@{user.handle}</p>
              </div>
              <button
                className={cn(
                  "w-full rounded-full py-1.5 text-xs font-semibold transition-colors",
                  user.isFollowing
                    ? "border border-border bg-transparent text-muted-foreground hover:border-brand hover:text-brand"
                    : "bg-brand text-brand-foreground hover:opacity-90"
                )}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
