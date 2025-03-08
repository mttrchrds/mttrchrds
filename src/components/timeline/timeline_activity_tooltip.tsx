import React from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import { DateTime } from 'luxon'

interface StyledTimelineActivityTooltipProps {
  $tooltipWidth: number
  $activityColour: string
  $alignment: 'left' | 'right'
}

const StyledTimelineActivityTooltip = styled.div<StyledTimelineActivityTooltipProps>`
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

interface TimelineActivityTooltipProps {
  positionX: number
  positionY: number
  tooltipWidth: number
  activityColour: string
  startAt: string
  endAt: string | null
  title: string | undefined
  platform: string | undefined
  alignment: 'left' | 'right'
}

const TimelineActivityTooltip: React.FC<TimelineActivityTooltipProps> = ({
  positionX,
  positionY,
  tooltipWidth,
  activityColour,
  startAt,
  endAt,
  title,
  platform,
  alignment,
}) => {
  const calculateLeft = () => {
    if (alignment === 'left') {
      return positionX - 5 - tooltipWidth
    }
    return positionX + 5
  }

  const calculateTop = () => {
    return positionY - 5
  }

  const renderTooltipTimestamp = () => {
    const start_at_formatted = DateTime.fromISO(startAt).toLocaleString(
      DateTime.DATE_FULL,
    )
    if (endAt) {
      return `${start_at_formatted} to ${DateTime.fromISO(endAt).toLocaleString(DateTime.DATE_FULL)}`
    }
    return `Started ${start_at_formatted}`
  }

  return (
    <StyledTimelineActivityTooltip
      $alignment={alignment}
      style={{
        top: calculateTop(),
        left: calculateLeft(),
      }}
      $activityColour={activityColour}
      $tooltipWidth={tooltipWidth}
    >
      <div className="tooltip-title">{`${title} (${platform})`}</div>
      <div className="tooltip-timestamp">{renderTooltipTimestamp()}</div>
    </StyledTimelineActivityTooltip>
  )
}

export default TimelineActivityTooltip
