"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import TopBar from "@/components/top-bar"
import NowPlayingBar from "@/components/now-playing-bar"
import FeedPage from "@/components/feed-page"
import DiscoverPage from "@/components/discover-page"
import { Music2 } from "lucide-react"

type Page = "Feed" | "Discover" | "Friends" | "Radio" | "Trending" | "Notifications" | "Settings"

function PlaceholderPage({ name }: { name: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <Music2 size={40} className="text-muted-foreground/30" />
      <p className="text-lg font-semibold text-foreground">{name}</p>
      <p className="text-sm text-muted-foreground">This section is coming soon.</p>
    </div>
  )
}

export default function Home() {
  const [activePage, setActivePage] = useState<Page>("Feed")

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Main layout row */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col">
          <Sidebar activePage={activePage} setActivePage={(p) => setActivePage(p as Page)} />
        </div>

        {/* Content column */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar activePage={activePage} />

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto">
            {activePage === "Feed" && <FeedPage />}
            {activePage === "Discover" && <DiscoverPage />}
            {activePage !== "Feed" && activePage !== "Discover" && (
              <PlaceholderPage name={activePage} />
            )}
          </main>
        </div>
      </div>

      {/* Now Playing bar */}
      <NowPlayingBar />

      {/* Spacer so content doesn't hide behind the fixed bar */}
      <div className="h-[72px] shrink-0" />
    </div>
  )
}
