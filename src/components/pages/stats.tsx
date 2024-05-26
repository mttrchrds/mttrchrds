import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { mqMin } from '../../helpers/media_queries'

import Layout from '../layout/layout'
import StatsNavigation from '../stats/stats_navigation'
import Container from '../layout/container'
import Chart from '../stats/chart'

import theme from '../../styles/theme'
import { StatsType } from '../../helpers/enums'

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
        width: ${props => navWidth};
      }
    }
  }
`

const Stats = () => {
  const { statsType } = useParams()
  const activeStatsType = statsType
    ? StatsType[statsType as keyof typeof StatsType]
    : StatsType.activitymonths
  return (
    <Layout
      bodyColour={theme.colors.stats.background}
      navigationTitle="Stats"
      key={statsType}
    >
      <StyledStatsPage>
        <Container stretch={true}>
          <div className="stats-layout-container">
            <div className="stats-layout-container__nav">
              <StatsNavigation statsType={activeStatsType} />
            </div>
            <div
              className="stats-layout-container__content"
              data-testid="statsContent"
            >
              <Chart statsType={activeStatsType} />
            </div>
          </div>
        </Container>
      </StyledStatsPage>
    </Layout>
  )
}

export default Stats
