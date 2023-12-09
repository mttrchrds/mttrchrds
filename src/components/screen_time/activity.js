import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _get from 'lodash/get'
import axios from 'axios'

// import { mqMin } from '../../helpers/media_queries'

import { LayoutContext } from '../layout/layout'

const StyledActivity = styled.div`
  width: ${props => props.channelWidth}px;
  min-height: ${props => props.activityHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  .activity-head {
    position: absolute;
    top: 0;
    width: ${props => props.channelWidth}px;
    height: ${props => props.channelWidth}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.activityColour};
    border-radius: 50%;
    &__inner {
      width: ${props => props.channelWidth - 2}px;
      height: ${props => props.channelWidth - 2}px;
      background-image: url(${props => props.thumbnail});
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
    }
  }
  .activity-spine {
    background-color: ${props => props.activityColour};
    height: ${props => props.activityHeight - 10}px;
    width: ${props => props.channelWidth - 10}px;
    border-radius: 20px;
  }
  .activity-tail {}
`

const Activity = props => {
  const { setActiveGameShow, activeGameShow, setActiveGameShowLoading } = useContext(LayoutContext)

  const activityDetail = _get(props, ['show_activity']) === null ? _get(props, ['game_activity']) : _get(props, ['show_activity'])
  // const activityPlatform = _get(props, ['show_platform']) === null ? _get(props, ['game_platform']) : _get(props, ['show_platform'])
  const isShow = _get(props, ['show_activity']) === null ? false : true
  const new_end_at = _get(props, ['end_at']) === null ? `${props.currentYear}-${props.currentMonth}-${props.currentDay}` : _get(props, ['end_at'])
  const daysTotal = Math.ceil(DateTime.fromISO(new_end_at).diff(DateTime.fromISO(_get(props, ['start_at'])), 'days').toObject().days)

  const handleClickActivity = e => {
    e.preventDefault()
    
    let endpointPath = `/api/games/`
    let gameShowId = _get(props, ['game_activity', 'id'])
    if (isShow) {
      endpointPath = `/api/shows/`
      gameShowId = _get(props, ['show_activity', 'id'])
    }
    if (gameShowId !== _get(activeGameShow, 'id')) {
      setActiveGameShowLoading(true)
      /* eslint-disable-next-line no-undef */
      axios.get(`${process.env.API_DOMAIN}${endpointPath}${gameShowId}`)
        .then(apiResponse => {
          const payload = _get(apiResponse, 'data', [])
          console.log({payload})
          if (payload) {
            setActiveGameShow(payload)
            setActiveGameShowLoading(false)
          }
        })
        .catch(error => {
          console.log(error)
          setActiveGameShowLoading(false)
        })
    }
  }

  return (
    <StyledActivity 
      dayHeight={props.dayHeight}
      channelWidth={props.channelWidth}
      activityHeight={daysTotal * props.dayHeight} 
      activityColour={props.activityColour} 
      thumbnail={_get(activityDetail, ['thumbnail_url'])}
      onClick={handleClickActivity}
    >
      <div className="activity-head">
        <div className="activity-head__inner"></div>
      </div>
      <div className="activity-spine"></div>
      <div className="activity-tail"></div>
    </StyledActivity>
  )
}

Activity.defaultProps = {
}

Activity.propTypes = {
  activityColour: PropTypes.string.isRequired,
  dayHeight: PropTypes.number.isRequired,
  channelWidth: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  start_at: PropTypes.string.isRequired,
  end_at: PropTypes.string,
  show_activity: PropTypes.object,
  show_platform: PropTypes.object,
  game_activity: PropTypes.object,
  game_platform: PropTypes.object,
  completed: PropTypes.bool.isRequired,
  currentDay: PropTypes.string.isRequired,
  currentMonth: PropTypes.string.isRequired,
  currentYear: PropTypes.string.isRequired,
}

export default Activity
