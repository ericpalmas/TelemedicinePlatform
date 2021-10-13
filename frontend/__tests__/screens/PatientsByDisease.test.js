import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PatientsByDisease from '../../src/screens/PatientsByDisease'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint
export const handlers = [
  rest.get(
    '/api/patients/patientsByDisease/60ac01c8c458a814c89b16dc',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            _id: '60ac01c8c458a814c89b16f6',
            patient: {
              _id: '60ac01c8c458a814c89b16d6',
              name: 'Pietro',
              surname: 'Neri',
              age: '32',
              therapy:
                'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
              __v: 0,
            },
            disease: '60ac01c8c458a814c89b16dc',
          },
          {
            _id: '60eda780b359ef196c967ed2',
            patient: {
              _id: '60eda77fb359ef196c967ecf',
              name: 'luca',
              surname: 'nerini',
              age: '2021-07-10',
              therapy: 'prova',
              __v: 0,
            },
            disease: '60ac01c8c458a814c89b16dc',
          },
        ]),
        ctx.delay(150)
      )
    }
  ),
  rest.get('/api/patients/patientsAndDiseases', (req, res, ctx) => {
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

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Testing patient list by disease component', () => {
  test('fetches & receives patients by disease', async () => {
    const match = {
      params: {
        id: '60ac01c8c458a814c89b16dc',
      },
    }
    render(
      <Provider store={store}>
        <PatientsByDisease match={match} />
      </Provider>
    )
    expect(
      await screen.findByText(/You have to do the login to see these data/i)
    ).toBeInTheDocument()

    //await screen.debug()
  })
})
