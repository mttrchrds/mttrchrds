import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/show-platform-years')({
  component: ShowPlatformYears,
})

function ShowPlatformYears() {
  return <div>Hello "/stats/show-platform-years"!</div>
}
