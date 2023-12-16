import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledLayout = styled.div`
  background-color: #0D1017;
  .layout-header {
    width: 100%;
    height: 80px;
    color: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .layout-body {}
`

const Layout = props => {
  return (
    <StyledLayout>
      <div className="layout-header">[HEADER]</div>
      <div className="layout-body">{props.children}</div>
    </StyledLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
