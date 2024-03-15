import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import _get from 'lodash/get'
import axios from 'axios'

import { TimelineContext } from '../../providers/timeline_provider'
import TimelineActivityTooltip from './timeline_activity_tooltip'
import Activity from './activity'

const StyledTimelineActivity = styled.div`
  position: relative;
  width: ${props => props.$channelWidth}px;
  min-height: ${props => props.$activityHeight}px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  .activity-head {
    position: absolute;
    z-index: 3;
    top: 0;
    width: ${props => (props.$activityHover ? `60` : props.$channelWidth)}px;
    height: ${props => (props.$activityHover ? `60` : props.$channelWidth)}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.$activityColour};
    filter: ${props =>
      props.$activityHover ? `brightness(130%)` : `brightness(100%)`};
    border-radius: 50%;
    transition: all 0.1s ease-in-out;
    &__inner {
      width: ${props =>
        props.$activityHover
          ? `${props.$channelWidth + 6}`
          : `${props.$channelWidth - 2}`}px;
      height: ${props =>
        props.$activityHover
          ? `${props.$channelWidth + 6}`
          : `${props.$channelWidth - 2}`}px;
      background-image: url(${props => props.$thumbnail});
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      transition: all 0.1s ease-in-out;
    }
  }
  .activity-spine {
    position: relative;
    z-index: 1;
    background-color: ${props => props.$activityColour};
    height: ${props => props.$activityHeight - 10}px;
    width: ${props => props.$channelWidth - 10}px;
    border-radius: 20px;
    filter: ${props =>
      props.$activityHover ? `brightness(130%)` : `brightness(100%)`};
    transition: all 0.1s ease-in-out;
  }
  .activity-tail {
    position: absolute;
    z-index: 2;
    svg {
      position: relative;
      bottom: 5px;
      fill: ${props => props.$activityColour};
      filter: brightness(75%);
      filter: ${props =>
        props.$activityHover ? `brightness(60%)` : `brightness(75%)`};
      transition: all 0.1s ease-in-out;
    }
  }
  .activity-modal {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    &__header {
      margin-bottom: 5px;
      position: relative;
      height: 24px;
      &__icon {
        position: absolute;
        right: -10px;
        top: 0;
        svg {
          fill: ${props => props.theme.colors.timeline.text1};
        }
      }
    }
    &__container {
      width: 80%;
      background-color: ${props => props.theme.colors.timeline.secondary};
      padding: 10px 20px 20px 20px;
      border-radius: 6px;
    }
  }
`

const StyledActivityModal = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .activity-modal-header {
    margin-bottom: 5px;
    position: relative;
    height: 24px;
    &__icon {
      position: absolute;
      right: -10px;
      top: 0;
      svg {
        fill: ${props => props.theme.colors.timeline.text1};
      }
    }
  }
  .activity-modal-container {
    width: 80%;
    background-color: ${props => props.theme.colors.timeline.secondary};
    padding: 10px 20px 20px 20px;
    border-radius: 6px;
  }
`

const tooltipWidth = 250

const TimelineActivity = props => {
  const {
    setActiveActivity,
    activeActivity,
    setActiveActivityLoading,
    currentDay,
    currentMonth,
    currentYear,
  } = useContext(TimelineContext)

  const [activityHover, setActivityHover] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const [displayActivityModal, setDisplayActivityModal] = useState(false)

  const timelineActivityRef = useRef(null)

  const activityDetail =
    _get(props, ['show_activity']) === null
      ? _get(props, ['game_activity'])
      : _get(props, ['show_activity'])
  const isShow = _get(props, ['show_activity']) === null ? false : true
  const new_end_at =
    _get(props, ['end_at']) === null
      ? `${currentYear}-${currentMonth}-${currentDay}`
      : _get(props, ['end_at'])
  const daysTotal = Math.ceil(
    DateTime.fromISO(new_end_at)
      .diff(DateTime.fromISO(_get(props, ['start_at'])), 'days')
      .toObject().days,
  )

  const handleClickActivity = e => {
    e.preventDefault()
    if (window.screen.width < 768) {
      setDisplayActivityModal(true)
    }
    if (props.id !== _get(activeActivity, 'id')) {
      setActiveActivityLoading(true)
      axios
        /* eslint-disable-next-line no-undef */
        .get(`${process.env.API_DOMAIN}/api/activities/${props.id}`)
        .then(apiResponse => {
          const payload = _get(apiResponse, 'data', [])
          if (payload) {
            setActiveActivity(payload)
            setActiveActivityLoading(false)
          }
        })
        .catch(error => {
          console.log(error)
          setActiveActivityLoading(false)
        })
    }
  }

  const handleMouseEnterActivity = () => {
    if (window.screen.width >= 768) {
      setActivityHover(true)
    }
  }

  const handleMouseLeaveActivity = () => {
    setActivityHover(false)
  }

  const handleMouseMove = e => {
    const bounding = timelineActivityRef.current.getBoundingClientRect()
    const x = e.clientX - bounding.left
    const y = e.clientY - bounding.top
    setTooltipX(x)
    setTooltipY(y)
  }

  const handleClickActivityModal = e => {
    if ([...e.target.classList].includes('activity-modal')) {
      setDisplayActivityModal(false)
    }
  }

  const handleClickCloseIcon = e => {
    e.preventDefault()
    setDisplayActivityModal(false)
  }

  const calculateTooltipAlignment = () => {
    if (
      props.channelIndex === 1 ||
      props.channelIndex === 3 ||
      props.channelIndex === 5
    ) {
      return 'right'
    }
    return 'left'
  }

  const renderTail = () => {
    if (isShow) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M320-120v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z" />
        </svg>
      )
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M189-160q-60 0-102.5-43T42-307q0-9 1-18t3-18l84-336q14-54 57-87.5t98-33.5h390q55 0 98 33.5t57 87.5l84 336q2 9 3.5 18.5T919-306q0 61-43.5 103.5T771-160q-42 0-78-22t-54-60l-28-58q-5-10-15-15t-21-5H385q-11 0-21 5t-15 15l-28 58q-18 38-54 60t-78 22Zm3-80q19 0 34.5-10t23.5-27l28-57q15-31 44-48.5t63-17.5h190q34 0 63 18t45 48l28 57q8 17 23.5 27t34.5 10q28 0 48-18.5t21-46.5q0 1-2-19l-84-335q-7-27-28-44t-49-17H285q-28 0-49.5 17T208-659l-84 335q-2 6-2 18 0 28 20.5 47t49.5 19Zm348-280q17 0 28.5-11.5T580-560q0-17-11.5-28.5T540-600q-17 0-28.5 11.5T500-560q0 17 11.5 28.5T540-520Zm80-80q17 0 28.5-11.5T660-640q0-17-11.5-28.5T620-680q-17 0-28.5 11.5T580-640q0 17 11.5 28.5T620-600Zm0 160q17 0 28.5-11.5T660-480q0-17-11.5-28.5T620-520q-17 0-28.5 11.5T580-480q0 17 11.5 28.5T620-440Zm80-80q17 0 28.5-11.5T740-560q0-17-11.5-28.5T700-600q-17 0-28.5 11.5T660-560q0 17 11.5 28.5T700-520Zm-360 60q13 0 21.5-8.5T370-490v-40h40q13 0 21.5-8.5T440-560q0-13-8.5-21.5T410-590h-40v-40q0-13-8.5-21.5T340-660q-13 0-21.5 8.5T310-630v40h-40q-13 0-21.5 8.5T240-560q0 13 8.5 21.5T270-530h40v40q0 13 8.5 21.5T340-460Zm140-20Z" />
      </svg>
    )
  }

  const renderCloseIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    )
  }

  return (
    <>
      <StyledTimelineActivity
        $dayHeight={props.dayHeight}
        $channelWidth={props.channelWidth}
        $activityHeight={daysTotal * props.dayHeight}
        $activityColour={props.activityColour}
        $thumbnail={_get(activityDetail, ['thumbnail_url'])}
        $activityHover={activityHover}
        onClick={handleClickActivity}
        onMouseEnter={handleMouseEnterActivity}
        onMouseLeave={handleMouseLeaveActivity}
        onMouseMove={handleMouseMove}
        ref={timelineActivityRef}
      >
        <div className="activity-head">
          <div className="activity-head__inner"></div>
        </div>
        <div className="activity-spine"></div>
        <div className="activity-tail">{renderTail()}</div>
        {activityHover && (
          <TimelineActivityTooltip
            positionX={tooltipX}
            positionY={tooltipY}
            activityColour={props.activityColour}
            tooltipWidth={tooltipWidth}
            startAt={_get(props, 'start_at')}
            endAt={_get(props, 'end_at')}
            title={
              _get(props, ['game_activity', 'name'])
                ? _get(props, ['game_activity', 'name'])
                : _get(props, ['show_activity', 'name'])
            }
            platform={
              _get(props, ['game_platform', 'name'])
                ? _get(props, ['game_platform', 'name'])
                : _get(props, ['show_platform', 'name'])
            }
            alignment={calculateTooltipAlignment()}
          />
        )}
      </StyledTimelineActivity>
      {displayActivityModal && (
        <StyledActivityModal
          className="activity-modal"
          onClick={handleClickActivityModal}
        >
          <div className="activity-modal-container">
            <div className="activity-modal-header">
              <div
                className="activity-modal-header__icon"
                onClick={handleClickCloseIcon}
              >
                {renderCloseIcon()}
              </div>
            </div>
            <div className="activity-modal-body">
              <Activity />
            </div>
          </div>
        </StyledActivityModal>
      )}
    </>
  )
}

TimelineActivity.defaultProps = {}

TimelineActivity.propTypes = {
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
  channelIndex: PropTypes.number.isRequired,
}

export default TimelineActivity
