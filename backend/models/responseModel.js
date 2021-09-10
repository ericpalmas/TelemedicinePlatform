import mongoose from 'mongoose'

const responseSchema = mongoose.Schema({
  answer: {
    type: Object,
    required: true,
  },
  // answer: [{}],
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question',
  },
  surveyResponse: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SurveyResponse',
  },
})

const Response = mongoose.model('Response', responseSchema)

export default Response
