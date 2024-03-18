import React, { useEffect, useState, useRef, memo, useContext } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  loadTimeline,
  pagingLengthInMonths,
} from '../../redux/timeline/timeline_slice'

import { mqMin } from '../../helpers/media_queries'
import { formatDateNumber } from '../../helpers/date_times'

import { TimelineContext } from '../../providers/timeline_provider'

import Layout from '../layout/layout'
import Container from '../layout/container'
import TimelineSection from '../timeline/timeline_section'
import Activity from '../timeline/activity'
import Spinner from '../spinner'

import theme from '../../styles/theme'

const TimelineSectionMemoized = memo(function TimelineMemo(props) {
  return <TimelineSection timelineDays={props.timelineDays} />
})

TimelineSectionMemoized.propTypes = {
  timelineDays: PropTypes.array,
}

const StyledTimeline = styled.div`
  color: white;
  display: flex;
  flex-grow: 1;
  .primary {
    width: 100%;
    background-color: ${props => props.theme.colors.timeline.primary};
  }
  .secondary {
    display: none;
  }
  .loading-container {
    height: calc(100vh - 80px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading-more-container {
    height: 50px;
    display: flex;
    &__labels {
      width: 20%;
      background-color: ${props => props.theme.colors.timeline.primary};
    }
    &__channels {
      width: 80%;
      background: linear-gradient(
        90deg,
        ${props => props.theme.colors.timeline.primary} 1.46%,
        ${props => props.theme.colors.timeline.primary1} 100%
      );
      display: flex;
      justify-content: center;
      align-items: center;
      &__spinner {
      }
    }
  }
  @media ${props => mqMin(props.theme.breakPoints.sm)} {
    padding-top: 20px;
    .loading-container {
      height: 100%;
    }
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .timeline-container {
      display: flex;
      min-height: 100%;
    }
    .primary {
      display: block;
      width: 70%;
      flex-shrink: 0;
      border-top-left-radius: 4px;
    }
    .secondary {
      display: block;
      background-color: ${props => props.theme.colors.timeline.secondary};
      padding: 20px;
      flex-grow: 1;
      border-top-right-radius: 4px;
    }
  }
`

const Timeline = () => {
  const { setCurrentDay, setCurrentMonth, setCurrentYear } =
    useContext(TimelineContext)

  // Returns true if the component at the bottom of the timeline (i.e. intersection) is visible. Used for infinite loading
  const [intersection, setIntersection] = useState(false)

  const observerTarget = useRef(null)

  const dispatch = useDispatch()
  const pagingStart = useSelector(state => state.timeline.pagingStart)
  const pagingEnd = useSelector(state => state.timeline.pagingEnd)
  const pagingChannels = useSelector(state => state.timeline.pagingChannels)
  const timelineLoading = useSelector(state => state.timeline.loading)
  const timelineSections1 = useSelector(state => state.timeline.sections)

  console.log({ pagingStart })
  console.log({ pagingEnd })
  console.log({ pagingChannels })

  console.log('redux sections', timelineSections1)

  useEffect(() => {
    const date = new Date()
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

    dispatch(loadTimeline({ start: queryStart, end: queryEnd, channels: [] }))
  }, [])

  useEffect(() => {
    // Detecting when bottom of timeline scrolls into view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIntersection(true)
      } else {
        setIntersection(false)
      }
    })

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerTarget])

  useEffect(() => {
    if (intersection && timelineSections1.length > 0) {
      handleLoadMore()
    }
  }, [intersection])

  const displayInitialLoading =
    timelineSections1.length === 0 && timelineLoading ? true : false

  const handleLoadMore = () => {
    dispatch(
      loadTimeline({
        start: pagingStart,
        end: pagingEnd,
        channels: pagingChannels,
      }),
    )
  }

  return (
    <Layout
      bodyColour={theme.colors.timeline.background}
      navigationTitle="Timeline"
    >
      <StyledTimeline>
        <Container>
          <div className="timeline-container">
            <div className="primary">
              {displayInitialLoading && (
                <div className="loading-container">
                  <Spinner />
                </div>
              )}
              <div className="timelines">
                {timelineSections1.map(td => (
                  <TimelineSectionMemoized
                    key={_get(td, ['0', 'date'])}
                    timelineDays={td}
                  />
                ))}
              </div>
              <div ref={observerTarget}></div>
              {!displayInitialLoading && (
                <div className="loading-more-container">
                  <div className="loading-more-container__labels"></div>
                  <div className="loading-more-container__channels">
                    <div className="loading-more-container__channels__spinner">
                      {timelineLoading && <Spinner />}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="secondary">
              <Activity />
            </div>
          </div>
        </Container>
      </StyledTimeline>
    </Layout>
  )
}

export default Timeline
