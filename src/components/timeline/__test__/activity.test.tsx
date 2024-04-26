import React from 'react'
import { screen } from '@testing-library/react'
import Activity from '../activity'
import render from '../../../testing/render'
import { HomeSection } from '../../../helpers/enums'
import { ActivityType } from '../../../helpers/enums'

// {
//   "id": 370,
//   "start_at": "2024-03-10",
//   "end_at": null,
//   "completed": false,
//   "show_activity": {
//       "id": 350,
//       "name": "Shogun",
//       "creator": {
//           "id": 332,
//           "name": "FXP",
//           "image_url": "https://mttrchrdsapi.s3.amazonaws.com/shows/creators/fxp.png"
//       },
//       "imdb_id": "tt2788316",
//       "image_url": "https://mttrchrdsapi.s3.amazonaws.com/shows/shogun.jpg",
//       "thumbnail_url": "https://mttrchrdsapi.s3.amazonaws.com/shows/thumbnails/shogun_thumb.jpg",
//       "categories": [
//           {
//               "id": 80,
//               "name": "Drama"
//           },
//           {
//               "id": 81,
//               "name": "Historical"
//           }
//       ],
//       "rating": 9
//   },
//   "show_platform": {
//       "id": 97,
//       "name": "Disney+",
//       "image_url": "https://mttrchrdsapi.s3.amazonaws.com/shows/platforms/disney_plus.png"
//   },
//   "game_activity": null,
//   "game_platform": null,
//   "activity_type": "SHOW"
// }

describe('Activity', () => {
  it('should render the label if passed to it', () => {
    const labelProp = HomeSection.PROJECTS
    render(
      <Activity
        startAt="2024-03-10"
        endAt={null}
        completed={false}
        gameShow={{
          id: 350,
          name: 'Shogun',
          imdb_id: 'tt2788316',
          image_url: 'https://mttrchrdsapi.s3.amazonaws.com/shows/shogun.jpg',
          thumbnail_url:
            'https://mttrchrdsapi.s3.amazonaws.com/shows/thumbnails/shogun_thumb.jpg',
          rating: 8,
          creator: {
            id: 332,
            name: 'FXP',
            image_url:
              'https://mttrchrdsapi.s3.amazonaws.com/shows/creators/fxp.png',
          },
          categories: [
            {
              id: 80,
              name: 'Drama',
            },
          ],
        }}
        activityType={ActivityType.SHOW}
        platform={{
          id: 97,
          name: 'Disney',
          image_url:
            'https://mttrchrdsapi.s3.amazonaws.com/shows/platforms/disney_plus.png',
        }}
      />,
    )
    const renderedTitle = screen.queryByRole('rating')
    expect(renderedTitle).toBeInTheDocument()
  })
})
