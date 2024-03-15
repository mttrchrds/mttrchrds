import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

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
    display: flex;
    &__title {
      font-size: ${props => props.theme.typography.sizeMedium};
      font-family: 'Silkscreen';
      line-height: 1;
    }
    &__button {
      height: 100%;
      width: 16px;
      margin-left: 10px;
      cursor: pointer;
      background-color: ${props => props.theme.colors.secondary};
      &:hover {
        background-color: ${props => props.theme.colors.highlight};
      }
    }
  }
`

const Navigation = props => {
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
        {props.title && <div className="actions__title">{props.title}</div>}
        <div className="actions__button" onClick={handleClickActionsButton}>
          &nbsp;
        </div>
      </div>
    </StyledNavigation>
  )
}

Navigation.defaultProps = {
  title: '',
}

Navigation.propTypes = {
  title: PropTypes.string,
}

export default Navigation
