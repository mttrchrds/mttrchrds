import React from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

const StyledStatsTabs = styled.nav`
  display: flex;
`

interface StyledStatsTabProps {
  $active: boolean
}

const StyledStatsTab = styled.button<StyledStatsTabProps>``

interface StatsTabsProps {
  activeTab: StatsTab
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>, tab: StatsTab) => void
}

const StatsTabs: React.FC<StatsTabsProps> = ({ activeTab, clickHandler }) => {
  return (
    <StyledStatsTabs>
      <StyledStatsTab
        $active={activeTab === StatsTab.GAME ? true : false}
        onClick={e => clickHandler(e, StatsTab.GAME)}
      >
        Games
      </StyledStatsTab>
      <StyledStatsTab
        $active={activeTab === StatsTab.GAME ? true : false}
        onClick={e => clickHandler(e, StatsTab.SHOW)}
      >
        Shows
      </StyledStatsTab>
    </StyledStatsTabs>
  )
}

export default StatsTabs
