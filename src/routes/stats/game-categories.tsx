import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { gameCategories } from '../../queries/stats'

import GameCategories from '../../components/stats/charts/game_categories'
import { StyledChart } from './index'

export const Route = createFileRoute('/stats/game-categories')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(gameCategories)
  },
  component: StatsGameCategories,
  pendingComponent: () => <div>Loading...</div>,
})

function StatsGameCategories() {
  const { data } = useSuspenseQuery(gameCategories)

  return (
    <StyledChart>
      <h1 className="chart-title">Gaming genres</h1>
      <h3 className="chart-subtitle">
        Breakdown of game genres I've played since 2021
      </h3>
      <div data-testid="chart">
        <GameCategories payload={data} />
      </div>
    </StyledChart>
  )
}
