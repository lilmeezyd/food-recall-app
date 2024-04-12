import { render, screen } from "@testing-library/react";
import Home from "../pages/Home"
import { MemoryRouter } from "react-router-dom";

describe('Register component', () => {
  it("renders home page", () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    const element = screen.getByText(/Food Recall Tool/i)
    expect(element).toBeInTheDocument()
  })
})
/*
describe('Fetch Homepage recalls', () => {
  beforeEach(() => {
    global.fetch = jest.fn
  })

  it('should render the 3 most recent recalls from usda', async () => {
    jest.spyOn(global,)
  })
})
*/