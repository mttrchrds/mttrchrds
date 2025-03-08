import { http, HttpResponse, delay } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// import { renderWithProviders } from '../../../testing/render_redux'
import { within } from '@testing-library/dom'

// import Home from '../home'

// Use msw to intercept the network request during the test and return mocked response after 150ms
export const handlers = [
  http.get(`${import.meta.env.VITE_API_DOMAIN}/api/latest-shows`, async () => {
    await delay(150)
    return HttpResponse.json([
      {
        id: 370,
        start_at: '2024-03-10',
        end_at: null,
        completed: false,
        show_activity: {
          id: 350,
          name: 'Shogun',
          imdb_id: 'tt2788316',
          image_url: 'https://mttrchrdsapi.s3.amazonaws.com/shows/shogun.jpg',
          thumbnail_url:
            'https://mttrchrdsapi.s3.amazonaws.com/shows/thumbnails/shogun_thumb.jpg',
          creator: {
            id: 332,
            name: 'FXP',
            image_url:
              'https://mttrchrdsapi.s3.amazonaws.com/shows/creators/fxp.png',
          },
        },
        show_platform: {
          id: 97,
          name: 'Disney+',
          image_url:
            'https://mttrchrdsapi.s3.amazonaws.com/shows/platforms/disney_plus.png',
        },
        game_activity: null,
        game_platform: null,
      },
    ])
  }),
  http.get(`${import.meta.env.VITE_API_DOMAIN}/api/latest-games`, async () => {
    await delay(150)
    return HttpResponse.json([
      {
        id: 369,
        start_at: '2024-02-26',
        end_at: null,
        completed: false,
        show_activity: null,
        show_platform: null,
        game_activity: {
          id: 143,
          name: 'Elden Ring',

          imdb_id: 'tt10562854',
          image_url:
            'https://mttrchrdsapi.s3.amazonaws.com/games/elden_ring.webp',
          thumbnail_url:
            'https://mttrchrdsapi.s3.amazonaws.com/games/thumbnails/elden_ring_thumb.webp',
          creator: {
            id: 44,
            name: 'From Software',
            image_url:
              'https://mttrchrdsapi.s3.amazonaws.com/games/creators/from_software.png',
          },
        },
        game_platform: {
          id: 37,
          name: 'PS5',
          image_url:
            'https://mttrchrdsapi.s3.amazonaws.com/games/platforms/ps5.png',
        },
      },
    ])
  }),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Home', () => {
  it('should display latest news title on initial page load', async () => {
    renderWithProviders(<Home />)
    const homeTitle = screen.getByTestId('homeTitle')
    const sectionTitle = within(homeTitle).getByRole('heading', {
      hidden: true,
    })
    expect(sectionTitle).toHaveTextContent(/Latest news/i)
  })

  it('should display Shows title when Shows button is clicked', async () => {
    renderWithProviders(<Home />)
    const homeTitle = screen.getByTestId('homeTitle')
    const homeNavigation = screen.getByTestId('homeNavigation')

    fireEvent.click(
      within(homeNavigation).getByRole('link', { name: /Shows/i }),
    )

    expect(
      within(homeTitle).getByRole('heading', {
        hidden: true,
      }),
    ).toHaveTextContent(/Latest shows watched/i)
  })

  it('should load in and render Shows when Shows button is clicked', async () => {
    renderWithProviders(<Home />)

    const homeNavigation = screen.getByTestId('homeNavigation')
    const homeContent = screen.getByTestId('homeContent')

    fireEvent.click(
      within(homeNavigation).getByRole('link', { name: /Shows/i }),
    )

    expect(
      within(homeContent).getByRole('heading', { name: /Loading/i }),
    ).toBeInTheDocument()

    expect(
      await within(homeContent).findByRole('heading', { name: /Shogun/i }),
    ).toBeInTheDocument()

    expect(
      within(homeContent).queryByRole('heading', { name: /Loading/i }),
    ).not.toBeInTheDocument()
  })

  it('should display Games title when Games button is clicked', async () => {
    renderWithProviders(<Home />)
    const homeTitle = screen.getByTestId('homeTitle')
    const homeNavigation = screen.getByTestId('homeNavigation')

    fireEvent.click(
      within(homeNavigation).getByRole('link', { name: /Games/i }),
    )

    expect(
      within(homeTitle).getByRole('heading', {
        hidden: true,
      }),
    ).toHaveTextContent(/Latest games played/i)
  })

  it('should load in and render Games when Games button is clicked', async () => {
    renderWithProviders(<Home />)

    const homeNavigation = screen.getByTestId('homeNavigation')
    const homeContent = screen.getByTestId('homeContent')

    fireEvent.click(
      within(homeNavigation).getByRole('link', { name: /Games/i }),
    )

    expect(
      within(homeContent).getByRole('heading', { name: /Loading/i }),
    ).toBeInTheDocument()

    expect(
      await within(homeContent).findByRole('heading', { name: /Elden Ring/i }),
    ).toBeInTheDocument()

    expect(
      within(homeContent).queryByRole('heading', { name: /Loading/i }),
    ).not.toBeInTheDocument()
  })
})
