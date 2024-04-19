import React, { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import styled from 'styled-components'

import Home from './components/pages/home'
import Error from './components/pages/error'
import HomeLoading from './components/home/home_loading'
const Timeline = lazy(() => import('./components/pages/timeline'))

const StyledTimelineLoading = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const renderTimelineLoading = () => (
  <StyledTimelineLoading>
    <HomeLoading />
  </StyledTimelineLoading>
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
      <Suspense fallback={renderTimelineLoading()}>
        <Timeline />
      </Suspense>
    ),
    errorElement: <Error />,
  },
])
