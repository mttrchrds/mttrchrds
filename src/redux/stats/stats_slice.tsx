import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { GameDay } from '../../types/stats'

import { parseRawActivity } from '../../helpers/redux'

interface Stats {
  gameDays: GameDay[]
  gameDaysLoading: boolean
}

const initialState: Stats = {
  gameDays: [],
  gameDaysLoading: false,
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
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadGameDays.pending, state => {
        state.gameDaysLoading = true
      })
      .addCase(loadGameDays.rejected, (state, error) => {
        console.log('error loading stats game days', error)
      })
      .addCase(loadGameDays.fulfilled, (state, action) => {
        state.gameDaysLoading = false
        state.gameDays = action.payload
      })
  },
})

export default statsSlice.reducer
