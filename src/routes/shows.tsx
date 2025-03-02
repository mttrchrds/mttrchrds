import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { latestShows } from '../queries/home'

import HomeLayout from '../components/layout/home/home'
import HomeActivities from '../components/layout/home/home_activities'
import HomeLoading from '../components/layout/home/home_loading'

export const Route = createFileRoute('/shows')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(latestShows)
  },
  component: Shows,
  pendingComponent: () => <HomeLayout><HomeLoading /></HomeLayout>,
})

function Shows() {
  const { data } = useSuspenseQuery(latestShows)

  return (
    <HomeLayout>
      <HomeActivities activities={data} shows={true} />
    </HomeLayout>
  )
}