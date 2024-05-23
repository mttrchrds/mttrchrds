import React from 'react'
import { http, HttpResponse, delay } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../../testing/render_redux'
import { within } from '@testing-library/dom'

import Stats from '../stats'

// Use msw to intercept the network request during the test and return mocked response after 150ms
export const handlers = [
  http.get(
    `${import.meta.env.VITE_API_DOMAIN}/api/stats-game-days`,
    async () => {
      await delay(150)
      return HttpResponse.json([
        {
          id: 143,
          name: 'Elden Ring',
          total: 116,
        },
        {
          id: 60,
          name: 'Dead Cells',
          total: 47,
        },
        {
          id: 138,
          name: 'Horizon Zero Dawn',
          total: 41,
        },
        {
          id: 233,
          name: 'Cyberpunk 2077',
          total: 40,
        },
        {
          id: 57,
          name: 'The Last of Us: Part Two',
          total: 36,
        },
        {
          id: 174,
          name: 'God of War: Ragnarok',
          total: 36,
        },
        {
          id: 38,
          name: 'The Last of Us: Remastered',
          total: 35,
        },
        {
          id: 59,
          name: "Unchartered: A Thief's End",
          total: 31,
        },
        {
          id: 153,
          name: 'Sackboy',
          total: 30,
        },
        {
          id: 159,
          name: 'Hades',
          total: 30,
        },
      ])
    },
  ),
  http.get(
    `${import.meta.env.VITE_API_DOMAIN}/api/stats-activity-months`,
    async () => {
      await delay(150)
      return HttpResponse.json({
        years: ['2021', '2022', '2023', '2024'],
        data: [
          {
            name: 'Jan',
            years: [
              {
                name: '2021',
                total: 3,
              },
              {
                name: '2022',
                total: 5,
              },
              {
                name: '2023',
                total: 6,
              },
              {
                name: '2024',
                total: 0,
              },
            ],
          },
        ],
      })
    },
  ),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Stats', () => {
  it('should load in and render a chart when navigation link is clicked', async () => {
    renderWithProviders(<Stats />)

    const navigation = screen.getByTestId('statsNavigation')
    const content = screen.getByTestId('statsContent')

    fireEvent.click(
      within(navigation).getByRole('link', {
        name: /Most played games/i,
        hidden: true,
      }),
    )

    expect(within(content).getByTestId('loading')).toBeInTheDocument()

    expect(
      await within(content).findByRole('heading', {
        name: /Most played games/i,
      }),
    ).toBeInTheDocument()

    expect(await within(content).findByTestId('chart')).toBeInTheDocument()

    expect(within(content).queryByTestId('loading')).not.toBeInTheDocument()
  })
})
