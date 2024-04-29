import React, { useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import { StatsGameTab } from '../../helpers/enums'

import { loadGameDays } from '../../redux/stats/stats_slice'

import GameDays from './charts/game_days'
import Spinner from '../spinner'

const StyledGameChart = styled.section`
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

interface GameChartProps {}

const GameChart: React.FC<GameChartProps> = () => {
  const dispatch = useAppDispatch()
  const activeGameTab = useAppSelector(state => state.stats.activeGameTab)
  const chartLoading = useAppSelector(state => state.stats.chartLoading)
  const gameDays = useAppSelector(state => state.stats.gameDays)

  useEffect(() => {
    if (activeGameTab === StatsGameTab.GAME_DAYS) {
      if (gameDays.length === 0) {
        dispatch(loadGameDays())
      }
    }
  }, [activeGameTab])

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
    // if (activeGameTab === StatsGameTab.GAME_DAYS) {
    // }
    return renderChart(
      'Most played games',
      'My top 10 games based on the total number of recorded days being my active game',
      <GameDays data={gameDays} />,
    )
  }

  return <StyledGameChart>{renderContent()}</StyledGameChart>
}

export default GameChart
