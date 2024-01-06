import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _get from 'lodash/get'

import { getDaysInMonth, formatDateNumber } from '../../helpers/date_times'

import Activity from './activity'

const dayHeight = 50
const channelWidth = 50

const StyledTimeline = styled.div`
  display: flex;
  background: linear-gradient(90deg, #1E2639 1.46%, #1B2335 100%);
  &:last-child {
    overflow: hidden;
  }
  .day-labels {
    width: 20%;
    background-color: #1E2639;
    &__row {
      height: ${dayHeight}px;
      &--sticky {
        position: sticky;
        top: 20px;
        background-color: #1E2639;
      }
    }
  }
  .day-channels {
    width: 80%;
    /* overflow: hidden; */
    background: linear-gradient(90deg, #1E2639 1.46%, #1B2335 100%);
    &__row {
      display: flex;
      width: 100%;
      height: ${dayHeight}px;
      justify-content: space-evenly;
      border-bottom: 1px solid #80808021;
      &--highlight {
        border-bottom: 1px solid #ffffff29;
      }
    }
    &__channel {
      width: 50px;
      &--active {
        position: relative;
      }
      &__activity {
        position: absolute;
      }
    }
  }
`

const Timeline = props => {
  const date = new Date();
  const currentMonth = formatDateNumber(date.getMonth() + 1)
  const currentYear = String(date.getFullYear())

  const renderChannel = (channelIndex, day) => {
    const channelActivityId = _get(day, ['channels', channelIndex, 'id'])
    if (channelActivityId) {
      const channelActivity = _get(day, ['channels', channelIndex])
      return (
        <div className="day-channels__channel day-channels__channel--active" data-channel={channelIndex}>
          <div className="day-channels__channel__activity">
            <Activity
              {...channelActivity}
              dayHeight={dayHeight}
              channelWidth={channelWidth}
              activityColour={_get(day, ['channelColours', channelIndex])}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="day-channels__channel">&nbsp;</div>
      )
    }
  }

  const calculateDayLabel = (day, index) => {
    if (day.month === currentMonth && day.year === currentYear) {
      if (index === 0) {
        return 'Today'
      }
      return null
    } else {
      const totalDays = getDaysInMonth(Number(day.year), Number(day.month))
      if (totalDays === Number(day.day)) {
        return `${DateTime.fromISO(day.date).toLocaleString({ month: 'long' })}, ${day.year}`
      }
      return null
    }
  }

  const renderLabels = () => {
    return props.timelineDays.map((d, i) => {
      const dayLabel = calculateDayLabel(d, i)
      return (
        <div className={dayLabel ? 'day-labels__row day-labels__row--sticky' : 'day-labels__row'} key={`label-${d.date}`} data-date={`${d.year}-${d.month}-${d.day}`}>
          {dayLabel === null ? ' ' : dayLabel}
        </div>
      )
    })
  }

  const renderChannels = () => {
    let dayCounter = 1
    return props.timelineDays.map(d => {
      let highlight = false
      if (dayCounter % 7 === 0) {
        highlight = true
      }
      dayCounter++
      const rowClass = highlight ? `day-channels__row day-channels__row--highlight` : `day-channels__row`
      return (
        <div className={rowClass} key={`channels-${d.date}`} data-date={`${d.year}-${d.month}-${d.day}`}>
          {renderChannel(5, d)}
          {renderChannel(3, d)}
          {renderChannel(1, d)}
          {renderChannel(0, d)}
          {renderChannel(2, d)}
          {renderChannel(4, d)}
          {renderChannel(6, d)}
        </div>
      )
    })
  }

  return (
    <StyledTimeline>
      <div className="day-labels">
        {renderLabels()}
      </div>
      <div className="day-channels">
        {renderChannels()}
      </div>
    </StyledTimeline>
  )
}

Timeline.defaultProps = {
  timelineDays: [],
}

Timeline.propTypes = {
  timelineDays: PropTypes.array,
}

export default Timeline
