import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ScreenTimeProvider from './providers/screen_time_provider'
import ComingSoon from './components/pages/coming_soon'
import Home from './components/pages/home'
import Error from './components/pages/error'
import ScreenTime from './components/pages/screen_time'

export default createBrowserRouter([
  {
    path: '/',
    element: <ComingSoon />,
    errorElement: <Error />,
  },
  {
    path: '/dev',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/screentime',
    element: <ScreenTimeProvider><ScreenTime /></ScreenTimeProvider>,
    errorElement: <Error />,
  },
])
