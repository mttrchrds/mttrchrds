import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { mqMin } from '../../helpers/media_queries'

const StyledHomeProjects = styled.article`
  .project-item {
    font-family: 'Silkscreen';
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid ${props => props.theme.colors.primary1};
    &:last-child {
      margin-bottom: 0;
      border-bottom: 0;
    }
    &__primary {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 20px;
      @media ${props => mqMin(props.theme.breakPoints.sm)} {
        flex-direction: row;
      }
      &__title {
        font-size: ${props => props.theme.typography.sizeLarge};
        color: ${props => props.theme.colors.text1};
        margin-top: 0;
        margin-bottom: 10px;
        @media ${props => mqMin(props.theme.breakPoints.sm)} {
          margin-bottom: 0;
        }
      }
      &__date {
        font-size: ${props => props.theme.typography.sizeMedium};
        color: ${props => props.theme.colors.text1};
        margin: 0;
        @media ${props => mqMin(props.theme.breakPoints.sm)} {
          color: ${props => props.theme.colors.text};
          font-size: ${props => props.theme.typography.sizeLarge};
        }
      }
    }
    &__secondary {
      p {
        font-size: ${props => props.theme.typography.sizeMedium};
        color: ${props => props.theme.colors.text};
        margin-bottom: 20px;
      }
      a {
        &:link,
        &:visited,
        &:active {
          color: ${props => props.theme.colors.text1};
          text-decoration: underline;
        }
        &:hover {
          color: ${props => props.theme.colors.secondary1};
          text-decoration: none;
        }
      }
    }
  }
`

const HomeProjects = () => {
  const renderItem = (title, date, description) => (
    <div className="project-item">
      <div className="project-item__primary">
        <h4 className="project-item__primary__title">{title}</h4>
        <p className="project-item__primary__date">{date}</p>
      </div>
      <div className="project-item__secondary">{description}</div>
    </div>
  )

  return (
    <StyledHomeProjects>
      {renderItem(
        'Timeline',
        '15 March 2024',
        <>
          <p>
            {`Frustrated with the limitations of developer APIs from the likes of
            Twitter, Spotify and Strava I decided to create my own data set. In
            2021 I started to make a log of the TV shows and video games I was
            watching/playing. These activities are timestamped, categorised and rated. My
            thinking being at some point I could store these in a relational DB,
            expose them via an API and consume the data on projects.`}
          </p>
          <p>
            {`It's 2024 and the data is now in a Postgres DB with Django application on top. Django REST Framework is used to expose the data in a consumable format and presented with Swagger.`}
          </p>
          <p>
            {`Timeline is the first use of this data. It's a React based chronological
            visulisation of these activites. The UI/design was largely inspired by
            commit history trees in Git clients such as Gitkraken (my client of
            choice).`}
          </p>
          <p>
            <a target="blank" href="https://mttrchrdsapi.onrender.com">
              View API
            </a>
          </p>
          <p>
            <Link to="/timeline">View Timeline</Link>
          </p>
        </>,
      )}
    </StyledHomeProjects>
  )
}

HomeProjects.defaultProps = {}

HomeProjects.propTypes = {}

export default HomeProjects
