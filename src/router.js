import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from './components/pages/Home'
import Error from './components/pages/Error'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
])
