import bcrypt from 'bcryptjs'

const doctors = [
  {
    name: 'Marco',
    surname: 'Rossi',
    email: 'marco.rossi@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Pietro',
    surname: 'Magri',
    email: 'pietro.magri@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Matteo',
    surname: 'Neri',
    email: 'matteo.neri@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]

export default doctors
