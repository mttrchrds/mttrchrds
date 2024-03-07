import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
// import PropTypes from 'prop-types'

import { mqMin } from '../../helpers/media_queries'

const StyledNavigation = styled.div`
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
        color: ${props => props.theme.colors.background};
        text-decoration: none;
      }
    }
  }
  .actions {
    flex-shrink: 0;
    &__title {
    }
    &__button {
      height: 100%;
      width: 16px;
      cursor: pointer;
      background-color: ${props => props.theme.colors.secondary};
      &:hover {
        background-color: ${props => props.theme.colors.highlight};
      }
    }
  }
`

const Navigation = () => {
  const navigate = useNavigate()

  const handleClickActionsButton = e => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <StyledNavigation>
      <div className="brand">
        <Link to="/">MTTRCHRDS</Link>
      </div>
      <div className="actions">
        <div className="actions__button" onClick={handleClickActionsButton}>
          &nbsp;
        </div>
      </div>
    </StyledNavigation>
  )
}

Navigation.propTypes = {}

export default Navigation
