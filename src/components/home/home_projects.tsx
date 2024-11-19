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
  const renderItem = (
    title: string,
    date: string,
    description: JSX.Element,
  ) => (
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
        'Bluesky bot',
        '9 Nov 2024',
        <>
          <p>
            {`After recently switching to Bluesky from Twitter/X, one of the things I missed was a news aggregator for Liverpool FC. So I decided to build one!`}
          </p>
          <p>
            {`I created a simple TypeScript Node app using the Bluesky API, Axios and Cheerio. The app is scheduled throughout the day using Github Actions.`}
          </p>
          <p>
            <a
              target="blank"
              href="https://github.com/mttrchrds/bsky-lfcnews"
            >
              View Github repo
            </a>
          </p>
          <p>
            <a
              target="blank"
              href="https://bsky.app/profile/lfcnews.bsky.social"
            >
              View Bluesky profile
            </a>
          </p>
        </>,
      )}
      {renderItem(
        'Material UI Autocomplete',
        '21 Aug 2024',
        <>
          <p>
            {`After recently using Material UI and Google Maps on another project I discovered that the example Autocomplete component in the MUI docs did not use the latest version of the Google Maps Places API.`}
          </p>
          <p>
            {`After refactoring this (which included creating manual session tokens and creating my own type definitions) I decided to add this to a `}
            <a
              target="blank"
              href="https://github.com/mttrchrds/mui-autocomplete-places-new"
            >
              Github repo
            </a>
            {`.`}
          </p>
          <p>
            {`A `}
            <a
              target="blank"
              href="https://mui-autocomplete-places-new.onrender.com"
            >
              Live demo
            </a>
            {` of the component is also available.`}
          </p>
        </>,
      )}
      {renderItem(
        'Stats',
        '15 May 2024',
        <>
          <p>
            {`Keen to investigate React charting libraries, I created a data visualisation
            project called Stats. Various endpoints were added to my API which deliver statistical data.`}
          </p>
          <p>
            {`Stats consumes this data and utilises various chart components from the React library `}
            <a target="blank" href="https://recharts.org">
              Recharts
            </a>
            .
          </p>
          <p>
            <Link to="/stats">View Stats</Link>
          </p>
        </>,
      )}
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

export default HomeProjects
