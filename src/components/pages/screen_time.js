import React, { useEffect, useState, useRef, memo, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _get from 'lodash/get'
import PropTypes from 'prop-types'

import { mqMin } from '../../helpers/media_queries'
import { formatDateNumber, getDaysInMonth } from '../../helpers/date_times'

import { ScreenTimeContext } from '../../providers/screen_time_provider'

import Layout from '../layout/layout'
import Container from '../layout/container'
import Timeline from '../screen_time/timeline'
import Activity from '../screen_time/activity'
import Spinner from '../spinner'

const TimelineMemoized = memo(function TimelineMemo(props) {
  return <Timeline timelineDays={props.timelineDays} />
})

TimelineMemoized.propTypes = {
  timelineDays: PropTypes.array,
}

const StyledScreenTime = styled.div`
  color: white;
  .primary {
    width: 100%;
    background-color: darkgray;
  }
  .secondary {
    display: none;
  }
  .loading-container {
    height: 50px;
    display: flex;
    &__labels {
      width: 20%;
      background-color: #1E2639;
    }
    &__channels {
      width: 80%;
      background: linear-gradient(90deg, #1E2639 1.46%, #1B2335 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      &__spinner {}
    }
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

const pagingLengthInMonths = 3

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

const ScreenTime = () => {
  const { setCurrentDay, setCurrentMonth, setCurrentYear } = useContext(ScreenTimeContext)

  // Array of arrays. Each top level array is array of parsed timelineDays for each memoized <Timeline /> component
  const [timelineDays, setTimelineDays] = useState([])
  const [displayLoading, setDisplayLoading] = useState(false)
  // Returns true if the component at the bottom of the timeline (i.e. intersection) is visible. Used for infinite loading
  const [intersection, setIntersection] = useState(false)

  const observerTarget = useRef(null)
  const initialLoadCompleted = useRef(false)
  const pagingMonth = useRef('')
  const pagingYear = useRef('')
  // A record of activity ids, used to ensure parsed timelineDays doesn't have duplicate entries
  const renderedActivityIds = useRef([])
  // A store of the raw data returned from API (i.e. not parsed)
  const timelineDaysUnparsed = useRef([])
  const activeColourIndex = useRef(0)

  useEffect(() => {
    const date = new Date();
    const cYear = date.getFullYear()
    const cMonth = date.getMonth() + 1
    const cDay = date.getDate()

    setCurrentDay(formatDateNumber(cDay))
    setCurrentMonth(formatDateNumber(cMonth))
    setCurrentYear(String(cYear))

    let newMonth = cMonth - pagingLengthInMonths
    let newYear = cYear
    
    if (newMonth < 1) {
      newMonth = 12 + newMonth
      newYear = newYear - 1
    }

    const queryStart = `${newYear}-${formatDateNumber(newMonth)}-01`
    const queryEnd = `${cYear}-${formatDateNumber(cMonth)}-${formatDateNumber(cDay)}`

    /* eslint-disable-next-line no-undef */
    axios.get(`${process.env.API_DOMAIN}/api/timeline/?start=${queryStart}&end=${queryEnd}`)
      .then(apiResponse => {
        const payload = _get(apiResponse, 'data', [])
        if (payload.length > 0) {
          setTimelineDays([parsePayload(payload)])
          timelineDaysUnparsed.current = payload
          pagingMonth.current = newMonth
          pagingYear.current = newYear
          initialLoadCompleted.current = true
        }
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIntersection(true)
        } else {
          setIntersection(false)
        }
      }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget])

  useEffect(() => {
    if (intersection && initialLoadCompleted.current === true) {
      handleLoadMore()
    }
  }, [intersection])

  const generateActiveColourIndex = () => {
    const totalColours = activityColours.length
    if (activeColourIndex.current === totalColours - 1) {
      activeColourIndex.current = 0
    } else {
      activeColourIndex.current = activeColourIndex.current + 1
    }
  }

  const parsePayload = payload => {
    // Payload is parsed so logic is outside Memoized <Timeline /> component
    // Removes duplicate activities from payload and sets activity colour
    let tmpPayload = []
    payload.map(p => {
      let tmpChannelColours = []
      const tmpChannels = _get(p, 'channels', []).map(c => {
        if (c === null) {
          tmpChannelColours.push(null)
          return c
        } else {
          if (renderedActivityIds.current.includes(_get(c, 'id'))) {
            tmpChannelColours.push(null)
            return null
          } else {
            tmpChannelColours.push(activityColours[activeColourIndex.current])
            generateActiveColourIndex()
            renderedActivityIds.current = [
              ...renderedActivityIds.current,
              _get(c, 'id'),
            ]
            return c
          }
        }
      })
      tmpPayload.push({
        date: p.date,
        day: p.day,
        month: p.month,
        year: p.year,
        channels: tmpChannels,
        channelColours: tmpChannelColours,
      })
    })
    return tmpPayload
  }
  
  const handleLoadMore = () => {
    setDisplayLoading(true)

    let startMonth = pagingMonth.current - pagingLengthInMonths
    let startYear = pagingYear.current
    
    if (startMonth < 1) {
      startMonth = 12 + startMonth
      startYear = startYear - 1
    }
    
    let endMonth = pagingMonth.current - 1
    let endYear = pagingYear.current
    
    if (endMonth === 0) {
      endMonth = 12
      endYear = endYear - 1
    }

    const queryStart = `${startYear}-${formatDateNumber(startMonth)}-01`
    const queryEnd = `${endYear}-${formatDateNumber(endMonth)}-${formatDateNumber(getDaysInMonth(endYear, endMonth))}`

    // Pass latest channel list to API when loading more
    const finalDay = timelineDaysUnparsed.current.length > 0 ? timelineDaysUnparsed.current[timelineDaysUnparsed.current.length - 1] : {}
    const finalChannels = _get(finalDay, 'channels', [])
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
        console.log('load more', payload)
        if (payload.length > 0) {
          setTimelineDays([
            ...timelineDays,
            parsePayload(payload),
          ])
          timelineDaysUnparsed.current = [
            ...timelineDaysUnparsed.current,
            ...payload,
          ]
          pagingMonth.current = startMonth
          pagingYear.current = startYear
        }
        setDisplayLoading(false)
      })
      .catch(error => {
        setDisplayLoading(false)
        console.log(error)
      })
  }

  return (
    <Layout>
      <Container>
        <StyledScreenTime>
            <div className="primary">
              <div className="timelines">
                {timelineDays.map(td => (
                  <TimelineMemoized
                    key={_get(td, ['0', 'date'])}
                    timelineDays={td} 
                  />
                ))}
              </div>
              <div ref={observerTarget}></div>
              <div className="loading-container">
                <div className="loading-container__labels"></div>
                <div className="loading-container__channels">
                  <div className="loading-container__channels__spinner">
                    {displayLoading && (
                      <Spinner />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary">
              <Activity />
            </div>
        </StyledScreenTime>
      </Container>
    </Layout>
  )
}

export default ScreenTime
