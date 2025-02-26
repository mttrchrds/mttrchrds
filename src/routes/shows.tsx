import { createFileRoute } from '@tanstack/react-router'

import Home from '../components/layout/home/home'

export const Route = createFileRoute('/shows')({
  component: Shows,
})

function Shows() {
  return (
    <Home>
      <div className="p-2">
        <h3>Shows</h3>
      </div>
    </Home>
  )
}