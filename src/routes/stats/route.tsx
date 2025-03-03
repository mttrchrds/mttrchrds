import { createFileRoute, Outlet } from '@tanstack/react-router'
import styled from 'styled-components'

const StyledStatsLayout = styled.div``
import StatsLayout from '../../components/layout/stats/stats'
import PageNotFound from '../../components/page_not_found'

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
