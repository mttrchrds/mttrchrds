import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
// import PropTypes from 'prop-types'

const StyledNavigation = styled.div`
    display: flex;
    padding-top: 4px;
    padding-right: 4px;
    padding-bottom: 4px;
    padding-left: 10px;
    background-color: ${props => props.theme.colors.borderLight};
    .brand {
        flex-grow: 1;
        a {
            &:link,
            &:visited,
            &:active {
                font-weight: 900;
                color: ${props => props.theme.colors.background};
                text-decoration: none;
                letter-spacing: 1px;
                font-size: ${props => props.theme.typography.sizeLarger};
            }
            &:hover {
                color: ${props => props.theme.colors.background};
                text-decoration: none;
            }
        }
    }
    .actions {
        flex-shrink: 0;
        &__title {}
        &__button {
            height: 100%;
            width: 23px;
            cursor: pointer;
            background-color: ${props => props.theme.colors.background1};
            &:hover {
                background-color: ${props => props.theme.colors.text1};
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
            </div>
        </div>
        </StyledNavigation>
    )
}

Navigation.propTypes = {}

export default Navigation
