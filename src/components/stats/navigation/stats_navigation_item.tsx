import React, { ReactNode, MouseEventHandler } from 'react'
import styled from 'styled-components'

import { mqMin } from '../../../helpers/media_queries'

interface StyledStatsNavigationItemProps {
  $active: boolean
}

const StyledStatsNavigationItem = styled.a<StyledStatsNavigationItemProps>`
  &:link,
  &:visited,
  &:active {
    color: ${props => props.theme.colors.stats.text};
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  display: block;
  cursor: pointer;
  padding: 10px 15px;
  border-top: 1px solid ${props => props.theme.colors.stats.border};
  font-weight: ${props => (props.$active ? 'bold' : 'normal')};
  background-color: ${props => props.theme.colors.stats.background};
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.stats.border};
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    background-color: ${props => props.theme.colors.stats.contentBackground};
  }
`

interface StatsNavigationItemProps {
  active: boolean
  clickHandler: MouseEventHandler
  children: ReactNode
}

const StatsNavigationItem: React.FC<StatsNavigationItemProps> = ({
  active,
  clickHandler,
  children,
}) => {
  return (
    <StyledStatsNavigationItem href="#" $active={active} onClick={clickHandler}>
      {children}
    </StyledStatsNavigationItem>
  )
}

export default StatsNavigationItem
