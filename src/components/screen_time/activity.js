import React, { useContext } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { DateTime } from 'luxon'

// import { mqMin } from '../../helpers/media_queries'

import { ScreenTimeContext } from '../../providers/screen_time_provider'

import Spinner from '../spinner'

import theme from '../../styles/theme'

const StyledActivity = styled.div`
  position: sticky;
  top: 20px;
  .activity-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.colors.secondary1};
    border-radius: 4px;
    height: 400px;
    &__primary {
      margin-bottom: 10px;
      padding: 0 10px;
      color: ${props => props.theme.colors.text};
      text-align: center;
    }
    &__secondary {
      padding: 0 10px;
      color: ${props => props.theme.colors.text};
      text-align: center;
    }
  }
  .game-show {
    &__image {
      margin-bottom: 10px;
      img {
        display: block;
        max-width: 100%;
        height: auto;
        border-radius: 4px;
      }
    }
    &__name {
      color: ${props => props.theme.colors.text1};
      font-size: ${props => props.theme.typography.sizeMedium};
      font-weight: bold;
      margin-bottom: 10px;
    }
    &__row {
      display: flex;
      margin-bottom: 5px;
      &__label {
        color: ${props => props.theme.colors.text};
        margin-right: 5px;
      }
      &__value {
        color: ${props => props.theme.colors.text1};
      }
    }
    &__link {
      padding-top: 5px;
      a {
        &:link,
        &:visited,
        &:active {
          color: ${props => props.theme.colors.text1};
        }
        &:hover {
          color: ${props => props.theme.colors.text1};
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
          <div className="game-show__row__label">Ended:</div>
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
          <div className="game-show__row__label">Started:</div>
          <div className="game-show__row__value">{DateTime.fromISO(_get(activeActivity, ['start_at'])).toLocaleString(DateTime.DATE_FULL)}</div>
        </div>
        {renderEndAt()}
        <div className="game-show__row">
          <div className="game-show__row__label">{isShow ? 'Series completed' : 'Game completed'}:</div>
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
      return (
        <div className="activity-container">
          <Spinner spinnerColor={theme.colors.text} />
        </div>
      )
    }
    
    if (activeActivity) {
      return renderActiveGameShow()
    }

    return (
      <div className="activity-container">
        <div className="activity-container__primary">{`Scroll down the timeline to see what I've been watching and playing.`}</div>
        <div className="activity-container__secondary">{`Click on an activity for more details.`}</div>
      </div>
    )
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
