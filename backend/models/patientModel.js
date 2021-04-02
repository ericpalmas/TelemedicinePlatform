import mongoose from 'mongoose'

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
})

const Patient = mongoose.model('Patient', patientSchema)

export default Patient
