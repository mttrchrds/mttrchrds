import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { StatsGameTab, StatsTab } from '../../helpers/enums'

import { updateActiveGameTab } from '../../redux/stats/stats_slice'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

const StyledStatsNavigation = styled.nav`
  display: flex;
  flex-direction: column;
`

interface StyledStatsNavigationItemProps {
  $active: boolean
}

const StyledStatsNavigationItem = styled.button<StyledStatsNavigationItemProps>``

interface StatsNavigationProps {
  activeTab: StatsTab
}

const StatsNavigation: React.FC<StatsNavigationProps> = ({ activeTab }) => {
  const dispatch = useAppDispatch()
  const activeGameTab = useAppSelector(state => state.stats.activeGameTab)

  const renderGameNavigation = () => (
    <>
      <StyledStatsNavigationItem
        $active={activeGameTab === StatsGameTab.GAME_DAYS ? true : false}
        onClick={e => {
          e.preventDefault()
          dispatch(updateActiveGameTab(StatsGameTab.GAME_DAYS))
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
    </>
  )

  const renderShowNavigation = () => (
    <StyledStatsNavigationItem $active={false}>
      Show chart 1
    </StyledStatsNavigationItem>
  )

  const renderNavigation = () => {
    if (activeTab === StatsTab.SHOW) {
      return renderShowNavigation()
    }
    return renderGameNavigation()
  }

  return <StyledStatsNavigation>{renderNavigation()}</StyledStatsNavigation>
}

export default StatsNavigation
