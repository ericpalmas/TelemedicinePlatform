import mongoose from 'mongoose'

const surveyResponseSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Survey',
    },
    surveyResponse: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'SurveyResponse',
    },
  },
  {
    timestamps: true,
  },
)

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema)

export default SurveyResponse
