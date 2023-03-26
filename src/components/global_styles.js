import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    background-color: ${props => props.theme.colors.black};
  }
`

export default GlobalStyles
