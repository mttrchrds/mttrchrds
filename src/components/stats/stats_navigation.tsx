import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import { updateActiveTab } from '../../redux/stats/stats_slice'

const StyledStatsNavigation = styled.nav`
  display: flex;
  flex-direction: column;
`

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
  cursor: pointer;
  padding: 10px;
  border-top: 1px solid #8c8c8c;
  font-weight: ${props => (props.$active ? 'bold' : 'regular')};
  background-color: ${props =>
    props.$active ? props.theme.colors.stats.contentBackground : 'transparent'};
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 1px solid #8c8c8c;
  }
`

interface StatsNavigationProps {
  activeTab: StatsTab
}

const StatsNavigation = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector(state => state.stats.activeTab)

  return (
    <StyledStatsNavigation>
      <StyledStatsNavigationItem
        $active={activeTab === StatsTab.GAME_DAYS ? true : false}
        onClick={e => {
          e.preventDefault()
          dispatch(updateActiveTab(StatsTab.GAME_DAYS))
        }}
      >
        Most played games
      </StyledStatsNavigationItem>
      <StyledStatsNavigationItem
        $active={false}
        onClick={() => console.log('coming soon')}
      >
        Games chart 2
      </StyledStatsNavigationItem>
    </StyledStatsNavigation>
  )
}

export default StatsNavigation
