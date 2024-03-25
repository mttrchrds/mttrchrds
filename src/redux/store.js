import { configureStore, combineReducers } from '@reduxjs/toolkit'
import latestGamesReducer from './latest_games/latest_games_slice'
import latestShowsReducer from './latest_shows/latest_shows_slice'
import timelineReducer from './timeline/timeline_slice'

const rootReducer = combineReducers({
  latestGames: latestGamesReducer,
  latestShows: latestShowsReducer,
  timeline: timelineReducer,
})

export const setupStore = preloadedState =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })
