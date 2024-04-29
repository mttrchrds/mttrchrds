import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

import { mqMin } from '../../helpers/media_queries'

import StatsNavigation from './stats_navigation'
import GameChart from './game_chart'
import ShowChart from './show_chart'
import Container from '../layout/container'

const navWidth = '240px'

const StyledStatsLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .stats-tabs-container {
    padding-top: 10px;
    display: flex;
    padding-left: ${navWidth};
    background-color: ${props => props.theme.colors.stats.background};
  }
  .stats-layout-container {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    &__nav {
      width: 100%;
      background-color: ${props =>
        props.theme.colors.stats.navigationBackground};
    }
    &__content {
      flex-grow: 1;
      padding: 20px;
      background-color: ${props => props.theme.colors.stats.contentBackground};
    }
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .stats-layout-container {
      margin-top: 20px;
      flex-direction: row;
      &__nav {
        margin-top: 36px;
        width: ${props => navWidth};
      }
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
      <Container stretch={true}>
        {/* <div className="stats-tabs-container">{tabs}</div> */}
        <div className="stats-layout-container">
          <div className="stats-layout-container__nav">
            <StatsNavigation activeTab={activeTab} />
          </div>
          <div className="stats-layout-container__content">
            {renderStatsContent()}
          </div>
        </div>
      </Container>
    </StyledStatsLayout>
  )
}

export default StatsLayout
