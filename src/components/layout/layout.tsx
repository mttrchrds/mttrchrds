import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Container from './container'
import Header from './header'

import theme from '../../styles/theme'

interface StyledLayoutProps {
  $bodyColour: string
}

const StyledLayout = styled.div<StyledLayoutProps>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .layout-header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .layout-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.$bodyColour};
  }
`

interface LayoutProps {
  bodyColour?: string
  navigationTitle?: string
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  bodyColour = theme.colors.primary,
  navigationTitle,
  children,
}) => {
  return (
    <StyledLayout $bodyColour={bodyColour}>
      <div className="layout-header">
        <Container>
          <Header title={navigationTitle} />
        </Container>
      </div>
      <div className="layout-body">{children}</div>
    </StyledLayout>
  )
}

export default Layout
