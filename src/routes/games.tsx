import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { latestGames } from '../queries/home'

import HomeLayout from '../components/layout/home/home'
import HomeActivities from '../components/layout/home/home_activities'
import HomeLoading from '../components/layout/home/home_loading'

export const Route = createFileRoute('/games')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(latestGames)
  },
  component: Games,
  pendingComponent: () => <HomeLayout><HomeLoading /></HomeLayout>,
})

function Games() {
  const { data } = useSuspenseQuery(latestGames)

  return (
    <HomeLayout>
      <HomeActivities activities={data} />
    </HomeLayout>
  )
}