import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

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
    element: <ScreenTime />,
    errorElement: <Error />,
  },
])
