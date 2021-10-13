import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomeScreen from '../../src/screens/HomeScreen'

import store from '../../src/store'

afterEach(cleanup)

describe('Testing home screen list component', () => {
  test('home screen test', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomeScreen />
        </BrowserRouter>
      </Provider>
    )
    expect(await screen.findByText(/Manage surveys/i)).toBeInTheDocument()
    expect(await screen.findByText(/Manage patients/i)).toBeInTheDocument()
  })
})
