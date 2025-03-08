import { screen } from '@testing-library/react'
import HomeNavigationButton from '../home_navigation_button'
import render from '../../../../testing/render'

describe('HomeNavigationButton', () => {
  it('should render the label if passed to it', () => {
    const labelProp = 'Projects'
    render(<HomeNavigationButton link={'/'} label={labelProp} />)
    const renderedLink = screen.getByRole('link')
    expect(renderedLink).toHaveTextContent(labelProp)
  })
})
