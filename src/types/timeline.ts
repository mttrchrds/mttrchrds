import { ActivityType } from '../helpers/enums'

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
  id: number
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
  startAt: string
  endAt: string | null
  completed: boolean
  gameShow: GameShow
  platform: Platform
  activityType: ActivityType
}

export interface ActivityRaw {
  id: number
  start_at: string
  end_at: string | null
  completed: boolean
  show_activity: GameShow | null
  show_platform: Platform | null
  game_activity: GameShow | null
  game_platform: Platform | null
  activity_type: ActivityType
}
