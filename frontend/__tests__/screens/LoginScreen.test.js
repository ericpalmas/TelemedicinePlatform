// test/LoginForm.test.js
import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginScreen from '../../src/screens/LoginScreen'
import { Provider } from 'react-redux'

import store from '../../src/store'

afterEach(cleanup)

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

let location
const mockLocation = new URL('http://localhost:3000/login')

beforeEach(() => {
  location = window.location
  mockLocation.replace = jest.fn()
  // You might need to mock other functions as well
  // location.assign = jest.fn();
  // location.reload = jest.fn();
  delete window.location
  window.location = mockLocation
})

test('user not log in', async () => {
  render(
    <Provider store={store}>
      <LoginScreen location={location} />
    </Provider>
  )

  //before i insert user that doesn't exist
  userEvent.type(screen.getByPlaceholderText('Enter email'), 'john.maverick')
  userEvent.type(screen.getByPlaceholderText('Enter password'), 'super-secret')
  userEvent.click(screen.getByTestId('signInButton'))

  expect(window.sessionStorage.getItem('token')).toBeNull()
  expect(global.window.location.pathname).toEqual('/login')
})
