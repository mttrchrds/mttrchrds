import styled from 'styled-components'
import _get from 'lodash/get'
import { updateActiveTab } from '../../redux/stats/stats_slice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import { mqMin } from '../../helpers/media_queries'

import { StatsTab } from '../../helpers/enums'

import Layout from '../layout/layout'
import Container from '../layout/container'
import StatsTabs from '../stats/stats_tabs'
import StatsLayout from '../stats/stats_layout'

import theme from '../../styles/theme'

const StyledStats = styled.div`
  .stats-container {
    background-color: ${props => props.theme.colors.stats.contentBackground};
    height: 100vh;
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .timeline-container {
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
      <StyledStats>
        <Container>
          <StatsLayout
            activeTab={activeTab}
            tabs={
              <StatsTabs activeTab={activeTab} clickHandler={handleClickTab} />
            }
          />
        </Container>
      </StyledStats>
    </Layout>
  )
}

export default Stats
