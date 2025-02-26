import { StatsType } from '../helpers/enums'

export const buildLink = {
  stats: (stat: StatsType) => `/stats/${stat}`,
}

export const homePaths = {
  news: '',
  projects: 'projects',
  games: 'games',
  shows: 'shows',
}