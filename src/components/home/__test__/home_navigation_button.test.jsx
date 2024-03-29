import React from 'react'
import { screen } from '@testing-library/react'
import HomeNavigationButton from '../home_navigation_button'
import render from '../../../testing/render'

describe('HomeNavigationButton', () => {
  it('should render the label if passed to it', () => {
    const labelProp = 'Home'
    render(<HomeNavigationButton label={labelProp} clickHandler={() => null} />)
    const renderedLabel = screen.getByRole('link')
    expect(renderedLabel).toHaveTextContent(labelProp)
  })
})
