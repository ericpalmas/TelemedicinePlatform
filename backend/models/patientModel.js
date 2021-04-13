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
  therapy: {
    type: String,
    required: false,
  },
})

const Patient = mongoose.model('Patient', patientSchema)

export default Patient
