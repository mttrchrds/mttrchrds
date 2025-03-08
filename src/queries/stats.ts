import { queryOptions } from '@tanstack/react-query'

export const activityMonths = queryOptions({
  queryKey: ['stats-activity-months'],
  queryFn: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/stats-activity-months`,
    )
    if (!response.ok) {
      throw new Error('Data could not be loaded')
    }
    return response.json()
  },
})

export const gameCategories = queryOptions({
  queryKey: ['stats-game-categories'],
  queryFn: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/stats-game-categories`,
    )
    if (!response.ok) {
      throw new Error('Data could not be loaded')
    }
    return response.json()
  },
})

export const gameDays = queryOptions({
  queryKey: ['stats-game-days'],
  queryFn: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/stats-game-days`,
    )
    if (!response.ok) {
      throw new Error('Data could not be loaded')
    }
    return response.json()
  },
})

export const showPlatformsYears = queryOptions({
  queryKey: ['stats-show-platforms-years'],
  queryFn: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/stats-show-platforms-years`,
    )
    if (!response.ok) {
      throw new Error('Data could not be loaded')
    }
    return response.json()
  },
})
