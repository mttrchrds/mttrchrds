import { screen } from '@testing-library/react'
import Activity from '../activity'
import render from '../../../testing/render'
import { ActivityType } from '../../../helpers/enums'

const activityOngoing = {
  id: 370,
  start_at: '2024-03-10',
  end_at: null,
  completed: false,
  show_activity: {
    id: 350,
    name: 'Shogun',
    creator: {
      id: 332,
      name: 'FXP',
      image_url: 'https://mttrchrdsapi.s3.amazonaws.com/shows/creators/fxp.png',
    },
    imdb_id: 'tt2788316',
    image_url: 'https://mttrchrdsapi.s3.amazonaws.com/shows/shogun.jpg',
    thumbnail_url:
      'https://mttrchrdsapi.s3.amazonaws.com/shows/thumbnails/shogun_thumb.jpg',
    categories: [
      {
        id: 80,
        name: 'Drama',
      },
      {
        id: 81,
        name: 'Historical',
      },
    ],
    rating: 9,
  },
  show_platform: {
    id: 97,
    name: 'Disney+',
    image_url:
      'https://mttrchrdsapi.s3.amazonaws.com/shows/platforms/disney_plus.png',
  },
  game_activity: null,
  game_platform: null,
  activity_type: ActivityType.SHOW,
}

const activityComponent = (ongoing: boolean) => (
  <Activity
    startAt={activityOngoing.start_at}
    endAt={ongoing ? '2024-04-10' : activityOngoing.end_at}
    completed={activityOngoing.completed}
    gameShow={{
      id: activityOngoing.show_activity.id,
      name: activityOngoing.show_activity.name,
      imdbId: activityOngoing.show_activity.imdb_id,
      imageUrl: activityOngoing.show_activity.image_url,
      thumbnailUrl: activityOngoing.show_activity.thumbnail_url,
      rating: activityOngoing.show_activity.rating,
      creator: {
        id: activityOngoing.show_activity.creator.id,
        name: activityOngoing.show_activity.creator.name,
        imageUrl: activityOngoing.show_activity.creator.image_url,
      },
      categories: activityOngoing.show_activity.categories,
    }}
    activityType={activityOngoing.activity_type}
    platform={{
      id: activityOngoing.show_platform.id,
      name: activityOngoing.show_platform.name,
      imageUrl: activityOngoing.show_platform.image_url,
    }}
  />
)

const activityName = `${activityOngoing.show_activity.name} (${activityOngoing.show_platform.name})`

describe('Activity', () => {
  it('should render title of the activity', () => {
    render(activityComponent(false))
    const renderedTitle = screen.getByRole('heading')
    expect(renderedTitle.textContent).toBe(activityName)
  })
  it('should render image the activity', () => {
    render(activityComponent(false))
    const renderedImage = screen.getByAltText(activityName)
    expect(renderedImage).toBeInTheDocument()
  })
  it('should not render rating when activity is ongoing', () => {
    render(activityComponent(false))
    const renderedRating = screen.queryByTestId('activity-rating')
    expect(renderedRating).not.toBeInTheDocument()
  })
  it('should render rating when activity has ended', () => {
    render(activityComponent(true))
    const renderedRating = screen.queryByTestId('activity-rating')
    expect(renderedRating).toBeInTheDocument()
  })
  it('should render link to IMDB', () => {
    render(activityComponent(false))
    const renderedLink = screen.getByRole('link')
    expect(renderedLink).toHaveAttribute(
      'href',
      `https://www.imdb.com/title/${activityOngoing.show_activity.imdb_id}`,
    )
  })
})
