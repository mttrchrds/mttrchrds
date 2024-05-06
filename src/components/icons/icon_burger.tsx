import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'

interface StyledIconBurgerProps {
  $colour: string
}

const StyledIconBurger = styled.svg<StyledIconBurgerProps>`
  path {
    fill: ${props => props.$colour};
  }
`

interface IconBurgerProps {
  colour?: string
}

const IconBurger: React.FC<IconBurgerProps> = ({
  colour = theme.colors.text,
}) => (
  <StyledIconBurger
    $colour={colour}
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
  </StyledIconBurger>
)

export default IconBurger
