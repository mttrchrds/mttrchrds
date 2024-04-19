import { Activity } from '../types/timeline'

export const parseRawActivity = ({
  id,
  start_at,
  end_at,
  completed,
  game_activity,
  show_activity,
  game_platform,
  show_platform,
  activity_type,
}: any): Activity => {
  let gameShow = game_activity
  if (show_activity) {
    gameShow = show_activity
  }
  let platform = game_platform
  if (show_platform) {
    platform = show_platform
  }
  return {
    id,
    startAt: start_at,
    endAt: end_at,
    completed,
    activityType: activity_type,
    platform,
    gameShow,
  }
}
