import { screen } from '@testing-library/react'
import Header from '../header'
import render from '../../../testing/render'
// import { MemoryRouter } from "react-router-dom"

describe('Header', () => {
  it('should render the title if passed to it', () => {
    const titleProp = 'Hello World'
    render(
      // <MemoryRouter>
      <Header title={titleProp} />,
      // </MemoryRouter>,
    )
    const renderedTitle = screen.getByRole('heading')
    expect(renderedTitle.textContent).toBe(titleProp)
  })
  it('should not render the title if not passed to it', () => {
    render(
      // <MemoryRouter>
      <Header />,
      // </MemoryRouter>,
    )
    const renderedTitle = screen.queryByRole('heading')
    expect(renderedTitle).not.toBeInTheDocument()
  })
})
