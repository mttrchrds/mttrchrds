import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

import StatsNavigation from './stats_navigation'
import GameChart from './game_chart'
import ShowChart from './show_chart'

const StyledStatsLayout = styled.div`
  .stats-tabs-container {
    display: flex;
    padding-left: 200px;
  }
  .stats-layout-container {
    display: flex;
    &__nav {
      width: 200px;
    }
  }
`

const StyledStatsTab = styled.div``

interface StatsLayoutProps {
  tabs: ReactNode
  activeTab: StatsTab
}

const StatsLayout: React.FC<StatsLayoutProps> = ({ activeTab, tabs }) => {
  const renderStatsContent = (): ReactNode => {
    if (activeTab === StatsTab.SHOW) {
      return <ShowChart />
    }
    return <GameChart />
  }

  return (
    <StyledStatsLayout>
      <div className="stats-tabs-container">{tabs}</div>
      <div className="stats-layout-container">
        <div className="stats-layout-container__nav">
          <StatsNavigation activeTab={activeTab} />
        </div>
        {renderStatsContent()}
      </div>
    </StyledStatsLayout>
  )
}

export default StatsLayout
