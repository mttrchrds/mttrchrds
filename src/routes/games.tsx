import { createFileRoute } from '@tanstack/react-router'

import Home from '../components/layout/home/home'

export const Route = createFileRoute('/games')({
  component: Games,
})

function Games() {
  return (
    <Home>
      <div className="p-2">
        <h3>Games</h3>
      </div>
    </Home>
  )
}