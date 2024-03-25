import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { MemoryRouter } from 'react-router-dom'

import theme from '../styles/theme'

import { setupStore } from '../redux/store'

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) => {
  /* eslint-disable-next-line react/prop-types */
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
