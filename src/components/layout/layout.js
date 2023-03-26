import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledLayout = styled.div``

const Layout = props => {
  return <StyledLayout>{props.children}</StyledLayout>
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
