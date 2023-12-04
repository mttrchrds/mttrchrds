import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const LayoutContext = createContext()

const StyledLayout = styled.div`
  .layout-header {
    width: 100%;
    height: 80px;
    background-color: deeppink;
    color: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .layout-body {}
`

const Layout = props => {
  const [activeGameShow, setActiveGameShow] = useState(null)
  const [activeGameShowLoading, setActiveGameShowLoading] = useState(false)

  return (
    <LayoutContext.Provider value={{
      activeGameShow,
      setActiveGameShow,
      activeGameShowLoading,
      setActiveGameShowLoading,
    }}>
      <StyledLayout>
        <div className="layout-header">[HEADER]</div>
        <div className="layout-body">{props.children}</div>
      </StyledLayout>
    </LayoutContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
