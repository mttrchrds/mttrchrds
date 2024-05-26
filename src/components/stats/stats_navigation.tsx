import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { StatsType } from '../../helpers/enums'
import { buildLink } from '../../helpers/links'

import { mqMin } from '../../helpers/media_queries'

import StatsNavigationItem from './navigation/stats_navigation_item'
import StatsNavigationToggle from './navigation/stats_navigation_toggle'

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
  statsType: StatsType
}

const StatsNavigation: React.FC<StatsNavigationProps> = ({ statsType }) => {
  const navigate = useNavigate()

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleClickNavigationToggle = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setMobileNavOpen(current => !current)
  }

  return (
    <StyledStatsNavigation $mobileNavOpen={mobileNavOpen}>
      <StatsNavigationToggle
        active={mobileNavOpen}
        clickHandler={handleClickNavigationToggle}
      />
      <div className="nav-items-container">
        <StatsNavigationItem
          active={statsType === StatsType.activitymonths ? true : false}
          clickHandler={e => {
            e.preventDefault()
            navigate(buildLink.stats(StatsType.activitymonths))
          }}
        >
          Monthly activity
        </StatsNavigationItem>
        <StatsNavigationItem
          active={statsType === StatsType.gamedays ? true : false}
          clickHandler={e => {
            e.preventDefault()
            navigate(buildLink.stats(StatsType.gamedays))
          }}
        >
          Most played games
        </StatsNavigationItem>
        <StatsNavigationItem
          active={statsType === StatsType.showplatformyears ? true : false}
          clickHandler={e => {
            e.preventDefault()
            navigate(buildLink.stats(StatsType.showplatformyears))
          }}
        >
          Streaming platform popularity
        </StatsNavigationItem>
        <StatsNavigationItem
          active={statsType === StatsType.gamecategories ? true : false}
          clickHandler={e => {
            e.preventDefault()
            navigate(buildLink.stats(StatsType.gamecategories))
          }}
        >
          Gaming genres
        </StatsNavigationItem>
      </div>
    </StyledStatsNavigation>
  )
}

export default StatsNavigation
