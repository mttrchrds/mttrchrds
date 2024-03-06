import React, { useState } from 'react'
import styled from 'styled-components'

import Layout from '../layout/layout'
import Container from '../layout/container'
import HomeNavigationButton from '../home/home_navigation_button'

const StyledHome = styled.div`
  display: flex;
  .nav {
    display: flex;
    width: 300px;
    flex-shrink: 0;
    &__primary {
      flex-grow: 1;
      &__title {
        font-size: ${props => props.theme.typography.sizeLarger};
        font-weight: 400;
        color: ${props => props.theme.colors.primary1};
        margin-bottom: 10px;
        font-family: 'Silkscreen';
      }
      &__item {
        margin-bottom: 10px;
      }
    }
    &__secondary {
      width: 50px;
    }
  }
  .content {
    flex-grow: 1;
    &__header {
    }
    &__body {
    }
  }
`

const enumHomeSectionNews = 'NEWS'
const enumHomeSectionShows = 'SHOWS'
const enumHomeSectionGames = 'GAMES'
const enumHomeSectionMusic = 'MUSIC'

const Home = () => {
  const [activeSection, setActiveSection] = useState(enumHomeSectionNews)

  const handleClickSideNavItem = (e, section) => {
    console.log('wut')
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
    return homeSections.map(hs => (
      <div
        key={hs}
        className="nav__primary__item"
        onClick={e => handleClickSideNavItem(e, hs)}
      >
        <HomeNavigationButton
          active={activeSection === hs ? true : false}
          label={hs}
        />
      </div>
    ))
  }

  return (
    <Layout>
      <Container>
        <StyledHome>
          <div className="nav">
            <div className="nav__primary">
              <div className="nav__primary__title">MENU</div>
              {renderSideNavigation()}
            </div>
            <div className="nav__secondary"></div>
          </div>
        </StyledHome>
      </Container>
    </Layout>
  )
}

export default Home
