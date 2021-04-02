import mongoose from 'mongoose'

const sensorSchema = mongoose.Schema({
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
    required: false,
    ref: 'Patient',
  },
})

const Sensor = mongoose.model('Sensor', sensorSchema)

export default Sensor
