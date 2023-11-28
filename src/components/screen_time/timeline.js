import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _find from 'lodash/find'
import _get from 'lodash/get'

const dayHeight = 20

const StyledTimeline = styled.div`
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
  const renderedActivities = useRef([])

  useEffect(() => {
    if (props.timelineDays.length > 0) {
      renderedActivities.current = []
    }
  }, [props.timelineDays])

  const renderChannel = (channelIndex, day) => {
    const channelActivityId = _get(day, ['channels', channelIndex, 'id'])
    // Render activity if end_at is current day and it's not been rendered before
    if (channelActivityId && !_find(renderedActivities.current, r => r === channelActivityId)) {
      // Set as being rendered
      renderedActivities.current = [
        ...renderedActivities.current,
        channelActivityId,
      ]
      const channelActivity = _get(day, ['channels', channelIndex])
      return (
        <div className="day__channels__channel">
          <div 
            className="day__channels__channel__activity"
            style={{
              // height: `${_get(channelActivity, ['days']) * dayHeight}px`,
              height: `100px`,
              // backgroundColor: _get(channelActivity, ['colour'])
              backgroundColor: 'pink',
            }}
          >
            {_get(channelActivity, ['show_activity']) === null 
            ? _get(channelActivity, ['game_activity', 'name']) 
            : _get(channelActivity, ['show_activity', 'name'])}
          </div>
          
        </div>
      )
    } else {
      return (
        <div className="day__channels__channel">&nbsp;</div>
      )
    }
  }

  const renderDays = () => {
    return props.timelineDays.map(d => {
      return (
        <div className="day" key={d.date} data-day={d.day}>
          <div className="day__label">
            {d.day === '01' ? `${DateTime.fromISO(d.date).toLocaleString({ month: 'long' })}, ${d.year}` : ` `}
          </div>
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
      <div>[Hello world]</div>
      {renderDays()}
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
