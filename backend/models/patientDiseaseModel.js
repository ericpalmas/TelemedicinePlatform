import mongoose from 'mongoose'

const patientDiseaseSchema = mongoose.Schema({
  disease: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Disease',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
})

const PatientDisease = mongoose.model('PatientDisease', patientDiseaseSchema)

export default PatientDisease
