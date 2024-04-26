import { ActivityType } from '../helpers/enums'

export interface Creator {
  id: number
  name: string
  imageUrl: string
}

export interface Category {
  id: number
  name: string
}

export interface GameShow {
  id: number
  name: string
  imdbId: string
  imageUrl: string
  thumbnailUrl: string
  rating: number
  creator: Creator
  categories: Category[]
}

export type TimelineGameShow = Pick<GameShow, 'id' | 'name' | 'thumbnailUrl'>

export interface Platform {
  id: number
  name: string
  imageUrl: string
}

export type TimelinePlatform = Pick<Platform, 'id' | 'name'>

export interface Activity {
  id: number
  startAt: string
  endAt: string | null
  completed: boolean
  gameShow: GameShow
  platform: Platform
  activityType: ActivityType
}

export interface TimelineActivity {
  id: number
  startAt: string
  endAt: string | null
  completed: boolean
  gameShow: TimelineGameShow
  platform: TimelinePlatform
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
