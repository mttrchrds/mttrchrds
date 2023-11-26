import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _get from 'lodash/get'
import _findIndex from 'lodash/findIndex'

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
  const [days, setDays] = useState([])
  
  const renderedActivities = useRef([])

  useEffect(() => {
    let tmpEarliestDate = ''
    let tmpLatestDate = ''
    if (props.activities.length > 0) {
      // Find date range for current data set
      props.activities.map(a => {
        let startAt_date = DateTime.fromISO(a.start_at)
        if (tmpEarliestDate) {
          if (startAt_date < tmpEarliestDate) {
            tmpEarliestDate = startAt_date
          }
        } else {
          tmpEarliestDate = startAt_date
        }
        let endAt_date = DateTime.fromISO(a.end_at)
        if (tmpLatestDate) {
          if (endAt_date > tmpLatestDate) {
            tmpLatestDate = endAt_date
          }
        } else {
          tmpLatestDate = endAt_date
        }
      })
      // Build array of days in date range which are rendered in the timeline
      // Each day also calculates which activity goes in which vertical channel
      let tmpDays = []
      let channels = [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]
      for (let i = tmpLatestDate; i >= tmpEarliestDate; i = i.minus({ days: 1 })) {
        // Remove item from channel when start_at has passed
        channels = channels.map(c => {
          const activity = _find(props.activities, a => a.id === c)
          if (_get(activity, 'start_at') === i.plus({ days: 1 }).toISODate()) {
            return ''
          } else {
            return c
          }
        })
        const todayActivities = _filter(props.activities, a => a.end_at === i.toISODate())
        todayActivities.map(a => {
          // Find first empty channel
          const channelIndex = _findIndex(channels, c => c === '')
          // Put activity in the channel
          channels[channelIndex] = a.id
        })
        tmpDays.push({
          'DateTime': i,
          'formattedDate': i.toISODate(),
          'day': i.day,
          'month': i.month,
          'year': i.year,
          'channels': channels,
        })
      }
      // Reset rendered so everything is rendered again on page load
      renderedActivities.current = []
      setDays(tmpDays)
    }
  }, [props.activities])

  const renderChannel = (channelIndex, day) => {
    const channelActivityId = _get(day, ['channels', channelIndex])
    // Render activity if end_at is current day and it's not been rendered before
    if (channelActivityId && !_find(renderedActivities.current, r => r === channelActivityId)) {
      // Set as being rendered
      renderedActivities.current = [
        ...renderedActivities.current,
        channelActivityId,
      ]
      const channelActivity = _find(_get(props, 'activities', []), a => a.id === channelActivityId)
      return (
        <div className="day__channels__channel">
          <div 
            className="day__channels__channel__activity"
            style={{
              height: `${_get(channelActivity, ['days']) * dayHeight}px`,
              backgroundColor: _get(channelActivity, ['colour'])
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
    return days.map(d => {
      return (
        <div className="day" key={d.formattedDate} data-day={d.day}>
          <div className="day__label">
            {d.day === 1 ? `${d.DateTime.toLocaleString({ month: 'long' })}, ${d.year}` : ` `}
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
  activities: [],
}

Timeline.propTypes = {
  activities: PropTypes.array,
}

export default Timeline
