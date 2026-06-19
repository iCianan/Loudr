"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Repeat2, Share2, Play, MoreHorizontal } from "lucide-react"
import { type Post } from "@/lib/data"
import { cn } from "@/lib/utils"

type FeedPostProps = {
  post: Post
}

export default function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [reposted, setReposted] = useState(false)

  function handleLike() {
    setLiked(!liked)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <article className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src={post.user.avatar}
              alt={post.user.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{post.user.name}</span>
              {post.mood && (
                <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">
                  {post.mood}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">@{post.user.handle} · {post.timestamp}</span>
          </div>
        </div>
        <button aria-label="More options" className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Caption */}
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{post.caption}</p>

      {/* Track card */}
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface p-3 group cursor-pointer hover:bg-surface-raised transition-colors">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={post.track.cover}
            alt={post.track.album}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={20} className="fill-white text-white" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{post.track.title}</p>
          <p className="truncate text-xs text-muted-foreground">{post.track.artist}</p>
          <p className="truncate text-[10px] text-muted-foreground/70">{post.track.album}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-muted-foreground">
            {post.track.genre}
          </span>
          <span className="text-[10px] text-muted-foreground">{post.track.duration}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-1">
        <button
          onClick={handleLike}
          aria-label={liked ? "Unlike" : "Like"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            liked
              ? "bg-brand/10 text-brand"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Heart size={14} className={cn(liked && "fill-brand")} />
          {likeCount.toLocaleString()}
        </button>

        <button
          aria-label="Comment"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <MessageCircle size={14} />
          {post.comments}
        </button>

        <button
          onClick={() => setReposted(!reposted)}
          aria-label={reposted ? "Undo repost" : "Repost"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            reposted
              ? "text-green-400 hover:bg-green-400/10"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Repeat2 size={14} />
          {post.reposts + (reposted ? 1 : 0)}
        </button>

        <button
          aria-label="Share"
          className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <Share2 size={13} />
          Share
        </button>
      </div>
    </article>
  )
}
