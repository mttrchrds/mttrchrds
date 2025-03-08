import { Link } from "@tanstack/react-router";
import styled from 'styled-components'

import Layout from "./layout/layout";
import Container from "./layout/container";

const StyledPageNotFound = styled.div`
  height: inherit;
  min-height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Silkscreen';
  color: ${props => props.theme.colors.primary1};
  
  h5 {
    font-size: ${props => props.theme.typography.sizeLarger};
    margin: 0;
  }

  a {
    &:link,
    &:visited,
    &:active {
      color: ${props => props.theme.colors.secondary};
      text-decoration: underline;
    }
    &:hover {
      color: ${props => props.theme.colors.secondary1};
      text-decoration: none;
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

const PageNotFound = () => {
  return (
    <Layout>
      <Container>
        <StyledPageNotFound>
          <h5>Sorry, that page doesn't exist</h5>
          <p>
            <Link to="/">Back to the homepage</Link>
          </p>
        </StyledPageNotFound>
      </Container>
    </Layout>
  );
};

export default PageNotFound;