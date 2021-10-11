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
    return res(ctx.json('John Smith'), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Testing message component', () => {
  //   const patient = {
  //     _id: '60ac01c8c458a814c89b16d5',
  //     name: 'Marco',
  //     surname: 'Rossi',
  //     age: '22-12-1996',
  //     therapy:
  //       'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
  //     disease: 'Obesity, Sleep disorders',
  //     diseases: ['60ac01c8c458a814c89b16dd', '60ac01c8c458a814c89b16db'],
  //   }

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
