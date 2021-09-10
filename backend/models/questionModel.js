import mongoose from 'mongoose'

const questionSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    slider: {
      type: Boolean,
      required: false,
      default: false,
    },
    trueFalse: {
      type: Boolean,
      required: false,
      default: false,
    },
    incrementDecrement: {
      type: Boolean,
      required: false,
      default: false,
    },
    insertTime: {
      type: Boolean,
      required: false,
      default: false,
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
    previousQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Question',
    },
    expectedPreviousAnswer: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

const Question = mongoose.model('Question', questionSchema)

export default Question
