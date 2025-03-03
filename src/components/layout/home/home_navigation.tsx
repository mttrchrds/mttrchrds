import React, { ReactNode } from 'react'
import styled from 'styled-components'
import _findIndex from 'lodash/findIndex'

import { mqMin } from '../../../helpers/media_queries'

import HomeNavigationButton from './home_navigation_button'
import { homeItems } from './home'

const StyledHomeNavigation = styled.nav`
  width: 100%;
  display: flex;
  .nav-primary {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &__title {
      display: none;
      @media ${props => mqMin(props.theme.breakPoints.md)} {
        display: block;
        font-size: ${props => props.theme.typography.sizeLarger};
        font-weight: 400;
        color: ${props => props.theme.colors.primary1};
        margin-bottom: 10px;
        font-family: 'Silkscreen';
        margin-top: 40px;
      }
    }
    &__item {
      position: relative;
      z-index: 2;
    }
    &__filler {
      position: relative;
      z-index: 2;
      flex-grow: 1;
      background-color: ${props => props.theme.colors.primary};
    }
  }
  .nav-secondary {
    position: relative;
    z-index: 1;
    &__connector {
      position: absolute;
      left: -2px;
      width: 2px;
      height: 100%;
      background-color: ${props => props.theme.colors.highlight};
    }
  }
`

interface HomeNavigationProps {
  activePath: string
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ activePath }) => {
  const renderNavigation = () => {
    const activeSectionIndex = _findIndex(
      homeItems,
      hi => hi.path === activePath,
    )
    return homeItems.map((hi, idx) => {
      let previousItem = false
      if (idx < activeSectionIndex) {
        previousItem = true
      }
      const active = activePath === hi.path ? true : false
      return (
        <div key={hi.path} className="nav-primary__item">
          <HomeNavigationButton
            active={active}
            link={`/${hi.path}`}
            label={hi.label}
            previousButton={previousItem}
          />
        </div>
      )
    })
  }

  return (
    <StyledHomeNavigation>
      <div className="nav-primary">
        <h3 className="nav-primary__title">MENU</h3>
        {renderNavigation()}
        <div className="nav-primary__filler"></div>
      </div>
      <div className="nav-secondary">
        <div className="nav-secondary__connector"></div>
      </div>
    </StyledHomeNavigation>
  )
}

export default HomeNavigation
