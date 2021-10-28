import mongoose from 'mongoose'

const studySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
})

const Study = mongoose.model('Study', studySchema)

export default Study
