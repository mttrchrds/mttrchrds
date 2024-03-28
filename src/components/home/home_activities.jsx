import React from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { mqMin } from '../../helpers/media_queries'

import HomeLoading from './home_loading'
import BlankState from '../../styles/components/blank_state'

const StyledHomeActivities = styled.article`
  .activity {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid ${props => props.theme.colors.primary1};
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
    @media ${props => mqMin(props.theme.breakPoints.lg)} {
      flex-direction: row;
    }
    &__image {
      margin-right: 30px;
      margin-bottom: 30px;
      @media ${props => mqMin(props.theme.breakPoints.lg)} {
        margin-bottom: 0;
      }
      img {
        display: block;
        max-width: 150px;
        height: auto;
      }
    }
    &__details {
      &__name {
        color: ${props => props.theme.colors.text1};
        font-size: ${props => props.theme.typography.sizeLarger};
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 0;
      }
      &__row {
        display: flex;
        margin-bottom: 10px;
        &__label {
          color: ${props => props.theme.colors.text};
          margin-right: 5px;
        }
        &__value {
          color: ${props => props.theme.colors.text1};
        }
      }
      &__link {
        padding-top: 10px;
        a {
          &:link,
          &:visited,
          &:active {
            color: ${props => props.theme.colors.text1};
            text-decoration: none;
          }
          &:hover {
            color: ${props => props.theme.colors.secondary1};
            text-decoration: underline;
          }
        }
      }
    }
  }
  .activities-footer {
    display: flex;
    justify-content: flex-end;
    a {
      &:link,
      &:visited,
      &:active {
        color: ${props => props.theme.colors.text1};
        text-decoration: none;
      }
      &:hover {
        color: ${props => props.theme.colors.secondary1};
        text-decoration: underline;
      }
    }
  }
`

const renderRatingBackgroundColour = (colors, rating) => {
  console.log({ rating })
  if (rating === 10) {
    return colors.ratings.gold
  }
  if (rating === 9) {
    return colors.ratings.silver
  }
  if (rating === 8) {
    return colors.ratings.bronze
  }
  return colors.ratings.other
}

const StyledRating = styled.span`
  color: ${props =>
    props.$rating === 9
      ? props.theme.colors.ratings.silverText
      : props.theme.colors.text1};
  background-color: ${props =>
    renderRatingBackgroundColour(props.theme.colors, props.$rating)};
  line-height: 1;
  padding-right: 3px;
  padding-left: 3px;
`

const HomeActivities = props => {
  const activities = _get(props, 'activities', [])

  const renderRating = (rating, skip) => {
    if (!skip) {
      return <StyledRating $rating={rating}>{`${rating}/10`}</StyledRating>
    }
    return null
  }

  const renderActivity = activity => {
    const activityPlatform = props.shows
      ? _get(activity, ['show_platform'])
      : _get(activity, ['game_platform'])
    const activityItem = props.shows
      ? _get(activity, ['show_activity'])
      : _get(activity, ['game_activity'])
    const endAt = _get(activity, ['end_at'])
      ? _get(activity, ['end_at'])
      : false
    return (
      <div className="activity" key={_get(activityItem, 'id')}>
        <div className="activity__image">
          <img src={_get(activityItem, ['thumbnail_url'])} />
        </div>
        <div className="activity__details">
          <div className="activity__details">
            <h5 className="activity__details__name">
              {`${_get(activityItem, ['name'])} (${_get(activityPlatform, ['name'])})`}{' '}
              {renderRating(_get(activityItem, 'rating'), !endAt)}
            </h5>
            <div className="activity__details__row">
              <div className="activity__details__row__label">Started:</div>
              <div className="activity__details__row__value">
                {DateTime.fromISO(_get(activity, ['start_at'])).toLocaleString(
                  DateTime.DATE_FULL,
                )}
              </div>
            </div>
            <div className="activity__details__row">
              <div className="activity__details__row__label">Ended:</div>
              <div className="activity__details__row__value">
                {endAt &&
                  DateTime.fromISO(endAt).toLocaleString(DateTime.DATE_FULL)}
              </div>
            </div>
            {endAt && (
              <div className="activity__details__row">
                <div className="activity__details__row__label">
                  {props.shows ? 'Series completed' : 'Game completed'}:
                </div>
                <div className="activity__details__row__value">
                  {_get(activity, 'completed') ? 'Yes' : 'No'}
                </div>
              </div>
            )}
            <div className="activity__details__link">
              <a
                href={`https://www.imdb.com/title/${_get(activityItem, ['imdb_id'])}`}
                target="_blank"
                rel="noreferrer"
              >
                View on IMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderActivities = () => {
    if (activities.length === 0) {
      return (
        <BlankState>
          {props.shows ? <p>No shows found</p> : <p>No games found</p>}
        </BlankState>
      )
    }
    return (
      <StyledHomeActivities>
        {activities.map(a => renderActivity(a))}
        <div className="activities-footer">
          <Link to="/timeline">
            {props.shows
              ? 'View all shows on Timeline'
              : 'View all games on Timeline'}
          </Link>
        </div>
      </StyledHomeActivities>
    )
  }

  if (props.loading) {
    return <HomeLoading />
  }

  return renderActivities()
}

HomeActivities.defaultProps = {
  shows: false,
  loading: false,
  activities: [],
}

HomeActivities.propTypes = {
  shows: PropTypes.bool,
  loading: PropTypes.bool,
  activities: PropTypes.array,
}

export default HomeActivities
