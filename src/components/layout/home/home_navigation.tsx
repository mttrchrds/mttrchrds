import React, { ReactNode } from 'react'
import styled from 'styled-components'
import _findIndex from 'lodash/findIndex'

import { homePaths } from '../../../helpers/links'
import { mqMin } from '../../../helpers/media_queries'

import HomeNavigationButton from './home_navigation_button';

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
  
  const renderSideNavigation = () => {
    const homeSections = [
      { label: 'News', path: homePaths.news, },
      { label: 'Projects', path: homePaths.projects, },
      { label: 'Games', path: homePaths.games, },
      { label: 'Shows', path: homePaths.shows, },
    ]
    const activeSectionIndex = _findIndex(
      homeSections,
      hs => hs.path === activePath,
    )
    return homeSections.map((hs, idx) => {
      let previousItem = false
      if (idx < activeSectionIndex) {
        previousItem = true
      }
      const active = activePath === hs.path ? true : false
      return (
        <div key={hs.path} className="nav-primary__item">
          <HomeNavigationButton
            active={active}
            link={`/${hs.path}`}
            label={hs.label}
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
        {renderSideNavigation()}
        <div className="nav-primary__filler"></div>
      </div>
      <div className="nav-secondary">
        <div className="nav-secondary__connector"></div>
      </div>
    </StyledHomeNavigation>
  )
}

export default HomeNavigation
