import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.typography.sizeBase};
    margin: 0;
  }
`

export default GlobalStyles
