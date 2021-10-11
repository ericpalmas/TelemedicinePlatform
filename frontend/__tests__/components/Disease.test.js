import React from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Disease from '../../src/components/Disease'

import store from '../../src/store'

afterEach(cleanup)

describe('Testing disease component', () => {
  const disease = {
    _id: '60ac01c8c458a814c89b16d5',
    name: 'Parkinson',
  }

  test('test buttons', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Disease disease={disease} />
      </Provider>
    )
    expect(await getByTestId('deleteDiseaseButton')).toBeTruthy()
    expect(await getByTestId('editDiseaseButton')).toBeTruthy()
  })

  test('test disease data', async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Disease disease={disease} />
      </Provider>
    )

    expect(await getByTestId('diseaseName')).toHaveTextContent('Parkinson')
  })
})
