import React from 'react'
import styled from 'styled-components'

interface StyledSpinnerProps {
  $spinnerWidth: string
  $spinnerHeight: string
  $spinnerThickness: string
  $spinnerColour: string
}

const StyledSpinner = styled.div<StyledSpinnerProps>`
  .spinner {
    width: ${props => props.$spinnerWidth};
    height: ${props => props.$spinnerHeight};
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }

  .spinner::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: ${props => props.$spinnerThickness} solid
      ${props => props.$spinnerColour};
    animation: prixClipFix 2s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`

interface SpinnerProps {
  spinnerWidth?: string
  spinnerHeight?: string
  spinnerColour?: string
  spinnerThickness?: string
}

const Spinner: React.FC<SpinnerProps> = ({
  spinnerWidth = '24px',
  spinnerHeight = '24px',
  spinnerColour = 'white',
  spinnerThickness = '2px',
}) => {
  return (
    <StyledSpinner
      $spinnerWidth={spinnerWidth}
      $spinnerHeight={spinnerHeight}
      $spinnerColour={spinnerColour}
      $spinnerThickness={spinnerThickness}
    >
      <div className="spinner"></div>
    </StyledSpinner>
  )
}

export default Spinner
