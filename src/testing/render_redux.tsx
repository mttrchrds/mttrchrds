import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'

import theme from '../styles/theme'

import { setupStore } from '../redux/store'

export const renderWithProviders = (
  ui: ReactElement,
  routerPath?: string[],
) => {
  const preloadedState = {}
  const store = setupStore(preloadedState)

  const initialOptions = {
    preloadedState,
    store,
  }

  /* eslint-disable-next-line react/prop-types */
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={routerPath}>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: AllTheProviders, ...initialOptions }),
  }
}
