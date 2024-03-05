import React from 'react'
import styled from 'styled-components'

import BadaBing from '../bada_bing'

const StyledComingSoon= styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .home-bada-bing {
  }
  .home-nav {
    display: flex;
    justify-content: center;
    color: ${props => props.theme.colors.white};
    margin-top: 30px;
  }
`

const ComingSoon = () => {
  return (
    <StyledComingSoon>
      <div className="home-bada-bing">
        <BadaBing />
      </div>
      <div className="home-nav">
        Opening March 2024
      </div>
    </StyledComingSoon>
  )
}

export default ComingSoon
