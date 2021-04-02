import mongoose from 'mongoose'

const doctorPatientSchema = mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },
  },
  {
    timestamps: true,
  },
)

const DoctorPatient = mongoose.model('DoctorPatient', doctorPatientSchema)

export default DoctorPatient
