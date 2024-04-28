import { updateActiveTab } from '../../redux/stats/stats_slice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import { StatsTab } from '../../helpers/enums'

import Layout from '../layout/layout'
import StatsTabs from '../stats/stats_tabs'
import StatsLayout from '../stats/stats_layout'

import theme from '../../styles/theme'

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
      <StatsLayout
        activeTab={activeTab}
        tabs={<StatsTabs activeTab={activeTab} clickHandler={handleClickTab} />}
      />
    </Layout>
  )
}

export default Stats
