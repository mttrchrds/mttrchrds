import { createLazyFileRoute } from '@tanstack/react-router'
import styled from 'styled-components'
import { useEffect, useState, useRef, memo } from 'react'
import _get from 'lodash/get'
import {
  loadTimeline,
  pagingLengthInMonths,
  updateCurrentDay,
  updateCurrentMonth,
  updateCurrentYear,
  TimelinePayloadParsed,
} from '../redux/timeline/timeline_slice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'

import { mqMin } from '../helpers/media_queries'
import { formatDateNumber } from '../helpers/date_times'

import theme from '../styles/theme'

import Layout from '../components/layout/layout'
import Container from '../components/layout/container'
import Spinner from '../components/spinner'
import TimelineSection from '../components/timeline/timeline_section'
import Activity from '../components/timeline/activity'

export const Route = createLazyFileRoute('/timeline')({
  component: TimelineRoute,
})

interface TimelineSectionMemoizedProps {
  timelineDays: TimelinePayloadParsed[]
}

const TimelineSectionMemoized: React.FC<TimelineSectionMemoizedProps> = memo(
  ({ timelineDays }) => {
    return <TimelineSection timelineDays={timelineDays} />
  },
)

interface StyledTimelineProps {
  $loadMoreVisible: boolean
}

const StyledTimeline = styled.div<StyledTimelineProps>`
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
    display: ${props => (props.$loadMoreVisible ? 'flex' : 'none')};
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
  .timelines {
    &__spacer {
      width: 100%;
      height: 20px;
    }
  }
  @media ${props => mqMin(props.theme.breakPoints.sm)} {
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

const StyledActivity = styled.div`
  position: sticky;
  top: 20px;
  .activity-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.colors.timeline.secondary1};
    border-radius: 4px;
    height: 400px;
    &__primary {
      margin-bottom: 10px;
      padding: 0 10px;
      font-size: ${props => props.theme.typography.sizeLarge};
      color: ${props => props.theme.colors.timeline.text1};
      text-align: center;
    }
    &__secondary {
      margin-bottom: 10px;
      padding: 0 10px;
      color: ${props => props.theme.colors.timeline.text};
      text-align: center;
    }
  }
`

function TimelineRoute() {
  // Returns true if the component at the bottom of the timeline (i.e. intersection) is visible. Used for infinite loading
  const [intersection, setIntersection] = useState(false)

  const observerTarget = useRef(null)

  const dispatch = useAppDispatch()
  const pagingStart = useAppSelector(state => state.timeline.pagingStart)
  const pagingEnd = useAppSelector(state => state.timeline.pagingEnd)
  const pagingChannels = useAppSelector(state => state.timeline.pagingChannels)
  const timelineLoading = useAppSelector(state => state.timeline.loading)
  const timelineSections = useAppSelector(state => state.timeline.sections)
  const activity = useAppSelector(state => state.timeline.activity)
  const activityLoading = useAppSelector(
    state => state.timeline.activityLoading,
  )

  useEffect(() => {
    const date = new Date()
    const cYear = date.getFullYear()
    const cMonth = date.getMonth() + 1
    const cDay = date.getDate()

    dispatch(updateCurrentDay(formatDateNumber(cDay)))
    dispatch(updateCurrentMonth(formatDateNumber(cMonth)))
    dispatch(updateCurrentYear(String(cYear)))

    if (timelineSections.length === 0) {
      let newMonth = cMonth - pagingLengthInMonths
      let newYear = cYear

      if (newMonth < 1) {
        newMonth = 12 + newMonth
        newYear = newYear - 1
      }

      const queryStart = `${newYear}-${formatDateNumber(newMonth)}-01`
      const queryEnd = `${cYear}-${formatDateNumber(cMonth)}-${formatDateNumber(cDay)}`

      dispatch(loadTimeline({ start: queryStart, end: queryEnd, channels: [] }))
    }
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
    if (intersection && timelineSections.length > 0) {
      handleLoadMore()
    }
  }, [intersection])

  const displayInitialLoading =
    timelineSections.length === 0 && timelineLoading ? true : false

  const handleLoadMore = () => {
    dispatch(
      loadTimeline({
        start: pagingStart,
        end: pagingEnd,
        channels: pagingChannels,
      }),
    )
  }

  const renderActivity = () => {
    if (activityLoading) {
      return (
        <div className="activity-container">
          <Spinner spinnerColour={theme.colors.text} />
        </div>
      )
    }
    if (activity) {
      return (
        <Activity
          startAt={activity.start_at}
          endAt={activity.end_at}
          activityType={activity.activity_type}
          gameShow={
            activity.activity_type === 'GAME'
              ? activity.game_activity
              : activity.show_activity
          }
          platform={
            activity.activity_type === 'GAME'
              ? activity.game_platform
              : activity.show_platform
          }
          completed={activity.completed}
        />
      )
    }
    return (
      <div className="activity-container">
        <div className="activity-container__primary">{`Timeline`}</div>
        <div className="activity-container__secondary">{`Scroll down the timeline to see what shows I've been watching and games I've been playing.`}</div>
        <div className="activity-container__secondary">{`Click on an activity for more details.`}</div>
      </div>
    )
  }

  return (
    <Layout
      bodyColour={theme.colors.timeline.background}
      navigationTitle="Timeline"
    >
      <StyledTimeline $loadMoreVisible={displayInitialLoading ? false : true}>
        <Container>
          <div className="timeline-container">
            <div className="primary">
              {displayInitialLoading && (
                <div className="loading-container">
                  <Spinner />
                </div>
              )}
              <div className="timelines">
                <div className="timelines__spacer"></div>
                {timelineSections.map(td => (
                  <TimelineSectionMemoized
                    key={_get(td, ['0', 'date'])}
                    timelineDays={td}
                  />
                ))}
              </div>
              <div className="loading-more-container" ref={observerTarget}>
                <div className="loading-more-container__labels"></div>
                <div className="loading-more-container__channels">
                  <div className="loading-more-container__channels__spinner">
                    {timelineLoading && <Spinner />}
                  </div>
                </div>
              </div>
            </div>
            <div className="secondary">
              <StyledActivity>{renderActivity()}</StyledActivity>
            </div>
          </div>
        </Container>
      </StyledTimeline>
    </Layout>
  )
}
