import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PatientListScreen from '../../src/screens/PatientListScreen'
//import { saveToStorage } from '../../src/storage'
//import {} from '../../__setups__/browserMocks'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint
export const handlers = [
  rest.get('/api/patientsAndDiseases', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '60ac01c8c458a814c89b16d5',
          name: 'Marco',
          surname: 'Rossi',
          age: '47',
          therapy:
            'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
          disease: 'Obesity, Sleep disorders',
          diseases: ['60ac01c8c458a814c89b16dd', '60ac01c8c458a814c89b16db'],
        },
        {
          _id: '60ac01c8c458a814c89b16d6',
          name: 'Pietro',
          surname: 'Neri',
          age: '32',
          therapy:
            'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
          disease: 'Parkinson, Obesity',
          diseases: ['60ac01c8c458a814c89b16dc', '60ac01c8c458a814c89b16dd'],
        },
        {
          _id: '60eda77fb359ef196c967ecf',
          name: 'luca',
          surname: 'nerini',
          age: '2021-07-10',
          therapy: 'prova',
          disease: 'Obesity, Parkinson, Sleep disorders',
          diseases: [
            '60ac01c8c458a814c89b16dd',
            '60ac01c8c458a814c89b16dc',
            '60ac01c8c458a814c89b16db',
          ],
        },
        {
          _id: '60ac01c8c458a814c89b16d7',
          name: 'Massimo',
          surname: 'Verdi',
          age: '23',
          therapy:
            'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
          disease: [],
          diseases: [],
        },
        {
          _id: '60ac01c8c458a814c89b16d8',
          name: 'Luca',
          surname: 'Bianchi',
          age: '63',
          therapy:
            'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
          disease: [],
          diseases: [],
        },
        {
          _id: '60ac01c8c458a814c89b16d9',
          name: 'Aldo',
          surname: 'Grasso',
          age: '43',
          therapy:
            'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
          disease: [],
          diseases: [],
        },
        {
          _id: '60ac01c8c458a814c89b16da',
          name: 'Giorgio',
          surname: 'Magri',
          age: '33',
          therapy:
            'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
          disease: [],
          diseases: [],
        },
      ]),
      ctx.delay(150)
    )
  }),
]

// const fakeLocalStorage = (function () {
//   let store = {}

//   return {
//     getItem: function (key) {
//       return store[key] || null
//     },
//     setItem: function (key, value) {
//       store[key] = value.toString()
//     },
//     removeItem: function (key) {
//       delete store[key]
//     },
//     clear: function () {
//       store = {}
//     },
//   }
// })()

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Testing patient list component', () => {
  // beforeAll(() => {
  //   Object.defineProperty(window, 'localStorage', {
  //     value: fakeLocalStorage,
  //   })

  //   const localStorage = {
  //     _id: '60ac01c8c458a814c89b16de',
  //     name: 'marco',
  //     surname: 'rossi',
  //     email: 'marco.rossi@example.com',
  //     token:
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWMwMWM4YzQ1OGE4MTRjODliMTZkZSIsImlhdCI6MTYzNDExNDI5OSwiZXhwIjoxNjM2NzA2Mjk5fQ.b-gYqbEShCUAyyHQva4qmIqU86ULYYS5DQBzRqO8DkY',
  //     isAdmin: false,
  //   }

  //   saveToStorage(localStorage.toString())

  //   expect(window.localStorage.getItem('the-key')).toEqual(
  //     localStorage.toString()
  //   )
  // })

  // beforeEach(() => {
  //   // to fully reset the state between tests, clear the storage
  //   localStorage.clear()
  //   // and reset all mocks
  //   jest.clearAllMocks()

  //   // clearAllMocks will impact your other mocks too, so you can optionally reset individual mocks instead:
  //   localStorage.setItem.mockClear()
  // })

  // test('should not impact the next test', () => {
  //   const KEY = 'foo',
  //     VALUE = 'bar'
  //   dispatch(action.update(KEY, VALUE))
  //   expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE)
  //   expect(localStorage.__STORE__[KEY]).toBe(VALUE)
  //   expect(Object.keys(localStorage.__STORE__).length).toBe(1)
  // })

  test('fetches & receives patients', async () => {
    render(
      <Provider store={store}>
        <PatientListScreen />
      </Provider>
    )
    //fireEvent.click(await screen.findByTestId('buttonShowSurveys'))
    expect(
      await screen.findByText(/You have to do the login to see these data/i)
    ).toBeInTheDocument()
    //expect(await screen.findByText(/Massimo/i)).toBeInTheDocument()
  })

  // test('saves the key to the storage', async () => {
  //   render(
  //     <Provider store={store}>
  //       <PatientListScreen />
  //     </Provider>
  //   )

  //   expect(await screen.findByText(/Aldo/i)).toBeInTheDocument()
  // })

  // it('should sign out a user', async () => {
  //   const spyLoStoRemove = jest.spyOn(localStorage, 'removeItem')

  //   await signOutUser()

  //   expect(spyLoStoRemove).toHaveBeenCalled()
  //   expect(spyLoStoRemove).toHaveBeenCalledTimes(2)
  // })
})
