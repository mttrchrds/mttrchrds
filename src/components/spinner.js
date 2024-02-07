import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledSpinner = styled.div`
    .spinner {
      width: ${props => props.$spinnerWidth};
      height: ${props => props.$spinnerHeight};
      border-radius: 50%;
      position: relative;
      animation: rotate 1s linear infinite
    }

    .spinner::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: ${props => props.$spinnerThickness} solid ${props => props.$spinnerColor};
      animation: prixClipFix 2s linear infinite ;
    }

    @keyframes rotate {
      100%   {transform: rotate(360deg)}
    }

    @keyframes prixClipFix {
        0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
        25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
        50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
        75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
        100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }
`

const Spinner = props => {
  return (
    <StyledSpinner 
      $spinnerWidth={props.spinnerWidth}
      $spinnerHeight={props.spinnerHeight}
      $spinnerColor={props.spinnerColor}
      $spinnerThickness={props.spinnerThickness}
    >
      <div className="spinner"></div>
    </StyledSpinner>
  )
}

Spinner.defaultProps = {
  spinnerWidth: '24px',
  spinnerHeight: '24px',
  spinnerColor: '#ffffff',
  spinnerThickness: '2px'
}

Spinner.propTypes = {
  spinnerWidth: PropTypes.string,
  spinnerHeight: PropTypes.string,
  spinnerColor: PropTypes.string,
  spinnerThickness: PropTypes.string,
}

export default Spinner
