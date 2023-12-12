import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _get from 'lodash/get'

import { mqMin } from '../../helpers/media_queries'

import Layout from '../layout/layout'
import Container from '../layout/container'
import Timeline from '../screen_time/timeline'
import GameShow from '../screen_time/game_show'

const StyledScreenTime = styled.div`
  color: white;
  .primary {
    width: 100%;
    background-color: darkgray;
  }
  .secondary {
    display: none;
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    display: flex;
    .primary {
      display: block;
      width: 70%;
      flex-shrink: 0;
    }
    .secondary {
      display: block;
      background-color: #2A3550;
      padding: 20px;
      flex-grow: 1;
    }
  }
`

const formatNumber = n => {
  // Returns a number in 03 format instead of 3
  return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1
const currentDay = date.getDate()

const pagingLengthInMonths = 3

export const getDaysInMonth = (year, month) => {
  // Returns the number of days in a particular month
  const targetDate = new Date(Number(year), Number(month), 0)
  return targetDate.getDate()
}

const ScreenTime = () => {
  const [timelineDays, setTimelineDays] = useState([])
  const [pagingMonth, setPagingMonth] = useState('')
  const [pagingYear, setPagingYear] = useState('')
  const [enableLoadMore, setEnableLoadMore] = useState(true)

  useEffect(() => {
    let newMonth = currentMonth - pagingLengthInMonths
    let newYear = currentYear
    
    if (newMonth < 1) {
      newMonth = 12 + newMonth
      newYear = newYear - 1
    }

    const queryStart = `${newYear}-${formatNumber(newMonth)}-01`
    const queryEnd = `${currentYear}-${formatNumber(currentMonth)}-${formatNumber(currentDay)}`

    /* eslint-disable-next-line no-undef */
    axios.get(`${process.env.API_DOMAIN}/api/timeline/?start=${queryStart}&end=${queryEnd}`)
      .then(apiResponse => {
        const payload = _get(apiResponse, 'data', [])
        console.log({payload})
        if (payload.length > 0) {
          setTimelineDays(payload)
          setPagingMonth(newMonth)
          setPagingYear(newYear)
        }
      })
      .catch(error => {
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

    // Pass current channel list to API when loading more
    const finalDay = timelineDays.length > 0 ? timelineDays[timelineDays.length - 1] : {}
    const finalChannels = _get(finalDay, 'channels', undefined)
    const finalChannelsParsed = finalChannels.map(fc => {
      if (fc) {
        return fc.id
      }
      return null
    })

    /* eslint-disable-next-line no-undef */
    axios.get(`${process.env.API_DOMAIN}/api/timeline/?start=${queryStart}&end=${queryEnd}&channels=${finalChannelsParsed}`)
      .then(apiResponse => {
        const payload = _get(apiResponse, 'data', [])
        console.log({payload})
        if (payload.length > 0) {
          setTimelineDays([
            ...timelineDays,
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
      <Container>
        <StyledScreenTime>
            <div className="primary">
              <Timeline
                timelineDays={timelineDays} 
                endYear={pagingYear}
                endMonth={pagingMonth}
                currentDay={formatNumber(currentDay)}
                currentMonth={formatNumber(currentMonth)}
                currentYear={String(currentYear)}
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
        </StyledScreenTime>
      </Container>
    </Layout>
  )
}

export default ScreenTime
