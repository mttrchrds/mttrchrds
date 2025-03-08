import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import styled from 'styled-components'

import { activityMonths } from '../../queries/stats'

import ActivityMonths from '../../components/stats/charts/activity_months'

export const StyledChart = styled.section`
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

export const Route = createFileRoute('/stats/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(activityMonths)
  },
  component: StatsIndex,
  pendingComponent: () => <div>Loading...</div>,
})

function StatsIndex() {
  const { data } = useSuspenseQuery(activityMonths)

  return (
    <StyledChart>
      <h1 className="chart-title">Monthly activity</h1>
      <h3 className="chart-subtitle">
        Number of active games and TV shows per month for each year since 2021
      </h3>
      <div data-testid="chart">
        <ActivityMonths payload={data} />
      </div>
    </StyledChart>
  )
}
