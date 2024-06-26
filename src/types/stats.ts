export interface GameDay {
  id: number
  name: string
  total: number
}

export interface ShowPlatformsYearsDataYear {
  name: string
  total: number
}

export interface ShowPlatformsYearsData {
  platform: string
  years: ShowPlatformsYearsDataYear[]
}

export interface ShowPlatformsYears {
  years: string[]
  highest: number
  data: ShowPlatformsYearsData[]
}
export interface GameCategory {
  id: number
  name: string
  total: number
}

export interface ActivityMonthsYears {
  name: string
  total: number
}

export interface ActivityMonthsData {
  name: string
  years: ActivityMonthsYears[]
}

export interface ActivityMonths {
  years: string[]
  data: ActivityMonthsData[]
}
