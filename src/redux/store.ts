import { configureStore, combineReducers } from '@reduxjs/toolkit'
import timelineReducer from './timeline/timeline_slice'

const rootReducer = combineReducers({
  timeline: timelineReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
