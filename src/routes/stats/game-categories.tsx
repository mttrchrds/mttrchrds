import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/game-categories')({
  component: GameCategories,
})

function GameCategories() {
  return <div>Hello "/stats/game-categories"!</div>
}
