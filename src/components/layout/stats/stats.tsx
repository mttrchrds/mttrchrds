import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useLocation } from '@tanstack/react-router'

import theme from '../../../styles/theme'

import Layout from '../layout'
import Container from '../container'
import StatsNavigation from './stats_navigation'

import { mqMin } from '../../../helpers/media_queries'

const StyledStatsLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .stats-layout-container {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    &__nav {
      width: 100%;
      background-color: ${props =>
        props.theme.colors.stats.navigationBackground};
    }
    &__content {
      flex-grow: 1;
      padding: 20px 15px;
      background-color: ${props => props.theme.colors.stats.contentBackground};
    }
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .stats-layout-container {
      margin-top: 20px;
      flex-direction: row;
      &__nav {
        margin-top: 36px;
        width: 240px;
      }
    }
  }
`

const statsPaths = {
  activitymonths: '',
  gamedays: 'game-days',
  showplatformyears: 'show-platforms-years',
  gamecategories: 'game-categories',
}

export const statsItems = [
  { label: 'Monthly activity', path: statsPaths.activitymonths },
  { label: 'Most played games', path: statsPaths.gamedays },
  {
    label: 'Streaming platform popularity',
    path: statsPaths.showplatformyears,
  },
  { label: 'Gaming genres', path: statsPaths.gamecategories },
]

interface StatsLayoutProps {
  children: ReactNode
}

const StatsLayout: React.FC<StatsLayoutProps> = ({ children }) => {
  const activePath = useLocation({
    select: location => location.pathname.split('/')[2],
  })

  return (
    <Layout bodyColour={theme.colors.stats.background} navigationTitle="Stats">
      <Container>
        <StyledStatsLayout>
          <Container stretch={true}>
            <div className="stats-layout-container">
              <div className="stats-layout-container__nav">
                <StatsNavigation activePath={activePath ? activePath : ''} />
              </div>
              <div
                className="stats-layout-container__content"
                data-testid="statsContent"
              >
                {children}
              </div>
            </div>
          </Container>
        </StyledStatsLayout>
      </Container>
    </Layout>
  )
}

export default StatsLayout
