import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { loadGames } from '../../redux/latest_games/latest_games_slice'
import { loadShows } from '../../redux/latest_shows/latest_shows_slice'

import { mqMin } from '../../helpers/media_queries'
import {
  enumHomeSectionMusic,
  enumHomeSectionNews,
  enumHomeSectionGames,
  enumHomeSectionShows,
} from '../../helpers/enums'

import Layout from '../layout/layout'
import Container from '../layout/container'
import HomeActivities from '../home/home_activities'
import HomeNews from '../home/home_news'
import HomeNavigation from '../home/home_navigation'
import HomeTitle from '../home/home_title'

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
  .navigation {
    flex-shrink: 0;
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      width: 300px;
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

export const StyledBlankState = styled.article`
  height: inherit;
  min-height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: ${props => props.theme.colors.text1};
    font-size: ${props => props.theme.typography.sizeLarge};
  }
`

const Home = () => {
  const [activeSection, setActiveSection] = useState(enumHomeSectionNews)
  const [activeTitle, setActiveTitle] = useState('LATEST NEWS')

  const dispatch = useDispatch()
  const latestGames = useSelector(state => state.latestGames.games)
  const latestGamesLoading = useSelector(state => state.latestGames.loading)
  const latestShows = useSelector(state => state.latestShows.shows)
  const latestShowsLoading = useSelector(state => state.latestShows.loading)

  useEffect(() => {
    if (activeSection === enumHomeSectionNews) {
      setActiveTitle('LATEST NEWS')
    }
    if (activeSection === enumHomeSectionShows) {
      setActiveTitle('LATEST SHOWS WATCHED')
      if (latestShows.length === 0) {
        dispatch(loadShows())
      }
    }
    if (activeSection === enumHomeSectionGames) {
      setActiveTitle('LATEST GAMES PLAYED')
      if (latestGames.length === 0) {
        dispatch(loadGames())
      }
    }
    if (activeSection === enumHomeSectionMusic) {
      setActiveTitle('LATEST MUSIC PLAYED')
    }
  }, [activeSection])

  const renderContentBody = () => {
    if (activeSection === enumHomeSectionShows) {
      return (
        <HomeActivities
          key="shows"
          shows={true}
          loading={latestShowsLoading}
          activities={latestShows}
        />
      )
    }
    if (activeSection === enumHomeSectionGames) {
      return (
        <HomeActivities
          key="games"
          loading={latestGamesLoading}
          activities={latestGames}
        />
      )
    }
    if (activeSection === enumHomeSectionMusic) {
      return (
        <StyledBlankState>
          <p>Coming soon</p>
        </StyledBlankState>
      )
    }
    return <HomeNews />
  }

  return (
    <Layout>
      <Container>
        <StyledHome>
          <section className="navigation">
            <HomeNavigation
              activeSection={activeSection}
              selectHandler={setActiveSection}
            />
          </section>
          <section className="content">
            <div className="content__head">
              <div className="content__head__connector">
                <div className="content__head__connector__inner"></div>
              </div>
              <div className="content__head__title">
                <HomeTitle title={activeTitle} />
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
          </section>
        </StyledHome>
      </Container>
    </Layout>
  )
}

export default Home
