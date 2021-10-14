import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AdminSurveyListScreen from '../../src/screens/AdminSurveyListScreen'
import { BrowserRouter } from 'react-router-dom'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint
export const handlers = [
  rest.get('/api/surveyResponses/surveyAssignments', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '60ac01c8c458a814c89b16dd',
          name: 'Obesity',
          description:
            "Obesity is a medical condition in which excess body fat has accumulated to an extent that it may have a negative effect on health.[1] People are generally considered obese when their body mass index (BMI), a measurement obtained by dividing a person's weight by the square of the person's height—despite known allometric inaccuracies[a]—is over 30 kg/m2; the range 25–30 kg/m2 is defined as overweight.",
          __v: 0,
        },
        {
          _id: '60ac01c8c458a814c89b16dc',
          name: 'Parkinson',
          description:
            "'Parkinson's disease (PD), or simply Parkinson's,[9] is a long-term degenerative disorder of the central nervous system that mainly affects the motor system. The symptoms usually emerge slowly and, as the disease worsens, non-motor symptoms become more common.[1][4] The most obvious early symptoms are tremor, rigidity, slowness of movement, and difficulty with walking.[1] Cognitive and behavioral problems may also occur with depression, anxiety, and apathy occurring in many people with PD.[10] Parkinson's disease dementia becomes common in the advanced stages of the disease. Those with Parkinson's can also have problems with their sleep and sensory systems.[1][2] The motor symptoms of the disease result from the death of cells in the substantia nigra, a region of the midbrain, leading to a dopamine deficit.[1] The cause of this cell death is poorly understood, but involves the build-up of misfolded proteins into Lewy bodies in the neurons.[11][4] Collectively, the main motor symptoms are also known as 'parkinsonism' or a 'parkinsonian syndrome'",
          __v: 0,
        },
        {
          _id: '60ac01c8c458a814c89b16db',
          name: 'Sleep disorders',
          description:
            'A sleep disorder, or somnipathy, is a medical disorder of the sleep patterns of a person. Some sleep disorders are serious enough to interfere with normal physical, mental, social and emotional functioning. Polysomnography and actigraphy are tests commonly ordered for some sleep disorders.',
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

describe('Testing admin survey list component', () => {
  test('fetches & receives admin survey list ', async () => {
    const history = []
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminSurveyListScreen history={history} />
        </BrowserRouter>
      </Provider>
    )

    expect(await screen.findByText(/Surveys/i)).toBeInTheDocument()
    expect(await screen.findByText(/ID/i)).toBeInTheDocument()
    expect(await screen.findByText(/CREATION DATE/i)).toBeInTheDocument()
    expect(await screen.findByText(/UPDATE DATE/i)).toBeInTheDocument()
    expect(await screen.findByText(/TO/i)).toBeInTheDocument()
    expect(await screen.findByText(/RESPONSE/i)).toBeInTheDocument()
  })
})
