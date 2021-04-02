import bcrypt from 'bcryptjs'

const doctors = [
  {
    name: 'Marco',
    surname: 'Rossi',
    email: 'marco.rossi@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Pietro',
    surname: 'Magri',
    email: 'pietro.magri@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Matteo',
    surname: 'Neri',
    email: 'matteo.neri@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default doctors
