import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

import theme from '../../../styles/theme'

import { mqMin } from '../../../helpers/media_queries'

import IconBurger from '../../icons/icon_burger'
import IconClose from '../../icons/icon_close'

interface StyledStatsNavigationToggleProps {
  $active: boolean
}

const StyledStatsNavigationToggle = styled.button<StyledStatsNavigationToggleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 10px 15px;
  border: 0;
  background-color: ${props => props.theme.colors.stats.contentBackground};
  border-bottom: 1px solid ${props => props.theme.colors.stats.border};
  h3 {
    margin: 0;
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    display: none;
  }
`

interface StatsNavigationToggleProps {
  active: boolean
  clickHandler: MouseEventHandler
}

const StatsNavigationToggle: React.FC<StatsNavigationToggleProps> = ({
  active,
  clickHandler,
}) => {
  return (
    <StyledStatsNavigationToggle $active={active} onClick={clickHandler}>
      <h3>View more stats</h3>
      {active ? (
        <IconClose colour={theme.colors.stats.text} />
      ) : (
        <IconBurger colour={theme.colors.stats.text} />
      )}
    </StyledStatsNavigationToggle>
  )
}

export default StatsNavigationToggle
