import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useLocation } from '@tanstack/react-router'

import Layout from '../layout';
import Container from '../container';
import HomeNavigation from './home_navigation';
import HomeTitle from './home_title';

import { mqMin } from '../../../helpers/media_queries'

const StyledHomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    flex-direction: row;
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

const homePaths = {
  news: '',
  projects: 'projects',
  games: 'games',
  shows: 'shows',
}

export const homeSections = [
  { label: 'News', title: 'Latest News', path: homePaths.news, },
  { label: 'Projects', title: 'Latest projects', path: homePaths.projects, },
  { label: 'Games', title: 'Latest Games Played', path: homePaths.games, },
  { label: 'Shows', title: 'Latest Shows Watched', path: homePaths.shows, },
]
interface HomeLayoutProps {
  children: ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const activePath = useLocation({
    select: (location) => location.pathname.split('/')[1],
  })

  const getActiveTitle = () => {
    let activeTitle = ''
    homeSections.forEach((section) => {
      if (section.path === activePath) {
        activeTitle = section.title
      }
    })
    return activeTitle
  }

  return (
    <Layout>
      <Container>
        <StyledHomeLayout>
          <section className="navigation" data-testid="homeNavigation">
            <HomeNavigation activePath={activePath} />
          </section>
          <section className="content">
            <div className="content__head">
              <div className="content__head__connector">
                <div className="content__head__connector__inner"></div>
              </div>
              <div className="content__head__title" data-testid="homeTitle">
                <HomeTitle title={getActiveTitle()} />
              </div>
            </div>
            <div className="content__body">
              <div className="content__body__box">
                <div className="content__body__box__primary"></div>
                <div
                  className="content__body__box__secondary"
                  data-testid="homeContent"
                >
                  {children}
                </div>
              </div>
            </div>
          </section>
        </StyledHomeLayout>
      </Container>
    </Layout>
  )
}

export default HomeLayout
