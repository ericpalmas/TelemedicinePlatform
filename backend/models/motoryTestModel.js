import mongoose from 'mongoose'

const motoryTestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
})

const MotoryTest = mongoose.model('MotoryTest', motoryTestSchema)

export default MotoryTest
