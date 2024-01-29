import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import { mqMin } from '../../helpers/media_queries'

import { ScreenTimeContext } from '../../providers/screen_time_provider'

const StyledActivity = styled.div`
  position: sticky;
  top: 20px;
  .game-show {
    &__image {
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
`

const Activity = () => {
  const { activeActivity, activeActivityLoading } = useContext(ScreenTimeContext)

  console.log({activeActivity})
  // const activityPlatform = _get(activeActivity, ['show_platform']) ? _get(activeActivity, ['show_platform']) : _get(activeActivity, ['game_platform'])
  const activityItem = _get(activeActivity, ['show_activity']) ? _get(activeActivity, ['show_activity']) : _get(activeActivity, ['game_activity'])

  const renderActiveGameShow = () => {
    return (
      <div className="game-show">
        <div className="game-show__image"><img src={_get(activityItem, ['image_url'])} /></div>
      </div>
    )
  }

  const renderContent = () => {
    if (activeActivityLoading) {
      return 'Loading...'
    }
    
    if (activeActivity) {
      return renderActiveGameShow()
    }

    return 'Blank state'
  }
  return (
    <StyledActivity>
      {renderContent()}
    </StyledActivity>
  )
}

Activity.defaultProps = {}

Activity.propTypes = {}

export default Activity
