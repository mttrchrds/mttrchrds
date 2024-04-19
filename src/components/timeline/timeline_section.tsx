import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _get from 'lodash/get'

import { getDaysInMonth, formatDateNumber } from '../../helpers/date_times'

import { TimelinePayloadParsed } from '../../redux/timeline/timeline_slice'

import TimelineActivity from './timeline_activity'

let dayHeight = 40
let channelWidth = 40

if (window.screen.width >= 768) {
  dayHeight = 50
  channelWidth = 50
}

const StyledTimelineSection = styled.div`
  display: flex;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.timeline.primary} 1.46%,
    ${props => props.theme.colors.timeline.primary1} 100%
  );
  .top-spacer {
    width: 100%;
    height: 20px;
  }
  .day-labels {
    width: 20%;
    background-color: ${props => props.theme.colors.timeline.primary};
    &__row {
      height: ${dayHeight}px;
      padding-left: 20px;
      color: ${props => props.theme.colors.timeline.text1};
      &--sticky {
        position: sticky;
        top: 20px;
        background-color: ${props => props.theme.colors.timeline.primary};
      }
    }
  }
  .day-channels {
    width: 80%;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.timeline.primary} 1.46%,
      ${props => props.theme.colors.timeline.primary1} 100%
    );
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
  &:last-child {
    .day-channels {
      overflow: hidden;
    }
  }
`

interface TimelineSectionProps {
  timelineDays: TimelinePayloadParsed[]
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ timelineDays }) => {
  const date = new Date()
  const currentMonth = formatDateNumber(date.getMonth() + 1)
  const currentYear = String(date.getFullYear())

  const renderChannel = (channelIndex: number, day: TimelinePayloadParsed) => {
    const channelActivity = _get(day, ['channels', channelIndex])
    const channelColour = _get(day, ['channelColours', channelIndex])
    if (channelActivity && channelColour) {
      return (
        <div
          className="day-channels__channel day-channels__channel--active"
          data-channel={channelIndex}
        >
          <div className="day-channels__channel__activity">
            <TimelineActivity
              {...channelActivity}
              dayHeight={dayHeight}
              channelWidth={channelWidth}
              activityColour={channelColour}
              channelIndex={channelIndex}
            />
          </div>
        </div>
      )
    } else {
      return <div className="day-channels__channel">&nbsp;</div>
    }
  }

  const calculateDayLabel = (day: TimelinePayloadParsed, index: number) => {
    if (day.month === currentMonth && day.year === currentYear) {
      if (index === 0) {
        return 'Today'
      }
      return null
    } else {
      const totalDays = getDaysInMonth(Number(day.year), Number(day.month))
      if (totalDays === Number(day.day)) {
        let monthLength: 'short' | 'long' = 'short'
        if (window.screen.width >= 768) {
          monthLength = 'long'
        }
        return `${DateTime.fromISO(day.date).toLocaleString({ month: monthLength })}, ${day.year}`
      }
      return null
    }
  }

  const renderLabels = () => {
    return timelineDays.map((d, i) => {
      const dayLabel = calculateDayLabel(d, i)
      return (
        <div
          className={
            dayLabel
              ? 'day-labels__row day-labels__row--sticky'
              : 'day-labels__row'
          }
          key={`label-${d.date}`}
          data-date={`${d.year}-${d.month}-${d.day}`}
        >
          {dayLabel === null ? ' ' : dayLabel}
        </div>
      )
    })
  }

  const renderChannels = () => {
    let dayCounter = 1
    return timelineDays.map(d => {
      let highlight = false
      if (dayCounter % 7 === 0) {
        highlight = true
      }
      dayCounter++
      const rowClass = highlight
        ? `day-channels__row day-channels__row--highlight`
        : `day-channels__row`
      return (
        <div
          className={rowClass}
          key={`channels-${d.date}`}
          data-date={`${d.year}-${d.month}-${d.day}`}
        >
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
    <StyledTimelineSection>
      <div className="day-labels">
        <div className="top-spacer" />
        {renderLabels()}
      </div>
      <div className="day-channels">
        <div className="top-spacer" />
        {renderChannels()}
      </div>
    </StyledTimelineSection>
  )
}

export default TimelineSection
