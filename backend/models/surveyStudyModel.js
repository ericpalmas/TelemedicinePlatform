import mongoose from 'mongoose'

const surveyStudySchema = mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Survey',
  },
  study: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Study',
  },
})

const SurveyStudy = mongoose.model('SurveyStudy', surveyStudySchema)

export default SurveyStudy
