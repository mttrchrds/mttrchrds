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
  image_width: number
  image_height: number
}

export type TimelineGameShow = Pick<GameShow, 'id' | 'name' | 'thumbnail_url'>

export interface Platform {
  id: number
  name: string
  image_url: string
}

export type TimelinePlatform = Pick<Platform, 'id' | 'name'>

interface BaseActivity {
  id: number
  start_at: string
  end_at: string | null
  completed: boolean
  activity_type: 'GAME' | 'SHOW'
}

export interface Activity extends BaseActivity {
  show_activity: GameShow | null
  show_platform: Platform | null
  game_activity: GameShow | null
  game_platform: Platform | null
}

export interface TimelineActivity extends BaseActivity {
  show_activity: TimelineGameShow | null
  show_platform: TimelinePlatform | null
  game_activity: TimelineGameShow | null
  game_platform: TimelinePlatform | null
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