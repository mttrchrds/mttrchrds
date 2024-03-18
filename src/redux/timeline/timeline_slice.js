import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _get from 'lodash/get'

import { getDaysInMonth, formatDateNumber } from '../../helpers/date_times'

const initialState = {
  currentDay: '',
  currentMonth: '',
  currentYear: '',
  pagingStart: '',
  pagingEnd: '',
  pagingChannels: [],
  activeColourIndex: null,
  // Array of arrays. Each top level array is array of parsed days for each memoized <TimelineSection /> component
  sections: [],
  loading: false,
  // A record of activity ids, used to ensure parsed payload doesn't have duplicate entries
  renderedActivityIds: [],
  activity: null,
  activityLoading: false,
}

const activityColours = [
  '#40a4d8',
  '#33beb7',
  '#b2c444',
  '#fecc2f',
  '#f8a227',
  '#f66220',
  '#dc3839',
  '#ee6579',
  '#9d60d1',
]

export const pagingLengthInMonths = 3

export const loadTimeline = createAsyncThunk(
  'timeline/loadTimline',
  async payload => {
    const start = _get(payload, 'start')
    const end = _get(payload, 'end')
    const channels = _get(payload, 'channels', [])
    const response = await axios
      .get(
        /* eslint-disable-next-line no-undef */
        `${process.env.API_DOMAIN}/api/timeline/?start=${start}&end=${end}&channels=${channels}`,
      )
      .then(apiResponse => {
        return apiResponse
      })
    return response.data
  },
)

export const loadActivity = createAsyncThunk(
  'timeline/loadActivity',
  async payload => {
    const response = await axios
      .get(
        /* eslint-disable-next-line no-undef */
        `${process.env.API_DOMAIN}/api/activities/${payload}`,
      )
      .then(apiResponse => {
        return apiResponse
      })
    return response.data
  },
)

const buildNextStartEndValues = currentStart => {
  // builds data query params for next load
  const currentStartPaths = currentStart.split('-')
  const currentYear = Number(currentStartPaths[0])
  const currentMonth = Number(currentStartPaths[1])

  let startMonth = currentMonth - pagingLengthInMonths
  let startYear = currentYear

  if (startMonth < 1) {
    startMonth = 12 + startMonth
    startYear = startYear - 1
  }

  let endMonth = currentMonth - 1
  let endYear = currentYear

  if (endMonth === 0) {
    endMonth = 12
    endYear = endYear - 1
  }

  return {
    start: `${startYear}-${formatDateNumber(startMonth)}-01`,
    end: `${endYear}-${formatDateNumber(endMonth)}-${formatDateNumber(getDaysInMonth(endYear, endMonth))}`,
  }
}

const buildNextChannelsList = payload => {
  // builds channels query param for next load
  const finalDay = payload.length > 0 ? payload[payload.length - 1] : {}
  return _get(finalDay, 'channels', []).map(fc => {
    if (fc) {
      return fc.id
    }
    return null
  })
}

const generateActiveColourIndex = currentIndex => {
  const totalColours = activityColours.length
  if (currentIndex === totalColours - 1) {
    return 0
  } else {
    return currentIndex + 1
  }
}

const parseApiPayload = (payload, state) => {
  // Payload is parsed so logic is outside Memoized <TimelineSection /> component
  // Removes duplicate activities from payload and sets activity colour
  let renderedActivityIds = [...state.renderedActivityIds]
  let parsedPayload = []
  let activeColourIndex = state.activeColourIndex
  payload.map(p => {
    let tmpChannelColours = []
    const tmpChannels = _get(p, 'channels', []).map(c => {
      if (c === null) {
        tmpChannelColours.push(null)
        return c
      } else {
        if (renderedActivityIds.includes(_get(c, 'id'))) {
          tmpChannelColours.push(null)
          return null
        } else {
          if (activeColourIndex === null) {
            activeColourIndex = 0
          } else {
            activeColourIndex = generateActiveColourIndex(activeColourIndex)
          }
          tmpChannelColours.push(activityColours[activeColourIndex])
          renderedActivityIds.push(_get(c, 'id'))
          return c
        }
      }
    })
    parsedPayload.push({
      date: p.date,
      day: p.day,
      month: p.month,
      year: p.year,
      channels: tmpChannels,
      channelColours: tmpChannelColours,
    })
  })
  return {
    parsedPayload,
    renderedActivityIds,
    activeColourIndex,
  }
}

export const timelineSlice = createSlice({
  name: 'timline',
  initialState,
  reducers: {
    updateCurrentDay: (state, action) => {
      state.currentDay = action.payload
    },
    updateCurrentMonth: (state, action) => {
      state.currentMonth = action.payload
    },
    updateCurrentYear: (state, action) => {
      state.currentYear = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTimeline.pending, state => {
        state.loading = true
      })
      .addCase(loadTimeline.rejected, (state, error) => {
        console.log('error loading timeline', error)
      })
      .addCase(loadTimeline.fulfilled, (state, action) => {
        state.loading = false
        const previousStart = _get(action, ['meta', 'arg', 'start'])
        if (previousStart) {
          const { start, end } = buildNextStartEndValues(previousStart)
          state.pagingStart = start
          state.pagingEnd = end
        }
        const payload = _get(action, 'payload', [])
        if (payload.length > 0) {
          state.pagingChannels = buildNextChannelsList(payload)
          const { parsedPayload, renderedActivityIds, activeColourIndex } =
            parseApiPayload(payload, state)
          state.activeColourIndex = activeColourIndex
          state.renderedActivityIds = renderedActivityIds
          state.sections = [...state.sections, parsedPayload]
        }
      }),
      builder
        .addCase(loadActivity.pending, state => {
          state.activityLoading = true
        })
        .addCase(loadActivity.rejected, (state, error) => {
          console.log('error loading activity', error)
        })
        .addCase(loadActivity.fulfilled, (state, action) => {
          state.activityLoading = false
          const payload = _get(action, 'payload', {})
          state.activity = payload
        })
  },
})

export const { updateCurrentDay, updateCurrentMonth, updateCurrentYear } =
  timelineSlice.actions

export default timelineSlice.reducer
