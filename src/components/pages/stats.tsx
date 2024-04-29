import { updateActiveTab } from '../../redux/stats/stats_slice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

import { mqMin } from '../../helpers/media_queries'

import Layout from '../layout/layout'
import StatsNavigation from '../stats/stats_navigation'
import Container from '../layout/container'
import GameChart from '../stats/game_chart'

import theme from '../../styles/theme'

const navWidth = '240px'

const StyledStatsPage = styled.div`
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
      padding: 20px;
      background-color: ${props => props.theme.colors.stats.contentBackground};
    }
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .stats-layout-container {
      margin-top: 20px;
      flex-direction: row;
      &__nav {
        margin-top: 36px;
        width: ${props => navWidth};
      }
    }
  }
`

const Stats = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector(state => state.stats.activeTab)

  const handleClickTab = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: StatsTab,
  ) => {
    e.preventDefault()
    dispatch(updateActiveTab(tab))
  }

  return (
    <Layout bodyColour={theme.colors.stats.background} navigationTitle="Stats">
      <StyledStatsPage>
        <Container stretch={true}>
          <div className="stats-layout-container">
            <div className="stats-layout-container__nav">
              <StatsNavigation />
            </div>
            <div className="stats-layout-container__content">
              <GameChart />
            </div>
          </div>
        </Container>
      </StyledStatsPage>
    </Layout>
  )
}

export default Stats
