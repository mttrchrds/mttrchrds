import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _get from 'lodash/get'

import Layout from '../layout/layout'

const StyledScreenTime = styled.div`
  color: white;
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
      &__img {
        max-width: 200px;
      }
    }
  }
`

const StyledThumbnail = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`

const pagingLengthInMonths = 3

const getDaysInMonth = (year, month) => {
  // Returns the number of days in a particular month
  const targetDate = new Date(Number(year), Number(month), 0)
  console.log({targetDate})
  return targetDate.getDate()
}

const formatNumber = n => {
  // Returns a number in 03 format instead of 3
  return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}

const ScreenTime = () => {
  const [activities, setActivities] = useState([])
  const [pagingMonth, setPagingMonth] = useState('')
  const [pagingYear, setPagingYear] = useState('')
  const [enableLoadMore, setEnableLoadMore] = useState(true)

  useEffect(() => {
    let tmpActivities = []
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1
    const currentDay = date.getDate()
    console.log('CURRENT DAY', currentDay)
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
            console.log('trying to add 2nd api response')
            tmpActivities = [
              ...tmpActivities,
              ...payload,
            ]
          }
        })
        .then(() => {
          console.log('how many times called?', tmpActivities)
          setActivities(tmpActivities)
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
            ...payload,
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
      <StyledScreenTime>
        <h2>Shows</h2>
        {enableLoadMore && (
          <div>
            <button type="button" onClick={handleLoadMore}>Click me</button>
          </div>
        )}
        <div className="shows">
          {activities.map(a => (
            <div className="shows__item" key={a.id}>
              <div className="shows__item__name">{_get(a, 'game_activity') ? _get(a, ['game_activity', 'name']) : _get(a, ['show_activity', 'name'])}</div>
              <StyledThumbnail src={_get(a, 'game_activity') ? _get(a, ['game_activity', 'thumbnail_url']) : _get(a, ['show_activity', 'thumbnail_url'])} className="shows__item__img" />
            </div>
          ))}
        </div>
      </StyledScreenTime>
    </Layout>
  )
}

export default ScreenTime
