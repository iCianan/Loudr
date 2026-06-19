export type User = {
  id: string
  name: string
  handle: string
  avatar: string
  isFollowing: boolean
}

export type Track = {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  duration: string
  plays: string
  genre: string
}

export type Post = {
  id: string
  user: User
  track: Track
  caption: string
  likes: number
  comments: number
  reposts: number
  liked: boolean
  timestamp: string
  mood?: string
}

export type FriendActivity = {
  user: User
  track: Track
  status: "listening" | "just-finished" | "obsessed"
  minutesAgo: number
}

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Zara Ahmed",
    handle: "zarabeats",
    avatar: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
  {
    id: "2",
    name: "Marcus Lee",
    handle: "marcusvibes",
    avatar: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Priya Nair",
    handle: "priyasounds",
    avatar: "/placeholder.svg?height=40&width=40",
    isFollowing: false,
  },
  {
    id: "4",
    name: "Dev Patel",
    handle: "devonrepeat",
    avatar: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
  {
    id: "5",
    name: "Camille Torres",
    handle: "camillewave",
    avatar: "/placeholder.svg?height=40&width=40",
    isFollowing: false,
  },
]

export const MOCK_TRACKS: Track[] = [
  {
    id: "t1",
    title: "Redbone",
    artist: "Childish Gambino",
    album: "Awaken, My Love!",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "5:26",
    plays: "1.2B",
    genre: "Neo-Soul",
  },
  {
    id: "t2",
    title: "TPAB",
    artist: "Kendrick Lamar",
    album: "To Pimp a Butterfly",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "4:51",
    plays: "890M",
    genre: "Hip-Hop",
  },
  {
    id: "t3",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "3:14",
    plays: "2.1B",
    genre: "Alt-Pop",
  },
  {
    id: "t4",
    title: "Nights",
    artist: "Frank Ocean",
    album: "Blonde",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "5:07",
    plays: "1.5B",
    genre: "R&B",
  },
  {
    id: "t5",
    title: "Pyramids",
    artist: "Frank Ocean",
    album: "Channel Orange",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "9:53",
    plays: "620M",
    genre: "R&B",
  },
  {
    id: "t6",
    title: "Motion Sickness",
    artist: "Phoebe Bridgers",
    album: "Stranger in the Alps",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "4:01",
    plays: "310M",
    genre: "Indie Folk",
  },
  {
    id: "t7",
    title: "STAY",
    artist: "The Kid LAROI & Justin Bieber",
    album: "Single",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "2:21",
    plays: "3.0B",
    genre: "Pop",
  },
  {
    id: "t8",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    cover: "/placeholder.svg?height=300&width=300",
    duration: "3:59",
    plays: "2.5B",
    genre: "Indie Pop",
  },
]

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    user: MOCK_USERS[0],
    track: MOCK_TRACKS[0],
    caption: "This song literally doesn't miss. 3am and I'm vibing hard 🔥",
    likes: 142,
    comments: 24,
    reposts: 18,
    liked: false,
    timestamp: "2m ago",
    mood: "late night",
  },
  {
    id: "p2",
    user: MOCK_USERS[1],
    track: MOCK_TRACKS[3],
    caption: "The way the beat switches at 2:45... nobody is doing it like Frank. Sorry not sorry.",
    likes: 391,
    comments: 67,
    reposts: 55,
    liked: true,
    timestamp: "14m ago",
    mood: "chef's kiss",
  },
  {
    id: "p3",
    user: MOCK_USERS[3],
    track: MOCK_TRACKS[1],
    caption: "If you haven't listened to this album start to finish you're missing out on life.",
    likes: 876,
    comments: 112,
    reposts: 203,
    liked: false,
    timestamp: "1h ago",
    mood: "essential",
  },
  {
    id: "p4",
    user: MOCK_USERS[2],
    track: MOCK_TRACKS[7],
    caption: "My gym anthem rn. No further questions.",
    likes: 58,
    comments: 9,
    reposts: 7,
    liked: false,
    timestamp: "2h ago",
    mood: "workout mode",
  },
  {
    id: "p5",
    user: MOCK_USERS[4],
    track: MOCK_TRACKS[5],
    caption: "Discovered this on a road trip and I haven't stopped thinking about it.",
    likes: 215,
    comments: 31,
    reposts: 44,
    liked: true,
    timestamp: "4h ago",
    mood: "discovery",
  },
]

export const MOCK_FRIEND_ACTIVITY: FriendActivity[] = [
  { user: MOCK_USERS[0], track: MOCK_TRACKS[3], status: "listening", minutesAgo: 0 },
  { user: MOCK_USERS[1], track: MOCK_TRACKS[0], status: "obsessed", minutesAgo: 5 },
  { user: MOCK_USERS[3], track: MOCK_TRACKS[6], status: "just-finished", minutesAgo: 12 },
  { user: MOCK_USERS[4], track: MOCK_TRACKS[2], status: "listening", minutesAgo: 0 },
  { user: MOCK_USERS[2], track: MOCK_TRACKS[4], status: "obsessed", minutesAgo: 8 },
]

export const TRENDING_TRACKS = MOCK_TRACKS.slice(0, 6)

export const DISCOVERY_TRACKS: (Track & { reason: string; matchScore: number })[] = [
  { ...MOCK_TRACKS[4], reason: "Because you liked Frank Ocean", matchScore: 97 },
  { ...MOCK_TRACKS[5], reason: "Friends in your network play this", matchScore: 91 },
  { ...MOCK_TRACKS[7], reason: "Trending in Indie Pop", matchScore: 88 },
  { ...MOCK_TRACKS[2], reason: "Based on your recent plays", matchScore: 84 },
  { ...MOCK_TRACKS[6], reason: "Similar energy to your top track", matchScore: 79 },
  { ...MOCK_TRACKS[1], reason: "Critically acclaimed, you'd love it", matchScore: 76 },
]

export const MY_NOW_PLAYING: Track = MOCK_TRACKS[3]
