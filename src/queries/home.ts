import { queryOptions } from '@tanstack/react-query'

export const latestGames = queryOptions({
  queryKey: ['latest-games'],
  queryFn: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/latest-games`,
    )
    if (!response.ok) {
      throw new Error('Data could not be loaded')
    }
    return response.json()
  },
})

export const latestShows = queryOptions({
  queryKey: ['latest-shows'],
  queryFn: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/latest-shows`,
    )
    if (!response.ok) {
      throw new Error('Data could not be loaded')
    }
    return response.json()
  },
})