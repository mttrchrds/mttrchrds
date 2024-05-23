import React from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import { DateTime } from 'luxon'

import { ActivityType } from '../../helpers/enums'
import { GameShow, Platform } from '../../types/timeline'

const StyledActivity = styled.div`
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

const calculateRatingColour = (
  colors: {
    gold: string
    silver: string
    bronze: string
    other2: string
  },
  rating: number,
) => {
  if (rating === 10) {
    return colors.gold
  }
  if (rating === 9) {
    return colors.silver
  }
  if (rating === 8) {
    return colors.bronze
  }
  return colors.other2
}

interface StyledRatingProps {
  $rating: number
}

const StyledRating = styled.div<StyledRatingProps>`
  display: flex;
  position: relative;
  top: -3px;
  .rating-item {
    display: flex;
    svg {
      fill: ${props =>
        calculateRatingColour(props.theme.colors.ratings, props.$rating)};
    }
  }
`

interface ActivityProps {
  startAt: string
  endAt: string | null
  completed: boolean
  gameShow: GameShow
  activityType: ActivityType
  platform: Platform
}

const Activity: React.FC<ActivityProps> = ({
  startAt,
  endAt,
  completed,
  gameShow,
  activityType,
  platform,
}) => {
  const renderEndAt = () => {
    if (endAt) {
      return (
        <div className="game-show__row">
          <div className="game-show__row__label">Ended:</div>
          <div className="game-show__row__value">
            {DateTime.fromISO(endAt).toLocaleString(DateTime.DATE_FULL)}
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
    const rating = gameShow.rating

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
              <div
                className="rating-item rating-item--filled"
                key={`rating-${i}`}
              >
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

  const renderActiveGameShow = () => {
    const name = `${gameShow.name} (${platform.name})`
    return (
      <div className="game-show">
        <div className="game-show__image">
          <img src={gameShow.imageUrl} alt={name} />
        </div>
        <h3 className="game-show__name">{name}</h3>
        {endAt && (
          <div
            className="game-show__row game-show__row--primary"
            data-testid="activity-rating"
          >
            <div className="game-show__row__label">Rating:</div>
            <div className="game-show__row__value">{renderRating()}</div>
          </div>
        )}
        <div className="game-show__row">
          <div className="game-show__row__label">Started:</div>
          <div className="game-show__row__value">
            {DateTime.fromISO(startAt).toLocaleString(DateTime.DATE_FULL)}
          </div>
        </div>
        {renderEndAt()}
        <div className="game-show__row">
          <div className="game-show__row__label">
            {activityType === ActivityType.SHOW
              ? 'Series completed'
              : 'Game completed'}
            :
          </div>
          <div className="game-show__row__value">
            {completed ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="game-show__link">
          <a
            href={`https://www.imdb.com/title/${gameShow.imdbId}`}
            target="_blank"
            rel="noreferrer"
          >
            View on IMDB
          </a>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    return renderActiveGameShow()
  }

  return <StyledActivity>{renderContent()}</StyledActivity>
}

export default Activity
