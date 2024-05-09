import React, { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

import Home from './components/pages/home'
import Error from './components/pages/error'
import HomeLoading from './components/home/home_loading'
const Timeline = lazy(() => import('./components/pages/timeline'))
const Stats = lazy(() => import('./components/pages/stats'))

const StyledLoading = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const renderHomeLoading = () => (
  <StyledLoading>
    <HomeLoading />
  </StyledLoading>
)

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/timeline',
    element: (
      <Suspense fallback={renderHomeLoading()}>
        <Timeline />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: '/stats',
    element: (
      <Suspense fallback={renderHomeLoading()}>
        <Stats />
      </Suspense>
    ),
    errorElement: <Error />,
  },
])
