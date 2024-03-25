import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux'

// import { mqMin } from '../../helpers/media_queries'

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
    border: 1px solid ${props => props.theme.colors.timeline.secondary1};
    border-radius: 4px;
    height: 400px;
    &__primary {
      margin-bottom: 10px;
      padding: 0 10px;
      font-size: ${props => props.theme.typography.sizeLarge};
      color: ${props => props.theme.colors.timeline.text1};
      text-align: center;
    }
    &__secondary {
      margin-bottom: 10px;
      padding: 0 10px;
      color: ${props => props.theme.colors.timeline.text};
      text-align: center;
    }
  }
  .game-show {
    &__image {
      margin-bottom: 20px;
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
      margin-bottom: 25px;
    }
    &__row {
      display: flex;
      margin-bottom: 5px;
      &--primary {
        margin-bottom: 20px;
      }
      &__label {
        color: ${props => props.theme.colors.timeline.text};
        margin-right: 5px;
      }
      &__value {
        color: ${props => props.theme.colors.timeline.text1};
      }
    }
    &__link {
      padding-top: 10px;
      a {
        &:link,
        &:visited,
        &:active {
          color: ${props => props.theme.colors.timeline.text1};
        }
        &:hover {
          color: ${props => props.theme.colors.timeline.text1};
          text-decoration: none;
        }
      }
    }
  }
`

const calculateRatingColour = (colors, rating) => {
  if (rating === 10) {
    return colors.ratings.gold
  }
  if (rating === 9) {
    return colors.ratings.silver
  }
  if (rating === 8) {
    return colors.ratings.bronze
  }
  return colors.timeline.ratings
}

const StyledRating = styled.div`
  display: flex;
  position: relative;
  top: -3px;
  .rating-item {
    display: flex;
    svg {
      fill: ${props =>
        calculateRatingColour(props.theme.colors, props.$rating)};
    }
  }
`

const Activity = () => {
  const activeActivity = useSelector(state => state.timeline.activity)
  const activeActivityLoading = useSelector(
    state => state.timeline.activityLoading,
  )

  const activityPlatform = _get(activeActivity, ['show_platform'])
    ? _get(activeActivity, ['show_platform'])
    : _get(activeActivity, ['game_platform'])
  const activityItem = _get(activeActivity, ['show_activity'])
    ? _get(activeActivity, ['show_activity'])
    : _get(activeActivity, ['game_activity'])
  const isShow = _get(activeActivity, ['show_activity']) ? true : false

  const renderEndAt = () => {
    if (_get(activeActivity, ['end_at'])) {
      return (
        <div className="game-show__row">
          <div className="game-show__row__label">Ended:</div>
          <div className="game-show__row__value">
            {DateTime.fromISO(_get(activeActivity, ['end_at'])).toLocaleString(
              DateTime.DATE_FULL,
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const renderRatingFilled = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
    >
      <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  )

  const renderRatingUnfilled = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
    >
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  )

  const renderRating = () => {
    let ratingArray = []
    const rating = _get(activityItem, ['rating'])

    for (let i = 0; i < 10; i++) {
      if (i + 1 <= rating) {
        ratingArray.push(true)
      } else {
        ratingArray.push(false)
      }
    }

    return (
      <StyledRating $rating={rating}>
        {ratingArray.map((r, i) => {
          if (r === true) {
            return (
              <div className="rating-item" key={`rating-${i}`}>
                {renderRatingFilled()}
              </div>
            )
          }
          return (
            <div className="rating-item" key={`rating-${i}`}>
              {renderRatingUnfilled()}
            </div>
          )
        })}
      </StyledRating>
    )
  }

  const renderActiveGameShow = () => (
    <div className="game-show">
      <div className="game-show__image">
        <img src={_get(activityItem, ['image_url'])} />
      </div>
      <div className="game-show__name">{`${_get(activityItem, ['name'])} (${_get(activityPlatform, ['name'])})`}</div>
      {_get(activeActivity, ['end_at']) && (
        <div className="game-show__row game-show__row--primary">
          <div className="game-show__row__label">Rating:</div>
          <div className="game-show__row__value">{renderRating()}</div>
        </div>
      )}
      <div className="game-show__row">
        <div className="game-show__row__label">Started:</div>
        <div className="game-show__row__value">
          {DateTime.fromISO(_get(activeActivity, ['start_at'])).toLocaleString(
            DateTime.DATE_FULL,
          )}
        </div>
      </div>
      {renderEndAt()}
      <div className="game-show__row">
        <div className="game-show__row__label">
          {isShow ? 'Series completed' : 'Game completed'}:
        </div>
        <div className="game-show__row__value">
          {_get(activeActivity, 'completed') ? 'Yes' : 'No'}
        </div>
      </div>
      <div className="game-show__link">
        <a
          href={`https://www.imdb.com/title/${_get(activityItem, ['imdb_id'])}`}
          target="_blank"
          rel="noreferrer"
        >
          View on IMDB
        </a>
      </div>
    </div>
  )

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
        <div className="activity-container__primary">{`Timeline`}</div>
        <div className="activity-container__secondary">{`Scroll down the timeline to see what shows I've been watching and games I've been playing.`}</div>
        <div className="activity-container__secondary">{`Click on an activity for more details.`}</div>
      </div>
    )
  }

  return <StyledActivity>{renderContent()}</StyledActivity>
}

Activity.defaultProps = {}

Activity.propTypes = {}

export default Activity
