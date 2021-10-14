import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AdminDoctorListScreen from '../../src/screens/AdminDoctorListScreen'
import { BrowserRouter } from 'react-router-dom'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint
export const handlers = [
  rest.get('/api/doctors', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          isAdmin: false,
          _id: '60ac01c8c458a814c89b16e0',
          name: 'Matteo',
          surname: 'Neri',
          email: 'matteo.neri@example.com',
          password:
            '$2a$10$RseclN6LOXrezawszQeqXOC2Z3ZIFyy58uThmXcb0Vmk7Aa2etWdi',
          __v: 0,
        },
        {
          isAdmin: false,
          _id: '60ac01c8c458a814c89b16de',
          name: 'marco',
          surname: 'rossi',
          email: 'marco.rossi@example.com',
          password:
            '$2a$10$XBCRiKri0VqSMGl.wJAx1.kNZfsF8Fx3jWYzSDUy61lbOx0l.Ptl.',
          __v: 0,
        },
        {
          isAdmin: false,
          _id: '60ac01c8c458a814c89b16df',
          name: 'Pietro',
          surname: 'Magri',
          email: 'pietro.magri@example.com',
          password:
            '$2a$10$8uc/mpgEqBFnmw1x721VLeF3BeXg64KQzLcrMBc4wEOP95SI1xDem',
          __v: 0,
        },
        {
          isAdmin: false,
          _id: '60e33755caa640306012c3e5',
          name: 'Giorgio',
          surname: 'Verdi',
          email: 'giorgio.verdi@example.com',
          password: '123456',
          __v: 0,
        },
        {
          isAdmin: true,
          _id: '60e338790e408c4078508ad6',
          name: 'Luca',
          surname: 'Bellini',
          email: 'luca.belli@example.com',
          password: '123456',
          __v: 0,
        },
        {
          isAdmin: true,
          _id: '60e36927278e3443bc6ea659',
          name: 'Eric',
          surname: 'Palmas',
          email: 'admin@example.com',
          password:
            '$2a$10$SpQTVzi.MkzVc.1wKEP0Fegp73uHf2J4ttGHBuVBJ/MgNqfRE6/xK',
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

describe('Testing admin doctor list component', () => {
  test('fetches & receives admin doctor ', async () => {
    const history = []
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminDoctorListScreen history={history} />
        </BrowserRouter>
      </Provider>
    )

    expect(await screen.findByText(/New doctor/i)).toBeInTheDocument()
    expect(await screen.findByText(/ID/i)).toBeInTheDocument()
    expect(await screen.findByText(/NAME/i)).toBeInTheDocument()
    expect(await screen.findByText(/EMAIL/i)).toBeInTheDocument()
  })
})
