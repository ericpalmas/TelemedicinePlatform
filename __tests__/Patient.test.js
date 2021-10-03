// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Patient from '../frontend/src/components/Patient'

// test('on initial render, the pay button is disabled', async () => {
//   patientTest = {
//     _id: '4',
//     name: 'Eric',
//     surname: 'Palmas',
//   }
//   render(<Patient patient={{ patientTest }} />)

//   //expect(await screen.findByRole('button', { name: /pay/i })).toBeDisabled()

//   screen.debug()
// })

test('on initial render, the pay button is disabled', () => {
  patientTest = {
    _id: '4',
    name: 'Eric',
    surname: 'Palmas',
  }

  render(<Patient patient={{ patientTest }} />)

  screen.debug()
})
