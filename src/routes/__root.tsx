import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'

import Layout from '../components/layout/layout'
import { Error } from '../components/error'

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  context() {
    console.log('context')
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <Layout>
        <div>
          <p>Page not found!</p>
          <Link to="/">Start Over</Link>
        </div>
      </Layout>
    )
  },
  errorComponent: Error
})