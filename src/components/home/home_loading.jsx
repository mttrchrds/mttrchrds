import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

const StyledHomeLoading = styled.div`
  height: inherit;
  min-height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h5 {
    width: 120px;
    font-family: 'Silkscreen';
    font-size: ${props => props.theme.typography.sizeLarger};
    color: ${props => props.theme.colors.primary1};
    margin: 0;
    &:after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ellipsis steps(4, end) 1200ms infinite;
      content: '\\2026';
      width: 0;
    }
  }

  @keyframes ellipsis {
    to {
      width: 24px;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 24px;
    }
  }
`

const HomeLoading = () => (
  <StyledHomeLoading>
    <h5>Loading</h5>
  </StyledHomeLoading>
)

HomeLoading.defaultProps = {}

HomeLoading.propTypes = {}

export default HomeLoading
