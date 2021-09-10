import mongoose from 'mongoose'

const timeSlotSchema = mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Survey',
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
})

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema)

export default TimeSlot
