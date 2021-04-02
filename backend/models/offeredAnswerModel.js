import mongoose from 'mongoose'

const offeredAnswerSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    required: false,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Question',
  },
})

const OfferedAnswer = mongoose.model('OfferedAnswer', offeredAnswerSchema)

export default OfferedAnswer
