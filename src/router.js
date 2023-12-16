import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ScreenTimeProvider from './providers/screen_time_provider'
import Home from './components/pages/home'
import Error from './components/pages/error'
import ScreenTime from './components/pages/screen_time'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/screentime',
    element: <ScreenTimeProvider><ScreenTime /></ScreenTimeProvider>,
    errorElement: <Error />,
  },
])
