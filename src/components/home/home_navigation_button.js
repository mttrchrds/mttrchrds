import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledHomeNavigationButton = styled.div`
  height: 100px;
  cursor: pointer;
  display: flex;
  .button-container {
    flex-grow: 1;
    padding: 10px;
    height: 100%;
    font-size: ${props => props.theme.typography.sizeMedium};
    font-family: 'Silkscreen';
    color: ${props => props.theme.colors.text};
    border: 2px solid
      ${props =>
        props.$active
          ? props.theme.colors.highlight
          : props.theme.colors.primary1};
    &:hover {
      border-color: ${props =>
        props.$active
          ? props.theme.colors.highlight
          : props.theme.colors.secondary};
    }
  }
  .button-highlight {
    width: 10%;
    height: 100%;
    background-color: ${props =>
      props.$active
        ? props.theme.colors.highlight
        : props.theme.colors.primary};
    &__arm {
    }
  }
  .button-connector {
    width: 10%;
    height: 100%;
    display: flex;
    visibility: ${props => (props.$active ? 'visible' : 'hidden')};
    align-items: center;
    &__inner {
      width: 100%;
      height: 2px;
      background-color: ${props => props.theme.colors.highlight};
    }
  }
`

const HomeNavigationButton = props => {
  return (
    <StyledHomeNavigationButton $active={props.active}>
      <div className="button-container">{props.label}</div>
      <div className="button-highlight"></div>
      <div className="button-connector">
        <div className="button-connector__inner"></div>
      </div>
    </StyledHomeNavigationButton>
  )
}

HomeNavigationButton.defaultProps = {
  active: false,
}

HomeNavigationButton.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
}

export default HomeNavigationButton
