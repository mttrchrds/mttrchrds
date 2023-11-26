import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import router from './router'

import theme from './styles/theme'

import GlobalStyles from './components/global_styles'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <RouterProvider router={router} />
  </ThemeProvider>
)
