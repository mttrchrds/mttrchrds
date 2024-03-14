import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  shows: [],
  loading: false,
}

export const loadShows = createAsyncThunk('latestShows/load', async () => {
  const response = await axios
    .get(
      /* eslint-disable-next-line no-undef */
      `${process.env.API_DOMAIN}/api/latest-shows`,
    )
    .then(apiResponse => {
      return apiResponse
    })
  return response.data
})

export const latestShowsSlice = createSlice({
  name: 'latestShows',
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
        state.shows = action.payload
      })
  },
})

export const { updateShows } = latestShowsSlice.actions

export default latestShowsSlice.reducer
