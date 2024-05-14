import React, { useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import { StatsTab } from '../../helpers/enums'

import {
  loadGameDays,
  loadShowPlatformsYears,
  loadGameCategories,
} from '../../redux/stats/stats_slice'

import GameDays from './charts/game_days'
import ShowPlatformsYears from './charts/show_platforms_years'
import Spinner from '../spinner'
import GameCategories from './charts/game_categories'

const StyledChart = styled.section`
  .chart-loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chart-title {
    margin-top: 0;
    margin-bottom: 20px;
  }
  .chart-subtitle {
    margin-bottom: 0;
  }
`

interface ChartProps {}

const Chart: React.FC<ChartProps> = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector(state => state.stats.activeTab)
  const chartLoading = useAppSelector(state => state.stats.chartLoading)
  const gameDays = useAppSelector(state => state.stats.gameDays)
  const showPlatformsYears = useAppSelector(
    state => state.stats.showPlatformsYears,
  )
  const gameCategories = useAppSelector(state => state.stats.gameCategories)

  useEffect(() => {
    if (activeTab === StatsTab.GAME_CATEGORIES) {
      if (gameCategories.length === 0) {
        dispatch(loadGameCategories())
      }
    }
    if (activeTab === StatsTab.GAME_DAYS) {
      if (gameDays.length === 0) {
        dispatch(loadGameDays())
      }
    }
    if (activeTab === StatsTab.SHOW_PLATFORMS_YEARS) {
      if (showPlatformsYears.data.length === 0) {
        dispatch(loadShowPlatformsYears())
      }
    }
  }, [activeTab])

  const renderChart = (
    title: string,
    subtitle: string,
    chart: ReactNode,
  ): ReactNode => (
    <>
      <h1 className="chart-title">{title}</h1>
      <h3 className="chart-subtitle">{subtitle}</h3>
      {chart}
    </>
  )

  const renderContent = (): ReactNode => {
    if (chartLoading) {
      return (
        <div className="chart-loading-container">
          <Spinner />
        </div>
      )
    }
    if (activeTab === StatsTab.GAME_DAYS) {
      return renderChart(
        'Most played games',
        'My top 10 games based on the total number of recorded days being my active game',
        <GameDays data={gameDays} />,
      )
    }
    if (activeTab === StatsTab.SHOW_PLATFORMS_YEARS) {
      return renderChart(
        'Streaming platform popularity',
        "The number of TV shows I've watched on each platform each year",
        <ShowPlatformsYears payload={showPlatformsYears} />,
      )
    }
    if (activeTab === StatsTab.GAME_CATEGORIES) {
      return renderChart(
        'Gaming genres',
        "Breakdown of genre of games I've played from 2021",
        <GameCategories data={gameCategories} />,
      )
    }
  }

  return <StyledChart>{renderContent()}</StyledChart>
}

export default Chart
