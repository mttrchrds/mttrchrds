import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

const Container = props => {
  return <StyledContainer>{props.children}</StyledContainer>
}

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
