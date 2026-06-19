"use client"

import Image from "next/image"
import { Bell, Search } from "lucide-react"

type TopBarProps = {
  activePage: string
}

export default function TopBar({ activePage }: TopBarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-sidebar px-6">
      <h1 className="text-base font-semibold text-foreground">{activePage}</h1>

      <div className="flex items-center gap-3">
        {/* Mobile search */}
        <button
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted-foreground hover:text-foreground transition-colors md:hidden"
        >
          <Search size={15} />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell size={15} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand" />
        </button>

        {/* Avatar */}
        <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 border-brand">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Your profile"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  )
}
