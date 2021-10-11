import React from 'react'
import renderer from 'react-test-renderer'
import Message from '../../src/components/Message'
import { render, screen, cleanup } from '@testing-library/react'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

afterEach(cleanup)
describe('Testing message component', () => {
  test('message renders correctly', () => {
    const tree = renderer.create(<Message children={'errore'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  //   test('footer text renders correctly', async () => {
  //     const { getByTestId } = render(<Message />)
  //     const { getByText } = within(getByTestId('footerText'))
  //     expect(getByText('Copyright © MyWebSite')).toBeInTheDocument()
  //   })
  it('renders', () => {
    const { asFragment } = render(<Message children='Errore' />)
    expect(asFragment()).toMatchSnapshot()
  })
})
