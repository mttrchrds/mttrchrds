import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { DateTime } from 'luxon'

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
    &__row {
      display: flex;
      &__label {}
      &__value {}
    }
    &__link {
      a {
        &:link,
        &:visited,
        &:active {
          color: ${props => props.theme.colors.white};
        }
        &:hover {
          color: ${props => props.theme.colors.white};
          text-decoration: none;
        }
      }
    }
  }
`

const Activity = () => {
  const { activeActivity, activeActivityLoading } = useContext(ScreenTimeContext)

  console.log({activeActivity})
  const activityPlatform = _get(activeActivity, ['show_platform']) ? _get(activeActivity, ['show_platform']) : _get(activeActivity, ['game_platform'])
  const activityItem = _get(activeActivity, ['show_activity']) ? _get(activeActivity, ['show_activity']) : _get(activeActivity, ['game_activity'])
  const isShow = _get(activeActivity, ['show_activity']) ? true : false

  const renderEndAt = () => {
    if (_get(activeActivity, ['end_at'])) {
      return (
        <div className="game-show__row">
          <div className="game-show__row__label">Ended</div>
          <div className="game-show__row__value">{DateTime.fromISO(_get(activeActivity, ['end_at'])).toLocaleString(DateTime.DATE_FULL)}</div>
        </div>
      )
    }
    return null
  }

  const renderActiveGameShow = () => {
    return (
      <div className="game-show">
        <div className="game-show__image"><img src={_get(activityItem, ['image_url'])} /></div>
        <div className="game-show__name">{`${_get(activityItem, ['name'])} (${_get(activityPlatform, ['name'])})`}</div>
        <div className="game-show__row">
          <div className="game-show__row__label">Started</div>
          <div className="game-show__row__value">{DateTime.fromISO(_get(activeActivity, ['start_at'])).toLocaleString(DateTime.DATE_FULL)}</div>
        </div>
        {renderEndAt()}
        <div className="game-show__row">
          <div className="game-show__row__label">{isShow ? 'Series completed' : 'Game completed'}</div>
          <div className="game-show__row__value">{_get(activeActivity, 'completed') ? 'Yes' : 'No'}</div>
        </div>
        <div className="game-show__link">
          <a href={`https://www.imdb.com/title/${_get(activityItem, ['imdb_id'])}`} target="_blank" rel="noreferrer">View on IMDB</a>
        </div>
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
