import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from '../../src/components/Header'

import store from '../../src/store'

afterEach(cleanup)

describe('Testing header component', () => {
  test('test header diseases', async () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
    const { getByText } = within(getByTestId('diseases'))
    expect(await getByText('Diseases')).toBeInTheDocument()
  })

  test('test header patients', async () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
    const { getByText } = within(getByTestId('patients'))
    expect(await getByText('Patients')).toBeInTheDocument()
  })

  test('test header title', async () => {
    const { getByTestId, container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
    const { getByText } = within(getByTestId('title'))
    expect(await getByText('TelemedicinePlatform')).toBeInTheDocument()
  })
})
