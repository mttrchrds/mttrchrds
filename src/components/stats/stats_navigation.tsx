import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import { updateActiveTab } from '../../redux/stats/stats_slice'

import theme from '../../styles/theme'

import { mqMin } from '../../helpers/media_queries'

import IconBurger from '../icons/icon_burger'
import IconClose from '../icons/icon_close'

interface StyledStatsNavigationProps {
  $mobileNavOpen: boolean
}

const StyledStatsNavigation = styled.nav<StyledStatsNavigationProps>`
  display: flex;
  flex-direction: column;
  .mobile-header {
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
  }
  .nav-items-container {
    display: ${props => (props.$mobileNavOpen ? 'block' : 'none')};
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      display: block;
    }
  }
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

interface StatsNavigationProps {
  activeTab: StatsTab
}

const StatsNavigation = () => {
  const dispatch = useAppDispatch()

  const activeTab = useAppSelector(state => state.stats.activeTab)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleClickMobileHeader = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMobileNavOpen(current => !current)
  }

  return (
    <StyledStatsNavigation $mobileNavOpen={mobileNavOpen}>
      <button className="mobile-header" onClick={handleClickMobileHeader}>
        <h3>View more stats</h3>
        {mobileNavOpen ? (
          <IconClose colour={theme.colors.stats.text} />
        ) : (
          <IconBurger colour={theme.colors.stats.text} />
        )}
      </button>
      <div className="nav-items-container">
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
      </div>
    </StyledStatsNavigation>
  )
}

export default StatsNavigation
