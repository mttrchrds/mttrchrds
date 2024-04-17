import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { store } from './redux/store'
import { Provider } from 'react-redux'

import router from './router'

import theme from './styles/theme'

import GlobalStyles from './styles/global_styles'

const loadingPlaceholder = document.getElementById('loading') as HTMLElement
loadingPlaceholder.style.display = 'none'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>,
)
