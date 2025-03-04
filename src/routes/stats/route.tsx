import { createFileRoute, Outlet } from '@tanstack/react-router'

import StatsLayout from '../../components/layout/stats/stats'

export const Route = createFileRoute('/stats')({
  component: Stats,
})

function Stats() {
  return (
    <StatsLayout>
      <Outlet />
    </StatsLayout>
  )
}
