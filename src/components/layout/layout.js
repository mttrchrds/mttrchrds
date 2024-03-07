import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Container from './container'
import Navigation from './navigation'

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
  }
`

const Layout = props => {
  return (
    <StyledLayout>
      <div className="layout-header">
        <Container>
          <Navigation />
        </Container>
      </div>
      <div className="layout-body">{props.children}</div>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
