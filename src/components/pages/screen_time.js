import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _get from 'lodash/get'
import { DateTime } from 'luxon'

import { mqMin } from '../../helpers/media_queries'

import Layout from '../layout/layout'
import Container from '../layout/container'
import Timeline from '../screen_time/timeline'
import GameShow from '../screen_time/game_show'

const StyledScreenTime = styled.div`
  display: flex;
  color: white;
  .primary {
    width: 100%;
    flex-shrink: 0;
    background-color: darkgray;
  }
  .secondary {
    display: none;
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .primary {
      width: 65%;
    }
    .secondary {
      display: flex;
      flex-grow: 1;
      background-color: gray;
    }
  }
  .shows {
    display: flex;
    &__item {
      margin-bottom: 30px;
      margin-right: 30px;
      &__name {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 16px;
      }
      &__creator {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
`

const StyledThumbnail = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`

const date = new Date();
export const currentYear = date.getFullYear();
export const currentMonth = date.getMonth() + 1
export const currentDay = date.getDate()

const pagingLengthInMonths = 3

let activeColourIndex = 0

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

export const getDaysInMonth = (year, month) => {
  // Returns the number of days in a particular month
  const targetDate = new Date(Number(year), Number(month), 0)
  return targetDate.getDate()
}

export const formatNumber = n => {
  // Returns a number in 03 format instead of 3
  return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}

const generateActiveColourIndex = () => {
  const totalColours = activityColours.length
  if (activeColourIndex === totalColours - 1) {
    activeColourIndex = 0
  } else {
    activeColourIndex++
  }
}

const parseActivities = activities => {
  // Fills null end dates with current date
  // Adds a colour for each activity
  // Calculates number of days
  // Adds Luxon DateTimes for each date
  let parsedActivities = []
  activities.map(a => {
    const new_end_at = a.end_at === null ? `${currentYear}-${formatNumber(currentMonth)}-${formatNumber(currentDay)}` : a.end_at
    parsedActivities.push({
      ...a,
      'end_at': new_end_at,
      'colour': activityColours[activeColourIndex],
      'days': Math.ceil(DateTime.fromISO(new_end_at).diff(DateTime.fromISO(a.start_at), 'days').toObject().days),
      'start_at_datetime': DateTime.fromISO(a.start_at),
      'end_at_datetime': DateTime.fromISO(new_end_at),
    })
    generateActiveColourIndex()
  })
  return parsedActivities
}

const ScreenTime = () => {
  const [activities, setActivities] = useState([])
  const [pagingMonth, setPagingMonth] = useState('')
  const [pagingYear, setPagingYear] = useState('')
  const [enableLoadMore, setEnableLoadMore] = useState(true)

  useEffect(() => {
    let tmpActivities = []
    
    let newMonth = currentMonth - pagingLengthInMonths
    let newYear = currentYear
    
    if (newMonth < 1) {
      newMonth = 12 + newMonth
      newYear = newYear - 1
    }

    const queryStart = `${newYear}-${formatNumber(newMonth)}-01`
    const queryEnd = `${currentYear}-${formatNumber(currentMonth)}-${formatNumber(currentDay)}`

    axios.get(`${process.env.API_DOMAIN}/api/timeline-ongoing/`)
    .then(apiResponse => {
      const payload = _get(apiResponse, 'data', [])
      if (payload.length > 0) {
        tmpActivities = payload
      }
    })
    .then(() => {
      axios.get(`${process.env.API_DOMAIN}/api/timeline/?start=${queryStart}&end=${queryEnd}`)
        .then(apiResponse => {
          const payload = _get(apiResponse, 'data', [])
          if (payload.length > 0) {
            tmpActivities = [
              ...tmpActivities,
              ...payload,
            ]
          }
        })
        .then(() => {
          // setActivities(tmpActivities)
          setActivities(parseActivities(tmpActivities))
          setPagingMonth(newMonth)
          setPagingYear(newYear)
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(function (error) {
      console.log(error)
    })

  }, [])

  console.log({activities})

  const handleLoadMore = e => {
    e.preventDefault()
    let startMonth = pagingMonth - pagingLengthInMonths
    let startYear = pagingYear
    
    if (startMonth < 1) {
      startMonth = 12 + startMonth
      startYear = startYear - 1
    }
    
    let endMonth = pagingMonth - 1
    let endYear = pagingYear
    
    if (endMonth === 0) {
      endMonth = 12
      endYear = endYear - 1
    }

    const queryStart = `${startYear}-${formatNumber(startMonth)}-01`
    const queryEnd = `${endYear}-${formatNumber(endMonth)}-${formatNumber(getDaysInMonth(endYear, endMonth))}`

    axios.get(`${process.env.API_DOMAIN}/api/timeline/?start=${queryStart}&end=${queryEnd}`)
      .then(apiResponse => {
        const payload = _get(apiResponse, 'data', [])
        if (payload.length > 0) {
          setActivities([
            ...activities,
            ...parseActivities(payload),
          ]
          )
          setPagingMonth(startMonth)
          setPagingYear(startYear)
        } else {
          setEnableLoadMore(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <Container>
        <StyledScreenTime>
            <div className="primary">
              <Timeline
                activities={activities} 
                endYear={pagingYear}
                endMonth={pagingMonth} 
              />
              {enableLoadMore && (
                <div>
                  <button type="button" onClick={handleLoadMore}>Click me</button>
                </div>
              )}
            </div>
            <div className="secondary">
              <GameShow />
            </div>
            <div className="shows">
              {/* {activities.map(a => (
                <div className="shows__item" key={a.id}>
                  <div className="shows__item__name">{_get(a, 'game_activity') ? _get(a, ['game_activity', 'name']) : _get(a, ['show_activity', 'name'])}</div>
                  <StyledThumbnail src={_get(a, 'game_activity') ? _get(a, ['game_activity', 'thumbnail_url']) : _get(a, ['show_activity', 'thumbnail_url'])} className="shows__item__img" />
                </div>
              ))} */}
            </div>
        </StyledScreenTime>
      </Container>
    </Layout>
  )
}

export default ScreenTime
