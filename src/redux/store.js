import { configureStore } from '@reduxjs/toolkit'
import latestGamesReducer from './latest_games/latest_games_slice'
import latestShowsReducer from './latest_shows/latest_shows_slice'

export const store = configureStore({
  reducer: {
    latestGames: latestGamesReducer,
    latestShows: latestShowsReducer,
  },
})
