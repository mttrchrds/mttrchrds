import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/')({
  component: StatsIndex,
})

function StatsIndex() {
  return (
    <div>
      <h1>Stats Index</h1>
    </div>
  )
}
