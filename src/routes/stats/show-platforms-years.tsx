import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { showPlatformsYears } from '../../queries/stats'

import ShowPlatformsYears from '../../components/stats/charts/show_platforms_years'
import { StyledChart } from './index'

export const Route = createFileRoute('/stats/show-platforms-years')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(showPlatformsYears)
  },
  component: StatsShowPlatformsYears,
  pendingComponent: () => <div>Loading...</div>,
})

function StatsShowPlatformsYears() {
  const { data } = useSuspenseQuery(showPlatformsYears)

  return (
    <StyledChart>
      <h1 className="chart-title">Streaming platform popularity</h1>
      <h3 className="chart-subtitle">
        Comparison of the number of TV shows I've watched on each platform each
        year
      </h3>
      <div data-testid="chart">
        <ShowPlatformsYears payload={data} />
      </div>
    </StyledChart>
  )
}
