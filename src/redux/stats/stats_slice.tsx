import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  GameDay,
  ShowPlatformsYears,
  GameCategory,
  ActivityMonths,
} from '../../types/stats'

import { StatsType } from '../../helpers/enums'

interface Stats {
  activityMonths: ActivityMonths
  gameCategories: GameCategory[]
  showPlatformsYears: ShowPlatformsYears
  gameDays: GameDay[]
  chartLoading: boolean
}

const initialState: Stats = {
  activityMonths: {
    years: [],
    data: [],
  },
  gameCategories: [],
  showPlatformsYears: {
    years: [],
    highest: 0,
    data: [],
  },
  gameDays: [],
  chartLoading: false,
}

export const loadActivityMonths = createAsyncThunk(
  'activityMonths/load',
  async () => {
    const response = await axios
      .get(
        /* eslint-disable-next-line no-undef */
        `${import.meta.env.VITE_API_DOMAIN}/api/stats-activity-months`,
      )
      .then(apiResponse => apiResponse)
    return response.data
  },
)

export const loadGameCategories = createAsyncThunk(
  'gameCategories/load',
  async () => {
    const response = await axios
      .get(
        /* eslint-disable-next-line no-undef */
        `${import.meta.env.VITE_API_DOMAIN}/api/stats-game-categories`,
      )
      .then(apiResponse => apiResponse)
    return response.data
  },
)

export const loadGameDays = createAsyncThunk('gameDays/load', async () => {
  const response = await axios
    .get(
      /* eslint-disable-next-line no-undef */
      `${import.meta.env.VITE_API_DOMAIN}/api/stats-game-days`,
    )
    .then(apiResponse => apiResponse)
  return response.data
})

export const loadShowPlatformsYears = createAsyncThunk(
  'showPlatformsYears/load',
  async () => {
    const response = await axios
      .get(
        /* eslint-disable-next-line no-undef */
        `${import.meta.env.VITE_API_DOMAIN}/api/stats-show-platforms-years`,
      )
      .then(apiResponse => apiResponse)
    return response.data
  },
)

export const statsSlice = createSlice({
  name: 'stats',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadActivityMonths.pending, state => {
        state.chartLoading = true
      })
      .addCase(loadActivityMonths.rejected, (state, error) => {
        console.log('error loading stats activity months', error)
      })
      .addCase(loadActivityMonths.fulfilled, (state, action) => {
        state.chartLoading = false
        state.activityMonths = action.payload
      }),
      builder
        .addCase(loadGameCategories.pending, state => {
          state.chartLoading = true
        })
        .addCase(loadGameCategories.rejected, (state, error) => {
          console.log('error loading stats game categories', error)
        })
        .addCase(loadGameCategories.fulfilled, (state, action) => {
          state.chartLoading = false
          state.gameCategories = action.payload
        }),
      builder
        .addCase(loadGameDays.pending, state => {
          state.chartLoading = true
        })
        .addCase(loadGameDays.rejected, (state, error) => {
          console.log('error loading stats game days', error)
        })
        .addCase(loadGameDays.fulfilled, (state, action) => {
          state.chartLoading = false
          state.gameDays = action.payload
        }),
      builder
        .addCase(loadShowPlatformsYears.pending, state => {
          state.chartLoading = true
        })
        .addCase(loadShowPlatformsYears.rejected, (state, error) => {
          console.log('error loading stats show platforms years', error)
        })
        .addCase(loadShowPlatformsYears.fulfilled, (state, action) => {
          state.chartLoading = false
          state.showPlatformsYears = action.payload
        })
  },
})

export default statsSlice.reducer
