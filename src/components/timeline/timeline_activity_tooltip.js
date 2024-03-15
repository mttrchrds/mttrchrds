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
  color: ${props => props.theme.colors.timeline.text0};
  border-radius: 6px;
  border-top-right-radius: ${props =>
    props.$alignment === 'left' ? '0' : '6px'};
  border-top-left-radius: ${props =>
    props.$alignment === 'right' ? '0' : '6px'};
  .tooltip-title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .tooltip-timestamp {
    font-size: 12px;
  }
`

const TimelineActivityTooltip = props => {
  const calculateLeft = () => {
    if (props.alignment === 'left') {
      return props.positionX - 5 - props.tooltipWidth
    }
    return props.positionX + 5
  }

  const calculateTop = () => {
    return props.positionY - 5
  }

  const renderTooltipTimestamp = () => {
    const start_at_formatted = DateTime.fromISO(
      _get(props, ['startAt']),
    ).toLocaleString(DateTime.DATE_FULL)
    if (_get(props, ['endAt'])) {
      return `${start_at_formatted} to ${DateTime.fromISO(_get(props, ['endAt'])).toLocaleString(DateTime.DATE_FULL)}`
    }
    return `Started ${start_at_formatted}`
  }

  return (
    <StyledActivityTooltip
      $alignment={props.alignment}
      style={{
        top: calculateTop(),
        left: calculateLeft(),
      }}
      $activityColour={props.activityColour}
      $tooltipWidth={props.tooltipWidth}
    >
      <div className="tooltip-title">{props.alignment}</div>
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
  alignment: PropTypes.oneOf(['left', 'right']).isRequired,
}

export default TimelineActivityTooltip
