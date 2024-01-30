import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { DateTime } from 'luxon'

const StyledActivityTooltip = styled.div`
  box-sizing: border-box; 
  position: absolute;
  z-index: 10;
  width: ${props => props.$tooltipWidth}px;
  padding: 15px;
  background-color: ${props => props.$activityColour};
  color: #1E2639;
  border-radius: 6px;
  border-top-right-radius: 0;
  .tooltip-title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .tooltip-timestamp {
    font-size: 12px;
  }
`

const TimelineActivityTooltip = props => {
  const renderTooltipTimestamp = () => {
    const start_at_formatted = DateTime.fromISO(_get(props, ['startAt'])).toLocaleString(DateTime.DATE_FULL)
    if (_get(props, ['endAt'])) {
      const end_at_formatted = _get(props, ['endAt']) ? DateTime.fromISO(_get(props, ['endAt'])).toLocaleString(DateTime.DATE_FULL) : 'now'
      return `${start_at_formatted} to ${end_at_formatted}`
    }
    return `Started ${start_at_formatted}`
  }

  return (
    <StyledActivityTooltip 
      style={{
        top: props.positionY,
        left: props.positionX,
      }}
      $activityColour={props.activityColour}
      $tooltipWidth={props.tooltipWidth}>
      <div className="tooltip-title">{`${props.title} (${props.platform})`}</div>
      <div className="tooltip-timestamp">{renderTooltipTimestamp()}</div>
    </StyledActivityTooltip>
  )
}

TimelineActivityTooltip.defaultProps = {}

TimelineActivityTooltip.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  tooltipWidth: PropTypes.number,
  activityColour: PropTypes.string,
  startAt: PropTypes.string,
  endAt: PropTypes.string,
  title: PropTypes.string,
  platform: PropTypes.string,
}

export default TimelineActivityTooltip
