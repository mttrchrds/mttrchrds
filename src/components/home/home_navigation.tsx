import React from 'react'
import styled from 'styled-components'
import _findIndex from 'lodash/findIndex'

import { mqMin } from '../../helpers/media_queries'
import { HomeSection } from '../../helpers/enums'

import HomeNavigationButton from './home_navigation_button'

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
  activeSection: HomeSection
  selectHandler: (section: HomeSection) => void
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({
  activeSection,
  selectHandler,
}) => {
  const handleClickButton = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: HomeSection,
    active: boolean,
  ) => {
    e.preventDefault()
    if (!active) {
      selectHandler(section)
    }
  }

  const renderSideNavigation = () => {
    const homeSections = [
      HomeSection.NEWS,
      HomeSection.PROJECTS,
      HomeSection.GAMES,
      HomeSection.SHOWS,
      // HomeSection.MUSIC,
    ]
    const activeSectionIndex = _findIndex(
      homeSections,
      hs => hs === activeSection,
    )
    return homeSections.map((hs, idx) => {
      let previousItem = false
      if (idx < activeSectionIndex) {
        previousItem = true
      }
      const active = activeSection === hs ? true : false
      return (
        <div key={hs} className="nav-primary__item">
          <HomeNavigationButton
            active={active}
            section={hs}
            previousButton={previousItem}
            clickHandler={handleClickButton}
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
