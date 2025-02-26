import { createFileRoute } from '@tanstack/react-router'

import Home from '../components/layout/home/home'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Home>
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    </Home>
  )
}
