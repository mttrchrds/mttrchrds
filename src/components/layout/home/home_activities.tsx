import React from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import { Link } from "@tanstack/react-router";

import { mqMin } from '../../../helpers/media_queries'

import { Activity } from '../../../types/timeline2'

import HomeLoading from './home_loading'
import BlankState from '../../../styles/components/blank_state'
import RatingEmoji from '../../rating_emoji'

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
        &__emoji {
          padding-left: 5px;
        }
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

const renderRatingBackgroundColour = (
  colors: {
    gold: string
    silver: string
    silverText: string
    bronze: string
    other: string
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
  return colors.other
}

interface StyledRatingProps {
  $rating: number
}

const StyledRating = styled.span<StyledRatingProps>`
  color: ${props =>
    props.$rating === 9
      ? props.theme.colors.ratings.silverText
      : props.theme.colors.text1};
  background-color: ${props =>
    renderRatingBackgroundColour(props.theme.colors.ratings, props.$rating)};
  line-height: 1;
  padding-right: 3px;
  padding-left: 3px;
`

interface HomeActivitiesProps {
  shows?: boolean
  loading?: boolean
  activities?: Activity[]
}

const HomeActivities: React.FC<HomeActivitiesProps> = ({
  shows = false,
  loading = false,
  activities = [],
}) => {
  const renderRating = (rating: number, skip: boolean) => {
    if (!skip) {
      return <StyledRating $rating={rating}>{`${rating}/10`}</StyledRating>
    }
    return null
  }

  const renderEmoji = (rating: number, skip: boolean) => {
    if (!skip) {
      return (
        <span className="activity__details__name__emoji">
          <RatingEmoji rating={rating} />
        </span>
      )
    }
    return null
  }

  const renderActivity = (activity: Activity) => {

    const endAt = activity.end_at ? activity.end_at : false
    const game_show =
      activity.game_activity !== null
        ? activity.game_activity
        : activity.show_activity
    const platform =
      activity.game_platform !== null
        ? activity.game_platform
        : activity.show_platform
    if (!game_show || !platform) {
      return null
    }
    return (
      <div className="activity" key={activity.id}>
        <div className="activity__image">
          <img src={game_show.thumbnail_url} />
        </div>
        <div className="activity__details">
          <div className="activity__details">
            <h5 className="activity__details__name">
              {`${game_show.name} (${platform.name})`}{' '}
              {renderRating(activity ? game_show.rating : 1, !endAt)}
              {renderEmoji(activity ? game_show.rating : 1, !endAt)}
            </h5>
            <div className="activity__details__row">
              <div className="activity__details__row__label">Started:</div>
              <div className="activity__details__row__value">
                {DateTime.fromISO(activity.start_at).toLocaleString(
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
                  {shows ? 'Series completed' : 'Game completed'}:
                </div>
                <div className="activity__details__row__value">
                  {activity.completed ? 'Yes' : 'No'}
                </div>
              </div>
            )}
            <div className="activity__details__link">
              <a
                href={`https://www.imdb.com/title/${game_show.imdb_id}`}
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
          {shows ? <p>No shows found</p> : <p>No games found</p>}
        </BlankState>
      )
    }
    // return <p>Hello World</p>
    return (
      <StyledHomeActivities>
        {activities.map(a => renderActivity(a))}
        <div className="activities-footer">
          <Link to="/timeline">
            {shows
              ? 'View all shows on Timeline'
              : 'View all games on Timeline'}
          </Link>
        </div>
      </StyledHomeActivities>
    )
  }

  console.log({activities})

  if (loading) {
    return <HomeLoading />
  }

  return renderActivities()
}

export default HomeActivities
