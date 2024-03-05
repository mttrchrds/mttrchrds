import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme.colors.background};
    font-size: ${props => props.theme.typography.sizeBase};
  }
`

export default GlobalStyles
