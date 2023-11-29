import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _get from 'lodash/get'

import { mqMin } from '../../helpers/media_queries'

import { currentDay, currentMonth, currentYear } from '../pages/screen_time'

const StyledActivity = styled.div`
  min-height: ${props => props.height}px;
  background-color: ${props => props.colour};
  .activity-head {
    width: ${props => props.dayHeight}px;
    height: ${props => props.dayHeight}px;
    background-image: url(${props => props.thumbnail});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
  }
`

const Activity = props => {
  const activityDetail = _get(props, ['show_activity']) === null ? _get(props, ['game_activity']) : _get(props, ['show_activity'])
  const activityPlatform = _get(props, ['show_platform']) === null ? _get(props, ['game_platform']) : _get(props, ['show_platform'])
  const isShow = _get(props, ['show_activity']) === null ? false : true
  const new_end_at = _get(props, ['end_at']) === null ? `${currentYear}-${currentMonth}-${currentDay}` : _get(props, ['end_at'])
  const daysTotal = Math.ceil(DateTime.fromISO(new_end_at).diff(DateTime.fromISO(_get(props, ['start_at'])), 'days').toObject().days)
  return (
    <StyledActivity dayHeight={props.dayHeight} height={daysTotal * props.dayHeight} colour={props.colour} thumbnail={_get(activityDetail, ['thumbnail_url'])}>
      <div className="activity-head"></div>
      <div className="activity-tail"></div>
    </StyledActivity>
  )
}

Activity.defaultProps = {
}

Activity.propTypes = {
  colour: PropTypes.string.isRequired,
  dayHeight: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  start_at: PropTypes.string.isRequired,
  end_at: PropTypes.string,
  show_activity: PropTypes.object,
  show_platform: PropTypes.object,
  game_activity: PropTypes.object,
  game_platform: PropTypes.object,
  completed: PropTypes.bool.isRequired,
}

export default Activity
