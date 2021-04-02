import mongoose from 'mongoose'

const diseaseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  therapy: {
    type: String,
    required: false,
  },
})

const Disease = mongoose.model('Disease', diseaseSchema)

export default Disease
