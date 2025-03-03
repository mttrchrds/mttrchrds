import React, { ReactNode, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Link } from '@tanstack/react-router'

import { mqMin } from '../../../helpers/media_queries'

interface StyledStatsNavigationItemProps {
  $active: boolean
}

const StyledStatsNavigationItem = styled(Link)<StyledStatsNavigationItemProps>`
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
  label: string
  path: string
}

const StatsNavigationItem: React.FC<StatsNavigationItemProps> = ({
  active,
  path,
  label,
}) => {
  return (
    <StyledStatsNavigationItem to={path} $active={active}>
      {label}
    </StyledStatsNavigationItem>
  )
}

export default StatsNavigationItem
