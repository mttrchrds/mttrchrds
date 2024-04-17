import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Activity } from '../../types/timeline'

interface LatestGames {
  games: Activity[]
  loading: boolean
}

const initialState: LatestGames = {
  games: [],
  loading: false,
}

export const loadGames = createAsyncThunk('latestGames/load', async () => {
  const response = await axios
    .get(
      /* eslint-disable-next-line no-undef */
      `${import.meta.env.VITE_API_DOMAIN}/api/latest-games`,
    )
    .then(apiResponse => apiResponse)
  return response.data
})

export const latestGamesSlice = createSlice({
  name: 'latestGames',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadGames.pending, state => {
        state.loading = true
      })
      .addCase(loadGames.rejected, (state, error) => {
        console.log('error loading latest games', error)
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.loading = false
        state.games = action.payload
      })
  },
})

export default latestGamesSlice.reducer
