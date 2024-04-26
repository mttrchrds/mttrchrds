import {
  Activity,
  TimelineActivity,
  GameShow,
  Creator,
  Platform,
  TimelineGameShow,
  TimelinePlatform,
} from '../types/timeline'

const parseRawPlatform = ({ id, name, image_url }: any): Platform => {
  return {
    id,
    name,
    imageUrl: image_url,
  }
}

const parseRawTimelinePlatform = ({ id, name }: any): TimelinePlatform => {
  return {
    id,
    name,
  }
}

const parseRawCreator = ({ id, name, image_url }: any): Creator => {
  return {
    id,
    name,
    imageUrl: image_url,
  }
}

const parseRawGameShow = ({
  id,
  name,
  imdb_id,
  image_url,
  thumbnail_url,
  rating,
  creator,
  categories,
}: any): GameShow => {
  return {
    id,
    name,
    imdbId: imdb_id,
    imageUrl: image_url,
    thumbnailUrl: thumbnail_url,
    rating,
    creator: parseRawCreator(creator),
    categories,
  }
}

const parseRawTimelineGameShow = ({
  id,
  name,
  thumbnail_url,
}: any): TimelineGameShow => {
  return {
    id,
    name,
    thumbnailUrl: thumbnail_url,
  }
}

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
    platform: parseRawPlatform(platform),
    gameShow: parseRawGameShow(gameShow),
  }
}

export const parseRawTimlineActivity = ({
  id,
  start_at,
  end_at,
  completed,
  game_activity,
  show_activity,
  game_platform,
  show_platform,
  activity_type,
}: any): TimelineActivity => {
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
    platform: parseRawTimelinePlatform(platform),
    gameShow: parseRawTimelineGameShow(gameShow),
  }
}
