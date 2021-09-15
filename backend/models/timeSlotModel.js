import mongoose from 'mongoose'

const timeSlotSchema = mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Survey',
  },
  startHour: {
    type: Number,
    required: true,
  },
  startMinutes: {
    type: Number,
    required: true,
  },
  endHour: {
    type: Number,
    required: true,
  },
  endMinutes: {
    type: Number,
    required: true,
  },
})

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema)

export default TimeSlot
