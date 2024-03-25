import styled from 'styled-components'

const BlankState = styled.article`
  height: inherit;
  min-height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: ${props => props.theme.colors.text1};
    font-size: ${props => props.theme.typography.sizeLarge};
  }
`

export default BlankState
