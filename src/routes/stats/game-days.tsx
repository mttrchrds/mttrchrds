import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/game-days')({
  component: GameDays,
})

function GameDays() {
  return <div>Hello "/stats/game-days"!</div>
}
