import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'

import theme from '../styles/theme'

import { setupStore } from '../redux/store'

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const preloadedState = {}
  const store = setupStore(preloadedState)

  const initialOptions = {
    preloadedState,
    store,
    ...options,
  }

  /* eslint-disable-next-line react/prop-types */
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: AllTheProviders, ...initialOptions }),
  }
}
