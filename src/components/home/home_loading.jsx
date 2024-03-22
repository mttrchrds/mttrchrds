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
  .loading-text {
    width: 120px;
    font-family: 'Silkscreen';
    font-size: ${props => props.theme.typography.sizeLarger};
    color: ${props => props.theme.colors.primary1};
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

const HomeLoading = () => {
  return (
    <StyledHomeLoading>
      <div className="loading-text">LOADING</div>
    </StyledHomeLoading>
  )
}

HomeLoading.defaultProps = {}

HomeLoading.propTypes = {}

export default HomeLoading
