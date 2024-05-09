import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'

interface StyledIconCloseProps {
  $colour: string
}

const StyledIconClose = styled.svg<StyledIconCloseProps>`
  path {
    fill: ${props => props.$colour};
  }
`

interface IconCloseProps {
  colour?: string
}

const IconClose: React.FC<IconCloseProps> = ({
  colour = theme.colors.text,
}) => (
  <StyledIconClose
    $colour={colour}
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </StyledIconClose>
)

export default IconClose
