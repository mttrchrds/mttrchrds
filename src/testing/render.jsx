import React from 'react'
import { render as testingLibraryRender } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

// Creating custom React Testing Library 'render' function so we don't have to import ThemeProvider on each test
const render = child => {
  return {
    ...testingLibraryRender(
      <ThemeProvider theme={theme}>{child}</ThemeProvider>,
    ),
  }
}

export default render
