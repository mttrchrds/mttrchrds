import { screen } from '@testing-library/react'
import HomeTitle from '../home_title'
import render from '../../../../testing/render'

describe('HomeTitle', () => {
  it('should render the title prop passed to it', () => {
    const titleProp = 'Hello World'
    render(<HomeTitle title={titleProp} />)
    const renderedTitle = screen.getByRole('heading')
    expect(renderedTitle.textContent).toBe(titleProp)
  })
})
