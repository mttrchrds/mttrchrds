import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Activity } from '../../types/timeline'

import { parseRawActivity } from '../../helpers/redux'

interface LatestShows {
  shows: Activity[]
  loading: boolean
}

const initialState: LatestShows = {
  shows: [],
  loading: false,
}

export const loadShows = createAsyncThunk('latestShows/load', async () => {
  const response = await axios
    .get(
      /* eslint-disable-next-line no-undef */
      `${import.meta.env.VITE_API_DOMAIN}/api/latest-shows`,
    )
    .then(apiResponse => apiResponse)
  return response.data
})

export const latestShowsSlice = createSlice({
  name: 'latestShows',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadShows.pending, state => {
        state.loading = true
      })
      .addCase(loadShows.rejected, (state, error) => {
        console.log('error loading latest shows', error)
      })
      .addCase(loadShows.fulfilled, (state, action) => {
        state.loading = false
        state.shows = action.payload.map((p: any) => parseRawActivity(p))
      })
  },
})

export default latestShowsSlice.reducer
