import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { mqMin } from '../../helpers/media_queries'

interface StyledContainerProps {
  $stretch: boolean
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  margin: 0 auto;
  @media ${props => mqMin(props.theme.breakPoints.sm)} {
    width: 500px;
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    width: 740px;
  }
  @media ${props => mqMin(props.theme.breakPoints.lg)} {
    width: 960px;
  }
  @media ${props => mqMin(props.theme.breakPoints.xl)} {
    width: 1150px;
  }
  @media ${props => mqMin(props.theme.breakPoints.xxl)} {
    width: 1320px;
  }
  display: ${props => (props.$stretch ? 'flex' : 'block')};
  flex-grow: ${props => (props.$stretch ? 1 : 0)};
  flex-direction: column;
`

interface ContainerProps {
  children: ReactNode
  stretch?: boolean
}

const Container: React.FC<ContainerProps> = ({ children, stretch = false }) => {
  return <StyledContainer $stretch={stretch}>{children}</StyledContainer>
}

export default Container
