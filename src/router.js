import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import TimelineProvider from './providers/timeline_provider'
import Home from './components/pages/home'
import Error from './components/pages/error'
import Timeline from './components/pages/timeline'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/timeline',
    element: (
      <TimelineProvider>
        <Timeline />
      </TimelineProvider>
    ),
    errorElement: <Error />,
  },
])
