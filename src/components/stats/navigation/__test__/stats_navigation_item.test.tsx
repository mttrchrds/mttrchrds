import React from 'react'
import { screen } from '@testing-library/react'
import StatsNavigationItem from '../stats_navigation_item'
import render from '../../../../testing/render'

describe('StatsNavigationItem', () => {
  it('should render the label that is passed to it', () => {
    const itemLabel = 'Click me'
    render(
      <StatsNavigationItem active={false} clickHandler={() => null}>
        {itemLabel}
      </StatsNavigationItem>,
    )
    const renderedLabel = screen.getByRole('link')
    expect(renderedLabel).toHaveTextContent(itemLabel)
  })
})
