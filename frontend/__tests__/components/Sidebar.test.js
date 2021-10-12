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
// when receiving a get request to the `/api/user` endpoint
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
        {
          deleted: true,
          _id: '60afc8997a28752f04424a86',
          name: 'rrrrrr',
          description: 'dddddd',
          createdAt: '2021-05-27T16:28:09.384Z',
          updatedAt: '2021-10-07T09:51:38.556Z',
          __v: 0,
        },
        {
          deleted: false,
          _id: '60afc8ca1193ee3f00223c58',
          name: 'ciaooo mondo',
          description: 'vvvvvvvvv',
          createdAt: '2021-05-27T16:28:58.835Z',
          __v: 0,
        },
        {
          deleted: true,
          _id: '60b0ba3555472d24f4ccc443',
          __v: 0,
          updatedAt: '2021-10-07T09:58:42.941Z',
          createdAt: '2021-10-06T19:17:39.432Z',
          description: 'fffffff',
          name: 'ciao',
        },
        {
          deleted: true,
          _id: '615f158fd7edf27080f38be8',
          name: 'iiiiiii',
          description: 'nuovo problema',
          createdAt: '2021-10-07T15:43:11.791Z',
          updatedAt: '2021-10-07T19:27:09.558Z',
          __v: 0,
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

const localStorageMock = (function () {
  let store = {}

  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Testing message component', () => {
  test('fetches & receives a user after clicking the fetch user button', async () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    )

    // should show no user initially, and not be fetching a user
    // expect(screen.getByText(/no user/i)).toBeInTheDocument()
    // expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

    // after clicking the 'Fetch user' button, it should now show that it is fetching the user
    // fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
    // expect(screen.getByText(/no user/i)).toBeInTheDocument()

    // after some time, the user should be received

    expect(await screen.findByText(/Parkinson/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sleep disorders/i)).toBeInTheDocument()
    // expect(await screen.findByText(/Parkinson/i)).toBeInTheDocument()
    // expect(await screen.findByText(/Parkinson/i)).toBeInTheDocument()

    // expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
    // expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
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

  //   test('test patient data', async () => {
  //     const { getByTestId, getByText } = render(
  //       <Provider store={store}>
  //         <Sidebar />
  //       </Provider>
  //     )

  //     expect(await getByTestId('patientName')).toHaveTextContent('Marco')
  //     expect(await getByTestId('patientSurname')).toHaveTextContent('Rossi')
  //   })
})
