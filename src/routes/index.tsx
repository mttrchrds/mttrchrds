import { createFileRoute, Link } from '@tanstack/react-router'
import styled from 'styled-components'

import { mqMin } from '../helpers/media_queries'

import HomeLayout from '../components/layout/home/home'

export const Route = createFileRoute('/')({
  component: Index,
})

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

function Index() {
  const renderItem = (
    title: string,
    date: string,
    description: React.JSX.Element,
  ) => (
    <div className="news-item">
      <div className="news-item__primary">
        <h4 className="news-item__primary__title">{title}</h4>
        <p className="news-item__primary__date">{date}</p>
      </div>
      <div className="news-item__secondary">{description}</div>
    </div>
  )

  return (
    <HomeLayout>
      <StyledHomeNews>
        {renderItem(
          'Bluesky bot',
          '9 Nov 2024',
          <p>
            I create a <Link to="/">Bluesky bot</Link> using TypeScript/Node.
          </p>,
        )}
        {renderItem(
          'New project',
          '21 Aug 2024',
          <p>
            A <Link to="/projects">new project</Link> has been added based on
            the Material UI Autocomplete component.
          </p>,
        )}
        {renderItem(
          'Stats added',
          '15 May 2024',
          <p>
            My latest project is now live. See{' '}
            <Link to="/stats">data visualisation</Link> based on my activities
          </p>,
        )}
        {renderItem(
          'Rated',
          '25 March 2024',
          <p>Games and shows now have a rating out of 10</p>,
        )}
        {renderItem(
          'Timeline added',
          '15 March 2024',
          <p>
            First project is now live. View an interactive{' '}
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
            Website is now live, in the style of the Sevastolink terminal from{' '}
            <a href="https://www.imdb.com/title/tt3391132/" target="blank">
              Alien:Isolation
            </a>{' '}
            🤓. Next, hooking it up to the API for some content...
          </p>,
        )}
      </StyledHomeNews>
    </HomeLayout>
  )
}
