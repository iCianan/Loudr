"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Home,
  Compass,
  Users,
  Radio,
  TrendingUp,
  Bell,
  Settings,
  Music2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MOCK_FRIEND_ACTIVITY } from "@/lib/data"

type NavItem = {
  label: string
  icon: React.ElementType
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  { label: "Feed", icon: Home },
  { label: "Discover", icon: Compass },
  { label: "Friends", icon: Users, badge: 3 },
  { label: "Radio", icon: Radio },
  { label: "Trending", icon: TrendingUp },
  { label: "Notifications", icon: Bell, badge: 7 },
  { label: "Settings", icon: Settings },
]

type SidebarProps = {
  activePage: string
  setActivePage: (page: string) => void
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
          <Music2 size={16} className="text-brand-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">What Up Doe</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand text-brand-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {item.badge && !isActive && (
                <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Friends listening now */}
      <div className="border-t border-border px-3 py-4">
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Listening Now
        </p>
        <ul className="space-y-2">
          {MOCK_FRIEND_ACTIVITY.slice(0, 4).map((activity) => (
            <li key={activity.user.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-accent cursor-pointer">
              <div className="relative h-7 w-7 shrink-0">
                <Image
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  fill
                  className="rounded-full object-cover"
                />
                {activity.status === "listening" && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-green-500" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">
                  {activity.user.name.split(" ")[0]}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {activity.track.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
