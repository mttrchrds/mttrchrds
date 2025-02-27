import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import { Activity } from '../types/timeline2'

import HomeLayout from '../components/layout/home/home'
import HomeError from '../components/layout/home/home_error'
import HomeActivities from '../components/layout/home/home_activities'

export const Route = createLazyFileRoute('/shows')({
  component: Shows,
})

function Shows() {
  const { isPending, error, data } = useQuery<Activity[]>({
    queryKey: ['latest-shows'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/latest-shows`,
      )
      if (!response.ok) {
        throw new Error('Data could not be loaded')
      }
      return response.json()
    },
  })

  const renderContent = () => {
    if (error) {
      return <HomeError error={error.message} />
    }
    return <HomeActivities loading={isPending} activities={data} shows={true} />
  }

  return (
    <HomeLayout>
      {renderContent()}
    </HomeLayout>
  )
}