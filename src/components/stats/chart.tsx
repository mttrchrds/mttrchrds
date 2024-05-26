import React, { useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import { StatsType } from '../../helpers/enums'

import {
  loadGameDays,
  loadShowPlatformsYears,
  loadGameCategories,
  loadActivityMonths,
} from '../../redux/stats/stats_slice'

import GameDays from './charts/game_days'
import ShowPlatformsYears from './charts/show_platforms_years'
import Spinner from '../spinner'
import GameCategories from './charts/game_categories'
import ActivityMonths from './charts/activity_months'

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

interface ChartProps {
  statsType: StatsType
}

const Chart: React.FC<ChartProps> = ({ statsType }) => {
  const dispatch = useAppDispatch()
  const chartLoading = useAppSelector(state => state.stats.chartLoading)
  const gameDays = useAppSelector(state => state.stats.gameDays)
  const activityMonths = useAppSelector(state => state.stats.activityMonths)
  const showPlatformsYears = useAppSelector(
    state => state.stats.showPlatformsYears,
  )
  const gameCategories = useAppSelector(state => state.stats.gameCategories)

  useEffect(() => {
    if (statsType === StatsType.gamecategories) {
      if (gameCategories.length === 0) {
        dispatch(loadGameCategories())
      }
    }
    if (statsType === StatsType.gamedays) {
      if (gameDays.length === 0) {
        dispatch(loadGameDays())
      }
    }
    if (statsType === StatsType.showplatformyears) {
      if (showPlatformsYears.data.length === 0) {
        dispatch(loadShowPlatformsYears())
      }
    }
    if (statsType === StatsType.activitymonths) {
      if (activityMonths.data.length === 0) {
        dispatch(loadActivityMonths())
      }
    }
  }, [])

  const renderChart = (
    title: string,
    subtitle: string,
    chart: ReactNode,
  ): ReactNode => (
    <>
      <h1 className="chart-title">{title}</h1>
      <h3 className="chart-subtitle">{subtitle}</h3>
      <div data-testid="chart">{chart}</div>
    </>
  )

  const renderContent = (): ReactNode => {
    if (chartLoading) {
      return (
        <div className="chart-loading-container" data-testid="loading">
          <Spinner />
        </div>
      )
    }
    if (statsType === StatsType.gamedays) {
      return renderChart(
        'Most played games',
        'My top 10 games based on the total number of recorded days being my active game',
        <GameDays data={gameDays} />,
      )
    }
    if (statsType === StatsType.showplatformyears) {
      return renderChart(
        'Streaming platform popularity',
        "Comparison of the number of TV shows I've watched on each platform each year",
        <ShowPlatformsYears payload={showPlatformsYears} />,
      )
    }
    if (statsType === StatsType.gamecategories) {
      return renderChart(
        'Gaming genres',
        "Breakdown of game genres I've played since 2021",
        <GameCategories data={gameCategories} />,
      )
    }
    if (statsType === StatsType.activitymonths) {
      return renderChart(
        'Monthly activity',
        'Number of active games and TV shows per month for each year since 2021',
        <ActivityMonths payload={activityMonths} />,
      )
    }
  }

  return <StyledChart>{renderContent()}</StyledChart>
}

export default Chart
