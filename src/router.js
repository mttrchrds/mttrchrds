import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from './components/pages/home'
import Error from './components/pages/error'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
])
