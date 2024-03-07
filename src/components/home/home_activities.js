import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _get from 'lodash/get'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'

import { mqMin } from '../../helpers/media_queries'

import HomeLoading from './home_loading'
import { StyledBlankState } from '../pages/home'

const StyledHomeActivities = styled.div`
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
`

const HomeActivities = props => {
  const [displayLoading, setDisplayLoading] = useState(true)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    let endPoint = 'latest-games'
    if (props.shows) {
      endPoint = 'latest-shows'
    }
    axios
      .get(
        /* eslint-disable-next-line no-undef */
        `${process.env.API_DOMAIN}/api/${endPoint}`,
      )
      .then(apiResponse => {
        const payload = _get(apiResponse, 'data', [])
        if (payload.length > 0) {
          setActivities(payload)
        }
        setDisplayLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const renderActivity = activity => {
    const activityPlatform = props.shows
      ? _get(activity, ['show_platform'])
      : _get(activity, ['game_platform'])
    const activityItem = props.shows
      ? _get(activity, ['show_activity'])
      : _get(activity, ['game_activity'])
    const endAt = _get(activity, ['end_at'])
    return (
      <div className="activity" key={_get(activityItem, 'id')}>
        <div className="activity__image">
          <img src={_get(activityItem, ['thumbnail_url'])} />
        </div>
        <div className="activity__details">
          <div className="activity__details">
            <div className="activity__details__name">{`${_get(activityItem, ['name'])} (${_get(activityPlatform, ['name'])})`}</div>
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
        <StyledBlankState>
          {props.shows ? 'No shows found' : 'No games found'}
        </StyledBlankState>
      )
    }
    return (
      <StyledHomeActivities>
        {activities.map(a => renderActivity(a))}
      </StyledHomeActivities>
    )
  }

  if (displayLoading) {
    return <HomeLoading />
  }

  return renderActivities()
}

HomeActivities.defaultProps = {
  shows: false,
}

HomeActivities.propTypes = {
  shows: PropTypes.bool,
}

export default HomeActivities
