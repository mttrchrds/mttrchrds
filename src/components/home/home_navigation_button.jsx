import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { mqMin } from '../../helpers/media_queries'

const bottomSpacerHeight = '10px'

const StyledHomeNavigationButton = styled.div`
  height: auto;
  cursor: ${props => (props.$active ? 'default' : 'pointer')};
  display: flex;
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    height: 100px;
  }
  .button-container {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    &__label {
      flex-grow: 1;
      padding: 10px;
      font-size: ${props => props.theme.typography.sizeMedium};
      font-family: 'Silkscreen';
      color: ${props => props.theme.colors.text};
      margin: 0;
      border: 2px solid
        ${props =>
          props.$active
            ? props.theme.colors.highlight
            : props.theme.colors.primary1};
      &:link,
      &:visited,
      &:active {
        text-decoration: none;
      }
      &:hover {
        text-decoration: none;
        border-color: ${props =>
          props.$active
            ? props.theme.colors.highlight
            : props.theme.colors.secondary};
      }
    }
    &__spacer {
      width: 100%;
      height: ${bottomSpacerHeight};
      background-color: ${props => props.theme.colors.primary};
    }
  }
  .button-highlight {
    display: none;
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      display: block;
      width: 25px;
      height: calc(100% - ${bottomSpacerHeight});
      background-color: ${props => props.theme.colors.highlight};
    }
  }
  .button-connector {
    display: none;
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      width: 25px;
      height: 100%;
      display: flex;
      align-items: flex-start;
      background-color: ${props =>
        props.$previous ? 'transparent' : props.theme.colors.primary};
      &__inner {
        visibility: ${props => (props.$active ? 'visible' : 'hidden')};
        width: 100%;
        height: calc(50% - (${bottomSpacerHeight} / 2));
        border-bottom: 2px solid ${props => props.theme.colors.highlight};
        border-right: 2px solid ${props => props.theme.colors.highlight};
      }
    }
  }
`

const HomeNavigationButton = props => (
  <StyledHomeNavigationButton
    $active={props.active}
    $previous={props.previousButton}
  >
    <div className="button-container" data-testid="home-navigation-button">
      <a
        href="#"
        className="button-container__label"
        onClick={e => props.clickHandler(e, props.label, props.active)}
      >
        {props.label}
      </a>
      <div className="button-container__spacer"></div>
    </div>
    {props.active && (
      <div className="button-highlight" data-testid="highlight"></div>
    )}
    <div className="button-connector">
      <div className="button-connector__inner"></div>
    </div>
  </StyledHomeNavigationButton>
)

HomeNavigationButton.defaultProps = {
  active: false,
  previousButton: false,
}

HomeNavigationButton.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  previousButton: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired,
}

export default HomeNavigationButton
