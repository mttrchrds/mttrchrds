import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import Layout from '../components/layout/layout'

export const Route = createRootRoute({
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
  errorComponent: () => {
    return (
      <Layout>
        <div>
          <p>An error occurred! :(</p>
          <Link to="/">Start Over</Link>
        </div>
      </Layout>
    )
  },
})