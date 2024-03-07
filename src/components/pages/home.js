import React, { useState } from 'react'
import styled from 'styled-components'
import _findIndex from 'lodash/findIndex'

import { mqMin } from '../../helpers/media_queries'

import Layout from '../layout/layout'
import Container from '../layout/container'
import HomeNavigationButton from '../home/home_navigation_button'
import HomeActivities from '../home/home_activities'
import HomeNews from '../home/home_news'

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    flex-direction: row;
    padding-top: 20px;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  .nav {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      width: 300px;
    }
    &__primary {
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
    &__secondary {
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
  }
  .content {
    flex-grow: 1;
    position: relative;
    left: -2px;
    z-index: 3;
    &__head {
      display: none;
      @media ${props => mqMin(props.theme.breakPoints.md)} {
        display: flex;
        &__connector {
          width: 25px;
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          background-color: ${props => props.theme.colors.primary};
          &__inner {
            width: 100%;
            height: 50%;
            border-top: 2px solid ${props => props.theme.colors.highlight};
            border-left: 2px solid ${props => props.theme.colors.highlight};
          }
        }
        &__title {
          flex-grow: 1;
          border: 2px solid ${props => props.theme.colors.highlight};
          background-color: ${props => props.theme.colors.primary1};
          padding: 10px;
          &__text {
            color: ${props => props.theme.colors.highlight};
            font-size: ${props => props.theme.typography.sizeLarger};
            font-family: 'Silkscreen';
            line-height: 1;
            position: relative;
            top: -1px;
          }
        }
      }
    }
    &__body {
      &__box {
        margin-top: 10px;
        @media ${props => mqMin(props.theme.breakPoints.md)} {
          margin-top: 25px;
          margin-left: 25px;
        }
        &__primary {
          background-color: ${props => props.theme.colors.secondary1};
          height: 30px;
          width: 100%;
        }
        &__secondary {
          min-height: 500px;
          border-right: 2px solid ${props => props.theme.colors.primary1};
          border-bottom: 2px solid ${props => props.theme.colors.primary1};
          border-left: 2px solid ${props => props.theme.colors.primary1};
          padding: 20px;
          font-size: ${props => props.theme.typography.sizeMedium};
          font-family: 'Silkscreen';
          color: ${props => props.theme.colors.text};
        }
      }
    }
  }
`

export const StyledBlankState = styled.div`
  height: inherit;
  min-height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text1};
  font-size: ${props => props.theme.typography.sizeLarge};
`

const enumHomeSectionNews = 'NEWS'
const enumHomeSectionShows = 'SHOWS'
const enumHomeSectionGames = 'GAMES'
const enumHomeSectionMusic = 'MUSIC'

const Home = () => {
  const [activeSection, setActiveSection] = useState(enumHomeSectionNews)

  const handleClickSideNavItem = (e, section) => {
    e.preventDefault()
    setActiveSection(section)
  }

  const renderSideNavigation = () => {
    const homeSections = [
      enumHomeSectionNews,
      enumHomeSectionShows,
      enumHomeSectionGames,
      enumHomeSectionMusic,
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
      return (
        <div
          key={hs}
          className="nav__primary__item"
          onClick={e => handleClickSideNavItem(e, hs)}
        >
          <HomeNavigationButton
            active={activeSection === hs ? true : false}
            label={hs}
            previousButton={previousItem}
          />
        </div>
      )
    })
  }

  const renderContentHeader = () => {
    if (activeSection === enumHomeSectionNews) {
      return 'LATEST NEWS'
    }
    if (activeSection === enumHomeSectionShows) {
      return 'LATEST SHOWS WATCHED'
    }
    if (activeSection === enumHomeSectionGames) {
      return 'LATEST GAMES PLAYED'
    }
    if (activeSection === enumHomeSectionMusic) {
      return 'LATEST MUSIC PLAYED'
    }
    return null
  }

  const renderContentBody = () => {
    if (activeSection === enumHomeSectionShows) {
      return <HomeActivities shows={true} key="shows" />
    }
    if (activeSection === enumHomeSectionGames) {
      return <HomeActivities key="games" />
    }
    if (activeSection === enumHomeSectionMusic) {
      return <StyledBlankState>Coming soon</StyledBlankState>
    }
    return <HomeNews />
  }

  return (
    <Layout>
      <Container>
        <StyledHome>
          <div className="nav">
            <div className="nav__primary">
              <div className="nav__primary__title">MENU</div>
              {renderSideNavigation()}
              <div className="nav__primary__filler"></div>
            </div>
            <div className="nav__secondary">
              <div className="nav__secondary__connector"></div>
            </div>
          </div>
          <div className="content">
            <div className="content__head">
              <div className="content__head__connector">
                <div className="content__head__connector__inner"></div>
              </div>
              <div className="content__head__title">
                <div className="content__head__title__text">
                  {renderContentHeader()}
                </div>
              </div>
            </div>
            <div className="content__body">
              <div className="content__body__box">
                <div className="content__body__box__primary"></div>
                <div className="content__body__box__secondary">
                  {renderContentBody()}
                </div>
              </div>
            </div>
          </div>
        </StyledHome>
      </Container>
    </Layout>
  )
}

export default Home
