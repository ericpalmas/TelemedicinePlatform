import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SurveyCreationScreen from '../../src/screens/SurveyCreationScreen'

import store from '../../src/store'

afterEach(cleanup)

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/surveys` endpoint
export const handlers = [
  rest.get('/api/surveys/60afc8ca1193ee3f00223c58', (req, res, ctx) => {
    return res(
      ctx.json({
        survey: {
          deleted: false,
          _id: '60afc8ca1193ee3f00223c58',
          name: 'ciaooo mondo',
          description: 'vvvvvvvvv',
          createdAt: '2021-05-27T16:28:58.835Z',
          __v: 0,
        },
        questions: [
          {
            answers: [],
            question: {
              slider: false,
              trueFalse: false,
              incrementDecrement: false,
              insertTime: false,
              radio: false,
              check: false,
              open: true,
              _id: '60dd7fc47649b543c0b02e2b',
              text: 'Come ti chiami?',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T08:41:40.029Z',
              updatedAt: '2021-09-29T08:11:10.124Z',
              __v: 0,
            },
          },
          {
            answers: [
              {
                _id: '61541fbc024eab54a8450383',
                text: 'si',
                question: '60dd7fd77649b543c0b02e2d',
                image: 1,
                selected: false,
                __v: 0,
              },
              {
                _id: '61541fbc024eab54a8450385',
                text: 'no',
                question: '60dd7fd77649b543c0b02e2d',
                image: 4,
                selected: false,
                __v: 0,
              },
            ],
            question: {
              slider: false,
              trueFalse: false,
              incrementDecrement: false,
              insertTime: false,
              radio: true,
              check: false,
              open: false,
              _id: '60dd7fd77649b543c0b02e2d',
              text: 'Hai dormito bene?',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T08:41:59.966Z',
              updatedAt: '2021-09-29T08:11:40.402Z',
              __v: 0,
            },
          },
          {
            answers: [
              {
                _id: '61541fe2024eab54a8450399',
                text: 'alcol',
                question: '60dd7fe87649b543c0b02e30',
                image: 5,
                selected: false,
                __v: 0,
              },
              {
                _id: '61541fe2024eab54a845039b',
                text: 'sigarette',
                question: '60dd7fe87649b543c0b02e30',
                image: 9,
                selected: false,
                __v: 0,
              },
            ],
            question: {
              slider: false,
              trueFalse: false,
              incrementDecrement: false,
              insertTime: false,
              radio: false,
              check: true,
              open: false,
              _id: '60dd7fe87649b543c0b02e30',
              text: 'Ho effettuato qualche sgarro?',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T08:42:16.554Z',
              updatedAt: '2021-09-29T08:12:18.027Z',
              __v: 0,
            },
          },
          {
            answers: [
              {
                _id: '61541ff3024eab54a84503af',
                text: '1',
                question: '60dd80057649b543c0b02e33',
                image: 5,
                selected: false,
                __v: 0,
              },
              {
                _id: '61541ff3024eab54a84503b1',
                text: '10',
                question: '60dd80057649b543c0b02e33',
                image: 5,
                selected: false,
                __v: 0,
              },
            ],
            question: {
              slider: true,
              trueFalse: false,
              incrementDecrement: false,
              insertTime: false,
              radio: false,
              check: false,
              open: false,
              _id: '60dd80057649b543c0b02e33',
              text: 'alcolici assunti in settimana',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T08:42:45.098Z',
              updatedAt: '2021-09-29T08:12:35.808Z',
              __v: 0,
            },
          },
          {
            answers: [
              {
                _id: '6154200e024eab54a84503c5',
                text: '',
                question: '60dd80197649b543c0b02e36',
                image: -1,
                selected: false,
                __v: 0,
              },
              {
                _id: '6154200e024eab54a84503c7',
                text: '',
                question: '60dd80197649b543c0b02e36',
                image: -1,
                selected: false,
                __v: 0,
              },
            ],
            question: {
              slider: false,
              trueFalse: true,
              incrementDecrement: false,
              insertTime: false,
              radio: false,
              check: false,
              open: false,
              _id: '60dd80197649b543c0b02e36',
              text: 'ti sei svegliato durante la notte?',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T08:43:05.281Z',
              updatedAt: '2021-09-29T08:13:02.303Z',
              __v: 0,
            },
          },
          {
            answers: [],
            question: {
              slider: false,
              trueFalse: false,
              incrementDecrement: false,
              insertTime: true,
              radio: false,
              check: false,
              open: false,
              _id: '60dd80237649b543c0b02e39',
              text: 'a che ora sei andato a letto?',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T08:43:15.690Z',
              updatedAt: '2021-09-29T08:13:20.213Z',
              __v: 0,
            },
          },
          {
            answers: [
              {
                _id: '61542034024eab54a84503f2',
                text: '',
                question: '60dd89aa63307952a844d922',
                image: 3,
                selected: false,
                __v: 0,
              },
            ],
            question: {
              slider: false,
              trueFalse: false,
              incrementDecrement: true,
              insertTime: false,
              radio: false,
              check: false,
              open: false,
              _id: '60dd89aa63307952a844d922',
              text: 'quante volte ti sei svegliato questa notte?',
              survey: {
                deleted: false,
                _id: '60afc8ca1193ee3f00223c58',
                name: 'ciaooo mondo',
                description: 'vvvvvvvvv',
                createdAt: '2021-05-27T16:28:58.835Z',
                __v: 0,
              },
              createdAt: '2021-07-01T09:23:54.435Z',
              updatedAt: '2021-09-29T08:13:40.648Z',
              __v: 0,
            },
          },
        ],
        timeSlots: [
          {
            _id: '615f12c4e5deff34d49dccbc',
            survey: '60afc8ca1193ee3f00223c58',
            startHour: 6,
            startMinutes: 0,
            endHour: 4,
            endMinutes: 2,
            __v: 0,
          },
          {
            _id: '615f12c4e5deff34d49dccbe',
            survey: '60afc8ca1193ee3f00223c58',
            startHour: 2,
            startMinutes: 0,
            endHour: 4,
            endMinutes: 2,
            __v: 0,
          },
          {
            _id: '615f12c4e5deff34d49dccc0',
            survey: '60afc8ca1193ee3f00223c58',
            startHour: 6,
            startMinutes: 0,
            endHour: 4,
            endMinutes: 2,
            __v: 0,
          },
        ],
      }),
      ctx.delay(150)
    )
  }),
  rest.get(
    '/api/patientsAndDiseases/60afc8ca1193ee3f00223c58',
    (req, res, ctx) => {
      return res(ctx.json([]), ctx.delay(0))
    }
  ),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('Testing diseases list component', () => {
  test('fetches & receives diseases', async () => {
    const match = {
      params: {
        id: '60ac01c8c458a814c89b16d5',
      },
    }
    render(
      <Provider store={store}>
        <SurveyCreationScreen match={match} />
      </Provider>
    )

    expect(await screen.findByText(/No survey loaded/i)).toBeInTheDocument()
  })
})
