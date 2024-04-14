import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home"
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import fsis from '../fsis/fsis.json'
import RecallProvider from "../RecallContext";

jest.mock('axios')
axios.get.mockResolvedValue({data: {fsis, errorFsis: ''}})

describe('Home component', () => {
  it("renders home page", () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    const element = screen.getByText(/Food Recall Tool/i)
    expect(element).toBeInTheDocument()
  })

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('Call home recalls', async () => {
    
    render(<MemoryRouter><Home /></MemoryRouter>)
    const recallList = await waitFor(() =>screen.findAllByTestId('recall'), {timeout:3000})
   expect(recallList).toHaveLength(3)
   /* render(<MemoryRouter><Home /></MemoryRouter>)
    screen.debug()
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    jest.advanceTimersByTime(8000)

    screen.debug()*/
  })
})