import React from 'react'
import renderer from 'react-test-renderer'
import Loader from '../../src/components/Loader'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe('Testing Loader component', () => {
  test('loader text renders correctly', async () => {
    const { getByTestId, getByText } = render(<Loader />)
    expect(await getByTestId('loading')).toHaveTextContent('Loading...')
  })
})
