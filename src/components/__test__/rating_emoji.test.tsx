import React from 'react'
import { screen } from '@testing-library/react'
import RatingEmoji from '../rating_emoji'
import render from '../../testing/render'

describe('RatingEmoji', () => {
  it('should render gold medal when rating is 10', () => {
    render(
      <h1>
        <RatingEmoji rating={10} />
      </h1>,
    )
    const renderedEmoji = screen.getByRole('heading')
    expect(renderedEmoji.textContent).toBe('🥇')
  })
  it('should render silver medal when rating is 9', () => {
    render(
      <h1>
        <RatingEmoji rating={9} />
      </h1>,
    )
    const renderedEmoji = screen.getByRole('heading')
    expect(renderedEmoji.textContent).toBe('🥈')
  })
  it('should render bronze medal when rating is 8', () => {
    render(
      <h1>
        <RatingEmoji rating={8} />
      </h1>,
    )
    const renderedEmoji = screen.getByRole('heading')
    expect(renderedEmoji.textContent).toBe('🥉')
  })
  it('should render thumbs down when rating is less than 6', () => {
    render(
      <h1>
        <RatingEmoji rating={5} />
      </h1>,
    )
    const renderedEmoji = screen.getByRole('heading')
    expect(renderedEmoji.textContent).toBe('👎')
  })
})
