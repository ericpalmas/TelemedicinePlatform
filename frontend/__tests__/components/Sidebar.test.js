import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Sidebar from '../../src/components/Sidebar'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint
export const handlers = [
  rest.get('/api/surveys', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          deleted: false,
          _id: '60ac01c8c458a814c89b16e1',
          name: 'Parkinson',
          description: 'parkinson survey description',
          __v: 0,
          createdAt: '2021-05-24T19:43:04.246Z',
          updatedAt: '2021-10-07T20:14:26.827Z',
        },
        {
          deleted: false,
          _id: '60ac01c8c458a814c89b16e2',
          name: 'Sleep disorders',
          description: 'sleep disorders survey description',
          __v: 0,
          createdAt: '2021-05-24T19:43:04.248Z',
          updatedAt: '2021-05-24T19:43:04.248Z',
        },
      ]),
      ctx.delay(150)
    )
  }),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

// local storage deve essere sempre settato
describe('Testing message component', () => {
  test('fetches & receives a user after clicking the fetch user button', async () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )

    fireEvent.click(await screen.findByTestId('buttonShowSurveys'))
    expect(await screen.findByText(/Parkinson/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sleep disorders/i)).toBeInTheDocument()
  })

  test('test buttons', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )
    expect(await getByTestId('addSurvey')).toBeTruthy()
    expect(await getByTestId('addQuestion')).toBeTruthy()
    expect(await getByTestId('addTimeSlot')).toBeTruthy()
  })

  test('test button click', async () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )

    fireEvent.click(await screen.findByTestId('addSurvey'))
    fireEvent.click(await screen.findByTestId('addQuestion'))
    fireEvent.click(await screen.findByTestId('addTimeSlot'))
  })
})
