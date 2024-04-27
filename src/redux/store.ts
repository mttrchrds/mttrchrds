import { configureStore, combineReducers } from '@reduxjs/toolkit'
import latestGamesReducer from './latest_games/latest_games_slice'
import latestShowsReducer from './latest_shows/latest_shows_slice'
import timelineReducer from './timeline/timeline_slice'
import statsReducer from './stats/stats_slice'

const rootReducer = combineReducers({
  latestGames: latestGamesReducer,
  latestShows: latestShowsReducer,
  timeline: timelineReducer,
  stats: statsReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
