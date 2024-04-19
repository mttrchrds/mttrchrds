import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { mqMin } from '../../helpers/media_queries'

const StyledContainer = styled.div`
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
`

interface ContainerProps {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}

export default Container
