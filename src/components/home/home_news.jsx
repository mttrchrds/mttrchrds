import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { mqMin } from '../../helpers/media_queries'

const StyledHomeNews = styled.article`
  .news-item {
    font-family: 'Silkscreen';
    margin-bottom: 20px;
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

const HomeNews = () => {
  const renderItem = (title, date, description) => (
    <div className="news-item">
      <div className="news-item__primary">
        <h4 className="news-item__primary__title">{title}</h4>
        <p className="news-item__primary__date">{date}</p>
      </div>
      <div className="news-item__secondary">{description}</div>
    </div>
  )

  return (
    <StyledHomeNews>
      {renderItem(
        'Rated',
        '25 March 2024',
        <p>Games and shows now have a rating out of 10</p>,
      )}
      {renderItem(
        'Timeline added',
        '15 March 2024',
        <p>
          Latest project is now live. View an interactive{' '}
          <Link to="/timeline">timeline</Link> of all the shows I&apos;ve
          watched and games I&apos;ve played
        </p>,
      )}
      {renderItem(
        'Content arrives',
        '8 March 2024',
        <p>
          Shows and Games sections are now hooked up to the API to pull in the
          latest activities
        </p>,
      )}
      {renderItem(
        'Website complete',
        '6 March 2024',
        <p>
          Website is now live, in the style of the Sevastolink terminal from
          Alien:Isolation 🤓. Next, hooking it up to the API for some content...
        </p>,
      )}
    </StyledHomeNews>
  )
}

HomeNews.defaultProps = {}

HomeNews.propTypes = {}

export default HomeNews
