import styled from 'styled-components'

const StyledHomeError = styled.div`
  height: inherit;
  min-height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h5 {
    font-family: 'Silkscreen';
    font-size: ${props => props.theme.typography.sizeLarger};
    color: ${props => props.theme.colors.primary1};
    margin: 0;
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

interface HomeLoadingProps {
  error: string
}

const HomeError: React.FC<HomeLoadingProps> = ({ error }) => (
  <StyledHomeError>
    <h5>{error}</h5>
  </StyledHomeError>
)

export default HomeError