import mongoose from 'mongoose'

const questionSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    radio: {
      type: Boolean,
      required: false,
      default: false,
    },
    check: {
      type: Boolean,
      required: false,
      default: false,
    },
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Survey',
    },
    response: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Response',
    },
  },
  {
    timestamps: true,
  },
)

const Question = mongoose.model('Question', questionSchema)

export default Question
