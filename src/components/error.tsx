import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorComponentProps, useRouter, Link } from "@tanstack/react-router";
import styled from 'styled-components'

import Layout from "./layout/layout";
import Container from "./layout/container";

const StyledError = styled.div`
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

const Error = ({ reset }: ErrorComponentProps) => {
  const router = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <Layout>
      <Container>
        <StyledError>
          <h5>Unfortunately an error has occurred</h5>
          <p>
          <a href="#" onClick={() => {
              reset();
              router.invalidate();
            }}>Retry this page</a> or <Link to="/">go back to the homepage</Link>
          </p>
        </StyledError>
      </Container>
    </Layout>
  );
};

export default Error