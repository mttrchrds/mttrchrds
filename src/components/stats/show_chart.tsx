import React, { useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import Spinner from '../spinner'

const StyledShowChart = styled.section`
  .chart-loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

interface ShowChartProps {}

const ShowChart: React.FC<ShowChartProps> = () => {
  // const dispatch = useAppDispatch()
  const chartLoading = useAppSelector(state => state.stats.chartLoading)

  const renderChart = (): ReactNode => {
    if (chartLoading) {
      return (
        <div className="chart-loading-container">
          <Spinner />
        </div>
      )
    }
    return <div>Coming soon</div>
  }

  return <StyledShowChart>{renderChart()}</StyledShowChart>
}

export default ShowChart
