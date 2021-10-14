import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom/extend-expect'
import AddDoctorScreen from '../../src/screens/AddDoctorScreen'
import { BrowserRouter } from 'react-router-dom'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint

const server = setupServer(
  rest.post('/api/doctors/login', (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    return res(ctx.json({ token: 'mocked_user_token' }))
  })
)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Testing admin new registration component', () => {
  test('test neew doctor registration ', async () => {
    const history = []
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddDoctorScreen history={history} />
        </BrowserRouter>
      </Provider>
    )

    expect(await screen.findByText(/Register new doctor/i)).toBeInTheDocument()

    expect(await screen.getByTestId('insertName')).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Enter name'), 'John')

    expect(await screen.findByText(/Surname/i)).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Enter surname'), 'Maverick')

    expect(await screen.findByText(/Email Address/i)).toBeInTheDocument()
    userEvent.type(
      screen.getByPlaceholderText('Enter email'),
      'john.maverick@example.com'
    )

    userEvent.type(
      screen.getByPlaceholderText('Enter password'),
      'super-secret'
    )

    expect(await screen.findByText(/Confirm Password/i)).toBeInTheDocument()
    userEvent.type(
      screen.getByPlaceholderText('Confirm password'),
      'super-secret'
    )

    userEvent.click(screen.getByTestId('registerButton'))
    expect(window.sessionStorage.getItem('token')).toBeNull()
  })
})
