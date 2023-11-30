import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _find from 'lodash/find'
import _get from 'lodash/get'

import Activity from './activity'
import { getDaysInMonth } from '../pages/screen_time'

const dayHeight = 50

let renderedActivities = []

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

const generateActiveColourIndex = () => {
  const totalColours = activityColours.length
  if (activeColourIndex === totalColours - 1) {
    activeColourIndex = 0
  } else {
    activeColourIndex++
  }
}

const StyledTimeline = styled.div`
  overflow: hidden;
  .day {
    display: flex;
    min-height: ${dayHeight}px;
    &__label {
      display: flex;
      width: 20%;
      flex-shrink: 0;
    }
    &__channels {
      width: 80%;
      display: flex;
      justify-content: space-evenly;
      &__channel {
        position: relative;
        &__activity {
          position: absolute;
        }
      }
    }
  }
`

const Timeline = props => {
  useEffect(() => {
    if (props.timelineDays.length > 0) {
      // Reset rendering variables when new data is loaded
      renderedActivities = []
      activeColourIndex = 0
    }
  }, [props.timelineDays])

  const renderChannel = (channelIndex, day) => {
    const channelActivityId = _get(day, ['channels', channelIndex, 'id'])
    // Render activity if end_at is current day and it's not been rendered before
    if (channelActivityId && !_find(renderedActivities, r => r === channelActivityId)) {
      // Set activity as rendered
      renderedActivities = [
        ...renderedActivities,
        channelActivityId,
      ]
      const channelActivity = _get(day, ['channels', channelIndex])
      const activityColour = activityColours[activeColourIndex]
      // Update the active colour index
      generateActiveColourIndex()
      return (
        <div className="day__channels__channel" data-channel={channelIndex}>
          <div className="day__channels__channel__activity">
            <Activity
              {...channelActivity}
              colour={activityColour}
              dayHeight={dayHeight}
              currentDay={props.currentDay}
              currentMonth={props.currentMonth}
              currentYear={props.currentYear}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="day__channels__channel">&nbsp;</div>
      )
    }
  }

  const renderDayLabel = (day, index) => {
    if (day.month === props.currentMonth && day.year === props.currentYear) {
      if (index === 0) {
        return `${DateTime.fromISO(day.date).toLocaleString({ month: 'long' })}, ${day.year}`
      }
      return ' '
    } else {
      const totalDays = getDaysInMonth(Number(day.year), Number(day.month))
      if (totalDays === Number(day.day)) {
        return `${DateTime.fromISO(day.date).toLocaleString({ month: 'long' })}, ${day.year}`
      }
      return ' '
    }
  }

  const renderDays = () => {
    return props.timelineDays.map((d, i) => {
      return (
        <div className="day" key={d.date} data-date={`${d.year}-${d.month}-${d.day}`}>
          <div className="day__label">{renderDayLabel(d,i)}</div>
          <div className="day__channels">
            {renderChannel(5, d)}
            {renderChannel(3, d)}
            {renderChannel(1, d)}
            {renderChannel(0, d)}
            {renderChannel(2, d)}
            {renderChannel(4, d)}
            {renderChannel(6, d)}
          </div>
        </div>
      )
    })
  }

  return (
    <StyledTimeline>
      {renderDays()}
    </StyledTimeline>
  )
}

Timeline.defaultProps = {
  timelineDays: [],
}

Timeline.propTypes = {
  timelineDays: PropTypes.array,
  currentDay: PropTypes.string.isRequired,
  currentMonth: PropTypes.string.isRequired,
  currentYear: PropTypes.string.isRequired,
}

export default Timeline
