import { useEffect } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import { loadGameDays } from '../../redux/stats/stats_slice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import { mqMin } from '../../helpers/media_queries'

import Layout from '../layout/layout'
import Container from '../layout/container'
import Spinner from '../spinner'

import theme from '../../styles/theme'

const StyledStats = styled.div`
  .stats-container {
  }
  @media ${props => mqMin(props.theme.breakPoints.md)} {
    .timeline-container {
    }
  }
`

const Stats = () => {
  const dispatch = useAppDispatch()
  const gameDays = useAppSelector(state => state.stats.gameDays)
  const gameDaysLoading = useAppSelector(state => state.stats.gameDaysLoading)

  useEffect(() => {
    if (gameDays.length === 0) {
      dispatch(loadGameDays())
    }
  }, [])

  console.log({ gameDays })

  return (
    <Layout bodyColour={theme.colors.stats.background} navigationTitle="Stats">
      <StyledStats>
        <Container>
          <div className="timeline-container"></div>
        </Container>
      </StyledStats>
    </Layout>
  )
}

export default Stats
