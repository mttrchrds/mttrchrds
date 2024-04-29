import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { GameDay } from '../../types/stats'

import { StatsGameTab, StatsTab } from '../../helpers/enums'

interface Stats {
  gameDays: GameDay[]
  chartLoading: boolean
  activeTab: StatsTab
  activeGameTab: StatsGameTab
}

const initialState: Stats = {
  gameDays: [],
  chartLoading: false,
  activeTab: StatsTab.GAME,
  activeGameTab: StatsGameTab.GAME_DAYS,
}

export const loadGameDays = createAsyncThunk('gameDays/load', async () => {
  const response = await axios
    .get(
      /* eslint-disable-next-line no-undef */
      `${import.meta.env.VITE_API_DOMAIN}/api/stats-game-days`,
    )
    .then(apiResponse => apiResponse)
  return response.data
})

export const statsSlice = createSlice({
  name: 'stats',
  reducers: {
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    updateActiveGameTab: (state, action) => {
      state.activeGameTab = action.payload
    },
  },
  initialState,
  extraReducers: builder => {
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
      })
  },
})

export const { updateActiveTab, updateActiveGameTab } = statsSlice.actions

export default statsSlice.reducer
