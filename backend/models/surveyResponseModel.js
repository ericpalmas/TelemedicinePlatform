import mongoose from 'mongoose'

const surveyResponseSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Survey',
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema)

export default SurveyResponse
