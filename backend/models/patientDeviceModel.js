import mongoose from 'mongoose'

const patientDeviceSchema = mongoose.Schema({
  macAdress: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
})

const PatientDevice = mongoose.model('PatientDevice', patientDeviceSchema)

export default PatientDevice
