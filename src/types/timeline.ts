export interface Creator {
  id: number
  name: string
  image_url: string
}

export interface Category {
  id: number
  name: string
}

export interface GameShow {
  id: string
  name: string
  imdb_id: string
  image_url: string
  thumbnail_url: string
  rating: number
  creator: Creator
  categories: Category[]
}

export interface Platform {
  id: number
  name: string
  image_url: string
}

export interface Activity {
  id: number
  start_at: string
  end_at: string | null
  completed: boolean
  show_activity: GameShow | null
  show_platform: Platform | null
  game_activity: GameShow | null
  game_platform: Platform | null
}
