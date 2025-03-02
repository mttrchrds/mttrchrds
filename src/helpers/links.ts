import { StatsType } from '../helpers/enums'

export const buildLink = {
  stats: (stat: StatsType) => `/stats/${stat}`,
}
