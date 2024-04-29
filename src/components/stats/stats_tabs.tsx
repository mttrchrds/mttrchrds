import React from 'react'
import styled from 'styled-components'

import { StatsTab } from '../../helpers/enums'

const StyledStatsTabs = styled.nav`
  display: flex;
`

interface StyledStatsTabProps {
  $active: boolean
}

const StyledStatsTab = styled.a<StyledStatsTabProps>`
  color: ${props =>
    props.$active
      ? props.theme.colors.stats.text
      : props.theme.colors.stats.tabs.inactiveText};
  cursor: pointer;
  font-size: ${props => props.theme.typography.sizeLarger};
  font-weight: 400;
  padding: 16px;
  margin-right: 10px;
  background-color: ${props =>
    props.$active
      ? props.theme.colors.stats.contentBackground
      : props.theme.colors.stats.tabs.inactiveBackground};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  line-height: 1;
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
`

interface StatsTabsProps {
  activeTab: StatsTab
  clickHandler: (e: React.MouseEvent<HTMLAnchorElement>, tab: StatsTab) => void
}

const StatsTabs: React.FC<StatsTabsProps> = ({ activeTab, clickHandler }) => {
  return (
    <StyledStatsTabs>
      <StyledStatsTab
        $active={activeTab === StatsTab.GAME ? true : false}
        onClick={e => clickHandler(e, StatsTab.GAME)}
      >
        Games
      </StyledStatsTab>
      <StyledStatsTab
        $active={activeTab === StatsTab.SHOW ? true : false}
        onClick={e => clickHandler(e, StatsTab.SHOW)}
      >
        Shows
      </StyledStatsTab>
    </StyledStatsTabs>
  )
}

export default StatsTabs
