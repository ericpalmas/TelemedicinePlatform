import React from 'react'
import renderer from 'react-test-renderer'
import FormContainter from '../../src/components/FormContainter'
import { render, screen, cleanup } from '@testing-library/react'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

afterEach(cleanup)
describe('Testing message component', () => {
  it('renders', () => {
    const { asFragment } = render(<FormContainter children='test' />)
    expect(asFragment()).toMatchSnapshot()
  })
})
