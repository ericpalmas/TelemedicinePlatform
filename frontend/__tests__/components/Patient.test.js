import React from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Patient from '../../src/components/Patient'

import store from '../../src/store'

afterEach(cleanup)

describe('Testing message component', () => {
  const patient = {
    _id: '60ac01c8c458a814c89b16d5',
    name: 'Marco',
    surname: 'Rossi',
    age: '22-12-1996',
    therapy:
      'It’s important to receive a diagnosis and treatment right away if you suspect you might have a sleep disorder. When left untreated, the negative effects of sleep disorders can lead to further health consequences.',
    disease: 'Obesity, Sleep disorders',
    diseases: ['60ac01c8c458a814c89b16dd', '60ac01c8c458a814c89b16db'],
  }

  test('test buttons', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Patient patient={patient} />
      </Provider>
    )
    expect(await getByTestId('deleteButton')).toBeTruthy()
  })

  test('test patient data', async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Patient patient={patient} />
      </Provider>
    )

    expect(await getByTestId('patientName')).toHaveTextContent('Marco')
    expect(await getByTestId('patientSurname')).toHaveTextContent('Rossi')
  })
})
