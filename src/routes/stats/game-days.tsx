import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { gameDays } from '../../queries/stats'

import GameDays from '../../components/stats/charts/game_days'
import { StyledChart } from './index'

export const Route = createFileRoute('/stats/game-days')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(gameDays)
  },
  component: StatsGameDays,
  pendingComponent: () => <div>Loading...</div>,
})

function StatsGameDays() {
  const { data } = useSuspenseQuery(gameDays)

  return (
    <StyledChart>
      <h1 className="chart-title">Most played games</h1>
      <h3 className="chart-subtitle">
        My top 10 games based on the total number of recorded days being my
        active game
      </h3>
      <div data-testid="chart">
        <GameDays payload={data} />
      </div>
    </StyledChart>
  )
}
