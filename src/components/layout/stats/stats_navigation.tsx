import { useState } from 'react'
import styled from 'styled-components'

import { mqMin } from '../../../helpers/media_queries'

import StatsNavigationItem from './stats_navigation_item'
import StatsNavigationToggle from './stats_navigation_toggle'
import { statsItems } from './stats'

interface StyledStatsNavigationProps {
  $mobileNavOpen: boolean
}

const StyledStatsNavigation = styled.nav<StyledStatsNavigationProps>`
  display: flex;
  flex-direction: column;
  .nav-items-container {
    display: ${props => (props.$mobileNavOpen ? 'block' : 'none')};
    @media ${props => mqMin(props.theme.breakPoints.md)} {
      display: block;
    }
  }
`

interface StatsNavigationProps {
  activePath: string
}

const StatsNavigation: React.FC<StatsNavigationProps> = ({ activePath }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleClickNavigationToggle = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setMobileNavOpen(current => !current)
  }

  const renderNavigation = () => {
    return statsItems.map((si, idx) => {
      const active = activePath === si.path ? true : false
      return (
        <StatsNavigationItem
          key={si.path}
          path={si.path}
          active={active}
          label={si.label}
        />
      )
    })
  }

  return (
    <StyledStatsNavigation $mobileNavOpen={mobileNavOpen}>
      <StatsNavigationToggle
        active={mobileNavOpen}
        clickHandler={handleClickNavigationToggle}
      />
      <div className="nav-items-container">{renderNavigation()}</div>
    </StyledStatsNavigation>
  )
}

export default StatsNavigation
