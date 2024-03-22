import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledHomeTitle = styled.div`
  border: 2px solid ${props => props.theme.colors.highlight};
  background-color: ${props => props.theme.colors.primary1};
  padding: 10px;
  h2 {
    color: ${props => props.theme.colors.highlight};
    font-size: ${props => props.theme.typography.sizeLarger};
    font-family: 'Silkscreen';
    line-height: 1;
    position: relative;
    top: -1px;
    margin: 0;
  }
`

const HomeTitle = props => {
  return (
    <StyledHomeTitle>
      <h2>{props.title}</h2>
    </StyledHomeTitle>
  )
}

HomeTitle.defaultProps = {}

HomeTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HomeTitle
