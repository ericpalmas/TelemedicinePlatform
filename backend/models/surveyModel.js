import mongoose from 'mongoose'

const surveySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

const Survey = mongoose.model('Survey', surveySchema)

export default Survey
