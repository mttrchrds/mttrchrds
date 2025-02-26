import React from 'react'
import styled from 'styled-components'
import { Link } from "@tanstack/react-router";

import { mqMin } from '../../helpers/media_queries'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding-top: 6px;
  padding-right: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  background-color: ${props => props.theme.colors.secondary1};
  margin-right: 15px;
  margin-left: 15px;
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    margin-right: 0;
    margin-left: 0;
  }
  .brand {
    flex-grow: 1;
    line-height: 1;
    position: relative;
    top: -1px;
    a {
      &:link,
      &:visited,
      &:active {
        font-weight: 900;
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
        letter-spacing: 1px;
        font-size: ${props => props.theme.typography.sizeLarger};
        font-family: 'Silkscreen';
      }
      &:hover {
        color: ${props => props.theme.colors.highlight};
        text-decoration: none;
      }
    }
  }
  .actions {
    flex-shrink: 0;
    display: flex;
    &__title {
      font-size: ${props => props.theme.typography.sizeMedium};
      font-family: 'Silkscreen';
      line-height: 1;
      margin: 0;
    }
    &__button {
      height: 100%;
      width: 16px;
      margin-left: 10px;
      &:link,
      &:visited,
      &:active {
        background-color: ${props => props.theme.colors.secondary};
        text-decoration: none;
      }
      &:hover {
        background-color: ${props => props.theme.colors.highlight};
        text-decoration: none;
      }
    }
  }
`

interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <StyledHeader>
      <div className="brand">
        <Link to="/">MTTRCHRDS</Link>
      </div>
      <div className="actions">
        {title && <h1 className="actions__title">{title}</h1>}
        <Link className="actions__button" to={'/'}>
          &nbsp;
        </Link>
      </div>
    </StyledHeader>
  )
}

export default Header
