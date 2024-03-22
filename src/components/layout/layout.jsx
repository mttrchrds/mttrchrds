import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Container from './container'
import Header from './header'

import theme from '../../styles/theme'

const StyledLayout = styled.div`
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

const Layout = props => {
  return (
    <StyledLayout $bodyColour={props.bodyColour}>
      <div className="layout-header">
        <Container>
          <Header title={props.navigationTitle} />
        </Container>
      </div>
      <div className="layout-body">{props.children}</div>
    </StyledLayout>
  )
}

Layout.defaultProps = {
  bodyColour: theme.colors.primary,
  navigationTitle: '',
}

Layout.propTypes = {
  children: PropTypes.node,
  bodyColour: PropTypes.string,
  navigationTitle: PropTypes.string,
}

export default Layout
