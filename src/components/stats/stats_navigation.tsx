import { useState } from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import { updateActiveTab } from '../../redux/stats/stats_slice'

import { mqMin } from '../../helpers/media_queries'

import IconBurger from '../icons/icon_burger'
import IconClose from '../icons/icon_close'
import StatsNavigationItem from './navigation/stats_navigation_item'
import StatsNavigationToggle from './navigation/stats_navigation_toggle'

interface StyledStatsNavigationProps {
  $mobileNavOpen: boolean
}

const StyledStatsNavigation = styled.nav<StyledStatsNavigationProps>`
  display: flex;
  flex-direction: column;
  .nav-items-container {
    display: ${props => (props.$mobileNavOpen ? 'block' : 'none')};
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      display: block;
    }
  }
`

const StatsNavigation = () => {
  const dispatch = useAppDispatch()

  const activeTab = useAppSelector(state => state.stats.activeTab)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleClickNavigationToggle = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setMobileNavOpen(current => !current)
  }

  return (
    <StyledStatsNavigation $mobileNavOpen={mobileNavOpen}>
      <StatsNavigationToggle
        active={mobileNavOpen}
        clickHandler={handleClickNavigationToggle}
      />
      <div className="nav-items-container">
        <StatsNavigationItem
          active={activeTab === StatsTab.GAME_DAYS ? true : false}
          clickHandler={e => {
            e.preventDefault()
            dispatch(updateActiveTab(StatsTab.GAME_DAYS))
          }}
        >
          Most played games
        </StatsNavigationItem>
        <StatsNavigationItem
          active={activeTab === StatsTab.SHOW_PLATFORMS_YEARS ? true : false}
          clickHandler={e => {
            e.preventDefault()
            dispatch(updateActiveTab(StatsTab.SHOW_PLATFORMS_YEARS))
          }}
        >
          Streaming platform popularity
        </StatsNavigationItem>
      </div>
    </StyledStatsNavigation>
  )
}

export default StatsNavigation
