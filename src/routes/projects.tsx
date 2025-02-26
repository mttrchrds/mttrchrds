import { createFileRoute } from '@tanstack/react-router'

import Home from '../components/layout/home/home'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <Home>
      <div className="p-2">
        <h3>Projects</h3>
      </div>
    </Home>
  )
}
