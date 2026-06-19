"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Flame, Clock, Users, TrendingUp, Radio } from "lucide-react"
import FeedPost from "@/components/feed-post"
import { MOCK_POSTS, MOCK_FRIEND_ACTIVITY } from "@/lib/data"

const FILTER_TABS = [
  { label: "For You", icon: Flame },
  { label: "Friends", icon: Users },
  { label: "Trending", icon: TrendingUp },
  { label: "Recent", icon: Clock },
  { label: "Radio", icon: Radio },
]

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("For You")

  return (
    <div className="flex gap-6 p-6">
      {/* Main feed */}
      <div className="min-w-0 flex-1">
        {/* Search bar */}
        <div className="relative mb-5">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tracks, artists, friends..."
            className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
          />
        </div>

        {/* Filter tabs */}
        <div className="mb-5 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.label}
                onClick={() => setActiveFilter(tab.label)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === tab.label
                    ? "bg-brand text-brand-foreground"
                    : "bg-surface text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Create post */}
        <div className="mb-5 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src="/placeholder.svg?height=36&width=36"
                alt="Your avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <button className="flex-1 rounded-lg bg-surface px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-surface-raised transition-colors">
              What are you listening to right now?
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              + Add Track
            </button>
            <button className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              Add Mood
            </button>
            <button className="ml-auto rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-brand-foreground hover:opacity-90 transition-opacity">
              Brag
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {MOCK_POSTS.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="hidden w-72 shrink-0 lg:block">
        {/* Friends activity */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Friends Activity</h2>
          <ul className="space-y-3">
            {MOCK_FRIEND_ACTIVITY.map((activity) => (
              <li key={activity.user.id} className="flex items-center gap-3">
                <div className="relative h-9 w-9 shrink-0">
                  <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {activity.status === "listening" && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-green-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">
                    {activity.user.name}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {activity.track.title} — {activity.track.artist}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                    activity.status === "listening"
                      ? "bg-green-500/15 text-green-400"
                      : activity.status === "obsessed"
                      ? "bg-brand/15 text-brand"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {activity.status === "listening"
                    ? "Live"
                    : activity.status === "obsessed"
                    ? "Obsessed"
                    : "Finished"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending genres */}
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Trending Genres</h2>
          <ul className="space-y-2">
            {["Hip-Hop", "R&B", "Indie Pop", "Alt-Pop", "Neo-Soul", "Indie Folk"].map((genre, i) => (
              <li key={genre} className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-accent transition-colors">
                <span className="w-4 text-right text-[11px] font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-foreground">{genre}</span>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${100 - i * 13}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
