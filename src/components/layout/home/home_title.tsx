import React from 'react'
import styled from 'styled-components'

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

interface HomeTitleProps {
  title: string
}

const HomeTitle: React.FC<HomeTitleProps> = ({ title }) => (
  <StyledHomeTitle>
    <h2>{title}</h2>
  </StyledHomeTitle>
)

export default HomeTitle
