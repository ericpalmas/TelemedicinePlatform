import React from 'react'
import renderer from 'react-test-renderer'
import Footer from '../../src/components/Footer'
import { render, screen } from '@testing-library/react'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

describe('Testing footer component', () => {
  test('footer renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  //   test('footer text renders correctly', async () => {
  //     const { getByTestId } = render(<Footer />)
  //     const { getByText } = within(getByTestId('footerText'))
  //     expect(getByText('Copyright © MyWebSite')).toBeInTheDocument()
  //   })
})
